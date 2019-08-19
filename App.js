import React, { Component } from "react";
import { StyleSheet, View, Text } from "react-native";
import { GoalPlanner } from "./src/features/GoalPlanner.js";
import appUtils from "./src/utils/app";

export default class App extends Component {
	render() {
		return (
			<View style={styles.container}>
				<GoalPlanner plannerId='goals' />
			</View>
		);
	}
}
const styles = StyleSheet.create({
	container: {},
});
