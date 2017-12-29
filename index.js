"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var src_1 = require("./src");
exports.putSet = function (req, res) {
    src_1.SetAPI.instance().putSet(req, res);
};
exports.putSets = function (req, res) {
    src_1.SetAPI.instance().putSets(req, res);
};
exports.getSet = function (req, res) {
    src_1.SetAPI.instance().getSet(req, res);
};
exports.getSets = function (req, res) {
    src_1.SetAPI.instance().getSets(req, res);
};
exports.putCard = function (req, res) {
    src_1.CardAPI.instance().putCard(req, res);
};
exports.putCards = function (req, res) {
    src_1.CardAPI.instance().putCards(req, res);
};
exports.getCard = function (req, res) {
    src_1.CardAPI.instance().getCard(req, res);
};
exports.getCards = function (req, res) {
    src_1.CardAPI.instance().getCards(req, res);
};
//# sourceMappingURL=index.js.map