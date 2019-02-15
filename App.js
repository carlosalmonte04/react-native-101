import React, { Component } from "react";
import { RootNavigator } from "@navigation";
import {store} from '@redux';
import {Provider} from 'react-redux';

export default class App extends Component {
  render() {
    return (
    	<Provider store={store}>
    		<RootNavigator />
    	</Provider>
    	)
  }
}
