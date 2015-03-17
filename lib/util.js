var fs = require("fs"),
		path = require("path"),
		fileContent = require("./fileContent.js");

var sFilePathSupple,
		aDayNames = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];

module.exports = {
	setSupplePath: function(sPath) {
		sFilePathSupple = sPath;
	},
	
	getTerritory: function(tag) {
		var mLikelySubtags = fileContent.getContent(path.join(sFilePathSupple, 'likelySubtags.json')).supplemental.likelySubtags;
				sSubtag = mLikelySubtags[tag] || tag,
				aSplit = sSubtag.split("-");
		
		if (aSplit.length === 2 && aSplit[1].length === 2) {
			return aSplit[1];
		}
		
		if (aSplit.length >=3 && aSplit[1].length === 4 && aSplit[2].length === 2) {
			return aSplit[2];
		}
		
		console.log("failed to determine territory for language tag ", tag, " falling back to 'world'");
		return "001";
	},
	
	getCurrencyDigits: function() {
		var filePath = path.join(sFilePathSupple, "currencyData.json"),
				mFractions = fileContent.getContent(filePath).supplemental.currencyData.fractions,
				currencyCode,
				res= {};

		for (currencyCode in mFractions) {
			res[currencyCode] = parseInt(mFractions[currencyCode]["_digits"]);
		}
		
		return res;
	},
	
	getWeekData: function(tag) {
		var mWeekData = fileContent.getContent(path.join(sFilePathSupple, "weekData.json")).supplemental.weekData,
				sTerritory = this.getTerritory(tag),
				res = {};

		["minDays", "firstDay", "weekendStart", "weekendEnd"].forEach(function(name, index, array) {
			var value = mWeekData[name][sTerritory] || mWeekData[name]["001"];
			res["weekData-" + name] = (name === "minDays") ? parseInt(value) : aDayNames.indexOf(value); 
		});

		return res;
	},
	
	getCalendarPreference: function(tag) {
		var mCalenderPref = fileContent.getContent(path.join(sFilePathSupple, "calendarPreferenceData.json")).supplemental.calendarPreferenceData,
				sTerritory = this.getTerritory(tag);
		return mCalenderPref[sTerritory];
	}
}