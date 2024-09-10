/**
 * @author Volodymyr Cherniyevskyy
 * @copyright bra1nw0rk.
 * {@link https://github.com/bra1nw0rk-com/hcj GitHub}.
 * {@link https://www.linkedin.com/in/volodymyr-cherniyevskyy-24962b22b LinkedIn}
 **/
export default class NOTIFICATION {
    init(){
        if ("Notification" in window) {
            if (Notification.permission === "default") {
                    Notification.requestPermission().then(r => {
                        WS.storage.setItem('notification.state',"true")
                    });
            }
        }
    }
    getSystemStatus(){
        if ("Notification" in window) {        
            return Notification.permission
        }
        return null
    }
    enable(){        
        WS.storage.setItem('notification.state',"true")        
    }

    isGranted(){
        if ("Notification" in window) {
            return Notification.permission === "granted"
        }
        return false
    }
    isAllowAll(){
        return WS.storage.getItem('notification.state')==="true"
    }

    disable(){
        WS.storage.setItem('notification.state',"false")
        this.disablePushBrowser()
        this.disablePushOS()
        this.disableEmail()
    }

    enableEmail(){
        if(this.isAllowAll()){
            WS.storage.setItem('notification.email',"true")
        }
    }

    isEnabledEmail(){        
        return WS.storage.getItem('notification.email')==="true"
    }

    disableEmail(){        
        WS.storage.setItem('notification.email',"false")
    }

    enablePushBrowser(){
        if(this.isAllowAll()){
            WS.storage.setItem('notification.browser',"true")
        }
    }

    isEnabledPushBrowser(){
        return WS.storage.getItem('notification.browser')==="true"
    }

    disablePushBrowser(){
        console.log(storage.getItem('notification.browser'))
        WS.storage.setItem('notification.browser',"false")
    }

    enablePushOS(){
        console.log(this.getSystemStatus())
        if(this.getSystemStatus() === 'denied'){
            WS.ui.modal('You have denied notifications in browser settings. Please allow first.',"error")
        }else{
            if ("Notification" in window) {
                if (Notification.permission === "default") {
                        Notification.requestPermission().then(r => {
                            WS.storage.setItem('notification.state',"true")
                            WS.storage.setItem('notification.os',"true")
                            this.sendOS('Notification settings','Notifications now is ON')
                        });
                }else{
                    WS.storage.setItem('notification.os',"true")
                    this.sendOS('Notification settings','Notifications now is ON')
                }
            }           
        }
    }

    disablePushOS(){
        WS.storage.setItem('notification.os',"false")
    }
    isEnabledPushOS(){
        return WS.storage.getItem('notification.os')==="true"
    }

    get(){
        return Boolean(WS.storage.getItem('notification.state'))        
    }

    sendOS(title, text){
        if(this.isGranted() && this.get() && this.isEnabledPushOS()){
            const img = "/img/maskable-icon.png";
            const notification = new Notification(title, { body: text, icon: img });
        }
    }
    sendBrowser(title, text){
        if(this.isGranted() && this.get() && this.isEnabledPushBrowser()){
            const img = "/img/maskable-icon.png";
            //const notification = new Notification(title, { body: text, icon: img });
        }
    }
    sendEmail(title, text){
        if(this.isGranted() && this.get() && this.isEnabledEmail()){
            const img = "/img/maskable-icon.png";
            //const notification = new Notification(title, { body: text, icon: img });
        }
    }
}