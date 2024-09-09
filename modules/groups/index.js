/**
 * @author Volodymyr Cherniyevskyy
 * @copyright bra1nw0rk.
 * {@link https://github.com/bra1nw0rk-com/hcj GitHub}.
 * {@link https://www.linkedin.com/in/volodymyr-cherniyevskyy-24962b22b LinkedIn}
 **/

import Box from "../../js/lib/html/Box.js";

export default class Groups extends Box {
    #table;
    constructor() {
        super(true);
        let _this = this;
        this.css = "/modules/groups/index.css";
        this.title = "Groups settings";
        this.classes = "modal hidden";
        this.draggable = true;
        this.resizable = true;
        this.name ="groupsSettings"
        this.#table.table({
            url:"/",
            cmd:"getGroups",
        })
        this.content = `
					
		`;
        this.button.minimize();
        this.button.close();
        this.icon.settings();

    }


}