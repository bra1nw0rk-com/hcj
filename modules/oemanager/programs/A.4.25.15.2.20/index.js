import Program from "../../libs/Program.js";

export default class Executor extends Program {
	constructor() {
		super();
		let _this = this;
		this.classes = "25-15-2-20";
		this.title = "25.15.2.20 Transakce zásob - účtování";
		let table = $(`<div class=""></div>`);
		table.table({ url: "https://most.tse.cz:8443/http://qad.tse.cz:51980/MES/rest/MES/Gateway?apiName=25_15_2_20" });
		this.add(table);
	}
}
