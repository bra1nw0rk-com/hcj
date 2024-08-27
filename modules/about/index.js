import Box from "../../js/lib/html/Box.js";


export default class AboutModal extends Box {
	constructor() {
		super();
		let _this = this;
		this.unique = true;
        this.css = "/modules/about/index.css";
		this.title = "About";
		this.classes = "modal hidden";
		this.name ="aboutModal"
		this.content = `
			<div class="strong">Libre<span class="selected">IS</span> - Libre Information System.</div>
			<br>
			<div>OS: Linux</div>
			<div>Backend: Java</div>
			<div>Frontend: JavaScript, JQuery, HTML, CSS</div>			
		`;
		this.button.close();

	}
	init() {
		//$("body #content").append(this.get());
	}

}
