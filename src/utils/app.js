import storageUtils from "./storage";
export default {
	fetchAllData: async () => {
		try {
			let data = await storageUtils.retrieveData("goalsLists");

			if (data) {
				data = JSON.parse(data);

				const keysArr = Object.keys(data);
				keysArr.forEach(async key => {
					if (data[key].length < 1) {
						// clean data

						delete data[key];

						await storageUtils.storeData("goalsLists", data);
					}
				});
				return data;
			}
		} catch (error) {
			console.error("[Error Retrieving All Data]", error);
		}
	},
};
