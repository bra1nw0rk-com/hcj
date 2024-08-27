import HTMLObject from "./HTMLObject.js";

export default class Modal extends HTMLObject {
	#head = $(html`<div class="head"></div>`)
	#title = $(`<h2></h2>`);	
	#content=$(`<div class="content"></div>`);
	
	constructor() {
		super("div");
		this.object.append(this.#head);				
		this.object.append(this.#content);
		this.#head.append(this.#title);
		this.#head.append($(html`
			<div data-module="items/buttons/close"></div>
			`));
		this.object.attr("data-animated", "")
	}
	set title(text) {
		this.#title.html(text);
	}
	set content(text) {
		this.#content.html(text);
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
