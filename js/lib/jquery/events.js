$(function () {
	window.mutationObserver = new MutationObserver((mutationList) =>
		mutationList
			.filter((m) => m.type === "childList")
			.forEach((m) => {
				m.addedNodes.forEach(function (e) {
					$(e).trigger("mutation");
				});
			})
	);
	$(document).each(function () {
		window.mutationObserver.observe(this, { childList: true, subtree: true });
	});
});
