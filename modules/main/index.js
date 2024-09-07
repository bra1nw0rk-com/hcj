/**
 * @author Volodymyr Cherniyevskyy
 * @copyright bra1nw0rk.
 * {@link https://github.com/bra1nw0rk-com/hcj GitHub}.
 * {@link https://www.linkedin.com/in/volodymyr-cherniyevskyy-24962b22b LinkedIn}
 **/
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
					//let newObj = $($(this)[0].parameters.faIcon)
					let newObj = new HTMLObject($($(this)[0].parameters.faIcon))
					//newObj.object = $($(this)[0].parameters.faIcon)
					newObj.object.attr(`data-obj-id`,$(this)[0].parameters.id)
					newObj.object.addClass('clickable fadeIn selected')
					newObj.object.attr("data-animated","");
					newObj.name = "running-icon"
					//newObj.attr("data-title",$(this)[0].parameters.title)
					let boxObj = $(this).clone();
					boxObj.attr("miniature-id",$(this).attr("id"))
					boxObj.removeAttr("id")
					boxObj.removeAttr("style")
					boxObj.removeClass(`fadeIn`)
					boxObj.unbind();
					boxObj.find(`*`).unbind();

					newObj.tooltip =/*$(this)[0].parameters.title*/ boxObj
					$(this).attr("run-added","");
					$(`[data-obj-id]`).removeClass("selected")
					newObj.init()
					_this.#running.append(newObj.get())

					newObj.object.on(`mousedown`,function(e){
						if(e.which === 1) {
							e.stopPropagation()
							let id = $(this).attr(`data-obj-id`)
							let item = $(`#${id}`)
							if (item.css('display') === "none") {
								item[0].parameters.maximize();
							} else {
								if (!item[0].parameters.isOnFront()) {
									item[0].parameters.toFront()
								} else {
									item[0].parameters.minimize();
								}
							}
						}

					}).on(`click`,function(e){
						e.stopPropagation()
					})
				});
			})
			.on("click.main",`[name="close-btn"]`,function(){
				let id = $(this).closest(`[box]`).attr("id");
				$(_this.#running).find(`[data-obj-id="${id}"]`).delete();
			}).on(`addClass.main`,`[box]`,function(e,data){
				if(data.class === `top`){
					$(`[data-obj-id]`).removeClass("selected")
					$(`[data-obj-id="${this.id}"]`).addClass("selected")
				}
			}).on(`removeClass.main`,`[box]`,function(e,data){
				console.log(e,data)
				if(data.class === `top`){
					$(`[data-obj-id="${this.id}"]`).removeClass("selected")
				}
			})

	}

}
