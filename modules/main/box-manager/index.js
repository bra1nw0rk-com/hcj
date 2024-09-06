import HTMLObject from "../../../js/lib/html/HTMLObject.js";

export default class BoxManager extends HTMLObject  {
    keys = "";
	constructor() {
        super("div");
        let _this = this;
        this.css = "/modules/main/box-manager/index.css";
        this.classes = "hidden"
        this.name = "box-manager";        
        this.template = $(html`            
            test
            `);

    }

    init(){
        let _this = this;
        super.init()
        $(`body`)
            .off(`.${this.id}`)
            .on(`keydown.${this.id}`,function(e){
                e.stopPropagation()
                 _this.keys+=`-${e.which}`
                console.log(e.which, this.keys)
            }).on(`keyup.${this.id}`,function(e){
                e.stopPropagation()                                    
                _this.keys.replace(`-${e.which}`,'')
                console.log(e.which, this.keys)
            })

    }
    addZero(inp){
        if(inp < 10){
                return "0"+inp;
        }
        return inp;
    }
}