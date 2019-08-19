import React, { useState, useEffect } from "react";
import { StyleSheet, View } from "react-native";
import _ from "lodash";

import GoalInput from "../components/GoalInput";
import GoalList from "../components/GoalList";

import storageUtils from "../utils/storage";
import appUtils from "../utils/app";

const randomHex = () => {
	return (
		"#" +
		(function co(lor) {
			return (lor += [
				0,
				1,
				2,
				3,
				4,
				5,
				6,
				7,
				8,
				9,
				"a",
				"b",
				"c",
				"d",
				"e",
				"f",
			][Math.floor(Math.random() * 16)]) && lor.length == 6
				? lor
				: co(lor);
		})("")
	);
};

export const GoalPlanner = props => {
	const [textAreaValue, setTextAreaValue] = useState();
	const [goals, setGoals] = useState([]);
	const [hasLoaded, setLoaded] = useState(false);

	const saveGoalsData = async data => {
		try {
			let allData = await appUtils.fetchAllData();
			let goalsList = JSON.parse(JSON.stringify(allData));
			if (goalsList) {
				goalsList[props.plannerId] = data;
			} else {
				goalsList = {};
				goalsList[props.plannerId] = data;
			}

			await storageUtils.storeData(
				"goalsLists",
				JSON.stringify(goalsList),
			);
		} catch (error) {
			console.error("[Error GoalPlanner.js saveGoalsData]", error);
		}
	};

	const fetchGoalsData = async () => {
		try {
			let data = await storageUtils.retrieveData("goalsLists");
			data = JSON.parse(data);
			if (data) {
				if (data[props.plannerId]) {
					const values = data[props.plannerId];
					setLoaded(true);
					setGoals(values);
				}
			}
		} catch (error) {
			console.error("[Error GoalPlanner.js fetchGoalsData]", error);
		}
	};

	const handleValueSubmission = async val => {
		if (!val || val === "") {
			return;
		}
		const valuesArr = Array.from(goals);
		const valObj = {};
		valObj.text = val;
		valObj.key = valuesArr.length + randomHex() + randomHex();
		valObj.color = randomHex();
		valuesArr.push(valObj);
		await saveGoalsData(valuesArr);
		setGoals(valuesArr);
		setTextAreaValue("");
	};

	const handleValueDeletion = async i => {
		const valuesArr = Array.from(goals);
		const newArr = _.remove(valuesArr, v => {
			return i !== valuesArr.indexOf(v);
		});

		await saveGoalsData(newArr);
		setGoals(newArr);
	};

	useEffect(() => {
		fetchGoalsData();
	}, []);

	return (
		<View style={styles.Container}>
			<View style={styles.InputWrapper}>
				<GoalInput
					setTextAreaValue={setTextAreaValue}
					textAreaValue={textAreaValue}
					handleValueSubmission={handleValueSubmission}
				/>
			</View>

			<View style={styles.ListWrapper}>
				<GoalList
					goals={goals}
					handleValueDeletion={handleValueDeletion}
				/>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	Container: {
		flexDirection: "column",
		height: "100%",
	},
	ListWrapper: {
		padding: 10,
		flex: 1,
		paddingLeft: 10,
		paddingRight: 10,
		backgroundColor: "#fafafa",
	},
	InputWrapper: { width: "100%" },
});
