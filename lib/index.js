var util = require("util"),
		events = require("events"),
		unzipper = require("./unzipper.js"),
		generate = require("./generate.js"),
		rimraf = require("rimraf");
		
function CLDR(oOption) {
		if (!(this instanceof CLDR)) {
			return new CLDR(oOption);
		}
		this._oOption = oOption;
		events.EventEmitter.call(this);
}

util.inherits(CLDR, events.EventEmitter);

CLDR.prototype.start = function() {
	var self = this,
		oOption = this._oOption;
	unzipper()
	.extract(oOption.zip, oOption.tmp)
	.on("finish", function(paths) {
		self.emit("filesExtracted", paths);

		generate(oOption.tmp, oOption.output)
			.start()
			.on("allLocaleJSONReady", function(paths) {
				self.emit("filesGenerated", paths);
			})
			.on("error", function(err) {
				self.emit("error", err);
			});

		rimraf(oOption.tmp, function(err) {
			if (err) {
				self.emit("error", err)
			} else {
				self.emit("tempFolderDeleted", oOption.tmp);
			}
		});
	}).on("error", function(err) {
		self.emit("error", err);
	});

	return this;
};

module.exports = CLDR;
