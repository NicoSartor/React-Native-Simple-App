import React from "react";
import {
	StyleSheet,
	Text,
	View,
	FlatList,
	TouchableWithoutFeedback,
} from "react-native";

export default function GoalList(props) {
	return (
		<FlatList
			style={styles.ListWrapper}
			data={props.goals}
			renderItem={itemData => (
				<TouchableWithoutFeedback
					onPress={() => {
						props.handleValueDeletion(itemData.index);
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
	);
}

const styles = StyleSheet.create({
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
