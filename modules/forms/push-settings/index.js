import Box from "../../../js/lib/html/Box.js";


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
					
		`;
        this.button.minimize();
        this.button.close();
        this.icon.settings();

    }


}
