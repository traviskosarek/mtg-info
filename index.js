"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var src_1 = require("./src");
exports.putSet = function (req, res) {
    src_1.API.instance().putSet(req, res);
};
exports.putSets = function (req, res) {
    src_1.API.instance().putSets(req, res);
};
exports.getSet = function (req, res) {
    src_1.API.instance().getSet(req, res);
};
exports.getSets = function (req, res) {
    src_1.API.instance().getSets(req, res);
};
//# sourceMappingURL=index.js.map