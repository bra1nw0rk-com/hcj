import $ from "./lib/jquery/index.js";
import SCSS from "./lib/core/SCSS.js";
import UI from "./lib/core/UI.js";
import Module from "./lib/core/Module.js";
import LocalStorage from "./lib/core/LocalStorage.js";
await import("/js/lib/main.js?v=" + Math.random() * 1000000000000000000);
globalThis.Module = Module;
globalThis.storage = new LocalStorage("ws");
globalThis.html = String.raw;
globalThis.WS = {
	scss: SCSS,
	//containers: new Containers(),
	ui: new UI(),
	/*user: new USER(),*/
};

$(function () {
	$("#nojavascript").remove();
	WS.scss.load("/css/index.scss");
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
