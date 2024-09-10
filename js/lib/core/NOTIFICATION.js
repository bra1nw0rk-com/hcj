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
                        localStorage.setItem('notification.state',"true")
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
        localStorage.setItem('notification.state',"true")        
    }

    isGranted(){
        if ("Notification" in window) {
            return Notification.permission === "granted"
        }
        return false
    }
    isAllowAll(){
        return localStorage.getItem('notification.state')==="true"
    }

    disable(){
        localStorage.setItem('notification.state',"false")
        this.disablePushBrowser()
        this.disablePushOS()
        this.disableEmail()
    }

    enableEmail(){
        if(this.isGranted() && this.isAllowAll()){
            localStorage.setItem('notification.email',"true")
        }
    }

    isEnabledEmail(){
        return localStorage.getItem('notification.email')==="true"
    }

    disableEmail(){
        localStorage.setItem('notification.email',"false")
    }

    enablePushBrowser(){
        if(this.isAllowAll()){
            localStorage.setItem('notification.browser',"true")
        }
    }

    isEnabledPushBrowser(){
        return localStorage.getItem('notification.browser')==="true"
    }

    disablePushBrowser(){
        console.log(localStorage.getItem('notification.browser'))
        localStorage.setItem('notification.browser',"false")
    }

    enablePushOS(){
        console.log(this.getSystemStatus())
        if(this.getSystemStatus() === 'denied'){
            WS.ui.modal('You have denied notifications in browser settings. Please allow first.',"error")
        }else{
            if ("Notification" in window) {
                if (Notification.permission === "default") {
                        Notification.requestPermission().then(r => {
                            localStorage.setItem('notification.state',"true")
                            localStorage.setItem('notification.os',"true")
                            this.sendOS('Notification settings','Notifications now is ON')
                        });
                }else{
                    localStorage.setItem('notification.os',"true")
                    this.sendOS('Notification settings','Notifications now is ON')
                }
            }           
        }
    }

    disablePushOS(){
        localStorage.setItem('notification.os',"false")
    }
    isEnabledPushOS(){
        return localStorage.getItem('notification.os')==="true"
    }

    get(){
        return Boolean(localStorage.getItem('notification.state'))        
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