/**
 * @author Volodymyr Cherniyevskyy
 * @copyright bra1nw0rk.
 * {@link https://github.com/bra1nw0rk-com/hcj GitHub}.
 * {@link https://www.linkedin.com/in/volodymyr-cherniyevskyy-24962b22b LinkedIn}
 **/

import Box from "../../js/lib/html/Box.js";
import Table from "../../js/lib/html/table/Table.js";

export default class Groups extends Box {
    table = new Table({
        url:"/",
        cmd:"getGroups",
    });
    constructor() {
        super(true);
        let _this = this;
        this.css = "/modules/groups/index.css";
        this.title = "Groups settings";
        this.classes = "modal hidden";
        this.draggable = true;
        this.resizable = true;
        this.name ="groupsSettings"
        console.log(this.table.get())
        this.content.append(this.table.get())
        this.button.minimize();
        this.button.close();
        this.icon.settings();

    }

    init() {
        super.init();
        this.table.init()
    }


}
