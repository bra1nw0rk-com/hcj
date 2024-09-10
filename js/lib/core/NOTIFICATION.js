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
                        storage.setItem('notification.state',"true")
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
        storage.setItem('notification.state',"true")        
    }

    isGranted(){
        if ("Notification" in window) {
            return Notification.permission === "granted"
        }
        return false
    }
    isAllowAll(){
        return storage.getItem('notification.state')==="true"
    }

    disable(){
        storage.setItem('notification.state',"false")
        this.disablePushBrowser()
        this.disablePushOS()
        this.disableEmail()
    }

    enableEmail(){
        if(this.isAllowAll()){
            storage.setItem('notification.email',"true")
        }
    }

    isEnabledEmail(){        
        return storage.getItem('notification.email')==="true"
    }

    disableEmail(){        
        storage.setItem('notification.email',"false")
    }

    enablePushBrowser(){
        if(this.isAllowAll()){
            storage.setItem('notification.browser',"true")
        }
    }

    isEnabledPushBrowser(){
        return storage.getItem('notification.browser')==="true"
    }

    disablePushBrowser(){
        console.log(storage.getItem('notification.browser'))
        storage.setItem('notification.browser',"false")
    }

    enablePushOS(){
        console.log(this.getSystemStatus())
        if(this.getSystemStatus() === 'denied'){
            WS.ui.modal('You have denied notifications in browser settings. Please allow first.',"error")
        }else{
            if ("Notification" in window) {
                if (Notification.permission === "default") {
                        Notification.requestPermission().then(r => {
                            storage.setItem('notification.state',"true")
                            storage.setItem('notification.os',"true")
                            this.sendOS('Notification settings','Notifications now is ON')
                        });
                }else{
                    storage.setItem('notification.os',"true")
                    this.sendOS('Notification settings','Notifications now is ON')
                }
            }           
        }
    }

    disablePushOS(){
        storage.setItem('notification.os',"false")
    }
    isEnabledPushOS(){
        return storage.getItem('notification.os')==="true"
    }

    get(){
        return Boolean(storage.getItem('notification.state'))        
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