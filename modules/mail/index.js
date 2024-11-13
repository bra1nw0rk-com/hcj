/**
 * @author Volodymyr Cherniyevskyy
 * @copyright bra1nw0rk.
 * {@link https://github.com/bra1nw0rk-com/hcj GitHub}.
 * {@link https://www.linkedin.com/in/volodymyr-cherniyevskyy-24962b22b LinkedIn}
 **/
import Box from "../../js/lib/html/Box.js";


export default class MailManager extends Box  {
    constructor() {
        super(true);
        this.css = "/modules/mail/index.css";
        this.name = "mail";
        this.template = $(html`            
          <div>Mail Manager</div>               
		`);
    }
    init() {
        super.init()
    }
}