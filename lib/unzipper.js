var util = require("util"),
	events = require("events"),
	fs = require("fs"),
	path = require('path'),
	mkdirp = require("mkdirp"),
	admzip = require("adm-zip"),
	async = require("async"),
	configs = require("./config.js");

var aOutputFiles = ["ar", "ar_EG", "ar_SA", "bg", "br", "ca", "cs", "da", "de", "de_AT", "de_CH", "el", "el_CY",
											"en", "en_AU", "en_GB", "en_HK", "en_IE", "en_IN", "en_NZ", "en_PG", "en_SG", "en_ZA", "es",
											"es_AR", "es_BO", "es_CL", "es_CO", "es_MX", "es_PE", "es_UY", "es_VE", "et", "fa", "fi", "fr",
											"fr_BE", "fr_CA", "fr_CH", "fr_LU", "he", "hi", "hr", "hu", "id", "it", "it_CH", "ja", "ko", "lt",
											"lv", "nb", "nl", "nl_BE", "nn", "pl", "pt", "pt_PT", "ro", "ru", "ru_UA", "sk", "sl", "sr", "sv",
											"th", "tr", "uk", "vi", "zh_CN", "zh_HK", "zh_SG", "zh_TW"];

var aCLDRMainFiles = [],
		aCLDRSuppleFiles = ["likelySubtags.json", "currencyData.json", "weekData.json", "calendarPreferenceData.json"],
		aTasks= [];

function needToSave(sPath) {
	var aParts = sPath.split("/");
	switch (aParts[0]) {
		case "main":
			if (aParts[1] === "zh-Hant-HK") {
				return false;
			}
			var aLocaleSplit = aParts[1].split("-"),
					sNewLocale = aLocaleSplit.join("_");
			if (aLocaleSplit.length === 3) {
				aLocaleSplit.splice(1, 1);
				sNewLocale = aLocaleSplit.join("_");
			}
			if (aOutputFiles.indexOf(sNewLocale) !== -1 && aCLDRMainFiles.indexOf(aParts[2]) !== -1) {
				// console.log(path.join(aParts[0], sNewLocale, aParts[2]));
				// return path.join(aParts[0], sNewLocale, aParts[2]);
				return true
			}
		case "supplemental":
			if (aCLDRSuppleFiles.indexOf(aParts[1]) !== -1) {
				// return sPath;
				return true;
			}
		default:
			return false;
	}
}

function Unzipper() {
		if (!(this instanceof Unzipper)) {
			return new Unzipper();
		}
    events.EventEmitter.call(this);
		configs.forEach(function(config, index) {
			var sName = config.filename;
			if (aCLDRMainFiles.indexOf(sName) === -1) {
				aCLDRMainFiles.push(sName);
			}
		});
}

util.inherits(Unzipper, events.EventEmitter);

Unzipper.prototype.extract = function(sZipFile, sOutputFolder) {
	var zip = new admzip(sZipFile),
			aEntries = zip.getEntries(),
			self = this;
			
	aEntries.forEach(function(entry) {
		if (!entry.isDirectory) {
			if (needToSave(entry.entryName)) {
				var sPath = path.join(sOutputFolder, entry.entryName);
				var sDirName = path.dirname(sPath);
				mkdirp.sync(sDirName);
				aTasks.push(function(callback) {
					fs.writeFile(sPath, entry.getData(), function(err) {
						if (err) {
							callback(err);
						} else {
							callback(null, sPath);
						}
					});
				})
			}
		}
	});

	async.parallel(aTasks, function(err, results) {
		if (err) {
			self.emit("error", err);
		} else {
			self.emit("finish", results);
		}
	});
	
	return this;
};

module.exports = Unzipper;