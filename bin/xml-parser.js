#!/usr/bin/env node
"use strict";
exports.__esModule = true;
var minimist = require("minimist");
var index_1 = require("../dist/index");
console.log("转换中...");
var argv = minimist(process.argv.slice(2)), pathUrl = argv._[0] || ".", isLowerCase = argv.lower;
process.env.isLowerCaseTag = isLowerCase;
try {
    (0, index_1["default"])(pathUrl, argv.dest);
    console.log("转换成功");
}
catch (e) {
    console.error(e);
    console.log("转换失败");
}
