import Form from "../../js/lib/html/Form.js";


export default class MainMenu extends Form {
	constructor() {
		super();
		let _this = this;
        this.css = "/modules/about/index.css";
		this.id = "about";
		this.classes = "modal fadeIn";


		this.template = $(html`
			<div class="header">				
                <div class="logo"></div>
			</div>
			<div class="content">
				content
			</div>
            <div class="footer">
            </div>
		`);

	}
	init() {
		this.load();		
	}
	load() {
		
	}
}
