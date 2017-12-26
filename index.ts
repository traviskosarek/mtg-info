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
