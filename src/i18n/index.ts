import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  ko: {
    translation: {
      navigation: {
        home: "홈",
        women: "여성복",
        bags: "가방",
        shoes: "신발",
        accessories: "액세서리",
        sale: "세일",
        cart: "장바구니",
        search: "검색",
        account: "계정"
      },
      common: {
        loading: "로딩 중...",
        error: "오류가 발생했습니다",
        retry: "다시 시도",
        addToCart: "장바구니에 추가",
        buyNow: "지금 구매",
        size: "사이즈",
        color: "색상",
        quantity: "수량",
        price: "가격",
        total: "총합",
        currency: "원"
      },
      home: {
        hero: {
          title: "새로운 컬렉션",
          subtitle: "LazyJane의 최신 스타일을 만나보세요",
          cta: "컬렉션 보기"
        },
        featured: "인기 상품",
        newArrivals: "신상품",
        trending: "트렌딩"
      }
    }
  },
  en: {
    translation: {
      navigation: {
        home: "Home",
        women: "Women",
        bags: "Bags",
        shoes: "Shoes",
        accessories: "Accessories",
        sale: "Sale",
        cart: "Cart",
        search: "Search",
        account: "Account"
      },
      common: {
        loading: "Loading...",
        error: "An error occurred",
        retry: "Retry",
        addToCart: "Add to Cart",
        buyNow: "Buy Now",
        size: "Size",
        color: "Color",
        quantity: "Quantity",
        price: "Price",
        total: "Total",
        currency: "$"
      },
      home: {
        hero: {
          title: "New Collection",
          subtitle: "Discover LazyJane's latest styles",
          cta: "View Collection"
        },
        featured: "Featured",
        newArrivals: "New Arrivals",
        trending: "Trending"
      }
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    },
    debug: true
  });

export default i18n;