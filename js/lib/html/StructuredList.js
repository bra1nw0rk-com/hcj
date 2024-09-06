/**
 * @author Volodymyr Cherniyevskyy
 * @copyright bra1nw0rk.
 * {@link https://github.com/bra1nw0rk-com/hcj GitHub}.
 * {@link https://www.linkedin.com/in/volodymyr-cherniyevskyy-24962b22b LinkedIn}
 **/
export default class StructuredList {
	data = [];
	node = $("<div></div>");
	constructor(data) {
		if (typeof data !== "undefined") {
			if (this.data instanceof Array) {
				this.data = data;
			}
		}
	}

	get() {
		if (this.data.length > 0) {
			for (let item of this.data) {
				let child = $(`<div></div>`);
				for (let key in item) {
					child.attr("data-" + key, item[key]);
					if (key === "name") {
						child.html(item[key]);
					}
				}

				if (typeof item.id !== "undefined") {
					/*child.html(`${item.id} - ${child.html()}`);*/
					child.html(`${child.html()}`);
					let matches = item.id.match(/(.*?)\.[0-9]+$/);
					if (matches !== null) {
						if (typeof matches[1] !== "undefined") {
							let parent_id = matches[1];
							let parent = this.node.find(`[data-id="${parent_id}"]`);
							if (parent.length !== 0) {
								parent.append(child);
								parent.addClass("collapsable");
							} else {
								this.node.append(child);
							}
						}
						//console.log(matches);
					} else {
						this.node.append(child);
					}
				}
			}
		}
		return $(this.node.html());
	}
}
