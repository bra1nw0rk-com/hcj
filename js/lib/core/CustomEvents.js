/**
 * @author Volodymyr Cherniyevskyy
 * @copyright bra1nw0rk.
 * {@link https://github.com/bra1nw0rk-com/hcj GitHub}.
 * {@link https://www.linkedin.com/in/volodymyr-cherniyevskyy-24962b22b LinkedIn}
 **/
export default class CustomEvents {
	#events = {};
	constructor() {
		this.#events = {};
	}
	on(name, callback) {
		if (typeof this.#events[name] === "undefined") {
			this.#events[name] = [];
		}
		return this.#events[name].push(callback);
	}
	call(name, values = {}) {
		let eventList = this.#events[name];
		if (typeof eventList !== "undefined") {
			for (let evnt of eventList) {
				evnt(values);
			}
		} else {
			console.log(`[CustomEvents]: ${name} is not undefined`);
		}
	}
	remove(name, id) {
		this.#events[name].splice(id, 1);
	}
}
