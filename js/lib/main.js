/**
 * @author Volodymyr Cherniyevskyy
 * @copyright bra1nw0rk.
 * {@link https://github.com/bra1nw0rk-com/hcj GitHub}.
 * {@link https://www.linkedin.com/in/volodymyr-cherniyevskyy-24962b22b LinkedIn}
 **/
$(function () {
    $("body").on('submit','form',function(e){
        e.preventDefault();
        return false;
    }).on('click','input, button',function(e){
        e.preventDefault();
    });
});