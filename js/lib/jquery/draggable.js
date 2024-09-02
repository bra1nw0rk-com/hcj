
$(function () {
    $.fn.extend({
        draggable: function (options) {
            let defaults = {

            };
            options = $.extend(defaults, options);
            if ($(this).length > 0) {
                return $(this).each(function (e, i) {
                    let elem = $(this).closest(`[box]`);
                    let obj = elem[0].parameters;

                    obj.movePosition={
                        x:null,
                        y:null
                    }

                    obj.moveX=(val)=>{
                        if(val !==undefined){
                            obj.movePosition.x = val
                        }else {
                            return obj.movePosition.x;
                        }
                    }
                    obj.moveY=(val)=>{
                        if(val !==undefined){
                            obj.movePosition.y = val
                        }else {
                            return obj.movePosition.y;
                        }
                    }

                    $(this).on("mousedown",function(e){
                        if(e.which === 1) {
                            obj.moveX = e.pageX;
                            obj.moveY = e.pageY;
                            $(`body`).on("mousemove.boxMove", function (e) {
                                elem.css({
                                    top: elem.position().top + (e.pageY - obj.moveY),
                                    left: elem.position().left + (e.pageX - obj.moveX)
                                });
                                obj.moveX = e.pageX;
                                obj.moveY = e.pageY;
                            })
                        }
                    }).on("mouseup",function(){
                        $(`body`).off('.boxMove')
                        obj.moveX = null;
                        obj.moveY = null;

                    }).on("mousemove",function(e){
                        e.stopPropagation()
                        console.log(obj)
                        if(obj.moveX !== null && obj.moveY !== null){
                            elem.css({
                                transform:'none',
                                top: elem.position().top + (e.pageY - obj.moveY),
                                left: elem.position().left +  (e.pageX - obj.moveX)
                            });

                            obj.moveX = e.pageX;
                            obj.moveY = e.pageY;
                        }

                    })


                    console.log("ok")

                    return this;
                });
            }
        },
    });
});