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

cldr({
	zip: argv.z,
	tmp: argv.t,
	output: argv.o
});