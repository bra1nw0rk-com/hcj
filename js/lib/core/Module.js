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
								if(module.unique == true){
									if($(`${module.selector}`).length > 0){
										resolve(null)
									}else{
										resolve(module);	
									}
								}else{
									resolve(module);
								}
							}
						} else {
							console.log(`module ${name} hasnt default export`);
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
