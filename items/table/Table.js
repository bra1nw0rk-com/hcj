/*
 * @author Volodymyr Cherniyevskyy
 * @copyright bra1nw0rk.
 * {@link https://github.com/bra1nw0rk-com/hcj GitHub}.
 * {@link https://www.linkedin.com/in/volodymyr-cherniyevskyy-24962b22b LinkedIn}
 */

import WEBFS from "../../js/lib/core/WEBFS.js";
import HTMLObject from "../../js/lib/html/HTMLObject.js";
import TableHead from "./TableHead.js";
import TableBody from "./TableBody.js";
import Paginator from "./Paginator.js";

export default class Table extends HTMLObject{
    options={}
    defaults = {
        url: "",
        cmd:"",
    };
    head = new TableHead();
    body = new TableBody();
    paginator = new Paginator();
    count = 0;

    loading = $(`<i class="fa fa-spinner fa-pulse fa-fw big centered"></i>`);

    constructor(options) {
        super('div')
        this.options = $.extend(this.defaults, options);
        this.name = 'table-block'
        this.css = "/items/table/index.css";
        this.paginator.rowPerPage = 30;
        //this.object.attr("data-id", `table-block-${id}`);
        this.object.find(`[data-name="paging"]`).append(this.paginator.html());
        this.template = $(`            
            <div data-name="table-top">
                <span data-name="title">Count:</span>
                <span data-name="count">-</span>
                <span data-name="rowsPerPage">
                    <select>
                        <option value="10">10</option>
                        <option value="20">20</option>
                        <option value="30" selected>30</option>
                    </select>
                </span>
                <span data-name="refresh-icon"><i class="fa fa-refresh" aria-hidden="true"></i></span>
            </div>
            <table></table>
            <div data-name="paging"></div>            
        `);
    }

    init(){
        super.init()
        let _this = this;

        this.paginator.on("changePage", function (params) {
            _this.load(params.page);
        });
        this.object.off(".table");
        this.object.on("click.table", '[data-name="refresh-icon"]', function (e) {
            e.stopPropagation();
            _this.refresh();
        });

        this.object.on("change.table", '[data-name="rowsPerPage"] select', function (e) {
            e.stopPropagation();
            _this.paginator.rowPerPage = $(this).val();
            _this.refresh();
            _this.load(1);
        });
        this.update()
    }
    setCount(data) {
        if (typeof data[0] !== "undefined") {
            if (data[0].hasOwnProperty("count")) {
                this.count = data[0].count;
                this.object.find("[data-name='count']").html(this.count);
                this.paginator.count = this.count;
            }
        }
    }
    addRow(item) {
        let _this = this;
        new Promise((resolve, reject) => {
            for (let key in item) {
                _this.head.add(key, key);
            }
            _this.body.addRow(item);
            _this.object.find("table").children().remove();
            _this.object.find("table").append(_this.head.html());
            _this.object.find("table").append(_this.body.html());
        });
    }
    finish() {
        this.object.find(this.loading).remove();
    }
    start() {
        this.object.append(this.loading);
        this.object.find("[data-name='count']").html(`<i class="fa fa-spinner fa-pulse fa-fw"></i>`);
    }
    load(start) {
        let _this = this;
        this.refresh();
        WEBFS.api(
            this.options.url,
            {
                request: [
                    {
                        cmd: "getRecords",
                        SessionId: this.sessionId,
                        rowId: start,
                        count: this.paginator.rowPerPage
                    },
                ],
            },
            function (data) {
                //console.log(data);
                if (typeof data !== "undefined") {
                    _this.data(data);
                }
            }
        );
    }
    loadCount() {
        let _this = this;
        WEBFS.api(
            this.options.url,
            {
                request: [
                    {
                        cmd: "getCount",
                        SessionId: this.sessionId,
                        domain: "elt",
                    },
                ],
            },
            function (json) {
                if (typeof json !== "undefined") {
                    if (json.hasOwnProperty("data")) {
                        _this.setCount(json.data);
                    }
                }
            }
        );
    }
    data(json) {
        let _this = this;
        this.clear();
        if (json.hasOwnProperty("data")) {
            let data = json.data;
            data.forEach(function (item) {
                _this.addRow(item);
            });
        }
        this.finish();
    }
    refresh() {
        this.head = new TableHead();
        this.body = new TableBody();
        this.object.find("table").children().remove();
        this.object.append(this.loading);
    }
    clear() {
        this.head = new TableHead();
        this.body = new TableBody();
        this.object.find("table").children().remove();
    }
/*
    refresh () {
        this.load(1);
    }

 */
    update (){
        this.start();
        this.refresh();
        this.loadCount();
    };
}