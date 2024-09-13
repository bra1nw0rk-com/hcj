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
		fadeIn(selector, callback){
			$(selector).each(function(){
				$(this).css({
					opacity:"0"
				}).removeClass('hidden')
				$(this).animate({
					opacity:"1"
				},300,function(){
					$(this).css({
						opacity:""
					})
					if(typeof callback === "function"){
						callback()					
					}
				})
			})
		}
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
		$("body").on("mutation", function () {
			$(this)
				.find("[data-module]:not([data-plugged])")
				.each(function () {
					let moduleName = $(this).attr("data-module");
					$(this).attr("data-plugged","");
					Module.call(moduleName).then((content) => {
						$(this).replaceWith(content.get());
						content.init()
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

	modal={
		create(msg,type){
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
		},
		close(selector, callback) {
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
		let iconLeft = (($(`[data-obj-id="${$(selector).attr('id')}"]`).position().left / $(`body`).width()) * 100);
		let obj = $(selector)
		obj[0].parameters.saveState()
		$(obj).animate(
			{
				zoom: '1%',
				top: `100%`,
				left: `${iconLeft}%`
			},
			500,
			function () {
				$(obj).css({
					transform:'none',
				})
				$(obj).hide()
			}
		);
    }

	maximizeModal(selector) {
		$(selector).show()
		let topP = ((Math.ceil($(selector)[0].parameters.lastPosition.y) / $(selector).parent().height())*100)
		let leftP = ((Math.ceil($(selector)[0].parameters.lastPosition.x) / $(selector).parent().width())*100)
		$(selector)[0].parameters.toFront()
		$(selector).animate(
			{
				top: `${topP}%`,
				left: `${leftP}%`,
				width:`${$(selector)[0].parameters.size.width}`,
				height:`${$(selector)[0].parameters.size.height}`,
				zoom: '100%',
			},500,function(){
				
			}
		);
	}
}
