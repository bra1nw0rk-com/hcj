import Module from "../core/Module.js";

// @ts-nocheck
$(
	(function () {
		$.fn.module = function () {
			if ($(this).length > 0) {
				return $(this).each(function (e, i) {
					let title = $(this).attr("data-title");
					let name = $(this).attr("data-name");
					let src = $(this)[0].source;
					let moduleName = $(this).attr("data-module");
					Module.call(moduleName).then((content) => {
						$(this).replaceWith(content.get());
						content.init();
					});
				});
			}
		};
		$("body").on("mutation", function (e) {
			$(this)
				.find("[data-module]:not([data-plugged])")
				.each(function () {
					$(this).attr("data-plugged", "").module();
				});
		});
	})(jQuery)
);
