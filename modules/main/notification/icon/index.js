/**
 * @author Volodymyr Cherniyevskyy
 * @copyright bra1nw0rk.
 * {@link https://github.com/bra1nw0rk-com/hcj GitHub}.
 * {@link https://www.linkedin.com/in/volodymyr-cherniyevskyy-24962b22b LinkedIn}
 **/
import HTMLObject from "../../../../js/lib/html/HTMLObject.js";

export default class NotificationIcon extends HTMLObject  {
    constructor() {
        super("div");
        let _this = this;
        this.css = "/modules/main/notification/icon/index.css";
        this.name = "notification-icon";
        this.classes = "clickable"
        this.template = `
            <i class="fa fa-bell-o" aria-hidden="true"></i>
        
        `
        this.init()
    }
    init() {

    }
}