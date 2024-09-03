import HTMLObject from "../../js/lib/html/HTMLObject.js";

export default class Main extends HTMLObject {
	#mainMenu = $(`<div data-module="main/menu"></div>`)
	#content = $(`<div id="content">
				<div data-module="calendar/maya"></div>
			</div>`)
	#footer = $(`<footer></footer>`)
	#running = $(`<div id="running"></div>`)
	#rightSide = $(`<div class="right-side"></div>`)

	constructor() {
		super("div");
		let _this = this;
        this.css = `/modules/main/css/main.css`;
		this.title = "BWOS";
		this.name = "main";
		this.classes = "fadeIn";

		this.object.append(this.#mainMenu)
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
					newObj.addClass('clickable')
					$(this).attr("run-added","");
					console.log(newObj)
					_this.#running.append(newObj)
				});

				$(_this.#running).find(`[data-obj-id]`).each(function(){
					console.log($(`body`).find(`#${$(this).attr("data-obj-id")}`).length)
					if($(`body`).find(`#${$(this).attr("data-obj-id")}`).length === 0){
						$(this).remove()
					}
				})
			});
	}

}
