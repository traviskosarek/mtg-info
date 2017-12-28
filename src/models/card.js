"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = require("./index");
var enums_1 = require("../enums");
var toughnesses_1 = require("../enums/toughnesses");
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
            this.validateIsFutureShifted(card.is_futureshifted);
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
                    case toughnesses_1.Toughnesses.NegativeOne:
                    case toughnesses_1.Toughnesses.Star:
                    case toughnesses_1.Toughnesses.StarSquared:
                    case toughnesses_1.Toughnesses.QuestionMark:
                    case toughnesses_1.Toughnesses.Zero:
                    case toughnesses_1.Toughnesses.MinusZero:
                    case toughnesses_1.Toughnesses.PlusZero:
                    case toughnesses_1.Toughnesses.OneHalf:
                    case toughnesses_1.Toughnesses.PlusOne:
                    case toughnesses_1.Toughnesses.One:
                    case toughnesses_1.Toughnesses.OnePlusStar:
                    case toughnesses_1.Toughnesses.OneAndOneHalf:
                    case toughnesses_1.Toughnesses.Two:
                    case toughnesses_1.Toughnesses.TwoPlusStar:
                    case toughnesses_1.Toughnesses.PlusTwo:
                    case toughnesses_1.Toughnesses.TwoAndOneHalf:
                    case toughnesses_1.Toughnesses.PlusThree:
                    case toughnesses_1.Toughnesses.Three:
                    case toughnesses_1.Toughnesses.ThreeAndOneHalf:
                    case toughnesses_1.Toughnesses.PlusFour:
                    case toughnesses_1.Toughnesses.Four:
                    case toughnesses_1.Toughnesses.Five:
                    case toughnesses_1.Toughnesses.Six:
                    case toughnesses_1.Toughnesses.SevenMinusStar:
                    case toughnesses_1.Toughnesses.Seven:
                    case toughnesses_1.Toughnesses.Eight:
                    case toughnesses_1.Toughnesses.Nine:
                    case toughnesses_1.Toughnesses.Ten:
                    case toughnesses_1.Toughnesses.Eleven:
                    case toughnesses_1.Toughnesses.Twelve:
                    case toughnesses_1.Toughnesses.Thirteen:
                    case toughnesses_1.Toughnesses.Fourteen:
                    case toughnesses_1.Toughnesses.Fifteen:
                    case toughnesses_1.Toughnesses.Twenty:
                    case toughnesses_1.Toughnesses.NinetyNine:
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
    };
    Card.validateCardFaces = function (faces) {
    };
    Card.validateLegality = function (legality) {
    };
    Card.validateIsReserved = function (isReserved) {
    };
    Card.validateEDHRecRank = function (rank) {
    };
    Card.validateSetCode = function (code) {
        index_1.Set.validateSetCode(code);
    };
    Card.validateSetName = function (setName) {
        index_1.Set.validateSetName(setName);
    };
    Card.validateCollectorNumber = function (collectorNumber) {
    };
    Card.validateImageUri = function (image) {
    };
    Card.validateIsReprint = function (isReprint) {
    };
    Card.validateIsDigital = function (isDigital) {
    };
    Card.validateRarity = function (rarity) {
    };
    Card.validateFlavorText = function (text) {
    };
    Card.validateArtist = function (artist) {
    };
    Card.validateFrame = function (frame) {
    };
    Card.validateIsFullArt = function (isFullArt) {
    };
    Card.validateWatermark = function (watermark) {
    };
    Card.validateBorderColor = function (color) {
    };
    Card.validateStorySpotlightNumber = function (spotlightNumber) {
    };
    Card.validateStorySpotlightUri = function (uri) {
    };
    Card.validateIsTimeshifted = function (isTimeshifted) {
    };
    Card.validateIsColorshifted = function (isColorshifted) {
    };
    Card.validateIsFutureShifted = function (isFutureshifted) {
    };
    Card.validateUsdPrice = function (price) {
    };
    Card.validateTixPrice = function (price) {
    };
    Card.validateEurPrice = function (price) {
    };
    Card.validateRelatedLinks = function (links) {
    };
    Card.validatePurchaseLinks = function (links) {
    };
    return Card;
}());
exports.Card = Card;
//# sourceMappingURL=card.js.map