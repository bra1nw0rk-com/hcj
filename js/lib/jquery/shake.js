(function($) {
    $.fn.shake = function(o) {
        if (typeof o === 'function') o = {callback: o};
        // Set options
        o = $.extend({
            direction: "left",
            distance: 20,
            times: 3,
            speed: 140,
            easing: "swing"
        }, o);

        return this.each(function() {

            // Create element
            let el = $(this), props = {
                position: el.css("position"),
                top: el.css("top"),
                bottom: el.css("bottom"),
                left: el.css("left"),
                right: el.css("right")
            };

            el.css("position", "relative");

            // Adjust
            let ref = (o.direction === "up" || o.direction === "down") ? "top" : "left";
            let motion = (o.direction === "up" || o.direction === "left") ? "pos" : "neg";

            // Animation
            let animation = {}, animation1 = {}, animation2 = {};
            animation[ref] = (motion === "pos" ? "-=" : "+=")  + o.distance;
            animation1[ref] = (motion === "pos" ? "+=" : "-=")  + o.distance * 2;
            animation2[ref] = (motion === "pos" ? "-=" : "+=")  + o.distance * 2;

            // Animate
            el.animate(animation, o.speed, o.easing);
            for (let i = 1; i < o.times; i++) { // Shakes
                el.animate(animation1, o.speed, o.easing).animate(animation2, o.speed, o.easing);
            }
            el.animate(animation1, o.speed, o.easing).
            animate(animation, o.speed / 2, o.easing, function(){ // Last shake
                el.css(props); // Restore
                if(o.callback) o.callback.apply(this, arguments); // Callback
            });
        });
    };
})(jQuery);