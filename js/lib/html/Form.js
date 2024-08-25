import HTMLObject from "./HTMLObject.js";

export default class Form extends HTMLObject {
	#title = $(`<h2></h2>`);
	constructor() {
		super("form");
		this.object.append(this.#title);
	}
	set title(text) {
		this.#title.html(text);
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
