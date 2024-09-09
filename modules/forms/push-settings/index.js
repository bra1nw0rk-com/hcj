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
            <label><input type="checkbox" name="all_push"> Allow</label>
            <div class="sub-block">
                <label><input type="checkbox" name="browser_push"> in browser</label>
                <label><input type="checkbox" name="os_push"> in OS</label>
            </div>  
			
		`;
        this.button.minimize();
        this.button.close();
        this.icon.settings();

    }

    init(){
        super.init()
        if(WS.notification.get()){
            this.object.find(`[name="all_push"]`).prop('checked', true);
            this.object.find(`[name="browser_push"]`).prop("disabled", false);
            this.object.find(`[name="os_push"]`).prop("disabled", false);
        }else{
            this.object.find(`[name="browser_push"]`).prop("disabled", true);
            this.object.find(`[name="os_push"]`).prop("disabled", true);
        }
        $("body")
            .off(`.${this.id}`)
            .on(`click.${this.id}`,`#${this.id}`,function(){
                $(`#content`).modal({module:"about"});
             })

    }


}
