import HTMLObject from "./HTMLObject.js";
import System from "../core/System.js";

export default class Form extends HTMLObject {
	#title = $(`<h2></h2>`);
	constructor() {
		super("form");
		this.object.append(this.#title);
	}
	set title(text) {
		this.#title.html(text);
	}
}
