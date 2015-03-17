var fs = require("fs"),
		path = require("path");

var mContent = {};

module.exports = {
	getContent: function(sFilePath) {
		var sFileName = path.resolve(sFilePath);
		if (mContent[sFileName]) {
			return mContent[sFileName];
		}
		
		mContent[sFileName] = JSON.parse(fs.readFileSync(sFilePath, "utf8"));
		return mContent[sFileName];
	},
	clearCache: function() {
		mContent = {};
	}
};