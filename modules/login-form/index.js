import HTMLObject from "../../../js/lib/html/HTMLObject.js";

export default class LoginForm extends HTMLObject {
	constructor() {
		super("login-form");
		let _this = this;
		this.css = "/modules/login-form/index.css";
		this.id = "login-form";
		this.classes = "login-form";
		this.template = $(html`
			<div id="userLoginForm" data-animated class="modal fadeIn">
				<h2>Login</h2>
				<form method="post" action="#">
					<input type="text" id="username" name="username" placeholder="USER" autocomplete="username" required>
					<input type="password" id="password" name="password" placeholder="Password" autocomplete="current-password"
						   required>
					<button class="submit">OK</button>
				</form>
			</div>                
		`);
		this.init();

		$("body").html("").append(this.get());
	}
	init() {
		$("body").on("click", "#userLoginForm .submit", function (e) {
			e.preventDefault();
			WS.user.login($(this).parent().find('[name="username"]').val(), $(this).parent().find('[name="password"]').val());
			return true;
		});
	}


}

