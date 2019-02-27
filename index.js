/**
 * @format
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import { AppRegistry, Platform } from "react-native";
import App from "./App";
import { name as appName } from "./app.json";

const isWeb = Platform.OS === "web";

AppRegistry.registerComponent(appName, () => App);

if (isWeb) {
  AppRegistry.runApplication(appName, {
    rootTag: window.document.getElementById("react-root"),
  });
}
