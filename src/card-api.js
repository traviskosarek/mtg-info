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
                key: this.datastore.key([this.kind, validCard.set_code + "_" + validCard.collector_number]),
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
        var _this = this;
        try {
            var cards = request.body;
            if (cards instanceof Array && cards.length > 0) {
                var validCards_1 = [];
                this.datastore = Datastore({
                    projectId: this.projectId
                });
                cards.forEach(function (card) {
                    var validCard = models_1.Card.createCard(card);
                    validCards_1.push({
                        key: _this.datastore.key([_this.kind, validCard.set_code + "_" + validCard.collector_number]),
                        data: validCard
                    });
                });
                this.datastore
                    .upsert(validCards_1)
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
    CardAPI.prototype.getCard = function (request, response) {
        try {
            var card = request.body;
            var setCode_1 = card.set_code;
            var collectorNumber_1 = card.collector_number;
            models_1.Card.validateSetCode(setCode_1);
            models_1.Card.validateCollectorNumber(collectorNumber_1);
            this.datastore = Datastore({
                projectId: this.projectId
            });
            this.datastore
                .get(this.datastore.key([this.kind, setCode_1 + "_" + collectorNumber_1]))
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
                        message: "Card not found *** card set_code = " + setCode_1 + " *** card collector_number = " + collectorNumber_1
                    });
                }
            })
                .catch(function (err) {
                response.status(500).json({
                    status: 500,
                    message: "Error retrieving card. Please try again later."
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
    CardAPI.prototype.getCards = function (request, response) {
        try {
            var card = request.body;
            this.datastore = Datastore({
                projectId: this.projectId
            });
            var noFilters = true;
            var query = this.datastore.createQuery(this.kind);
            if (card.name !== undefined) {
                models_1.Card.validateName(card.name);
                query = query.filter("name", "=", card.name).order("name");
                noFilters = false;
            }
            if (card.layout !== undefined) {
                models_1.Card.validateLayout(card.layout);
                query = query.filter("layout", "=", card.layout).order("layout");
                noFilters = false;
            }
            if (card.converted_mana_cost !== undefined) {
                models_1.Card.validateConvertedManaCost(card.converted_mana_cost);
                query = query.filter("converted_mana_cost", "=", card.converted_mana_cost).order("converted_mana_cost");
                noFilters = false;
            }
            if (card.mana_cost !== undefined) {
                models_1.Card.validateManaCost(card.mana_cost);
                query = query.filter("mana_cost", "=", card.mana_cost).order("mana_cost");
                noFilters = false;
            }
            if (card.power !== undefined) {
                models_1.Card.validatePower(card.power);
                query = query.filter("power", "=", card.power).order("power");
                noFilters = false;
            }
            if (card.toughness !== undefined) {
                models_1.Card.validateToughness(card.toughness);
                query = query.filter("toughness", "=", card.toughness).order("toughness");
                noFilters = false;
            }
            if (card.loyalty !== undefined) {
                models_1.Card.validateLoyalty(card.loyalty);
                query = query.filter("loyalty", "=", card.loyalty).order("loyalty");
                noFilters = false;
            }
            if (card.life_modifer !== undefined) {
                models_1.Card.validateLifeModifier(card.life_modifer);
                query = query.filter("life_modifer", "=", card.life_modifer).order("life_modifer");
                noFilters = false;
            }
            if (card.hand_modifier !== undefined) {
                models_1.Card.validateHandModifier(card.hand_modifier);
                query = query.filter("hand_modifier", "=", card.hand_modifier).order("hand_modifier");
                noFilters = false;
            }
            if (card.colors !== undefined) {
                models_1.Card.validateColors(card.colors);
                query = query.filter("colors", "=", card.colors).order("colors");
                noFilters = false;
            }
            if (card.color_indicator !== undefined) {
                models_1.Card.validateColorIndicator(card.color_indicator);
                query = query.filter("color_indicator", "=", card.color_indicator).order("color_indicator");
                noFilters = false;
            }
            if (card.color_identity !== undefined) {
                models_1.Card.validateColorIdentity(card.color_identity);
                query = query.filter("color_identity", "=", card.color_identity).order("color_identity");
                noFilters = false;
            }
            if (card.legality !== undefined) {
                if (card.legality.is_commander_banned !== undefined) {
                    query = query.filter("legality.is_commander_banned", "=", card.legality.is_commander_banned).order("legality.is_commander_banned");
                    noFilters = false;
                }
                if (card.legality.is_commander_legal !== undefined) {
                    query = query.filter("legality.is_commander_legal", "=", card.legality.is_commander_legal).order("legality.is_commander_legal");
                    noFilters = false;
                }
                if (card.legality.is_commander_restricted !== undefined) {
                    query = query.filter("legality.is_commander_restricted", "=", card.legality.is_commander_restricted).order("legality.is_commander_restricted");
                    noFilters = false;
                }
                if (card.legality.is_duel_banned !== undefined) {
                    query = query.filter("legality.is_duel_banned", "=", card.legality.is_duel_banned).order("legality.is_duel_banned");
                    noFilters = false;
                }
                if (card.legality.is_duel_legal !== undefined) {
                    query = query.filter("legality.is_duel_legal", "=", card.legality.is_duel_legal).order("legality.is_duel_legal");
                    noFilters = false;
                }
                if (card.legality.is_duel_restricted !== undefined) {
                    query = query.filter("legality.is_duel_restricted", "=", card.legality.is_duel_restricted).order("legality.is_duel_restricted");
                    noFilters = false;
                }
                if (card.legality.is_frontier_banned !== undefined) {
                    query = query.filter("legality.is_frontier_banned", "=", card.legality.is_frontier_banned).order("legality.is_frontier_banned");
                    noFilters = false;
                }
                if (card.legality.is_frontier_legal !== undefined) {
                    query = query.filter("legality.is_frontier_legal", "=", card.legality.is_frontier_legal).order("legality.is_frontier_legal");
                    noFilters = false;
                }
                if (card.legality.is_frontier_restricted !== undefined) {
                    query = query.filter("legality.is_frontier_restricted", "=", card.legality.is_frontier_restricted).order("legality.is_frontier_restricted");
                    noFilters = false;
                }
                if (card.legality.is_future_banned !== undefined) {
                    query = query.filter("legality.is_future_banned", "=", card.legality.is_future_banned).order("legality.is_future_banned");
                    noFilters = false;
                }
                if (card.legality.is_future_legal !== undefined) {
                    query = query.filter("legality.is_future_legal", "=", card.legality.is_future_legal).order("legality.is_future_legal");
                    noFilters = false;
                }
                if (card.legality.is_future_restricted !== undefined) {
                    query = query.filter("legality.is_future_restricted", "=", card.legality.is_future_restricted).order("legality.is_future_restricted");
                    noFilters = false;
                }
                if (card.legality.is_legacy_banned !== undefined) {
                    query = query.filter("legality.is_legacy_banned", "=", card.legality.is_legacy_banned).order("legality.is_legacy_banned");
                    noFilters = false;
                }
                if (card.legality.is_legacy_legal !== undefined) {
                    query = query.filter("legality.is_legacy_legal", "=", card.legality.is_legacy_legal).order("legality.is_legacy_legal");
                    noFilters = false;
                }
                if (card.legality.is_legacy_restricted !== undefined) {
                    query = query.filter("legality.is_legacy_restricted", "=", card.legality.is_legacy_restricted).order("legality.is_legacy_restricted");
                    noFilters = false;
                }
                if (card.legality.is_modern_banned !== undefined) {
                    query = query.filter("legality.is_modern_banned", "=", card.legality.is_modern_banned).order("legality.is_modern_banned");
                    noFilters = false;
                }
                if (card.legality.is_modern_legal !== undefined) {
                    query = query.filter("legality.is_modern_legal", "=", card.legality.is_modern_legal).order("legality.is_modern_legal");
                    noFilters = false;
                }
                if (card.legality.is_modern_restricted !== undefined) {
                    query = query.filter("legality.is_modern_restricted", "=", card.legality.is_modern_restricted).order("legality.is_modern_restricted");
                    noFilters = false;
                }
                if (card.legality.is_one_versus_one_banned !== undefined) {
                    query = query.filter("legality.is_one_versus_one_banned", "=", card.legality.is_one_versus_one_banned).order("legality.is_one_versus_one_banned");
                    noFilters = false;
                }
                if (card.legality.is_one_versus_one_legal !== undefined) {
                    query = query.filter("legality.is_one_versus_one_legal", "=", card.legality.is_one_versus_one_legal).order("legality.is_one_versus_one_legal");
                    noFilters = false;
                }
                if (card.legality.is_one_versus_one_restricted !== undefined) {
                    query = query.filter("legality.is_one_versus_one_restricted", "=", card.legality.is_one_versus_one_restricted).order("legality.is_one_versus_one_restricted");
                    noFilters = false;
                }
                if (card.legality.is_pauper_banned !== undefined) {
                    query = query.filter("legality.is_pauper_banned", "=", card.legality.is_pauper_banned).order("legality.is_pauper_banned");
                    noFilters = false;
                }
                if (card.legality.is_pauper_legal !== undefined) {
                    query = query.filter("legality.is_pauper_legal", "=", card.legality.is_pauper_legal).order("legality.is_pauper_legal");
                    noFilters = false;
                }
                if (card.legality.is_pauper_restricted !== undefined) {
                    query = query.filter("legality.is_pauper_restricted", "=", card.legality.is_pauper_restricted).order("legality.is_pauper_restricted");
                    noFilters = false;
                }
                if (card.legality.is_penny_banned !== undefined) {
                    query = query.filter("legality.is_penny_banned", "=", card.legality.is_penny_banned).order("legality.is_penny_banned");
                    noFilters = false;
                }
                if (card.legality.is_penny_legal !== undefined) {
                    query = query.filter("legality.is_penny_legal", "=", card.legality.is_penny_legal).order("legality.is_penny_legal");
                    noFilters = false;
                }
                if (card.legality.is_penny_restricted !== undefined) {
                    query = query.filter("legality.is_penny_restricted", "=", card.legality.is_penny_restricted).order("legality.is_penny_restricted");
                    noFilters = false;
                }
                if (card.legality.is_standard_banned !== undefined) {
                    query = query.filter("legality.is_standard_banned", "=", card.legality.is_standard_banned).order("legality.is_standard_banned");
                    noFilters = false;
                }
                if (card.legality.is_standard_legal !== undefined) {
                    query = query.filter("legality.is_standard_legal", "=", card.legality.is_standard_legal).order("legality.is_standard_legal");
                    noFilters = false;
                }
                if (card.legality.is_standard_restricted !== undefined) {
                    query = query.filter("legality.is_standard_restricted", "=", card.legality.is_standard_restricted).order("legality.is_standard_restricted");
                    noFilters = false;
                }
                if (card.legality.is_vintage_banned !== undefined) {
                    query = query.filter("legality.is_vintage_banned", "=", card.legality.is_vintage_banned).order("legality.is_vintage_banned");
                    noFilters = false;
                }
                if (card.legality.is_vintage_legal !== undefined) {
                    query = query.filter("legality.is_vintage_legal", "=", card.legality.is_vintage_legal).order("legality.is_vintage_legal");
                    noFilters = false;
                }
                if (card.legality.is_vintage_restricted !== undefined) {
                    query = query.filter("legality.is_vintage_restricted", "=", card.legality.is_vintage_restricted).order("legality.is_vintage_restricted");
                    noFilters = false;
                }
            }
            if (card.is_reserved !== undefined) {
                models_1.Card.validateIsReserved(card.is_reserved);
                query = query.filter("is_reserved", "=", card.is_reserved).order("is_reserved");
                noFilters = false;
            }
            if (card.edhrec_rank !== undefined) {
                models_1.Card.validateEDHRecRank(card.edhrec_rank);
                query = query.filter("edhrec_rank", "=", card.edhrec_rank).order("edhrec_rank");
                noFilters = false;
            }
            if (card.set_code !== undefined) {
                models_1.Card.validateSetCode(card.set_code);
                query = query.filter("set_code", "=", card.set_code).order("set_code");
                noFilters = false;
            }
            if (card.set_name !== undefined) {
                models_1.Card.validateSetName(card.set_name);
                query = query.filter("set_name", "=", card.set_name).order("set_name");
                noFilters = false;
            }
            if (card.collector_number !== undefined) {
                models_1.Card.validateCollectorNumber(card.collector_number);
                query = query.filter("collector_number", "=", card.collector_number).order("collector_number");
                noFilters = false;
            }
            if (card.is_reprint !== undefined) {
                models_1.Card.validateIsReprint(card.is_reprint);
                query = query.filter("is_reprint", "=", card.is_reprint).order("is_reprint");
                noFilters = false;
            }
            if (card.is_digital !== undefined) {
                models_1.Card.validateIsDigital(card.is_digital);
                query = query.filter("is_digital", "=", card.is_digital).order("is_digital");
                noFilters = false;
            }
            if (card.rarity !== undefined) {
                models_1.Card.validateRarity(card.rarity);
                query = query.filter("rarity", "=", card.rarity).order("rarity");
                noFilters = false;
            }
            if (card.artist !== undefined) {
                models_1.Card.validateArtist(card.artist);
                query = query.filter("artist", "=", card.artist).order("artist");
                noFilters = false;
            }
            if (card.frame !== undefined) {
                models_1.Card.validateFrame(card.frame);
                query = query.filter("frame", "=", card.frame).order("frame");
                noFilters = false;
            }
            if (card.is_full_art !== undefined) {
                models_1.Card.validateIsFullArt(card.is_full_art);
                query = query.filter("is_full_art", "=", card.is_full_art).order("is_full_art");
                noFilters = false;
            }
            if (card.watermark !== undefined) {
                models_1.Card.validateWatermark(card.watermark);
                query = query.filter("watermark", "=", card.watermark).order("watermark");
                noFilters = false;
            }
            if (card.border_color !== undefined) {
                models_1.Card.validateBorderColor(card.border_color);
                query = query.filter("border_color", "=", card.border_color).order("border_color");
                noFilters = false;
            }
            if (card.is_timeshifted !== undefined) {
                models_1.Card.validateIsTimeshifted(card.is_timeshifted);
                query = query.filter("is_timeshifted", "=", card.is_timeshifted).order("is_timeshifted");
                noFilters = false;
            }
            if (card.is_colorshifted !== undefined) {
                models_1.Card.validateIsColorshifted(card.is_colorshifted);
                query = query.filter("is_colorshifted", "=", card.is_colorshifted).order("is_colorshifted");
                noFilters = false;
            }
            if (card.is_futureshifted !== undefined) {
                models_1.Card.validateIsFutureshifted(card.is_futureshifted);
                query = query.filter("is_futureshifted", "=", card.is_futureshifted).order("is_futureshifted");
                noFilters = false;
            }
            if (noFilters) {
                query = query.order("set_code");
            }
            this.datastore
                .runQuery(query)
                .then(function (results) {
                response.status(200).json({
                    status: 200,
                    message: "Success",
                    cards: results[0]
                });
            })
                .catch(function (err) {
                response.status(500).json({
                    status: 500,
                    message: "Error retrieving cards. Please try again later. " + err
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
    return CardAPI;
}());
exports.CardAPI = CardAPI;
//# sourceMappingURL=card-api.js.map