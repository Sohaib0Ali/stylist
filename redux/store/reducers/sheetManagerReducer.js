import {
  OPEN_SHEET,
  SET_SNAP_INDEX,
  SET_SNAP_POINTS,
  CLOSE_TAB,
} from '../actions/sheetManagerActions';

const initialState = {
  snapPoints: ['60%', '80%', '90%'],
  snapIndex: 0,
  openSheet: false,
  closeTab: false,
};
const sheetManagerReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_SNAP_POINTS:
      return {
        ...state,
        snapPoints: action.payload,
      };
    case SET_SNAP_INDEX:
      return {
        ...state,
        snapIndex: action.payload,
      };
    case OPEN_SHEET:
      return {
        ...state,
        openSheet: action.payload,
      };
    case CLOSE_TAB:
      return {
        ...state,
        closeTab: action.payload,
      };
    default:
      return state;
  }
};
export default sheetManagerReducer;
