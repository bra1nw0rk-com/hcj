import HTMLObject from "./HTMLObject.js";

export default class Form extends HTMLObject {
	#title = $(`<h2></h2>`);
	#content=$(`<div class="content"></div>`);
	
	constructor() {
		super("form");
		this.object.append(this.#title);
		this.object.append(this.#content);
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
