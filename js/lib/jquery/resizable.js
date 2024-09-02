
$(function () {
    $.fn.extend({
        resizable: function (options) {
            let defaults = {

            };
            options = $.extend(defaults, options);
            if ($(this).length > 0) {
                return $(this).each(function (e, i) {
                    let elem = $(this).closest(`[box]`);
                    let obj = elem[0];

                    let resizing=$(`
                        <span class="top-left-side"></span>
                        <span class="top-side"></span>
                        <span class="top-right-side"></span>
                        <span class="right-side"></span>
                        <span class="bottom-right-side"></span>
                        <span class="bottom-side"></span>
                        <span class="bottom-left-side"></span>
                        <span class="left-side"></span>
                    `)



                    obj.movePosition={
                        x:null,
                        y:null
                    }


                    $(this).on("mousedown",function(e){
                        if(e.which === 1) {
                            obj.movePosition.x = e.pageX;
                            obj.movePosition.y = e.pageY;
                            $(`body`).on("mousemove.boxMove", function (e) {
                                elem.css({
                                    top: elem.position().top + (e.pageY - obj.movePosition.y),
                                    left: elem.position().left + (e.pageX - obj.movePosition.x)
                                });
                                obj.movePosition.x = e.pageX;
                                obj.movePosition.y = e.pageY;
                            })
                        }
                    }).on("mouseup",function(){
                        $(`body`).off('.boxMove')
                        obj.movePosition.x = null;
                        obj.movePosition.y = null;

                    }).on("mousemove",function(e){
                        e.stopPropagation()
                        if(obj.movePosition.x !== null && obj.movePosition.y !== null){
                            elem.css({
                                transform:'none',
                                top: elem.position().top + (e.pageY - obj.movePosition.y),
                                left: elem.position().left +  (e.pageX - obj.movePosition.x)
                            });
                            obj.movePosition.x = e.pageX;
                            obj.movePosition.y = e.pageY;
                        }
                    })
                    return this;
                });
            }
        },
    });
});