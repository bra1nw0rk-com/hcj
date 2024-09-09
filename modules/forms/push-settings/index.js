import Box from "../../../js/lib/html/Box.js";


/**
 * @author Volodymyr Cherniyevskyy
 * @copyright bra1nw0rk.
 * {@link https://github.com/bra1nw0rk-com/hcj GitHub}.
 * {@link https://www.linkedin.com/in/volodymyr-cherniyevskyy-24962b22b LinkedIn}
 **/
export default class PushSettings extends Box {
    constructor() {
        super(true);
        let _this = this;
        this.css = "/modules/forms/push-settings/index.css";
        this.title = "Push settings";
        this.classes = "modal hidden";
        this.draggable = true;
        this.resizable = true;
        this.name ="pushSettings"
        this.content = `
			<label><input type="checkbox" name="browser_push"> browser</label>
			<label><input type="checkbox" name="os_push"> OS</label>label>
		`;
        this.button.minimize();
        this.button.close();
        this.icon.settings();

    }


}
