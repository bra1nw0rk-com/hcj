/**
 * @author Volodymyr Cherniyevskyy
 * @copyright bra1nw0rk.
 * {@link https://github.com/bra1nw0rk-com/hcj GitHub}.
 * {@link https://www.linkedin.com/in/volodymyr-cherniyevskyy-24962b22b LinkedIn}
 **/
import CustomEvents from "../core/CustomEvents.js";
import WEBFS from "../core/WEBFS.js";

class TableCell {
	name = "";
	#isHeader = false;
	object = $(html`<td><span data-name="data"></span></td>`);
	constructor(name, value) {
		this.object.attr("data-name", name);
		this.name = name;
		this.object.find(`[data-name="data"]`).html(value);
	}
	set(value) {
		this.object.find(`[data-name="data"]`).html(value);
	}
	html() {
		return this.object;
	}

	set isHeader(value) {
		if (value == true || value == false) {
			this.#isHeader = value;
			if (value) {
				if (this.object.find(`[data-name="sort"]`).length == 0) {
					this.object.append(html`<span data-name="sort"><i class="fa fa-sort" aria-hidden="true"></i></span>`);
				}
				if (this.object.find(`[data-name="filter"]`).length == 0) {
					this.object.append(html`<span data-name="filter"><i class="fa fa-filter" aria-hidden="true"></i></span>`);
				}
			}
		}
	}
}

class TableRow {
	/**
	 * @type {TableCell[]}
	 */
	cells = [];
	object = $("<tr></tr>");

	constructor(value) {
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
class TableHead {
	row = new TableRow();
	object = $("<thead></thead>");
	constructor() {}
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
class TableBody {
	/**
	 * @type {TableRow[]}
	 */
	rows = [];
	object = $("<tbody></tbody>");
	constructor() {}
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
class Paginator extends CustomEvents {
	#count = 0;
	#rowPerPage = 0;
	#pages = 0;
	#object = $(html`<span data-name="table-paginator"></span>`);
	#last = 0;
	#current = 1;
	#reffering = [];

	constructor() {
		super();
		let _this = this;
		this.#object.off(".paginator");
		this.#object.on("click.paginator", "[data-page]", function (e) {
			e.stopPropagation();
			_this.#object.find("[data-page]").removeClass("active");
			_this.#current = Number($(this).attr("data-page"));
			_this.#object.find(`[data-name="prev"]`).attr("data-page", _this.#current > 1 ? _this.#current - 1 : 1);
			_this.#object.find(`[data-name="next"]`).attr("data-page", _this.#current < _this.#pages ? _this.#current + 1 : _this.#pages);

			/*_this.#object
				.find(`[data-page="${_this.#current}"]`)
				.not(`[data-name="first"]`)
				.not(`[data-name="prev"]`)
				.not(`[data-name="next"]`)
				.not(`[data-name="last"]`)
				.addClass("active");
				*/
			_this.#object.find(`[data-name="pager-input"]`).val(_this.#current);
			_this.call("changePage", { page: _this.#reffering[_this.#current] });
		});
		this.#object.on("keyup.paginator", `[data-name="pager-input"]`, function (e) {
			if (!/[0-9]/.test(e.key)) {
				$(this).val($(this).val().replace(e.key, ""));
			}
			if ($(this).val() > _this.#pages) {
				$(this).val(_this.#pages);
			}
			if (e.keyCode == 13) {
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
		this.#object.children().remove();
		if (this.#pages > 1) {
			this.#object.append(
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
				this.#object.find(`[data-name="pager"]`).append($(`<span  data-page="${i}" class="clickable marginLeft">${i}</span>`));
			}
			if (this.#reffering.length > 10) {
				this.#object.find(`[data-name="pager"]`).append($(`<span class="marginLeft"><i class="fa fa-ellipsis-h" aria-hidden="true"></i></span>`));
			}
			for (i = this.#reffering.length - 5; i < this.#reffering.length; i++) {
				this.#object.find(`[data-name="pager"]`).append($(`<span  data-page="${i}"  class="clickable marginLeft">${i}</span>`));
			}
*/
			this.#object.append(
				$(html`
					<span data-name="next" class="clickable marginLeft"><i class="fa fa-forward" aria-hidden="true"></i></span>
					<span data-name="last" data-page="${this.#reffering.length - 1}" class="clickable marginLeft"
						><i class="fa fa-fast-forward" aria-hidden="true"></i
					></span>
				`)
			);
			this.#object.find(`[data-page]`).removeClass("active");
			this.#object.find(`[data-page="1"]`).addClass("active");
			this.#object.find(`[data-name="prev"]`).attr("data-page", 1);
			this.#object.find(`[data-name="next"]`).attr("data-page", 2);
		}
	}
	set rowPerPage(val) {
		this.#rowPerPage = val;
		this.update();
	}
	get rowPerPage() {
		return this.#rowPerPage;
	}
	get object() {
		return this.#object;
	}
	html() {
		return this.#object;
	}
}
class Table {
	head = new TableHead();
	#url = "";
	body = new TableBody();
	paginator = new Paginator();
	count = 0;
	sessionId = "XR0G4obkJZ+0FG5q+CUpgA+=";
	object = $(`
	<div class="table-block">
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
	</div>
	`);
	loading = $(`<i class="fa fa-spinner fa-pulse fa-fw big centered"></i>`);

	constructor(id, url) {
		let _this = this;
		this.#url = url;
		this.paginator.rowPerPage = 30;
		this.object.attr("data-id", `table-block-${id}`);
		this.object.find(`[data-name="paging"]`).append(this.paginator.html());
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
		new Promise((resolve, reject) => {
			for (let key in item) {
				this.head.add(key, key);
			}
			this.body.addRow(item);
			this.object.find("table").children().remove();
			this.object.find("table").append(this.head.html());
			this.object.find("table").append(this.body.html());
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
			this.#url,
			{
				request: [
					{
						cmd: "getRecords",
						SessionId: this.sessionId,
						rowId: start,
						count: this.paginator.rowPerPage,
						domain: "elt",
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
			this.#url,
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
}

$(function () {
	$.fn.extend({
		table: function (options) {
			let defaults = {
				url: "",
			};

			options = $.extend(defaults, options);
			if ($(this).length > 0) {
				return $(this).each(function (e, i) {
					this.obj = new Table("domains", options.url);
					let _this = this;
					$(this).append(this.obj.object);
					this.refresh = () => {
						this.obj.load(1);
					};
					this.update = () => {
						this.obj.start();
						this.refresh();
						this.obj.loadCount();
					};
					/*
					this.paginator = (json) => {
						if (json.hasOwnProperty("data")) {
							this.obj.setCount(json.data);
						}
					};
*/
					this.update();

					return this;
				});
			}
		},
	});
});
