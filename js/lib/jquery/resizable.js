
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
                    $(this).append(resizing);
                    obj.resize={
                        class:"",
                        x:null,
                        y:null,
                        fail:0
                    }

                    obj.stopResize=()=>{
                        $(`body`).off('.boxResizing')
                        obj.resize.x = null;
                        obj.resize.y = null;
                        obj.resize.fail=0
                    }

                    obj.doResize=(e)=>{
                        
                        let oldWidth = elem.outerWidth();
                        let oldHeight = elem.outerHeight();
                        if (obj.resize.class === "bottom-side") {
                            elem.css({
                                transform:'none',
                                top: elem.position().top,
                                left:elem.position().left,
                                height: elem.outerHeight() + (e.pageY - obj.resize.y),
                                width: elem.outerWidth()
                            });
                        }else if (obj.resize.class === "top-side") {
                            elem.css({
                                transform:'none',
                                top: elem.position().top + (e.pageY - obj.resize.y),
                                left:elem.position().left,
                                height: elem.outerHeight() - (e.pageY - obj.resize.y),
                                width: elem.outerWidth()
                            });
                        }else if (obj.resize.class === "left-side") {

                            elem.css({
                                transform:'none',
                                top: elem.position().top,
                                left:elem.position().left + (e.pageX - obj.resize.x),
                                height: elem.outerHeight(),
                                width: elem.outerWidth() - (e.pageX - obj.resize.x),
                            });
                        }else if (obj.resize.class === "right-side") {
                            elem.css({
                                transform:'none',
                                top: elem.position().top,
                                left:elem.position().left,
                                height: elem.outerHeight(),
                                width: elem.outerWidth() + (e.pageX - obj.resize.x),
                            });
                        }else if (obj.resize.class === "top-left-side") {
                            elem.css({
                                transform:'none',
                                top: elem.position().top + (e.pageY - obj.resize.y),
                                left:elem.position().left + (e.pageX - obj.resize.x),
                                height: elem.outerHeight() - (e.pageY - obj.resize.y),
                                width: elem.outerWidth() - (e.pageX - obj.resize.x),
                            });
                        }else if (obj.resize.class === "top-right-side") {
                            elem.css({
                                transform:'none',
                                top: elem.position().top + (e.pageY - obj.resize.y),
                                left:elem.position().left,
                                height: elem.outerHeight() - (e.pageY - obj.resize.y),
                                width: elem.outerWidth() + (e.pageX - obj.resize.x),
                            });
                        }else if (obj.resize.class === "bottom-right-side") {
                            elem.css({
                                transform:'none',
                                top: elem.position().top,
                                left:elem.position().left,
                                height: elem.outerHeight() + (e.pageY - obj.resize.y),
                                width: elem.outerWidth() + (e.pageX - obj.resize.x),
                            });
                        }else if (obj.resize.class === "bottom-left-side") {
                            elem.css({
                                transform:'none',
                                top: elem.position().top,
                                left:elem.position().left + (e.pageX - obj.resize.x),
                                height: elem.outerHeight() + (e.pageY - obj.resize.y),
                                width: elem.outerWidth() - (e.pageX - obj.resize.x),
                            });
                        }
                        obj.resize.x = e.pageX;
                        obj.resize.y = e.pageY;
                        if(elem.outerHeight() === oldHeight && elem.outerWidth()===oldWidth){
                            obj.resize.fail++
                        }else{
                            obj.resize.fail=0
                        }
                        if(obj.resize.fail>3){
                            obj.stopResize()
                        }
                    }

                    $(resizing).on('mousedown.boxResizing',function(e){
                        //e.stopPropagation()
                        if(e.which === 1) {
                            if($(this).hasClass('top-side')){
                                obj.resize.class = 'top-side'
                            }else if($(this).hasClass('right-side')){
                                obj.resize.class = 'right-side'
                            }else if($(this).hasClass('bottom-side')){
                                obj.resize.class = 'bottom-side'
                            }else if($(this).hasClass('left-side')){
                                obj.resize.class = 'left-side'
                            }else if($(this).hasClass('top-left-side')){
                                obj.resize.class = 'top-left-side'
                            }else if($(this).hasClass('top-right-side')){
                                obj.resize.class = 'top-right-side'
                            }else if($(this).hasClass('bottom-right-side')){
                                obj.resize.class = 'bottom-right-side'
                            }else if($(this).hasClass('bottom-left-side')){
                                obj.resize.class = 'bottom-left-side'
                            }
                            obj.resize.x = e.pageX;
                            obj.resize.y = e.pageY;


                            $(`body`).on("mousemove.boxResizing", function (e) {
                                if(obj.resize.x !== null && obj.resize.y !== null) {
                                    obj.doResize(e)
                                }
                            }).on('keyup.boxResizing',function(evt) {
                                if (evt.keyCode == 27) {
                                    obj.stopResize()
                                }
                            });


                        }
                    }).on("mouseup.boxResizing, mouseout.boxResizing",function(){
                       obj.stopResize()
                    })
                    /*
                    elem.on("mousedown.boxResizing",function(){
                        obj.stopResize()
                    })*/
                    $(`body`).on("mousedown.boxResizing",function(){
                        obj.stopResize()
                    })






                    return this;
                });
            }
        },
    });
});