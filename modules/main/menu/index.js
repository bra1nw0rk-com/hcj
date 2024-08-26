import HTMLObject from "../../../js/lib/html/HTMLObject.js";
import WEBFS from "../../../js/lib/core/WEBFS.js";

export default class MainMenu extends HTMLObject {
	constructor() {
		super("menu");
		let _this = this;
        this.css = "/modules/main/menu/main-menu.css";
		this.name = "main-menu";
		this.classes = "menu";
		this.template = $(html`
			<div class="menu-icon">
				<i class="fa fa-solid fa-bars"></i>
			</div>
			<div class="menu-content">
				<div data-module="menu-logo"></div>				
			</div>
		`);
		$("body #content").append(this.get());
	}
	init() {
		this.load();
		$("body")
			.off(".mainMenu")

			.on("click.mainMenu", `[name="main-menu"]`, function (e) {
				$(`[name="main-menu"] .dropdown-content`).removeClass("show");
				e.stopPropagation();
			})
			.on("click.mainMenu", `[name="main-menu"] .menu-icon`, function () {
				$(this).addClass("hide");
				$(`[name="main-menu"] .menu-content`).addClass("show");
			})
			.on("click.mainMenu", `[name="main-menu"] .menu-item`, function (e) {
				e.stopPropagation();
			})
			.on("click.mainMenu", `[name="main-menu"] .menu-item[data-onclick]`, function (e) {
				eval($(this).attr("data-onclick"));
				$(`[name="main-menu"] .dropdown-content`).removeClass("show").addClass("hide");
				/*
				if (System.getCSSVar("menu-width") == "768") {
					$("html").trigger("click");
				}
				 */
			})
			.on("click.mainMenu", `[name="main-menu"] .menu-item.dropdown, [name="main-menu"] .menu-item.submenu`, function (e) {
				$(this).find(".dropdown .dropdown-content,.submenu .dropdown-content").removeClass("show");
				$(this).find(">.dropdown-content").toggleClass("show");
			})
			.on("mouseover.mainMenu", `[name="main-menu"] .menu-item.dropdown, [name="main-menu"] .menu-item.submenu`, function (e) {
				$(`[name="main-menu"] .dropdown-content`).removeClass("hide");
			});
		$("html").on("click.mainMenu", function (event) {
			$(`[name="main-menu"] .dropdown-content`).removeClass("show");
			$(`[name="main-menu"] .menu-content`).removeClass("show");
			$(`[name="main-menu"] .menu-icon`).removeClass("hide");
		});
	}
	load() {
		WEBFS.api('/',{
			cmd:"getMenu",
			params:["main"]
		},function(data) {
			$(`[name="main-menu"]`).find("[data-parent='0']").remove();
			let tmpDiv = $("<div></div>");
			data.forEach(function (item) {
				let icon = item.icon ? "<i class='" + item.icon + "'></i>" : "<i class='fa fa-ravelry'></i>";
				let app = item.app ? "data-app='" + item.app + "'" : "";
				let newMenuItem = $("<div></div>");
				for (let key in item) {
					newMenuItem.attr("data-" + key, item[key]);
				}
				if (item.type === "separator") {
					newMenuItem.addClass("menu-separator");
				} else {
					newMenuItem.addClass("menu-item");
					newMenuItem.html(icon + item.text);
				}
				if (item.parent_id === 0) {
					newMenuItem.attr("data-level", "0");
					tmpDiv.append(newMenuItem);
				} else {
					let parent = tmpDiv.find('[data-id="' + item.parent_id + '"]');
					if (parent.attr("data-level") === "0") {
						if (!parent.hasClass("dropdown")) {
							parent.addClass("dropdown");
							let dropdownContent = $('<div class="dropdown-content"></div>');
							parent.append(dropdownContent);
						}
					} else {
						if (!parent.hasClass("submenu")) {
							parent.addClass("submenu");
							let dropdownContent = $('<div class="dropdown-content"></div>');
							parent.append(dropdownContent);
						}
					}
					parent.find(">.dropdown-content").append(newMenuItem);
				}
			});
			$(`[name="main-menu"] .menu-content :not(.menu-icon, [name="menu-logo"],[name="menu-logo"] *, [data-module="menu-logo"], [data-module="menu-logo"] *)`).remove();
			$(`[name="main-menu"] .menu-content`).append(tmpDiv.html());

		});
	}

}
