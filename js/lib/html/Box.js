import HTMLObject from "./HTMLObject.js";
import CloseButton from "./button/CloseButton.js";
import MinimizeButton from "./button/MinimizeButton.js";

export default class Box extends HTMLObject {
	#head = $(html`<div class="head"></div>`);
	#title = $(`<h2></h2>`);	
	#content=$(`<div class="content"></div>`);
	#icon = ``
	set draggable(val){
		if(val === true){
			this.#head.draggable({parent:this.object})
		}
	}
	set resizable(val){
		if(val === true){
			this.object.resizable()
		}
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
	init(){
		super.init()
		let _this = this;
		this.object
			.off(`.#${this.id}`)
			.on(`click.#${this.id}`,function(e){
				_this.toFront()
			});
	}

	eventListener(){
		let _this=this;
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
			minimize(){
				let obj = new MinimizeButton();
				obj.init();
				_this.#head.append(obj.get());
			},
			close(){
				let obj = new CloseButton();
				obj.init();
				_this.#head.append(obj.get());
			}
		}
	}
	get faIcon(){
		return this.#icon
	}
	get icon(){
		let _this = this;
		return {
			info(){
				_this.#icon = `<i class="fa fa-info" aria-hidden="true"></i>`
				_this.#head.prepend($(_this.#icon));
			},
			error(){
				_this.#icon = $(`<i class="fa fa-times-circle" aria-hidden="true"></i>`);
				_this.#head.prepend($(_this.#icon));

			},
			settings(){
				_this.#icon = `<i class="fa fa-cogs" aria-hidden="true"></i>`;
				_this.#head.prepend($(_this.#icon));
			}
		}
	}

	close(callback){
		WS.ui.closeModal(`#${this.id}`, callback);
	}
	minimize(){
		WS.ui.minimizeModal(`#${this.id}`);
	}
	maximize(){
		WS.ui.maximizeModal(`#${this.id}`);
	}

	toFront(){
		$(`[box]`).css({
			'z-index':1
		})
		$(`#${this.id}`).css({
			'z-index':2
		})
	}
	isOnFront(){
		return($(`#${this.id}`).css('z-index')==='2')
	}

	clear() {
		$(`#${this.id}` + " input").each(function () {
			$(this).val("");
		});
	}
}