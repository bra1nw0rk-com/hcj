/**
 * @author Volodymyr Cherniyevskyy
 * @copyright bra1nw0rk.
 * {@link https://github.com/bra1nw0rk-com/hcj GitHub}.
 * {@link https://www.linkedin.com/in/volodymyr-cherniyevskyy-24962b22b LinkedIn}
 **/

import HTMLObject from "../HTMLObject.js";

export default class TableCell extends HTMLObject{
    #isHeader = false;
    constructor(name, value) {
        super('td');
        this.object.attr("data-name", name);
        this.name = name;
        this.template = $(`<span data-name="data"></span>`)
        this.object.find(`[data-name="data"]`).html(value);
    }
    set(value) {
        this.object.find(`[data-name="data"]`).html(value);
    }
    html() {
        return this.object;
    }

    set isHeader(value) {
        if (value === true || value === false) {
            this.#isHeader = value;
            if (value) {
                if (this.object.find(`[data-name="sort"]`).length === 0) {
                    this.object.append(html`<span data-name="sort"><i class="fa fa-sort" aria-hidden="true"></i></span>`);
                }
                if (this.object.find(`[data-name="filter"]`).length === 0) {
                    this.object.append(html`<span data-name="filter"><i class="fa fa-filter" aria-hidden="true"></i></span>`);
                }
            }
        }
    }
}