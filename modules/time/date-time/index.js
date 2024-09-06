/**
 * @author Volodymyr Cherniyevskyy
 * @copyright bra1nw0rk.
 * {@link https://github.com/bra1nw0rk-com/hcj GitHub}.
 * {@link https://www.linkedin.com/in/volodymyr-cherniyevskyy-24962b22b LinkedIn}
 **/
import HTMLObject from "../../../js/lib/html/HTMLObject.js";

export default class DateTime extends HTMLObject  {
        timerHandler = null;
        dateObj=$(`<div class="current-date"></div>`);
        timeObj=$(`<div class="current-time"></div>`)
	 constructor() {
        super("div");
        let _this = this;
        this.css = "/modules/time/date-time/index.css";
        this.name = "date-time";
        this.classes = "clickable"
        this.template = $(html``);
        this.object.append(this.timeObj)
        this.object.append(this.dateObj)        
        this.timerHandler = setInterval(function(){
                let currentDate = new Date();
                _this.dateObj.html(
                    _this.addZero(currentDate.getDate()) + "."
                    + _this.addZero((currentDate.getMonth()+1))  + "."
                    + currentDate.getFullYear())
                _this.timeObj.html(
                    _this.addZero(currentDate.getHours()) + ":"
                    + _this.addZero(currentDate.getMinutes()) + ":"
                    + _this.addZero(currentDate.getSeconds()))
        },1000);


    }

    init(){
        let _this = this;
        super.init()
        $(`body`)
            .off(`.${this.id}`)
            .on(`click.${this.id}`,`#${this.id}`,function(){
            Module.call(`calendar/sun`).then(function(obj){
                $(`#content`).append(obj.get())
            });

        })

    }
    addZero(inp){
        if(inp < 10){
                return "0"+inp;
        }
        return inp;
    }
}