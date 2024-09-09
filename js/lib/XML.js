/**
 * @author Volodymyr Cherniyevskyy
 * @copyright bra1nw0rk.
 * {@link https://github.com/bra1nw0rk-com/hcj GitHub}.
 * {@link https://www.linkedin.com/in/volodymyr-cherniyevskyy-24962b22b LinkedIn}
 **/
//import "./core/index.mjs"; //"../../../lib/core/index.mjs";

export default class XML extends EventTarget {
	// select(nodeName) {
	// 	return $(this.content).find(`${nodeName}`);
	// }
	//parser = new DOMParser();
	filename = "";
	/**
	 * @type {XMLDocument}
	 */
	xml;
	/**
	 * @type {JQuery<XMLDocument>}
	 */
	content = $();
	constructor() {
		super();
	}
	find = this.content.find;
	append = this.content.append;
	/**
	 * @param {String|null} name
	 * @param {JQuery<HTMLElement>|null} nextNodes
	 * @return {JQuery<XMLDocument>|boolean}
	 */
	getNodes(name, nextNodes) {
		$(document).trigger("working");
		let _this = this;
		/**
		 * @type {Object}
		 */
		let result = {};
		/**
		 * @type {JQuery<HTMLElement>}
		 */
		let nodes;
		if (name !== null) {
			//nodes = this.content.getElementsByTagName(name);
			nodes = this.content.find(`${name}`);
		} else if (nextNodes !== null) {
			nodes = nextNodes;
		} else {
			return false;
		}
		nodes.each(function () {
			if (typeof result[this.nodeName] === "undefined") {
				result[this.nodeName] = [];
			}
			if (this.nodeValue !== null) {
				result[this.nodeName] = this.nodeValue;
			} else if (this.childElementCount > 0) {
				result[this.nodeName].push(_this.getNodes(null, $(this).children()));
			} else {
				result[this.nodeName] = this.innerHTML;
			}
		});
		$(document).trigger("ready");
		return result;
	}
	save() {
		$(document).trigger("working");
		var xmlSerializer = new XMLSerializer();
		let newFilename = `import.xml`;
		var file = new File([xmlSerializer.serializeToString(this.xml)], newFilename, { type: "text/xml" });
		var a = document.createElement("a");
		var url = URL.createObjectURL(file);
		a.target = "_blank";
		a.download = newFilename;
		a.href = url;
		a.click();
		$(document).trigger("ready");
	}
	load(filename) {
		events.working();
		this.filename = filename.name;
		let reader = new FileReader();
		let _this = this;
		reader.onload = function (e) {
			var data = e.target.result;
			if (typeof data === "string") {
				//_this.content = _this.parser.parseFromString(data, "text/xml");
				try {
					_this.xml = $.parseXML(data);
				} catch (e) {
					events.ready();
					error(`Toto neni stravny format XML. ${e}`);
					return;
				}
				_this.content = $(_this.xml);
			}
			_this.dispatchEvent(new Event("ready"));
			events.ready();
		};
		reader.onerror = function (ex) {
			error(`Chyba pri pokusu otevrit XML soubor. ${ex}`);
		};
		reader.readAsText(filename);
	}
	on = this.addEventListener;
}
