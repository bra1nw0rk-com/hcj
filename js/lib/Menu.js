$(function () {
    window.Menu = {
        load(menuName){
            $.post(`/api/${menuName}.json`, function (data) {
                console.log(data);
            });
        },
    }
});