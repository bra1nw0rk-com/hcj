import Form from "../../../js/lib/html/Form.js";

export default class AnimationLogo extends HTMLObject  {
	 constructor() {
        super("menu");
        let _this = this;
        this.css = "/modules/calendar/maya/index.css";
        this.name = "animated-logo";        
        this.template = $(html`
            <div class="calendar-mayan widget">
                <div class="header">Mayan calendar</div>
                <div class="row">Haabʼ: <span id="mayan-haab-date"></span></div>
                <div class="row">Tzolkʼin: <span id="mayan-tzolkin-date"></span></div>
                <div class="row"><span id="mayan-year"></span> year by sun</div>
                <div class="row"><span id="mayan-year-haab"></span> year by Haabʼ</div>
            </div>
                
		`);
        this.init();
    }
    init() {
       
    }
}
