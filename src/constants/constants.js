import Config from "react-native-config";
import moment from "moment";
import md5 from "js-md5";
const ts = moment().valueOf();

const { MARVEL_PUBLIC_KEY, MARVEL_PRIVATE_KEY, API_URL } = Config;

const hash = md5(`${ts}${MARVEL_PRIVATE_KEY}${MARVEL_PUBLIC_KEY}`);

const CHARACTERS_URL = `${API_URL}/characters?ts=${ts}&apikey=${MARVEL_PUBLIC_KEY}&limit=50&hash=${hash}`;

export { MARVEL_PUBLIC_KEY, MARVEL_PRIVATE_KEY, CHARACTERS_URL };
