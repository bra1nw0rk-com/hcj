import Form from "../../js/lib/html/Form.js";


export default class AboutModal extends Form {
	constructor() {
		super();
		let _this = this;
        this.css = "/modules/about/index.css";
		this.title = "About";
		this.classes = "modal fadeIn";
		this.name ="aboutModal"
		this.content = $(html`
			BWOS - Brain Work Operating System.
		`);


	}
	init() {
		$("body #content").append(this.get());
	}

}
