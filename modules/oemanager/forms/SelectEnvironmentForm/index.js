import Form from "../../../../js/lib/html/Form.js";

export default class SelectEnvironmentForm extends Form {
	constructor() {
		super();
		let _this = this;
		this.title = "Environment";
		this.animated = true;
		this.name = "selectEnvironmentForm";
		this.classes = "modal fadeIn";
		this.css = `/modules/oemanager/css/select-environment-form.scss`;
		this.template = $(html`
			<select id="environment" name="environment" required>
				<option value="prod" disabled>PROD</option>
				<option value="model" disabled>MODEL</option>
				<option value="test">TEST</option>
			</select>
			<button class="submit">OK</button>
		`);
		$("body").on("click", `${this.selector} .submit`, function (e) {
			e.preventDefault();
			storage.set("oemanager.environment", $(`${_this.selector}  #environment`).val());
			_this.call("submit");
			return true;
		});
	}
}
