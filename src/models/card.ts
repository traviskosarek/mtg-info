import { ICard } from "../interfaces";
import { Set } from "./index";
import { Layouts, Powers, Symbols, Loyalties, Colors } from "../enums";
import { Toughnesses } from "../enums/toughnesses";

export class Card {
    public static validateCard(card: ICard) {
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

    public static validateRelatedCards(cards: any[]) {
        //
    }

    public static validateCardFaces(faces: any[]) {
        //
    }

    public static validateLegality(legality: any) {
        //
    }

    public static validateIsReserved(isReserved: boolean) {
        //
    }

    public static validateEDHRecRank(rank: number) {
        //
    }

    public static validateSetCode(code: any) {
        Set.validateSetCode(code);
    }

    public static validateSetName(setName: any) {
        Set.validateSetName(setName);
    }

    public static validateCollectorNumber(collectorNumber: any) {
        //
    }

    public static validateImageUri(image: any) {
        //
    }

    public static validateIsReprint(isReprint: boolean) {
        //
    }

    public static validateIsDigital(isDigital: boolean) {
        //
    }

    public static validateRarity(rarity: any) {
        //
    }

    public static validateFlavorText(text: any) {
        //
    }

    public static validateArtist(artist: any) {
        //
    }

    public static validateFrame(frame: any) {
        //
    }

    public static validateIsFullArt(isFullArt: boolean) {
        //
    }

    public static validateWatermark(watermark: any) {
        //
    }

    public static validateBorderColor(color: any) {
        //
    }

    public static validateStorySpotlightNumber(spotlightNumber: number) {
        //
    }

    public static validateStorySpotlightUri(uri: any) {
        //
    }

    public static validateIsTimeshifted(isTimeshifted: boolean) {
        //
    }

    public static validateIsColorshifted(isColorshifted: boolean) {
        //
    }

    public static validateIsFutureShifted(isFutureshifted: boolean) {
        //
    }

    public static validateUsdPrice(price: any) {
        //
    }

    public static validateTixPrice(price: any) {
        //
    }

    public static validateEurPrice(price: any) {
        //
    }

    public static validateRelatedLinks(links: any) {
        //
    }

    public static validatePurchaseLinks(links: any) {
        //
    }
}
