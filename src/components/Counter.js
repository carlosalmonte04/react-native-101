import React from "react";
import {View, Text, StyleSheet} from "react-native";
import PropTypes from "prop-types";
import {colors} from "@assets";

export const Counter = ({counterValue}) => (
	<View>
		<Text style={styles.counter}>{counterValue}</Text>
	</View>
);

const styles= StyleSheet.create({
	counter:{
		color:colors.textPrimary,
		fontSize:28,
	}
})

Counter.propTypes = {
	counterValue:PropTypes.number,
};

Counter.defaultProps = {
	counterValue:0,
};