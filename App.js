import React, { useState, Component } from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import { ToDo } from "./src/features/ToDo.js";
import storageUtils from "./src/utils/storage";

export default class App extends Component {
	state = {
		deviceData: [],
	};

	saveGoalsData = async data => {
		try {
			await storageUtils.storeData("goals", JSON.stringify(data));
		} catch (error) {
			console.error("[Error Retrieving Data]", error);
		}
	};

	fetchGoalsData = async () => {
		try {
			let values = await storageUtils.retrieveData("goals");
			if (values) {
				values = JSON.parse(values);
				this.setState({ deviceData: values });
			}
		} catch (error) {
			console.error("[Error Retrieving Data]", error);
		}
	};

	componentDidMount() {
		this.fetchGoalsData();
	}

	render() {
		return (
			<View style={styles.container}>
				<ToDo
					deviceData={this.state.deviceData}
					saveData={this.saveGoalsData}
				/>
			</View>
		);
	}
}
const styles = StyleSheet.create({
	container: {},
});
