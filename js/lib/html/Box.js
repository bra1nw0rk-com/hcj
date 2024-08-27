import HTMLObject from "./HTMLObject.js";

export default class Box extends HTMLObject {
	#head = $(html`<div class="head"></div>`)
	#title = $(`<h2></h2>`);	
	#content=$(`<div class="content"></div>`);		
	constructor() {
		super("div box");
		this.object.append(this.#head);				
		this.object.append(this.#content);
		this.#head.append(this.#title);
		
		this.object.attr("data-animated", "")
	}
	set title(text) {
		this.#title.html(text);
	}
	set content(text) {
		this.#content.html(text);
	}
    buttons={
		_this : this,
        close(){
            _this.#head.append($(html`
                <div data-module="items/buttons/close"></div>
                `));
            return _this.buttons;
        }
    }	
	close(callback){
		WS.ui.closeModal(`${this.selector}`, callback);
	}
	clear() {
		$(`${this.selector}` + " input").each(function () {
			$(this).val("");
		});
	}
}