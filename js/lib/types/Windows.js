globalThis.Windows = {
	dialog: function (type = "", wntTitle = "Info", content) {
		let wndName = `wnd${type}${new Date().getTime()}`;
		let windowDiv = new HTMLNode(/*html*/ `<div name="${wndName}" title="${wntTitle}"></div>`);
		windowDiv.attr("class", `window`);
	},
	alert: function (content) {
		Windows.dialog("alert", "Alert", content);
	},

	header: function (title, buttons) {
		let header = new HTMLNode(
			`<div class="ui-dialog-header"><span class="ui-dialog-title">${title}</span><span class="ui-dialog-buttonpane "></span></div>`
		);
		return header.node;
	},
	content: function (cont) {
		let content = new HTMLNode(`<div class="ui-dialog-content">${cont}</div>`);
		return content.node;
	},
	footer: function () {
		let footer = new HTMLNode(`<div class="wnd_footer"></div>`);
		return footer.node;
	},
	
	app: function (appName) {
		let wndName = `wnd${appName}${new Date().getTime()}`;
		let windowDiv = new HTMLNode(`<div></div>`);
		windowDiv.setClass(`window`);
		windowDiv.setClass(`ui-dialog`);

		windowDiv.id = wndName;
		windowDiv.name = appName;
		windowDiv.prepend(this.header(`${appName}`));
		windowDiv.append(this.content(`content`));
		windowDiv.append(this.footer());
		return windowDiv.node;
	},

	/**
	 * @todo Udelat dolni listu pro zobrazeni otevrenych oken
	 */
};
