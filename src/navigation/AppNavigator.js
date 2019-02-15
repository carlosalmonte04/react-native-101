import {createBottomTabNavigator} from 'react-navigation-tabs';
import {HomeScreen, ProfileScreen} from '@components';

const appScreen = {
	HomeScreen,
	ProfileScreen
}

const appNavigatorConfig = {
	initialRouteName: 'HomeScreen',
};

export const AppNavigator = createBottomTabNavigator(
	appScreen,
	appNavigatorConfig,
);