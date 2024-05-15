$(function () {
    $("body").on('keypress','input',function (e) {
        if (e.keyCode === 13) {
            return false;
        } else {
            // your code here...
        }
    }).on('submit','form',function(e){
        e.preventDefault();
        return false;
    }).on('click','input, button',function(e){
        e.preventDefault();
    });
});