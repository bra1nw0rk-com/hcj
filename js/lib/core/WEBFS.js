/**
 * @author Volodymyr Cherniyevskyy
 * @copyright bra1nw0rk.
 * {@link https://github.com/bra1nw0rk-com/hcj GitHub}.
 * {@link https://www.linkedin.com/in/volodymyr-cherniyevskyy-24962b22b LinkedIn}
 **/
export default class WEBFS {
	static async api(url, json, callback) {
		return new Promise((resolve) => {
			fetch(url, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					"Accept": "application/json",
				},
				mode: "cors",
				body: JSON.stringify(json),
			})
				.then((response) => {
					if (!response.ok) {
						throw new Error("Network response was not ok");
					}
					//return response.json();
				})
				.then((data) => {
					let json = {};
					try {
						if(typeof callback === 'function') {
							callback(data);
						}
						resolve(data)
					} catch (e) {
						throw e;
					}
				})
				.catch((error) => {
					console.error("There was a problem with the fetch operation:", error);
				});
		})
	}




	static extTypes = {
		"3gp": "video/3gpp",
		a: "application/octet-stream",
		ai: "application/postscript",
		aif: "audio/x-aiff",
		aiff: "audio/x-aiff",
		asc: "application/pgp-signature",
		asf: "video/x-ms-asf",
		asm: "text/x-asm",
		asx: "video/x-ms-asf",
		atom: "application/atom+xml",
		au: "audio/basic",
		avi: "video/x-msvideo",
		bat: "application/x-msdownload",
		bin: "application/octet-stream",
		bmp: "image/bmp",
		bz2: "application/x-bzip2",
		c: "text/x-c",
		cab: "application/vnd.ms-cab-compressed",
		cc: "text/x-c",
		chm: "application/vnd.ms-htmlhelp",
		class: "application/octet-stream",
		com: "application/x-msdownload",
		conf: "text/plain",
		cpp: "text/x-c",
		crt: "application/x-x509-ca-cert",
		css: "text/css",
		csv: "text/csv",
		cxx: "text/x-c",
		deb: "application/x-debian-package",
		der: "application/x-x509-ca-cert",
		diff: "text/x-diff",
		djv: "image/vnd.djvu",
		djvu: "image/vnd.djvu",
		dll: "application/x-msdownload",
		dmg: "application/octet-stream",
		doc: "application/msword",
		dot: "application/msword",
		dtd: "application/xml-dtd",
		dvi: "application/x-dvi",
		ear: "application/java-archive",
		eml: "message/rfc822",
		eps: "application/postscript",
		exe: "application/x-msdownload",
		f: "text/x-fortran",
		f77: "text/x-fortran",
		f90: "text/x-fortran",
		flv: "video/x-flv",
		for: "text/x-fortran",
		gem: "application/octet-stream",
		gemspec: "text/x-script.ruby",
		gif: "image/gif",
		gz: "application/x-gzip",
		h: "text/x-c",
		hh: "text/x-c",
		htm: "text/html",
		html: "text/html",
		ico: "image/vnd.microsoft.icon",
		ics: "text/calendar",
		ifb: "text/calendar",
		iso: "application/octet-stream",
		jar: "application/java-archive",
		java: "text/x-java-source",
		jnlp: "application/x-java-jnlp-file",
		jpeg: "image/jpeg",
		jpg: "image/jpeg",
		js: "application/javascript",
		json: "application/json",
		log: "text/plain",
		m3u: "audio/x-mpegurl",
		m4v: "video/mp4",
		man: "text/troff",
		mathml: "application/mathml+xml",
		mbox: "application/mbox",
		mdoc: "text/troff",
		me: "text/troff",
		mid: "audio/midi",
		midi: "audio/midi",
		mime: "message/rfc822",
		mjs: "application/javascript",
		mml: "application/mathml+xml",
		mng: "video/x-mng",
		mov: "video/quicktime",
		mp3: "audio/mpeg",
		mp4: "video/mp4",
		mp4v: "video/mp4",
		mpeg: "video/mpeg",
		mpg: "video/mpeg",
		ms: "text/troff",
		msi: "application/x-msdownload",
		odp: "application/vnd.oasis.opendocument.presentation",
		ods: "application/vnd.oasis.opendocument.spreadsheet",
		odt: "application/vnd.oasis.opendocument.text",
		ogg: "application/ogg",
		p: "text/x-pascal",
		pas: "text/x-pascal",
		pbm: "image/x-portable-bitmap",
		pdf: "application/pdf",
		pem: "application/x-x509-ca-cert",
		pgm: "image/x-portable-graymap",
		pgp: "application/pgp-encrypted",
		pkg: "application/octet-stream",
		pl: "text/x-script.perl",
		pm: "text/x-script.perl-module",
		png: "image/png",
		pnm: "image/x-portable-anymap",
		ppm: "image/x-portable-pixmap",
		pps: "application/vnd.ms-powerpoint",
		ppt: "application/vnd.ms-powerpoint",
		ps: "application/postscript",
		psd: "image/vnd.adobe.photoshop",
		py: "text/x-script.python",
		qt: "video/quicktime",
		ra: "audio/x-pn-realaudio",
		rake: "text/x-script.ruby",
		ram: "audio/x-pn-realaudio",
		rar: "application/x-rar-compressed",
		rb: "text/x-script.ruby",
		rdf: "application/rdf+xml",
		roff: "text/troff",
		rpm: "application/x-redhat-package-manager",
		rss: "application/rss+xml",
		rtf: "application/rtf",
		ru: "text/x-script.ruby",
		s: "text/x-asm",
		scss: "text/scss",
		sgm: "text/sgml",
		sgml: "text/sgml",
		sh: "application/x-sh",
		sig: "application/pgp-signature",
		snd: "audio/basic",
		so: "application/octet-stream",
		svg: "image/svg+xml",
		svgz: "image/svg+xml",
		swf: "application/x-shockwave-flash",
		t: "text/troff",
		tar: "application/x-tar",
		tbz: "application/x-bzip-compressed-tar",
		tcl: "application/x-tcl",
		tex: "application/x-tex",
		texi: "application/x-texinfo",
		texinfo: "application/x-texinfo",
		text: "text/plain",
		tif: "image/tiff",
		tiff: "image/tiff",
		torrent: "application/x-bittorrent",
		tr: "text/troff",
		txt: "text/plain",
		vcf: "text/x-vcard",
		vcs: "text/x-vcalendar",
		vrml: "model/vrml",
		war: "application/java-archive",
		wav: "audio/x-wav",
		wma: "audio/x-ms-wma",
		wmv: "video/x-ms-wmv",
		wmx: "video/x-ms-wmx",
		wrl: "model/vrml",
		wsdl: "application/wsdl+xml",
		xbm: "image/x-xbitmap",
		xhtml: "application/xhtml+xml",
		xls: "application/vnd.ms-excel",
		xml: "application/xml",
		xpm: "image/x-xpixmap",
		xsl: "application/xml",
		xslt: "application/xslt+xml",
		yaml: "text/yaml",
		yml: "text/yaml",
		zip: "application/zip",
	};

	static get_url_extension(url) {
		return url.split(/[#?]/)[0].split(".").pop().trim();
	}
	/**
	 * @param {string} ext
	 * @return {String}
	 */
	static getContentType(ext) {
		let result = "text/html";
		let i = ext.toLowerCase().lastIndexOf(".");
		let _ext = i < 0 ? "" : ext.substring(i + 1);
		if (typeof this.extTypes[_ext] !== "undefined") {
			result = this.extTypes[_ext];
		}
		return result;
	}
	static fileInfo(url) {
		try {
			return new URL(url);
		} catch (e) {
			url = location.protocol + "//" + location.hostname + url;
			//console.log(`WEBFS:fileInfo:${url}`);
			try {
				return new URL(url);
			} catch (e) {
				console.log(e, url);
				return null;
			}
		}
	}

	static get(url, callback) {
		const xhr = new XMLHttpRequest();
		//console.log("href:" + location.href);
		let fileInfo = this.fileInfo(url);
		//console.log(fileInfo);
		/*
		xhr.onload = function () {
			callback(this.response);
		};
		*/
		xhr.onreadystatechange = function () {
			if (this.readyState === 4) {
				if (this.status === 200) {
					callback(this.response);
				}
			} else {
				callback("");
			}
		};
		xhr.open("GET", url + "?v=" + Math.random() * 1000000000000000000, true);
		//console.log(fileInfo);
		xhr.setRequestHeader("Content-Type", this.getContentType(this.get_url_extension(url)));
		xhr.send();
	}
	static syncGet(url) {
		const xhr = new XMLHttpRequest();
		xhr.open("GET", url, false);
		xhr.send(null);
		if (xhr.status === 200) {
			return xhr.responseText;
		} else {
			console.log("Request failed: " + xhr.statusText);
			return "";
		}
	}



	static post(url, params = {}, callback) {
		const xhr = new XMLHttpRequest();
		const urlEncodedDataPairs = [];
		for (const [name, value] of Object.entries(params)) {
			urlEncodedDataPairs.push(`${encodeURIComponent(name)}=${encodeURIComponent(value)}`);
		}
		const urlEncodedData = urlEncodedDataPairs.join("&").replace(/%20/g, "+");
		xhr.onload = function () {
			callback(this.response);
		};
		xhr.onreadystatechange = function () {
			if (this.readyState == 4) {
				if (this.status == 200) {
				} else {
				}
			}
		};
		xhr.open("POST", url);
		xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
		xhr.send(urlEncodedData);
	}
}
