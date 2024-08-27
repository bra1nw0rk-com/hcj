import CustomEvents from "../core/CustomEvents.js";

export default class HTMLObject extends CustomEvents {
	#eventNamespace = "";
	#css = "";
	#animated = false;
	#unique= false;
	#id = "";
	object = $("<div></div>");


	constructor(type) {
		super();
		this.object =  $(`<${type}></${type}>`);
		this.object[0].parameters = this
		//this.object.attr("type", type);
	}
	
	set name(id) {
		this.#eventNamespace = id
		this.#id = id + $(`[name^="${id}"]`).length
		this.object.attr("id", this.#id);
		this.object.attr("name", this.#eventNamespace);
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
	set unique(val){
		this.#unique = val;
	}
	get unique(){
		return this.#unique;
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

	prepare(){
		this.init()
		WS.ui.effects.show(this.object);
	}
	init(){
		$("body").off(`.${this.name}`)
	}
}
