import {
  ADD_STYLIST,
  SALON_DETAIL,
  MAIN_BRANCH,
  SEAT_DATA,
  SALON_STYLIST,
  SALON_SERVICES,
  SALON_OFFER,
} from '../actions/salons_Actions';

const initialState = {
  SalonStylist: {},
  SalonDetails: {},
  MainBranch: {},
  SeatData: {},
  SalonServices: {},
  SalonOffer: {},
};
const SalonDetailsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SALON_DETAIL:
      return {
        ...state,
        SalonDetails: action.payload,
      };
    case MAIN_BRANCH:
      return {
        ...state,
        MainBranch: action.payload,
      };
    case SEAT_DATA:
      return {
        ...state,
        SeatData: action.payload,
      };
    case SALON_STYLIST:
      return {
        ...state,
        SalonStylist: action.payload,
      };
    case SALON_SERVICES:
      return {
        ...state,
        SalonServices: action.payload,
      };
    case SALON_OFFER:
      return {
        ...state,
        SalonOffer: action.payload,
      };
    default:
      return state;
  }
};
export default SalonDetailsReducer;
