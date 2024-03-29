import {
  GET_MANGAS,
  GET_ALL_MANGAS,
  GET_DETAILS,
  DELETE_DETAILS,
  GET_MANGA_BY_NAME,
  GET_ALL_CATEGORIES,
  GET_ALL_GENRES,
  GET_PROMOS,
  DELETE_MANGA,
  MANGA_DATE_ASC,
  MANGA_DATE_DESC,
  MANGA_PRICE_ASC,
  MANGA_PRICE_DESC,
  FILTER_MANGA_BY_CATEGORY,
  FILTER_MANGA_BY_GENRE,
  LOADING_TYPE,
  ADD_TO_CART,
  RESET_CART,
  DELETE_FROM_CART,
  SUM_TO_CART,
  REST_TO_CART,
  UPDATE_MANGA,
  GET_MANGAS_DETAIL,
  GET_ORDER,
  FILTER_MANGA_BY_DATE,
  SET_FIREBASE_USER as SET_FIREBASE_USER,
  GET_ALL_USERS,
  GET_AVAILABLE_USERS,
  GET_DISABLED_USERS,
  DELETE_PROMO,
  MANGA_ON_SALE,
  MANGA_FILTER_ON_SALE,
  GET_REVIEW,
  // GET_USER_REVIEW,
  GET_ALL_USER_ORDERS,
  SET_USER_ROLE,
} from '../actions';

const getCartLocalStorage = () => {
  if (localStorage.getItem('cart')) {
    return JSON.parse(localStorage.getItem('cart'));
  }

  return [];
};

const setCartLocalStorage = (cart) =>
  localStorage.setItem('cart', JSON.stringify(cart));

