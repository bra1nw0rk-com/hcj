import HTMLObject from "../HTMLObject.js";

export default class MinimizeButton extends HTMLObject  {
	 constructor() {
        super("i");
        this.css = "/modules/items/buttons/close/index.css";
        this.name = "close-btn";
        this.classes = "fa fa-times button";
        this.object.attr("aria-hidden","true")
    }
    init() {
        super.init();
        $(this.object).on(`click`,function(e){
            $(this).closest(`[box]`)[0].parameters.close(function(){});
        }).on(`mousedown`,function(e){
            e.stopPropagation()
        })
    }
}