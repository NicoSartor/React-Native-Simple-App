import React from "react";
import {
	StyleSheet,
	Text,
	View,
	FlatList,
	TouchableOpacity,
	Button,
} from "react-native";
import { Icon } from "react-native-elements";

export default function GoalList(props) {
	return (
		<FlatList
			style={styles.ListWrapper}
			data={props.goals}
			contentContainerStyle={{ paddingBottom: 20 }}
			renderItem={itemData => (
				<View style={styles.ListItemWrapper}>
					<Text
						style={{
							...styles.ListItemText,
						}}
					>
						{itemData.item.text}
					</Text>
					<TouchableOpacity
						style={styles.ListItemBtnWrapper}
						onPress={() => {
							props.handleValueDeletion(itemData.index);
						}}
					>
						<View style={styles.ListItemBtn}>
							{/* <Text style={styles.ListItemBtnText}>X</Text> */}
							<Icon
								name='done'
								type='material'
								color='#659c73'
								size={32}
							/>
						</View>
					</TouchableOpacity>
				</View>
			)}
		/>
	);
}

const styles = StyleSheet.create({
	ListWrapper: {
		// padding: 10,
		// flex: 1,
	},
	ListItemWrapper: {
		flexDirection: "row",
		borderColor: "#949494",
		borderWidth: 1,
		marginBottom: 8,
		backgroundColor: "white",
	},
	ListItemText: { padding: 15, fontSize: 20, flex: 1, width: "80%" },
	ListItemBtnWrapper: {
		width: "20%",
		alignItems: "center",
		justifyContent: "center",
	},
	ListItemBtn: {
		width: "100%",
		// backgroundColor: "red",
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
	ListItemBtnText: {
		fontSize: 15,
		fontWeight: "bold",
	},
});
