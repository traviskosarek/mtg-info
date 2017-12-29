"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Datastore = require("@google-cloud/datastore");
var models_1 = require("./models");
var CardAPI = (function () {
    function CardAPI() {
        this.projectId = "reaper-grames";
        this.kind = "card";
    }
    CardAPI.instance = function () {
        if (this.singleton === undefined) {
            this.singleton = new this();
        }
        return this.singleton;
    };
    CardAPI.prototype.putCard = function (request, response) {
        try {
            var validCard = models_1.Card.createCard(request.body);
            this.datastore = Datastore({
                projectId: this.projectId
            });
            this.datastore
                .upsert({
                key: this.datastore.key([this.kind, validCard.set_code]),
                data: validCard
            })
                .then(function () {
                response.status(200).json({
                    status: 200,
                    message: "Success"
                });
            })
                .catch(function (err) {
                response.status(500).json({
                    status: 500,
                    message: "Save unsuccessful, please try again later"
                });
            });
        }
        catch (e) {
            response.status(400).json({
                status: 400,
                message: e.message
            });
        }
    };
    CardAPI.prototype.putCards = function (request, response) {
    };
    CardAPI.prototype.getCard = function (request, response) {
    };
    CardAPI.prototype.getCards = function (request, response) {
    };
    return CardAPI;
}());
exports.CardAPI = CardAPI;
//# sourceMappingURL=card-api.js.map