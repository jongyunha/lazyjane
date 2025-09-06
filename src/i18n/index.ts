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
        cancel: "취소",
        confirm: "확인",
        size: "사이즈",
        color: "색상",
        quantity: "수량",
        price: "가격",
        total: "총합",
        currency: "원"
      },
      cart: {
        page: {
          title: "장바구니",
          continueShopping: "쇼핑 계속하기",
          clearCart: "전체 비우기",
          clearConfirm: "장바구니의 모든 상품을 삭제할까요?",
          itemsCount: "장바구니에 {{count}}개 상품",
          itemsCountShort: "{{count}}개",
          emptyTitle: "장바구니가 비어 있어요",
          emptyDesc: "아직 담긴 상품이 없습니다.",
          startShopping: "쇼핑 시작하기"
        },
        item: {
          color: "색상",
          size: "사이즈",
          decreaseQty: "수량 감소",
          increaseQty: "수량 증가",
          remove: "상품 제거"
        },
        summary: {
          orderSummary: "주문 요약",
          subtotal: "소계 ({{count}}개)",
          shipping: "배송비",
          free: "무료",
          freeShippingNotice: "5만원 이상 주문 시 무료배송",
          freeShippingRemain: "무료배송까지 {{amount}} 남았어요!",
          total: "합계",
          proceedCheckout: "결제하기",
          badges: {
            securePayment: "안전한 결제",
            fastDelivery: "빠른 배송",
            easyPay: "간편결제 지원"
          },
          paymentMethodsLabel: "결제 수단",
          methods: {
            creditCard: "신용/체크카드",
            kakaoPay: "카카오페이",
            naverPay: "네이버페이",
            bankTransfer: "무통장입금"
          },
          mobile: {
            totalLabel: "합계",
            checkout: "결제하기"
          }
        }
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
      },
      category: {
        results: "{{count}}개 상품",
        searchPlaceholder: "카테고리 내 검색",
        sort: "정렬",
        sortOptions: {
          recommended: "추천순",
          priceAsc: "가격 낮은순",
          priceDesc: "가격 높은순",
          ratingDesc: "평점 높은순",
          newest: "신상품순"
        },
        filters: "필터",
        clearAll: "전체 초기화",
        price: "가격",
        min: "최소",
        max: "최대",
        colors: "색상",
        sizes: "사이즈",
        prev: "이전",
        next: "다음",
        pageOf: "{{page}} / {{total}} 페이지",
        mobile: {
          openFilters: "필터 열기",
          apply: "적용",
          close: "닫기"
        }
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
        cancel: "Cancel",
        confirm: "Confirm",
        size: "Size",
        color: "Color",
        quantity: "Quantity",
        price: "Price",
        total: "Total",
        currency: "$"
      },
      cart: {
        page: {
          title: "Shopping Cart",
          continueShopping: "Continue Shopping",
          clearCart: "Clear Cart",
          clearConfirm: "Remove all items from your cart?",
          itemsCount: "{{count}} item(s) in your cart",
          itemsCountShort: "({{count}})",
          emptyTitle: "Your cart is empty",
          emptyDesc: "Looks like you haven't added any items yet.",
          startShopping: "Start Shopping"
        },
        item: {
          color: "Color",
          size: "Size",
          decreaseQty: "Decrease quantity",
          increaseQty: "Increase quantity",
          remove: "Remove item"
        },
        summary: {
          orderSummary: "Order Summary",
          subtotal: "Subtotal ({{count}} items)",
          shipping: "Shipping",
          free: "FREE",
          freeShippingNotice: "Free shipping on orders over 50,000원",
          freeShippingRemain: "Add {{amount}} more for free shipping!",
          total: "Total",
          proceedCheckout: "Proceed to Checkout",
          badges: {
            securePayment: "Secure Payment",
            fastDelivery: "Fast Delivery",
            easyPay: "Easy Pay Supported"
          },
          paymentMethodsLabel: "We accept",
          methods: {
            creditCard: "Credit/Debit Card",
            kakaoPay: "KakaoPay",
            naverPay: "NaverPay",
            bankTransfer: "Bank Transfer"
          },
          mobile: {
            totalLabel: "Total",
            checkout: "Checkout"
          }
        }
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
      },
      category: {
        results: "{{count}} items",
        searchPlaceholder: "Search within category",
        sort: "Sort",
        sortOptions: {
          recommended: "Recommended",
          priceAsc: "Price: Low to High",
          priceDesc: "Price: High to Low",
          ratingDesc: "Rating",
          newest: "Newest"
        },
        filters: "Filters",
        clearAll: "Clear all",
        price: "Price",
        min: "Min",
        max: "Max",
        colors: "Colors",
        sizes: "Sizes",
        prev: "Prev",
        next: "Next",
        pageOf: "Page {{page}} of {{total}}",
        mobile: {
          openFilters: "Open filters",
          apply: "Apply",
          close: "Close"
        }
      }
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'ko',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    },
    debug: true
  });

export default i18n;