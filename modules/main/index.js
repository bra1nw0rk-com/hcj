import HTMLObject from "../../js/lib/html/HTMLObject.js";

export default class Main extends HTMLObject {
	constructor() {
		super("main");
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
					<i class="fa fa-table"></i>
					<i class="fa fa-table"></i>
				</div>
				<div class="copyright">&copy; 2022-∞ bra1nw0rk</div>
				<div>
					
				</div>
			</footer>
		`);


		$("body").html("").append(this.get());
	}

}
