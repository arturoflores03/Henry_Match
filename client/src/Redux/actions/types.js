//-----GET------//

//DONE!
export const GET_USERS = "GET_USERS";

export const GET_USER_BY_NICKNAME = "GET_USER_BY_NICKNAME";
//DONE

export const GET_USER_LIKES = "GET_USER_LIKES";
//PRIORIDA ALTA

export const GET_USER_MATCHES = "GET_USER_MATCHES";
//PRIORIDAD ALTA

export const FILTER_USERS_BY_MATCHES = "FILTER_USERS_BY_MATCHES";

export const UPDATE_MATCH = "UPDATE_MATCH";
//-----FILTERS & SORTERS------//

export const FILTERS_BY_ME = "FILTERS_BY_ME";

export const FILTER_USERS_BY_GENDER = "FILTER_USERS_BY_GENDER";
//DONE!""

export const FILTER_BY_HENRYLVL = "FILTER_BY_HENRYLVL";
//===> ETAPA DEL BOOTCAMP (CHALLENGE, M1, M2, M3, M4 PI, PF, GRADUATED)
//PRIORIDAD MEDIA

/* export const FILTER_BY_INTEREST = "FILTER_BY_INTEREST";
 */
export const SORT_BY_AGE = "SORT_BY_AGE";
//PRIORIDAD MEDIA

//-----CREATE (POST)------//

export const CREATE_USER = "CREATE_USER";
//PRIORIDAD ALTA

//-----UPDATE (PUT)------//

export const UPDATE_USER = "PUT_USER";
export const UPDATE_IMG = "UPDATE_IMG";
//PRIORIDAD ALTA

/* 
STORE-REDUX

const initialState = {
  users: [],
  usersToWork: [], //USADO PARA FILTERS & SORTERS 
  userDetail: [], //USADO TAMBIEN PARA CLEAR_USER_DETAIL
  
  OPCIONALES?   
  message: [],
  gender: [],
}; 
*/
//-----STATES------//
//
export const CLEAR_USER_DETAIL = "CLEAR_USER_DETAIL";

//CLEAR_MESSAGE

export const RENDER_ADMIN = "RENDER_ADMIN";
