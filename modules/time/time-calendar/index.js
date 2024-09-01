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
        this.template = $(html``);
        this.object.append(this.dateObj)
        this.object.append(this.timeObj)
        this.timerHandler = setInterval(function(){
                let currentDate = new Date();
                _this.dateObj.html(currentDate.getDate() + "." + (currentDate.getMonth()+1)  + "." + currentDate.getFullYear())
                _this.timeObj.html(currentDate.getHours() + ":" + currentDate.getMinutes() + ":" + currentDate.getSeconds())
        },1000);
    }    
}