import HTMLObject from "../../../js/lib/html/HTMLObject.js";

export default class AnimationLogo extends HTMLObject  {
	 constructor() {
        super("");
        let _this = this;
        this.css = "/modules/animations/logo/index.css";
        this.name = "animated-logo";        
        this.template = $(html`
            <img src = "/img/logo_color.svg" alt="bwos logo" data-animated="" class="rotate glow"/>
               
		    `);
        this.init();
    }
    init() {
       
    }
}
