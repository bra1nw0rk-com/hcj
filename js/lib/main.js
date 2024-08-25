$(function () {
    $("body").on('submit','form',function(e){
        e.preventDefault();
        return false;
    }).on('click','input, button',function(e){
        e.preventDefault();
    });
});