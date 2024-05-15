import SCSS from "../../../js/lib/core/SCSS.js";
import Form from "../../../js/lib/html/Form.js";

export default class LoginForm extends Form {
	constructor() {
		super();
		let _this = this;
		this.title = "Login";
		this.classes = "modal fadeIn";
		this.template = $(html`
			<input type="text" id="username" name="username" placeholder="User" autocomplete="username" required />
			<input type="password" id="password" name="password" placeholder="Password" autocomplete="current-password" required />
			<button class="submit">OK</button>
		`);
		SCSS.load(`/modules/main/css/login-form.scss`);
		$("body").on("click", `${this.selector} .submit`, function (e) {
			e.preventDefault();
			_this.storage.set("environment", $(`${_this.selector}  #environment`).val());
			_this.call("submit");
			return true;
		});
	}
}
