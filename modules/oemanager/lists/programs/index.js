import Module from "../../../../js/lib/core/Module.js";
import HTMLObject from "../../../../js/lib/html/HTMLObject.js";
import StructuredList from "../../../../js/lib/html/StructuredList.js";
import Programs from "../../libs/Programs.js";

class ProgramsList extends HTMLObject {
	programs = new Programs();
	constructor() {
		super("list");
		let structuredList = new StructuredList(this.programs.data);
		this.classes = "structured-list programs";
		this.css = "/modules/oemanager/css/programs-list.css";
		this.template = html`
			<div class="head"></div>
			<div class="content"></div>
		`;
		this.object.find(".content").html(structuredList.get());
		$("body").off(".oemanager-programs");
		$("body").on("click.oemanager-programs", "#oemanager .menu-block [data-id]", function () {
			let program = $(this).attr("data-id");
			let name = $(this).attr("data-name");

			let fullPath = `oemanager/programs/${program}`;
			Module.call(fullPath).then(function (module) {
				//console.log(module);
				if (module !== null) {
					$("#oemanager .main-block")[0].add(name, module.get());
				}
			});
		});
	}
}
export default new ProgramsList();
