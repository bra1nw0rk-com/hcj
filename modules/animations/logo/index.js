import HTMLObject from "../../js/lib/html/HTMLObject.js";

export default class AnimationLogo extends HTMLObject  {
	 constructor() {
        super("animated-logo");
        let _this = this;
        this.css = "/modules/animation/logo/index.css";
        this.name = "animated-logo";        
        this.template = $(html`            
          <video autoplay="autoplay" loop="loop" muted="muted" controls="controls" class="small_video_square">
            <source src="/img/logo.webm" type="video/WebM">
            Sorry, your browser doesn't support embedded videos.
          </video>
               
		`);
        this.init();
    }
    init() {
       
    }
}
