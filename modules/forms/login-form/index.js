import Form from "../../../js/lib/html/Form.js";

export default class LoginForm extends Form {
	constructor() {
		super();
		this.css = `/modules/forms/login-form/index.css`;
		this.title = "Login";
		this.classes = "modal fadeIn";
		this.name ="userLoginForm"
		this.template = $(html`
			<input type="text" id="username" name="username" placeholder="User" autocomplete="username" required />
			<input type="password" id="password" name="password" placeholder="Password" autocomplete="current-password" required />
			<button class="submit">OK</button>
		`);

		$("body").html("").append(this.get());
		this.init()
	}
	init() {
		let _this = this;
		console.log(`${this.selector} .submit`)
		$("body").on("click", `${this.selector} .submit`, function (e) {
			e.preventDefault();
			storage.set("environment", $(`${_this.selector}  #environment`).val());
			_this.call("submit");
			return true;
		});
		this.on("submit",function(){
			let login = $(`${_this.selector}  #username`).val()
			let pass = $(`${_this.selector}  #password`).val()
			if(WS.user.login(login,pass)){
				WS.ui.closeModal(`${_this.selector}`, function () {
					WS.user.update("dslfafhkldhjakelrhalweh54sdaf54d");
					WS.user.testLogin();
				});
			}else{
				WS.ui.clearForm(`${_this.selector}`);
				WS.ui.effects.shake(`${_this.selector}`);
			}
		})
	}
}

