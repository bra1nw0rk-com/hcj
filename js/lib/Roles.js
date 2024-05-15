import XML from "./XML.mjs";
export default class Roles extends EventTarget {
	tmpRoleId = 0x0;
	tmpResId = 0x0;
	/**
	 * @type {object}
	 */
	result = {};
	xml = new XML();
	url;
	indexed = {
		Role_ID: {},
		RoleName: {},
	};
	static Role = {
		resid: null,
		uri: null,
		menu: null,
	};

	constructor() {
		super();
	}
	on = this.addEventListener;
	/**
	 * @TODO Make save function
	 */
	save() {
		this.xml.save();
	}
	index() {
		this.indexed.Role_ID = {};
		this.indexed.RoleName = {};
		for (const role of this.result) {
			this.indexed.Role_ID[`${role.Role_ID}`] = role;
			this.indexed.RoleName[`${role.RoleName}`] = role;
		}
	}
	addRole(vName, vDesc) {
		this.tmpResId++;
		this.tmpRoleId = this.tmpResId;
		this.result.push({
			RoleName: vName,
			RoleDescription: vDesc,
			RoleIsActive: true,
			tRoleResource: [],
		});

		let $xmlRole = $(
			$.parseXML(/*xml*/ `
			<root>
<tRole>
<Role_ID>${this.tmpRoleId}</Role_ID>				
<BusComponent_ID>0</BusComponent_ID>
<RoleName>${vName}</RoleName>
<RoleDescription>${vDesc}</RoleDescription>				
<RoleIsActive>true</RoleIsActive>
<RoleSODException>false</RoleSODException>
<LastModifiedUser>cherniye</LastModifiedUser>
<tc_Rowid>0x${this.tmpRoleId.toString(16)}</tc_Rowid>
</tRole>
<tTransString>
<tgParentObject_ID>${this.tmpRoleId}</tgParentObject_ID>
<tcLngCode>bu</tcLngCode>
<tcTranslationStringText/>
<tc_ParentRowid>0x${this.tmpRoleId.toString(16)}</tc_ParentRowid>
<tc_Rowid>bu${this.tmpRoleId}</tc_Rowid>
<tc_Status>N</tc_Status>
</tTransString>
<tTransString>
<tgParentObject_ID>${this.tmpRoleId}</tgParentObject_ID>
<tcLngCode>ch</tcLngCode>
<tcTranslationStringText/>
<tc_ParentRowid>0x${this.tmpRoleId.toString(16)}</tc_ParentRowid>
    <tc_Rowid>ch${this.tmpRoleId}</tc_Rowid>
    <tc_Status>N</tc_Status>
  </tTransString>
  <tTransString>
    <tgParentObject_ID>${this.tmpRoleId}</tgParentObject_ID>
    <tcLngCode>cr</tcLngCode>
    <tcTranslationStringText/>
    <tc_ParentRowid>0x${this.tmpRoleId.toString(16)}</tc_ParentRowid>
    <tc_Rowid>cr${this.tmpRoleId}</tc_Rowid>
    <tc_Status>N</tc_Status>
  </tTransString>
  <tTransString>
    <tgParentObject_ID>${this.tmpRoleId}</tgParentObject_ID>
    <tcLngCode>cs</tcLngCode>
    <tcTranslationStringText/>
    <tc_ParentRowid>0x${this.tmpRoleId.toString(16)}</tc_ParentRowid>
    <tc_Rowid>cs${this.tmpRoleId}</tc_Rowid>
    <tc_Status>N</tc_Status>
  </tTransString>
  <tTransString>
    <tgParentObject_ID>${this.tmpRoleId}</tgParentObject_ID>
    <tcLngCode>cz</tcLngCode>
    <tcTranslationStringText/>
    <tc_ParentRowid>0x${this.tmpRoleId.toString(16)}</tc_ParentRowid>
    <tc_Rowid>cz${this.tmpRoleId}</tc_Rowid>
    <tc_Status>N</tc_Status>
  </tTransString>
  <tTransString>
    <tgParentObject_ID>${this.tmpRoleId}</tgParentObject_ID>
    <tcLngCode>da</tcLngCode>
    <tcTranslationStringText/>
    <tc_ParentRowid>0x${this.tmpRoleId.toString(16)}</tc_ParentRowid>
    <tc_Rowid>da${this.tmpRoleId}</tc_Rowid>
    <tc_Status>N</tc_Status>
  </tTransString>
  <tTransString>
    <tgParentObject_ID>${this.tmpRoleId}</tgParentObject_ID>
    <tcLngCode>du</tcLngCode>
    <tcTranslationStringText/>
    <tc_ParentRowid>0x${this.tmpRoleId.toString(16)}</tc_ParentRowid>
    <tc_Rowid>du${this.tmpRoleId}</tc_Rowid>
    <tc_Status>N</tc_Status>
  </tTransString>
  <tTransString>
    <tgParentObject_ID>${this.tmpRoleId}</tgParentObject_ID>
    <tcLngCode>fi</tcLngCode>
    <tcTranslationStringText/>
    <tc_ParentRowid>0x${this.tmpRoleId.toString(16)}</tc_ParentRowid>
    <tc_Rowid>fi${this.tmpRoleId}</tc_Rowid>
    <tc_Status>N</tc_Status>
  </tTransString>
  <tTransString>
    <tgParentObject_ID>${this.tmpRoleId}</tgParentObject_ID>
    <tcLngCode>fr</tcLngCode>
    <tcTranslationStringText/>
    <tc_ParentRowid>0x${this.tmpRoleId.toString(16)}</tc_ParentRowid>
    <tc_Rowid>fr${this.tmpRoleId}</tc_Rowid>
    <tc_Status>N</tc_Status>
  </tTransString>
  <tTransString>
    <tgParentObject_ID>${this.tmpRoleId}</tgParentObject_ID>
    <tcLngCode>ge</tcLngCode>
    <tcTranslationStringText/>
    <tc_ParentRowid>0x${this.tmpRoleId.toString(16)}</tc_ParentRowid>
    <tc_Rowid>ge${this.tmpRoleId}</tc_Rowid>
    <tc_Status>N</tc_Status>
  </tTransString>
  <tTransString>
    <tgParentObject_ID>${this.tmpRoleId}</tgParentObject_ID>
    <tcLngCode>gr</tcLngCode>
    <tcTranslationStringText/>
    <tc_ParentRowid>0x${this.tmpRoleId.toString(16)}</tc_ParentRowid>
    <tc_Rowid>gr${this.tmpRoleId}</tc_Rowid>
    <tc_Status>N</tc_Status>
  </tTransString>
  <tTransString>
    <tgParentObject_ID>${this.tmpRoleId}</tgParentObject_ID>
    <tcLngCode>hu</tcLngCode>
    <tcTranslationStringText/>
    <tc_ParentRowid>0x${this.tmpRoleId.toString(16)}</tc_ParentRowid>
    <tc_Rowid>hu${this.tmpRoleId}</tc_Rowid>
    <tc_Status>N</tc_Status>
  </tTransString>
  <tTransString>
    <tgParentObject_ID>${this.tmpRoleId}</tgParentObject_ID>
    <tcLngCode>it</tcLngCode>
    <tcTranslationStringText/>
    <tc_ParentRowid>0x${this.tmpRoleId.toString(16)}</tc_ParentRowid>
    <tc_Rowid>it${this.tmpRoleId}</tc_Rowid>
    <tc_Status>N</tc_Status>
  </tTransString>
  <tTransString>
    <tgParentObject_ID>${this.tmpRoleId}</tgParentObject_ID>
    <tcLngCode>jp</tcLngCode>
    <tcTranslationStringText/>
    <tc_ParentRowid>0x${this.tmpRoleId.toString(16)}</tc_ParentRowid>
    <tc_Rowid>jp${this.tmpRoleId}</tc_Rowid>
    <tc_Status>N</tc_Status>
  </tTransString>
  <tTransString>
    <tgParentObject_ID>${this.tmpRoleId}</tgParentObject_ID>
    <tcLngCode>ko</tcLngCode>
    <tcTranslationStringText/>
    <tc_ParentRowid>0x${this.tmpRoleId.toString(16)}</tc_ParentRowid>
    <tc_Rowid>ko${this.tmpRoleId}</tc_Rowid>
    <tc_Status>N</tc_Status>
  </tTransString>
  <tTransString>
    <tgParentObject_ID>${this.tmpRoleId}</tgParentObject_ID>
    <tcLngCode>ls</tcLngCode>
    <tcTranslationStringText/>
    <tc_ParentRowid>0x${this.tmpRoleId.toString(16)}</tc_ParentRowid>
    <tc_Rowid>ls${this.tmpRoleId}</tc_Rowid>
    <tc_Status>N</tc_Status>
  </tTransString>
  <tTransString>
    <tgParentObject_ID>${this.tmpRoleId}</tgParentObject_ID>
    <tcLngCode>lt</tcLngCode>
    <tcTranslationStringText/>
    <tc_ParentRowid>0x${this.tmpRoleId.toString(16)}</tc_ParentRowid>
    <tc_Rowid>lt${this.tmpRoleId}</tc_Rowid>
    <tc_Status>N</tc_Status>
  </tTransString>
  <tTransString>
    <tgParentObject_ID>${this.tmpRoleId}</tgParentObject_ID>
    <tcLngCode>no</tcLngCode>
    <tcTranslationStringText/>
    <tc_ParentRowid>0x${this.tmpRoleId.toString(16)}</tc_ParentRowid>
    <tc_Rowid>no${this.tmpRoleId}</tc_Rowid>
    <tc_Status>N</tc_Status>
  </tTransString>
  <tTransString>
    <tgParentObject_ID>${this.tmpRoleId}</tgParentObject_ID>
    <tcLngCode>pl</tcLngCode>
    <tcTranslationStringText/>
    <tc_ParentRowid>0x${this.tmpRoleId.toString(16)}</tc_ParentRowid>
    <tc_Rowid>pl${this.tmpRoleId}</tc_Rowid>
    <tc_Status>N</tc_Status>
  </tTransString>
  <tTransString>
    <tgParentObject_ID>${this.tmpRoleId}</tgParentObject_ID>
    <tcLngCode>po</tcLngCode>
    <tcTranslationStringText/>
    <tc_ParentRowid>0x${this.tmpRoleId.toString(16)}</tc_ParentRowid>
    <tc_Rowid>po${this.tmpRoleId}</tc_Rowid>
    <tc_Status>N</tc_Status>
  </tTransString>
  <tTransString>
    <tgParentObject_ID>${this.tmpRoleId}</tgParentObject_ID>
    <tcLngCode>ro</tcLngCode>
    <tcTranslationStringText/>
    <tc_ParentRowid>0x${this.tmpRoleId.toString(16)}</tc_ParentRowid>
    <tc_Rowid>ro${this.tmpRoleId}</tc_Rowid>
    <tc_Status>N</tc_Status>
  </tTransString>
  <tTransString>
    <tgParentObject_ID>${this.tmpRoleId}</tgParentObject_ID>
    <tcLngCode>ru</tcLngCode>
    <tcTranslationStringText/>
    <tc_ParentRowid>0x${this.tmpRoleId.toString(16)}</tc_ParentRowid>
    <tc_Rowid>ru${this.tmpRoleId}</tc_Rowid>
    <tc_Status>N</tc_Status>
  </tTransString>
  <tTransString>
    <tgParentObject_ID>${this.tmpRoleId}</tgParentObject_ID>
    <tcLngCode>si</tcLngCode>
    <tcTranslationStringText/>
    <tc_ParentRowid>0x${this.tmpRoleId.toString(16)}</tc_ParentRowid>
    <tc_Rowid>si${this.tmpRoleId}</tc_Rowid>
    <tc_Status>N</tc_Status>
  </tTransString>
  <tTransString>
    <tgParentObject_ID>${this.tmpRoleId}</tgParentObject_ID>
    <tcLngCode>sk</tcLngCode>
    <tcTranslationStringText/>
    <tc_ParentRowid>0x${this.tmpRoleId.toString(16)}</tc_ParentRowid>
    <tc_Rowid>sk${this.tmpRoleId}</tc_Rowid>
    <tc_Status>N</tc_Status>
  </tTransString>
  <tTransString>
    <tgParentObject_ID>${this.tmpRoleId}</tgParentObject_ID>
    <tcLngCode>sw</tcLngCode>
    <tcTranslationStringText/>
    <tc_ParentRowid>0x${this.tmpRoleId.toString(16)}</tc_ParentRowid>
    <tc_Rowid>sw${this.tmpRoleId}</tc_Rowid>
    <tc_Status>N</tc_Status>
  </tTransString>
  <tTransString>
    <tgParentObject_ID>${this.tmpRoleId}</tgParentObject_ID>
    <tcLngCode>tu</tcLngCode>
    <tcTranslationStringText/>
    <tc_ParentRowid>0x${this.tmpRoleId.toString(16)}</tc_ParentRowid>
    <tc_Rowid>tu${this.tmpRoleId}</tc_Rowid>
    <tc_Status>N</tc_Status>
  </tTransString>
  <tTransString>
    <tgParentObject_ID>${this.tmpRoleId}</tgParentObject_ID>
    <tcLngCode>tw</tcLngCode>
    <tcTranslationStringText/>
    <tc_ParentRowid>0x${this.tmpRoleId.toString(16)}</tc_ParentRowid>
    <tc_Rowid>tw${this.tmpRoleId}</tc_Rowid>
    <tc_Status>N</tc_Status>
  </tTransString>
  <tTransString>
    <tgParentObject_ID>${this.tmpRoleId}</tgParentObject_ID>
    <tcLngCode>ua</tcLngCode>
    <tcTranslationStringText/>
    <tc_ParentRowid>0x${this.tmpRoleId.toString(16)}</tc_ParentRowid>
    <tc_Rowid>ua${this.tmpRoleId}</tc_Rowid>
    <tc_Status>N</tc_Status>
  </tTransString>
  <tTransString>
    <tgParentObject_ID>${this.tmpRoleId}</tgParentObject_ID>
    <tcLngCode>us</tcLngCode>
    <tcTranslationStringText/>
    <tc_ParentRowid>0x${this.tmpRoleId.toString(16)}</tc_ParentRowid>
    <tc_Rowid>us${this.tmpRoleId}</tc_Rowid>
    <tc_Status>N</tc_Status>
  </tTransString>
  </root>
    	`)
		).find("tRole, tTransString");
		//console.log($xmlRole);
		this.xml.content.find("BRole").append($xmlRole);
		this.index();
	}
	removeMenu(roleId, rowId) {
		let forChange = this.findInIndexed("Role_ID", roleId);
		if (Object.keys(forChange).length > 0) {
			//console.log(forChange.tRoleResource);
			let forDelete = forChange.tRoleResource.filter(function (el) {
				return el.tc_Rowid === rowId;
			});
			let nodesToAction = this.xml.content
				.find("tRole>Role_ID")
				.filter(function () {
					return $(this).text().trim() === roleId;
				})
				.parent()
				.find("tRoleResource>tc_Rowid")
				.filter(function () {
					return $(this).text().trim() === rowId;
				})
				.parent()
				.remove();			
		}
	}
	addMenu(roleName, resid, uri) {
		this.tmpResId++;
		let forChange = this.findInIndexed("RoleName", roleName);
		if (Object.keys(forChange).length > 0) {
			forChange.tRoleResource.push({
				Resource_ID: resid,
				tcResourceURI: uri,
			});
		}
		let _parentRowid = this.xml.content
			.find("tRole>RoleName")
			.filter(function () {
				return $.trim($(this).text()) === roleName;
			})
			.parent()
			.find("tRole>tc_Rowid")[0].innerHTML;
		let parentRowid = `0x${this.tmpRoleId.toString(16)}`;
		if (_parentRowid !== null) {
			parentRowid = _parentRowid;
		}
		let _Role_ID = this.xml.content
			.find("tRole>RoleName")
			.filter(function () {
				return $.trim($(this).text()) === roleName;
			})
			.parent()
			.find("tRole>Role_ID")[0].innerHTML;
		let Role_ID = `${this.tmpRoleId}`;
		if (_Role_ID !== null) {
			Role_ID = _Role_ID;
		}
		//console.log(Role_ID, parentRowid);
		let $xmlMenu = $(
			$.parseXML(/*xml*/ `			
<tRoleResource>				
	<Role_ID>${Role_ID}</Role_ID>
	<Resource_ID>${resid}</Resource_ID>
	<RoleResource_ID>${this.tmpResId}</RoleResource_ID>
	<RoleResourceIsDefault>false</RoleResourceIsDefault>
	<tcResourceURI>${uri}</tcResourceURI>
	<tc_ParentRowid>${parentRowid}</tc_ParentRowid>
	<tc_Rowid>0x777777${this.tmpResId.toString(16)}</tc_Rowid>
</tRoleResource>
`)
		).find("tRoleResource");
		this.xml.content
			.find("tRole>RoleName")
			.filter(function () {
				return $.trim($(this).text()) === roleName;
			})
			.parent()
			.append($xmlMenu);
		let existsInIt = this.xml.content
			.find(`tRole Role_ID:contains('282451')`)
			.parent()
			.find("tRole>RoleName")
			.filter(function () {
				return $.trim($(this).text()) === roleName;
			});
		if (existsInIt.length == 0) {
			let $4it_xmlMenu = $(
				$.parseXML(/*xml*/ `			
<tRoleResource>				
	<Role_ID>282451</Role_ID>
	<Resource_ID>${resid}</Resource_ID>
	<RoleResource_ID>${this.tmpResId}</RoleResource_ID>
	<RoleResourceIsDefault>false</RoleResourceIsDefault>
	<tcResourceURI>${uri}</tcResourceURI>
	<tc_ParentRowid>0x000000000005868d</tc_ParentRowid>
	<tc_Rowid>0x888888f${this.tmpResId.toString(16)}</tc_Rowid>
</tRoleResource>
`)
			).find("tRoleResource");
			this.xml.content.find(`tRole>Role_ID:contains('282451')`).parent().append($4it_xmlMenu);
		}
		this.index();
	}
	createFile() {
		this.file = new File([JSON.stringify(this.result)], "roles.json", { type: "application/json" });
		this.url = URL.createObjectURL(this.file);
	}
	load(filename) {
		let _this = this;
		this.xml.load(filename);
		this.xml.on("ready", function () {
			_this.result = _this.xml.getNodes("tRole", null)["tRole"];
			if (_this.result) {
				_this.index();
			}
			//_this.createFile();
			_this.dispatchEvent(new Event("ready"));
		});
	}
	find(name, val) {
		for (const role of this.result) {
			if (typeof role[name] !== "undefined") {
				if (role[name] === val) {
					return true;
				}
			}
		}
		return false;
	}
	filter(name, val) {
		return this.result.filter((el) => {
			return new RegExp(val, "gm").test(el[name]);
		});
	}
	findInIndexed(name, val) {
		if (typeof this.indexed[name][val] !== "undefined") {
			return this.indexed[name][val];
		} else {
			return {};
		}
	}
}
