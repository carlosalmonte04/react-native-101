import React from "react";
import { View, Text, TouchableOpacity } from "react-native";

export class SignInScreen extends React.PureComponent {
	navToApp = () => {
		const { navigation } = this.props;

		navigation.navigate('AppNavigator');
	}

	render (){
		return <View>
			<TouchableOpacity onPress={this.navToApp}>
				<Text>Sign In</Text>
			</TouchableOpacity>
		</View>
	}
}
