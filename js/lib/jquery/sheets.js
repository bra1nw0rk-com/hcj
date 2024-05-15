class Sheet {
	id = 0;
	title = "";
	object = $(html`
		<div class="sheet" data-id="">
			<div class="close-btn-block">
				<i class="fa fa-close"></i>
			</div>
			<span class="title"></span>
		</div>
	`);
	constructor(id, title) {
		this.id = id;
		this.title = title;
		this.object.attr("data-id", id);
		this.object.find(".title").html(title);
	}
	html() {
		return this.object;
	}
}

$(function () {
	$.fn.sheets = function () {
		if ($(this).length > 0) {
			return $(this).each(function (e, i) {
				this.oid = 0;
				this.obj = [];
				let element = this;
				this.add = function (title, content) {
					let sheet = {
						id: this.oid,
						title: title,
						content: $(content),
					};
					this.obj.push(sheet);
					this.oid++;
					this.init();
				};
				this.getContent = function (id) {
					let result = this.obj.find((o, i) => {
						if (typeof o !== "undefined") {
							if (o.id == id) {
								//console.log(o.content.find("table"));
								return o;
							}
						}
					});
					if (typeof result !== "undefined") {
						return result.content;
					}
					return "null";
				};

				this.remove = function (id) {
					this.obj.find((o, i) => {
						if (typeof o != "undefined") {
							if (o.id == id) {
								delete this.obj[i];
								//console.log(`Sheet:${i} deleted.`);
							}
						}
					});
					this.init();
				};

				this.prepare = function () {
					let result = $(this);
					result.children().remove();

					let sheets = $(`<div class="sheets"></div>`);
					let content = $(`<div class="content"></div>`);
					this.obj.forEach(function (item) {
						let sheet = new Sheet(item.id, item.title);
						sheets.append(sheet.html());
					});
					result.append(sheets);
					result.append(content);
				};
				this.clear = () => {
					$(this).find("> .content").children().remove();
				};

				this.init = function () {
					this.prepare();
					let $this = $(this);
					$this.off(".events");
					$this.children().off(".events");
					$this.on("click.events", ".sheets > .sheet:not(.active)", function (e) {
						e.stopPropagation();

						$this.find(".sheets > .sheet.active").each(function () {
							$(this).removeClass("active");
						});
						$(this).addClass("active");

						element.clear();
						let dataId = $(this).attr("data-id");
						let elementContent = element.getContent(dataId);
						$this.find("> .content").append(elementContent);
					});

					$this.on("click.events", ".sheets > .sheet > .close-btn-block", function (e) {
						e.stopPropagation();
						let id = $(this).parent(".sheet").attr("data-id");

						let nextActive = $(this).parent().next().length > 0 ? $(this).parent().next() : $(this).parent().prev();
						if ($(this).parent(".sheet.active").length > 0) {
							nextActive.trigger("click");
						}
						console.log(id);
						element.remove(id);
						$(this).parent(".sheet").remove();
					});
					$this.find(".sheet").last().trigger("click");

					//$(this).replaceWith(content);
				};

				this.init();
				return this;
			});
		}
	};
});
