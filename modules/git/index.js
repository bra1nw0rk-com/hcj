/*
 * @author Volodymyr Cherniyevskyy
 * @copyright bra1nw0rk.
 * {@link https://github.com/bra1nw0rk-com/hcj GitHub}.
 * {@link https://www.linkedin.com/in/volodymyr-cherniyevskyy-24962b22b LinkedIn}
 */

import Box from "../../js/lib/html/Box.js";


export default class GitApp extends Box  {
    webContainer =null
    constructor() {
        super(true);
        this.css = "/modules/git/index.css";
        this.name = "git";
        this.title = "Git";
        this.draggable = true;
        this.resizable = true;
        this.icon.set("fa-code-fork")
        this.webContainer =  new WebContainer('http://10.0.5.14:3000');
        this.webContainer.name = this.name
        this.content = this.webContainer.get()
        this.button.minimize();
        this.button.close();
    }
    init() {
        super.init()

    }

    close(){
        let _this = this
        super.close(function(){
            _this.webContainer.clear()
        })
    }
}