import React, { useState } from "react";
import {
	StyleSheet,
	Text,
	View,
	TextInput,
	Button,
	FlatList,
	TouchableWithoutFeedback,
} from "react-native";
import _ from "lodash";

import storageUtils from "../utils/storage";

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

export const ToDo = props => {
	const [textAreaValue, setTextAreaValue] = useState();
	const [textValues, submitTextValue] = useState([]);
	const [hasFetched, setFetch] = useState(false);

	const handleValueSubmission = async val => {
		if (!val || val === "") {
			return;
		}
		const valuesArr = Array.from(textValues);
		const valObj = {};
		valObj.text = val;
		valObj.key = valuesArr.length + randomHex() + randomHex();
		valObj.color = randomHex();
		valuesArr.push(valObj);
		await props.saveData(valuesArr);
		submitTextValue(valuesArr);
		setTextAreaValue("");
	};

	const handleValueDeletion = async i => {
		const valuesArr = Array.from(textValues);
		const newArr = _.remove(valuesArr, v => {
			return i !== valuesArr.indexOf(v);
		});

		await props.saveData(newArr);
		submitTextValue(newArr);
	};

	if (props.deviceData.length >= 1 && !hasFetched) {
		submitTextValue(props.deviceData);
		setFetch(true);
	}

	return (
		<View style={styles.Container}>
			<View style={styles.TextAreaWrapper}>
				<TextInput
					style={styles.TextInput}
					placeholder='Goal'
					onChangeText={setTextAreaValue}
					value={textAreaValue}
				/>
				<Button
					style={styles.Button}
					onPress={() => {
						handleValueSubmission(textAreaValue);
					}}
					title='Add Goal'
				/>
			</View>
			<FlatList
				style={styles.ListWrapper}
				data={textValues}
				renderItem={itemData => (
					<TouchableWithoutFeedback
						onPress={() => {
							handleValueDeletion(itemData.index);
						}}
					>
						<View>
							<Text
								style={{
									...styles.ListItemText,
									backgroundColor: itemData.item.color,
								}}
							>
								{itemData.item.text}
							</Text>
						</View>
					</TouchableWithoutFeedback>
				)}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	Container: {
		paddingTop: 50,
		paddingLeft: 10,
		paddingRight: 10,
		flexDirection: "column",
		height: "100%",
	},
	TextAreaWrapper: {
		flexDirection: "row",
		justifyContent: "space-around",
		// paddingBottom: 5,
		height: 40,
	},
	TextInput: {
		borderBottomColor: "black",
		borderBottomWidth: 1,
		width: "70%",
	},
	Button: {},
	ListWrapper: {
		padding: 10,
		flex: 1,
	},
	ListItemText: {
		fontSize: 20,
		padding: 10,
		borderColor: "black",
		borderWidth: 1,
		marginBottom: 5,
	},
});
