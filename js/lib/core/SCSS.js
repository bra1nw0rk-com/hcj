/**
 * @author Volodymyr Cherniyevskyy
 */
import CSSNode from "./CSSNode.js";
import WEBFS from "./WEBFS.js";
export default class SCSS extends EventTarget {
	// //baseUrl = "";
	// source = "";
	// importedFiles = {};
	// css = "";
	// /**
	//  * @type {CSSNode|null}
	//  */
	// cssObj = null;
	// url = "";
	// objectUrl = "";
	// #events;

	constructor() {
		super();
		// this.url = url;
		// this.#events = new CustomEvents();
		// let tArr = url.split("/");
		// tArr.pop();
		// let protocol = location.protocol;
		// let domain = location.hostname;

		//this.baseUrl = tArr.join("/") + "/";
		// this.#events.on("ready", function (e) {
		// 	//console.log('SCSS:',css1.href)
		// });
	}

	on = this.addEventListener;

	static load(url) {
		//console.log(url, $("head").find("link[data-owner='" + url + "']").length);
		if ($("head").find("link[data-owner='" + url + "']").length == 0) {
			//if (typeof url === "undefined") url = url;
			//let _this = this;
			//let reExt = /(?:\.([^.]+))?$/;
			let ext = WEBFS.get_url_extension(url);
			WEBFS.get(url, function (data) {
				let _css = data;
				let cssObj;
				if (ext === "scss") {
					data = SCSS.minify(data);
					//_this.importedFiles[url] = data;
					let parsedSCSS = SCSS.parseSCSS(null, null, data);
					if (parsedSCSS !== null) {
						cssObj = parsedSCSS.structure;
						_css = parsedSCSS.structure.string;
					}
				}
				if (_css !== null) {
					let cssFile = new File([_css], url, { type: "text/css" });
					// _this.objectUrl = URL.createObjectURL(cssFile);
					// _this.importedFiles[_this.objectUrl] = _css;
					let css1 = $("<link>");
					css1.attr("type", "text/css");
					css1.attr("rel", "stylesheet");
					css1.attr("href", `${URL.createObjectURL(cssFile)}`);
					css1.attr("data-owner", `${url}`);
					$("head").append(css1);
				}
				//_this.#events.call("ready", { detail: { url: _this.objectUrl, originUrl: url } });
			});
		}
	}

	static minify(data) {
		let result = data;
		result = result.replace(/[\r\n\t]/gims, "");
		result = result.replace(/\/\*.*?\*\//gims, "");
		//result = result.replace(/\/\/.*?\;/gims, "");
		result = result.replace(/[ ]{2,}/gims, " ");
		result = result.replace(/[ ]?\{[ ]?/gims, "{");
		result = result.replace(/[ ]?\}[ ]?/gims, "}");
		result = result.replace(/ \!/gims, "!");
		result = result.replace(/[ ]?\:[ ]?/gims, ":");
		result = result.replace(/[ ]?\;[ ]?/gims, ";");
		result = result.replace(/[ ]?\,[ ]?/gims, ",");
		result = result.replace(/[\;]{2,}/gims, ";");
		return result;
	}

	/**
	 * @param selector
	 * @param parent
	 * @param {String} data
	 */
	static parseSCSS(selector, parent, data) {
		data = data.trim();
		let structure = new CSSNode(selector, parent);

		let i = 0;
		while (data.length > 0) {
			let finded = false;
			let regImport = /@import.*?[\'\"](.*?)[\'\"].*?\;/dgims;
			let imports = data.matchAll(regImport);

			while (true) {
				finded = true;
				const result = imports.next();
				if (result.done) break;
				this.load(/*this.baseUrl + */ result.value[1]);
			}
			data = data.replace(regImport, "").trim();

			let regCloseNode = /^\}/;
			let closeNode = data.match(regCloseNode);
			if (closeNode !== null) {
				finded = true;
				if (closeNode.length > 0) {
					data = data.replace(regCloseNode, "").trim();

					break;
				}
			}
			/**
			 * Parsovani zacatku bloku
			 */
			let newNode = data.match(/^(([^;}]+?)\{)(.*?)$/);
			if (newNode !== null) {
				finded = true;
				data = data.replace(newNode[1], "").trim();
				if (newNode.length === 4) {
					let children = this.parseSCSS(newNode[2], structure, newNode[3]);
					if (children !== null) {
						structure.addChildren(children.structure);
						data = children.data.trim();
					}
				}
			}
			/**
			 * parsovani parametru a jeho hodnoty
			 */
			let parameter = data.match(/^(([^:{}]*?):([^{}]*?)(;|}))/);
			if (parameter !== null) {
				finded = true;
				if (parameter.length > 0) {
					data = data.replace(parameter[1], "").trim();
					if (parameter.length === 5) {
						structure.addParameter(parameter[2], parameter[3]);
						if (parameter[4] === "}") {
							data = "}" + data;
						}
					}
				}
			}
			i++;
			if (!finded) {
				console.log("SCSS: parse error");
				return null;
			}
		}
		return {
			structure: structure,
			data: data,
		};
	}
}
