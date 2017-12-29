import { SetAPI, CardAPI } from "./src";

exports.putSet = (req, res) => {
    SetAPI.instance().putSet(req, res);
};

exports.putSets = (req, res) => {
    SetAPI.instance().putSets(req, res);
};

exports.getSet = (req, res) => {
    SetAPI.instance().getSet(req, res);
};

exports.getSets = (req, res) => {
    SetAPI.instance().getSets(req, res);
};

exports.putCard = (req, res) => {
    CardAPI.instance().putCard(req, res);
};

exports.putCards = (req, res) => {
    CardAPI.instance().putCards(req, res);
};

exports.getCard = (req, res) => {
    CardAPI.instance().getCard(req, res);
};

exports.getCards = (req, res) => {
    CardAPI.instance().getCards(req, res);
};
