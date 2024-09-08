/**
 * @author Volodymyr Cherniyevskyy
 * @copyright bra1nw0rk.
 * {@link https://github.com/bra1nw0rk-com/hcj GitHub}.
 * {@link https://www.linkedin.com/in/volodymyr-cherniyevskyy-24962b22b LinkedIn}
 **/

import Module from "./Module.js";

export default class UI {
	get savedTheme() {
		return localStorage.getItem("theme") || "dark";
	}
	set savedTheme(newTheme) {
		localStorage.setItem("theme", newTheme);
	}
	effects = {
		shake(selector) {
			$(selector).attr("data-animated","")
			$(selector).removeClass("fadeIn").removeClass("modal-shake").addClass("modal-shake");
			setTimeout(function () {
				$(selector).removeClass("modal-shake");
			}, 800);
		},
		show(selector) {
			//console.log(selector)
			$(selector).each(function(){
				if($(this).attr("data-animated")!== undefined) {
					if(!$(this).hasClass("fadeIn")) {
						$(this).removeClass("fadeIn").removeClass("modal-shake").removeClass("hidden").addClass("fadeIn");
					}
				}
			})
		},
	};
	constructor() {

	}
	#mutationObserver(){
		window.mutationObserver = new MutationObserver((mutationList) =>
			mutationList
				.filter((m) => m.type === "childList")
				.forEach((m) => {
					m.addedNodes.forEach(function (e) {
						$(e).trigger("mutation");
					});
				})
		);
		$(document).each(function () {
			window.mutationObserver.observe(this, { childList: true, subtree: true });
		});
	}
	#module_service(){
		$("body").on("mutation", function (e) {
			$(this)
				.find("[data-module]:not([data-plugged])")
				.each(function () {
					let title = $(this).attr("data-title");
					let name = $(this).attr("data-name");
					let src = $(this)[0].source;
					let moduleName = $(this).attr("data-module");
					$(this).attr("data-plugged","");
					Module.call(moduleName).then((content) => {
						$(this).replaceWith(content.get());
					});
				});
		});
	}
	init() {
		this.#module_service()
		this.#mutationObserver()
		$("body").addClass(this.savedTheme + "-theme");

	}
	toggleTheme() {
		const newTheme = this.savedTheme === "dark" ? "light" : "dark";
		$("body")
			.removeClass(this.savedTheme + "-theme")
			.addClass(newTheme + "-theme");
		this.savedTheme = newTheme;
	}

	modal(msg,type){
		let title="";
		if(type==="info"){
			title = "Info"
		}else if(type==="error"){
			title = "Error"
		}
		$(`#content`).modal({
			type:type,
			title:title,
			content:`
			<div>${msg}</div>					
			`
		})
	}

	clearPage() {
		$("#main").each(function () {
			$(this).animate(
				{
					opacity: 0,
				},
				500,
				function () {
					$(this).remove();					
				}
			);			
		});
	}
	clearWindow() {
		$("body *").each(function () {
			$(this).animate(
				{
					opacity: 0,
				},
				500,
				function () {
					$(this).remove();					
				}
			);			
		});
	}

	closeModal(selector, callback) {
		$(selector).animate(
			{
				opacity: 0,
			},
			500,
			function () {
				$(this).remove();
				callback();
			}
		);
	}
	fullScreen(){
		let element = $('body').get(0);
		if (!document.fullscreenElement && !document.webkitFullscreenElement &&
			!document.msFullscreenElement && !document.mozFullScreenElement) {
			// Enter fullscreen mode
			if (element.requestFullscreen) {
				element.requestFullscreen();
			} else if (element.webkitRequestFullscreen) { // Safari
				element.webkitRequestFullscreen();
			} else if (element.msRequestFullscreen) { // IE/Edge
				element.msRequestFullscreen();
			} else if (element.mozRequestFullScreen) { // Firefox
				element.mozRequestFullScreen();
			} else if (element.webkitEnterFullscreen) { // iOS Safari
				element.webkitEnterFullscreen();
			}
		} else {
			// Exit fullscreen mode
			if (document.exitFullscreen) {
				document.exitFullscreen();
			} else if (document.webkitExitFullscreen) { // Safari
				document.webkitExitFullscreen();
			} else if (document.msExitFullscreen) { // IE/Edge
				document.msExitFullscreen();
			} else if (document.mozCancelFullScreen) { // Firefox
				document.mozCancelFullScreen();
			}
		}

	}
	hide(selector) {
		$(selector).removeClass("show");
	}
	show(selector) {
		if (!$(selector).hasClass("show")) {
			$(selector).removeClass("hide").addClass("show");
		}
	}

    minimizeModal(selector) {
		let iconLeft = (($(`[data-obj-id="${$(selector).attr('id')}"]`).position().left / $(`body`).width()) * 100) ;
		$(selector).animate(
			{
				zoom: '1%',
				top: `100%`,
				left: `${iconLeft}%`
			},
			500,
			function () {
				$(selector).css({
					transform:'none',
				})
				$(selector).hide()
				$(selector).removeClass(`top`)
			}
		);
    }

	maximizeModal(selector) {
		$(selector).show()
		// $(`[data-obj-id]`).removeClass("selected")
		// $(`[data-obj-id="${$(selector).attr('id')}"]`).addClass("selected")
		$(`[box]`).removeClass(`top`)
		$(selector).addClass(`top`)
		console.log($(`body`).height(),$(`body`).outerHeight())
		let topP = ($(selector)[0].parameters.lastPosition.y / $(`body`).height())*100
		$(selector).animate(
			{
				top: `${topP}%`,
				zoom: '100%',
				left: `${$(selector)[0].parameters.lastPosition.x}px`,

			},500,function(){}
		);
	}
}
