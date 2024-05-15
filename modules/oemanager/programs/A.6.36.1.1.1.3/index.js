import Program from "../../libs/Program.js";

export default class Executor extends Program {
	constructor() {
		super();
		let _this = this;
		this.classes = "36-1-1-1-3";
		this.title = "36.1.1.1.3 Domains";
		let table = $(`<div class=""></div>`);
		this.add(table);
		table.table({ url: "https://most.tse.cz:8443/http://qad.tse.cz:51980/MES/rest/MES/Gateway?apiName=domains" });
	}
}
