import HTMLObject from "../../js/lib/html/HTMLObject.js";

export default class Main extends HTMLObject {
	#mainMenu = $(`<div data-module="main/menu"></div>`)
	#content = $(`<div id="content">
				<div data-module="calendar/maya"></div>
			</div>`)
	#boxManager = $(`<div data-module="main/box-manager"></div>`)
	#footer = $(`<footer></footer>`)
	#running = $(`<div id="running"></div>`)
	#rightSide = $(`<div class="right-side"></div>`)

	constructor() {
		super("div");
		let _this = this;
        this.css = `/modules/main/css/main.css`;
		this.title = "LibreIS";
		this.name = "main";
		this.classes = "fadeIn";

		this.object.append(this.#mainMenu)
		this.object.append(this.#boxManager)
		this.object.append(this.#content)
		this.object.append(this.#footer)
		this.#footer.append(this.#running)
		this.#footer.append(this.#rightSide)
		this.#rightSide.append($(`<span data-module="time/date-time"></span>`))
		this.#rightSide.append($(`<span data-module="main/notification/icon"></span>`))
		$("body").html("").append(this.get());

		this.init()

	}
	init(){
		let _this = this;
		$("body")
			.off("mutation.main")
			.on("mutation.main", function (e) {
				$(this).find("[box]:not([run-added])").each(function () {
					let newObj = $($(this)[0].parameters.faIcon)
					newObj.attr(`data-obj-id`,$(this)[0].parameters.id)
					newObj.addClass('clickable fadeIn')
					newObj.attr("data-animated","");
					$(this).attr("run-added","");
					_this.#running.append(newObj)
					newObj.on(`click`,function(e){
						console.log(e)
						let id = $(this).attr(`data-obj-id`)
						let item = $(`#${id}`)
						if(item.css('display')==="none"){
							item[0].parameters.maximize();
						}else {
							item[0].parameters.minimize();
						}

					})
				});
			})
			.on("click.main",`[name="close-btn"]`,function(){
				let id = $(this).closest(`[box]`).attr("id");
				$(_this.#running).find(`[data-obj-id="${id}"]`).delete();
			})

	}

}
