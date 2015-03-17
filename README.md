# About

This module converts the original [CLDR JSON](http://cldr.unicode.org/index/downloads) package to the [OpenUI5](http://openui5.org/) format.

# Usage

npm install cldr-openui5

cldr -z PATH_TO_CLDR_JSON -o OUTPUT_FOLDER

Usage: cldr [options]

Options:
	-z, --zip     The path of original CLDR JSON zip file [required]
	-o, --output  The path of the folder where the generated JSON files are stored [required]
	-t, --temp    The temporary folder for storing the needed JSON files extracted from CLDR JSON zip                 [default: "./temp"]