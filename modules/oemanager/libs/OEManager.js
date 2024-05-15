import Module from "../../../js/lib/core/Module.js";
import HTMLObject from "../../../js/lib/html/HTMLObject.js";
import Programs from "./Programs.js";

export default class OEManager extends HTMLObject {
	constructor() {
		super("program");
		let _this = this;
		this.classes = "fadeIn";
		this.id = "oemanager";
		this.animated = true;
		this.css = "/modules/oemanager/css/index.css";
		this.template = html` <div class="menu-block">
				<input type="text" class="program-search" autocomplete="off" />
				<div data-module="oemanager/lists/programs" data-src="" data-name="menu" data-title="menu"></div>
				<!--
        <div class="bookmarks block collapsable">bookmarks</div>
        <div class="top-used block collapsable">top used</div>
        -->
			</div>
			<div class="main-block"></div>`;

		if (storage.get("oemanager.environment") == null) {
			Module.call("oemanager/forms/SelectEnvironmentForm").then((content) => {
				$(`body #content`).append(content.get());
				content.on("submit", function () {
					$(`body #content`).html("").append(_this.get());
					_this.eventHandler();
				});
			});
		} else {
			$(`body #content`).html("").append(this.get());
			this.eventHandler();
		}
		$(":root").css({ "--current-color": `var(--${storage.get("oemanager.environment")}-color)` });
		this.object.find(".main-block").sheets();
	}

	eventHandler() {
		let _this = this;
		$("body").off(".programSearch");
		$("body").on("click.programSearch", function () {
			$("#oemanager .menu-block .structured-list").removeClass("show");
			$("#oemanager .menu-block .structured-list [data-id]").removeClass("show").removeClass("hide");
		});
		$("body").on("click.programSearch", "#oemanager .menu-block [data-id]", function (e) {
			$("#oemanager .menu-block [data-id]")
				.not($(this))
				.not($("#oemanager .menu-block [data-id]").has($(this)))
				.removeClass("show");
			//$(this).addClass("show");
			$(this).find(">[data-id]").removeClass("hide").addClass("show");
			e.stopPropagation();
		});
		$("body").on("click.programSearch", "#oemanager .menu-block .program-search", function (e) {
			$(this).trigger("keyup.programSearch");
			$("#oemanager .menu-block .structured-list").addClass("show");
			e.stopPropagation();
		});
		$("body").on("click.programSearch", "#oemanager .menu-block .program-search", function (e) {
			$("#oemanager .menu-block .structured-list").addClass("show");
			e.stopPropagation();
		});
		$("body").on("keyup.programSearch", "#oemanager .menu-block .program-search", function (e) {
			let value = $(this).val();
			if (value == "") {
				$("#oemanager .menu-block .structured-list .content [data-id]").removeClass("show").removeClass("hide");
			} else {
				$("#oemanager .menu-block .structured-list .content [data-id]").removeClass("show").addClass("hide");
				$("#oemanager .menu-block .structured-list .content [data-id][data-name]")
					.filter(function (i, e) {
						//console.log($(e).attr("data-id").toLowerCase().includes(value), $(e).attr("data-id").toLowerCase());
						return (
							$(e).attr("data-id").toLowerCase().includes(value.toLowerCase()) ||
							$(e).attr("data-name").toLowerCase().includes(value.toLowerCase())
						);
					})
					.each(function () {
						$("#oemanager .menu-block .structured-list .content [data-id]").has($(this)).removeClass("hide").addClass("show");
						$(this).removeClass("hide").addClass("show");
					});
			}
		});

		let resizing = false;
		let elementWidth = 0;
		let elementEvent;
		$("body").on("mousedown.programSearch", "#oemanager .menu-block", function (e) {
			if (this.offsetWidth - e.offsetX <= 3) {
				resizing = true;
				elementEvent = e;
			}
		});

		$("body").on("mousemove.programSearch", "#oemanager", function (e) {
			if (resizing) {
				let diffX = e.pageX - elementEvent.pageX;
				elementWidth = $(this).find(".menu-block").width();
				$(`#oemanager .menu-block`).width(elementWidth + diffX);
				console.log(diffX, elementWidth);
			}
		});

		$("body").on("mouseup.programSearch", "#oemanager", function (e) {
			//console.log("mouseup");
			resizing = false;
		});
	}
}
