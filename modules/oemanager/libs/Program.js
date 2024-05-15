import HTMLObject from "../../../js/lib/html/HTMLObject.js";

export default class Program extends HTMLObject {
	constructor() {
		super("program");
		this.classes = "36-1-1-1-3 program";
		this.template = html`
			<h1 class="title"></h1>
			<div class="content"></div>
		`;
	}
	set title(value) {
		this.object.find(".title").html(value);
	}
	set content(value) {
		this.object.find(".content").children().remove();
		this.object.find(".content").append(value);
	}
	add(node) {
		this.object.find(".content").append(node);
	}
}
