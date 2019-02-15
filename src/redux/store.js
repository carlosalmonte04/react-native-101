import {createStore} from 'redux';
import {heroReducer} from "./heroReducer";

export const store = createStore(heroReducer);