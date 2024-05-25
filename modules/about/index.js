import HTMLObject from "../../../js/lib/html/HTMLObject.js";

export default class MainMenu extends HTMLObject {
	constructor() {
		super("about");
		let _this = this;
        this.css = "/modules/about/index.css";
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
		
		this.init();
	}
	init() {
		this.load();		
	}
	load() {
		
	}
}
