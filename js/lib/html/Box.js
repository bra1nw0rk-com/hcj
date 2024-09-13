/**
 * @author Volodymyr Cherniyevskyy
 * @copyright bra1nw0rk.
 * {@link https://github.com/bra1nw0rk-com/hcj GitHub}.
 * {@link https://www.linkedin.com/in/volodymyr-cherniyevskyy-24962b22b LinkedIn}
 **/
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
		this.classes = "modal hidden";
		this.object.append(this.#head);
		this.object.append(this.#content);
		this.#head.append(this.#title);
		this.object.attr("data-animated", "")


	}
	init(){
		super.init()
		let _this = this;
		this.object.on(`cssLoaded`,function(){
			WS.ui.effects.fadeIn(_this.object)
			_this.saveState()
			if(_this.object.css('display')!=="none") {
				if (_this.object.closest(`body`).length > 0) {
					_this.object.css({
						left: `${_this.lastPosition.x}px`,
						top: `${_this.lastPosition.y}px`,
						height: `${_this.size.height}px`,
						width: `${_this.size.width}px`,
						transform: 'none'
					})
				}
			}			
		})
		

		this.object
			.off(`.${this.id}`)
			.on(`click.${this.id}`,function(e){
				e.stopPropagation()
			}).on(`mousedown.${this.id}`,function(e){
				e.stopPropagation()
				_this.toFront()
			});

	}

	set title(text) {
		this.#title.html(text);
	}
	get title(){
		return this.#title.html();
	}
	set content(val) {
		this.#content.find('*').delete()
		this.#content.append($(val));
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
			},
			set(icon){
				_this.#icon = `<i class="fa ${icon} other" aria-hidden="true"></i>`;
				_this.#head.prepend($(_this.#icon));
			}

		}
	}

	close(callback){
		WS.ui.closeModal(`#${this.id}`, callback);
		$(`[data-obj-id="${this.id}"]`).delete();
	}
	minimize(){
		WS.ui.minimizeModal(`#${this.id}`);
	}
	maximize(){
		WS.ui.maximizeModal(`#${this.id}`);
	}

	toFront(){
		if(!this.isOnFront()) {
			let last = this.object.parent().children(`[box]`).last()
			last.after(this.object)
		}
	}
	isOnFront(){
		return $(`[box]`).index(this.object) === ($(`[box]`).length - 1)
	}
	redraw(){
		this.object.after(this.object)
	}

	clear() {
		$(`#${this.id}` + " input").each(function () {
			$(this).val("");
		});
	}
}