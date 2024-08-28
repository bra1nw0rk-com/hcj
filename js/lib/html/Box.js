import HTMLObject from "./HTMLObject.js";

export default class Box extends HTMLObject {
	#head = $(html`<div class="head"></div>`)
	#title = $(`<h2></h2>`);	
	#content=$(`<div class="content"></div>`);
	#movePosition={
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
	get moveX(){
		return this.#movePosition.x;
	}
	set moveX(val){
		this.#movePosition.x = val;
	}
	get moveY(){
		return this.#movePosition.y;
	}
	set moveY(val){
		this.#movePosition.y = val;
	}
	eventListener(){
		let _this=this;
		$(this.#head).on("mousedown",function(e){
			let obj = $(this).closest(`[box]`)[0].parameters;
			obj.moveX = e.pageX;
			obj.moveY = e.pageY;
			$(this).addClass("cursor-move")			
		}).on("mouseup",function(){
			let obj = $(this).closest(`[box]`)[0].parameters;
			$(this).removeClass("cursor-move")
			obj.moveX = null;
			obj.moveY = null;
		}).on("mousemove",function(e){
			let obj = $(this).closest(`[box]`)[0].parameters;
			if(obj.moveX !== null && obj.moveY !== null){
				console.log( obj.moveX - e.pageX, obj.moveY - e.pageY)
				$(obj).css({top: obj.moveY - e.pageY, left: obj.moveX - e.pageX});
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