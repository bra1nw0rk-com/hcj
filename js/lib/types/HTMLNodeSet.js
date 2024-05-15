class HTMLNodeSet {
	/**
	 * @type {Array<HTMLNode>}
	 */
	nodes = [];
	constructor() {}
	addClass(className) {
		for (let node of this.nodes) {
			node.setClass(className);
		}
	}

	init(arrNodes) {
		this.nodes = arrNodes;
	}
	attr(name, value) {
		for (let node of this.nodes) {
			node.attr(name, value);
		}
	}
	html(value) {
		for (let node of this.nodes) {
			node.html(value);
		}
	}
	find(value) {
		let htmlSelector = new HTMLSelector(value);
		let result = [];
		for (let node of this.nodes) {
			result = [...result, ...node.find(htmlSelector)];
		}
		let newHTMLNodeSet = new HTMLNodeSet();
		newHTMLNodeSet.init(result);
		return newHTMLNodeSet;
	}
	show() {
		console.log(`[HTMLNodeSet]:`, this.nodes);
		for (let node of this.nodes) {
			console.log(`[HTMLNodeSet]:`, node);
			node.css({ display: "block" });
		}
	}
	hide() {
		console.log(`[HTMLNodeSet]:`, this.nodes);
		for (let node of this.nodes) {
			console.log(`[HTMLNodeSet]:`, node);
			node.css({ display: "none" });
		}
	}

	remove() {
		//console.log(`[HTMLNodeSet]:remove:`, this.nodes);
		for (let node of this.nodes) {
			//console.log(`[HTMLNodeSet]:remove:`, node);
			node.remove();
		}
	}

	append(elem) {
		for (let node of this.nodes) {
			node.append(elem);
		}
	}
	prepend(elem) {
		for (let node of this.nodes) {
			node.prepend(elem);
		}
	}
	child(value) {
		let htmlSelector = new HTMLSelector(value);
		let result = [];
		for (let node of this.nodes) {
			result = [...result, ...node.child(htmlSelector)];
		}
		let newHTMLNodeSet = new HTMLNodeSet();
		newHTMLNodeSet.init(result);
		return newHTMLNodeSet;
	}
}

globalThis.HTMLNodeSet = HTMLNodeSet;
