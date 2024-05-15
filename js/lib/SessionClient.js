import WEBFS from "./WEBFS.js";
class SessionClient {
	#session_string;
	/**
	 * @type {SessionStructure}
	 */
	#session_object;
	constructor() {
		this.clear();
		this.#session_string = sessionStorage.getItem("session");
		if (this.#session_string !== null && typeof this.#session_string !== "undefined") {
			this.#session_string = JSON.parse(this.#session_string);
		} else {
			this.getNewSession();
		}
		//console.log(this.#session_object);
	}
	get id() {
		return this.#session_object.id;
	}
	get workSpace() {
		return this.#session_object.workSpace;
	}
	getNewSession() {
		// @todo get sessionid from server
		this.#session_string = "";
		this.#session_object = new SessionStructure();
		WEBFS.post("/user/session.json", this.#session_object, (resp) => {
			//console.log(resp);
			//this.#session_object = ;
			this.#session_object.id = "newTestId0000";
			this.#session_object.workSpace = "intro";
			this.#session_string = JSON.stringify(this.#session_object);
		});
		sessionStorage.setItem("session", this.#session_string);
	}
	clear() {
		sessionStorage.removeItem("session");
		this.#session_string = null;
	}
}

globalThis.SessionClient = new SessionClient();
