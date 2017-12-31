import * as Datastore from "@google-cloud/datastore";
import { Request, Response } from "express";

import { Card } from "./models";
import { ICard } from "./interfaces";

export class CardAPI {
    private static singleton: CardAPI;
    private projectId = "reaper-grames";
    private kind = "card";

    private datastore: Datastore;

    private constructor() {
        // do nothing
    }

    public static instance(): CardAPI {
        if (this.singleton === undefined) {
            this.singleton = new this();
        }
        return this.singleton;
    }

    public putCard(request: Request, response: Response) {
        try {
            let validCard = Card.createCard(request.body);
            
            this.datastore = Datastore({
                projectId: this.projectId
            });

            this.datastore
                .upsert({
                    key: this.datastore.key([this.kind, validCard.set_code + "_" + validCard.collector_number]),
                    data: validCard
                })
                .then(() => {
                    response.status(200).json({
                        status: 200,
                        message: "Success"
                    });
                })
                .catch((err) => {
                    response.status(500).json({
                        status: 500,
                        message: "Save unsuccessful, please try again later"
                    });
                });
        } catch (e) {
            response.status(400).json({
                status: 400,
                message: e.message
            });
        }
    }

    public putCards(request: Request, response: Response) {
        try {
            let cards = request.body;
            if (cards instanceof Array && cards.length > 0) {
                let validCards = [];

                this.datastore = Datastore({
                    projectId: this.projectId
                });

                cards.forEach((card) => {
                    let validCard: ICard = Card.createCard(card);
                    validCards.push({
                        key: this.datastore.key([this.kind, validCard.set_code + "_" + validCard.collector_number]),
                        data: validCard
                    });
                });

                this.datastore
                    .upsert(validCards)
                    .then(() => {
                        response.status(200).json({
                            status: 200,
                            message: "Success"
                        });
                    })
                    .catch((err) => {
                        response.status(500).json({
                            status: 500,
                            message: "Save unsuccessful, please try again later"
                        });
                    });
            } else {
                response.status(400).json({
                    status: 400,
                    message: "Invalid payload format. Expecting an Array of JSON Objects."
                });
            }
        } catch (e) {
            response.status(400).json({
                status: 400,
                message: e.message
            });
        }
    }

    public getCard(request: Request, response: Response) {
        try {
            let card = request.body;

            let setCode = card.set_code;
            let collectorNumber = card.collector_number;

            Card.validateSetCode(setCode);
            Card.validateCollectorNumber(collectorNumber);

            this.datastore = Datastore({
                projectId: this.projectId
            });

            this.datastore
                .get(this.datastore.key([this.kind, setCode + "_" + collectorNumber]))
                .then((results) => {
                    if (results[0] !== undefined) {
                        response.status(200).json({
                            status: 200,
                            message: "Success",
                            set: results[0]
                        });
                    } else {
                        response.status(400).json({
                            status: 400,
                            message: "Card not found *** card set_code = " + setCode + " *** card collector_number = " + collectorNumber
                        });
                    }
                })
                .catch((err) => {
                    response.status(500).json({
                        status: 500,
                        message: "Error retrieving card. Please try again later."
                    });
                });
        } catch (e) {
            response.status(400).json({
                status: 400,
                message: e.message
            });
        }
    }

