/*
 * @author Volodymyr Cherniyevskyy
 * @copyright bra1nw0rk.
 * {@link https://github.com/bra1nw0rk-com/hcj GitHub}.
 * {@link https://www.linkedin.com/in/volodymyr-cherniyevskyy-24962b22b LinkedIn}
 */
import WEBFS from "./WEBFS.js";

export default class ContanierURL {
    url=""
    original=""
    blob=null
    constructor(data, original) {
        this.original = original
        console.log(original, WEBFS.getContentType(original))
        let blob = new Blob([data], {type: WEBFS.getContentType(original)});
        this.url = URL.createObjectURL(blob);
    }
    clear(){
        URL.revokeObjectURL(this.url)
        this.blob = null;
        this.original = null;
    }
}