const initialState = {
  mangas: [],
  promos: [],
  mangasForDetail: [],
  DateListMangas: [],
  mangasDetails: {},
  categories: [],
  genres: [],
  orderList: [],
  isLoading: false,
  cart: getCartLocalStorage(),
  firebaseUser: false,
  userRole: false,
  currentPage: 1,
  totalNumberOfPages: 1,
  users: [],
  usersAvailable: [],
  disabledUsers: [],
  mangasOnSale: [],

  reviews: [],
  // usersReview: []

  allorders: [],
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_MANGAS:
      return {
        ...state,
        mangas: action.payload,
      };
    case GET_MANGAS_DETAIL:
      return {
        ...state,
        mangasForDetail: action.payload,
      };
    case GET_ALL_MANGAS:
      return {
        ...state,
        mangas: action.payload.mangas,
        currentPage: action.payload.currentPage,
        totalNumberOfPages: action.payload.totalPages,
        isLoading: false,
      };
    case LOADING_TYPE:
      return {
        ...state,
        isLoading: true,
      };
    case GET_DETAILS:
      return {
        ...state,
        mangasDetails: action.payload,
        isLoading: false,
      };

    case GET_ORDER:
      return {
        ...state,
        orderList: order1.payload,
        isLoading: false,
      };

    case DELETE_DETAILS:
      return {
        ...state,
        mangasDetails: {},
      };
    case GET_MANGA_BY_NAME:
      return {
        ...state,
        mangas: action.payload.mangas,
        currentPage: action.payload.currentPage,
        totalNumberOfPages: action.payload.totalPages,
        isLoading: false,
      };
    case GET_ALL_CATEGORIES:
      return {
        ...state,
        categories: action.payload,
      };
    case GET_ALL_GENRES:
      return {
        ...state,
        genres: action.payload,
      };
    case DELETE_MANGA:
      return {
        ...state,
        mangas: state.mangas.filter((e) => e.mangaid !== action.payload),
      };
    case MANGA_DATE_DESC:
      return {
        ...state,
        mangas: action.payload.mangas,
        currentPage: action.payload.currentPage,
        totalNumberOfPages: action.payload.totalPages,
        isLoading: false,
      };
    case MANGA_DATE_ASC:
      return {
        ...state,
        mangas: action.payload.mangas,
        currentPage: action.payload.currentPage,
        totalNumberOfPages: action.payload.totalPages,
        isLoading: false,
      };

    case MANGA_PRICE_DESC:
      return {
        ...state,
        mangas: action.payload.mangas,
        currentPage: action.payload.currentPage,
        totalNumberOfPages: action.payload.totalPages,
        isLoading: false,
      };
    case MANGA_PRICE_ASC:
      return {
        ...state,
        isLoading: false,
        mangas: action.payload.mangas,
        currentPage: action.payload.currentPage,
        totalNumberOfPages: action.payload.totalPages,
      };

    case FILTER_MANGA_BY_CATEGORY:
      return {
        ...state,
        mangas: action.payload.mangas,
        currentPage: action.payload.currentPage,
        totalNumberOfPages: action.payload.totalPages,
        isLoading: false,
      };

    case FILTER_MANGA_BY_DATE:
      return {
        ...state,
        DateListMangas: action.payload,
      };

    case FILTER_MANGA_BY_GENRE:
      return {
        ...state,
        mangas: action.payload,
        mangas: action.payload.mangas,
        currentPage: action.payload.currentPage,
        totalNumberOfPages: action.payload.totalPages,
        isLoading: false,
      };

    case ADD_TO_CART: {
      const stateToFilter =
        action.payload.type === 'card_detail'
          ? state.mangasForDetail
          : state.mangas;

      const newItem = stateToFilter.find(
        (item) => item.mangaid === action.payload.id
      );

      const ItemInCart = state.cart.find(
        (item) => item.mangaid === action.payload.id
      );

      if (ItemInCart) {
        state.cart = state.cart.map((item) =>
          item.mangaid === newItem.mangaid
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        state.cart = [...state.cart, { ...newItem, quantity: 1 }];
      }

      setCartLocalStorage(state.cart);

      return {
        ...state,
        cart: state.cart,
      };
    }

    case SUM_TO_CART: {
      const ItemInCart = state.cart.find(
        (item) => item.mangaid === action.payload
      );
      return (
        ItemInCart && {
          ...state,
          cart: state.cart.map(
            (item) => ItemInCart && { ...item, quantity: item.quantity + 1 }
          ),
        }
      );

      // setCartLocalStorage(state.cart);

      // return {
      //   ...state,
      //   cart: state.cart,
      // };
    }

    case REST_TO_CART: {
      let itemToDelete = state.cart.find(
        (item) => item.mangaid === action.payload
      );

      if (itemToDelete.quantity > 1) {
        state.cart = state.cart.map((item) =>
          item.mangaid === action.payload
            ? { ...item, quantity: item.quantity - 1 }
            : item
        );
      }

      setCartLocalStorage(state.cart);

      return {
        ...state,
        cart: state.cart,
      };
    }

    case RESET_CART: {
      setCartLocalStorage([]);
      return {
        ...state,
        cart: [],
      };
    }

    case DELETE_FROM_CART: {
      let itemToDelete = state.cart.find(
        (item) => item.mangaid === action.payload
      );

      if (itemToDelete) {
        state.cart = state.cart.filter(
          (item) => item.mangaid !== action.payload
        );
      }

      setCartLocalStorage(state.cart);

      return {
        ...state,
        cart: state.cart,
      };
    }

    case SET_FIREBASE_USER: {
      return {
        ...state,
        firebaseUser: action.payload,
      };
    }
    case UPDATE_MANGA:
      return {
        ...state,
        mangas: state.mangas.map((item) =>
          item.id === action.payload ? action.payload : item
        ),
      };

    case GET_PROMOS: //Bring promos
      return {
        ...state,
        promos: action.payload,
      };

    case DELETE_PROMO: {
      //DELETE PROMO
      return {
        ...state,
        promos: state.promos.filter((p) => p.id !== action.payload),
      };
    }

    case GET_ALL_USERS: //Bring users
      return {
        ...state,
        users: action.payload,
      };

    case GET_AVAILABLE_USERS:
      return {
        ...state,
        usersAvailable: action.payload,
      };

    case GET_DISABLED_USERS:
      return {
        ...state,
        disabledUsers: action.payload,
      };

    case GET_ALL_USER_ORDERS:
      return {
        ...state,
        allorders: action.payload,
      };
    case GET_PROMOS:
      return {
        ...state,
        promos: action.payload,
      };
    case MANGA_ON_SALE:
      return {
        ...state,
        mangasOnSale: action.payload,
      };
    case MANGA_FILTER_ON_SALE:
      const mangasOnSaleFilter = [];

      action.payload.totalMangas.forEach((e) => {
        action.payload.onSaleData.forEach((el) => {
          if (e.mangaid === el[0]) {
            mangasOnSaleFilter.push(e);
          }
        });
      });

      return {
        ...state,
        mangas: mangasOnSaleFilter,
      };
    case GET_REVIEW:
      return {
        ...state,
        reviews: action.payload,
      };

    case SET_USER_ROLE:
      return {
        ...state,
        userRole: action.payload,
      };

    default:
      return state;
  }
};

export default rootReducer;
