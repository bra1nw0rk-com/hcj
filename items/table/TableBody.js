/*
 * @author Volodymyr Cherniyevskyy
 * @copyright bra1nw0rk.
 * {@link https://github.com/bra1nw0rk-com/hcj GitHub}.
 * {@link https://www.linkedin.com/in/volodymyr-cherniyevskyy-24962b22b LinkedIn}
 */

import HTMLObject from "../../js/lib/html/HTMLObject.js";
import TableRow from "./TableRow.js";

export default class TableBody extends HTMLObject{
    /**
     * @type {TableRow[]}
     */
    rows = [];
    constructor() {
        super('tbody')
    }
    addRow(item) {
        return this.rows.push(new TableRow(item));
    }
    html() {
        let _this = this;
        this.object.children().remove();
        this.rows.forEach(function (row) {
            _this.object.append(row.html());
        });
        return this.object;
    }
}