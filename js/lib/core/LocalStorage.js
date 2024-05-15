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
