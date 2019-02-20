import React, { Component } from "react";
import moment from "moment";
import md5 from "js-md5";
import { RootNavigator } from "@navigation";
import { store } from "@redux";
import { Provider } from "react-redux";
import { MARVEL_PUBLIC_KEY, MARVEL_PRIVATE_KEY } from "@constants";

export default class App extends Component {
  async componentDidMount() {
    const ts = moment().valueOf();
    const hash = md5(`${ts}${MARVEL_PRIVATE_KEY}${MARVEL_PUBLIC_KEY}`);
    const charsRes = await fetch(
      `http://gateway.marvel.com/v1/public/characters?ts=${ts}&apikey=${MARVEL_PUBLIC_KEY}&hash=${hash}`,
    );

    const chars = await charsRes.json();

    console.log("CHARS", chars);
  }

  render() {
    return (
      <Provider store={store}>
        <RootNavigator />
      </Provider>
    );
  }
}
