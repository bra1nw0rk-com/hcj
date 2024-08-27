import HTMLObject from "../../../../js/lib/html/HTMLObject.js";

export default class CloseBtn extends HTMLObject  {
	 constructor() {
        super("span");
        let _this = this;
        this.css = "/modules/items/buttons/close/index.css";
        this.name = "close-btn";
        this.classes = "button";
        this.template = $(html`<i class="fa fa-times" aria-hidden="true"></i>`);
    }
    init() {
            super.init();
        $("body").on(`click.${this.name}`,`${this.selector}`,function(){
            console.log($(this).closest(`box`));
        })
    }
}