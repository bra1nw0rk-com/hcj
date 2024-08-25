import Form from "../../js/lib/html/Form.js";


export default class AboutModal extends Form {
	constructor() {
		super();
		let _this = this;
        this.css = "/modules/about/index.css";
		this.title = "About";
		this.classes = "modal fadeIn";
		this.name ="aboutModal"
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
		$("body #content").append(this.get());
	}

}
