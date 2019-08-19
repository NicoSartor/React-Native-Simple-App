import storageUtils from "./storage";
export default {
	fetchAllData: async () => {
		try {
			let data = await storageUtils.retrieveData("goalsLists");

			if (data) {
				data = JSON.parse(data);
				return data;
			}
		} catch (error) {
			console.error("[utils>app.js Error Retrieving All Data]", error);
		}
	},
	deleteList: async key => {
		try {
			let data = await storageUtils.retrieveData("goalsLists");
			if (data) {
				data = JSON.parse(data);
				if (data[key]) {
					delete data[key];
					await storageUtils.storeData("goalsLists", data);
				} else {
					throw `Couldn't find List Id: ${key}`;
				}
			}
		} catch (error) {
			console.error("[utils>app.js Error Deleting List]", error);
		}
	},
};
