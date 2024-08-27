import HTMLObject from "./HTMLObject.js";

export default class Box extends HTMLObject {
	#head = $(html`<div class="head"></div>`)
	#title = $(`<h2></h2>`);	
	#content=$(`<div class="content"></div>`);		
	constructor() {
		super("div box");
		this.object.append(this.#head);				
		this.object.append(this.#content);
		this.#head.append(this.#title);
		
		this.object.attr("data-animated", "")
	}
	set title(text) {
		this.#title.html(text);
	}
	set content(text) {
		this.#content.html(text);
	}
	get btn(){
		let _this = this;
		return {
			close(){
				let closeBtn = $(`<div data-module="items/buttons/close"></div>`)
				if(_this.#head.find(closeBtn).length == 0){
					//_this.#head.append(closeBtn);				
				}
				return _this.btn;
			}
		}
	}    

	close(callback){
		WS.ui.closeModal(`${this.selector}`, callback);
	}
	clear() {
		$(`${this.selector}` + " input").each(function () {
			$(this).val("");
		});
	}
}