/**
 * @author Volodymyr Cherniyevskyy
 * @copyright bra1nw0rk.
 * {@link https://github.com/bra1nw0rk-com/hcj GitHub}.
 * {@link https://www.linkedin.com/in/volodymyr-cherniyevskyy-24962b22b LinkedIn}
 **/
import HTMLObject from "../../../js/lib/html/HTMLObject.js";

export default class MailManager extends HTMLObject  {
    constructor() {
        super("div");
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