import { createStackNavigator } from "react-navigation";
import { SignInScreen, EditProfileScreen } from "@components";
import { AppNavigator } from "./AppNavigator";

const rootScreen = {
  SignInScreen,
  AppNavigator,
  EditProfileScreen,
};

const rootNavigatorConfig = {
  initialRouteName: "SignInScreen",
};

export const RootNavigator = createStackNavigator(
  rootScreen,
  rootNavigatorConfig,
);
