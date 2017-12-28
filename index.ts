import { API } from "./src";

exports.putSet = (req, res) => {
    API.instance().putSet(req, res);
};

exports.putSets = (req, res) => {
    API.instance().putSets(req, res);
};

exports.getSet = (req, res) => {
    API.instance().getSet(req, res);
};

exports.getSets = (req, res) => {
    API.instance().getSets(req, res);
};

exports.putCard = (req, res) => {
    API.instance().putCard(req, res);
};

exports.putCards = (req, res) => {
    API.instance().putCards(req, res);
};

exports.getCard = (req, res) => {
    API.instance().getCard(req, res);
};

exports.getCards = (req, res) => {
    API.instance().getCards(req, res);
};
