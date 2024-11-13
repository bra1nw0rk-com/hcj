/*
 * @author Volodymyr Cherniyevskyy
 * @copyright bra1nw0rk.
 * {@link https://github.com/bra1nw0rk-com/hcj GitHub}.
 * {@link https://www.linkedin.com/in/volodymyr-cherniyevskyy-24962b22b LinkedIn}
 */
/*
window.console = {
    log: function(str){
        window.top.postMessage({"message":str}, '*');
    },
    err: function(str){
        window.top.postMessage({"message":str}, '*');
    }
};
*/

window.top.alert("aaa")
window.parent.alert("aaa")
console.log("cccc")


if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/service-worker.js')
        .then((registration) => {
            //console.log('Service Worker registered:', registration);
        })
        .catch((error) => {
            //console.error('Error registering Service Worker:', error);
        });
}else{
    //console.log('Service Workers doesnt supports in this browser')
}
