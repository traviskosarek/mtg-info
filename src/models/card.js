"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = require("./index");
var enums_1 = require("../enums");
var validUrl = require("valid-url");
var Card = (function () {
    function Card() {
    }
    Card.validateCard = function (card) {
        try {
            this.validateArtist(card.artist);
            this.validateBorderColor(card.border_color);
            this.validateCardFaces(card.card_faces);
            this.validateCollectorNumber(card.collector_number);
            this.validateColorIdentity(card.color_identity);
            this.validateColorIndicator(card.color_indicator);
            this.validateColors(card.colors);
            this.validateConvertedManaCost(card.converted_mana_cost);
            this.validateEDHRecRank(card.edhrec_rank);
            this.validateEurPrice(card.eur_price);
            this.validateTixPrice(card.tix_price);
            this.validateUsdPrice(card.usd_price);
            this.validateFlavorText(card.flavor_text);
            this.validateFrame(card.frame);
            this.validateHandModifier(card.hand_modifier);
            this.validateImageUri(card.image_uri);
            this.validateIsColorshifted(card.is_colorshifted);
            this.validateIsDigital(card.is_digital);
            this.validateIsFullArt(card.is_full_art);
            this.validateIsFutureshifted(card.is_futureshifted);
            this.validateIsReprint(card.is_reprint);
            this.validateIsReserved(card.is_reserved);
            this.validateIsTimeshifted(card.is_timeshifted);
            this.validateLayout(card.layout);
            this.validateLegality(card.legality);
            this.validateLifeModifier(card.life_modifer);
            this.validateLoyalty(card.loyalty);
            this.validateManaCost(card.mana_cost);
            this.validateMultiverseIds(card.multiverse_ids);
            this.validateName(card.name);
            this.validateOracleText(card.oracle_text);
            this.validatePower(card.power);
            this.validatePurchaseLinks(card.purchase_uris);
            this.validateRarity(card.rarity);
            this.validateRelatedCards(card.related_cards);
            this.validateRelatedLinks(card.related_links);
            this.validateSetCode(card.set_code);
            this.validateSetName(card.set_name);
            this.validateStorySpotlightNumber(card.story_spotlight_number);
            this.validateStorySpotlightUri(card.story_spotlight_uri);
            this.validateToughness(card.toughness);
            this.validateTypeLine(card.type_line);
            this.validateWatermark(card.watermark);
        }
        catch (e) {
            throw e;
        }
    };
    Card.validateMultiverseIds = function (ids) {
        if (ids !== undefined) {
            if (!(ids instanceof Array)) {
                throw new Error("multiverse_ids must be an array of positive numeric values *** multiverse_ids = " + ids);
            }
            else if (ids.length > 0) {
                ids.forEach(function (id) {
                    if (isNaN(id) || id < 0) {
                        throw new Error("multiverse_ids must only contain positive numeric values *** multiverse_ids = " + ids);
                    }
                });
            }
        }
    };
    Card.validateName = function (name) {
        if (name === undefined) {
            throw new Error("name is required");
        }
        if (name === "") {
            throw new Error("name cannot be empty");
        }
    };
    Card.validateLayout = function (layout) {
        if (layout !== undefined) {
            switch (layout) {
                case enums_1.Layouts.Augment:
                case enums_1.Layouts.DoubleFacedToken:
                case enums_1.Layouts.Emblem:
                case enums_1.Layouts.Flip:
                case enums_1.Layouts.Host:
                case enums_1.Layouts.Leveler:
                case enums_1.Layouts.Meld:
                case enums_1.Layouts.Normal:
                case enums_1.Layouts.Planar:
                case enums_1.Layouts.Scheme:
                case enums_1.Layouts.Split:
                case enums_1.Layouts.Token:
                case enums_1.Layouts.Transform:
                case enums_1.Layouts.Vanguard:
                    break;
                default:
                    throw new Error("layout is not in the list of pre-defined values *** layout = " + layout);
            }
        }
    };
    Card.validateConvertedManaCost = function (cmc) {
        if (cmc === undefined) {
            throw new Error("converted_mana_cost is required");
        }
        else if (isNaN(cmc)) {
            throw new Error("converted_mana_cost must be a number value");
        }
        else if (cmc < 0) {
            throw new Error("converted_mana_cost must be positive *** converted_mana_cost = " + cmc);
        }
    };
    Card.validateTypeLine = function (line) {
        if (line === undefined) {
            throw new Error("type_line is required");
        }
        else if (line === "") {
            throw new Error("type_line cannot be empty");
        }
    };
    Card.validateOracleText = function (text) {
        if (text !== undefined && text === "") {
            throw new Error("oracle_text cannot be empty");
        }
    };
    Card.validateManaCost = function (cost) {
        if (cost === undefined) {
            throw new Error("mana_cost is required");
        }
        else if (cost !== "") {
            var manaCosts = cost.split("}");
            manaCosts.forEach(function (manaCost) {
                if (manaCost !== "") {
                    switch (manaCost + "}") {
                        case enums_1.Symbols.White:
                        case enums_1.Symbols.Blue:
                        case enums_1.Symbols.Black:
                        case enums_1.Symbols.Red:
                        case enums_1.Symbols.Green:
                        case enums_1.Symbols.Colorless:
                        case enums_1.Symbols.Zero:
                        case enums_1.Symbols.OneHalf:
                        case enums_1.Symbols.One:
                        case enums_1.Symbols.Two:
                        case enums_1.Symbols.Three:
                        case enums_1.Symbols.Four:
                        case enums_1.Symbols.Five:
                        case enums_1.Symbols.Six:
                        case enums_1.Symbols.Seven:
                        case enums_1.Symbols.Eight:
                        case enums_1.Symbols.Nine:
                        case enums_1.Symbols.Ten:
                        case enums_1.Symbols.Eleven:
                        case enums_1.Symbols.Twelve:
                        case enums_1.Symbols.Thirteen:
                        case enums_1.Symbols.Fourteen:
                        case enums_1.Symbols.Fifteen:
                        case enums_1.Symbols.Sixteen:
                        case enums_1.Symbols.Seventeen:
                        case enums_1.Symbols.Eighteen:
                        case enums_1.Symbols.Nineteen:
                        case enums_1.Symbols.Twenty:
                        case enums_1.Symbols.OneHundred:
                        case enums_1.Symbols.OneMillion:
                        case enums_1.Symbols.Infinity:
                        case enums_1.Symbols.OneBlackOrOneGreen:
                        case enums_1.Symbols.OneBlackOrOneRed:
                        case enums_1.Symbols.OneBlueOrOneBlack:
                        case enums_1.Symbols.OneBlueOrOneRed:
                        case enums_1.Symbols.OneGreenOrOneBlue:
                        case enums_1.Symbols.OneGreenOrOneWhite:
                        case enums_1.Symbols.OneRedOrOneGreen:
                        case enums_1.Symbols.OneRedOrOneWhite:
                        case enums_1.Symbols.OneWhiteOrOneBlack:
                        case enums_1.Symbols.OneWhiteOrOneBlue:
                        case enums_1.Symbols.OneColoredOrTwoLife:
                        case enums_1.Symbols.OneBlackOrTwoLife:
                        case enums_1.Symbols.OneBlueOrTwoLife:
                        case enums_1.Symbols.OneGreenOrTwoLife:
                        case enums_1.Symbols.OneRedOrTwoLife:
                        case enums_1.Symbols.OneWhiteOrTwoLife:
                        case enums_1.Symbols.OneHalfRed:
                        case enums_1.Symbols.OneHalfWhite:
                        case enums_1.Symbols.Snow:
                        case enums_1.Symbols.TwoGenericOrOneBlack:
                        case enums_1.Symbols.TwoGenericOrOneBlue:
                        case enums_1.Symbols.TwoGenericOrOneGreen:
                        case enums_1.Symbols.TwoGenericOrOneRed:
                        case enums_1.Symbols.TwoGenericOrOneWhite:
                        case enums_1.Symbols.XGeneric:
                        case enums_1.Symbols.YGeneric:
                        case enums_1.Symbols.ZGeneric:
                            break;
                        default:
                            throw new Error("mana_cost is not the list of pre-defined values *** mana_cost = " + cost);
                    }
                }
            });
        }
    };
    Card.validatePower = function (power) {
        if (power !== undefined) {
            if (power === "") {
                throw new Error("power cannot be empty");
            }
            else {
                switch (power) {
                    case enums_1.Powers.NegativeOne:
                    case enums_1.Powers.Star:
                    case enums_1.Powers.Infinity:
                    case enums_1.Powers.StarSquared:
                    case enums_1.Powers.QuestionMark:
                    case enums_1.Powers.Zero:
                    case enums_1.Powers.PlusZero:
                    case enums_1.Powers.OneHalf:
                    case enums_1.Powers.PlusOne:
                    case enums_1.Powers.One:
                    case enums_1.Powers.OnePlusStar:
                    case enums_1.Powers.OneAndOneHalf:
                    case enums_1.Powers.Two:
                    case enums_1.Powers.TwoPlusStar:
                    case enums_1.Powers.PlusTwo:
                    case enums_1.Powers.TwoAndOneHalf:
                    case enums_1.Powers.PlusThree:
                    case enums_1.Powers.Three:
                    case enums_1.Powers.ThreeAndOneHalf:
                    case enums_1.Powers.PlusFour:
                    case enums_1.Powers.Four:
                    case enums_1.Powers.Five:
                    case enums_1.Powers.Six:
                    case enums_1.Powers.Seven:
                    case enums_1.Powers.Eight:
                    case enums_1.Powers.Nine:
                    case enums_1.Powers.Ten:
                    case enums_1.Powers.Eleven:
                    case enums_1.Powers.Twelve:
                    case enums_1.Powers.Thirteen:
                    case enums_1.Powers.Fifteen:
                    case enums_1.Powers.Twenty:
                    case enums_1.Powers.NinetyNine:
                        break;
                    default:
                        throw new Error("power is not in the list of valid pre-defined values *** power = " + power);
                }
            }
        }
    };
    Card.validateToughness = function (toughness) {
        if (toughness !== undefined) {
            if (toughness === "") {
                throw new Error("toughness cannot be empty");
            }
            else {
                switch (toughness) {
                    case enums_1.Toughnesses.NegativeOne:
                    case enums_1.Toughnesses.Star:
                    case enums_1.Toughnesses.StarSquared:
                    case enums_1.Toughnesses.QuestionMark:
                    case enums_1.Toughnesses.Zero:
                    case enums_1.Toughnesses.MinusZero:
                    case enums_1.Toughnesses.PlusZero:
                    case enums_1.Toughnesses.OneHalf:
                    case enums_1.Toughnesses.PlusOne:
                    case enums_1.Toughnesses.One:
                    case enums_1.Toughnesses.OnePlusStar:
                    case enums_1.Toughnesses.OneAndOneHalf:
                    case enums_1.Toughnesses.Two:
                    case enums_1.Toughnesses.TwoPlusStar:
                    case enums_1.Toughnesses.PlusTwo:
                    case enums_1.Toughnesses.TwoAndOneHalf:
                    case enums_1.Toughnesses.PlusThree:
                    case enums_1.Toughnesses.Three:
                    case enums_1.Toughnesses.ThreeAndOneHalf:
                    case enums_1.Toughnesses.PlusFour:
                    case enums_1.Toughnesses.Four:
                    case enums_1.Toughnesses.Five:
                    case enums_1.Toughnesses.Six:
                    case enums_1.Toughnesses.SevenMinusStar:
                    case enums_1.Toughnesses.Seven:
                    case enums_1.Toughnesses.Eight:
                    case enums_1.Toughnesses.Nine:
                    case enums_1.Toughnesses.Ten:
                    case enums_1.Toughnesses.Eleven:
                    case enums_1.Toughnesses.Twelve:
                    case enums_1.Toughnesses.Thirteen:
                    case enums_1.Toughnesses.Fourteen:
                    case enums_1.Toughnesses.Fifteen:
                    case enums_1.Toughnesses.Twenty:
                    case enums_1.Toughnesses.NinetyNine:
                        break;
                    default:
                        throw new Error("toughness is not in the list of valid pre-defined values *** toughness = " + toughness);
                }
            }
        }
    };
    Card.validateLoyalty = function (loyalty) {
        if (loyalty !== undefined) {
            if (loyalty === "") {
                throw new Error("loyalty cannot be empty");
            }
            else {
                switch (loyalty) {
                    case enums_1.Loyalties.X:
                    case enums_1.Loyalties.OneDFourPlusOne:
                    case enums_1.Loyalties.Two:
                    case enums_1.Loyalties.Three:
                    case enums_1.Loyalties.Four:
                    case enums_1.Loyalties.Five:
                    case enums_1.Loyalties.Six:
                    case enums_1.Loyalties.Seven:
                    case enums_1.Loyalties.Twenty:
                        break;
                    default:
                        throw new Error("loyalty is not in the list of valid pre-defined values *** loyalty = " + loyalty);
                }
            }
        }
    };
    Card.validateLifeModifier = function (modifier) {
        if (modifier !== undefined && modifier === "") {
            throw new Error("life_modifier cannot be empty");
        }
    };
    Card.validateHandModifier = function (modifier) {
        if (modifier !== undefined && modifier === "") {
            throw new Error("hand_modifier cannot be empty");
        }
    };
    Card.validateColors = function (colors) {
        if (colors === undefined) {
            throw new Error("colors is required");
        }
        else if (!(colors instanceof Array)) {
            throw new Error("colors must be an Array *** colors = " + colors);
        }
        else if (colors.length !== 0) {
            var includesWhite_1 = false;
            var includesBlue_1 = false;
            var includesBlack_1 = false;
            var includesRed_1 = false;
            var includesGreen_1 = false;
            colors.forEach(function (color) {
                switch (color) {
                    case enums_1.Colors.White:
                        if (includesWhite_1) {
                            throw new Error("colors cannot include multiple white values *** colors = " + colors);
                        }
                        else {
                            includesWhite_1 = true;
                        }
                        break;
                    case enums_1.Colors.Blue:
                        if (includesBlue_1) {
                            throw new Error("colors cannot include multiple blue values *** colors = " + colors);
                        }
                        else {
                            includesBlue_1 = true;
                        }
                        break;
                    case enums_1.Colors.Black:
                        if (includesBlack_1) {
                            throw new Error("colors cannot include multiple black values *** colors = " + colors);
                        }
                        else {
                            includesBlack_1 = true;
                        }
                        break;
                    case enums_1.Colors.Red:
                        if (includesRed_1) {
                            throw new Error("colors cannot include multiple red values *** colors = " + colors);
                        }
                        else {
                            includesRed_1 = true;
                        }
                        break;
                    case enums_1.Colors.Green:
                        if (includesGreen_1) {
                            throw new Error("colors cannot include multiple green values *** colors = " + colors);
                        }
                        else {
                            includesGreen_1 = true;
                        }
                        break;
                    default:
                        throw new Error("colors may only include colors in the pre-defined list of values *** color in colors = " + color);
                }
            });
        }
    };
    Card.validateColorIndicator = function (indicator) {
        if (indicator !== undefined) {
            if (!(indicator instanceof Array)) {
                throw new Error("color_indicator must be an Array *** color_indicator = " + indicator);
            }
            else if (indicator.length !== 0) {
                var includesWhite_2 = false;
                var includesBlue_2 = false;
                var includesBlack_2 = false;
                var includesRed_2 = false;
                var includesGreen_2 = false;
                indicator.forEach(function (color) {
                    switch (color) {
                        case enums_1.Colors.White:
                            if (includesWhite_2) {
                                throw new Error("color_indicator cannot include multiple white values *** color_indicator = " + indicator);
                            }
                            else {
                                includesWhite_2 = true;
                            }
                            break;
                        case enums_1.Colors.Blue:
                            if (includesBlue_2) {
                                throw new Error("color_indicator cannot include multiple blue values *** color_indicator = " + indicator);
                            }
                            else {
                                includesBlue_2 = true;
                            }
                            break;
                        case enums_1.Colors.Black:
                            if (includesBlack_2) {
                                throw new Error("color_indicator cannot include multiple black values *** color_indicator = " + indicator);
                            }
                            else {
                                includesBlack_2 = true;
                            }
                            break;
                        case enums_1.Colors.Red:
                            if (includesRed_2) {
                                throw new Error("color_indicator cannot include multiple red values *** color_indicator = " + indicator);
                            }
                            else {
                                includesRed_2 = true;
                            }
                            break;
                        case enums_1.Colors.Green:
                            if (includesGreen_2) {
                                throw new Error("color_indicator cannot include multiple green values *** color_indicator = " + indicator);
                            }
                            else {
                                includesGreen_2 = true;
                            }
                            break;
                        default:
                            throw new Error("color_indicator may only include colors in the pre-defined list of values *** color in color_indicator = " + color);
                    }
                });
            }
        }
    };
    Card.validateColorIdentity = function (identity) {
        if (identity === undefined) {
            throw new Error("color_identity is required");
        }
        else if (!(identity instanceof Array)) {
            throw new Error("identity must be an Array *** color_identity = " + identity);
        }
        else if (identity.length !== 0) {
            var includesWhite_3 = false;
            var includesBlue_3 = false;
            var includesBlack_3 = false;
            var includesRed_3 = false;
            var includesGreen_3 = false;
            identity.forEach(function (color) {
                switch (color) {
                    case enums_1.Colors.White:
                        if (includesWhite_3) {
                            throw new Error("color_identity cannot include multiple white values *** color_identity = " + identity);
                        }
                        else {
                            includesWhite_3 = true;
                        }
                        break;
                    case enums_1.Colors.Blue:
                        if (includesBlue_3) {
                            throw new Error("color_identity cannot include multiple blue values *** color_identity = " + identity);
                        }
                        else {
                            includesBlue_3 = true;
                        }
                        break;
                    case enums_1.Colors.Black:
                        if (includesBlack_3) {
                            throw new Error("color_identity cannot include multiple black values *** color_identity = " + identity);
                        }
                        else {
                            includesBlack_3 = true;
                        }
                        break;
                    case enums_1.Colors.Red:
                        if (includesRed_3) {
                            throw new Error("color_identity cannot include multiple red values *** color_identity = " + identity);
                        }
                        else {
                            includesRed_3 = true;
                        }
                        break;
                    case enums_1.Colors.Green:
                        if (includesGreen_3) {
                            throw new Error("color_identity cannot include multiple green values *** color_identity = " + identity);
                        }
                        else {
                            includesGreen_3 = true;
                        }
                        break;
                    default:
                        throw new Error("color_identity may only include colors in the pre-defined list of values *** color in color_identity = " + color);
                }
            });
        }
    };
    Card.validateRelatedCards = function (cards) {
        var _this = this;
        if (cards !== undefined) {
            if (!(cards instanceof Array)) {
                throw new Error("related_cards must be an Array ** type of related_cards = " + typeof cards);
            }
            else if (cards.length === 0) {
                throw new Error("related_cards cannot be an empty Array");
            }
            else {
                cards.forEach(function (card) {
                    try {
                        _this.validateName(card.name);
                        _this.validateSetCode(card.set_code);
                        _this.validateCollectorNumber(card.collector_number);
                    }
                    catch (e) {
                        throw new Error("Error in related_cards: " + e.message);
                    }
                });
            }
        }
    };
    Card.validateCardFaces = function (faces) {
        var _this = this;
        if (faces !== undefined) {
            if (!(faces instanceof Array)) {
                throw new Error("card_faces should be an Array *** card_faces = " + faces);
            }
            else if (faces.length === 0) {
                throw new Error("card_faces cannot be an empty Array");
            }
            else {
                faces.forEach(function (face) {
                    _this.validateName(face.name);
                    _this.validateTypeLine(face.type_line);
                    _this.validateOracleText(face.oracle_text);
                    _this.validateManaCost(face.mana_cost);
                    _this.validateColors(face.colors);
                    _this.validateColorIndicator(face.color_identity);
                    _this.validatePower(face.power);
                    _this.validateToughness(face.toughness);
                    _this.validateLoyalty(face.loyalty);
                    _this.validateFlavorText(face.flavor_text);
                    _this.validateImageUri(face.image_uri);
                });
            }
        }
    };
    Card.validateLegality = function (legality) {
        if (legality === undefined) {
            throw new Error("legality is required");
        }
        else if (legality.is_standard_legal === undefined) {
            throw new Error("legality.is_standard_legal is required");
        }
        else if (typeof legality.is_standard_legal !== "boolean") {
            throw new Error("legality.is_standard_legal must be a boolean value *** legality.is_standard_legal = " + legality.is_standard_legal);
        }
        else if (legality.is_frontier_legal === undefined) {
            throw new Error("legality.is_frontier_legal is required");
        }
        else if (typeof legality.is_frontier_legal !== "boolean") {
            throw new Error("legality.is_frontier_legal must be a boolean value *** legality.is_frontier_legal = " + legality.is_frontier_legal);
        }
        else if (legality.is_modern_legal === undefined) {
            throw new Error("legality.is_modern_legal is required");
        }
        else if (typeof legality.is_modern_legal !== "boolean") {
            throw new Error("legality.is_modern_legal must be a boolean value *** legality.is_modern_legal = " + legality.is_modern_legal);
        }
        else if (legality.is_pauper_legal === undefined) {
            throw new Error("legality.is_pauper_legal is required");
        }
        else if (typeof legality.is_pauper_legal !== "boolean") {
            throw new Error("legality.is_pauper_legal must be a boolean value *** legality.is_pauper_legal = " + legality.is_pauper_legal);
        }
        else if (legality.is_legacy_legal === undefined) {
            throw new Error("legality.is_legacy_legal is required");
        }
        else if (typeof legality.is_legacy_legal !== "boolean") {
            throw new Error("legality.is_legacy_legal must be a boolean value *** legality.is_legacy_legal = " + legality.is_legacy_legal);
        }
        else if (legality.is_penny_legal === undefined) {
            throw new Error("legality.is_penny_legal is required");
        }
        else if (typeof legality.is_penny_legal !== "boolean") {
            throw new Error("legality.is_penny_legal must be a boolean value *** legality.is_penny_legal = " + legality.is_penny_legal);
        }
        else if (legality.is_vintage_legal === undefined) {
            throw new Error("legality.is_vintage_legal is required");
        }
        else if (typeof legality.is_vintage_legal !== "boolean") {
            throw new Error("legality.is_vintage_legal must be a boolean value *** legality.is_vintage_legal = " + legality.is_vintage_legal);
        }
        else if (legality.is_duel_legal === undefined) {
            throw new Error("legality.is_duel_legal is required");
        }
        else if (typeof legality.is_duel_legal !== "boolean") {
            throw new Error("legality.is_duel_legal must be a boolean value *** legality.is_duel_legal = " + legality.is_duel_legal);
        }
        else if (legality.is_commander_legal === undefined) {
            throw new Error("legality.is_commander_legal is required");
        }
        else if (typeof legality.is_commander_legal !== "boolean") {
            throw new Error("legality.is_commander_legal must be a boolean value *** legality.is_commander_legal = " + legality.is_commander_legal);
        }
        else if (legality.is_one_versus_one_legal === undefined) {
            throw new Error("legality.is_one_versus_one_legal is required");
        }
        else if (typeof legality.is_one_versus_one_legal !== "boolean") {
            throw new Error("legality.is_one_versus_one_legal must be a boolean value *** legality.is_one_versus_one_legal = " + legality.is_one_versus_one_legal);
        }
        else if (legality.is_future_legal === undefined) {
            throw new Error("legality.is_future_legal is required");
        }
        else if (typeof legality.is_future_legal !== "boolean") {
            throw new Error("legality.is_future_legal must be a boolean value *** legality.is_future_legal = " + legality.is_future_legal);
        }
    };
    Card.validateIsReserved = function (isReserved) {
        if (isReserved === undefined) {
            throw new Error("is_reserved is required");
        }
        if (!(typeof isReserved === "boolean")) {
            throw new Error("is_reserved must be of type boolean *** is_reserved = " + isReserved);
        }
    };
    Card.validateEDHRecRank = function (rank) {
        if (rank !== undefined && isNaN(rank)) {
            throw new Error("edhrec_rank must be a number *** edhrec_rank = " + rank);
        }
    };
    Card.validateSetCode = function (code) {
        try {
            index_1.Set.validateSetCode(code);
        }
        catch (e) {
            throw new Error("card set_code invalid: " + e.message);
        }
    };
    Card.validateSetName = function (setName) {
        try {
            index_1.Set.validateSetName(setName);
        }
        catch (e) {
            throw new Error("card set_name invalid: " + e.message);
        }
    };
    Card.validateCollectorNumber = function (collectorNumber) {
        if (collectorNumber === undefined) {
            throw new Error("collector_number is required");
        }
        else if (collectorNumber === "") {
            throw new Error("collector_number cannot be empty");
        }
        else if (!index_1.Utility.isAlphaNumeric(collectorNumber)) {
            throw new Error("collector_number must be alpha-numeric");
        }
    };
    Card.validateImageUri = function (image) {
        if (image === undefined) {
            throw new Error("image_url is required");
        }
        else if (!validUrl.isWebUri(image)) {
            throw new Error("image_uri must be a valid URI *** image_uri = " + image);
        }
        else if (!(image.substr(image.length - 4) === ".png")) {
            throw new Error("image_uri must point to a .png file *** image_uri = " + image);
        }
    };
    Card.validateIsReprint = function (isReprint) {
        if (isReprint === undefined) {
            throw new Error("is_reprint is required");
        }
        if (!(typeof isReprint === "boolean")) {
            throw new Error("is_reprint must be of type boolean *** is_reprint = " + isReprint);
        }
    };
    Card.validateIsDigital = function (isDigital) {
        try {
            index_1.Set.validateIsDigital(isDigital);
        }
        catch (e) {
            throw new Error("card is_digital error: " + e.message);
        }
    };
    Card.validateRarity = function (rarity) {
        if (rarity === undefined) {
            throw new Error("rarity is required");
        }
        else if (rarity === "") {
            throw new Error("rarity cannot be empty");
        }
        else {
            switch (rarity) {
                case enums_1.Rarities.Common:
                case enums_1.Rarities.Uncommon:
                case enums_1.Rarities.Rare:
                case enums_1.Rarities.Mythic:
                    break;
                default:
                    throw new Error("rarity must be one of 'common', 'uncommon', 'rare', or 'mythic' *** rarity = " + rarity);
            }
        }
    };
    Card.validateFlavorText = function (text) {
        if (text !== undefined && text === "") {
            throw new Error("flavor_text cannot be empty");
        }
    };
    Card.validateArtist = function (artist) {
        if (artist === undefined) {
            throw new Error("artist is required");
        }
        if (artist === "") {
            throw new Error("artist cannot be empty");
        }
    };
    Card.validateFrame = function (frame) {
        if (frame === undefined) {
            throw new Error("frame is required");
        }
        else if (frame === "") {
            throw new Error("frame cannot be mepty");
        }
        else {
            switch (frame) {
                case enums_1.Frames.NineteenNinetyThree:
                case enums_1.Frames.NineteenNinetySeven:
                case enums_1.Frames.TwoThousandThree:
                case enums_1.Frames.TwoThousandFifteen:
                case enums_1.Frames.Future:
                    break;
                default:
                    throw new Error("frame must be one of '1993', '1997', '2003', '2015', 'future' *** frame = " + frame);
            }
        }
    };
    Card.validateIsFullArt = function (isFullArt) {
        if (isFullArt === undefined) {
            throw new Error("is_full_art is required");
        }
        if (!(typeof isFullArt === "boolean")) {
            throw new Error("is_full_art must be of type boolean *** is_full_art = " + isFullArt);
        }
    };
    Card.validateWatermark = function (watermark) {
        if (watermark !== undefined) {
            if (watermark === "") {
                throw new Error("watermark cannot be empty");
            }
            else {
                switch (watermark) {
                    case enums_1.Watermarks.Abzan:
                    case enums_1.Watermarks.AgentsOfSneak:
                    case enums_1.Watermarks.Arena:
                    case enums_1.Watermarks.Atarka:
                    case enums_1.Watermarks.Azorius:
                    case enums_1.Watermarks.Boros:
                    case enums_1.Watermarks.ColorPie:
                    case enums_1.Watermarks.Conspiracy:
                    case enums_1.Watermarks.CrossbreedLabs:
                    case enums_1.Watermarks.DAndD:
                    case enums_1.Watermarks.DCI:
                    case enums_1.Watermarks.Dimir:
                    case enums_1.Watermarks.Dromoka:
                    case enums_1.Watermarks.FNM:
                    case enums_1.Watermarks.GoblinExplosioneers:
                    case enums_1.Watermarks.Golgari:
                    case enums_1.Watermarks.GrandPrix:
                    case enums_1.Watermarks.Gruul:
                    case enums_1.Watermarks.Izzet:
                    case enums_1.Watermarks.Jeskai:
                    case enums_1.Watermarks.Junior:
                    case enums_1.Watermarks.JuniorAPAC:
                    case enums_1.Watermarks.JuniorEurope:
                    case enums_1.Watermarks.Kolaghan:
                    case enums_1.Watermarks.LeagueOfDastardlyDoom:
                    case enums_1.Watermarks.Mardu:
                    case enums_1.Watermarks.Mirran:
                    case enums_1.Watermarks.MPS:
                    case enums_1.Watermarks.MTG:
                    case enums_1.Watermarks.MTGFifteen:
                    case enums_1.Watermarks.MTGTen:
                    case enums_1.Watermarks.Nerf:
                    case enums_1.Watermarks.Ojutai:
                    case enums_1.Watermarks.OrderOfTheWidget:
                    case enums_1.Watermarks.Orzhov:
                    case enums_1.Watermarks.Phyrexian:
                    case enums_1.Watermarks.Planeswalker:
                    case enums_1.Watermarks.ProTour:
                    case enums_1.Watermarks.Rakdos:
                    case enums_1.Watermarks.Scholarship:
                    case enums_1.Watermarks.Selesnya:
                    case enums_1.Watermarks.Set:
                    case enums_1.Watermarks.Silumgar:
                    case enums_1.Watermarks.Simic:
                    case enums_1.Watermarks.Sultai:
                    case enums_1.Watermarks.Temur:
                    case enums_1.Watermarks.Transformers:
                    case enums_1.Watermarks.WotC:
                    case enums_1.Watermarks.WPN:
                        break;
                    default:
                        throw new Error("watermark is not in the list of predefined values *** watermark = " + watermark);
                }
            }
        }
    };
    Card.validateBorderColor = function (color) {
        if (color === undefined) {
            throw new Error("border_color is required");
        }
        else if (color === "") {
            throw new Error("border_color cannot be empty");
        }
        else {
            switch (color) {
                case enums_1.BorderColors.Black:
                case enums_1.BorderColors.Borderless:
                case enums_1.BorderColors.Gold:
                case enums_1.BorderColors.Silver:
                case enums_1.BorderColors.White:
                    break;
                default:
                    throw new Error("border_color must be one of a pre-defined value");
            }
        }
    };
    Card.validateStorySpotlightNumber = function (spotlightNumber) {
        if (spotlightNumber !== undefined && isNaN(spotlightNumber)) {
            throw new Error("story_spotlight_number must be a number *** story_spotlight_number = " + spotlightNumber);
        }
    };
    Card.validateStorySpotlightUri = function (uri) {
        if (uri !== undefined) {
            if (uri === "") {
                throw new Error("story_spotlight_uri cannot be empty");
            }
            else if (!validUrl.isWebUri(uri)) {
                throw new Error("story_spotlight_uri must be a valid URI *** story_spotlight_uri = " + uri);
            }
        }
    };
    Card.validateIsTimeshifted = function (isTimeshifted) {
        if (isTimeshifted === undefined) {
            throw new Error("is_timeshifted is required");
        }
        if (!(typeof isTimeshifted === "boolean")) {
            throw new Error("is_timeshifted must be of type boolean *** is_timeshifted = " + isTimeshifted);
        }
    };
    Card.validateIsColorshifted = function (isColorshifted) {
        if (isColorshifted === undefined) {
            throw new Error("is_colorshifted is required");
        }
        if (!(typeof isColorshifted === "boolean")) {
            throw new Error("is_colorshifted must be of type boolean *** is_colorshifted = " + isColorshifted);
        }
    };
    Card.validateIsFutureshifted = function (isFutureshifted) {
        if (isFutureshifted === undefined) {
            throw new Error("is_futureshifted is required");
        }
        if (!(typeof isFutureshifted === "boolean")) {
            throw new Error("is_futureshifted must be of type boolean *** is_futureshifted = " + isFutureshifted);
        }
    };
    Card.validateUsdPrice = function (price) {
        if (price !== undefined) {
            if (isNaN(price)) {
                throw new Error("usd_price must be a number *** usd_price = " + price);
            }
            else if (price < 0) {
                throw new Error("usd_price must be positive *** usd_price = " + price);
            }
        }
    };
    Card.validateTixPrice = function (price) {
        if (price !== undefined) {
            if (isNaN(price)) {
                throw new Error("tix_price must be a number *** tix_price = " + price);
            }
            else if (price < 0) {
                throw new Error("tix_price must be positive *** tix_price = " + price);
            }
        }
    };
    Card.validateEurPrice = function (price) {
        if (price !== undefined) {
            if (isNaN(price)) {
                throw new Error("eur_price must be a number *** eur_price = " + price);
            }
            else if (price < 0) {
                throw new Error("eur_price must be positive *** eur_price = " + price);
            }
        }
    };
    Card.validateRelatedLinks = function (links) {
        if (links !== undefined) {
            if (links.gatherer !== undefined) {
                if (links.gatherer === "") {
                    throw new Error("related_links.gatherer cannot be empty");
                }
                else if (!validUrl.isWebUri(links.gatherer)) {
                    throw new Error("related_links.gatherer is an invalid uri *** related_links.gatherer = " + links.gatherer);
                }
            }
            if (links.tcgplayer !== undefined) {
                if (links.tcgplayer === "") {
                    throw new Error("related_links.tcgplayer cannot be empty");
                }
                else if (!validUrl.isWebUri(links.tcgplayer)) {
                    throw new Error("related_links.tcgplayer is an invalid uri *** related_links.tcgplayer = " + links.tcgplayer);
                }
            }
            if (links.edhrec !== undefined) {
                if (links.edhrec === "") {
                    throw new Error("related_links.edhrec cannot be empty");
                }
                else if (!validUrl.isWebUri(links.edhrec)) {
                    throw new Error("related_links.edhrec is an invalid uri *** related_links.edhrec = " + links.edhrec);
                }
            }
            if (links.mtgtop8 !== undefined) {
                if (links.mtgtop8 === "") {
                    throw new Error("related_links.mtgtop8 cannot be empty");
                }
                else if (!validUrl.isWebUri(links.mtgtop8)) {
                    throw new Error("related_links.mtgtop8 is an invalid uri *** related_links.mtgtop8 = " + links.mtgtop8);
                }
            }
        }
    };
    Card.validatePurchaseLinks = function (links) {
        if (links !== undefined) {
            if (links.amazon !== undefined) {
                if (links.amazon === "") {
                    throw new Error("purchase_links.amazon cannot be empty");
                }
                else if (!validUrl.isWebUri(links.amazon)) {
                    throw new Error("purchase_links.amazon is an invalid uri *** purchase_links.amazon = " + links.amazon);
                }
            }
            if (links.ebay !== undefined) {
                if (links.ebay === "") {
                    throw new Error("purchase_links.ebay cannot be empty");
                }
                else if (!validUrl.isWebUri(links.ebay)) {
                    throw new Error("purchase_links.ebay is an invalid uri *** purchase_links.ebay = " + links.ebay);
                }
            }
            if (links.tcgplayer !== undefined) {
                if (links.tcgplayer === "") {
                    throw new Error("purchase_links.tcgplayer cannot be empty");
                }
                else if (!validUrl.isWebUri(links.tcgplayer)) {
                    throw new Error("purchase_links.tcgplayer is an invalid uri *** purchase_links.tcgplayer = " + links.tcgplayer);
                }
            }
            if (links.magiccardmarket !== undefined) {
                if (links.magiccardmarket === "") {
                    throw new Error("purchase_links.magiccardmarket cannot be empty");
                }
                else if (!validUrl.isWebUri(links.magiccardmarket)) {
                    throw new Error("purchase_links.magiccardmarket is an invalid uri *** purchase_links.magiccardmarket = " + links.magiccardmarket);
                }
            }
            if (links.cardhoarder !== undefined) {
                if (links.cardhoarder === "") {
                    throw new Error("purchase_links.cardhoarder cannot be empty");
                }
                else if (!validUrl.isWebUri(links.cardhoarder)) {
                    throw new Error("purchase_links.cardhoarder is an invalid uri *** purchase_links.cardhoarder = " + links.cardhoarder);
                }
            }
            if (links.card_kingdom !== undefined) {
                if (links.card_kingdom === "") {
                    throw new Error("purchase_links.card_kingdom cannot be empty");
                }
                else if (!validUrl.isWebUri(links.card_kingdom)) {
                    throw new Error("purchase_links.card_kingdom is an invalid uri *** purchase_links.card_kingdom = " + links.card_kingdom);
                }
            }
            if (links.mtgo_traders !== undefined) {
                if (links.mtgo_traders === "") {
                    throw new Error("purchase_links.mtgo_traders cannot be empty");
                }
                else if (!validUrl.isWebUri(links.mtgo_traders)) {
                    throw new Error("purchase_links.mtgo_traders is an invalid uri *** purchase_links.mtgo_traders = " + links.mtgo_traders);
                }
            }
            if (links.coolstuffinc !== undefined) {
                if (links.coolstuffinc === "") {
                    throw new Error("purchase_links.coolstuffinc cannot be empty");
                }
                else if (!validUrl.isWebUri(links.coolstuffinc)) {
                    throw new Error("purchase_links.coolstuffinc is an invalid uri *** purchase_links.coolstuffinc = " + links.coolstuffinc);
                }
            }
        }
    };
    return Card;
}());
exports.Card = Card;
//# sourceMappingURL=card.js.map