/**
 * @author Volodymyr Cherniyevskyy
 * @copyright bra1nw0rk.
 * {@link https://github.com/bra1nw0rk-com/hcj GitHub}.
 * {@link https://www.linkedin.com/in/volodymyr-cherniyevskyy-24962b22b LinkedIn}
 **/
$(function () {
    window.Menu = {
        load(menuName){
            $.post(`/api/${menuName}.json`, function (data) {
                console.log(data);
            });
        },
    }
});