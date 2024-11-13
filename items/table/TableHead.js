/*
 * @author Volodymyr Cherniyevskyy
 * @copyright bra1nw0rk.
 * {@link https://github.com/bra1nw0rk-com/hcj GitHub}.
 * {@link https://www.linkedin.com/in/volodymyr-cherniyevskyy-24962b22b LinkedIn}
 */


import HTMLObject from "../../js/lib/html/HTMLObject.js";
import TableRow from "./TableRow.js";

export default class TableHead extends HTMLObject{
    row = new TableRow();
    constructor() {
        super("thead")
    }
    add(name, value) {
        this.row.add(name, value);
    }
    html() {
        for (let cell of this.row.cells) {
            cell.isHeader = true;
        }
        this.object.children().remove();
        this.object.append(this.row.html());
        return this.object;
    }
}



