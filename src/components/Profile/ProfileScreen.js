import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { colors, fonts } from "@assets";

export class ProfileScreen extends React.PureComponent {
	navToEditProfile = () => {
		const { navigation } = this.props;

		navigation.navigate("EditProfileScreen");
	};

	render() {
		return (
			<View style={styles.container}>
				<Text style={styles.editProfileText} onPress={this.navToEditProfile}>
					Edit Profile
				</Text>
				<View style={styles.titleContainer}>
					<Text style={styles.title}>
						<Text style={styles.FirstCar}>C</Text>aptain{" "}
						<Text style={styles.SecCar}>A</Text>merica
					</Text>
					<Text style={styles.subtitle}>Steve Rogers</Text>
				</View>
				<View style={styles.DescriptionContainer}>
					<Text style={styles.text}>
						America’s World War II Super-Soldier continues his fight in the
						present as an Avenger and untiring sentinel of liberty.
					</Text>
				</View>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: colors.primary,
		justifyContent: "center",
		alignItems: "center",
	},
	titleContainer: {
		paddingVertical: 20,
		alignItems: "center",
	},
	DescriptionContainer: {
		width: "80%",
		alignItems: "center",
	},
	text: {
		color: colors.textPrimary,
		fontFamily: fonts.defaultFontFamily,
	},
	FirstCar: {
		color: colors.red,
		fontWeight: "bold",
	},
	SecCar: {
		color: colors.blue,
		fontWeight: "bold",
	},
	title: {
		color: colors.textPrimary,
		fontFamily: fonts.defaultFontFamily,
		fontSize: 28,
	},
	subtitle: {
		color: colors.grey,
		fontFamily: fonts.defaultFontFamily,
		fontSize: 20,
	},
	editProfileText: {
		color: colors.textPrimary,
		fontSize: 18,
	},
});
