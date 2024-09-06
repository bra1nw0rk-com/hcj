/**
 * @author Volodymyr Cherniyevskyy
 * @copyright bra1nw0rk.
 * {@link https://github.com/bra1nw0rk-com/hcj GitHub}.
 * {@link https://www.linkedin.com/in/volodymyr-cherniyevskyy-24962b22b LinkedIn}
 **/

import * as XLSX from "../app/roles/node_modules/xlsx/xlsx.mjs";
export default class Excel extends EventTarget {
	/**
	 * @type {Array<object>}
	 */
	result = [];
	_this = this;
	constructor() {
		super();
	}
	indexed = {};
	/**
	 * @param {string} filename
	 */
	load(filename) {
		events.working();
		this.result = [];
		this.indexed = {};
		let reader = new FileReader();
		let _this = this;
		reader.onload = function (e) {
			if (e.target !== null) {
				var data = e.target.result;
				var workbook = XLSX.read(data, {
					type: "binary",
				});
				let sheetIndex = 0;
				workbook.SheetNames.forEach(function (sheetName) {
					sheetIndex++;
					const XL_row_object = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);
					_this.result[sheetName] = XL_row_object;
					_this.indexed[sheetName] = {};
					for (const row of XL_row_object) {
						for (const key of Object.keys(row)) {
							if (typeof _this.indexed[sheetName][key] === "undefined") {
								_this.indexed[sheetName][key] = {};
							}
							if (typeof _this.indexed[sheetName][key][row[key]] === "undefined") {
								_this.indexed[sheetName][key][row[key]] = [];
							}
							_this.indexed[sheetName][key][row[key]].push(row);
						}
					}
					if (sheetIndex === workbook.SheetNames.length) {
						_this.dispatchEvent(new Event("ready"));
						events.ready();
					}
				});
				// console.log(_this.result);
			}
		};
		reader.onerror = function (ex) {
			console.log(ex);
		};
		reader.readAsBinaryString(filename);
	}
	on = this.addEventListener;
	/**
	 *
	 * @param {string} list
	 * @return {Object}
	 */
	get(list = "") {
		return this.result[list];
	}
	find(list = null, name, val) {
		if (list !== null) {
			return this.result[list].filter((el) => {
				return new RegExp(val, "gm").test(el[name]);
			});
		}
		return false;
	}
	/**
	 * @param {string} list
	 * @param {string} name
	 * @param {string} val
	 * @returns {Object}
	 */
	findInIndexed(list, name, val) {
		// console.log(list, name, val, this.indexed[list], this.indexed[list][name], this.indexed[list][name][val]);
		if (list !== "undefined") {
			if (typeof this.indexed[list][name][val] !== "undefined") {
				return this.indexed[list][name][val];
			} else {
				return []; /** edited */
			}
		}
	}
}
