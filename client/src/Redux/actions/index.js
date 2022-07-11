import {
  GET_USERS,
  CREATE_USER,
  UPDATE_USER,
  CLEAR_USER_DETAIL,
  FILTER_USERS_BY_GENDER,
  GET_USER_BY_NICKNAME,
  UPDATE_MATCH,
  FILTERS_BY_ME,
  UPDATE_IMG,
  FILTER_USERS_BY_MATCHES,
  RENDER_ADMIN,
  RENDER_SIDE_BAR,
  GET_USER_ID,
  GET_USER_BY_DETAIL,
  CLEAR_USER_DETAIL_MATCHES,
  /*  GET_USER_BY_GENDERINT, */
  // FILTER_BY_PREFERENCE,
  // FILTER_BY_INTEREST,
  // SORT_BY_AGE,
} from "./types";

//YA SE SETEO EN EL PACKAGE.JSON ==> NO OLVIDES EL npm install
import axios from "axios";

//URL PARA LOS USUARIOS
const url = "https://henrymatch-pg.herokuapp.com/users";

//----THUNK FUNCTIONS---// LAS QUE HACEN REQUIRES A LA DB Y SON ASINCRONAS
export function getUsers() {
  return async function (dispatch) {
    try {
      const users = await axios.get(url);
      return dispatch({
        type: GET_USERS,
        payload: users.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

//RUTA QUE ESTAS USANDO "https://henrymatch-pg.herokuapp.com/users/nickname";
export function getUserByNick(nickname) {
  return async function (dispatch) {
    try {
      const user = await axios.get(url + `/${nickname}`);
      return dispatch({
        type: GET_USER_BY_NICKNAME,
        payload: user.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}
export function getUserByDetail(nickname) {
  return async function (dispatch) {
    try {
      const user = await axios.get(url + `/${nickname}`);
      return dispatch({
        type: GET_USER_BY_DETAIL,
        payload: user.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

//RUTA QUE ESTAS USANDO "https://henrymatch-pg.herokuapp.com/users";
export function createUser(data) {
  return async function (dispatch) {
    try {
      const user = await axios.post(url, data);
      return dispatch({
        type: CREATE_USER,
        payload: user.data,
      });
    } catch (error) {
      return error;
    }
  };
}

export function updateUser(id, data) {
  return async function (dispatch) {
    try {
      const user = await axios.put(
        `https://henrymatch-pg.herokuapp.com/usersID/${id}`,
        data
      );

      return dispatch({
        type: UPDATE_USER,
        payload: user.data,
      });
    } catch (error) {
      return error;
    }
  };
}

export function updateImg(id, data) {
  return async function (dispatch) {
    try {
      const user = await axios.put(
        `https://henrymatch-pg.herokuapp.com/usersImg/${id}`,
        data
      );

      return dispatch({
        type: UPDATE_IMG,
        payload: user.data,
      });
    } catch (error) {
      return error;
    }
  };
}

export function updateMatches(id, data) {
  return async function (dispatch) {
    try {
      const user = await axios.put(
        `https://henrymatch-pg.herokuapp.com/usersMatches/${id}`,
        data
      );
      return dispatch({
        type: UPDATE_MATCH,
        payload: user.data,
      });
    } catch (error) {
      return error;
    }
  };
}

export function filterUserByMatches(matches) {
  return {
    type: FILTER_USERS_BY_MATCHES,
    payload: matches,
  };
}

/* export function updateUser(id, data) {
  return async (dispatch) => {
    try {
      const put = await axios.put(
        `https://henrymatch-pg.herokuapp.com/usersId/${id}`,
        data
      );
      return put;
    } catch (error) {
      console.log(error);
    }
  };
} */

//----ACTION CREATORS---//EL RESTO DE LAS FUNCIONES VAN AQUI:

export function filterByGender(gender) {
  return {
    type: FILTER_USERS_BY_GENDER,
    payload: gender,
  };
}

export function filterByMe(payload) {
  return {
    type: FILTERS_BY_ME,
    payload,
  };
}

export function clearUserDetail(payload) {
  return {
    type: CLEAR_USER_DETAIL,
    payload: payload,
  };
}
export function clearUserDetailMatches(payload) {
  return {
    type: CLEAR_USER_DETAIL_MATCHES,
    payload: payload,
  };
}

export function renderAdmin(payload) {
  return {
    type: RENDER_ADMIN,
    payload: payload,
  };
}

export function renderSideBar(payload) {
  return {
    type: RENDER_SIDE_BAR,
    payload: payload,
  };
}


//FUNCION PARA CLEAR_MESSAGE

/* cuando le das a la imagen a laderecha se actuialice un PUT en el usuario el id de quien le dio like */
