/**
 * @author Volodymyr Cherniyevskyy
 * @copyright bra1nw0rk.
 * {@link https://github.com/bra1nw0rk-com/hcj GitHub}.
 * {@link https://www.linkedin.com/in/volodymyr-cherniyevskyy-24962b22b LinkedIn}
 **/
import Box from "../../js/lib/html/Box.js";


export default class AboutModal extends Box {
	constructor() {
		super(true);
		let _this = this;
        this.css = "/modules/about/index.css";
		this.title = "About";
		this.classes = "modal hidden";
		this.name ="aboutModal"
		this.content = `
			<div class="strong">Libre<span class="selected">IS</span> - Libre Information System.</div>
			<br>
			<div class="row">OS: Linux</div>
			<div class="row">Backend: Java</div>
			<div class="row">Frontend: JavaScript, JQuery, HTML, CSS</div>	
			<br>
			<div class="row">Author: Volodymyr Cherniyevskyy</div>
			<div class="row">
				<a href="https://www.linkedin.com/in/volodymyr-cherniyevskyy-24962b22b/" target="_blank">LinkedIn</a>
				<a href="https://github.com/tarantulaaha" target="_blank">GitHub</a>
			</div>			
			<br>
			<div class="row">Project GitHub: <a href="https://github.com/bra1nw0rk-com/hcj" target="_blank">bra1nw0rk-com/hcj</a></div>			
			<br>
			<div class="copyright">Copyright &copy; 2022 bra1nw0rk. All rights reserved worldwide.</div>		
		`;
		this.draggable = true;
		this.resizable = true;
		this.button.minimize();
		this.button.close();
		this.icon.info();

	}

}
