/**
 * @author Volodymyr Cherniyevskyy
 * @copyright bra1nw0rk.
 * {@link https://github.com/bra1nw0rk-com/hcj GitHub}.
 * {@link https://www.linkedin.com/in/volodymyr-cherniyevskyy-24962b22b LinkedIn}
 **/
export default class NOTIFICATION {
    init(){
        if(localStorage.getItem('notification.state')===null){
            if (("Notification" in window)) {
                if (Notification.permission === "default") {
                    Notification.requestPermission().then(r => {
                        localStorage.setItem('notification.state',"true")
                    });
                }

            }
        }
    }
    enable(){
        if(this.isGranted()){
            localStorage.setItem('notification.state',"true")
        }
    }

    isGranted(){
        return Notification.permission === "granted"
    }
    isAllowAll(){
        return localStorage.getItem('notification.state')==="true"
    }

    disable(){
        localStorage.setItem('notification.state',"false")
        this.disablePushBrowser()
        this.disablePushOS()
    }

    enablePushBrowser(){
        if(this.isGranted() && this.isAllowAll()){
            localStorage.setItem('notification.browser',"false")
        }
    }

    isEnabledPushBrowser(){
        return localStorage.getItem('notification.browser')==="true"
    }

    disablePushBrowser(){
        localStorage.setItem('notification.browser',"false")
    }

    enablePushOS(){
        if(this.isGranted() && this.isAllowAll()){
            localStorage.setItem('notification.os',"false")
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

    send(title, text){
        if(Notification.permission === "granted" && localStorage.getItem('notification.state')==="true"){
            const img = "/img/maskable-icon.png";
            const notification = new Notification(title, { body: text, icon: img });
        }
    }
}