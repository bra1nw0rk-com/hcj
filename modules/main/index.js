import HTMLObject from "../../js/lib/html/HTMLObject.js";

export default class Main extends HTMLObject {
	constructor() {
		super("div");
		let _this = this;
        this.css = `/modules/main/css/main.css`;
		this.title = "BWOS";
		this.name = "main";
		this.classes = "fadeIn";
		this.template = $(html`
			<div data-module="main/menu"></div>
			<div id="content">
				<div data-module="calendar/maya"></div>
			</div>
			<footer>
				<div id="running">
					<i class="fa fa-table clickable"></i>
					<i class="fa fa-table clickable"></i>
				</div>
				
				<div class="right-side">
					<span data-module="time/time-calendar"></span>
				</div>
			</footer>
		`);


		$("body").html("").append(this.get());
	}

}
