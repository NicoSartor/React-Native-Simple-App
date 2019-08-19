import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text } from "react-native";
import appUtils from "../utils/app";

export default function PlannerLists() {
	const [allData, setAllData] = useState({});

	useEffect(async () => {
		try {
			const data = await appUtils.fetchAllData();
			setAllData(data);
		} catch (err) {
			console.log("[PlannerList.js Error SetAllData]", err);
		}
	}, []);

	return <View style={styles.Container} />;
}

const styles = StyleSheet.create({
	Container: {
		paddingTop: 50,
		paddingLeft: 10,
		paddingRight: 10,
		flexDirection: "column",
		height: "100%",
	},
});
