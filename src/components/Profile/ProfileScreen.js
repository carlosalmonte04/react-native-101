import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { colors, fonts } from "@assets";
import { connect } from "react-redux";

export class UnconnectedProfileScreen extends React.PureComponent {
	navToEditProfile = () => {
		const { navigation } = this.props;

		navigation.navigate("EditProfileScreen");
	};

	render() {
		const { name, lastName, heroName, bio } = this.props;

		const [firstHeroName, secondHeroName] = heroName.split(" ");
		// const [firstHeroName, secondHeroName] = [1,2]

		//  firstHeroName = 1
		//  secondHeroName = 2

		return (
			<View style={styles.container}>
				<Text style={styles.editProfileText} onPress={this.navToEditProfile}>
					Edit Profile
				</Text>
				<View style={styles.titleContainer}>
					<Text style={styles.title}>
						<Text style={styles.FirstCar}>{firstHeroName[0]}</Text>
						{firstHeroName.slice(1)}{" "}
						<Text style={styles.SecCar}>{secondHeroName[0]}</Text>
						{secondHeroName.slice(1)}
					</Text>
					<Text style={styles.subtitle}>
						{name} {lastName}
					</Text>
				</View>
				<View style={styles.DescriptionContainer}>
					<Text style={styles.text}>{bio}</Text>
				</View>
			</View>
		);
	}
}

const mapStateToProps = ({ hero }) => ({
	name: hero.name,
	lastName: hero.lastName,
	heroName: hero.heroName,
	bio: hero.bio,
});

export const ProfileScreen = connect(mapStateToProps)(UnconnectedProfileScreen);

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
