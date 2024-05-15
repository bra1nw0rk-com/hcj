export default class CSSNode {
	/**
	 * @type {String|null}
	 */
	selector = null;
	/**
	 * @type {String|null}
	 */
	absoluteSelector = "";
	/**
	 * @type {Array<CSSNode>}
	 */
	childrens = [];
	string = "";
	/**
	 * @type {CSSNode|null}
	 */
	parent = null;
	parameters = {};
	isContainer = false;

	/**
	 *
	 * @param {String|null} selector
	 * @param {CSSNode|null} parent
	 */
	constructor(selector, parent) {
		let space = "";
		let parentIsContainer = null;
		this.isContainer = selector?.match(/(^\@media)|(^\@keyframes)/i) !== null;
		this.selector = selector;
		if (parent !== null) {
			parentIsContainer = parent.absoluteSelector?.match(/(^\@media)|(^\@keyframes)/i);
			if (parentIsContainer === null) {
				this.parent = parent;
			}
		}

		if (this.selector !== null && this.selector !== "") {
			let _parent = "";

			if (this.parent !== null) {
				_parent = this.parent.absoluteSelector;
			}
			this.selector = this.selector.trim();
			if (this.selector.charAt(0) === "&") {
				this.selector = this.selector.replace("&", "");

				//this.absoluteSelector = selector.replaceAll("&", _parent);
			} else if (this.selector.charAt(0) === "@") {
			} else {
				space = " ";
			}
			this.absoluteSelector = (_parent + space + this.selector).trim();
			this.update();
		}
	}
	update() {
		this.string = "";
		if (this.absoluteSelector !== null && this.absoluteSelector !== "") {
			if (Object.keys(this.parameters).length > 0 || this.isContainer) {
				this.string = `${this.absoluteSelector}{`;
				for (let key in this.parameters) {
					this.string += `${key}:${this.parameters[key]};`;
				}
				if (this.isContainer) {
					for (let child of this.childrens) {
						this.string += `${child.string}`;
					}
				}
				this.string += `}`;
			}
			if (!this.isContainer) {
				for (let child of this.childrens) {
					this.string += `${child.string}`;
				}
			}
		} else {
			for (let child of this.childrens) {
				this.string += `${child.string}`;
			}
		}
	}
	addParameter(name, value) {
		this.parameters[`${name}`] = value;
		this.update();
	}

	/**
	 * @param {CSSNode} children
	 */
	addChildren(children) {
		let index = this.childrens.push(children);
		this.update();
		return this.childrens[index - 1];
	}

	getAddress() {
		return this;
	}

	getParrent() {
		if (this.parent !== null) {
			return this.parent;
		} else {
			return null;
		}
	}
}
