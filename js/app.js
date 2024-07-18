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
	$('body').on('mousedown','*', function(event){
		if(event.which === 1) { // Left mouse button
			timer = new Date().getTime();
		}
	}).on('mouseup mouseleave','*', function(event){
		if(event.which === 1) {
			if((new Date().getTime() - timer) > threshold) {
				event.preventDefault();
				alert('aaaaa')
			}
		}
	});
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
