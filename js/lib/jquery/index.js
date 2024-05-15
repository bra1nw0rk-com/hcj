import { jQuery } from "./core/jquery.js";

//await import("/js/lib/jquery/jquery.js?v=" + Math.random() * 1000000000000000000);
await import("/js/lib/jquery/events.js?v=" + Math.random() * 1000000000000000000);
await import("/js/lib/jquery/module.js?v=" + Math.random() * 1000000000000000000);
await import("/js/lib/jquery/sheets.js?v=" + Math.random() * 1000000000000000000);
await import("/js/lib/jquery/table.js?v=" + Math.random() * 1000000000000000000);

export { jQuery, jQuery as $ };
export default jQuery;

globalThis.jQuery = jQuery;
globalThis.$ = jQuery;
