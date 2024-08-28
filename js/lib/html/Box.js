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
		this.#startPosition={
			x:null,
			y:null
		}
		this.eventListener()
	}
	get x(){
		return this.#startPosition.x;
	}
	set x(val){
		this.#startPosition.x = val;
	}
	get y(){
		return this.#startPosition.y;
	}
	set y(val){
		this.#startPosition.y = val;
	}
	eventListener(){
		let _this=this;
		$(this.#head).on("mousedown",function(e){
			let obj = $(this).closest(`box`)[0];
			console.log(obj)
			_this.x = e.ClientX;
			_this.y = e.ClientY;
			$(this).addClass("cursor-move")			
		}).on("mouseup",function(){
			$(this).removeClass("cursor-move")
			_this.x = null;
			_this.y = null;
		}).on("mousemove",function(e){

			if(_this.x !== null && _this.y !== null){
				console.log( _this.y, _this.x)
				$(_this.object).css({top: _this.y - e.ClientY, left: _this.x - e.ClientX});
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