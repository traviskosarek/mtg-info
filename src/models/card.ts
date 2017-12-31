import { ICard, ICardFace, ICardLegality, ICardPurchaseLinks, ICardRelatedLinks, IRelatedCard } from "../interfaces";
import { Set, Utility } from "./index";
import { Layouts, Powers, Symbols, Loyalties, Colors, Toughnesses, Rarities, Frames, Watermarks, BorderColors } from "../enums";
import * as validUrl from "valid-url";

export class Card {
    public static createCard(card: any): any {
        this.validateCard(card);

        let cardFaces: ICardFace[];
        if (card.card_faces !== undefined) {
            cardFaces = [];
            card.card_faces.forEach((face) => {
                cardFaces.push({
                    color_indicator: face.color_indicator,
                    colors: face.colors,
                    flavor_text: face.flavor_text,
                    image_uri: face.image_uri,
                    loyalty: face.loyalty,
                    mana_cost: face.mana_cost,
                    name: face.name,
                    oracle_text: face.oracle_text,
                    power: face.power,
                    toughness: face.toughness,
                    type_line: face.type_line
                });
            });
        }

        let cardLegality: ICardLegality = {
            is_commander_banned: card.legality.is_commander_banned,
            is_commander_legal: card.legality.is_commander_legal,
            is_commander_restricted: card.legality.is_commander_restricted,
            is_duel_banned: card.legality.is_duel_banned,
            is_duel_legal: card.legality.is_duel_legal,
            is_duel_restricted: card.legality.is_duel_restricted,
            is_frontier_banned: card.legality.is_frontier_banned,
            is_frontier_legal: card.legality.is_frontier_legal,
            is_frontier_restricted: card.legality.is_frontier_restricted,
            is_future_banned: card.legality.is_future_banned,
            is_future_legal: card.legality.is_future_legal,
            is_future_restricted: card.legality.is_future_restricted,
            is_legacy_banned: card.legality.is_legacy_banned,
            is_legacy_legal: card.legality.is_legacy_legal,
            is_legacy_restricted: card.legality.is_legacy_restricted,
            is_modern_banned: card.legality.is_modern_banned,
            is_modern_legal: card.legality.is_modern_legal,
            is_modern_restricted: card.legality.is_modern_restricted,
            is_one_versus_one_banned: card.legality.is_one_versus_one_banned,
            is_one_versus_one_legal: card.legality.is_one_versus_one_legal,
            is_one_versus_one_restricted: card.legality.is_one_versus_one_restricted,
            is_pauper_banned: card.legality.is_pauper_banned,
            is_pauper_legal: card.legality.is_pauper_legal,
            is_pauper_restricted: card.legality.is_pauper_restricted,
            is_penny_banned: card.legality.is_penny_banned,
            is_penny_legal: card.legality.is_penny_legal,
            is_penny_restricted: card.legality.is_penny_restricted,
            is_standard_banned: card.legality.is_standard_banned,
            is_standard_legal: card.legality.is_standard_legal,
            is_standard_restricted: card.legality.is_standard_restricted,
            is_vintage_banned: card.legality.is_vintage_banned,
            is_vintage_legal: card.legality.is_vintage_legal,
            is_vintage_restricted: card.legality.is_vintage_restricted
        };

        let cardPurchaseLinks: ICardPurchaseLinks = {
            amazon: card.purchase_links.amazon,
            card_kingdom: card.purchase_links.card_kingdom,
            cardhoarder: card.purchase_links.cardhoarder,
            coolstuffinc: card.purchase_links.coolstuffinc,
            ebay: card.purchase_links.ebay,
            magiccardmarket: card.purchase_links.magiccardmarket,
            mtgo_traders: card.purchase_links.mtgo_traders,
            tcgplayer: card.purchase_links.tcgplayer
        };

        let cardRelatedCards: IRelatedCard[];
        if (card.related_cards !== undefined) {
            cardRelatedCards = [];
            card.related_cards.forEach((relatedCard) => {
                cardRelatedCards.push({
                    name: relatedCard.name,
                    collector_number: relatedCard.collector_number,
                    set_code: relatedCard.set_code
                });
            });
        }

        let cardRelatedLinks: ICardRelatedLinks = {
            edhrec: card.related_links.edhrec,
            gatherer: card.related_links.gatherer,
            mtgtop8: card.related_links.mtgtop8,
            tcgplayer: card.related_links.tcgplayer
        };

        let validCard: ICard = {
            artist: card.artist,
            border_color: card.border_color,
            card_faces: cardFaces,
            collector_number: card.collector_number,
            color_identity: card.color_identity,
            color_indicator: card.color_indicator,
            colors: card.colors,
            converted_mana_cost: card.converted_mana_cost,
            edhrec_rank: card.edhrec_rank,
            eur_price: card.eur_price,
            flavor_text: card.flavor_text,
            frame: card.frame,
            hand_modifier: card.hand_modifier,
            image_uri: card.image_uri,
            is_colorshifted: card.is_colorshifted,
            is_digital: card.is_digital,
            is_full_art: card.is_full_art,
            is_futureshifted: card.is_futureshifted,
            is_reprint: card.is_reprint,
            is_reserved: card.is_reserved,
            is_timeshifted: card.is_timeshifted,
            layout: card.layout,
            legality: cardLegality,
            life_modifer: card.life_modifer,
            loyalty: card.loyalty,
            mana_cost: card.mana_cost,
            multiverse_ids: card.multiverse_ids,
            name: card.name,
            oracle_text: card.oracle_text,
            power: card.power,
            purchase_links: cardPurchaseLinks,
            rarity: card.rarity,
            related_cards: cardRelatedCards,
            related_links: cardRelatedLinks,
            set_code: card.set_code,
            set_name: card.set_name,
            story_spotlight_number: card.story_spotlight_number,
            story_spotlight_uri: card.story_spotlight_uri,
            tix_price: card.tix_price,
            toughness: card.toughness,
            type_line: card.type_line,
            usd_price: card.usd_price,
            watermark: card.watermark
        };

        return JSON.parse(JSON.stringify(validCard));
    }

