/*
 * @author Volodymyr Cherniyevskyy
 * @copyright bra1nw0rk.
 * {@link https://github.com/bra1nw0rk-com/hcj GitHub}.
 * {@link https://www.linkedin.com/in/volodymyr-cherniyevskyy-24962b22b LinkedIn}
 */

import HTMLObject from "../../js/lib/html/HTMLObject.js";
import TableCell from "./TableCell.js"

export default class TableRow extends HTMLObject{
    /**
     * @type {TableCell[]}
     */
    cells = [];
    constructor(value) {
        super("tr");
        if (typeof value !== "undefined") {
            if (value instanceof Object) {
                for (let name in value) {
                    this.add(name, value[name]);
                }
            }
        }
    }
    add(name, value) {
        if (!this.nameExists(name)) {
            this.cells.push(new TableCell(name, value));
        }
    }

    nameExists(name) {
        if (
            this.cells.find((o, i) => {
                if (typeof o != "undefined") {
                    if (o.name === name) {
                        return true;
                    }
                }
            })
        ) {
            return true;
        }
        return false;
    }
    html() {
        let _this = this;
        this.object.children().remove();
        this.cells.forEach(function (cell) {
            _this.object.append(cell.html());
        });
        return this.object;
    }
}