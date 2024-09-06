/**
 * @author Volodymyr Cherniyevskyy
 * @copyright bra1nw0rk.
 * {@link https://github.com/bra1nw0rk-com/hcj GitHub}.
 * {@link https://www.linkedin.com/in/volodymyr-cherniyevskyy-24962b22b LinkedIn}
 **/
import "../app/roles/node_modules/jquery/dist/jquery.js";
import "../app/roles/node_modules/jquery-ui/dist/jquery-ui.js"
import "../app/roles/node_modules/jquery-ui/ui/widgets/tabs.js";

let Tabs = {
	create: function (tabsName) {
		$(`[name='${tabsName}']`).tabs("destroy");
		let _tabs = $(/*html*/ `
            <div name="${tabsName}">
                <ul class="tabs-head"></ul>
            </div>
        `);
		$("body").append(_tabs);
		_tabs.tabs();
	},
	add: function (tabsName, tabName, tabTitle, content) {
		let $tabs = $(`[name='${tabsName}']`);
		if ($tabs.find(`ul li[name='${tabName}']`).length == 0) {
			$tabs.find("ul").first().append(/*html*/ `<li name="${tabName}"><a href="#${tabName}">${tabTitle}</a></li>`);
		}
		let $tab = $(/*html*/ `<div id="${tabName}"></div>`);
		$tabs.find(`div[id='${tabName}']`).remove();
		$tab.append(content);
		$tabs.append($tab);
		$tabs.tabs("refresh");
	},
};
export default Tabs;
