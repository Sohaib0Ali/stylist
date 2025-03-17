import { applyMiddleware, combineReducers, legacy_createStore } from "redux";
import ApiData from "./reducers/ApiData";
import sheetManagerReducer from "./reducers/sheetManagerReducer";
import SalonDetailsReducer from './reducers/salonData'
import ReduxThunk from "redux-thunk"

const rootReducer = combineReducers({
    ApiData: ApiData,
    sheetManger: sheetManagerReducer,
    SalonDetails:SalonDetailsReducer
})

export default store = legacy_createStore(rootReducer, applyMiddleware(ReduxThunk));