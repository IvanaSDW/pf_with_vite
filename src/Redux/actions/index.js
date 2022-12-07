import axios from 'axios';
export const GET_MANGAS = "GET_MANGAS"
export const GET_ALL_MANGAS = 'GET_ALL_MANGAS';
export const GET_DETAILS = 'GET_DETAILS';
export const DELETE_DETAILS = 'DELETE_DETAILS';
export const GET_MANGA_BY_NAME = 'GET_MANGA_BY_NAME';
export const GET_ALL_CATEGORIES = 'GET_ALL_CATEGORIES';
export const GET_ALL_GENRES = 'GET_ALL_GENRES';
export const DELETE_MANGA = 'DELETE_MANGA';
export const LOADING_TYPE = 'LOADING_TYPE';
export const UPDATE_MANGA = 'UPDATE_MANGA';
//ORDER
export const MANGA_DATE_ASC = 'MANGA_DATE_ASC';
export const MANGA_DATE_DESC = 'MANGA_DATE_DESC';
export const MANGA_PRICE_ASC = 'MANGA_PRICE_ASC';
export const MANGA_PRICE_DESC = 'MANGA_PRICE_ASC';
//FILTER
export const FILTER_MANGA_BY_CATEGORY = 'FILTER_MANGA_BY_CATEGORY';
export const FILTER_MANGA_BY_GENRE = 'FILTER_MANGA_BY_CATEGORY';
export const FILTER_MANGA_BY_DATE = 'FILTER_MANGA_BY_DATE';
// export const FILTER_ANIME_BY_GENRE = "FILTER_ANIME_BY_CATEGORY"
// CART
export const ADD_TO_CART = 'ADD_TO_CART';
export const RESET_CART = 'RESET_CART';
export const DELETE_FROM_CART = 'DELETE_FROM_CART';
export const SUM_TO_CART = 'SUM_TO_CART';
export const REST_TO_CART = 'REST_TO_CART';
export const ADD_TO_COUNT = 'ADD_TO_COUNT';
export const GET_MANGAS_DETAIL = 'GET_MANGAS_DETAIL';


export const getMangas = () =>{
  return async function (dispatch) {
    try {
        let response = await axios.get("https://backend-production-1a11.up.railway.app/manga");
        return dispatch({
            type : GET_MANGAS,
            payload : response.data
        })
    } catch (err) {
        console.log(err);
    }
}
}

export const getMangasDetail = () =>{
  return async function (dispatch) {
    try {
        let response = await axios.get("https://backend-production-1a11.up.railway.app/manga");
        console.log(response, "RESPONSE DE LA ACTION ")
        return dispatch({
            type : GET_MANGAS_DETAIL,
            payload : response.data
        })
    } catch (err) {
        console.log(err);
    }
}
}

export const getAllMangas = (pageNum, name) => {
  return async function (dispatch) {
    try {
      let response = await axios.get(
        `https://backend-production-1a11.up.railway.app/paginated/manga?page=${pageNum}&name=${name}`
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
      let response = await axios.post(
        'https://backend-production-1a11.up.railway.app/manga',
        payload
      );
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
    const del = await axios.delete(
      `https://backend-production-1a11.up.railway.app/manga/${mangaid}`
    );
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
      var json = await axios.get(
        `https://backend-production-1a11.up.railway.app/manga/${mangaid}`
      );
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
      `https://backend-production-1a11.up.railway.app/paginated/manga?name=${name}&page=${pageNumber}`
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
      let response = await axios.get(
        'https://backend-production-1a11.up.railway.app/category'
      );
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
      let response = await axios.get(
        'https://backend-production-1a11.up.railway.app/genre'
      );
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
        `https://backend-production-1a11.up.railway.app/paginated/manga?page=${pageNumber}&sort=${TYPE}`
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
        `https://backend-production-1a11.up.railway.app/paginated/manga?page=${pageNumber}&sort=${TYPE}`
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
        `https://backend-production-1a11.up.railway.app/manga/c/${category}?page=${pageNumber}`
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
        `https://backend-production-1a11.up.railway.app/manga/g/${genre}?page=${pageNumber}`
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
      let response = await axios.get(
        `https://backend-production-1a11.up.railway.app/manga?sort=dateDesc`
      );

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
  console.log(item, "ITEM")
  console.log(type, "TYPEEEE")
  try {
    return {
      type: ADD_TO_CART,
      payload: {id: item, type: type},
    };
  } catch (err) {
    console.log(err);
  }
};

export const sumItemToCart = (mangaid) => {
  try{
    return{
      type:SUM_TO_CART,
      payload: mangaid,
    }
  }catch(error){
    console.log(error)
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
  console.log(data, "DATSSSSSSSSSSSS")
   return async function (dispatch) {
   
     try {
       const json = await axios.put(
         `https://backend-production-1a11.up.railway.app/manga/${mangaid}`, data );
         console.log(json,"JAMEOSN")
       return dispatch({
         type: UPDATE_MANGA,
         payload: json.data,
       });
     } catch (error) {
       console.log(error);
     }
   };
 }
 

