import HTMLObject from "../../../js/lib/html/HTMLObject.js";

export default class MailManager extends HTMLObject  {
    constructor() {
        super("");
        let _this = this;
        this.css = "/modules/mail/index.css";
        this.name = "mail";
        this.template = $(html`            
          <div>Mail Manager</div>               
		`);
        $("body").html("").append(this.get());
    }
    init() {

    }
}