import SCSS from "../../js/lib/core/SCSS.js";
import HTMLObject from "../../js/lib/html/HTMLObject.js";

export default class Main extends HTMLObject {
	constructor() {
		super("main");
		let _this = this;
		this.title = "Login";
		this.id = "main";
		this.classes = "fadeIn";
		this.template = $(html`
			<div data-module="main/menu"></div>
			<div id="content"></div>
			<footer>
				<div id="running">
					<i class="fa fa-table"></i>
					<i class="fa fa-table"></i>
				</div>
				<div class="copyright">&copy; 2024 Workspace</div>
				<div></div>
			</footer>
		`);

		SCSS.load(`/modules/main/css/main.scss`);
		$("body").html("").append(this.get());
	}
}
