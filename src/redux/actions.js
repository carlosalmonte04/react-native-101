import { UPDATE_HERO } from "./types";

export const updateHero = newUserAttributes => ({
  type: UPDATE_HERO,
  payload: newUserAttributes,
});
