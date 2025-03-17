export const SET_LOGIN_DATA = 'SET_LOGIN_DATA';
export const SET_USER_TOKEN = 'SET_USER_TOKEN';
export const ADD_SELECTED_ITEM = 'ADD_SELECTED_ITEM';
export const REMOVE_SELECTED_ITEM = 'REMOVE_SELECTED_ITEM';
export const SELECTED_SERVICES = 'SELECTED_SERVICES';
export const REMOVE_SERVICES = 'REMOVE_SERVICES';
export const BOOK_SERVICES= 'BOOK_SERVICES';
export const UPDATE_SERVICES = 'UPDATE_SERVICES'
export const ALLHAIRSTYLE = 'ALLHAIRSTYLE'

export const SetLoginData = res => {
  return {type: SET_LOGIN_DATA, response: res};
};

export const SetUserToken = res => {
  return {type: SET_USER_TOKEN, response: res};
};

export const addSelectedItem = (data) => {
  return { type: ADD_SELECTED_ITEM, payload: data };
};

export const removeSelectedItem = (data) => {
  return { type: REMOVE_SELECTED_ITEM, payload: data };
};
export const selectServices = (data) => {
  return { type: SELECTED_SERVICES, payload: data };
};

export const removeServices= (data) => {
  return { type: REMOVE_SERVICES, payload: data };
};
export const Book_Services= (data) => {
  return { type: BOOK_SERVICES, payload: data };
};
export const Update_Services= (data) => {
  return { type: UPDATE_SERVICES, payload: data };
};

export const GetallhairStyle= (data) => {
  return { type: ALLHAIRSTYLE, payload: data };
};


