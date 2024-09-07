/**
 * @author Volodymyr Cherniyevskyy
 * @copyright bra1nw0rk.
 * {@link https://github.com/bra1nw0rk-com/hcj GitHub}.
 * {@link https://www.linkedin.com/in/volodymyr-cherniyevskyy-24962b22b LinkedIn}
 **/
import HTMLObject from "../../../js/lib/html/HTMLObject.js";
export default class BoxManager extends HTMLObject  {
    keys = "";
    #content = $(`<div class="content"></div>`)
	constructor() {
        super("div");
        let _this = this;
        this.css = "/modules/main/box-manager/index.css";
        this.classes = "hidden"
        this.name = "box-manager";        
        this.template = $(html`
            <h2>Box manager</h2>
            
        `);

        this.object.append(this.#content)

    }

    init(){
        let _this = this;
        super.init()
        $(`body`)
            .off(`.${this.id}`)
            .on(`keydown.${this.id}`,function(e){
                e.stopPropagation()
                e.preventDefault()
                if(!_this.keys.includes(`k${e.which}`)){
                    _this.keys+=`k${e.which}`
                }
                if(_this.keys==="k16k9"){
                    _this.object.removeClass('hidden').addClass("fadeIn")
                    if($(`[box]`).length > 0){
                        _this.#content.html("")
                        $(`[box]`).each(function(){
                            let boxObj = $(this).clone();
                            boxObj.attr("miniature-id",$(this).attr("id"))
                            boxObj.removeAttr("id")
                            //boxObj.removeAttr("style")
                            boxObj.unbind();
                            boxObj.find(`*`).unbind();

                            if ($(`#${boxObj.attr("miniature-id")}`)[0].parameters.isOnFront()) {
                                boxObj.addClass('active')
                            }
                            _this.#content.append(boxObj)
                            boxObj.on(`click`,function(e){
                                let selObj = $(`#${$(this).attr("miniature-id")}`)
                                if(e.which === 1){
                                    e.stopPropagation()
                                    if (selObj.css('display') === "none") {
                                        selObj[0].parameters.maximize();
                                    } else {
                                        if (!selObj[0].parameters.isOnFront()) {
                                            selObj[0].parameters.toFront()
                                        }
                                    }

                                    _this.object.addClass('hidden').removeClass("fadeIn")
                                    _this.keys=""

                                }
                            })


                        })

                    }else{
                        _this.#content.html(`NOTHING TO SHOW`)
                    }
                }else{
                    console.log(_this.keys)
                }
                return false;
            }).on(`keyup.${this.id}`,function(e){
                e.stopPropagation()                                    
                e.preventDefault()
                _this.keys=_this.keys.replace(`k${e.which}`,'')

                if(_this.keys===""){
                    _this.object.addClass('hidden').removeClass("fadeIn")
                    _this.#content.html(``)
                }
                return false;
            }).on(`keypress`,function(e){
                e.stopPropagation()                                    
                e.preventDefault()
                return false;
            })

    }
    addZero(inp){
        if(inp < 10){
                return "0"+inp;
        }
        return inp;
    }
}