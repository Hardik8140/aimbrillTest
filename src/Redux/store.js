import { applyMiddleware, combineReducers, legacy_createStore } from "redux";
import { thunk } from "redux-thunk";
import { reducer as uploadReducer } from "./reducer";

const rootReducer = combineReducers({ uploadReducer });

export const store = legacy_createStore(rootReducer, applyMiddleware(thunk));
