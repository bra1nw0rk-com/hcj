import Box from "../../../js/lib/html/Box.js";


export default class PushSettings extends Box {
    constructor() {
        super(true);
        let _this = this;
        this.css = "/modules/forms/push-settings/index.css";
        this.title = "Push settings";
        this.classes = "modal hidden";
        this.draggable = true;
        this.resizable = true;
        this.name ="pushSettings"
        this.content = `
			<div class="strong">Libre<span class="selected">IS</span> - Libre Information System.</div>
			<br>
			<div>OS: Linux</div>
			<div>Backend: Java</div>
			<div>Frontend: JavaScript, JQuery, HTML, CSS</div>	
			<br>
			<div class="copyright">&copy; 2022-∞ bra1nw0rk </div>		
		`;

        this.button.close();
        this.icon.settings();

    }
    init() {
        //$("body #content").append(this.get());
    }

}
