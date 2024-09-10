/**
 * @author Volodymyr Cherniyevskyy
 * @copyright bra1nw0rk.
 * {@link https://github.com/bra1nw0rk-com/hcj GitHub}.
 * {@link https://www.linkedin.com/in/volodymyr-cherniyevskyy-24962b22b LinkedIn}
 **/
export default class Module {
	static call(name) {
		return new Promise((resolve) => {
			try {
				import(`/modules/${name}/index.js`)
					.then((containerModule) => {
						if (typeof containerModule.default !== "undefined") {
							this.module = containerModule.default;
							if (typeof this.module == "object") {
								resolve(this.module);
							} else if (typeof this.module == "function") {
								let module = new this.module()
								let create = false;
								if(module.unique === true){
									if($(`${module.selector}`).length === 0){
										create = true;
									}
								}else{
									create = true;
								}
								//WS.ui.effects.show(`${module.selector}`);
								if(create){
									module.prepare()
									resolve(module);
								}else{
									resolve(null)
								}
							}
						} else {
							console.log(`module ${name} hasn't default export`);
							resolve(null);
						}
					})
					.catch((err) => {
						console.log(`Error: ${name} hasnt module`, err);
					});
			} catch (e) {
				console.log(`Error: `, e);
			}
		});
	}
}
