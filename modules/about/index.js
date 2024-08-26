import Modal from "../../js/lib/html/Modal.js";


export default class AboutModal extends Modal {
	constructor() {
		super();
		let _this = this;
		this.unique = true;
        this.css = "/modules/about/index.css";
		this.title = "About";
		this.classes = "modal hidden";
		this.name ="aboutModal"
		this.content = `
			<div>LibreIS - Libre Information System.</div>
			<div> </div>
			<div>OS: Linux</div>
			<div>Backend: Java</div>
			<div>Frontend: JavaScript, JQuery, HTML, CSS</div>
			
		`;


	}
	init() {
		$("body #content").append(this.get());
	}

}
