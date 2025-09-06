import React, { useMemo, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Search, X, ChevronDown, Filter as FilterIcon } from 'lucide-react';
import { ProductGrid } from '../components/Product/ProductGrid';
import { mockProducts } from '../data/products';
import { useCart } from '../contexts/CartContext';
import './CategoryPage.css';

type SortOption = 'recommended' | 'price-asc' | 'price-desc' | 'rating-desc' | 'newest';

export const CategoryPage: React.FC = () => {
  const { category } = useParams<{ category: string }>();
  const { t, i18n } = useTranslation();
  const { addItem } = useCart();

  const allCategoryKeys = ['women', 'bags', 'shoes', 'accessories', 'sale'];
  const activeCategory = allCategoryKeys.includes(category || '') ? (category as string) : 'women';

  const baseProducts = useMemo(() => {
    if (activeCategory === 'sale') {
      return mockProducts.filter((p) => p.isOnSale);
    }
    return mockProducts.filter((p) => p.category === activeCategory);
  }, [activeCategory]);

  const allColors = useMemo(() => {
    const map = new Map<string, { id: string; name: string; hex: string }>();
    baseProducts.forEach((p) => p.colors.forEach((c) => map.set(c.id, c)));
    return Array.from(map.values());
  }, [baseProducts]);

  const allSizes = useMemo(() => {
    const map = new Map<string, { id: string; name: string }>();
    baseProducts.forEach((p) => p.sizes.forEach((s) => map.set(s.id, { id: s.id, name: s.name })));
    return Array.from(map.values());
  }, [baseProducts]);

  const prices = baseProducts.map((p) => p.price);
  const minPrice = prices.length ? Math.min(...prices) : 0;
  const maxPrice = prices.length ? Math.max(...prices) : 0;

  const [search, setSearch] = useState('');
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [priceMinInput, setPriceMinInput] = useState<string>(String(minPrice));
  const [priceMaxInput, setPriceMaxInput] = useState<string>(String(maxPrice));
  const [sort, setSort] = useState<SortOption>('recommended');
  const [page, setPage] = useState(1);
  const pageSize = 12;

  const [collapsed, setCollapsed] = useState<{ price: boolean; colors: boolean; sizes: boolean }>({
    price: false,
    colors: false,
    sizes: false,
  });
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  React.useEffect(() => {
    setSearch('');
    setSelectedColors([]);
    setSelectedSizes([]);
    setPriceMinInput(String(minPrice));
    setPriceMaxInput(String(maxPrice));
    setSort('recommended');
    setPage(1);
  }, [activeCategory, minPrice, maxPrice]);

  const effectiveMinPrice = priceMinInput.trim() === '' ? minPrice : Math.max(minPrice, Number(priceMinInput));
  const effectiveMaxPrice = priceMaxInput.trim() === '' ? maxPrice : Math.min(maxPrice, Number(priceMaxInput));

  const filteredProducts = useMemo(() => {
    let result = baseProducts;

    if (search.trim()) {
      const q = search.trim().toLowerCase();
      result = result.filter((p) => p.name.toLowerCase().includes(q));
    }

    if (selectedColors.length) {
      result = result.filter((p) => p.colors.some((c) => selectedColors.includes(c.id)));
    }

    if (selectedSizes.length) {
      result = result.filter((p) => p.sizes.some((s) => selectedSizes.includes(s.id)));
    }

    result = result.filter((p) => p.price >= effectiveMinPrice && p.price <= effectiveMaxPrice);

    switch (sort) {
      case 'price-asc':
        result = [...result].sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        result = [...result].sort((a, b) => b.price - a.price);
        break;
      case 'rating-desc':
        result = [...result].sort((a, b) => b.rating - a.rating);
        break;
      case 'newest':
        result = [...result].sort((a, b) => Number(b.isNewArrival) - Number(a.isNewArrival));
        break;
      case 'recommended':
      default:
        // keep original order
        break;
    }

    return result;
  }, [baseProducts, search, selectedColors, selectedSizes, priceMinInput, priceMaxInput, sort, minPrice, maxPrice]);

  const totalPages = Math.max(1, Math.ceil(filteredProducts.length / pageSize));
  const paginatedProducts = useMemo(() => {
    const start = (page - 1) * pageSize;
    return filteredProducts.slice(start, start + pageSize);
  }, [filteredProducts, page]);

  const categoryLabel = i18n.t(`navigation.${activeCategory}`);

  const formatPrice = (value: number) => {
    if (i18n.language === 'ko') return `${value.toLocaleString('ko-KR')}원`;
    return `$${Math.floor(value / 1300).toLocaleString('en-US')}`;
  };

  const handleToggleColor = (colorId: string) => {
    setSelectedColors((prev) =>
      prev.includes(colorId) ? prev.filter((id) => id !== colorId) : [...prev, colorId]
    );
    setPage(1);
  };

  const handleToggleSize = (sizeId: string) => {
    setSelectedSizes((prev) =>
      prev.includes(sizeId) ? prev.filter((id) => id !== sizeId) : [...prev, sizeId]
    );
    setPage(1);
  };

  const handleAddToCart = (productId: string) => {
    const product = mockProducts.find((p) => p.id === productId);
    if (!product) return;
    const firstAvailableSize = product.sizes.find((s) => s.available);
    const firstColor = product.colors[0];
    if (!firstAvailableSize || !firstColor) return;
    addItem({
      productId: product.id,
      name: product.name,
      price: product.price,
      originalPrice: product.originalPrice,
      image: product.images[0],
      selectedColor: firstColor.id,
      selectedSize: firstAvailableSize.id,
      quantity: 1,
    });
  };

  const clearAll = () => {
    setSearch('');
    setSelectedColors([]);
    setSelectedSizes([]);
    setPriceMinInput(String(minPrice));
    setPriceMaxInput(String(maxPrice));
    setSort('recommended');
    setPage(1);
  };

  const activeChips = {
    hasSearch: Boolean(search.trim()),
    hasPrice:
      (priceMinInput.trim() !== '' && Number(priceMinInput) !== minPrice) ||
      (priceMaxInput.trim() !== '' && Number(priceMaxInput) !== maxPrice),
    colors: selectedColors,
    sizes: selectedSizes,
  };

  const removeColor = (id: string) => {
    setSelectedColors((prev) => prev.filter((c) => c !== id));
    setPage(1);
  };

  const removeSize = (id: string) => {
    setSelectedSizes((prev) => prev.filter((s) => s !== id));
    setPage(1);
  };

  const resetPrice = () => {
    setPriceMinInput(String(minPrice));
    setPriceMaxInput(String(maxPrice));
    setPage(1);
  };

  const toggleSection = (key: 'price' | 'colors' | 'sizes') => {
    setCollapsed((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="category-page">
      <div className="container">
        <nav className="breadcrumb">
          <Link to="/" className="breadcrumb-link">{t('navigation.home')}</Link>
          <span className="breadcrumb-sep">/</span>
          <span className="breadcrumb-current">{categoryLabel}</span>
        </nav>

        <header className="category-header">
          <h1 className="category-title">{categoryLabel}</h1>
          <p className="category-count">
            {t('category.results', { count: filteredProducts.length })}
          </p>
        </header>

        <div className="category-controls">
          <div className="search-box">
            <div className="input-with-icon">
              <Search size={16} className="input-icon" aria-hidden="true" />
              <input
                value={search}
                onChange={(e) => { setSearch(e.target.value); setPage(1); }}
                placeholder={t('category.searchPlaceholder') as string}
                className="search-input"
                aria-label={t('category.searchPlaceholder') as string}
              />
              {search && (
                <button
                  className="clear-input"
                  aria-label="Clear search"
                  onClick={() => { setSearch(''); setPage(1); }}
                >
                  <X size={14} />
                </button>
              )}
            </div>
          </div>

          <button
            className="mobile-filters-button"
            onClick={() => setIsMobileFilterOpen(true)}
            aria-label={t('category.mobile.openFilters') as string}
          >
            <FilterIcon size={16} />
            <span>{t('category.filters')}</span>
          </button>

          <div className="sort-box">
            <label className="sort-label">{t('category.sort')}</label>
            <div className="select-wrapper">
              <select
                className="sort-select"
                value={sort}
                onChange={(e) => { setSort(e.target.value as SortOption); setPage(1); }}
                aria-label={t('category.sort') as string}
              >
                <option value="recommended">{t('category.sortOptions.recommended')}</option>
                <option value="price-asc">{t('category.sortOptions.priceAsc')}</option>
                <option value="price-desc">{t('category.sortOptions.priceDesc')}</option>
                <option value="rating-desc">{t('category.sortOptions.ratingDesc')}</option>
                <option value="newest">{t('category.sortOptions.newest')}</option>
              </select>
              <ChevronDown size={16} className="select-chevron" aria-hidden="true" />
            </div>
          </div>
        </div>

        {(activeChips.hasSearch || activeChips.hasPrice || activeChips.colors.length > 0 || activeChips.sizes.length > 0) && (
          <div className="active-filters">
            {activeChips.hasSearch && (
              <span className="active-chip">
                {t('navigation.search')}: “{search}”
                <button className="chip-remove" aria-label="Remove search" onClick={() => { setSearch(''); setPage(1); }}>
                  <X size={12} />
                </button>
              </span>
            )}
            {activeChips.hasPrice && (
              <span className="active-chip">
                {t('category.price')}: {formatPrice(effectiveMinPrice)} - {formatPrice(effectiveMaxPrice)}
                <button className="chip-remove" aria-label="Reset price" onClick={resetPrice}>
                  <X size={12} />
                </button>
              </span>
            )}
            {activeChips.colors.map((id) => {
              const c = allColors.find((x) => x.id === id);
              if (!c) return null;
              return (
                <span key={id} className="active-chip">
                  {t('category.colors')}: {c.name}
                  <button className="chip-remove" aria-label={`Remove ${c.name}`} onClick={() => removeColor(id)}>
                    <X size={12} />
                  </button>
                </span>
              );
            })}
            {activeChips.sizes.map((id) => {
              const s = allSizes.find((x) => x.id === id);
              if (!s) return null;
              return (
                <span key={id} className="active-chip">
                  {t('category.sizes')}: {s.name}
                  <button className="chip-remove" aria-label={`Remove ${s.name}`} onClick={() => removeSize(id)}>
                    <X size={12} />
                  </button>
                </span>
              );
            })}
            <button className="btn btn-outline btn-sm" onClick={clearAll}>{t('category.clearAll')}</button>
          </div>
        )}

        <div className="category-content">
          <aside className="filters">
            <div className="filters-header">
              <h2 className="filters-title">{t('category.filters')}</h2>
              <button className="btn btn-outline btn-sm" onClick={clearAll}>
                {t('category.clearAll')}
              </button>
            </div>

            <div className="filter-group">
              <button className="filter-group-header" onClick={() => toggleSection('price')} aria-expanded={!collapsed.price}>
                <h3 className="filter-title">{t('category.price')}</h3>
                <ChevronDown size={16} className={`chevron ${collapsed.price ? 'rotated' : ''}`} aria-hidden="true" />
              </button>
              {!collapsed.price && (
                <div className="filter-group-content">
                  <div className="price-inputs">
                    <div className="price-field">
                      <label>{t('category.min')}</label>
                      <input
                        type="number"
                        min={minPrice}
                        max={effectiveMaxPrice}
                        value={priceMinInput}
                        onChange={(e) => { setPriceMinInput(e.target.value); setPage(1); }}
                        onBlur={() => {
                          if (priceMinInput.trim() === '') return;
                          const n = Number(priceMinInput);
                          if (Number.isNaN(n)) { setPriceMinInput(String(minPrice)); return; }
                          const clamped = Math.min(Math.max(n, minPrice), effectiveMaxPrice);
                          setPriceMinInput(String(clamped));
                        }}
                      />
                      <span className="price-hint">{formatPrice(effectiveMinPrice)}</span>
                    </div>
                    <div className="price-field">
                      <label>{t('category.max')}</label>
                      <input
                        type="number"
                        min={effectiveMinPrice}
                        max={maxPrice}
                        value={priceMaxInput}
                        onChange={(e) => { setPriceMaxInput(e.target.value); setPage(1); }}
                        onBlur={() => {
                          if (priceMaxInput.trim() === '') return;
                          const n = Number(priceMaxInput);
                          if (Number.isNaN(n)) { setPriceMaxInput(String(maxPrice)); return; }
                          const clamped = Math.max(Math.min(n, maxPrice), effectiveMinPrice);
                          setPriceMaxInput(String(clamped));
                        }}
                      />
                      <span className="price-hint">{formatPrice(effectiveMaxPrice)}</span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="filter-group">
              <button className="filter-group-header" onClick={() => toggleSection('colors')} aria-expanded={!collapsed.colors}>
                <h3 className="filter-title">{t('category.colors')}</h3>
                <ChevronDown size={16} className={`chevron ${collapsed.colors ? 'rotated' : ''}`} aria-hidden="true" />
              </button>
              {!collapsed.colors && (
                <div className="filter-group-content">
                  <div className="chip-list">
                    {allColors.map((c) => (
                      <button
                        key={c.id}
                        className={`chip ${selectedColors.includes(c.id) ? 'chip-active' : ''}`}
                        onClick={() => handleToggleColor(c.id)}
                        title={c.name}
                      >
                        <span className="chip-dot" style={{ backgroundColor: c.hex }} />
                        <span className="chip-text">{c.name}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="filter-group">
              <button className="filter-group-header" onClick={() => toggleSection('sizes')} aria-expanded={!collapsed.sizes}>
                <h3 className="filter-title">{t('category.sizes')}</h3>
                <ChevronDown size={16} className={`chevron ${collapsed.sizes ? 'rotated' : ''}`} aria-hidden="true" />
              </button>
              {!collapsed.sizes && (
                <div className="filter-group-content">
                  <div className="chip-list">
                    {allSizes.map((s) => (
                      <button
                        key={s.id}
                        className={`chip ${selectedSizes.includes(s.id) ? 'chip-active' : ''}`}
                        onClick={() => handleToggleSize(s.id)}
                      >
                        <span className="chip-text">{s.name}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </aside>

          <section className="results">
            <ProductGrid
              products={paginatedProducts}
              onAddToCart={handleAddToCart}
              favorites={[]}
            />

            <div className="pagination">
              <button
                className="btn btn-outline btn-sm"
                disabled={page <= 1}
                onClick={() => setPage((p) => Math.max(1, p - 1))}
              >
                {t('category.prev')}
              </button>
              <span className="page-indicator">
                {t('category.pageOf', { page, total: totalPages })}
              </span>
              <button
                className="btn btn-outline btn-sm"
                disabled={page >= totalPages}
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              >
                {t('category.next')}
              </button>
            </div>
          </section>
        </div>
      </div>

      {/* Mobile Filter Drawer */}
      {isMobileFilterOpen && (
        <div className="filter-drawer" role="dialog" aria-modal="true">
          <div className="filter-drawer-backdrop" onClick={() => setIsMobileFilterOpen(false)} />
          <div className="filter-drawer-panel">
            <div className="filter-drawer-header">
              <h2 className="filters-title">{t('category.filters')}</h2>
              <button
                className="drawer-close"
                aria-label={t('category.mobile.close') as string}
                onClick={() => setIsMobileFilterOpen(false)}
              >
                <X size={18} />
              </button>
            </div>

            <div className="filter-drawer-content">
              {/* Reuse same groups */}
              <div className="filter-group">
                <button className="filter-group-header" onClick={() => toggleSection('price')} aria-expanded={!collapsed.price}>
                  <h3 className="filter-title">{t('category.price')}</h3>
                  <ChevronDown size={16} className={`chevron ${collapsed.price ? 'rotated' : ''}`} aria-hidden="true" />
                </button>
                {!collapsed.price && (
                  <div className="filter-group-content">
                    <div className="price-inputs">
                      <div className="price-field">
                        <label>{t('category.min')}</label>
                        <input
                          type="number"
                          min={minPrice}
                          max={effectiveMaxPrice}
                          value={priceMinInput}
                          onChange={(e) => { setPriceMinInput(e.target.value); setPage(1); }}
                          onBlur={() => {
                            if (priceMinInput.trim() === '') return;
                            const n = Number(priceMinInput);
                            if (Number.isNaN(n)) { setPriceMinInput(String(minPrice)); return; }
                            const clamped = Math.min(Math.max(n, minPrice), effectiveMaxPrice);
                            setPriceMinInput(String(clamped));
                          }}
                        />
                        <span className="price-hint">{formatPrice(effectiveMinPrice)}</span>
                      </div>
                      <div className="price-field">
                        <label>{t('category.max')}</label>
                        <input
                          type="number"
                          min={effectiveMinPrice}
                          max={maxPrice}
                          value={priceMaxInput}
                          onChange={(e) => { setPriceMaxInput(e.target.value); setPage(1); }}
                          onBlur={() => {
                            if (priceMaxInput.trim() === '') return;
                            const n = Number(priceMaxInput);
                            if (Number.isNaN(n)) { setPriceMaxInput(String(maxPrice)); return; }
                            const clamped = Math.max(Math.min(n, maxPrice), effectiveMinPrice);
                            setPriceMaxInput(String(clamped));
                          }}
                        />
                        <span className="price-hint">{formatPrice(effectiveMaxPrice)}</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className="filter-group">
                <button className="filter-group-header" onClick={() => toggleSection('colors')} aria-expanded={!collapsed.colors}>
                  <h3 className="filter-title">{t('category.colors')}</h3>
                  <ChevronDown size={16} className={`chevron ${collapsed.colors ? 'rotated' : ''}`} aria-hidden="true" />
                </button>
                {!collapsed.colors && (
                  <div className="filter-group-content">
                    <div className="chip-list">
                      {allColors.map((c) => (
                        <button
                          key={c.id}
                          className={`chip ${selectedColors.includes(c.id) ? 'chip-active' : ''}`}
                          onClick={() => handleToggleColor(c.id)}
                          title={c.name}
                        >
                          <span className="chip-dot" style={{ backgroundColor: c.hex }} />
                          <span className="chip-text">{c.name}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="filter-group">
                <button className="filter-group-header" onClick={() => toggleSection('sizes')} aria-expanded={!collapsed.sizes}>
                  <h3 className="filter-title">{t('category.sizes')}</h3>
                  <ChevronDown size={16} className={`chevron ${collapsed.sizes ? 'rotated' : ''}`} aria-hidden="true" />
                </button>
                {!collapsed.sizes && (
                  <div className="filter-group-content">
                    <div className="chip-list">
                      {allSizes.map((s) => (
                        <button
                          key={s.id}
                          className={`chip ${selectedSizes.includes(s.id) ? 'chip-active' : ''}`}
                          onClick={() => handleToggleSize(s.id)}
                        >
                          <span className="chip-text">{s.name}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="filter-drawer-footer">
              <button className="btn btn-outline btn-lg" onClick={clearAll}>{t('category.clearAll')}</button>
              <button className="btn btn-primary btn-lg" onClick={() => setIsMobileFilterOpen(false)}>{t('category.mobile.apply')}</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};


