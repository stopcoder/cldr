module.exports = [
	{
		filename: "languages.json",
		template: {
			path: "localeDisplayNames.languages",
			as: {
				"languages": {
					path: ".",
					all: true,
					format: function(node, value, key) {
						return {
							key: key.replace("-", "_")
						};
					}
				}
			}
		}
	},
	{
		filename: "scripts.json",
		template: {
			path: "localeDisplayNames",
			choose: ["scripts"]
		}
	},
	{
		filename: "territories.json",
		template: {
			path: "localeDisplayNames",
			choose: ["territories"]
		}
	},
	{
		filename: "layout.json",
		template: {
			path: "layout.orientation",
			choose: ["characterOrder"],
			format: function(node, value, key) {
				return {
					key: "orientation"
				};
			}
		}
	},
	
	//gregorian
	{
		filename: "ca-gregorian.json",
		template: {
			path: "dates.calendars.gregorian",
			as: {
				"ca-gregorian": {
					path: ".",
					choose: ["dateFormats", "timeFormats"],
					format: function(node, value, key) {
						var aResult = [],
								name;
						for (name in value) {
							aResult.push({
								key:  key.substring(0, key.length - 1) + "-" + name,
								value: value[name]
							});
						}
						return aResult;
					}
				}
			}
		}
	},
	{
		filename: "ca-gregorian.json",
		template: {
			path: "dates.calendars.gregorian.dateTimeFormats",
			as: {
				"ca-gregorian": {
					path: ".",
					choose: ["full", "long", "medium", "short"],
					format: function(node, value, key) {
						return {
							key: "dateTimeFormat-" + key
						};
					}
				}
			}
		}
	},
	{
		filename: "ca-gregorian.json",
		template: {
			path: "dates.calendars.gregorian.dateTimeFormats.intervalFormats",
			as: {
				"ca-gregorian": {
					path: ".",
					all: true,
					format: function(node, value, key) {
						if (key === "intervalFormatFallback") {
							return {
								key: "intervalFormatFallback"
							};
						}
						var aResult = [],
								name;
						for (name in value) {
							aResult.push({
								key: "intervalFormat" + "-" + key + "-" + name,
								value: value[name]
							});
						}
						return aResult;
					}
				}
			}
		}
	},
	{
		filename: "ca-gregorian.json",
		template: {
			path: "dates.calendars.gregorian",
			as: {
				"ca-gregorian": {
					path: ".",
					choose: ["months", "days", "quarters", "dayPeriods"],
					format: function(node, value, key) {
						var aResult = [], name1, name2, mData, aData,
								mConfig = {
									months: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"],
									days: ["sun", "mon", "tue", "wed", "thu", "fri", "sat"],
									quarters: ["1", "2", "3", "4"],
									dayPeriods: ["am", "pm"]
								};
						
						for (name1 in value) {
							for (name2 in value[name1]) {
								aData = [];
								mData = value[name1][name2];
								mConfig[key].forEach(function(keyName, index, array) {
									aData.push(mData[keyName]);
								});
								aResult.push({
									key: (key + "-" + name1 + "-" + name2).replace("stand-alone", "standAlone"),
									value: aData
								});
							}
						}
						return aResult;
					}
				}
			}
		}
	},
	// islamic-umalqura
	{
		filename: "ca-islamic-umalqura.json",
		template: {
			path: "dates.calendars.islamic-umalqura",
			as: {
				"ca-islamic-umalqura": {
					path: ".",
					choose: ["dateFormats", "timeFormats"],
					format: function(node, value, key) {
						var aResult = [],
								name;
						for (name in value) {
							aResult.push({
								key:  key.substring(0, key.length - 1) + "-" + name,
								value: value[name]
							});
						}
						return aResult;
					}
				}
			}
		}
	},
	{
		filename: "ca-islamic-umalqura.json",
		template: {
			path: "dates.calendars.islamic-umalqura.dateTimeFormats",
			as: {
				"ca-islamic-umalqura": {
					path: ".",
					choose: ["full", "long", "medium", "short"],
					format: function(node, value, key) {
						return {
							key: "dateTimeFormat-" + key
						};
					}
				}
			}
		}
	},
	{
		filename: "ca-islamic-umalqura.json",
		template: {
			path: "dates.calendars.islamic-umalqura.dateTimeFormats.intervalFormats",
			as: {
				"ca-islamic-umalqura": {
					path: ".",
					all: true,
					format: function(node, value, key) {
						if (key === "intervalFormatFallback") {
							return {
								key: "intervalFormatFallback"
							};
						}
						var aResult = [],
								name;
						for (name in value) {
							aResult.push({
								key: "intervalFormat" + "-" + key + "-" + name,
								value: value[name]
							});
						}
						return aResult;
					}
				}
			}
		}
	},
	{
		filename: "ca-islamic-umalqura.json",
		template: {
			path: "dates.calendars.islamic-umalqura",
			as: {
				"ca-islamic-umalqura": {
					path: ".",
					choose: ["months", "days", "quarters", "dayPeriods"],
					format: function(node, value, key) {
						var aResult = [], name1, name2, mData, aData,
								mConfig = {
									months: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"],
									days: ["sun", "mon", "tue", "wed", "thu", "fri", "sat"],
									quarters: ["1", "2", "3", "4"],
									dayPeriods: ["am", "pm"]
								};
						
						for (name1 in value) {
							for (name2 in value[name1]) {
								aData = [];
								mData = value[name1][name2];
								mConfig[key].forEach(function(keyName, index, array) {
									aData.push(mData[keyName]);
								});
								aResult.push({
									key: (key + "-" + name1 + "-" + name2).replace("stand-alone", "standAlone"),
									value: aData
								});
							}
						}
						return aResult;
					}
				}
			}
		}
	},
	
	// islamic-civil
	{
		filename: "ca-islamic-civil.json",
		template: {
			path: "dates.calendars.islamic-civil",
			as: {
				"ca-islamic-civil": {
					path: ".",
					choose: ["dateFormats", "timeFormats"],
					format: function(node, value, key) {
						var aResult = [],
								name;
						for (name in value) {
							aResult.push({
								key:  key.substring(0, key.length - 1) + "-" + name,
								value: value[name]
							});
						}
						return aResult;
					}
				}
			}
		}
	},
	{
		filename: "ca-islamic-civil.json",
		template: {
			path: "dates.calendars.islamic-civil.dateTimeFormats",
			as: {
				"ca-islamic-civil": {
					path: ".",
					choose: ["full", "long", "medium", "short"],
					format: function(node, value, key) {
						return {
							key: "dateTimeFormat-" + key
						};
					}
				}
			}
		}
	},
	{
		filename: "ca-islamic-civil.json",
		template: {
			path: "dates.calendars.islamic-civil.dateTimeFormats.intervalFormats",
			as: {
				"ca-islamic-civil": {
					path: ".",
					all: true,
					format: function(node, value, key) {
						if (key === "intervalFormatFallback") {
							return {
								key: "intervalFormatFallback"
							};
						}
						var aResult = [],
								name;
						for (name in value) {
							aResult.push({
								key: "intervalFormat" + "-" + key + "-" + name,
								value: value[name]
							});
						}
						return aResult;
					}
				}
			}
		}
	},
	{
		filename: "ca-islamic-civil.json",
		template: {
			path: "dates.calendars.islamic-civil",
			as: {
				"ca-islamic-civil": {
					path: ".",
					choose: ["months", "days", "quarters", "dayPeriods"],
					format: function(node, value, key) {
						var aResult = [], name1, name2, mData, aData,
								mConfig = {
									months: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"],
									days: ["sun", "mon", "tue", "wed", "thu", "fri", "sat"],
									quarters: ["1", "2", "3", "4"],
									dayPeriods: ["am", "pm"]
								};
						
						for (name1 in value) {
							for (name2 in value[name1]) {
								aData = [];
								mData = value[name1][name2];
								mConfig[key].forEach(function(keyName, index, array) {
									aData.push(mData[keyName]);
								});
								aResult.push({
									key: (key + "-" + name1 + "-" + name2).replace("stand-alone", "standAlone"),
									value: aData
								});
							}
						}
						return aResult;
					}
				}
			}
		}
	},
	{
		filename: "dateFields.json",
		template: {
			path: "dates.fields",
			choose: ["year", "month", "day"],
			format: function(node, value, key) {
				var aResult = [],
						mSelectedProperties = {
							"displayName": "displayName",
							"relative--1": "relative-type--1",
							"relative-0": "relative-type-0",
							"relative-1": "relative-type-1",
							"relativeTime-type-future": {
								"relative-future-other": "relativeTimePattern-count-other"
							},
							"relativeTime-type-past": {
								"relative-past-other": "relativeTimePattern-count-other"
							}
						}, name, name1, outputName;
				
				for (name in mSelectedProperties) {
					outputName = mSelectedProperties[name];
					if (typeof outputName === "string") {
						aResult.push({
							key: "dateField-" + key + "-" + name,
							value: value[outputName]
						});
					} else {
						for (name1 in outputName) {
							aResult.push({
								key: "dateField-" + key + "-" + name1,
								value: value[name][outputName[name1]]
							});
						}
					}
				}
				return aResult;
			}
		}
	},
	{
		filename: "numbers.json",
		template: {
			path: "numbers.decimalFormats-numberSystem-latn",
			as: {
				"decimalFormat": {
					path: ".",
					choose: ["standard"]
				}
			}
		}
	},
	{
		filename: "numbers.json",
		template: {
			path: "numbers.decimalFormats-numberSystem-latn.",
			choose: ["long", "short"],
			format: function(node, value, key) {
				var name, mData = value.decimalFormat, mChangedData = {};
				for (name in mData) {
					mChangedData[name.replace("-count-", "-")] = mData[name];
				}
				return {
					key: "decimalFormat-" + key,
					value: mChangedData
				};
			}
		}
	},
	{
		filename: "numbers.json",
		template: {
			path: "numbers",
			choose: ["scientificFormats-numberSystem-latn", "percentFormats-numberSystem-latn", "currencyFormats-numberSystem-latn"],
			format: function(node, value, key) {
				if (key === "currencyFormats-numberSystem-latn") {
					value = {
						standard: value.standard,
						accounting: value.accounting
					};
				}
				
				return {
					key: key.replace("s-numberSystem-latn", ""),
					value: value
				};
			}
		}
	},
	{
		filename: "numbers.json",
		template: {
			path: "numbers.symbols-numberSystem-latn",
			all: true,
			format: function(node, value, key) {
				return {
					key: "symbols-latn-" + key
				}
			}
		}
	},
	/*{
		filename: "currencies.json",
		template: {
			path: "numbers",
			choose: ["currencies"],
			format: function(node, value, key) {
				var name, aNames = [];
				for (name in value) {
					aNames.push(name);
				}
				return {
					value: aNames
				};
			}
		}
	},*/
	{
		filename: "currencies.json",
		template: {
			path: "numbers.currencies",
			as: {
				"currencySymbols": {
					path: ".",
					choose: function(node, value, key) {
						return value.symbol && value.symbol !== key;
					},
					format: function(node, value, key) {
						return {
							value: value.symbol
						}
					}
				}
			}
		}
	}
];