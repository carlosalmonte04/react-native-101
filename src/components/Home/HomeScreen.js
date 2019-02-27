import React from "react";
import {
	Text,
	Image,
	FlatList,
	ActivityIndicator,
	View,
	StyleSheet,
	TextInput,
} from "react-native";
import { colors, fonts } from "@assets";
import { images } from "@img";
import { Counter } from "../Counter";
import { CHARACTERS_URL } from "@constants";
import { debounce } from "underscore";

export class HomeScreen extends React.PureComponent {
	state = {
		counter: 0,
		heroes: [],
		loading: true,
	};

	async componentDidMount() {
		const charsRes = await fetch(CHARACTERS_URL);

		const chars = await charsRes.json();

		const { results: heroes } = chars.data;
		// const heroes = chars.data.results

		console.log("**CHARS: All chars from API", chars);

		this.setState({ heroes, loading: false });
	}

	increaseCounter = () => {
		const { counter } = this.state;
		this.setState({ counter: counter + 1 });
	};

	decreaseCounter = () => {
		const { counter } = this.state;
		this.setState({ counter: counter - 1 });
	};

	renderItem = ({ item: heroData }) => {
		console.log("hero data", heroData);
		return (
			<View
				style={{
					flexDirection: "row",
					alignItems: "center",
					width: "100%",
					marginTop: 8,
					paddingVertical: 4,
					paddingHorizontal: 8,
					backgroundColor: colors.textPrimary,
				}}
				key={heroData.id}
			>
				<Image
					source={{ uri: heroData.thumbnail.path }}
					style={styles.heroImage}
					resizeMode="cover"
				/>
				<View>
					<Text>{heroData.name}</Text>
					<Text>{heroData.id}</Text>
				</View>
			</View>
		);
	};

	fetchHeroes = async ({ nameStartsWith }) => {
		const { searchQuery } = this.state;
		const searchUrl = `${CHARACTERS_URL}&nameStartsWith=${searchQuery}`;

		const heroesRes = await fetch(searchUrl);
		const heroesJson = await heroesRes.json();

		const { results: heroes } = heroesJson.data;

		console.log("**HEROES: Search results", heroes);

		this.setState({ heroes, loading: false });
	};

	debouncedFetchHeroes = debounce(this.fetchHeroes, 2000);

	onChangeText = searchQuery => {
		const { loading } = this.state;

		if (!loading) {
			// this.setState({ loading: true });
		}

		this.setState({ searchQuery }, () => {
			this.debouncedFetchHeroes({ nameStartsWith: searchQuery });
		});
	};

	render() {
		const { loading, counter, heroes, searchQuery } = this.state;

		return (
			<View style={styles.container}>
				<TextInput
					style={{
						height: 50,
						width: "100%",
						backgroundColor: colors.textPrimary,
					}}
					value={searchQuery}
					onChangeText={this.onChangeText}
				/>
				{loading ? (
					<ActivityIndicator size={1} color={colors.primary} />
				) : (
					<FlatList
						data={heroes}
						renderItem={this.renderItem}
						keyExtractor={item => item.id}
					/>
				)}
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
	listItem: {
		flexDirection: "row",
		alignItems: "center",
		width: "100%",
		marginTop: 8,
		paddingVertical: 4,
		paddingHorizontal: 8,
		backgroundColor: colors.textPrimary,
	},
	heroImage: {
		width: 50,
		height: 50,
		borderRadius: 25,
		marginRight: 8,
		backgroundColor: "red",
	},
});
//
//
// 			<View style={styles.container}>
// 				{/* text */}
// 				{/* <Text style={styles.text}>Hello</Text> */}
//
// 				{/* import image from same folder */}
// 				{/* <Image style = {styles.capimage} source={require('./cap.png')} /> */}
//
// 				{/* import image from other sources - ADVANCED!!! */}
// 				<Image style={styles.capimage} source={images.cap_img} />
//
// 				{/* Both text and counter works bellow, we're creating #Counter as a reusable function*/}
// 				{/* <Text style = {styles.counter}>{counter}</Text> */}
// 				<Counter counterValue={counter} />
//
// 				<View style={styles.buttonsContainer}>
// 					<TouchableOpacity onPress={this.increaseCounter}>
// 						<View style={[styles.button, styles.buttonIncrease]}>
// 							<Text style={styles.buttonText}>Increase</Text>
// 						</View>
// 					</TouchableOpacity>
//
// 					<TouchableOpacity onPress={this.decreaseCounter}>
// 						<View style={[styles.button, styles.buttonDecrease]}>
// 							<Text style={styles.buttonText}>Decrease</Text>
// 						</View>
// 					</TouchableOpacity>
// 				</View>
// 			</View>
