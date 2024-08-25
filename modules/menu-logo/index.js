import HTMLObject from "../../../js/lib/html/HTMLObject.js";

export default class MenuLogo extends HTMLObject  {
    constructor() {
        super("");
        let _this = this;
        this.css = "/modules/menu-logo/index.css";
        this.name = "menu-logo";
        this.template = $(html`            
                        
		`);

        //this.init();
    }
    init() {
        $("body")
            .off(`.${this.selector}`)
            .on(`click.${this.selector}`,`${this.selector}`,function(){
                console.log('aaa')
                Module.call("about");
            })
    }
}