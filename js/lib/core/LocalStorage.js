/**
 * @author Volodymyr Cherniyevskyy
 * @copyright bra1nw0rk.
 * {@link https://github.com/bra1nw0rk-com/hcj GitHub}.
 * {@link https://www.linkedin.com/in/volodymyr-cherniyevskyy-24962b22b LinkedIn}
 **/
export default class LocalStorage {
	#name = "";
	constructor(name) {
		this.#name = name;
	}
	set(name, value) {
		localStorage.setItem(`${this.#name}.${name}`, value);
	}
	get(name) {
		return localStorage.getItem(`${this.#name}.${name}`);
	}
	clear() {
		localStorage.clear();
	}
}
