import { AsyncStorage } from "react-native";
export default {
	storeData: async (key, data) => {
		if (!data) {
			return;
		}
		if (typeof data !== "string") {
			data = JSON.stringify(data);
		}
		try {
			await AsyncStorage.setItem(key, data);
		} catch (error) {
			console.error("[utils storage Error Saving Data]", error);
		}
	},
	retrieveData: async key => {
		try {
			let value = await AsyncStorage.getItem(key);
			if (value !== null) {
				return value;
			}
		} catch (error) {
			console.error("[utils storage Error Retrieving Data]", error);
		}
	},
};
