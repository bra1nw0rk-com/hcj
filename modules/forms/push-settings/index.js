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
        this.title = "Notification settings";
        this.classes = "modal hidden";
        this.draggable = true;
        this.resizable = true;
        this.name ="notificationSettings"
        this.content = $(`
            <label><input type="checkbox" name="all_push"> Allow</label>
            <div class="sub-block">
                <label><input type="checkbox" name="browser_push"> in browser</label>
                <label><input type="checkbox" name="os_push"> in OS</label>
                <label><input type="checkbox" name="email"> by Email</label>
            </div>  			
		`);
        this.button.minimize();
        this.button.close();
        this.icon.settings();

    }

    init(){
        super.init()
        let _this = this
        console.log(WS.notification.get())
        if(WS.notification.get()){
            this.object.find(`[name="all_push"]`).prop('checked', true);            
            this.object.find(`[name="browser_push"]`).prop("checked", WS.notification.isEnabledPushBrowser());            
            this.object.find(`[name="os_push"]`).prop("checked",  WS.notification.isEnabledPushBrowser());            
            this.object.find(`[name="email"]`).prop("checked",  WS.notification.isEnabledEmail());
        }else{
            this.object.find(`[name="all_push"]`).prop('checked', false);
            this.object.find(`[name="browser_push"]`).prop("disabled", true);
            this.object.find(`[name="os_push"]`).prop("disabled", true);
            this.object.find(`[name="email"]`).prop("disabled", true);
        }

        
           
        $("body")
            .off(`.${this.id}`)
            .on(`change.${this.id} click.${this.id}`,`#${this.id} [name="all_push"]`,function(){                           
                console.log($(this).prop("checked"))
                if($(this).prop("checked")){                    
                    WS.notification.enable()
                    _this.object.find(`[name="browser_push"]`).prop("disabled",false);
                    _this.object.find(`[name="os_push"]`).prop("disabled",false);
                    _this.object.find(`[name="email"]`).prop("disabled",false);
                }else{
                    WS.notification.disable()
                    _this.object.find(`[name="browser_push"]`).prop("disabled", true);
                    _this.object.find(`[name="os_push"]`).prop("disabled", true);
                    _this.object.find(`[name="email"]`).prop("disabled", true);
                }
                console.log(WS.notification.get())
             })
             
            .on(`change.${this.id} click.${this.id}`,`[name="browser_push"]`,function(e){
                if(WS.notification.get()){
                    if($(this).is(":checked")){
                        WS.notification.enablePushBrowser()                       
                    }else{
                        WS.notification.disablePushBrowser()
                    }
                }
            })
            .on(`change.${this.id} click.${this.id}`,`[name="os_push"]`,function(e){
                if(WS.notification.get()){
                    if($(this).is(":checked")){
                        if(!WS.notification.enablePushOS()){
                            $(this).prop('checked', false);
                        }
                    }else{
                        WS.notification.disablePushOS()
                    }
                }
            })
            .on(`change.${this.id} click.${this.id}`,`[name="email"]`,function(e){
                if(WS.notification.get()){
                    if($(this).is(":checked")){
                        WS.notification.enableEmail()                       
                    }else{
                        WS.notification.disableEmail()
                    }
                }
            })
            
    }




}
