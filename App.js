import React, { Component } from "react";
import { Provider } from "react-redux";
import { RootNavigator } from "@navigation";
import { store } from "@redux";

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <RootNavigator />
      </Provider>
    );
  }
}
