import HTMLObject from "../../../js/lib/html/HTMLObject.js";

export default class AnimationLogo extends HTMLObject  {
	 constructor() {
        super("");
        let _this = this;
        this.css = "/modules/animations/logo/index.css";
        this.name = "animated-logo";        
        this.template = $(html`            
          <video autoplay="autoplay" loop="loop" muted="muted" class="animation">
            <source src="/img/logo.webm" type="video/WebM">
            Sorry, your browser doesn't support embedded videos.
          </video>
               
		    `);
        this.init();
    }
    init() {
       
    }
}
