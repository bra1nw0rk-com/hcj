import WEBFS from "../../../js/lib/core/WEBFS.js";

export default class Programs {
	data = [];
	constructor() {
		this.load();
	}
	load() {
		let result = WEBFS.syncGet("/api/oeprograms.json");
		if (result !== "") {
			try {
				this.data = JSON.parse(result);
			} catch (e) {
				console.log(`Error parsimg JSON from string`);
			}
		}
	}
	find(searchValue) {
		return this.data.find((obj) => Object.values(obj).some((val) => val === searchValue));
	}
}
