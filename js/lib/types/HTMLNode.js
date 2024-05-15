class HTMLNode {
	remove() {
		this.#source?.remove();
	}
	setClass(className) {
		if (this.#source !== null) {
			if (typeof className !== "undefined") {
				if (!this.#source.classList.contains(className)) {
					this.#source.classList.add(className);
				}
			}
		}
	}
	removeClass(className) {
		if (this.#source !== null) {
			if (typeof className !== "undefined") {
				if (!this.#source.classList.contains(className)) {
					this.#source.classList.remove(className);
				}
			}
		}
	}
	toggleClass(className) {
		if (this.#source !== null) {
			if (typeof className !== "undefined") {
				if (!this.#source.classList.contains(className)) {
					this.#source.classList.remove(className);
				} else {
					this.#source.classList.add(className);
				}
			}
		}
	}
	/**
	 * @type {null|HTMLHtmlElement|HTMLElement}
	 */
	#source = null;
	get selector() {
		let result = "";
		return `${this.tagName}${this.idString}${this.classesString}${this.attributesString}`;
	}

	get node() {
		if (this.#source !== null) {
			return this.#source;
		}
	}
	get tagName() {
		if (this.#source !== null) {
			return this.#source.localName;
		}
	}

	get ids() {
		let result = [];
		if (this.#source !== null) {
			result = this.#source.id.split(" ");
		}
		return result;
	}
	set id(val) {
		if (this.#source !== null) {
			if (typeof val !== "undefined") {
				this.#source.id = val;
			}
		}
	}
	set name(val) {
		if (this.#source !== null) {
			if (typeof val !== "undefined") {
				this.#source.setAttribute('name', val);
			}
		}
	}
	get idString() {
		let result = "";
		if (typeof this.id !== "undefined") {
			if (this.id !== "") {
				result = `#${this.id.replaceAll(" ", "#")}`;
			}
		}
		return result;
	}
	get classes() {
		let result = [];
		if (this.#source !== null) {
			for (let className of this.#source.classList) {
				result.push(className);
			}
		}
		return result;
	}
	get classesString() {
		let result = "";
		if (this.#source !== null) {
			for (let className of this.#source.classList) {
				result += `.${className}`;
			}
		}
		return result;
	}
	get attributes() {
		let result = {};
		if (this.#source !== null) {
			for (let attribute of this.#source.attributes) {
				result[attribute.localName] = attribute.value;
			}
		}
		return result;
	}

	get attributesString() {
		let result = "";
		if (this.#source !== null) {
			for (let attribute of this.#source.attributes) {
				result += `[${attribute.localName}${attribute.value !== "" ? "=" + attribute.value : ""}]`;
			}
		}
		return result;
	}

	get parent() {
		return this.#source?.parentElement;
	}

	get childrens() {
		/**
		 * @type {Array<HTMLNode>}
		 */
		let result = [];
		if (this.#source !== null) {
			for (let child of this.#source.children) {
				//console.log(child);
				result.push(new HTMLNode(child));
			}
		}
		return result;
	}
	constructor(node) {
		if (typeof node === "string") {
			node = this.htmlToElement(node);
		}
		if (typeof node === "object") {
			this.#source = node;
		}
	}
	/**
	 * @param {String} htmlString
	 * @return {ChildNode|null}
	 */
	htmlToElement(htmlString) {
		let template = document.createElement("template");
		template.innerHTML = htmlString;
		return template.content.firstChild;
	}
	/**
	 * @param {String} htmlString
	 * @return {NodeList}
	 */
	htmlToElements(htmlString) {
		let template = document.createElement("template");
		template.innerHTML = htmlString;
		return template.content.childNodes;
	}
	attr(name, value) {
		if (this.#source !== null) {
			console.log(this.#source);
			this.#source.setAttribute(name, value);
		}
	}
	html(value) {
		if (this.#source !== null) {
			this.#source.innerHTML = value;
		}
	}
	css(paramsSet) {
		if (typeof paramsSet == "object") {
			for (let param in paramsSet) {
				if (this.#source !== null) {
					this.#source.style[param] = paramsSet[param];
				}
			}
		}
	}
	append(elem) {
		if (this.#source !== null) {
			this.#source.append(elem);
		}
	}
	prepend(elem) {
		if (this.#source !== null) {
			this.#source.prepend(elem);
		}
	}
	/**
	 * @param {HTMLSelector} selector
	 */
	child(selector) {
		/**
		 * @type {Array<HTMLNode>}
		 */
		let result = [];
		for (let children of this.childrens) {
			let searchResult = children.find(selector);
			if (searchResult.length > 0) {
				result = [...result, ...searchResult];
			}
		}
		return result;
	}
	/**
	 * @param {HTMLSelector} selector
	 */
	find(selector) {
		//console.log(`This selector: ${this.selector}`);
		/**
		 * @type {Array<HTMLNode>}
		 */
		let result = [];
		let boolAllParamsFinded = true;
		let objAllSearchParams = {};
		if (selector !== null && typeof selector !== "undefined") {
			//console.log(`Searching for selector: ${selector.selector}`, selector);
			if (selector.tagName !== "") {
				objAllSearchParams[`tagName`] = false;
				if (this.tagName === selector.tagName) {
					objAllSearchParams[`tagName`] = true;
				} else {
					objAllSearchParams[`tagName`] = false;
				}
			}
			if (selector.ids.length !== 0) {
				objAllSearchParams[`ids`] = false;
				let findedIds = 0;
				for (let id of selector.ids) {
					for (let thisId of this.ids) {
						if (thisId === id) {
							findedIds++;
						}
					}
				}
				if (selector.ids.length === findedIds) {
					objAllSearchParams[`ids`] = true;
				} else {
					objAllSearchParams[`ids`] = false;
				}
			}
			if (selector.classes.length !== 0) {
				objAllSearchParams[`classes`] = false;
				let findedClasses = 0;
				for (let cls of selector.classes) {
					for (let thisClass of this.classes) {
						if (thisClass === cls) {
							findedClasses++;
						}
					}
				}
				if (selector.classes.length === findedClasses) {
					objAllSearchParams[`classes`] = true;
				} else {
					objAllSearchParams[`classes`] = false;
				}
			}
			for (let item in objAllSearchParams) {
				if (objAllSearchParams[item] === false) {
					boolAllParamsFinded = false;
				}
			}
			let boolClosestChild = false;
			if (selector.closestChildren !== null) {
				boolClosestChild = true;
			}
			if (boolAllParamsFinded) {
				// console.log(`All parameters finded.`);
				// console.log(selector.children, this);
				let cnt = 0;
				if (this.childrens.length > 0 && selector.closestChildren !== null) {
					for (let child of this.childrens) {
						let findedNode = child.find(selector.closestChildren);
						//console.log(`[HTMLNode]:find:childNode:`, findedNode);
						if (findedNode.length > 0) {
							for (let node of findedNode) {
								result.push(node);
								cnt++;
							}
						}
					}
					if (cnt > 0) {
						boolAllParamsFinded = true;
					} else {
						boolAllParamsFinded = false;
					}
				}
			}
			if (boolAllParamsFinded) {
				// console.log(`All parameters finded.`);
				// console.log(selector.children, this);
				if (this.childrens.length > 0 && selector.children !== null) {
					// console.log(`Sending subselector to childs...`);
					for (let child of this.childrens) {
						if (selector.children !== null) {
							let findedNode = child.find(selector.children);
							if (findedNode.length > 0) {
								for (let node of findedNode) {
									result.push(node);
								}
							}
						}
					}
				} else {
					if (!boolClosestChild) {
						result.push(this);
					}
				}
			} else {
				// console.log(`Some parameters cant't be finded.`);
				// console.log(selector, this);
				// console.log(`Sending to childs...`);
				for (let child of this.childrens) {
					let findedNode = child.find(selector);
					if (findedNode.length > 0) {
						for (let node of findedNode) {
							result.push(node);
						}
					}
				}
			}
		}
		return result;
	}
}
globalThis.HTMLNode =  HTMLNode;
