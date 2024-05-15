class HTMLSelector {
	selector = "";
	/**
	 * @type {null|HTMLSelector}
	 */	closestChildren = null;
	tagName = "";
	classes = new Array();
	ids = new Array();
	/**
	 * @type {null|function|string}
	 */
	selectorType = null;
	/**
	 * @type {null|HTMLSelector}
	 */
	children = null;
	parameters = {};
	constructor(selector) {
		this.selectorType = typeof selector;
		
		if (this.selectorType === "string") {
			/**
			 * @type {Array<String>}
			 */
			let selectors = selector.split(" ");
			// console.log(selectors);
			if (selectors.length > 0) {
				let closestSelectors = selectors[0].split(">");
				this.selector = selectors[0];
				if (closestSelectors.length > 1) {
					this.selector = closestSelectors[0];					
					this.closestChildren = new HTMLSelector(closestSelectors[1]);	
					selectors[0] = selectors[0].replace(`>${closestSelectors[1]}`, "");
				}
				//console.log(this.selector, closestSelectors);
				/**
				 * @todo udelat nejdriv vyber pro prime potomky
				 */

				if (selectors.length > 1) {
					this.children = new HTMLSelector(selector.replace(`${selectors[0]} `, ""));
				}
				selectors[0] = selectors[0].replaceAll(/[\'\"\`]/gim, "");
				/* find all classes in selector */
				let regClass = /\.([^\.\#\[\]\=\'\"]*)/gim;
				let regClassResult = selectors[0].matchAll(regClass);
				if (regClassResult !== null) {
					for (const item of regClassResult) {
						this.classes.push(item[1]);
						selectors[0] = selectors[0].replace(item[0], "");
					}
				}
				/* find all id's in selector */
				let regId = /\#([^\.\#\[\]\=\'\"]*)/gim;
				let regIdResult = selectors[0].matchAll(regId);
				if (regIdResult !== null) {
					for (const item of regIdResult) {
						this.ids.push(item[1]);
						selectors[0] = selectors[0].replace(item[0], "");
					}
				}
				/* find all params in selector */
				let regParam = /\[(.*?)\]/gim;
				let regParamHasValue = /^(.*)=(.*)$/;
				let regParamWithOutValue = /^(.*)$/;
				let regParamResult = selectors[0].matchAll(regParam);
				if (regParamResult !== null) {
					for (const item of regParamResult) {
						let regParamHasValueResult = regParamHasValue.exec(item[1]);
						if (regParamHasValueResult !== null) {
							// this.parameters[regParamHasValueResult[1]] = [];

							this.parameters[regParamHasValueResult[1]] = regParamHasValueResult[2].replaceAll(/[\'\"\`]/gim, "");
							selectors[0] = selectors[0].replace(item[0], "");
							continue;
						}
						let regParamWithOutValueResult = regParamWithOutValue.exec(item[1]);
						if (regParamWithOutValueResult !== null) {
							this.parameters[regParamWithOutValueResult[1]] = "";
							selectors[0] = selectors[0].replace(item[0], "");
						}
					}
				}
				this.tagName = selectors[0];
			}
			// console.log(this);
		}
	}
	
}
globalThis.HTMLSelector = HTMLSelector;
