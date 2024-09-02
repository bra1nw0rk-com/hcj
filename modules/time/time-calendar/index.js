import HTMLObject from "../../../js/lib/html/HTMLObject.js";

export default class TimeCalendar extends HTMLObject  {
        timerHandler = null;
        dateObj=$(`<div class="current-date"></div>`);
        timeObj=$(`<div class="current-time"></div>`)
	 constructor() {
        super("div");
        let _this = this;
        this.css = "/modules/time/time-calendar/index.css";
        this.name = "time-calendar";
        this.classes = "clickable"
        this.template = $(html``);
        this.object.append(this.dateObj)
        this.object.append(this.timeObj)
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
        super.init()
        $(`body`)
            .off(`.${this.id}`)
            .on(`click.${this.id}`,`#${this.id}`,function(){
            WS.ui.modal("Test","info");
        })

    }
    addZero(inp){
        if(inp < 10){
                return "0"+inp;
        }
        return inp;
    }
}