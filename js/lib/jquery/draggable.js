
$(function () {
    $.fn.extend({
        draggable: function (options) {
            let defaults = {
                parent:null
            };
            options = $.extend(defaults, options);
            if ($(this).length > 0) {
                return $(this).each(function (e, i) {
                    let elem = /*(this).closest(`[box]`)*/ options.parent;
                    let obj = elem[0];

                    obj.movePosition={
                        x:null,
                        y:null
                    }


                    $(this).on("mousedown",function(e){
                        if(e.which === 1) {
                            obj.movePosition.x = e.pageX;
                            obj.movePosition.y = e.pageY;                            
                            $(`body`).on("mousemove.boxMove", function (e) {                                                                                           
                                if(obj.movePosition.x !== null && obj.movePosition.y !== null){                                    
                                    elem.css({
                                        transform:'none',
                                        top: elem.position().top + (e.pageY - obj.movePosition.y),
                                        left: elem.position().left + (e.pageX - obj.movePosition.x)
                                    });
                                    obj.movePosition.x = e.pageX;
                                    obj.movePosition.y = e.pageY;
                                }                                
                            })
                        }
                    }).on("mouseup",function(e){
                        e.stopPropagation()
                        $(`body`).off('.boxMove')
                        obj.movePosition.x = null;
                        obj.movePosition.y = null;

                    })
                    return this;
                });
            }
        },
    });
});