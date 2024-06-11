import CustomEvents from "../core/CustomEvents.js";

export default class HTMLObject extends CustomEvents {
	#eventNamespace = "";
	#css = "";
	#animated = false;
	object = $("<div></div>");

	constructor(type) {
		super();
		this.#eventNamespace = type + "" + System.getOID();
		this.object.attr("name", this.#eventNamespace);
	}
	set id(id) {
		this.object.attr("id", id);
	}
	set classes(classes) {
		this.object.addClass(classes);
	}
	set css(name) {
		this.#css = name;		
		if ($(`head link[href="${this.#css}"]`).length === 0) {
			$(`head`).append($(`<link rel="stylesheet" href="${this.#css}">`));
		}
	}
	set animated(val) {
		this.#animated = val;
		this.object.attr("data-animated", "");
	}
	get selector() {
		return `[name="${this.#eventNamespace}"]`;
	}
	getNamespace() {
		return this.#eventNamespace;
	}

	set template(tpl) {
		tpl = $(tpl);
		//this.object.find(tpl).remove();
		this.object.append(tpl);
	}
	get() {
		return this.object;
	}
	show(node) {
		node = $(node);
		this.object.find(node).remove();
		this.object.append(node);
	}
}
