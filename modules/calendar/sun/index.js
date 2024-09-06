/**
 * @author Volodymyr Cherniyevskyy
 * @copyright bra1nw0rk.
 * {@link https://github.com/bra1nw0rk-com/hcj GitHub}.
 * {@link https://www.linkedin.com/in/volodymyr-cherniyevskyy-24962b22b LinkedIn}
 **/
import HTMLObject from "../../../js/lib/html/HTMLObject.js";

export default class SunCalendar extends HTMLObject  {
    timerHandler = null;
    dateObj=$(`<div class="current-date"></div>`);
    timeObj=$(`<div class="current-time"></div>`)
    constructor() {
        super("div");
        let _this = this;
        this.css = "/modules/calendar/sun/index.css";
        this.name = "sun-calendar";
        this.template = $(html`
            aaa
        `);
        this.object.append(this.dateObj)
        this.object.append(this.timeObj)
    }

    init(){
        let _this = this;
        super.init()
        $(`body`)
            .off(`.${this.id}`)
            .on(`click.${this.id}`,function(){

                WS.ui.closeModal(`#${_this.id}`);
            })

    }
    addZero(inp){
        if(inp < 10){
            return "0"+inp;
        }
        return inp;
    }
}