/*
 * @author Volodymyr Cherniyevskyy
 * @copyright bra1nw0rk.
 * {@link https://github.com/bra1nw0rk-com/hcj GitHub}.
 * {@link https://www.linkedin.com/in/volodymyr-cherniyevskyy-24962b22b LinkedIn}
 */

import ContanierURL from "./ContanierURL.js";

export default class ContainerURLS{
    urls = []

    add(data, original){
        if(!this.exists(original)) {
            let i = this.urls.push(new ContanierURL(data, original))
            return this.urls[i-1].url
        }else{
            return this.get(original).url
        }
    }

    get(original){
        return this.urls.find(o => o.original === original)
    }

    exists(original){
        let result = this.get(original);
        return result !== undefined;

    }

    clear(){
        this.urls.forEach((item, index, object)=>{
            item.clear()
            object.splice(index, 1);
        })
    }


}