    public static validateCard(card: any) {
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
        } catch (e) {
            throw e;
        }
    }

    public static validateMultiverseIds(ids: any) {
        if (ids !== undefined) {
            if (!(ids instanceof Array)) {
                throw new Error("multiverse_ids must be an array of positive numeric values *** multiverse_ids = " + ids);
            } else if (ids.length > 0) {
                ids.forEach((id) => {
                    if (isNaN(id) || id < 0) {
                        throw new Error("multiverse_ids must only contain positive numeric values *** multiverse_ids = " + ids);
                    }
                });
            }
        }
    }

    public static validateName(name: any) {
        if (name === undefined) {
            throw new Error("name is required");
        }
        if (name === "") {
            throw new Error("name cannot be empty");
        }
    }

    public static validateLayout(layout: any) {
        if (layout !== undefined) {
            switch (layout) {
                case Layouts.Augment:
                case Layouts.DoubleFacedToken:
                case Layouts.Emblem:
                case Layouts.Flip:
                case Layouts.Host:
                case Layouts.Leveler:
                case Layouts.Meld:
                case Layouts.Normal:
                case Layouts.Planar:
                case Layouts.Scheme:
                case Layouts.Split:
                case Layouts.Token:
                case Layouts.Transform:
                case Layouts.Vanguard:
                    break;
                default:
                    throw new Error("layout is not in the list of pre-defined values *** layout = " + layout);
            }
        }
    }

    public static validateConvertedManaCost(cmc: any) {
        if (cmc === undefined) {
            throw new Error("converted_mana_cost is required");
        } else if (isNaN(cmc)) {
            throw new Error("converted_mana_cost must be a number value");
        } else if (cmc < 0) {
            throw new Error("converted_mana_cost must be positive *** converted_mana_cost = " + cmc);
        }
    }

    public static validateTypeLine(line: any) {
        if (line === undefined) {
            throw new Error("type_line is required");
        } else if (line === "") {
            throw new Error("type_line cannot be empty");
        }
    }

    public static validateOracleText(text: any) {
        if (text !== undefined && text === "") {
            throw new Error("oracle_text cannot be empty");
        }
    }

    public static validateManaCost(cost: any) {
        if (cost === undefined) {
            throw new Error("mana_cost is required");
        } else if (cost !== "") {
            let manaCosts = cost.split("}");
            manaCosts.forEach((manaCost) => {
                if (manaCost !== "") {
                    switch (manaCost + "}") {
                        case Symbols.White:
                        case Symbols.Blue:
                        case Symbols.Black:
                        case Symbols.Red:
                        case Symbols.Green:
                        // case Symbols.Chaos:
                        case Symbols.Colorless:
                        // case Symbols.Energy:
                        case Symbols.Zero:
                        case Symbols.OneHalf:
                        case Symbols.One:
                        case Symbols.Two:
                        case Symbols.Three:
                        case Symbols.Four:
                        case Symbols.Five:
                        case Symbols.Six:
                        case Symbols.Seven:
                        case Symbols.Eight:
                        case Symbols.Nine:
                        case Symbols.Ten:
                        case Symbols.Eleven:
                        case Symbols.Twelve:
                        case Symbols.Thirteen:
                        case Symbols.Fourteen:
                        case Symbols.Fifteen:
                        case Symbols.Sixteen:
                        case Symbols.Seventeen:
                        case Symbols.Eighteen:
                        case Symbols.Nineteen:
                        case Symbols.Twenty:
                        case Symbols.OneHundred:
                        case Symbols.OneMillion:
                        case Symbols.Infinity:
                        case Symbols.OneBlackOrOneGreen:
                        case Symbols.OneBlackOrOneRed:
                        case Symbols.OneBlueOrOneBlack:
                        case Symbols.OneBlueOrOneRed:
                        case Symbols.OneGreenOrOneBlue:
                        case Symbols.OneGreenOrOneWhite:
                        case Symbols.OneRedOrOneGreen:
                        case Symbols.OneRedOrOneWhite:
                        case Symbols.OneWhiteOrOneBlack:
                        case Symbols.OneWhiteOrOneBlue:
                        case Symbols.OneColoredOrTwoLife:
                        case Symbols.OneBlackOrTwoLife:
                        case Symbols.OneBlueOrTwoLife:
                        case Symbols.OneGreenOrTwoLife:
                        case Symbols.OneRedOrTwoLife:
                        case Symbols.OneWhiteOrTwoLife:
                        case Symbols.OneHalfRed:
                        case Symbols.OneHalfWhite:
                        // case Symbols.Planeswalker:
                        case Symbols.Snow:
                        // case Symbols.Tap:
                        case Symbols.TwoGenericOrOneBlack:
                        case Symbols.TwoGenericOrOneBlue:
                        case Symbols.TwoGenericOrOneGreen:
                        case Symbols.TwoGenericOrOneRed:
                        case Symbols.TwoGenericOrOneWhite:
                        // case Symbols.Untap:
                        case Symbols.XGeneric:
                        case Symbols.YGeneric:
                        case Symbols.ZGeneric:
                            break;

                        default:
                            throw new Error("mana_cost is not the list of pre-defined values *** mana_cost = " + cost);
                    }
                }
            });
        }
    }

    public static validatePower(power: any) {
        if (power !== undefined) {
            if (power === "") {
                throw new Error("power cannot be empty");
            } else {
                switch (power) {
                    case Powers.NegativeOne:
                    case Powers.Star:
                    case Powers.Infinity:
                    case Powers.StarSquared:
                    case Powers.QuestionMark:
                    case Powers.Zero:
                    case Powers.PlusZero:
                    case Powers.OneHalf:
                    case Powers.PlusOne:
                    case Powers.One:
                    case Powers.OnePlusStar:
                    case Powers.OneAndOneHalf:
                    case Powers.Two:
                    case Powers.TwoPlusStar:
                    case Powers.PlusTwo:
                    case Powers.TwoAndOneHalf:
                    case Powers.PlusThree:
                    case Powers.Three:
                    case Powers.ThreeAndOneHalf:
                    case Powers.PlusFour:
                    case Powers.Four:
                    case Powers.Five:
                    case Powers.Six:
                    case Powers.Seven:
                    case Powers.Eight:
                    case Powers.Nine:
                    case Powers.Ten:
                    case Powers.Eleven:
                    case Powers.Twelve:
                    case Powers.Thirteen:
                    case Powers.Fifteen:
                    case Powers.Twenty:
                    case Powers.NinetyNine:
                        break;
                    default:
                        throw new Error("power is not in the list of valid pre-defined values *** power = " + power);
                }
            }
        }
    }

    public static validateToughness(toughness: any) {
        if (toughness !== undefined) {
            if (toughness === "") {
                throw new Error("toughness cannot be empty");
            } else {
                switch (toughness) {
                    case Toughnesses.NegativeOne:
                    case Toughnesses.Star:
                    case Toughnesses.StarSquared:
                    case Toughnesses.QuestionMark:
                    case Toughnesses.Zero:
                    case Toughnesses.MinusZero:
                    case Toughnesses.PlusZero:
                    case Toughnesses.OneHalf:
                    case Toughnesses.PlusOne:
                    case Toughnesses.One:
                    case Toughnesses.OnePlusStar:
                    case Toughnesses.OneAndOneHalf:
                    case Toughnesses.Two:
                    case Toughnesses.TwoPlusStar:
                    case Toughnesses.PlusTwo:
                    case Toughnesses.TwoAndOneHalf:
                    case Toughnesses.PlusThree:
                    case Toughnesses.Three:
                    case Toughnesses.ThreeAndOneHalf:
                    case Toughnesses.PlusFour:
                    case Toughnesses.Four:
                    case Toughnesses.Five:
                    case Toughnesses.Six:
                    case Toughnesses.SevenMinusStar:
                    case Toughnesses.Seven:
                    case Toughnesses.Eight:
                    case Toughnesses.Nine:
                    case Toughnesses.Ten:
                    case Toughnesses.Eleven:
                    case Toughnesses.Twelve:
                    case Toughnesses.Thirteen:
                    case Toughnesses.Fourteen:
                    case Toughnesses.Fifteen:
                    case Toughnesses.Twenty:
                    case Toughnesses.NinetyNine:
                        break;
                    default:
                        throw new Error("toughness is not in the list of valid pre-defined values *** toughness = " + toughness);
                }
            }
        }
    }

    public static validateLoyalty(loyalty: any) {
        if (loyalty !== undefined) {
            if (loyalty === "") {
                throw new Error("loyalty cannot be empty");
            } else {
                switch (loyalty) {
                    case Loyalties.X:
                    case Loyalties.OneDFourPlusOne:
                    case Loyalties.Two:
                    case Loyalties.Three:
                    case Loyalties.Four:
                    case Loyalties.Five:
                    case Loyalties.Six:
                    case Loyalties.Seven:
                    case Loyalties.Twenty:
                        break;
                    default:
                        throw new Error("loyalty is not in the list of valid pre-defined values *** loyalty = " + loyalty);
                }
            }
        }
    }

    public static validateLifeModifier(modifier: any) {
        if (modifier !== undefined && modifier === "") {
            throw new Error("life_modifier cannot be empty");
        }
    }

    public static validateHandModifier(modifier: any) {
        if (modifier !== undefined && modifier === "") {
            throw new Error("hand_modifier cannot be empty");
        }
    }

    public static validateColors(colors: any) {
        if (colors === undefined) {
            throw new Error("colors is required");
        } else if (!(colors instanceof Array)) {
            throw new Error("colors must be an Array *** colors = " + colors);
        } else if (colors.length !== 0) {
            let includesWhite = false;
            let includesBlue = false;
            let includesBlack = false;
            let includesRed = false;
            let includesGreen = false;

            colors.forEach((color) => {
                switch (color) {
                    case Colors.White:
                        if (includesWhite) {
                            throw new Error("colors cannot include multiple white values *** colors = " + colors);
                        } else {
                            includesWhite = true;
                        }
                        break;
                    case Colors.Blue:
                        if (includesBlue) {
                            throw new Error("colors cannot include multiple blue values *** colors = " + colors);
                        } else {
                            includesBlue = true;
                        }
                        break;
                    case Colors.Black:
                        if (includesBlack) {
                            throw new Error("colors cannot include multiple black values *** colors = " + colors);
                        } else {
                            includesBlack = true;
                        }
                        break;
                    case Colors.Red:
                        if (includesRed) {
                            throw new Error("colors cannot include multiple red values *** colors = " + colors);
                        } else {
                            includesRed = true;
                        }
                        break;
                    case Colors.Green:
                        if (includesGreen) {
                            throw new Error("colors cannot include multiple green values *** colors = " + colors);
                        } else {
                            includesGreen = true;
                        }
                        break;
                    default:
                        throw new Error("colors may only include colors in the pre-defined list of values *** color in colors = " + color);
                }
            });
        }
    }

    public static validateColorIndicator(indicator: any) {
        if (indicator !== undefined) {
            if (!(indicator instanceof Array)) {
                throw new Error("color_indicator must be an Array *** color_indicator = " + indicator);
            } else if (indicator.length !== 0) {
                let includesWhite = false;
                let includesBlue = false;
                let includesBlack = false;
                let includesRed = false;
                let includesGreen = false;

                indicator.forEach((color) => {
                    switch (color) {
                        case Colors.White:
                            if (includesWhite) {
                                throw new Error("color_indicator cannot include multiple white values *** color_indicator = " + indicator);
                            } else {
                                includesWhite = true;
                            }
                            break;
                        case Colors.Blue:
                            if (includesBlue) {
                                throw new Error("color_indicator cannot include multiple blue values *** color_indicator = " + indicator);
                            } else {
                                includesBlue = true;
                            }
                            break;
                        case Colors.Black:
                            if (includesBlack) {
                                throw new Error("color_indicator cannot include multiple black values *** color_indicator = " + indicator);
                            } else {
                                includesBlack = true;
                            }
                            break;
                        case Colors.Red:
                            if (includesRed) {
                                throw new Error("color_indicator cannot include multiple red values *** color_indicator = " + indicator);
                            } else {
                                includesRed = true;
                            }
                            break;
                        case Colors.Green:
                            if (includesGreen) {
                                throw new Error("color_indicator cannot include multiple green values *** color_indicator = " + indicator);
                            } else {
                                includesGreen = true;
                            }
                            break;
                        default:
                            throw new Error("color_indicator may only include colors in the pre-defined list of values *** color in color_indicator = " + color);
                    }
                });
            }
        }
    }

    public static validateColorIdentity(identity: any) {
        if (identity === undefined) {
            throw new Error("color_identity is required");
        } else if (!(identity instanceof Array)) {
            throw new Error("identity must be an Array *** color_identity = " + identity);
        } else if (identity.length !== 0) {
            let includesWhite = false;
            let includesBlue = false;
            let includesBlack = false;
            let includesRed = false;
            let includesGreen = false;

            identity.forEach((color) => {
                switch (color) {
                    case Colors.White:
                        if (includesWhite) {
                            throw new Error("color_identity cannot include multiple white values *** color_identity = " + identity);
                        } else {
                            includesWhite = true;
                        }
                        break;
                    case Colors.Blue:
                        if (includesBlue) {
                            throw new Error("color_identity cannot include multiple blue values *** color_identity = " + identity);
                        } else {
                            includesBlue = true;
                        }
                        break;
                    case Colors.Black:
                        if (includesBlack) {
                            throw new Error("color_identity cannot include multiple black values *** color_identity = " + identity);
                        } else {
                            includesBlack = true;
                        }
                        break;
                    case Colors.Red:
                        if (includesRed) {
                            throw new Error("color_identity cannot include multiple red values *** color_identity = " + identity);
                        } else {
                            includesRed = true;
                        }
                        break;
                    case Colors.Green:
                        if (includesGreen) {
                            throw new Error("color_identity cannot include multiple green values *** color_identity = " + identity);
                        } else {
                            includesGreen = true;
                        }
                        break;
                    default:
                        throw new Error("color_identity may only include colors in the pre-defined list of values *** color in color_identity = " + color);
                }
            });
        }
    }

    public static validateRelatedCards(cards: any) {
        if (cards !== undefined) {
            if (!(cards instanceof Array)) {
                throw new Error("related_cards must be an Array ** type of related_cards = " + typeof cards);
            } else if (cards.length === 0) {
                throw new Error("related_cards cannot be an empty Array");
            } else {
                cards.forEach((card) => {
                    try {
                        this.validateName(card.name);
                        this.validateSetCode(card.set_code);
                        this.validateCollectorNumber(card.collector_number);
                    } catch (e) {
                        throw new Error("Error in related_cards: " + e.message);
                    }
                });
            }
        }
    }

    public static validateCardFaces(faces: any) {
        if (faces !== undefined) {
            if (!(faces instanceof Array)) {
                throw new Error("card_faces should be an Array *** card_faces = " + faces);
            } else if (faces.length === 0) {
                throw new Error("card_faces cannot be an empty Array");
            } else {
                faces.forEach((face) => {
                    this.validateName(face.name);
                    this.validateTypeLine(face.type_line);
                    this.validateOracleText(face.oracle_text);
                    this.validateManaCost(face.mana_cost);
                    this.validateColors(face.colors);
                    this.validateColorIndicator(face.color_identity);
                    this.validatePower(face.power);
                    this.validateToughness(face.toughness);
                    this.validateLoyalty(face.loyalty);
                    this.validateFlavorText(face.flavor_text);
                    this.validateImageUri(face.image_uri);
                });
            }
        }
    }

    public static validateLegality(legality: any) {
        if (legality === undefined) {
            throw new Error("legality is required");
        } else if (legality.is_standard_legal === undefined) {
            throw new Error("legality.is_standard_legal is required");
        } else if (typeof legality.is_standard_legal !== "boolean") {
            throw new Error("legality.is_standard_legal must be a boolean value *** legality.is_standard_legal = " + legality.is_standard_legal);
        } else if (legality.is_frontier_legal === undefined) {
            throw new Error("legality.is_frontier_legal is required");
        } else if (typeof legality.is_frontier_legal !== "boolean") {
            throw new Error("legality.is_frontier_legal must be a boolean value *** legality.is_frontier_legal = " + legality.is_frontier_legal);
        } else if (legality.is_modern_legal === undefined) {
            throw new Error("legality.is_modern_legal is required");
        } else if (typeof legality.is_modern_legal !== "boolean") {
            throw new Error("legality.is_modern_legal must be a boolean value *** legality.is_modern_legal = " + legality.is_modern_legal);
        } else if (legality.is_pauper_legal === undefined) {
            throw new Error("legality.is_pauper_legal is required");
        } else if (typeof legality.is_pauper_legal !== "boolean") {
            throw new Error("legality.is_pauper_legal must be a boolean value *** legality.is_pauper_legal = " + legality.is_pauper_legal);
        } else if (legality.is_legacy_legal === undefined) {
            throw new Error("legality.is_legacy_legal is required");
        } else if (typeof legality.is_legacy_legal !== "boolean") {
            throw new Error("legality.is_legacy_legal must be a boolean value *** legality.is_legacy_legal = " + legality.is_legacy_legal);
        } else if (legality.is_penny_legal === undefined) {
            throw new Error("legality.is_penny_legal is required");
        } else if (typeof legality.is_penny_legal !== "boolean") {
            throw new Error("legality.is_penny_legal must be a boolean value *** legality.is_penny_legal = " + legality.is_penny_legal);
        } else if (legality.is_vintage_legal === undefined) {
            throw new Error("legality.is_vintage_legal is required");
        } else if (typeof legality.is_vintage_legal !== "boolean") {
            throw new Error("legality.is_vintage_legal must be a boolean value *** legality.is_vintage_legal = " + legality.is_vintage_legal);
        } else if (legality.is_duel_legal === undefined) {
            throw new Error("legality.is_duel_legal is required");
        } else if (typeof legality.is_duel_legal !== "boolean") {
            throw new Error("legality.is_duel_legal must be a boolean value *** legality.is_duel_legal = " + legality.is_duel_legal);
        } else if (legality.is_commander_legal === undefined) {
            throw new Error("legality.is_commander_legal is required");
        } else if (typeof legality.is_commander_legal !== "boolean") {
            throw new Error("legality.is_commander_legal must be a boolean value *** legality.is_commander_legal = " + legality.is_commander_legal);
        } else if (legality.is_one_versus_one_legal === undefined) {
            throw new Error("legality.is_one_versus_one_legal is required");
        } else if (typeof legality.is_one_versus_one_legal !== "boolean") {
            throw new Error("legality.is_one_versus_one_legal must be a boolean value *** legality.is_one_versus_one_legal = " + legality.is_one_versus_one_legal);
        } else if (legality.is_future_legal === undefined) {
            throw new Error("legality.is_future_legal is required");
        } else if (typeof legality.is_future_legal !== "boolean") {
            throw new Error("legality.is_future_legal must be a boolean value *** legality.is_future_legal = " + legality.is_future_legal);
        } else if (legality.is_standard_banned !== undefined && typeof legality.is_standard_banned !== "boolean") {
            throw new Error("legality.is_standard_banned must be a boolean value *** legality.is_standard_banned = " + legality.is_standard_banned);
        } else if (legality.is_frontier_banned !== undefined && typeof legality.is_frontier_banned !== "boolean") {
            throw new Error("legality.is_frontier_banned must be a boolean value *** legality.is_frontier_banned = " + legality.is_frontier_banned);
        } else if (legality.is_modern_banned !== undefined && typeof legality.is_modern_banned !== "boolean") {
            throw new Error("legality.is_modern_banned must be a boolean value *** legality.is_modern_banned = " + legality.is_modern_banned);
        } else if (legality.is_pauper_banned !== undefined && typeof legality.is_pauper_banned !== "boolean") {
            throw new Error("legality.is_pauper_banned must be a boolean value *** legality.is_pauper_banned = " + legality.is_pauper_banned);
        } else if (legality.is_legacy_banned !== undefined && typeof legality.is_legacy_banned !== "boolean") {
            throw new Error("legality.is_legacy_banned must be a boolean value *** legality.is_legacy_banned = " + legality.is_legacy_banned);
        } else if (legality.is_penny_banned !== undefined && typeof legality.is_penny_banned !== "boolean") {
            throw new Error("legality.is_penny_banned must be a boolean value *** legality.is_penny_banned = " + legality.is_penny_banned);
        } else if (legality.is_vintage_banned !== undefined && typeof legality.is_vintage_banned !== "boolean") {
            throw new Error("legality.is_vintage_banned must be a boolean value *** legality.is_vintage_banned = " + legality.is_vintage_banned);
        } else if (legality.is_duel_banned !== undefined && typeof legality.is_duel_banned !== "boolean") {
            throw new Error("legality.is_duel_banned must be a boolean value *** legality.is_duel_banned = " + legality.is_duel_banned);
        } else if (legality.is_commander_banned !== undefined && typeof legality.is_commander_banned !== "boolean") {
            throw new Error("legality.is_commander_banned must be a boolean value *** legality.is_commander_banned = " + legality.is_commander_banned);
        } else if (legality.is_one_versus_one_banned !== undefined && typeof legality.is_one_versus_one_banned !== "boolean") {
            throw new Error("legality.is_one_versus_one_banned must be a boolean value *** legality.is_one_versus_one_banned = " + legality.is_one_versus_one_banned);
        } else if (legality.is_future_banned !== undefined && typeof legality.is_future_banned !== "boolean") {
            throw new Error("legality.is_future_banned must be a boolean value *** legality.is_future_banned = " + legality.is_future_banned);
        } else if (legality.is_standard_restricted !== undefined && typeof legality.is_standard_restricted !== "boolean") {
            throw new Error("legality.is_standard_restricted must be a boolean value *** legality.is_standard_restricted = " + legality.is_standard_restricted);
        } else if (legality.is_frontier_restricted !== undefined && typeof legality.is_frontier_restricted !== "boolean") {
            throw new Error("legality.is_frontier_restricted must be a boolean value *** legality.is_frontier_restricted = " + legality.is_frontier_restricted);
        } else if (legality.is_modern_restricted !== undefined && typeof legality.is_modern_restricted !== "boolean") {
            throw new Error("legality.is_modern_restricted must be a boolean value *** legality.is_modern_restricted = " + legality.is_modern_restricted);
        } else if (legality.is_pauper_restricted !== undefined && typeof legality.is_pauper_restricted !== "boolean") {
            throw new Error("legality.is_pauper_restricted must be a boolean value *** legality.is_pauper_restricted = " + legality.is_pauper_restricted);
        } else if (legality.is_legacy_restricted !== undefined && typeof legality.is_legacy_restricted !== "boolean") {
            throw new Error("legality.is_legacy_restricted must be a boolean value *** legality.is_legacy_restricted = " + legality.is_legacy_restricted);
        } else if (legality.is_penny_restricted !== undefined && typeof legality.is_penny_restricted !== "boolean") {
            throw new Error("legality.is_penny_restricted must be a boolean value *** legality.is_penny_restricted = " + legality.is_penny_restricted);
        } else if (legality.is_vintage_restricted !== undefined && typeof legality.is_vintage_restricted !== "boolean") {
            throw new Error("legality.is_vintage_restricted must be a boolean value *** legality.is_vintage_restricted = " + legality.is_vintage_restricted);
        } else if (legality.is_duel_restricted !== undefined && typeof legality.is_duel_restricted !== "boolean") {
            throw new Error("legality.is_duel_restricted must be a boolean value *** legality.is_duel_restricted = " + legality.is_duel_restricted);
        } else if (legality.is_commander_restricted !== undefined && typeof legality.is_commander_restricted !== "boolean") {
            throw new Error("legality.is_commander_restricted must be a boolean value *** legality.is_commander_restricted = " + legality.is_commander_restricted);
        } else if (legality.is_one_versus_one_restricted !== undefined && typeof legality.is_one_versus_one_restricted !== "boolean") {
            throw new Error("legality.is_one_versus_one_restricted must be a boolean value *** legality.is_one_versus_one_restricted = " + legality.is_one_versus_one_restricted);
        } else if (legality.is_future_restricted !== undefined && typeof legality.is_future_restricted !== "boolean") {
            throw new Error("legality.is_future_restricted must be a boolean value *** legality.is_future_restricted = " + legality.is_future_restricted);
        }
    }

    public static validateIsReserved(isReserved: any) {
        if (isReserved === undefined) {
            throw new Error("is_reserved is required");
        }
        if (!(typeof isReserved === "boolean")) {
            throw new Error("is_reserved must be of type boolean *** is_reserved = " + isReserved);
        }
    }

    public static validateEDHRecRank(rank: any) {
        if (rank !== undefined && isNaN(rank)) {
            throw new Error("edhrec_rank must be a number *** edhrec_rank = " + rank);
        }
    }

    public static validateSetCode(code: any) {
        try {
            Set.validateSetCode(code);
        } catch (e) {
            throw new Error("card set_code invalid: " + e.message);
        }
    }

    public static validateSetName(setName: any) {
        try {
            Set.validateSetName(setName);
        } catch (e) {
            throw new Error("card set_name invalid: " + e.message);
        }
    }

    public static validateCollectorNumber(collectorNumber: any) {
        if (collectorNumber === undefined) {
            throw new Error("collector_number is required");
        } else if (collectorNumber === "") {
            throw new Error("collector_number cannot be empty");
        } else if (!Utility.isAlphaNumeric(collectorNumber)) {
            throw new Error("collector_number must be alpha-numeric");
        }
    }

    public static validateImageUri(image: any) {
        if (image === undefined) {
            throw new Error("image_url is required");
        } else if (!validUrl.isWebUri(image)) {
            throw new Error("image_uri must be a valid URI *** image_uri = " + image);
        } else if (!(image.substr(image.length - 4) === ".png")) {
            throw new Error("image_uri must point to a .png file *** image_uri = " + image);
        }
    }

    public static validateIsReprint(isReprint: any) {
        if (isReprint === undefined) {
            throw new Error("is_reprint is required");
        }
        if (!(typeof isReprint === "boolean")) {
            throw new Error("is_reprint must be of type boolean *** is_reprint = " + isReprint);
        }
    }

    public static validateIsDigital(isDigital: any) {
        try {
            Set.validateIsDigital(isDigital);
        } catch (e) {
            throw new Error("card is_digital error: " + e.message);
        }
    }

    public static validateRarity(rarity: any) {
        if (rarity === undefined) {
            throw new Error("rarity is required");
        } else if (rarity === "") {
            throw new Error("rarity cannot be empty");
        } else {
            switch (rarity) {
                case Rarities.Common:
                case Rarities.Uncommon:
                case Rarities.Rare:
                case Rarities.Mythic:
                    break;
                default:
                    throw new Error("rarity must be one of 'common', 'uncommon', 'rare', or 'mythic' *** rarity = " + rarity);
            }
        }
    }

    public static validateFlavorText(text: any) {
        if (text !== undefined && text === "") {
            throw new Error("flavor_text cannot be empty");
        }
    }

    public static validateArtist(artist: any) {
        if (artist === undefined) {
            throw new Error("artist is required");
        }
        if (artist === "") {
            throw new Error("artist cannot be empty");
        }
    }

    public static validateFrame(frame: any) {
        if (frame === undefined) {
            throw new Error("frame is required");
        } else if (frame === "") {
            throw new Error("frame cannot be mepty");
        } else {
            switch (frame) {
                case Frames.NineteenNinetyThree:
                case Frames.NineteenNinetySeven:
                case Frames.TwoThousandThree:
                case Frames.TwoThousandFifteen:
                case Frames.Future:
                    break;
                default:
                    throw new Error("frame must be one of '1993', '1997', '2003', '2015', 'future' *** frame = " + frame);
            }
        }
    }

    public static validateIsFullArt(isFullArt: any) {
        if (isFullArt === undefined) {
            throw new Error("is_full_art is required");
        }
        if (!(typeof isFullArt === "boolean")) {
            throw new Error("is_full_art must be of type boolean *** is_full_art = " + isFullArt);
        }
    }

    public static validateWatermark(watermark: any) {
        if (watermark !== undefined) {
            if (watermark === "") {
                throw new Error("watermark cannot be empty");
            } else {
                switch (watermark) {
                    case Watermarks.Abzan:
                    case Watermarks.AgentsOfSneak:
                    case Watermarks.Arena:
                    case Watermarks.Atarka:
                    case Watermarks.Azorius:
                    case Watermarks.Boros:
                    case Watermarks.ColorPie:
                    case Watermarks.Conspiracy:
                    case Watermarks.CrossbreedLabs:
                    case Watermarks.DAndD:
                    case Watermarks.DCI:
                    case Watermarks.Dimir:
                    case Watermarks.Dromoka:
                    case Watermarks.FNM:
                    case Watermarks.GoblinExplosioneers:
                    case Watermarks.Golgari:
                    case Watermarks.GrandPrix:
                    case Watermarks.Gruul:
                    case Watermarks.Izzet:
                    case Watermarks.Jeskai:
                    case Watermarks.Junior:
                    case Watermarks.JuniorAPAC:
                    case Watermarks.JuniorEurope:
                    case Watermarks.Kolaghan:
                    case Watermarks.LeagueOfDastardlyDoom:
                    case Watermarks.Mardu:
                    case Watermarks.Mirran:
                    case Watermarks.MPS:
                    case Watermarks.MTG:
                    case Watermarks.MTGFifteen:
                    case Watermarks.MTGTen:
                    case Watermarks.Nerf:
                    case Watermarks.Ojutai:
                    case Watermarks.OrderOfTheWidget:
                    case Watermarks.Orzhov:
                    case Watermarks.Phyrexian:
                    case Watermarks.Planeswalker:
                    case Watermarks.ProTour:
                    case Watermarks.Rakdos:
                    case Watermarks.Scholarship:
                    case Watermarks.Selesnya:
                    case Watermarks.Set:
                    case Watermarks.Silumgar:
                    case Watermarks.Simic:
                    case Watermarks.Sultai:
                    case Watermarks.Temur:
                    case Watermarks.Transformers:
                    case Watermarks.WotC:
                    case Watermarks.WPN:
                        break;
                    default:
                        throw new Error("watermark is not in the list of predefined values *** watermark = " + watermark);
                }
            }
        }
    }

    public static validateBorderColor(color: any) {
        if (color === undefined) {
            throw new Error("border_color is required");
        } else if (color === "") {
            throw new Error("border_color cannot be empty");
        } else {
            switch (color) {
                case BorderColors.Black:
                case BorderColors.Borderless:
                case BorderColors.Gold:
                case BorderColors.Silver:
                case BorderColors.White:
                    break;
                default:
                    throw new Error("border_color must be one of a pre-defined value");
            }
        }
    }

    public static validateStorySpotlightNumber(spotlightNumber: any) {
        if (spotlightNumber !== undefined && isNaN(spotlightNumber)) {
            throw new Error("story_spotlight_number must be a number *** story_spotlight_number = " + spotlightNumber);
        }
    }

    public static validateStorySpotlightUri(uri: any) {
        if (uri !== undefined) {
            if (uri === "") {
                throw new Error("story_spotlight_uri cannot be empty");
            } else if (!validUrl.isWebUri(uri)) {
                throw new Error("story_spotlight_uri must be a valid URI *** story_spotlight_uri = " + uri);
            }
        }
    }

    public static validateIsTimeshifted(isTimeshifted: any) {
        if (isTimeshifted === undefined) {
            throw new Error("is_timeshifted is required");
        }
        if (!(typeof isTimeshifted === "boolean")) {
            throw new Error("is_timeshifted must be of type boolean *** is_timeshifted = " + isTimeshifted);
        }
    }

    public static validateIsColorshifted(isColorshifted: any) {
        if (isColorshifted === undefined) {
            throw new Error("is_colorshifted is required");
        }
        if (!(typeof isColorshifted === "boolean")) {
            throw new Error("is_colorshifted must be of type boolean *** is_colorshifted = " + isColorshifted);
        }
    }

    public static validateIsFutureshifted(isFutureshifted: any) {
        if (isFutureshifted === undefined) {
            throw new Error("is_futureshifted is required");
        }
        if (!(typeof isFutureshifted === "boolean")) {
            throw new Error("is_futureshifted must be of type boolean *** is_futureshifted = " + isFutureshifted);
        }
    }

    public static validateUsdPrice(price: any) {
        if (price !== undefined) {
            if (isNaN(price)) {
                throw new Error("usd_price must be a number *** usd_price = " + price);
            } else if (price < 0) {
                throw new Error("usd_price must be positive *** usd_price = " + price);
            }
        }
    }

    public static validateTixPrice(price: any) {
        if (price !== undefined) {
            if (isNaN(price)) {
                throw new Error("tix_price must be a number *** tix_price = " + price);
            } else if (price < 0) {
                throw new Error("tix_price must be positive *** tix_price = " + price);
            }
        }
    }

    public static validateEurPrice(price: any) {
        if (price !== undefined) {
            if (isNaN(price)) {
                throw new Error("eur_price must be a number *** eur_price = " + price);
            } else if (price < 0) {
                throw new Error("eur_price must be positive *** eur_price = " + price);
            }
        }
    }

    public static validateRelatedLinks(links: any) {
        if (links !== undefined) {
            if (links.gatherer !== undefined) {
                if (links.gatherer === "") {
                    throw new Error("related_links.gatherer cannot be empty");
                } else if (!validUrl.isWebUri(links.gatherer)) {
                    throw new Error("related_links.gatherer is an invalid uri *** related_links.gatherer = " + links.gatherer);
                }
            }

            if (links.tcgplayer !== undefined) {
                if (links.tcgplayer === "") {
                    throw new Error("related_links.tcgplayer cannot be empty");
                } else if (!validUrl.isWebUri(links.tcgplayer)) {
                    throw new Error("related_links.tcgplayer is an invalid uri *** related_links.tcgplayer = " + links.tcgplayer);
                }
            }

            if (links.edhrec !== undefined) {
                if (links.edhrec === "") {
                    throw new Error("related_links.edhrec cannot be empty");
                } else if (!validUrl.isWebUri(links.edhrec)) {
                    throw new Error("related_links.edhrec is an invalid uri *** related_links.edhrec = " + links.edhrec);
                }
            }

            if (links.mtgtop8 !== undefined) {
                if (links.mtgtop8 === "") {
                    throw new Error("related_links.mtgtop8 cannot be empty");
                } else if (!validUrl.isWebUri(links.mtgtop8)) {
                    throw new Error("related_links.mtgtop8 is an invalid uri *** related_links.mtgtop8 = " + links.mtgtop8);
                }
            }
        }
    }

    public static validatePurchaseLinks(links: any) {
        if (links !== undefined) {
            if (links.amazon !== undefined) {
                if (links.amazon === "") {
                    throw new Error("purchase_links.amazon cannot be empty");
                } else if (!validUrl.isWebUri(links.amazon)) {
                    throw new Error("purchase_links.amazon is an invalid uri *** purchase_links.amazon = " + links.amazon);
                }
            }

            if (links.ebay !== undefined) {
                if (links.ebay === "") {
                    throw new Error("purchase_links.ebay cannot be empty");
                } else if (!validUrl.isWebUri(links.ebay)) {
                    throw new Error("purchase_links.ebay is an invalid uri *** purchase_links.ebay = " + links.ebay);
                }
            }

            if (links.tcgplayer !== undefined) {
                if (links.tcgplayer === "") {
                    throw new Error("purchase_links.tcgplayer cannot be empty");
                } else if (!validUrl.isWebUri(links.tcgplayer)) {
                    throw new Error("purchase_links.tcgplayer is an invalid uri *** purchase_links.tcgplayer = " + links.tcgplayer);
                }
            }

            if (links.magiccardmarket !== undefined) {
                if (links.magiccardmarket === "") {
                    throw new Error("purchase_links.magiccardmarket cannot be empty");
                } else if (!validUrl.isWebUri(links.magiccardmarket)) {
                    throw new Error("purchase_links.magiccardmarket is an invalid uri *** purchase_links.magiccardmarket = " + links.magiccardmarket);
                }
            }

            if (links.cardhoarder !== undefined) {
                if (links.cardhoarder === "") {
                    throw new Error("purchase_links.cardhoarder cannot be empty");
                } else if (!validUrl.isWebUri(links.cardhoarder)) {
                    throw new Error("purchase_links.cardhoarder is an invalid uri *** purchase_links.cardhoarder = " + links.cardhoarder);
                }
            }

            if (links.card_kingdom !== undefined) {
                if (links.card_kingdom === "") {
                    throw new Error("purchase_links.card_kingdom cannot be empty");
                } else if (!validUrl.isWebUri(links.card_kingdom)) {
                    throw new Error("purchase_links.card_kingdom is an invalid uri *** purchase_links.card_kingdom = " + links.card_kingdom);
                }
            }

            if (links.mtgo_traders !== undefined) {
                if (links.mtgo_traders === "") {
                    throw new Error("purchase_links.mtgo_traders cannot be empty");
                } else if (!validUrl.isWebUri(links.mtgo_traders)) {
                    throw new Error("purchase_links.mtgo_traders is an invalid uri *** purchase_links.mtgo_traders = " + links.mtgo_traders);
                }
            }

            if (links.coolstuffinc !== undefined) {
                if (links.coolstuffinc === "") {
                    throw new Error("purchase_links.coolstuffinc cannot be empty");
                } else if (!validUrl.isWebUri(links.coolstuffinc)) {
                    throw new Error("purchase_links.coolstuffinc is an invalid uri *** purchase_links.coolstuffinc = " + links.coolstuffinc);
                }
            }
        }
    }
}
