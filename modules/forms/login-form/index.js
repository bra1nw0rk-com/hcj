/**
 * @author Volodymyr Cherniyevskyy
 * @copyright bra1nw0rk.
 * {@link https://github.com/bra1nw0rk-com/hcj GitHub}.
 * {@link https://www.linkedin.com/in/volodymyr-cherniyevskyy-24962b22b LinkedIn}
 **/
import Box from "../../../js/lib/html/Box.js";

export default class LoginForm extends Box {
	constructor() {
		super(true);
		this.css = `/modules/forms/login-form/index.css`;
		this.title = "Login";
		this.name ="userLoginForm"
		this.content = $(html`
			<input type="text" id="username" name="username" placeholder="User" autocomplete="username" required />
			<input type="password" id="password" name="password" placeholder="Password" autocomplete="current-password" required />
			<button class="submit">OK</button>
		`);		

	}
	init() {
		super.init()
		let _this = this;

		$("body").off(`.${this.id}`)
			.on(`click.${this.id}`, `#${this.id} .submit`, function (e) {
				e.preventDefault();
				//storage.set("environment", $(`${_this.selector}  #environment`).val());
				_this.call("submit");
				return true;
		}).on(`keypress.${this.id}`, `#${this.id}`, function (e) {
			if(e.which === 13) {
				_this.call("submit");
			}
			return true;
		});
		this.on(`submit`,function(){
			let login = $(`#${_this.id} #username`).val()
			let pass = $(`#${_this.id} #password`).val()
			WS.user.login(login,pass,function(data){
				if(data){
					//WS.ui.closeModal(`${_this.selector}`, function () {});
					_this.close(function(){
						WS.user.testLogin();

					})
				}else{
					//WS.ui.clearForm(`${_this.selector}`);
					_this.clear()
					_this.object.effect("shake",{times:4},500)
					//WS.ui.effects.shake(`#${_this.id}`);
				}
			})

		});

	}
}

