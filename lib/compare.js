var traverse = require("traverse"),
		fs = require("fs"),
		path = require("path"),
		get = require("get-object-path");
		
var sOldFolder = "../output/new/",
		sNewFolder = "../gen/",
		rNumber = /^\d+$/,
		// aIgnored = ["languages", "territories", "currencyDigits", "currencySymbols"],
		aIgnored = [],
		// aNeedConversion = ["dateFormat", "timeFormat", "dateTimeFormat", "intervalFormat", "months", "days", "quarters", "dayPeriods"],
		aNeedConversion = [],
		mError = {}, oOld, oNew;
		
var aFiles = fs.readdirSync(sOldFolder);
aFiles.forEach(function(fileName, index) {
	if (fileName.indexOf(".json") === -1) {
		return;
	}
	oOld = JSON.parse(fs.readFileSync(path.join(sOldFolder, fileName), "utf8")),
	oNew = JSON.parse(fs.readFileSync(path.join(sNewFolder, fileName), "utf8")),
	mError[fileName] = {};
	traverse(oOld).forEach(function(value) {
		if (this.notLeaf) {
			return;
		}

		var sPath;
		this.path.forEach(function(value, index, array) {
			
			if (index === 0) {
				sPath = value;
			} else {
				sPath += rNumber.test(value) ? ("[" + value + "]") : ("." + value);
			}
		});
		
		var bConvert = aNeedConversion.some(function(value) {
			return this.path[0].indexOf(value) !== -1;
		}, this);
		
		if (bConvert) {
			sPath = "ca-gregorian." + sPath;
		}
		
		var vFetchedValue = get(oNew, sPath);
		
		if (aIgnored.indexOf(this.path[0]) === -1) {
			if (vFetchedValue === undefined || vFetchedValue === null) {
				if (!mError[fileName].a) {
					mError[fileName].a = {};
				}
				mError[fileName]["a"][sPath] = "doesn't exist";
			} else if (vFetchedValue !== value) {
				if (!mError[fileName].b) {
					mError[fileName].b = {};
				}
				mError[fileName]["b"][sPath] = value + ", " + vFetchedValue + " are not equal";
			}
		}
	});
});

fs.writeFileSync("../output/compare.json", JSON.stringify(mError, null, "\t"));
		



		
