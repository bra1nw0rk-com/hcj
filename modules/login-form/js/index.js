$(function () {
	$("body").on("click", "#userLoginForm .submit", function (e) {
		e.preventDefault();
		WS.user.login($(this).parent().find('[name="username"]').val(), $(this).parent().find('[name="password"]').val());
		return true;
	});
});
