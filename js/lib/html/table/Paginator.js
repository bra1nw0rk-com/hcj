/*
 * @author Volodymyr Cherniyevskyy
 * @copyright bra1nw0rk.
 * {@link https://github.com/bra1nw0rk-com/hcj GitHub}.
 * {@link https://www.linkedin.com/in/volodymyr-cherniyevskyy-24962b22b LinkedIn}
 */

import HTMLObject from "../HTMLObject";

export default class Paginator extends HTMLObject {
    #count = 0;
    #rowPerPage = 0;
    #pages = 0;
    #last = 0;
    #current = 1;
    #reffering = [];

    constructor() {
        super("span");
        let _this = this;
        this.object.attr("data-name","table-paginator")
        this.object.off(".paginator");
        this.object.on("click.paginator", "[data-page]", function (e) {
            e.stopPropagation();
            _this.object.find("[data-page]").removeClass("active");
            _this.#current = Number($(this).attr("data-page"));
            _this.object.find(`[data-name="prev"]`).attr("data-page", _this.#current > 1 ? _this.#current - 1 : 1);
            _this.object.find(`[data-name="next"]`).attr("data-page", _this.#current < _this.#pages ? _this.#current + 1 : _this.#pages);

            /*_this.object
                .find(`[data-page="${_this.#current}"]`)
                .not(`[data-name="first"]`)
                .not(`[data-name="prev"]`)
                .not(`[data-name="next"]`)
                .not(`[data-name="last"]`)
                .addClass("active");
                */
            _this.object.find(`[data-name="pager-input"]`).val(_this.#current);
            _this.call("changePage", { page: _this.#reffering[_this.#current] });
        });
        this.object.on("keyup.paginator", `[data-name="pager-input"]`, function (e) {
            if (!/[0-9]/.test(e.key)) {
                $(this).val($(this).val().replace(e.key, ""));
            }
            if ($(this).val() > _this.#pages) {
                $(this).val(_this.#pages);
            }
            if (e.keyCode === 13) {
                e.stopPropagation()
                _this.#current = Number($(this).val());
                _this.call("changePage", { page: _this.#reffering[_this.#current] });
            }
        });
    }

    set count(val) {
        this.#count = val;
        this.update();
    }
    update() {
        if (this.#count > 0) {
            this.#pages = Math.ceil(this.#count / this.#rowPerPage);

            this.#last = this.#pages;
            this.#reffering = [];
            for (let p = 1; p <= this.#pages; p++) {
                this.#reffering[p] = p * this.#rowPerPage - this.#rowPerPage + 1;
            }
            //console.log(this.#reffering);
        }
        this.object.children().remove();
        if (this.#pages > 1) {
            this.object.append(
                $(html`
					<span data-name="first" data-from="1" data-page="1" class="clickable"><i class="fa fa-fast-backward" aria-hidden="true"></i></span>
					<span data-name="prev" class="clickable marginLeft"><i class="fa fa-backward" aria-hidden="true"></i></span>
					<span data-name="pager">
						page
						<input data-name="pager-input" type="text" min="1" spep="1" max="1" value="1" /> of
						<span data-name="total">${this.#pages}</span>
					</span>
				`)
            );
            /*
            let i = 1;
            for (; i <= (this.#reffering.length > 5 ? 5 : this.#reffering.length); i++) {
                this.object.find(`[data-name="pager"]`).append($(`<span  data-page="${i}" class="clickable marginLeft">${i}</span>`));
            }
            if (this.#reffering.length > 10) {
                this.object.find(`[data-name="pager"]`).append($(`<span class="marginLeft"><i class="fa fa-ellipsis-h" aria-hidden="true"></i></span>`));
            }
            for (i = this.#reffering.length - 5; i < this.#reffering.length; i++) {
                this.object.find(`[data-name="pager"]`).append($(`<span  data-page="${i}"  class="clickable marginLeft">${i}</span>`));
            }
*/
            this.object.append(
                $(html`
					<span data-name="next" class="clickable marginLeft"><i class="fa fa-forward" aria-hidden="true"></i></span>
					<span data-name="last" data-page="${this.#reffering.length - 1}" class="clickable marginLeft"
						><i class="fa fa-fast-forward" aria-hidden="true"></i
					></span>
				`)
            );
            this.object.find(`[data-page]`).removeClass("active");
            this.object.find(`[data-page="1"]`).addClass("active");
            this.object.find(`[data-name="prev"]`).attr("data-page", 1);
            this.object.find(`[data-name="next"]`).attr("data-page", 2);
        }
    }
    set rowPerPage(val) {
        this.#rowPerPage = val;
        this.update();
    }
    get rowPerPage() {
        return this.#rowPerPage;
    }
    // get object() {
    //     return this.object;
    // }
    html() {
        return this.object;
    }
}