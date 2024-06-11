export default class System {
	static #oid = -1;
	static clearCache() {
		if (typeof caches !== "undefined") {
			caches.keys().then((keyList) =>
				Promise.all(
					keyList.map((key) => {
						return caches.delete(key);
					})
				)
			);
		}
	}
	static getOID() {
		this.#oid++;
		return this.#oid;
	}
	static getRandomInt() {
		return Math.random() * 1000000000000000000;
	}
	static getCSSVar(name) {
		return window.getComputedStyle(document.body).getPropertyValue("--" + name);
	}
	static loadJS(url) {
		let app = document.createElement("script");
		app.type = "module";
		app.src = `${url}?v=${this.getRandomInt()}`;
		if (document.querySelector("head") instanceof HTMLHeadElement) {
			// @ts-ignore
			document.querySelector("head").append(app);
		}
	}
}
globalThis.System = System;

System.clearCache();
//System.loadJS("/js/app.js");
