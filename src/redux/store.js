import { createStore, combineReducers } from "redux";
import { heroReducer } from "./heroReducer";

const reducers = combineReducers({ hero: heroReducer });

export const store = createStore(reducers);
