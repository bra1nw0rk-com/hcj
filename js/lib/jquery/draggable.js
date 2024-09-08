/**
 * @author Volodymyr Cherniyevskyy
 * @copyright bra1nw0rk.
 * {@link https://github.com/bra1nw0rk-com/hcj GitHub}.
 * {@link https://www.linkedin.com/in/volodymyr-cherniyevskyy-24962b22b LinkedIn}
 **/

$(function () {
    $.fn.extend({
        draggable: function (options) {
            let defaults = {
                parent:null
            };
            options = $.extend(defaults, options);
            if ($(this).length > 0) {
                return $(this).each(function () {
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
                                    console.log(elem.offset().top,elem.position().top)
                                    obj.parameters.lastPosition.y =  /*elem.position().top*/ elem.offset().top +8
                                    obj.parameters.lastPosition.x =  elem.position().left
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