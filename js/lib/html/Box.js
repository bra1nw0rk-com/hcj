import HTMLObject from "./HTMLObject.js";

export default class Box extends HTMLObject {
	#head = $(html`<div class="head"></div>`);
	#resizing=$(`
		<span class="top-left-side"></span>
		<span class="top-side"></span>
		<span class="top-right-side"></span>
		<span class="right-side"></span>
		<span class="bottom-right-side"></span>
		<span class="bottom-side"></span>
		<span class="bottom-left-side"></span>
		<span class="left-side"></span>
	`)
	#title = $(`<h2></h2>`);	
	#content=$(`<div class="content"></div>`);
	#movePosition={
		x:null,
		y:null
	}
	#resize={
		class:"",
		x:null,
		y:null
	}

	constructor(unique) {
		super("div box");
		this.unique = unique;
		this.object.append(this.#head);
		this.object.append(this.#resizing);
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
	get resizeX(){
		return this.#resize.x;
	}
	set resizeX(val){
		this.#resize.x = val;
	}
	get resizeY(){
		return this.#resize.y;
	}
	set resizeY(val){
		this.#resize.y = val;
	}
	get resizeClass(){
		return this.#resize.class;
	}
	set resizeClass(val){
		this.#resize.class = val;
	}
	eventListener(){
		let _this=this;
		$(this.#resizing).on('mousedown',function(e){
			e.stopPropagation()
			let elem = $(this).closest(`[box]`);
			let obj = elem[0].parameters;
			if(e.which === 1) {
				if($(this).hasClass('top-side')){
					obj.resizeClass = 'top-side'
				}else if($(this).hasClass('right-side')){
					obj.resizeClass = 'right-side'
				}else if($(this).hasClass('bottom-side')){
					obj.resizeClass = 'bottom-side'
				}else if($(this).hasClass('left-side')){
					obj.resizeClass = 'left-side'
				}else if($(this).hasClass('top-left-side')){
					obj.resizeClass = 'top-left-side'
				}else if($(this).hasClass('top-right-side')){
					obj.resizeClass = 'top-right-side'
				}else if($(this).hasClass('bottom-right-side')){
					obj.resizeClass = 'bottom-right-side'
				}else if($(this).hasClass('bottom-left-side')){
					obj.resizeClass = 'bottom-left-side'
				}
				obj.resizeX = e.pageX;
				obj.resizeY = e.pageY;


				$(`body`).on("mousemove.boxResizing", function (e) {
					if (obj.resizeClass === "bottom-side") {
						elem.css({
							transform:'none',
							top: elem.position().top,
							left:elem.position().left,
							height: elem.outerHeight() + (e.pageY - obj.resizeY),
							width: elem.outerWidth()
						});
					}else if (obj.resizeClass === "top-side") {
						elem.css({
							transform:'none',
							top: elem.position().top + (e.pageY - obj.resizeY),
							left:elem.position().left,
							height: elem.outerHeight() - (e.pageY - obj.resizeY),
							width: elem.outerWidth()
						});
					}else if (obj.resizeClass === "left-side") {
						elem.css({
							transform:'none',
							top: elem.position().top,
							left:elem.position().left + (e.pageX - obj.resizeX),
							height: elem.outerHeight(),
							width: elem.outerWidth() - (e.pageX - obj.resizeX),
						});
					}else if (obj.resizeClass === "right-side") {
						elem.css({
							transform:'none',
							top: elem.position().top,
							left:elem.position().left,
							height: elem.outerHeight(),
							width: elem.outerWidth() + (e.pageX - obj.resizeX),
						});
					}
					obj.resizeX = e.pageX;
					obj.resizeY = e.pageY;
				})


			}
		}).on("mouseup",function(){
			$(`body`).off('.boxResizing')
			let obj = $(this).closest(`[box]`)[0].parameters;
			obj.resizeX = null;
			obj.resizeY = null;

		}).on("mousemove",function(e){
			e.stopPropagation()
			let elem = $(this).closest(`[box]`);
			let obj = elem[0].parameters;
			if(obj.resizeX !== null && obj.resizeY !== null){
				if($(this).hasClass(obj.resizeClass)) {
					if (obj.resizeClass === "bottom-side") {
						elem.css({
							transform:'none',
							top: elem.position().top,
							left:elem.position().left,
							height: elem.outerHeight() + (e.pageY - obj.resizeY),
							width: elem.outerWidth()
						});
					}else if (obj.resizeClass === "top-side") {
						elem.css({
							transform:'none',
							top: elem.position().top + (e.pageY - obj.resizeY),
							left:elem.position().left,
							height: elem.outerHeight() - (e.pageY - obj.resizeY),
							width: elem.outerWidth()
						});
					}else if (obj.resizeClass === "left-side") {
						elem.css({
							transform:'none',
							top: elem.position().top,
							left:elem.position().left + (e.pageX - obj.resizeX),
							height: elem.outerHeight(),
							width: elem.outerWidth() - (e.pageX - obj.resizeX),
						});
					}else if (obj.resizeClass === "right-side") {
						elem.css({
							transform:'none',
							top: elem.position().top,
							left:elem.position().left,
							height: elem.outerHeight(),
							width: elem.outerWidth() + (e.pageX - obj.resizeX),
						});
					}else if (obj.resizeClass === "top-left-side") {
						elem.css({
							transform:'none',
							top: elem.position().top + (e.pageY - obj.resizeY),
							left:elem.position().left + (e.pageX - obj.resizeX),
							height: elem.outerHeight() - (e.pageY - obj.resizeY),
							width: elem.outerWidth() - (e.pageX - obj.resizeX),
						});
					}else if (obj.resizeClass === "top-right-side") {
						elem.css({
							transform:'none',
							top: elem.position().top + (e.pageY - obj.resizeY),
							left: elem.position().left + (e.pageX - obj.resizeX),
							height: elem.outerHeight() - (e.pageY - obj.resizeY),
							width: elem.outerWidth() - (e.pageX - obj.resizeX),
						});
					}else if (obj.resizeClass === "bottom-right-side") {
						elem.css({
							transform:'none',
							top: elem.position().top,
							left:elem.position().left,
							height: elem.outerHeight() + (e.pageY - obj.resizeY),
							width: elem.outerWidth() + (e.pageX - obj.resizeX),
						});
					}else if (obj.resizeClass === "bottom-right-side") {
						elem.css({
							transform:'none',
							top: elem.position().top,
							left:elem.position().left,
							height: elem.outerHeight(),
							width: elem.outerWidth() + (e.pageX - obj.resizeX),
						});
					}
					obj.resizeX = e.pageX;
					obj.resizeY = e.pageY;
				}
			}

		})
		$(this.#head).on("mousedown",function(e){
			let elem = $(this).closest(`[box]`);
			let obj = elem[0].parameters;
			if(e.which === 1) {
				obj.moveX = e.pageX;
				obj.moveY = e.pageY;
				$(`body`).on("mousemove.boxMove", function (e) {
					elem.css({
						top: elem.position().top + (e.pageY - obj.moveY),
						left: elem.position().left + (e.pageX - obj.moveX)
					});
					obj.moveX = e.pageX;
					obj.moveY = e.pageY;
				})
			}
		}).on("mouseup",function(){
			$(`body`).off('.boxMove')
			let obj = $(this).closest(`[box]`)[0].parameters;
			obj.moveX = null;
			obj.moveY = null;

		}).on("mousemove",function(e){
			e.stopPropagation()
			let elem = $(this).closest(`[box]`);
			let obj = elem[0].parameters;
			if(obj.moveX !== null && obj.moveY !== null){
				elem.css({
					transform:'none',
					top: elem.position().top + (e.pageY - obj.moveY),
					left: elem.position().left +  (e.pageX - obj.moveX)
				});

				obj.moveX = e.pageX;
				obj.moveY = e.pageY;
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