/**
 * @author Volodymyr Cherniyevskyy
 * @copyright bra1nw0rk.
 * {@link https://github.com/bra1nw0rk-com/hcj GitHub}.
 * {@link https://www.linkedin.com/in/volodymyr-cherniyevskyy-24962b22b LinkedIn}
 **/
import Module from "../../../js/lib/core/Module.js";
import LoginForm from "../forms/LoginForm.js";

export default class User {
	loginTimeout = 1000 * 60 * 20;
	loginTimer = 0;
	get sessionId() {
		return localStorage.getItem("user.sessionId") || null;
	}
	set sessionId(sid) {
		if (sid !== null) {
			localStorage.setItem("user.sessionId", sid);
		}
	}
	constructor() {}
	get lastUpdate() {
		let result = localStorage.getItem("user.lastUpdate");
		if (result !== null) {
			return parseInt(result);
		}
		return 0;
	}
	set lastUpdate(time) {
		if (time !== null) {
			localStorage.setItem("user.lastUpdate", time.toString());
		}
	}
	setLoginTimer() {
		if (this.loginTimer !== null) {
			clearInterval(this.loginTimer);
		}
		this.loginTimer = setInterval(() => {
			if (WS.user.needLogin()) {
				WS.user.logout();
			}
		}, 1000);
	}

	init() {
		$("html").on("click mousemove mousedown keypress", "*", function (e) {
			WS.user.lastUpdate = new Date().getTime();
		});
		this.testLogin();
	}

	needLogin() {
		if (this.sessionId !== "null" && this.sessionId !== null) {
			if (this.lastUpdate + this.loginTimeout < new Date().getTime()) {
				//here test session in server
				return true;
			} else {
				return false;
			}
		} else {
			return true;
		}
	}
	testLogin() {
		if (this.needLogin()) {
			this.logout();
		} else {
			WS.containers.call("main");
			this.setLoginTimer();
		}
	}

	update(sid) {
		this.sessionId = sid;
		this.lastUpdate = new Date().getTime();
		//this.events.call("loggedIn");
	}
	login(login, password) {
		if (login == "admin" && password == "admin") {
			WS.ui.modal.close("#userLoginForm", function () {
				WS.user.update("dslfafhkldhjakelrhalweh54sdaf54d");
				WS.user.testLogin();
			});
		} else {
			WS.ui.clearForm("#userLoginForm");
			WS.ui.effects.shake("#userLoginForm");
		}
		/* create api for login*/
		return false;
	}
	logout() {
		clearInterval(this.loginTimer);
		this.sessionId = null;
		this.lastUpdate = 0;
		WS.ui.clearPage();
		Module.call("main/forms/LoginFrom.js");
	}
}