    public getCards(request: Request, response: Response) {
        try {
            let card = request.body as ICard;

            this.datastore = Datastore({
                projectId: this.projectId
            });

            let noFilters = true;
            let query = this.datastore.createQuery(this.kind);

            if (card.name !== undefined) {
                Card.validateName(card.name);
                query = query.filter("name", "=", card.name).order("name");
                noFilters = false;
            }

            if (card.layout !== undefined) {
                Card.validateLayout(card.layout);
                query = query.filter("layout", "=", card.layout).order("layout");
                noFilters = false;
            }
            
            if (card.converted_mana_cost !== undefined) {
                Card.validateConvertedManaCost(card.converted_mana_cost);
                query = query.filter("converted_mana_cost", "=", card.converted_mana_cost).order("converted_mana_cost");
                noFilters = false;
            }

            if (card.mana_cost !== undefined) {
                Card.validateManaCost(card.mana_cost);
                query = query.filter("mana_cost", "=", card.mana_cost).order("mana_cost");
                noFilters = false;
            }
            
            if (card.power !== undefined) {
                Card.validatePower(card.power);
                query = query.filter("power", "=", card.power).order("power");
                noFilters = false;
            }

            if (card.toughness !== undefined) {
                Card.validateToughness(card.toughness);
                query = query.filter("toughness", "=", card.toughness).order("toughness");
                noFilters = false;
            }
            
            if (card.loyalty !== undefined) {
                Card.validateLoyalty(card.loyalty);
                query = query.filter("loyalty", "=", card.loyalty).order("loyalty");
                noFilters = false;
            }

            if (card.life_modifer !== undefined) {
                Card.validateLifeModifier(card.life_modifer);
                query = query.filter("life_modifer", "=", card.life_modifer).order("life_modifer");
                noFilters = false;
            }
            
            if (card.hand_modifier !== undefined) {
                Card.validateHandModifier(card.hand_modifier);
                query = query.filter("hand_modifier", "=", card.hand_modifier).order("hand_modifier");
                noFilters = false;
            }

            if (card.colors !== undefined) {
                Card.validateColors(card.colors);
                query = query.filter("colors", "=", card.colors).order("colors");
                noFilters = false;
            }
            
            if (card.color_indicator !== undefined) {
                Card.validateColorIndicator(card.color_indicator);
                query = query.filter("color_indicator", "=", card.color_indicator).order("color_indicator");
                noFilters = false;
            }

            if (card.color_identity !== undefined) {
                Card.validateColorIdentity(card.color_identity);
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
                Card.validateIsReserved(card.is_reserved);
                query = query.filter("is_reserved", "=", card.is_reserved).order("is_reserved");
                noFilters = false;
            }
            
            if (card.edhrec_rank !== undefined) {
                Card.validateEDHRecRank(card.edhrec_rank);
                query = query.filter("edhrec_rank", "=", card.edhrec_rank).order("edhrec_rank");
                noFilters = false;
            }

            if (card.set_code !== undefined) {
                Card.validateSetCode(card.set_code);
                query = query.filter("set_code", "=", card.set_code).order("set_code");
                noFilters = false;
            }
            
            if (card.set_name !== undefined) {
                Card.validateSetName(card.set_name);
                query = query.filter("set_name", "=", card.set_name).order("set_name");
                noFilters = false;
            }

            if (card.collector_number !== undefined) {
                Card.validateCollectorNumber(card.collector_number);
                query = query.filter("collector_number", "=", card.collector_number).order("collector_number");
                noFilters = false;
            }

            if (card.is_reprint !== undefined) {
                Card.validateIsReprint(card.is_reprint);
                query = query.filter("is_reprint", "=", card.is_reprint).order("is_reprint");
                noFilters = false;
            }
            
            if (card.is_digital !== undefined) {
                Card.validateIsDigital(card.is_digital);
                query = query.filter("is_digital", "=", card.is_digital).order("is_digital");
                noFilters = false;
            }

            if (card.rarity !== undefined) {
                Card.validateRarity(card.rarity);
                query = query.filter("rarity", "=", card.rarity).order("rarity");
                noFilters = false;
            }

            if (card.artist !== undefined) {
                Card.validateArtist(card.artist);
                query = query.filter("artist", "=", card.artist).order("artist");
                noFilters = false;
            }
            
            if (card.frame !== undefined) {
                Card.validateFrame(card.frame);
                query = query.filter("frame", "=", card.frame).order("frame");
                noFilters = false;
            }

            if (card.is_full_art !== undefined) {
                Card.validateIsFullArt(card.is_full_art);
                query = query.filter("is_full_art", "=", card.is_full_art).order("is_full_art");
                noFilters = false;
            }
            
            if (card.watermark !== undefined) {
                Card.validateWatermark(card.watermark);
                query = query.filter("watermark", "=", card.watermark).order("watermark");
                noFilters = false;
            }

            if (card.border_color !== undefined) {
                Card.validateBorderColor(card.border_color);
                query = query.filter("border_color", "=", card.border_color).order("border_color");
                noFilters = false;
            }
            
            if (card.is_timeshifted !== undefined) {
                Card.validateIsTimeshifted(card.is_timeshifted);
                query = query.filter("is_timeshifted", "=", card.is_timeshifted).order("is_timeshifted");
                noFilters = false;
            }

            if (card.is_colorshifted !== undefined) {
                Card.validateIsColorshifted(card.is_colorshifted);
                query = query.filter("is_colorshifted", "=", card.is_colorshifted).order("is_colorshifted");
                noFilters = false;
            }
            
            if (card.is_futureshifted !== undefined) {
                Card.validateIsFutureshifted(card.is_futureshifted);
                query = query.filter("is_futureshifted", "=", card.is_futureshifted).order("is_futureshifted");
                noFilters = false;
            }
            
            if (noFilters) {
                query = query.order("set_name");
            }

            this.datastore
                .runQuery(query)
                .then((results) => {
                    response.status(200).json({
                        status: 200,
                        message: "Success",
                        cards: results[0]
                    });
                })
                .catch((err) => {
                    response.status(500).json({
                        status: 500,
                        message: "Error retrieving cards. Please try again later. " + err
                    });
                });
        } catch (e) {
            response.status(400).json({
                status: 400,
                message: e.message
            });
        }
    }
}
