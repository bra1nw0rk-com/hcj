export default class UI {
	get savedTheme() {
		return localStorage.getItem("theme") || "dark";
	}
	set savedTheme(newTheme) {
		localStorage.setItem("theme", newTheme);
	}
	effects = {
		shake(selector) {
			$(selector).removeClass("fadeIn").removeClass("modal-shake").addClass("modal-shake");
			setTimeout(function () {
				$(selector).removeClass("modal-shake");
			}, 800);
		},
	};
	constructor() {}
	init() {
		$("body").addClass(this.savedTheme + "-theme");
	}
	toggleTheme() {
		const newTheme = this.savedTheme === "dark" ? "light" : "dark";
		$("body")
			.removeClass(this.savedTheme + "-theme")
			.addClass(newTheme + "-theme");
		this.savedTheme = newTheme;
	}
	clearPage() {
		$("#main").each(function () {
			$(this).remove();
		});
	}
	clearForm(selector) {
		$(selector + " input").each(function () {
			$(this).val("");
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
		let element = $('body');
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

	}
	hide(selector) {
		$(selector).removeClass("show");
	}
	show(selector) {
		if (!$(selector).hasClass("show")) {
			$(selector).removeClass("hide").addClass("show");
		}
	}
}
