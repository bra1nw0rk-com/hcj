/**
 * @author Volodymyr Cherniyevskyy
 * @copyright bra1nw0rk.
 * {@link https://github.com/bra1nw0rk-com/hcj GitHub}.
 * {@link https://www.linkedin.com/in/volodymyr-cherniyevskyy-24962b22b LinkedIn}
 **/
import WEBFS from "./WEBFS.js";

export default class USER {
    loginTimer= 0
    constructor() {}
    get loginTimeout() {
        return (1000 * 60 * 20);
    }
    get sessionId() {
        return localStorage.getItem('user.sessionId') || null;
    }
    set sessionId(sid) {
        localStorage.setItem('user.sessionId', sid);
    }
    get lastUpdate() {
        let result = localStorage.getItem("user.lastUpdate");
        if (result !== null) {
            return parseInt(result);
        }
        return 0;
    }
    set lastUpdate(time) {
        if (time !== null) {
            localStorage.setItem("user.lastUpdate", time.toString());
        }
    }
    init() {
        let _this = this
        $("html").on("click mousemove mousedown keypress", "*", function (e) {
            _this.lastUpdate = new Date().getTime();
        });
        this.testLogin();
    }


    needLogin() {
        if (this.sessionId !== "null" && this.sessionId !== null) {
            if (this.lastUpdate + this.loginTimeout < new Date().getTime()) {
                //here test session in server
                return true;
            } else {
                return false;
            }
        } else {
            return true;
        }
    }
    setLoginTimer() {
        let _this = this
        if (this.loginTimer !== null) {
            clearInterval(this.loginTimer);
        }
        this.loginTimer = setInterval(() => {
            if (_this.needLogin()) {
                _this.logout();
            }else{
                WEBFS.api('/',{
                    cmd:'user.refresh',
                    params: [_this.sessionId]
                },function(data){


                })
            }
        }, 1000);
    }
    testLogin() {
        if (this.needLogin()) {
            this.logout();
        } else {
            Module.call("main");
            this.setLoginTimer();
        }
    }

    update(sid) {
        this.sessionId = sid;
        this.lastUpdate = new Date().getTime();
        //this.events.call("loggedIn");
    }
    login(login, password, callback) {
        let _this = this
        WEBFS.api('/',{
            cmd:'login',
            params: {
                login:login,
                password:password
            }
        },function(data){
            if(typeof data.result !== 'undefined') {
                if (data.result === true) {
                    WS.user.update(data[0].accessKey);
                    callback(true);
                }else{
                    WS.user.update(null);
                    callback(false);
                }
            }else {
                WS.user.update(null);
                callback(false);
            }

        })

    }
    logout() {
        clearInterval(this.loginTimer);
        this.sessionId = null;
        this.lastUpdate = 0;
        WS.ui.clearWindow();
        $(`body`).modal({module:"pages/login"});
        /*
        Module.call("pages/login").then(r => {
            $(`body`).append(r.get())
            r.init()
        });
        */

    }

}