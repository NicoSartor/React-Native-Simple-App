import React from "react";
import { StyleSheet, View, TextInput, Button } from "react-native";

export default function GoalInput(props) {
	return (
		<View style={styles.TextAreaWrapper}>
			<TextInput
				style={styles.TextInput}
				placeholder='Goal'
				onChangeText={props.setTextAreaValue}
				value={props.textAreaValue}
			/>
			<Button
				style={styles.Button}
				onPress={() => {
					props.handleValueSubmission(props.textAreaValue);
				}}
				title='Add Goal'
			/>
		</View>
	);
}

const styles = StyleSheet.create({
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
});
