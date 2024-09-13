/**
 * @author Volodymyr Cherniyevskyy
 * @copyright bra1nw0rk.
 * {@link https://github.com/bra1nw0rk-com/hcj GitHub}.
 * {@link https://www.linkedin.com/in/volodymyr-cherniyevskyy-24962b22b LinkedIn}
 **/
import CustomEvents from "../core/CustomEvents.js";

export default class HTMLObject extends CustomEvents {
	#eventNamespace = "";
	#css = "";
	#animated = false;
	#unique= false;
	#tooltip =""
	#id = "";
	object = $("<div></div>");
	lastPosition={
		x:0,y:0
	}
	size= {
		width:0, height:0
	}
	constructor(val) {
		super();
		if(typeof val === 'object'){
			this.object = val.clone()
		}else{
			this.object =  $(`<${val}></${val}>`);
		}

		this.object[0].parameters = this

	}

	saveState(){
		this.size.width = this.object.outerWidth()
		this.size.height = this.object.outerHeight()
		this.lastPosition.y =  this.object.position().top
		this.lastPosition.x =  this.object.position().left
	}
	get id(){
		return this.#id;
	}
	set name(id) {
		this.#eventNamespace = id
		this.#id = id + $(`[name^="${id}"]`).length
		this.object.attr("id", this.#id);
		this.object.attr("name", this.#eventNamespace);
		this.object.addClass(id)
	}
	set classes(classes) {
		this.object.addClass(classes);
	}
	set css(name) {
		this.#css = name;
		let _this = this		
		if ($(`head link[href="${this.#css}"]`).length === 0) {
			let cssObj = $(`<link rel="stylesheet" href="${this.#css}">`)
			cssObj[0].loaded = false
			cssObj.on(`load`,function(){
				cssObj[0].loaded = true
				_this.object.trigger('cssLoaded')
			})
			$(`head`).append(cssObj);
		}
	}
	get css(){
		return this.#css
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
		//WS.ui.effects.show(this.object);
	}
	init(){		
		console.log(`css: ${this.css}`, this.id,this.object[0].loaded)
		if(this.css === "" || this.object[0].loaded === true){
			this.object.trigger('cssLoaded')			
		}

	}

	set tooltip(value){
		this.#tooltip = value;
		this.object.tooltip({html:value})

	}
	get tooltip(){
		return this.#tooltip
	}

	set html(val){
		this.object.html(val)
	}

	get html(){
		return this.object.html()
	}
	
}
