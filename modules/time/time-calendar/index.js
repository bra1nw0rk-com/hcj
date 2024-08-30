import HTMLObject from "../../../js/lib/html/HTMLObject.js";

export default class PageLogin extends HTMLObject  {
	 constructor() {
        super("div");
        let _this = this;
        this.css = "/modules/time/time-calendar/index.css";
        this.name = "time-calendar";        
        this.template = $(html``);        
    }    
}