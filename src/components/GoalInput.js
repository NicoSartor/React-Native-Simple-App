import React from "react";
import {
	StyleSheet,
	KeyboardAvoidingView,
	TextInput,
	Button,
	Text,
	View,
	TouchableOpacity,
} from "react-native";
import { Icon } from "react-native-elements";

export default function GoalInput(props) {
	return (
		<KeyboardAvoidingView behavior='position'>
			<View style={styles.TextAreaWrapper}>
				<TextInput
					style={styles.TextInput}
					placeholder='Enter List Item'
					onChangeText={props.setTextAreaValue}
					value={props.textAreaValue}
					onSubmitEditing={() => {
						props.handleValueSubmission(props.textAreaValue);
					}}
				/>
				{/* <Button
					style={styles.Button}
					onPress={() => {
						props.handleValueSubmission(props.textAreaValue);
					}}
					title='Add Item'
				/> */}
				<TouchableOpacity
					style={styles.AddBtnWrapper}
					onPress={() => {
						props.handleValueSubmission(props.textAreaValue);
					}}
				>
					<View style={styles.AddBtn}>
						<Icon
							size={45}
							name='add-box'
							type='material'
							color='#1952cf'
						/>
					</View>
				</TouchableOpacity>
			</View>
		</KeyboardAvoidingView>
	);
}

const styles = StyleSheet.create({
	TextAreaWrapper: {
		flexDirection: "row",
		justifyContent: "space-around",
		paddingBottom: 20,
		paddingTop: 60,
		borderBottomColor: "#d4d4d4",
		borderBottomWidth: 4,
	},
	TextInput: {
		borderBottomColor: "#949494",
		borderBottomWidth: 1,
		width: "70%",
	},
	AddBtnWrapper: {
		width: "20%",
		alignItems: "center",
		justifyContent: "center",
	},
	AddBtn: {
		width: "100%",
		flexDirection: "row",
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
});
