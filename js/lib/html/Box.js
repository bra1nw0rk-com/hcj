import HTMLObject from "./HTMLObject.js";

export default class Box extends HTMLObject {
	#head = $(html`<div class="head"></div>`)
	#title = $(`<h2></h2>`);	
	#content=$(`<div class="content"></div>`);
	#startPosition={
		x:null,
		y:null
	}		
	constructor(unique) {
		super("div box");
		this.unique = unique;
		this.object.append(this.#head);				
		this.object.append(this.#content);
		this.#head.append(this.#title);
		this.object.attr("data-animated", "")

		this.eventListener()
	}
	eventListener(){
		let _this=this;
		$(this.#head).on("mousedown",function(e){
			_this.#startPosition.x = e.ClientX;
			_this.#startPosition.y = e.ClientY;
			$(this).addClass("cursor-move")			
		}).on("mouseup",function(){
			$(this).removeClass("cursor-move")
			_this.#startPosition.x = null;
			_this.#startPosition.y = null;
		}).on("mousemove",function(e){
			if(_this.#startPosition.x !== null && _this.#startPosition.y !== null){				
				$(_this.object).css({top: _this.#startPosition.y - e.ClientY, left: _this.#startPosition.x - e.ClientX});
			}
			
		})
	}
	set title(text) {
		this.#title.html(text);
	}
	set content(text) {
		this.#content.html(text);
	}
	get button(){
		let _this = this;
		return {
			close(){
				_this.#head.closeBoxButton();
			}
		}
	}
	get icon(){
		let _this = this;
		return {
			info(){
				_this.#head.prepend($(`<i class="fa fa-info" aria-hidden="true"></i>`));
			},
			error(){
				_this.#head.prepend($(`<i class="fa fa-times-circle" aria-hidden="true"></i>`));

			}
		}
	}

	close(callback){
		WS.ui.closeModal(`#${this.id}`, callback);
	}
	clear() {
		$(`#${this.id}` + " input").each(function () {
			$(this).val("");
		});
	}
}