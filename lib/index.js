var unzipper = require("./unzipper.js"),
		generate = require("./generate.js");
		
module.exports = function(oOption) {
	console.log("Start extracting json files from", oOption.zip, "to folder", oOption.tmp);
	unzipper().extract(oOption.zip, oOption.tmp).on("finish", function() {
		console.log("Extracting finished, now start UI5 JSON generation");
		generate(oOption.tmp, oOption.output);
		console.log("DONE!");
	}).on("error", function() {
		
	});
};

