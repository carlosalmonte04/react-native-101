import { MOCK_USER } from "@mocks";
import {UPDATE_HERO} from "./types";

const INITIAL_STATE = {
  name: MOCK_USER.name,
  lastName: MOCK_USER.lastName,
  heroName: MOCK_USER.heroName,
  bio: MOCK_USER.bio,
};

export const heroReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case UPDATE_HERO:
      const { payload: newUserAttributes } = action;

      return {
        ...state,
        ...newUserAttributes,
      };

    default:
      return state;
  }
};

// updateHero({ name: "john luc" });

/*
  {
  name: john luc,
  lastName: MOCK_USER.lastName,
  heroName: MOCK_USER.heroName,
  bio: MOCK_USER.bio,
};
*/
