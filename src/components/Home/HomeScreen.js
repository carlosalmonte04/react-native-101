import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { colors, fonts } from "@assets";
import { images } from "@img";
import { Counter } from "../Counter";
import { CHARACTERS_URL } from "@constants";

export class HomeScreen extends React.PureComponent {
	state = {
		counter: 0,
	};

	async componentDidMount() {
		const charsRes = await fetch(CHARACTERS_URL);

		const chars = await charsRes.json();

		console.log("**CHARS: All chars from API", chars);
	}

	increaseCounter = () => {
		const { counter } = this.state;
		this.setState({ counter: counter + 1 });
	};

	decreaseCounter = () => {
		const { counter } = this.state;
		this.setState({ counter: counter - 1 });
	};

	render() {
		const { counter } = this.state;

		return (
			<View style={styles.container}>
				{/* text */}
				{/* <Text style={styles.text}>Hello</Text> */}

				{/* import image from same folder */}
				{/* <Image style = {styles.capimage} source={require('./cap.png')} /> */}

				{/* import image from other sources - ADVANCED!!! */}
				<Image style={styles.capimage} source={images.cap_img} />

				{/* Both text and counter works bellow, we're creating #Counter as a reusable function*/}
				{/* <Text style = {styles.counter}>{counter}</Text> */}
				<Counter counterValue={counter} />

				<View style={styles.buttonsContainer}>
					<TouchableOpacity onPress={this.increaseCounter}>
						<View style={[styles.button, styles.buttonIncrease]}>
							<Text style={styles.buttonText}>Increase</Text>
						</View>
					</TouchableOpacity>

					<TouchableOpacity onPress={this.decreaseCounter}>
						<View style={[styles.button, styles.buttonDecrease]}>
							<Text style={styles.buttonText}>Decrease</Text>
						</View>
					</TouchableOpacity>
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
	text: {
		color: colors.textPrimary,
		fontFamily: fonts.defaultFontFamily,
	},
	capimage: {
		flex: 1,
		resizeMode: "contain",
		alignSelf: "center",
		width: "50%",
		position: "absolute",
	},
	counter: {
		color: colors.textPrimary,
		fontSize: 28,
	},
	button: {
		paddingHorizontal: 30,
		paddingVertical: 8,
		alignItems: "center",
		justifyContent: "center",
	},
	buttonIncrease: {
		backgroundColor: colors.red,
	},
	buttonDecrease: {
		backgroundColor: colors.blue,
	},
	buttonText: {
		color: colors.textPrimary,
		fontSize: 18,
	},
	buttonsContainer: {
		flexDirection: "row",
		width: "80%",
		alignItems: "center",
		alignSelf: "center",
		justifyContent: "space-between",
		transform: [{ translateY: 100 }],
	},
});
