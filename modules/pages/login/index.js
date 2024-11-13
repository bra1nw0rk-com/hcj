/**
 * @author Volodymyr Cherniyevskyy
 * @copyright bra1nw0rk.
 * {@link https://github.com/bra1nw0rk-com/hcj GitHub}.
 * {@link https://www.linkedin.com/in/volodymyr-cherniyevskyy-24962b22b LinkedIn}
 **/
import HTMLObject from "../../../js/lib/html/HTMLObject.js";
export default class PageLogin extends HTMLObject  {
    animation_logo = $(`<div data-module="animations/logo"></div>`)
    main_title = $(`<div name="title"><span class="main_text">Libre</span><span class="selected">IS</span></div>`)
    anim_delay = 3000
    i = 0;
	 constructor() {
        super("div");
        let _this = this;
        this.css = "/modules/pages/login/index.css";
        this.name = "page-login";
        this.object.append(this.animation_logo)
        this.object.append(this.main_title)
        this.object.modal({module:'forms/login-form'});
    }
    init() {
        super.init();
        let _this = this;
        this.animateTitle()
    }
    getRandomInRange(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    async animateTitle(obj){
        let _this = obj || this;
        let texts=[
            ['Libre','IS'],
            ['Web','OS'],
            ['Functionality, comfort and freedom ', 'in one place.'],
            ['bra1nw0rk','.com']
        ]
        let text='';

        let textArr = texts[_this.i];
        let char_count = 2;
        let allLength=0;
        for(let al=0;al<textArr.length;al++){
            allLength+=textArr[al].length
        }
        let anim_speed_delay = 15

        _this.object.find(`.main_text`).html('')
        _this.object.find(`.selected`).html('')

        for(let p1=0;p1<textArr[0].length;p1++){
            text = _this.setCharAt(text,p1,textArr[0].substring(p1,p1+1))
            _this.object.find(`.main_text`).html(text)
            await _this.pause( anim_speed_delay);
        }
        text='';

        if(typeof textArr[1] !== 'undefined') {
            for (let p2 = 0; p2 < textArr[1].length; p2++) {
                text = _this.setCharAt(text, p2, textArr[1].substring(p2, p2 + 1))
                _this.object.find(`.selected`).html(text)
                await _this.pause( anim_speed_delay);
            }
        }
        _this.i++;
        if(_this.i >= texts.length) _this.i=0;
        setTimeout(async ()=>{
            _this.animateTitle(_this)
        },_this.anim_delay)
    }

    pause(milliseconds) {
        return new Promise(resolve => setTimeout(resolve, milliseconds));
    }

    setCharAt(str, index, char) {
        if (index < 0){
            return str;
        }
        if(index >= str.length) {
            return str + char;
        }
        return str.substring(0, index) + char + str.substring(index + 1);
    }



}