import HTMLObject from "../../../js/lib/html/HTMLObject.js";

export default class MainMenu extends HTMLObject {
	constructor() {
		super("about");
		let _this = this;
		this.id = "about";
		this.classes = "modal fadeIn";


		this.template = $(html`
			<div class="header">				
                <div class="logo"></div>
			</div>
			<div class="content">
				
			</div>
            <div class="footer">
            </div>
		`);

		if ($(`head link[href="/modules/about/index.css"]`).length == 0) {
			$(`head`).append($(`<link rel="stylesheet" href="/modules/about/index.css">`));
		}
		this.init();
	}
	init() {
		this.load();		
	}
	load() {
		
	}
}
