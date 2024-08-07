import "./lib/jquery/index.js";
import UI from "./lib/core/UI.js";
import Module from "./lib/core/Module.js";
import LocalStorage from "./lib/core/LocalStorage.js";
import "/js/lib/main.js";

globalThis.Module = Module;
globalThis.storage = new LocalStorage("ws");
globalThis.html = String.raw;
globalThis.WS = {
	//containers: new Containers(),
	ui: new UI(),
	/*user: new USER(),*/
};

$(function () {
	$("#nojavascript").remove();
	let timer=0;
	const threshold = 500;
	$('body').on('touchend touchcancel touchmove','*', function(event){
		if((new Date().getTime() - timer) > threshold) {
			event.stopPropagation();
			event.preventDefault();
			return false;
		}
	}).on('touchstart','*', function(event){
		timer = new Date().getTime();
		let $this = $(this);
		console.log($this.data('clicked'))
		if ($this.data('clicked')) {
			let currentTime = new Date().getTime();
			event.preventDefault();
			event.stopPropagation();
			event.stopImmediatePropagation();
			$(`#content`).append($(`<div>double</div>`))
			return false;
		} else {
			$this.data('clicked', true);
			setTimeout(function() {
				$this.removeData('clicked');
			}, 500);
		}
	}).on('contextmenu','*', function(event){
		/*event.stopPropagation();
		event.preventDefault();
		return false;

		 */
	})
	WS.ui.init();
	//WS.user.init();
	Module.call(`main`);

});

$(window).on("orientationchange", function (e) {
	//location.reload();
});
//import "/js/lib/types/Function.js";
//import "/js/lib/types/Windows.js";
//import "/js/lib/types/SessionStructure.js";
//import "/js/lib/SessionClient.js";
//import "/html/lib/HTML.js";
//import "/js/lib/ui/index.js";

// https://www.w3schools.com/jsref/prop_win_localstorage.asp
//import "./plugin/Selector.js";
