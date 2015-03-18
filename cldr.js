var argv = require("yargs")
			.usage("Usage: $0 [options]")
			.demand("z")
			.alias("z", "zip")
			.describe("z", "The path of original CLDR JSON zip file")
			.demand("o")
			.alias("o", "output")
			.describe("o", "The path of the folder where the generated JSON files are stored")
			.alias("t", "tmp")
			.describe("t", "The temporary folder for storing the needed JSON files extracted from CLDR JSON zip")
			.default("t", "./temp")
			.argv,
		cldr = require("./lib/index.js");

console.log("Starting extracting necessary files from", argv.z);

cldr({
	zip: argv.z,
	tmp: argv.t,
	output: argv.o
}).start().on("filesExtracted", function() {
	console.log("Files extracted, now start generating the UI5 JSON files and write to foler", argv.o);
}).on("filesGenerated", function() {
	console.log("UI5 JSON files generated");
}).on("tempFolderDeleted", function() {
	console.log("TEMP folder deleted");
});

