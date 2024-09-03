import HTMLObject from "../../../../js/lib/html/HTMLObject.js";

export default class NotificationIcon extends HTMLObject  {
    constructor() {
        super("div");
        let _this = this;
        this.css = "/modules/main/notification/icon/index.css";
        this.name = "notification-icon";
        this.template = `
            <i class="fa fa-bell-o" aria-hidden="true"></i>
        
        `
    }
    init() {
        $("body")
            .off(`.${this.name}`)
            .on(`click.${this.name}`,`${this.selector}`,function(){
                $(`#content`).modal({module:"about"});
                /*Module.call("about").then((content) => {

                });
                */

            })
    }
}