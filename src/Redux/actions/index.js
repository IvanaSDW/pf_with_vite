import axios from 'axios';
import swal from 'sweetalert';
import { SERVER_URL } from '../../domain/serverConfig';
export const GET_MANGAS = 'GET_MANGAS';
export const GET_ALL_MANGAS = 'GET_ALL_MANGAS';
export const GET_DETAILS = 'GET_DETAILS';
export const DELETE_DETAILS = 'DELETE_DETAILS';
export const GET_MANGA_BY_NAME = 'GET_MANGA_BY_NAME';
export const GET_ALL_CATEGORIES = 'GET_ALL_CATEGORIES';
export const GET_ALL_GENRES = 'GET_ALL_GENRES';
export const DELETE_MANGA = 'DELETE_MANGA';
export const LOADING_TYPE = 'LOADING_TYPE';
export const UPDATE_MANGA = 'UPDATE_MANGA';
export const GET_ALL_USERS = 'GET_ALL_USERS';
export const GET_AVAILABLE_USERS = 'GET_AVAILABLE_USERS';
export const GET_DISABLED_USERS = 'GET_DISABLED_USERS';
export const DELETE_PROMO = 'DELETE_PROMO';
//ORDER
export const MANGA_DATE_ASC = 'MANGA_DATE_ASC';
export const MANGA_DATE_DESC = 'MANGA_DATE_DESC';
export const MANGA_PRICE_ASC = 'MANGA_PRICE_ASC';
export const MANGA_PRICE_DESC = 'MANGA_PRICE_ASC';
//FILTER
export const FILTER_MANGA_BY_CATEGORY = 'FILTER_MANGA_BY_CATEGORY';
export const FILTER_MANGA_BY_GENRE = 'FILTER_MANGA_BY_CATEGORY';
export const FILTER_MANGA_BY_DATE = 'FILTER_MANGA_BY_DATE';
export const MANGA_FILTER_ON_SALE = 'MANGA_FILTER_ON_SALE';
// export const FILTER_ANIME_BY_GENRE = "FILTER_ANIME_BY_CATEGORY"
// CART
export const ADD_TO_CART = 'ADD_TO_CART';
export const RESET_CART = 'RESET_CART';
export const DELETE_FROM_CART = 'DELETE_FROM_CART';
export const SUM_TO_CART = 'SUM_TO_CART';
export const REST_TO_CART = 'REST_TO_CART';
export const ADD_TO_COUNT = 'ADD_TO_COUNT';
export const GET_MANGAS_DETAIL = 'GET_MANGAS_DETAIL';
export const GET_PROMOS = 'GET_PROMOS';
export const MANGA_ON_SALE = 'MANGA_ON_SALE';
///GET ORDER LIST
export const GET_ORDER = 'GET_ORDER';

export const GET_REVIEW = 'GET_REVIEW';
// export const GET_USER_REVIEW = "GET_USER_REVIEW"
export const GET_ALL_USER_ORDERS = 'GET_ALL_USER_ORDERS';
export const SET_USER_ROLE = 'SET_USER_ROLE';

export const getMangas = () => {
  return async function (dispatch) {
    try {
      let response = await axios.get(`${SERVER_URL}/manga`);
      return dispatch({
        type: GET_MANGAS,
        payload: response.data,
      });
    } catch (err) {
      console.log(err);
    }
  };
};

export const getMangasDetail = () => {
  return async function (dispatch) {
    try {
      let response = await axios.get(`${SERVER_URL}/manga`);

      return dispatch({
        type: GET_MANGAS_DETAIL,
        payload: response.data,
      });
    } catch (err) {
      console.log(err);
    }
  };
};

export const getAllMangas = (pageNum, name) => {
  return async function (dispatch) {
    try {
      let response = await axios.get(
        `${SERVER_URL}/paginated/manga?page=${pageNum}&name=${name}`
      );
      return dispatch({
        type: GET_ALL_MANGAS,
        payload: response.data,
      });
    } catch (err) {
      console.log(err);
    }
  };
};

export const postManga = (payload) => {
  return async function () {
    try {
      let response = await axios.post(`${SERVER_URL}/manga`, payload);
      return response;
    } catch (error) {}
  };
};

