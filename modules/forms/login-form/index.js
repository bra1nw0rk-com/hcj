import Form from "../../../js/lib/html/Form.js";

export default class LoginForm extends Form {
	constructor() {
		super();

		this.css = `/modules/forms/login-form/index.css`;
		this.title = "Login";
		this.classes = "modal fadeIn";
		this.template = $(html`
			<input type="text" id="username" name="username" placeholder="User" autocomplete="username" required />
			<input type="password" id="password" name="password" placeholder="Password" autocomplete="current-password" required />
			<button class="submit">OK</button>
		`);

		$("body").html("").append(this.get());


	}
	init() {
		let _this = this;
		$("body").on("click", `${this.selector} .submit`, function (e) {
			e.preventDefault();
			_this.storage.set("environment", $(`${_this.selector}  #environment`).val());
			_this.call("submit");
			return true;
		});
	}
}

