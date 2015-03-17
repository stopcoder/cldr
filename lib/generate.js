require('coffee-script/register');

var path = require("path"),
		fs = require("fs"),
		j2j = require('json2json-openui5'),
		extend = require('extend'),
		mkdirp = require("mkdirp"),
		configs = require("./config.js"),
		util = require("./util.js"),
		fileContent = require("./fileContent.js");
		

module.exports = function (sSrcFolder, sOutputFolder) {
	var sLicense = "This file has been derived from Unicode Common Locale Data Repository (CLDR) files (http://cldr.unicode.org). See the copyright and permission notice in the Unicode-Data-Files-LICENSE.txt available at the same location as this file or visit http://www.unicode.org/copyright.html";
	
	var folderPathMain = path.join(sSrcFolder, "main"),
			folderPathSupple = path.join(sSrcFolder, "supplemental"),
			filePath,
			fileName,
			data,
			result = {},
			outputdata;

	util.setSupplePath(folderPathSupple);
	var aSubFolders = fs.readdirSync(folderPathMain),
			currencyDigits = util.getCurrencyDigits(),
			count = 0;
	
	aSubFolders.forEach(function(tag, index, array) {
		var tagSplit = tag.split("-"),
				newTag = tagSplit.join("_");
		if (tagSplit.length === 3) {
			tagSplit.splice(1, 1);
			newTag = tagSplit.join("_");
		}
		
		var sCalendarPref = util.getCalendarPreference(tag);
		count++;
		result = {"__license": sLicense};
		filePath = path.join(folderPathMain, tag);
		configs.forEach(function(config, index, array) {
			fileName = path.join(filePath, config.filename);
			data = fileContent.getContent(fileName).main[tag];
			outputdata = new j2j.ObjectTemplate(config.template).transform(data);
			extend(true, result, outputdata);
		});
		
		//static
		extend(result, {currencyDigits: currencyDigits});
		extend(result, util.getWeekData(tag));
		
		if (sCalendarPref) {
			extend(result, {
				"calendarPreference": sCalendarPref
			});
		}
		
		fileContent.clearCache();
	
		mkdirp.sync(sOutputFolder);
		fs.writeFileSync(path.join(sOutputFolder, newTag + '.json'), JSON.stringify(result, null, "\t"));
	});
};