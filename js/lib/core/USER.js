import CustomEvents from "./CustomEvents.js";

export default class USER {
    events= new CustomEvents()
    loginTimer= null
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
        return localStorage.getItem('user.lastUpdate') || null;
    }
    set lastUpdate(time) {
        localStorage.setItem('user.lastUpdate', time);
    }
    addEvent(eventName, callback) {
        this.events.on(eventName, callback);
    }
    setLoginTimer() {
        let _this = this
        clearInterval(this.loginTimer);
        this.loginTimer = setInterval(function () {
            if (_this.needLogin()) {
                clearInterval(_this.loginTimer)
                _this.events.call("needLogin");
            }
        }, 1000);
    }

    needLogin() {
        if (this.sessionId !== 'null' && this.sessionId !== null) {
            if ((parseInt(this.lastUpdate) + this.loginTimeout) < new Date().getTime()) {
                this.sessionId = null;
                return true;
            } else {
                return false;
            }
        } else {
            return true;
        }
    }
    testLogin() {
        if (this.needLogin()) {
            this.events.call("needLogin");
        } else {
            this.events.call("loggedIn");
        }
    }
    update(sid) {
        this.sessionId = sid;
        this.lastUpdate = new Date().getTime();
        this.events.call("loggedIn");
    }
    login(login, password) {
        let _this = this
        if (login === "admin" && password === "admin") {
            WS.ui.closeModal('#userLoginForm', function () {
                _this.update("dslfafhkldhjakelrhalweh54sdaf54d");
            });
        } else {
            WS.ui.clearForm('#userLoginForm');
            WS.ui.effects.shake('#userLoginForm')
        }
        /* create api for login*/
        return false;
    }
    logout() {
        this.events.call("logout");
    }
    init() {
        let _this = this
        this.addEvent('loggedIn', function () {
            Module.call(`main`);
            /*
            setTimeout(function () {
                $("body").addClass(WS.ui.savedTheme + '-theme');
                //topMenu.load(); !!!!!!!!!!!
            }, 300);

             */
            this.setLoginTimer();
        });
        this.addEvent('needLogin', function () {
            console.log("ok")
            Module.call(`forms/login-form`);
        });
        this.addEvent('logout', function () {
            clearInterval(_this.loginTimer);
            this.sessionId = null;
            this.lastUpdate = null;
            WS.ui.clearPage();
            this.testLogin();
        });
        $('body').on("click mousemove keypress", "*", function () {
            _this.lastUpdate = new Date().getTime();
        }).on('click', '.submit', function (e) {
            e.preventDefault();
            _this.login($(this).parent().find('[name="username"]').val(), $(this).parent().find('[name="password"]').val());
            return true;
        });
        this.testLogin()

    }
}