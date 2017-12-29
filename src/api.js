"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Datastore = require("@google-cloud/datastore");
var models_1 = require("./models");
var API = (function () {
    function API() {
        this.projectId = "reaper-grames";
    }
    API.instance = function () {
        if (this.singleton === undefined) {
            this.singleton = new this();
        }
        return this.singleton;
    };
    API.prototype.putSet = function (request, response) {
        try {
            var kind = "set";
            var validSet = models_1.Set.createSet(request.body);
            this.datastore = Datastore({
                projectId: this.projectId
            });
            this.datastore
                .upsert({
                key: this.datastore.key([kind, validSet.set_code]),
                data: validSet
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
    API.prototype.putSets = function (request, response) {
        var _this = this;
        try {
            var sets = request.body;
            if (sets instanceof Array && sets.length > 0) {
                var kind_1 = "set";
                var validSets_1 = [];
                this.datastore = Datastore({
                    projectId: this.projectId
                });
                sets.forEach(function (set) {
                    var validSet = models_1.Set.createSet(set);
                    validSets_1.push({
                        key: _this.datastore.key([kind_1, validSet.set_code]),
                        data: validSet
                    });
                });
                this.datastore
                    .upsert(validSets_1)
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
            else {
                response.status(400).json({
                    status: 400,
                    message: "Invalid payload format. Expecting an Array of JSON Objects."
                });
            }
        }
        catch (e) {
            response.status(400).json({
                status: 400,
                message: e.message
            });
        }
    };
    API.prototype.getSet = function (request, response) {
        try {
            var set = request.body;
            var kind = "set";
            var set_code_1 = set.set_code;
            models_1.Set.validateSetCode(set_code_1);
            this.datastore = Datastore({
                projectId: this.projectId
            });
            this.datastore
                .get(this.datastore.key([kind, set.set_code]))
                .then(function (results) {
                if (results[0] !== undefined) {
                    response.status(200).json({
                        status: 200,
                        message: "Success",
                        set: results[0]
                    });
                }
                else {
                    response.status(400).json({
                        status: 400,
                        message: "Set not found *** set = " + set_code_1
                    });
                }
            })
                .catch(function (err) {
                response.status(500).json({
                    status: 500,
                    message: "Error retrieving set. Please try again later."
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
    API.prototype.getSets = function (request, response) {
        try {
            var set = request.body;
            var kind = "set";
            this.datastore = Datastore({
                projectId: this.projectId
            });
            var noFilters = true;
            var query = this.datastore.createQuery(kind);
            if (set.block_code !== undefined) {
                models_1.Set.validateBlockCode(set.block_code);
                query = query.filter("block_code", "=", set.block_code).order("block_code");
                noFilters = false;
            }
            if (set.block_name !== undefined) {
                models_1.Set.validateBlockName(set.block_name);
                query = query.filter("block_name", "=", set.block_name).order("block_name");
                noFilters = false;
            }
            if (set.card_count !== undefined) {
                models_1.Set.validateCardCount(set.card_count);
                query = query.filter("card_count", "=", set.card_count).order("card_count");
                noFilters = false;
            }
            if (set.icon_uri !== undefined) {
                models_1.Set.validateIconUri(set.icon_uri);
                query = query.filter("icon_uri", "=", set.icon_uri).order("icon_uri");
                noFilters = false;
            }
            if (set.is_digital !== undefined) {
                models_1.Set.validateIsDigital(set.is_digital);
                query = query.filter("is_digital", "=", set.is_digital).order("is_digital");
                noFilters = false;
            }
            if (set.is_foil !== undefined) {
                models_1.Set.validateIsFoil(set.is_foil);
                query = query.filter("is_foil", "=", set.is_foil).order("is_foil");
                noFilters = false;
            }
            if (set.parent_set_code !== undefined) {
                models_1.Set.validateParentSetCode(set.parent_set_code);
                query = query.filter("parent_set_code", "=", set.parent_set_code).order("parent_set_code");
                noFilters = false;
            }
            if (set.release_date !== undefined) {
                models_1.Set.validateReleaseDate(set.release_date);
                query = query.filter("release_date", "=", set.release_date).order("release_date");
                noFilters = false;
            }
            if (set.set_code !== undefined) {
                models_1.Set.validateSetCode(set.set_code);
                query = query.filter("set_code", "=", set.set_code).order("set_code");
                noFilters = false;
            }
            if (set.set_name !== undefined) {
                models_1.Set.validateSetName(set.set_name);
                query = query.filter("set_name", "=", set.set_name).order("set_name");
                noFilters = false;
            }
            if (set.set_type !== undefined) {
                models_1.Set.validateSetType(set.set_type);
                query = query.filter("set_type", "=", set.set_type).order("set_type");
                noFilters = false;
            }
            if (noFilters) {
                query = query.order("set_name");
            }
            this.datastore
                .runQuery(query)
                .then(function (results) {
                response.status(200).json({
                    status: 200,
                    message: "Success",
                    sets: results[0]
                });
            })
                .catch(function (err) {
                response.status(500).json({
                    status: 500,
                    message: "Error retrieving sets. Please try again later. " + err
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
    API.prototype.putCard = function (request, response) {
    };
    API.prototype.putCards = function (request, response) {
    };
    API.prototype.getCard = function (request, response) {
    };
    API.prototype.getCards = function (request, response) {
    };
    return API;
}());
exports.API = API;
//# sourceMappingURL=api.js.map