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
    showed= false;
    canChange = false;
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

    hide(){
        this.object.addClass('hidden').removeClass("fadeIn")
        this.keys=""
        this.#content.html(``)
        this.showed = false
        this.canChange = false
    }

    init(){
        let _this = this;
        super.init()
        $(window).on('blur focus', function () {
            // Append this text to the `body` element.
            _this.keys = ""
        });
        $(`body`)
            .off(`.${this.id}`)
            .on(`keydown.${this.id}`,function(e){
                e.stopPropagation()
                e.preventDefault()
                if(!_this.keys.includes(`k${e.which}`)){
                    _this.keys+=`k${e.which}`
                }
                if(_this.keys==="k16k9"){
                    if(!_this.showed){
                        _this.showed = true;
                        _this.object.removeClass('hidden').addClass("fadeIn")
                        if($(`[box]`).length > 0){
                            _this.#content.html("")
                            $(`[box]`).each(function(){
                                let title = $(`<div class="content-title">${$(this)[0].parameters.title}</div>`)
                                let boxItem = $(this).clone()
                                let boxObj = $(`<div box-item></div>`);
                                boxObj.append(title)
                                boxObj.append(boxItem)
                                _this.#content.append(boxObj)

                                boxItem.attr("miniature-id",$(this).attr("id"))
                                boxItem.removeAttr("id")
                                boxItem.removeAttr("name")
                                boxItem.removeClass("top fadeIn")


                                boxItem.unbind();
                                boxItem.find(`*`).unbind();

                                if ($(`#${boxItem.attr("miniature-id")}`)[0].parameters.isOnFront()) {
                                    boxObj.addClass('active')
                                }


                                let relWZoom = (boxItem.outerWidth() / $(`body`).outerWidth())
                                let relHZoom = (boxItem.outerHeight()/ $(`body`).outerHeight())
                                let zoom = (100-(((relWZoom+relHZoom)/2)*100))
                                boxItem.find(`.top-left-side, .top-side, .top-right-side, .right-side, .bottom-right-side, .bottom-side, .bottom-left-side, .left-side`).remove()

                                boxItem.css({
                                    top:'unset',
                                    left:'unset',
                                    zoom:`${zoom}%`,
                                    display:'block'
                                })
                                boxItem.on(`click`,function(e){
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

                                        _this.hide()

                                    }
                                })


                            })

                        }else{
                            _this.#content.html(`NOTHING TO SHOW`)
                        }
                    }
                }else{
                    console.log(_this.keys)
                }
                return false;
            }).on(`keyup.${this.id}`,function(e){
                e.preventDefault()
                if(_this.showed) {
                    if (_this.keys === "k16k9") {
                        if(_this.canChange) {
                            let selObj = _this.object.find(`[box-item].active`).next()
                            if (selObj.length === 0) {
                                selObj = _this.object.find(`[box-item]`).first()
                            }
                            console.log(selObj)
                            if (selObj.length !== 0) {
                                _this.object.find(`[box-item]`).removeClass(`active`)
                                selObj.addClass(`active`)
                            }
                        }else{
                            _this.canChange = true
                        }
                    }

                    if (_this.keys === "k16") {
                        let selObj = _this.object.find(`[box-item].active [miniature-id]`)
                        let boxObj = $(`#${selObj.attr("miniature-id")}`)
                        if (boxObj.length > 0) {
                            if (boxObj.css('display') === "none") {
                                boxObj[0].parameters.maximize();
                            } else {
                                if (!boxObj[0].parameters.isOnFront()) {
                                    boxObj[0].parameters.toFront()
                                }
                            }
                        }

                        _this.keys = ""
                    }
                }

                if (_this.keys === "k16k27") {
                    $(`[box]`).each(function(){
                        $(this)[0].parameters.minimize()
                    })
                }

                _this.keys=_this.keys.replace(`k${e.which}`,'')


                if(_this.keys===""){
                    _this.hide()
                }


                return false;
            }).on(`keypress`,function(e){
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