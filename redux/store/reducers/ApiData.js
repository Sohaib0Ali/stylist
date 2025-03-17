// eslint-disable-next-line no-unused-vars
import React from 'react';
import {
  SET_LOGIN_DATA,
  SET_SELECTED_SERVICES,
  SET_USER_TOKEN,
  ADD_SELECTED_ITEM,
  REMOVE_SELECTED_ITEM,
  SELECTED_SERVICES,
  REMOVE_SERVICES,
  BOOK_SERVICES,
  UPDATE_SERVICES,
  ALLHAIRSTYLE,
} from '../actions/ApiData';

const initialState = {
  loginData: '',
  token: '',
  selectedItem: [],
  selectedService: [],
  BookingService: [],
  TempData: [],
  Hairstyle: '',
};

const ApiData = (state = initialState, action) => {
  switch (action.type) {
    case SET_LOGIN_DATA:
      return {
        ...state,
        loginData: action.response,
      };
    case SET_USER_TOKEN:
      return {
        ...state,
        token: action.response,
      };
    case ADD_SELECTED_ITEM:
      return {
        ...state,
        selectedItem: [...state.selectedItem, action.payload],
      };
    case REMOVE_SELECTED_ITEM:
      return {
        ...state,
        selectedItem: state.selectedItem.filter(
          item =>
            !(
              item.crewid === action.payload.crewid &&
              item.Service_id === action.payload.Service_id
            ),
        ),
      };
    case SELECTED_SERVICES:
      return {
        ...state,
        selectedService: [...state.selectedService, action.payload],
      };

    case REMOVE_SERVICES:
      return {
        ...state,
        selectedService: state.selectedService.filter(
          item => !(item?.serviceId === action.payload.serviceId),
        ),
      };

    case BOOK_SERVICES:
      return {
        ...state,
        BookingService: [...state.BookingService, action.payload],
      };
    case UPDATE_SERVICES:
      return {
        ...state,
        BookingService: state.BookingService.map(item =>
          item?.Booked_crew?.crewid === action?.payload?.Booked_crew?.crewid &&
          item?.Booked_crew?.Main_ServiceID ===
            action?.payload?.Booked_crew?.Main_ServiceID &&
          item?.Booked_crew?.Service_id ===
            action?.payload?.Booked_crew?.Service_id
            ? action.payload
            : item,
        ),
      };
    case ALLHAIRSTYLE:
      return {
        ...state,
        Hairstyle: action.payload,
      };

    default:
      return state;
  }
};

export default ApiData;
