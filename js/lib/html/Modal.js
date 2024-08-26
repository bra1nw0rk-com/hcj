import HTMLObject from "./HTMLObject.js";

export default class Modal extends HTMLObject {
	#title = $(`<h2></h2>`);
	#content=$(`<div class="content"></div>`);
	
	constructor() {
		super("modal");
		this.object.append(this.#title);
		this.object.append(this.#content);
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
