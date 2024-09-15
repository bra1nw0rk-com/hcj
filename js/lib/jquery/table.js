/**
 * @author Volodymyr Cherniyevskyy
 * @copyright bra1nw0rk.
 * {@link https://github.com/bra1nw0rk-com/hcj GitHub}.
 * {@link https://www.linkedin.com/in/volodymyr-cherniyevskyy-24962b22b LinkedIn}
 **/
import Table from "../html/table/Table.js";

$(function () {
	$.fn.extend({
		table: function (options) {
			let defaults = {
				url: "",
				cmd:"",
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
