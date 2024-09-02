import Box from "../../js/lib/html/Box.js";


export default class AboutModal extends Box {
	constructor() {
		super(true);
		let _this = this;
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
			<br>
			<div class="copyright">&copy; 2022-∞ bra1nw0rk </div>		
		`;
		this.draggable = true;
		this.button.close();
		this.icon.info();

	}
	init() {
		//$("body #content").append(this.get());
	}

}
