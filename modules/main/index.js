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
			.off(`mutation.${this.id}`)
			.on(`mutation.${this.id}`, `#${this.id} > #content`,function (e) {
				let muttObj = $(e.target)
				console.log(typeof muttObj[0].parameters.isOnFront !== "undefined")
				{
					if (muttObj[0].parameters.isOnFront()) {
						$(`[data-obj-id]`).removeClass("selected")
						$(`[data-obj-id="${muttObj.attr('id')}"]`).addClass("selected")
					}
				}

				$(this).find("[box]:not([run-added])").each(function () {
					let icon = $(this)[0].parameters.faIcon
					if (icon !== "") {
						let newObj = new HTMLObject($(icon))
						//newObj.object = $($(this)[0].parameters.faIcon)
						newObj.object.attr(`data-obj-id`, $(this)[0].parameters.id)
						newObj.object.addClass('clickable fadeIn selected')
						newObj.object.attr("data-animated", "");
						newObj.name = "running-icon"
						//newObj.attr("data-title",$(this)[0].parameters.title)

						$(this).attr("run-added", "");
						$(`[data-obj-id]`).removeClass("selected")
						newObj.init()
						_this.#running.append(newObj.get())

						newObj.object.on(`mouseup`, function (e) {
							if (e.which === 1) {
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

						}).on(`click`, function (e) {
							e.stopPropagation()
						}).on(`mouseover`, function () {
							/*
                            let boxObj = $(this).clone();
                            boxObj.attr("miniature-id",$(this).attr("id"))
                            boxObj.removeAttr("id")
                            //boxObj.removeAttr("style")
                            boxObj.removeClass(`fadeIn`)
                            boxObj.unbind();
                            boxObj.find(`*`).unbind();

                            newObj.tooltip =$(this)[0].parameters.title
                            */

							let title = $(`<div class="content-title">${$(`#${$(this).attr("data-obj-id")}`)[0].parameters.title}</div>`)
							let boxItem = $(this).clone()
							let boxObj = $(`<div box-item></div>`);
							boxObj.append(title)
							boxObj.append(boxItem)
							_this.#content.append(boxObj)

							boxItem.attr("miniature-id",$(this).attr("id"))
							boxItem.removeAttr("id")
							boxItem.removeAttr("name")
							boxItem.removeClass("fadeIn")

							boxItem.unbind();
							boxItem.find(`*`).unbind();							

							let relWZoom = 100/((boxItem.outerWidth()/225)+1)
							let relHZoom = 100/((boxItem.outerHeight()/225)+1)
							let max =Math.min(relWZoom, relHZoom)
							console.log(max)
							boxItem.find(`.top-left-side, .top-side, .top-right-side, .right-side, .bottom-right-side, .bottom-side, .bottom-left-side, .left-side`).remove()

							boxItem.css({
								top:'unset',
								left:'unset',
								zoom:`${max}%`,
								display:'block'
							})

							newObj.tooltip = boxObj
						})
					}
				});
			})
			.on(`click.${this.id}`,`[name="close-btn"]`,function(){
				let id = $(this).closest(`[box]`).attr("id");
				$(_this.#running).find(`[data-obj-id="${id}"]`).delete();
			})

	}

}