export function deleteDetails() {
  return {
    type: DELETE_DETAILS,
  };
}

export function deleteManga(mangaid) {
  return async function (dispatch) {
    const del = await axios.delete(`${SERVER_URL}/manga/${mangaid}`);
    return dispatch(
      {
        type: 'DELETE_MANGA',
        payload: mangaid,
      },
      del
    );
  };
}

export function getDetails(mangaid) {
  return async function (dispatch) {
    try {
      var json = await axios.get(`${SERVER_URL}/manga/${mangaid}`);
      return dispatch({
        type: GET_DETAILS,
        payload: json.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function getMangByName(name, pageNumber) {
  return async function (dispatch) {
    const { data } = await axios.get(
      `${SERVER_URL}/paginated/manga?name=${name}&page=${pageNumber}`
    );
    return dispatch({
      type: 'GET_MANGA_BY_NAME',
      payload: data,
    });
  };
}

export const getAllCategories = () => {
  return async function (dispatch) {
    try {
      let response = await axios.get(`${SERVER_URL}/category`);
      return dispatch({
        type: GET_ALL_CATEGORIES,
        payload: response.data,
      });
    } catch (err) {
      console.log(err);
    }
  };
};

export const getAllGenres = () => {
  return async function (dispatch) {
    try {
      let response = await axios.get(`${SERVER_URL}/genre`);
      return dispatch({
        type: GET_ALL_GENRES,
        payload: response.data,
      });
    } catch (err) {
      console.log(err);
    }
  };
};

export const getMangaByEmisionDate = (TYPE, pageNumber) => {
  return async function (dispatch) {
    try {
      let response = await axios.get(
        `${SERVER_URL}/paginated/manga?page=${pageNumber}&sort=${TYPE}`
      );
      return dispatch({
        type: TYPE === 'dateDesc' ? MANGA_DATE_DESC : MANGA_DATE_ASC,
        payload: response.data,
      });
    } catch (err) {
      console.log(err);
    }
  };
};

export const getMangaByPrice = (TYPE, pageNumber) => {
  return async function (dispatch) {
    try {
      let response = await axios.get(
        `${SERVER_URL}/paginated/manga?page=${pageNumber}&sort=${TYPE}`
      );
      return dispatch({
        type: TYPE === 'priceAsc' ? MANGA_PRICE_ASC : MANGA_PRICE_DESC,
        payload: response.data,
      });
    } catch (err) {
      console.log(err);
    }
  };
};

export const filterByCategories = (category, pageNumber) => {
  return async function (dispatch) {
    try {
      let response = await axios.get(
        `${SERVER_URL}/manga/c/${category}?page=${pageNumber}`
      );
      return dispatch({
        type: FILTER_MANGA_BY_CATEGORY,
        payload: response.data,
      });
    } catch (err) {
      console.log(err);
    }
  };
};

export const filterMangaByGenres = (genre, pageNumber) => {
  return async function (dispatch) {
    try {
      let response = await axios.get(
        `${SERVER_URL}/manga/g/${genre}?page=${pageNumber}`
      );

      return dispatch({
        type: FILTER_MANGA_BY_GENRE,
        payload: response.data,
      });
    } catch (err) {
      console.log(err);
    }
  };
};

export const filterMangaByDate = () => {
  return async function (dispatch) {
    try {
      let response = await axios.get(`${SERVER_URL}/manga?sort=dateDesc`);

      return dispatch({
        type: FILTER_MANGA_BY_DATE,
        payload: response.data,
      });
    } catch (err) {
      console.log(err);
    }
  };
};

export const loading = () => {
  return {
    type: LOADING_TYPE,
    payload: true,
  };
};

export const addItemToCart = (item, type) => {
  try {
    return {
      type: ADD_TO_CART,
      payload: { id: item, type: type },
    };
  } catch (err) {
    console.log(err);
  }
};

export const sumItemToCart = (mangaid) => {
  try {
    return {
      type: SUM_TO_CART,
      payload: mangaid,
    };
  } catch (error) {
    console.log(error);
  }
};

export const restItemToCart = (mangaid) => {
  return {
    type: REST_TO_CART,
    payload: mangaid,
  };
};

export const resetCart = (mangaid) => {
  try {
    return {
      type: RESET_CART,
      payload: mangaid,
    };
  } catch (err) {
    console.log(err);
  }
};

export const DeleteCart = (mangaid) => {
  try {
    return {
      type: DELETE_FROM_CART,
      payload: mangaid,
    };
  } catch (err) {
    console.log(err);
  }
};

// User action constants
export const SET_FIREBASE_USER = 'SET_FIREBASE_USER';

export const setFirebaseUser = (firebaseUser) => {
  return {
    type: SET_FIREBASE_USER,
    payload: firebaseUser ? firebaseUser : false,
  };
};

export function updateManga(mangaid, data) {
  return async function (dispatch) {
    try {
      const json = await axios.put(`${SERVER_URL}/manga/${mangaid}`, data);

      return dispatch({
        type: UPDATE_MANGA,
        payload: json.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

//cms/promotions
export function postPromotion(payload) {
  return async function (dispatch) {
    try {
      const post = await axios.post(`${SERVER_URL}/promotion`, payload);

      return post;
    } catch (error) {
      console.log(error);
    }
  };
}

export const getPromos = () => {
  return async function (dispatch) {
    try {
      let promos = await axios.get(`${SERVER_URL}/activepromos`);
      return dispatch({
        type: GET_PROMOS,
        payload: promos.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const deletePromos = (promoid) => {
  return async function (dispatch) {
    try {
      const delet = await axios.delete(`${SERVER_URL}/promotion/${promoid}`);
      swal('Se ha borrado con exito'); //Optimizar esto
      return dispatch({
        type: DELETE_PROMO,
        payload: delet.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const getAllUsers = () => {
  return async function (dispatch) {
    try {
      let users = await axios.get(`${SERVER_URL}/user`);
      return dispatch({
        type: GET_ALL_USERS,
        payload: users.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const getAvailableUsers = () => {
  return async function (dispatch) {
    try {
      const available = await axios.get(`${SERVER_URL}/user/available`);
      return dispatch({
        type: GET_AVAILABLE_USERS,
        payload: available.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const getDisabledUsers = () => {
  return async function (dispatch) {
    try {
      const disabled = await axios.get(`${SERVER_URL}/user/disabled`);
      return dispatch({
        type: GET_DISABLED_USERS,
        payload: disabled.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export function getOrderList(userId) {
  return async function (dispatch) {
    try {
      const order1 = await axios.get(`${SERVER_URL}/order/user/${userId}`);

      return dispatch({
        type: GET_ORDER,
        payload: order1.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function getReview(mangaid) {
  return async function (dispatch) {
    try {
      const review = await axios.get(
        `https://backend-production-1a11.up.railway.app/review/manga/${mangaid}`
      );
      return dispatch({
        type: GET_REVIEW,
        payload: review.data,
      });
    } catch (error) {
      swal(error);
    }
  };
}

export const getMangasOnSale = () => {
  return async function (dispatch) {
    try {
      let response = await axios.get(`${SERVER_URL}/onsale`);
      return dispatch({
        type: MANGA_ON_SALE,
        payload: response.data,
      });
    } catch (err) {
      console.log(err);
    }
  };
};

export const filterMangasOnSale = () => {
  return async function (dispatch) {
    try {
      const response = await axios.get(
        'https://backend-production-1a11.up.railway.app/onsale'
      );
      const responseTotal = await axios.get(
        'https://backend-production-1a11.up.railway.app/manga'
      );
      return dispatch({
        type: MANGA_FILTER_ON_SALE,
        payload: { onSaleData: response.data, totalMangas: responseTotal.data },
      });
    } catch (err) {
      console.log(err);
    }
  };
};

//ALL ORDERS
export const getAllUserOrders = () => {
  return async function (dispatch) {
    try {
      const allUserOrders = await axios.get(`${SERVER_URL}/order`);
      return dispatch({
        type: GET_ALL_USER_ORDERS,
        payload: allUserOrders.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const setUserRole = (role) => {
  return {
    type: SET_USER_ROLE,
    payload: role,
  };
};
