import { CHARACTERS_URL } from "@constants";

export const getHeroSearch = async ({ nameStartsWith }) => {
  const heroesRes = await fetch(
    `${CHARACTERS_URL}&nameStartsWith=${nameStartsWith}`,
  );

  const heroes = await heroesRes.json();

  return heroes;
};
