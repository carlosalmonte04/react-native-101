import { createStore } from "redux";
import { heroReducer } from "./heroReducer";

console.log("HERO REDUCER", heroReducer);

export const store = createStore(heroReducer);
