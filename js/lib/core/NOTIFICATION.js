/**
 * @author Volodymyr Cherniyevskyy
 * @copyright bra1nw0rk.
 * {@link https://github.com/bra1nw0rk-com/hcj GitHub}.
 * {@link https://www.linkedin.com/in/volodymyr-cherniyevskyy-24962b22b LinkedIn}
 **/
export default class NOTIFICATION {
    init(){
        // if ("Notification" in window) {
        //     if (Notification.permission === "default") {
        //             Notification.requestPermission().then(r => {
        //                 localStorage.setItem('notification.state',"true")
        //             });
        //     }
        // }
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
        if(localStorage.getItem('notification.state') !== null) {
            return localStorage.getItem('notification.state').toLowerCase() === "true"
        }
        return false;
    }

    disable(){
        localStorage.setItem('notification.state',"false")
        this.disablePushBrowser()
        this.disablePushOS()
        this.disableEmail()
    }

    enableEmail(){
        if(this.isAllowAll()){
            localStorage.setItem('notification.email',"true")
        }
    }

    isEnabledEmail(){
        if(localStorage.getItem('notification.email') !== null){
            return localStorage.getItem('notification.email').toLowerCase() === "true"
        }
        return false;
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
        if(localStorage.getItem('notification.browser') !== null) {
            return localStorage.getItem('notification.browser').toLowerCase() === "true"
        }
        return false;
    }

    disablePushBrowser(){
        localStorage.setItem('notification.browser',"false")
    }

    enablePushOS(){
        console.log(this.getSystemStatus())
        if(this.getSystemStatus() === 'denied'){
            WS.ui.modal.create('You have denied notifications in browser settings. Please allow first.',"error")
            localStorage.setItem('notification.os',"false")
            return false
        }else{
            if ("Notification" in window) {
                if (Notification.permission === "default") {
                        Notification.requestPermission().then(r => {
                            if(this.isGranted()){                            
                                localStorage.setItem('notification.os',"true")
                                this.sendOS('Notification settings','Notifications now is ON')
                                return true
                            }
                        });
                }else{
                    localStorage.setItem('notification.os',"true")
                    this.sendOS('Notification settings','Notifications now is ON')
                    return true
                }
            }           
        }
        return false
    }

    disablePushOS(){
        localStorage.setItem('notification.os',"false")
    }
    isEnabledPushOS(){
        if(localStorage.getItem('notification.os') !== null) {
            return localStorage.getItem('notification.os').toLowerCase() === "true"
        }
        return false
    }

    get(){
        if(localStorage.getItem('notification.state') !== null) {
            return localStorage.getItem('notification.state').toLowerCase() === "true"
        }
        return false;
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