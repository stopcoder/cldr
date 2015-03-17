var unzipper = require("./unzipper.js"),
		generate = require("./generate.js"),
		rimraf = require("rimraf");
		
module.exports = function(oOption) {
	console.log("Start extracting json files from", oOption.zip, "to folder", oOption.tmp);
	unzipper().extract(oOption.zip, oOption.tmp).on("finish", function() {
		console.log("Extracting finished, now start UI5 JSON generation");
		generate(oOption.tmp, oOption.output);
		rimraf(oOption.tmp, function(err) {
			if (err) {
				console.log(oOption.tmp, "folder can't be deleted");
			}
			console.log(oOption.tmp, "folder deleted");
		});
	}).on("error", function() {
		
	});
};

