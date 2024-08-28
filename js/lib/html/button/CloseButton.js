import HTMLObject from "../HTMLObject.js";

export default class CloseButton extends HTMLObject  {
	 constructor() {
        super("i");
        let _this = this;
        this.css = "/modules/items/buttons/close/index.css";
        this.name = "close-btn";
        this.classes = "fa fa-times button";
        this.object.attr("aria-hidden","true")
    }
    init() {
        super.init();
        $(this.object).on(`click`,function(e){
            e.stopPropagation()
            $(this).closest(`[box]`)[0].parameters.close(function(){});
        }).on(`mousedown`,function(e){
            e.stopPropagation()
        })
    }
}