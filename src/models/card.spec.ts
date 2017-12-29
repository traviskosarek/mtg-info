import "mocha";
import { expect } from "chai";
import * as sinon from "sinon";

import { Set } from "./set";
import { Card } from "./card";
import { ICard, IRelatedCard, ICardFace } from "../interfaces";
import { Layouts, Symbols, Powers, Loyalties, Colors, Rarities, Toughnesses, Frames, Watermarks, BorderColors } from "../enums";

let sandbox;
beforeEach(function() {
    sandbox = sinon.sandbox.create();
});

afterEach(function() {
    sandbox.restore();
});

describe("Card", () => {
    describe("validateCard", () => {
        it("should validate card fields", () => {
            // arrange
            let card = {
                multiverse_ids: [426786],
                name: "Cruel Reality",
                layout: "normal",
                image_uri: "https://img.scryfall.com/cards/png/en/akh/84.png?1509809491",
                converted_mana_cost: 7,
                type_line: "Enchantment — Aura Curse",
                oracle_text: "Enchant player At the beginning of enchanted player's upkeep, that player sacrifices a creature or planeswalker. If the player can't, he or she loses 5 life.",
                mana_cost: "{5}{B}{B}",
                colors: ["B"],
                color_identity: ["B"],
                legality: {
                    is_standard_legal: true,
                    is_frontier_legal: true,
                    is_modern_legal: true,
                    is_pauper_legal: false,
                    is_legacy_legal: true,
                    is_penny_legal: false,
                    is_vintage_legal: true,
                    is_duel_legal: true,
                    is_commander_legal: true,
                    is_one_versus_one_legal: true,
                    is_future_legal: true
                },
                is_reserved: false,
                is_reprint: false,
                set_code: "akh",
                set_name: "Amonkhet",
                collector_number: "84",
                is_digital: false,
                rarity: "mythic",
                watermark: "planeswalker",
                flavor_text: "As Gideon watched the initiate murder his crop-mate, his admiration of the city of Naktamun gave way to horror.",
                artist: "Kieran Yanner",
                frame: "2015",
                is_full_art: false,
                border_color: "black",
                is_timeshifted: false,
                is_colorshifted: false,
                is_futureshifted: false,
                story_spotlight_number: 2,
                story_spotlight_uri: "http://magic.wizards.com/en/articles/archive/magic-story/brazen-2017-05-03",
                edhrec_rank: 1849,
                usd_price: "0.49",
                tix_price: "0.20",
                eur_price: "0.37",
                related_links: {
                    gatherer: "http://gatherer.wizards.com/Pages/Card/Details.aspx?multiverseid=426786",
                    tcgplayer: "http://decks.tcgplayer.com/magic/deck/search?contains=Cruel+Reality&page=1&partner=Scryfall",
                    edhrec: "http://edhrec.com/route/?cc=Cruel+Reality",
                    mtgtop8: "http://mtgtop8.com/search?MD_check=1&SB_check=1&cards=Cruel+Reality"
                },
                purchase_links: {
                    amazon: "https://www.amazon.com/gp/search?ie=UTF8&index=toys-and-games&keywords=Cruel+Reality&tag=scryfall-20",
                    ebay:
                        "http://rover.ebay.com/rover/1/711-53200-19255-0/1?campid=5337966903&icep_catId=19107&icep_ff3=10&icep_sortBy=12&icep_uq=Cruel+Reality&icep_vectorid=229466&ipn=psmain&kw=lg&kwid=902099&mtid=824&pub=5575230669&toolid=10001",
                    tcgplayer: "http://store.tcgplayer.com/magic/amonkhet/cruel-reality?partner=Scryfall",
                    magiccardmarket: "https://www.cardmarket.com/Magic/Products/Singles/Amonkhet/Cruel+Reality?referrer=scryfall",
                    cardhoarder: "https://www.cardhoarder.com/cards/63770?affiliate_id=scryfall&ref=card-profile&utm_campaign=affiliate&utm_medium=card&utm_source=scryfall",
                    card_kingdom: "https://www.cardkingdom.com/catalog/item/211792?partner=scryfall&utm_campaign=affiliate&utm_medium=scryfall&utm_source=scryfall",
                    mtgo_traders: "http://www.mtgotraders.com/deck/ref.php?id=63770&referral=scryfall",
                    coolstuffinc: "http://www.coolstuffinc.com/p/Magic%3A+The+Gathering/Cruel+Reality?utm_source=scryfall"
                }
            };
            let errorThrown = false;

            let validateArtistStub = sandbox.stub(Card, "validateArtist");
            let validateBorderColorStub = sandbox.stub(Card, "validateBorderColor");
            let validateCardFacesStub = sandbox.stub(Card, "validateCardFaces");
            let validateCollectorNumberStub = sandbox.stub(Card, "validateCollectorNumber");
            let validateColorIdentityStub = sandbox.stub(Card, "validateColorIdentity");
            let validateColorIndicatorStub = sandbox.stub(Card, "validateColorIndicator");
            let validateColorsStub = sandbox.stub(Card, "validateColors");
            let validateConvertedManaCostStub = sandbox.stub(Card, "validateConvertedManaCost");
            let validateEDHRecRankStub = sandbox.stub(Card, "validateEDHRecRank");
            let validateEurPriceStub = sandbox.stub(Card, "validateEurPrice");
            let validateTixPriceStub = sandbox.stub(Card, "validateTixPrice");
            let validateUsdPriceStub = sandbox.stub(Card, "validateUsdPrice");
            let validateFlavorTextStub = sandbox.stub(Card, "validateFlavorText");
            let validateFrameStub = sandbox.stub(Card, "validateFrame");
            let validateHandModifierStub = sandbox.stub(Card, "validateHandModifier");
            let validateImageUriStub = sandbox.stub(Card, "validateImageUri");
            let validateIsColorshiftedStub = sandbox.stub(Card, "validateIsColorshifted");
            let validateIsDigitalStub = sandbox.stub(Card, "validateIsDigital");
            let validateIsFullArtStub = sandbox.stub(Card, "validateIsFullArt");
            let validateIsFutureshiftedStub = sandbox.stub(Card, "validateIsFutureshifted");
            let validateIsReprintStub = sandbox.stub(Card, "validateIsReprint");
            let validateIsReservedStub = sandbox.stub(Card, "validateIsReserved");
            let validateIsTimeshiftedStub = sandbox.stub(Card, "validateIsTimeshifted");
            let validateLayoutStub = sandbox.stub(Card, "validateLayout");
            let validateLegalityStub = sandbox.stub(Card, "validateLegality");
            let validateLifeModifierStub = sandbox.stub(Card, "validateLifeModifier");
            let validateLoyaltyStub = sandbox.stub(Card, "validateLoyalty");
            let validateManaCostStub = sandbox.stub(Card, "validateManaCost");
            let validateMultiverseIdsStub = sandbox.stub(Card, "validateMultiverseIds");
            let validateNameStub = sandbox.stub(Card, "validateName");
            let validateOracleTextStub = sandbox.stub(Card, "validateOracleText");
            let validatePowerStub = sandbox.stub(Card, "validatePower");
            let validatePurchaseLinksStub = sandbox.stub(Card, "validatePurchaseLinks");
            let validateRarityStub = sandbox.stub(Card, "validateRarity");
            let validateRelatedCardsStub = sandbox.stub(Card, "validateRelatedCards");
            let validateRelatedLinksStub = sandbox.stub(Card, "validateRelatedLinks");
            let validateSetCodeStub = sandbox.stub(Card, "validateSetCode");
            let validateSetNameStub = sandbox.stub(Card, "validateSetName");
            let validateStorySpotlightNumberStub = sandbox.stub(Card, "validateStorySpotlightNumber");
            let validateStorySpotlightUriStub = sandbox.stub(Card, "validateStorySpotlightUri");
            let validateToughnessStub = sandbox.stub(Card, "validateToughness");
            let validateTypeLineStub = sandbox.stub(Card, "validateTypeLine");
            let validateWatermarkStub = sandbox.stub(Card, "validateWatermark");
            
            // act
            try {
                Card.validateCard(card);
            } catch (e) {
                errorThrown = true;
            }
            
            // assert
            expect(errorThrown).to.be.false;
            expect(validateArtistStub.called).to.be.true;
            expect(validateBorderColorStub.called).to.be.true;
            expect(validateCardFacesStub.called).to.be.true;
            expect(validateCollectorNumberStub.called).to.be.true;
            expect(validateColorIdentityStub.called).to.be.true;
            expect(validateColorIndicatorStub.called).to.be.true;
            expect(validateColorsStub.called).to.be.true;
            expect(validateConvertedManaCostStub.called).to.be.true;
            expect(validateEDHRecRankStub.called).to.be.true;
            expect(validateEurPriceStub.called).to.be.true;
            expect(validateTixPriceStub.called).to.be.true;
            expect(validateUsdPriceStub.called).to.be.true;
            expect(validateFlavorTextStub.called).to.be.true;
            expect(validateFrameStub.called).to.be.true;
            expect(validateHandModifierStub.called).to.be.true;
            expect(validateImageUriStub.called).to.be.true;
            expect(validateIsColorshiftedStub.called).to.be.true;
            expect(validateIsDigitalStub.called).to.be.true;
            expect(validateIsFullArtStub.called).to.be.true;
            expect(validateIsFutureshiftedStub.called).to.be.true;
            expect(validateIsReprintStub.called).to.be.true;
            expect(validateIsReservedStub.called).to.be.true;
            expect(validateIsTimeshiftedStub.called).to.be.true;
            expect(validateLayoutStub.called).to.be.true;
            expect(validateLegalityStub.called).to.be.true;
            expect(validateLifeModifierStub.called).to.be.true;
            expect(validateLoyaltyStub.called).to.be.true;
            expect(validateManaCostStub.called).to.be.true;
            expect(validateMultiverseIdsStub.called).to.be.true;
            expect(validateNameStub.called).to.be.true;
            expect(validateOracleTextStub.called).to.be.true;
            expect(validatePowerStub.called).to.be.true;
            expect(validatePurchaseLinksStub.called).to.be.true;
            expect(validateRarityStub.called).to.be.true;
            expect(validateRelatedCardsStub.called).to.be.true;
            expect(validateRelatedLinksStub.called).to.be.true;
            expect(validateSetCodeStub.called).to.be.true;
            expect(validateSetNameStub.called).to.be.true;
            expect(validateStorySpotlightNumberStub.called).to.be.true;
            expect(validateStorySpotlightUriStub.called).to.be.true;
            expect(validateToughnessStub.called).to.be.true;
            expect(validateTypeLineStub.called).to.be.true;
            expect(validateWatermarkStub.called).to.be.true;

            // cleanup
            validateArtistStub.restore();
            validateBorderColorStub.restore();
            validateCardFacesStub.restore();
            validateCollectorNumberStub.restore();
            validateColorIdentityStub.restore();
            validateColorIndicatorStub.restore();
            validateColorsStub.restore();
            validateConvertedManaCostStub.restore();
            validateEDHRecRankStub.restore();
            validateEurPriceStub.restore();
            validateTixPriceStub.restore();
            validateUsdPriceStub.restore();
            validateFlavorTextStub.restore();
            validateFrameStub.restore();
            validateHandModifierStub.restore();
            validateImageUriStub.restore();
            validateIsColorshiftedStub.restore();
            validateIsDigitalStub.restore();
            validateIsFullArtStub.restore();
            validateIsFutureshiftedStub.restore();
            validateIsReprintStub.restore();
            validateIsReservedStub.restore();
            validateIsTimeshiftedStub.restore();
            validateLayoutStub.restore();
            validateLegalityStub.restore();
            validateLifeModifierStub.restore();
            validateLoyaltyStub.restore();
            validateManaCostStub.restore();
            validateMultiverseIdsStub.restore();
            validateNameStub.restore();
            validateOracleTextStub.restore();
            validatePowerStub.restore();
            validatePurchaseLinksStub.restore();
            validateRarityStub.restore();
            validateRelatedCardsStub.restore();
            validateRelatedLinksStub.restore();
            validateSetCodeStub.restore();
            validateSetNameStub.restore();
            validateStorySpotlightNumberStub.restore();
            validateStorySpotlightUriStub.restore();
            validateToughnessStub.restore();
            validateTypeLineStub.restore();
            validateWatermarkStub.restore();
        });

        it("should rethrow errors", () => {
            // arrange
            let card = {
                multiverse_ids: [426786],
                name: "Cruel Reality",
                layout: "normal",
                image_uri: "https://img.scryfall.com/cards/png/en/akh/84.png?1509809491",
                converted_mana_cost: 7,
                type_line: "Enchantment — Aura Curse",
                oracle_text: "Enchant player At the beginning of enchanted player's upkeep, that player sacrifices a creature or planeswalker. If the player can't, he or she loses 5 life.",
                mana_cost: "{5}{B}{B}",
                colors: ["B"],
                color_identity: ["B"],
                legality: {
                    is_standard_legal: true,
                    is_frontier_legal: true,
                    is_modern_legal: true,
                    is_pauper_legal: false,
                    is_legacy_legal: true,
                    is_penny_legal: false,
                    is_vintage_legal: true,
                    is_duel_legal: true,
                    is_commander_legal: true,
                    is_one_versus_one_legal: true,
                    is_future_legal: true
                },
                is_reserved: false,
                is_reprint: false,
                set_code: "akh",
                set_name: "Amonkhet",
                collector_number: "84",
                is_digital: false,
                rarity: "mythic",
                watermark: "planeswalker",
                flavor_text: "As Gideon watched the initiate murder his crop-mate, his admiration of the city of Naktamun gave way to horror.",
                artist: "Kieran Yanner",
                frame: "2015",
                is_full_art: false,
                border_color: "black",
                is_timeshifted: false,
                is_colorshifted: false,
                is_futureshifted: false,
                story_spotlight_number: 2,
                story_spotlight_uri: "http://magic.wizards.com/en/articles/archive/magic-story/brazen-2017-05-03",
                edhrec_rank: 1849,
                usd_price: "0.49",
                tix_price: "0.20",
                eur_price: "0.37",
                related_links: {
                    gatherer: "http://gatherer.wizards.com/Pages/Card/Details.aspx?multiverseid=426786",
                    tcgplayer: "http://decks.tcgplayer.com/magic/deck/search?contains=Cruel+Reality&page=1&partner=Scryfall",
                    edhrec: "http://edhrec.com/route/?cc=Cruel+Reality",
                    mtgtop8: "http://mtgtop8.com/search?MD_check=1&SB_check=1&cards=Cruel+Reality"
                },
                purchase_links: {
                    amazon: "https://www.amazon.com/gp/search?ie=UTF8&index=toys-and-games&keywords=Cruel+Reality&tag=scryfall-20",
                    ebay:
                        "http://rover.ebay.com/rover/1/711-53200-19255-0/1?campid=5337966903&icep_catId=19107&icep_ff3=10&icep_sortBy=12&icep_uq=Cruel+Reality&icep_vectorid=229466&ipn=psmain&kw=lg&kwid=902099&mtid=824&pub=5575230669&toolid=10001",
                    tcgplayer: "http://store.tcgplayer.com/magic/amonkhet/cruel-reality?partner=Scryfall",
                    magiccardmarket: "https://www.cardmarket.com/Magic/Products/Singles/Amonkhet/Cruel+Reality?referrer=scryfall",
                    cardhoarder: "https://www.cardhoarder.com/cards/63770?affiliate_id=scryfall&ref=card-profile&utm_campaign=affiliate&utm_medium=card&utm_source=scryfall",
                    card_kingdom: "https://www.cardkingdom.com/catalog/item/211792?partner=scryfall&utm_campaign=affiliate&utm_medium=scryfall&utm_source=scryfall",
                    mtgo_traders: "http://www.mtgotraders.com/deck/ref.php?id=63770&referral=scryfall",
                    coolstuffinc: "http://www.coolstuffinc.com/p/Magic%3A+The+Gathering/Cruel+Reality?utm_source=scryfall"
                }
            };
            let errorThrown = false;

            let validateCollectorNumberStub = sandbox.stub(Card, "validateCollectorNumber").callsFake((code) => {
                throw new Error("This is an error");
            });

            // act
            try {
                Card.validateCard(card);
            } catch (e) {
                errorThrown = true;
            }
            // assert
            expect(errorThrown).to.be.true;

            // cleanup
            validateCollectorNumberStub.restore();
        });
    });

    describe("multiverse_ids", () => {
        it("should ignore a missing multiverse_ids value", () => {
            // arrange
            let ids;
            let errorOccurred = false;

            // act
            try {
                Card.validateMultiverseIds(ids);
            } catch (e) {
                errorOccurred = true;
            }

            // assert
            expect(errorOccurred).to.be.false;
        });

        it("should invalidate a value that is not a list", () => {
            // arrange
            let ids = 0;
            let errorOccurred = false;

            // act
            try {
                Card.validateMultiverseIds(ids);
            } catch (e) {
                errorOccurred = true;
            }

            // assert
            expect(errorOccurred).to.be.true;
        });

        it("should invalidate non-numeric values", () => {
            // arrange
            let ids = ["invalid"];
            let errorOccurred = false;

            // act
            try {
                Card.validateMultiverseIds(ids);
            } catch (e) {
                errorOccurred = true;
            }

            // assert
            expect(errorOccurred).to.be.true;
        });

        it("should invalidate negative values", () => {
            // arrange
            let ids = [-1];
            let errorOccurred = false;

            // act
            try {
                Card.validateMultiverseIds(ids);
            } catch (e) {
                errorOccurred = true;
            }

            // assert
            expect(errorOccurred).to.be.true;
        });

        it("should allow an array of 0 values", () => {
            // arrange
            let ids = [];
            let errorOccurred = false;

            // act
            try {
                Card.validateMultiverseIds(ids);
            } catch (e) {
                errorOccurred = true;
            }

            // assert
            expect(errorOccurred).to.be.false;
        });

        it("should allow an array of a single positive number", () => {
            // arrange
            let ids = [1];
            let errorOccurred = false;

            // act
            try {
                Card.validateMultiverseIds(ids);
            } catch (e) {
                errorOccurred = true;
            }

            // assert
            expect(errorOccurred).to.be.false;
        });

        it("should allow an array of multiple positive numbers", () => {
            // arrange
            let ids = [1, 2, 3];
            let errorOccurred = false;

            // act
            try {
                Card.validateMultiverseIds(ids);
            } catch (e) {
                errorOccurred = true;
            }

            // assert
            expect(errorOccurred).to.be.false;
        });
    });

    describe("name", () => {
        it("should error if missing", () => {
            // arrange
            let name;
            let errorOccurred = false;

            // act
            try {
                Card.validateName(name);
            } catch (e) {
                errorOccurred = true;
            }

            // assert
            expect(errorOccurred).to.be.true;
        });

        it("should invalidate if an empty string", () => {
            // arrange
            let name = "";
            let errorOccurred = false;

            // act
            try {
                Card.validateName(name);
            } catch (e) {
                errorOccurred = true;
            }

            // assert
            expect(errorOccurred).to.be.true;
        });

        it("should validate string values", () => {
            // arrange
            let name = "Urza, Academy Headmaster";
            let errorOccurred = false;

            // act
            try {
                Card.validateName(name);
            } catch (e) {
                errorOccurred = true;
            }

            // assert
            expect(errorOccurred).to.be.false;
        });
    });

    describe("layout", () => {
        it("should allow missing value", () => {
            // arrange
            let layout;
            let errorOccurred = false;

            // act
            try {
                Card.validateLayout(layout);
            } catch (e) {
                errorOccurred = true;
            }

            // assert
            expect(errorOccurred).to.be.false;
        });

        it("should validate a value of 'normal'", () => {
            // arrange
            let layout = Layouts.Normal;
            let errorOccurred = false;

            // act
            try {
                Card.validateLayout(layout);
            } catch (e) {
                errorOccurred = true;
            }

            // assert
            expect(errorOccurred).to.be.false;
        });

        it("should validate a value of 'split'", () => {
            // arrange
            let layout = Layouts.Split;
            let errorOccurred = false;

            // act
            try {
                Card.validateLayout(layout);
            } catch (e) {
                errorOccurred = true;
            }

            // assert
            expect(errorOccurred).to.be.false;
        });

        it("should validate a value of 'flip'", () => {
            // arrange
            let layout = Layouts.Flip;
            let errorOccurred = false;

            // act
            try {
                Card.validateLayout(layout);
            } catch (e) {
                errorOccurred = true;
            }

            // assert
            expect(errorOccurred).to.be.false;
        });

        it("should validate a value of 'transform'", () => {
            // arrange
            let layout = Layouts.Transform;
            let errorOccurred = false;

            // act
            try {
                Card.validateLayout(layout);
            } catch (e) {
                errorOccurred = true;
            }

            // assert
            expect(errorOccurred).to.be.false;
        });

        it("should validate a value of 'meld'", () => {
            // arrange
            let layout = Layouts.Meld;
            let errorOccurred = false;

            // act
            try {
                Card.validateLayout(layout);
            } catch (e) {
                errorOccurred = true;
            }

            // assert
            expect(errorOccurred).to.be.false;
        });

        it("should validate a value of 'leveler'", () => {
            // arrange
            let layout = Layouts.Leveler;
            let errorOccurred = false;

            // act
            try {
                Card.validateLayout(layout);
            } catch (e) {
                errorOccurred = true;
            }

            // assert
            expect(errorOccurred).to.be.false;
        });

        it("should validate a value of 'planar'", () => {
            // arrange
            let layout = Layouts.Planar;
            let errorOccurred = false;

            // act
            try {
                Card.validateLayout(layout);
            } catch (e) {
                errorOccurred = true;
            }

            // assert
            expect(errorOccurred).to.be.false;
        });

        it("should validate a value of 'scheme'", () => {
            // arrange
            let layout = Layouts.Scheme;
            let errorOccurred = false;

            // act
            try {
                Card.validateLayout(layout);
            } catch (e) {
                errorOccurred = true;
            }

            // assert
            expect(errorOccurred).to.be.false;
        });

        it("should validate a value of 'vanguard'", () => {
            // arrange
            let layout = Layouts.Vanguard;
            let errorOccurred = false;

            // act
            try {
                Card.validateLayout(layout);
            } catch (e) {
                errorOccurred = true;
            }

            // assert
            expect(errorOccurred).to.be.false;
        });

        it("should validate a value of 'token'", () => {
            // arrange
            let layout = Layouts.Token;
            let errorOccurred = false;

            // act
            try {
                Card.validateLayout(layout);
            } catch (e) {
                errorOccurred = true;
            }

            // assert
            expect(errorOccurred).to.be.false;
        });

        it("should validate a value of 'double_faced_token'", () => {
            // arrange
            let layout = Layouts.DoubleFacedToken;
            let errorOccurred = false;

            // act
            try {
                Card.validateLayout(layout);
            } catch (e) {
                errorOccurred = true;
            }

            // assert
            expect(errorOccurred).to.be.false;
        });

        it("should validate a value of 'emblem'", () => {
            // arrange
            let layout = Layouts.Emblem;
            let errorOccurred = false;

            // act
            try {
                Card.validateLayout(layout);
            } catch (e) {
                errorOccurred = true;
            }

            // assert
            expect(errorOccurred).to.be.false;
        });

        it("should validate a value of 'augment'", () => {
            // arrange
            let layout = Layouts.Augment;
            let errorOccurred = false;

            // act
            try {
                Card.validateLayout(layout);
            } catch (e) {
                errorOccurred = true;
            }

            // assert
            expect(errorOccurred).to.be.false;
        });

        it("should validate a value of 'host'", () => {
            // arrange
            let layout = Layouts.Host;
            let errorOccurred = false;

            // act
            try {
                Card.validateLayout(layout);
            } catch (e) {
                errorOccurred = true;
            }

            // assert
            expect(errorOccurred).to.be.false;
        });

        it("should should invalidate an empty value", () => {
            // arrange
            let layout = "";
            let errorOccurred = false;

            // act
            try {
                Card.validateLayout(layout);
            } catch (e) {
                errorOccurred = true;
            }

            // assert
            expect(errorOccurred).to.be.true;
        });

        it("should should invalidate a value not in pre-defined list", () => {
            // arrange
            let layout = "xxx";
            let errorOccurred = false;

            // act
            try {
                Card.validateLayout(layout);
            } catch (e) {
                errorOccurred = true;
            }

            // assert
            expect(errorOccurred).to.be.true;
        });
    });

    describe("converted_mana_cost", () => {
        it("should error if missing", () => {
            // arrange
            let convertedManaCost;
            let errorOccurred = false;

            // act
            try {
                Card.validateConvertedManaCost(convertedManaCost);
            } catch (e) {
                errorOccurred = true;
            }

            // assert
            expect(errorOccurred).to.be.true;
        });

        it("should error if not a number", () => {
            // arrange
            let convertedManaCost = "not a number";
            let errorOccurred = false;

            // act
            try {
                Card.validateConvertedManaCost(convertedManaCost);
            } catch (e) {
                errorOccurred = true;
            }

            // assert
            expect(errorOccurred).to.be.true;
        });

        it("should error if negative", () => {
            // arrange
            let convertedManaCost = -1;
            let errorOccurred = false;

            // act
            try {
                Card.validateConvertedManaCost(convertedManaCost);
            } catch (e) {
                errorOccurred = true;
            }

            // assert
            expect(errorOccurred).to.be.true;
        });

        it("should allow integer values", () => {
            // arrange
            let convertedManaCost = 1;
            let errorOccurred = false;

            // act
            try {
                Card.validateConvertedManaCost(convertedManaCost);
            } catch (e) {
                errorOccurred = true;
            }

            // assert
            expect(errorOccurred).to.be.false;
        });

        it("should allow decimal values", () => {
            // arrange
            let convertedManaCost = 1.5;
            let errorOccurred = false;

            // act
            try {
                Card.validateConvertedManaCost(convertedManaCost);
            } catch (e) {
                errorOccurred = true;
            }

            // assert
            expect(errorOccurred).to.be.false;
        });
    });

    describe("type_line", () => {
        it("should error if missing", () => {
            // arrange
            let typeLine;
            let errorOccurred = false;

            // act
            try {
                Card.validateTypeLine(typeLine);
            } catch (e) {
                errorOccurred = true;
            }

            // assert
            expect(errorOccurred).to.be.true;
        });

        it("should error if empty string", () => {
            // arrange
            let typeLine = "";
            let errorOccurred = false;

            // act
            try {
                Card.validateTypeLine(typeLine);
            } catch (e) {
                errorOccurred = true;
            }

            // assert
            expect(errorOccurred).to.be.true;
        });

        it("should allow generic non-empty string", () => {
            // arrange
            let typeLine = "Legendary Planeswalker — Urza";
            let errorOccurred = false;

            // act
            try {
                Card.validateTypeLine(typeLine);
            } catch (e) {
                errorOccurred = true;
            }

            // assert
            expect(errorOccurred).to.be.false;
        });
    });

    describe("oracle_text", () => {
        it("should ignore if missing", () => {
            // arrange
            let oracleText;
            let errorOccurred = false;

            // act
            try {
                Card.validateOracleText(oracleText);
            } catch (e) {
                errorOccurred = true;
            }

            // assert
            expect(errorOccurred).to.be.false;
        });

        it("should error if empty", () => {
            // arrange
            let oracleText = "";
            let errorOccurred = false;

            // act
            try {
                Card.validateOracleText(oracleText);
            } catch (e) {
                errorOccurred = true;
            }

            // assert
            expect(errorOccurred).to.be.true;
        });

        it("should allow generic non-empty string", () => {
            // arrange
            let oracleText = "+1: Head to AskUrza.com and click +1. -1: Head to AskUrza.com and click -1. -6: Head to AskUrza.com and click -6.";
            let errorOccurred = false;

            // act
            try {
                Card.validateOracleText(oracleText);
            } catch (e) {
                errorOccurred = true;
            }

            // assert
            expect(errorOccurred).to.be.false;
        });
    });

    describe("mana_cost", () => {
        it("should error if missing", () => {
            // arrange
            let manaCost;
            let errorOccurred = false;

            // act
            try {
                Card.validateManaCost(manaCost);
            } catch (e) {
                errorOccurred = true;
            }

            // assert
            expect(errorOccurred).to.be.true;
        });

        it("should allow empty", () => {
            // arrange
            let manaCost = "";
            let errorOccurred = false;

            // act
            try {
                Card.validateManaCost(manaCost);
            } catch (e) {
                errorOccurred = true;
            }

            // assert
            expect(errorOccurred).to.be.false;
        });

        // it("should allow a tap symbol {T}", () => {
        //     // arrange
        //     let manaCost = Symbols.Tap;
        //     let errorOccurred = false;

        //     // act
        //     try {
        //         Card.validateManaCost(manaCost);
        //     } catch (e) {
        //         errorOccurred = true;
        //     }

        //     // assert
        //     expect(errorOccurred).to.be.false;
        // });

        // it("should allow a untap symbol {Q}", () => {
        //     // arrange
        //     let manaCost = Symbols.Untap;
        //     let errorOccurred = false;

        //     // act
        //     try {
        //         Card.validateManaCost(manaCost);
        //     } catch (e) {
        //         errorOccurred = true;
        //     }

        //     // assert
        //     expect(errorOccurred).to.be.false;
        // });

        // it("should allow a energy symbol {E}", () => {
        //     // arrange
        //     let manaCost = Symbols.Energy;
        //     let errorOccurred = false;

        //     // act
        //     try {
        //         Card.validateManaCost(manaCost);
        //     } catch (e) {
        //         errorOccurred = true;
        //     }

        //     // assert
        //     expect(errorOccurred).to.be.false;
        // });

        // it("should allow a planeswalker symbol {PW}", () => {
        //     // arrange
        //     let manaCost = Symbols.Planeswalker;
        //     let errorOccurred = false;

        //     // act
        //     try {
        //         Card.validateManaCost(manaCost);
        //     } catch (e) {
        //         errorOccurred = true;
        //     }

        //     // assert
        //     expect(errorOccurred).to.be.false;
        // });

        // it("should allow a chaos symbol {CHAOS}", () => {
        //     // arrange
        //     let manaCost = Symbols.Chaos;
        //     let errorOccurred = false;

        //     // act
        //     try {
        //         Card.validateManaCost(manaCost);
        //     } catch (e) {
        //         errorOccurred = true;
        //     }

        //     // assert
        //     expect(errorOccurred).to.be.false;
        // });

        it("should allow a generic X symbol {X}", () => {
            // arrange
            let manaCost = Symbols.XGeneric;
            let errorOccurred = false;

            // act
            try {
                Card.validateManaCost(manaCost);
            } catch (e) {
                errorOccurred = true;
            }

            // assert
            expect(errorOccurred).to.be.false;
        });

        it("should allow a generic Y symbol {Y}", () => {
            // arrange
            let manaCost = Symbols.YGeneric;
            let errorOccurred = false;

            // act
            try {
                Card.validateManaCost(manaCost);
            } catch (e) {
                errorOccurred = true;
            }

            // assert
            expect(errorOccurred).to.be.false;
        });

        it("should allow a generic Z symbol {Z}", () => {
            // arrange
            let manaCost = Symbols.ZGeneric;
            let errorOccurred = false;

            // act
            try {
                Card.validateManaCost(manaCost);
            } catch (e) {
                errorOccurred = true;
            }

            // assert
            expect(errorOccurred).to.be.false;
        });

        it("should allow a zero symbol {0}", () => {
            // arrange
            let manaCost = Symbols.Zero;
            let errorOccurred = false;

            // act
            try {
                Card.validateManaCost(manaCost);
            } catch (e) {
                errorOccurred = true;
            }

            // assert
            expect(errorOccurred).to.be.false;
        });

        it("should allow a one half symbol {½}", () => {
            // arrange
            let manaCost = Symbols.OneHalf;
            let errorOccurred = false;

            // act
            try {
                Card.validateManaCost(manaCost);
            } catch (e) {
                errorOccurred = true;
            }

            // assert
            expect(errorOccurred).to.be.false;
        });

        it("should allow a one symbol {1}", () => {
            // arrange
            let manaCost = Symbols.One;
            let errorOccurred = false;

            // act
            try {
                Card.validateManaCost(manaCost);
            } catch (e) {
                errorOccurred = true;
            }

            // assert
            expect(errorOccurred).to.be.false;
        });

        it("should allow a two symbol {2}", () => {
            // arrange
            let manaCost = Symbols.Two;
            let errorOccurred = false;

            // act
            try {
                Card.validateManaCost(manaCost);
            } catch (e) {
                errorOccurred = true;
            }

            // assert
            expect(errorOccurred).to.be.false;
        });

        it("should allow a three symbol {3}", () => {
            // arrange
            let manaCost = Symbols.Three;
            let errorOccurred = false;

            // act
            try {
                Card.validateManaCost(manaCost);
            } catch (e) {
                errorOccurred = true;
            }

            // assert
            expect(errorOccurred).to.be.false;
        });

        it("should allow a four symbol {4}", () => {
            // arrange
            let manaCost = Symbols.Four;
            let errorOccurred = false;

            // act
            try {
                Card.validateManaCost(manaCost);
            } catch (e) {
                errorOccurred = true;
            }

            // assert
            expect(errorOccurred).to.be.false;
        });

        it("should allow a five symbol {5}", () => {
            // arrange
            let manaCost = Symbols.Five;
            let errorOccurred = false;

            // act
            try {
                Card.validateManaCost(manaCost);
            } catch (e) {
                errorOccurred = true;
            }

            // assert
            expect(errorOccurred).to.be.false;
        });

        it("should allow a six symbol {6}", () => {
            // arrange
            let manaCost = Symbols.Six;
            let errorOccurred = false;

            // act
            try {
                Card.validateManaCost(manaCost);
            } catch (e) {
                errorOccurred = true;
            }

            // assert
            expect(errorOccurred).to.be.false;
        });

        it("should allow a seven symbol {7}", () => {
            // arrange
            let manaCost = Symbols.Seven;
            let errorOccurred = false;

            // act
            try {
                Card.validateManaCost(manaCost);
            } catch (e) {
                errorOccurred = true;
            }

            // assert
            expect(errorOccurred).to.be.false;
        });

        it("should allow an eight symbol {8}", () => {
            // arrange
            let manaCost = Symbols.Eight;
            let errorOccurred = false;

            // act
            try {
                Card.validateManaCost(manaCost);
            } catch (e) {
                errorOccurred = true;
            }

            // assert
            expect(errorOccurred).to.be.false;
        });

        it("should allow a nine symbol {9}", () => {
            // arrange
            let manaCost = Symbols.Nine;
            let errorOccurred = false;

            // act
            try {
                Card.validateManaCost(manaCost);
            } catch (e) {
                errorOccurred = true;
            }

            // assert
            expect(errorOccurred).to.be.false;
        });

        it("should allow a ten symbol {10}", () => {
            // arrange
            let manaCost = Symbols.Ten;
            let errorOccurred = false;

            // act
            try {
                Card.validateManaCost(manaCost);
            } catch (e) {
                errorOccurred = true;
            }

            // assert
            expect(errorOccurred).to.be.false;
        });

        it("should allow a eleven symbol {11}", () => {
            // arrange
            let manaCost = Symbols.Eleven;
            let errorOccurred = false;

            // act
            try {
                Card.validateManaCost(manaCost);
            } catch (e) {
                errorOccurred = true;
            }

            // assert
            expect(errorOccurred).to.be.false;
        });

        it("should allow a twelve symbol {12}", () => {
            // arrange
            let manaCost = Symbols.Twelve;
            let errorOccurred = false;

            // act
            try {
                Card.validateManaCost(manaCost);
            } catch (e) {
                errorOccurred = true;
            }

            // assert
            expect(errorOccurred).to.be.false;
        });

        it("should allow a thirteen symbol {13}", () => {
            // arrange
            let manaCost = Symbols.Thirteen;
            let errorOccurred = false;

            // act
            try {
                Card.validateManaCost(manaCost);
            } catch (e) {
                errorOccurred = true;
            }

            // assert
            expect(errorOccurred).to.be.false;
        });

        it("should allow a fourteen symbol {14}", () => {
            // arrange
            let manaCost = Symbols.Fourteen;
            let errorOccurred = false;

            // act
            try {
                Card.validateManaCost(manaCost);
            } catch (e) {
                errorOccurred = true;
            }

            // assert
            expect(errorOccurred).to.be.false;
        });

        it("should allow a fifteen symbol {15}", () => {
            // arrange
            let manaCost = Symbols.Fifteen;
            let errorOccurred = false;

            // act
            try {
                Card.validateManaCost(manaCost);
            } catch (e) {
                errorOccurred = true;
            }

            // assert
            expect(errorOccurred).to.be.false;
        });

        it("should allow a sixteen symbol {16}", () => {
            // arrange
            let manaCost = Symbols.Sixteen;
            let errorOccurred = false;

            // act
            try {
                Card.validateManaCost(manaCost);
            } catch (e) {
                errorOccurred = true;
            }

            // assert
            expect(errorOccurred).to.be.false;
        });

        it("should allow a seventeen symbol {17}", () => {
            // arrange
            let manaCost = Symbols.Seventeen;
            let errorOccurred = false;

            // act
            try {
                Card.validateManaCost(manaCost);
            } catch (e) {
                errorOccurred = true;
            }

            // assert
            expect(errorOccurred).to.be.false;
        });

        it("should allow an eighteen symbol {18}", () => {
            // arrange
            let manaCost = Symbols.Eighteen;
            let errorOccurred = false;

            // act
            try {
                Card.validateManaCost(manaCost);
            } catch (e) {
                errorOccurred = true;
            }

            // assert
            expect(errorOccurred).to.be.false;
        });

        it("should allow a nineteen symbol {19}", () => {
            // arrange
            let manaCost = Symbols.Nineteen;
            let errorOccurred = false;

            // act
            try {
                Card.validateManaCost(manaCost);
            } catch (e) {
                errorOccurred = true;
            }

            // assert
            expect(errorOccurred).to.be.false;
        });

        it("should allow a twenty symbol {20}", () => {
            // arrange
            let manaCost = Symbols.Twenty;
            let errorOccurred = false;

            // act
            try {
                Card.validateManaCost(manaCost);
            } catch (e) {
                errorOccurred = true;
            }

            // assert
            expect(errorOccurred).to.be.false;
        });

        it("should allow a one hundred symbol {100}", () => {
            // arrange
            let manaCost = Symbols.OneHundred;
            let errorOccurred = false;

            // act
            try {
                Card.validateManaCost(manaCost);
            } catch (e) {
                errorOccurred = true;
            }

            // assert
            expect(errorOccurred).to.be.false;
        });

        it("should allow a one million symbol {1000000}", () => {
            // arrange
            let manaCost = Symbols.OneMillion;
            let errorOccurred = false;

            // act
            try {
                Card.validateManaCost(manaCost);
            } catch (e) {
                errorOccurred = true;
            }

            // assert
            expect(errorOccurred).to.be.false;
        });

        it("should allow an infinity symbol {∞}", () => {
            // arrange
            let manaCost = Symbols.Infinity;
            let errorOccurred = false;

            // act
            try {
                Card.validateManaCost(manaCost);
            } catch (e) {
                errorOccurred = true;
            }

            // assert
            expect(errorOccurred).to.be.false;
        });

        it("should allow a one white or blue symbol {W/U}", () => {
            // arrange
            let manaCost = Symbols.OneWhiteOrOneBlue;
            let errorOccurred = false;

            // act
            try {
                Card.validateManaCost(manaCost);
            } catch (e) {
                errorOccurred = true;
            }

            // assert
            expect(errorOccurred).to.be.false;
        });

        it("should allow a one white or one black symbol {W/B}", () => {
            // arrange
            let manaCost = Symbols.OneWhiteOrOneBlack;
            let errorOccurred = false;

            // act
            try {
                Card.validateManaCost(manaCost);
            } catch (e) {
                errorOccurred = true;
            }

            // assert
            expect(errorOccurred).to.be.false;
        });

        it("should allow a one black or one red symbol {B/R}", () => {
            // arrange
            let manaCost = Symbols.OneBlackOrOneRed;
            let errorOccurred = false;

            // act
            try {
                Card.validateManaCost(manaCost);
            } catch (e) {
                errorOccurred = true;
            }

            // assert
            expect(errorOccurred).to.be.false;
        });

        it("should allow a one black or one green symbol {B/G}", () => {
            // arrange
            let manaCost = Symbols.OneBlackOrOneGreen;
            let errorOccurred = false;

            // act
            try {
                Card.validateManaCost(manaCost);
            } catch (e) {
                errorOccurred = true;
            }

            // assert
            expect(errorOccurred).to.be.false;
        });

        it("should allow a one blue or one black symbol {U/B}", () => {
            // arrange
            let manaCost = Symbols.OneBlueOrOneBlack;
            let errorOccurred = false;

            // act
            try {
                Card.validateManaCost(manaCost);
            } catch (e) {
                errorOccurred = true;
            }

            // assert
            expect(errorOccurred).to.be.false;
        });

        it("should allow a one blue or one red symbol {U/R}", () => {
            // arrange
            let manaCost = Symbols.OneBlueOrOneRed;
            let errorOccurred = false;

            // act
            try {
                Card.validateManaCost(manaCost);
            } catch (e) {
                errorOccurred = true;
            }

            // assert
            expect(errorOccurred).to.be.false;
        });

        it("should allow a one red or one green symbol {R/G}", () => {
            // arrange
            let manaCost = Symbols.OneRedOrOneGreen;
            let errorOccurred = false;

            // act
            try {
                Card.validateManaCost(manaCost);
            } catch (e) {
                errorOccurred = true;
            }

            // assert
            expect(errorOccurred).to.be.false;
        });

        it("should allow a one red or one white symbol {R/W}", () => {
            // arrange
            let manaCost = Symbols.OneRedOrOneWhite;
            let errorOccurred = false;

            // act
            try {
                Card.validateManaCost(manaCost);
            } catch (e) {
                errorOccurred = true;
            }

            // assert
            expect(errorOccurred).to.be.false;
        });

        it("should allow a one green or one white symbol {G/W}", () => {
            // arrange
            let manaCost = Symbols.OneGreenOrOneWhite;
            let errorOccurred = false;

            // act
            try {
                Card.validateManaCost(manaCost);
            } catch (e) {
                errorOccurred = true;
            }

            // assert
            expect(errorOccurred).to.be.false;
        });

        it("should allow a green or one blue symbol {G/U}", () => {
            // arrange
            let manaCost = Symbols.OneGreenOrOneBlue;
            let errorOccurred = false;

            // act
            try {
                Card.validateManaCost(manaCost);
            } catch (e) {
                errorOccurred = true;
            }

            // assert
            expect(errorOccurred).to.be.false;
        });

        it("should allow a two generic or one white symbol {2/W}", () => {
            // arrange
            let manaCost = Symbols.TwoGenericOrOneWhite;
            let errorOccurred = false;

            // act
            try {
                Card.validateManaCost(manaCost);
            } catch (e) {
                errorOccurred = true;
            }

            // assert
            expect(errorOccurred).to.be.false;
        });

        it("should allow a two generic or one blue symbol {2/U}", () => {
            // arrange
            let manaCost = Symbols.TwoGenericOrOneBlue;
            let errorOccurred = false;

            // act
            try {
                Card.validateManaCost(manaCost);
            } catch (e) {
                errorOccurred = true;
            }

            // assert
            expect(errorOccurred).to.be.false;
        });

        it("should allow a two generic or one black symbol {2/B}", () => {
            // arrange
            let manaCost = Symbols.TwoGenericOrOneBlack;
            let errorOccurred = false;

            // act
            try {
                Card.validateManaCost(manaCost);
            } catch (e) {
                errorOccurred = true;
            }

            // assert
            expect(errorOccurred).to.be.false;
        });

        it("should allow a two generic or one red symbol {2/R}", () => {
            // arrange
            let manaCost = Symbols.TwoGenericOrOneRed;
            let errorOccurred = false;

            // act
            try {
                Card.validateManaCost(manaCost);
            } catch (e) {
                errorOccurred = true;
            }

            // assert
            expect(errorOccurred).to.be.false;
        });

        it("should allow a two generic or one green symbol {2/G}", () => {
            // arrange
            let manaCost = Symbols.TwoGenericOrOneGreen;
            let errorOccurred = false;

            // act
            try {
                Card.validateManaCost(manaCost);
            } catch (e) {
                errorOccurred = true;
            }

            // assert
            expect(errorOccurred).to.be.false;
        });

        it("should allow a one colored or two life symbol {P}", () => {
            // arrange
            let manaCost = Symbols.OneColoredOrTwoLife;
            let errorOccurred = false;

            // act
            try {
                Card.validateManaCost(manaCost);
            } catch (e) {
                errorOccurred = true;
            }

            // assert
            expect(errorOccurred).to.be.false;
        });

        it("should allow a one white or two life symbol {W/P}", () => {
            // arrange
            let manaCost = Symbols.OneWhiteOrTwoLife;
            let errorOccurred = false;

            // act
            try {
                Card.validateManaCost(manaCost);
            } catch (e) {
                errorOccurred = true;
            }

            // assert
            expect(errorOccurred).to.be.false;
        });

        it("should allow a one blue or two life symbol {U/P}", () => {
            // arrange
            let manaCost = Symbols.OneBlueOrTwoLife;
            let errorOccurred = false;

            // act
            try {
                Card.validateManaCost(manaCost);
            } catch (e) {
                errorOccurred = true;
            }

            // assert
            expect(errorOccurred).to.be.false;
        });

        it("should allow a one black or two life symbol {B/P}", () => {
            // arrange
            let manaCost = Symbols.OneBlackOrTwoLife;
            let errorOccurred = false;

            // act
            try {
                Card.validateManaCost(manaCost);
            } catch (e) {
                errorOccurred = true;
            }

            // assert
            expect(errorOccurred).to.be.false;
        });

        it("should allow a one red or two life symbol {R/P}", () => {
            // arrange
            let manaCost = Symbols.OneRedOrTwoLife;
            let errorOccurred = false;

            // act
            try {
                Card.validateManaCost(manaCost);
            } catch (e) {
                errorOccurred = true;
            }

            // assert
            expect(errorOccurred).to.be.false;
        });

        it("should allow a one green or two life symbol {G/P}", () => {
            // arrange
            let manaCost = Symbols.OneGreenOrTwoLife;
            let errorOccurred = false;

            // act
            try {
                Card.validateManaCost(manaCost);
            } catch (e) {
                errorOccurred = true;
            }

            // assert
            expect(errorOccurred).to.be.false;
        });

        it("should allow a one half white symbol {HW}", () => {
            // arrange
            let manaCost = Symbols.OneHalfWhite;
            let errorOccurred = false;

            // act
            try {
                Card.validateManaCost(manaCost);
            } catch (e) {
                errorOccurred = true;
            }

            // assert
            expect(errorOccurred).to.be.false;
        });

        it("should allow a one half red symbol {HR}", () => {
            // arrange
            let manaCost = Symbols.OneHalfRed;
            let errorOccurred = false;

            // act
            try {
                Card.validateManaCost(manaCost);
            } catch (e) {
                errorOccurred = true;
            }

            // assert
            expect(errorOccurred).to.be.false;
        });

        it("should allow a white symbol {W}", () => {
            // arrange
            let manaCost = Symbols.White;
            let errorOccurred = false;

            // act
            try {
                Card.validateManaCost(manaCost);
            } catch (e) {
                errorOccurred = true;
            }

            // assert
            expect(errorOccurred).to.be.false;
        });

        it("should allow a blue symbol {U}", () => {
            // arrange
            let manaCost = Symbols.Blue;
            let errorOccurred = false;

            // act
            try {
                Card.validateManaCost(manaCost);
            } catch (e) {
                errorOccurred = true;
            }

            // assert
            expect(errorOccurred).to.be.false;
        });

        it("should allow a black symbol {B}", () => {
            // arrange
            let manaCost = Symbols.Black;
            let errorOccurred = false;

            // act
            try {
                Card.validateManaCost(manaCost);
            } catch (e) {
                errorOccurred = true;
            }

            // assert
            expect(errorOccurred).to.be.false;
        });

        it("should allow a red symbol {R}", () => {
            // arrange
            let manaCost = Symbols.Red;
            let errorOccurred = false;

            // act
            try {
                Card.validateManaCost(manaCost);
            } catch (e) {
                errorOccurred = true;
            }

            // assert
            expect(errorOccurred).to.be.false;
        });

        it("should allow a green symbol {G}", () => {
            // arrange
            let manaCost = Symbols.Green;
            let errorOccurred = false;

            // act
            try {
                Card.validateManaCost(manaCost);
            } catch (e) {
                errorOccurred = true;
            }

            // assert
            expect(errorOccurred).to.be.false;
        });

        it("should allow a colorless symbol {C}", () => {
            // arrange
            let manaCost = Symbols.Colorless;
            let errorOccurred = false;

            // act
            try {
                Card.validateManaCost(manaCost);
            } catch (e) {
                errorOccurred = true;
            }

            // assert
            expect(errorOccurred).to.be.false;
        });

        it("should allow a snow symbol {S}", () => {
            // arrange
            let manaCost = Symbols.Snow;
            let errorOccurred = false;

            // act
            try {
                Card.validateManaCost(manaCost);
            } catch (e) {
                errorOccurred = true;
            }

            // assert
            expect(errorOccurred).to.be.false;
        });

        it("should allow multiple symbols", () => {
            // arrange
            let manaCost = Symbols.Infinity + Symbols.Black + Symbols.Three;
            let errorOccurred = false;

            // act
            try {
                Card.validateManaCost(manaCost);
            } catch (e) {
                errorOccurred = true;
            }

            // assert
            expect(errorOccurred).to.be.false;
        });

        it("should reject symbols not in the format of {x}", () => {
            // arrange
            let manaCost = "W";
            let errorOccurred = false;

            // act
            try {
                Card.validateManaCost(manaCost);
            } catch (e) {
                errorOccurred = true;
            }

            // assert
            expect(errorOccurred).to.be.true;
        });

        it("should reject symbols not in the predefined list", () => {
            // arrange
            let manaCost = "{XXX}";
            let errorOccurred = false;

            // act
            try {
                Card.validateManaCost(manaCost);
            } catch (e) {
                errorOccurred = true;
            }

            // assert
            expect(errorOccurred).to.be.true;
        });
    });

    describe("power", () => {
        it("should ignore if missing", () => {
            // arrange
            let power;
            let errorOccurred = false;

            // act
            try {
                Card.validatePower(power);
            } catch (e) {
                errorOccurred = true;
            }

            // assert
            expect(errorOccurred).to.be.false;
        });

        it("should not allow empty", () => {
            // arrange
            let power = "";
            let errorOccurred = false;

            // act
            try {
                Card.validatePower(power);
            } catch (e) {
                errorOccurred = true;
            }

            // assert
            expect(errorOccurred).to.be.true;
        });

        it("should allow a negative one value", () => {
            // arrange
            let power = Powers.NegativeOne;
            let errorOccurred = false;

            // act
            try {
                Card.validatePower(power);
            } catch (e) {
                errorOccurred = true;
            }

            // assert
            expect(errorOccurred).to.be.false;
        });

        it("should allow a star value", () => {
            // arrange
            let power = Powers.Star;
            let errorOccurred = false;

            // act
            try {
                Card.validatePower(power);
            } catch (e) {
                errorOccurred = true;
            }

            // assert
            expect(errorOccurred).to.be.false;
        });

        it("should allow an infinity value", () => {
            // arrange
            let power = Powers.Infinity;
            let errorOccurred = false;

            // act
            try {
                Card.validatePower(power);
            } catch (e) {
                errorOccurred = true;
            }

            // assert
            expect(errorOccurred).to.be.false;
        });

        it("should allow a star squared value", () => {
            // arrange
            let power = Powers.StarSquared;
            let errorOccurred = false;

            // act
            try {
                Card.validatePower(power);
            } catch (e) {
                errorOccurred = true;
            }

            // assert
            expect(errorOccurred).to.be.false;
        });

        it("should allow a question mark value", () => {
            // arrange
            let power = Powers.QuestionMark;
            let errorOccurred = false;

            // act
            try {
                Card.validatePower(power);
            } catch (e) {
                errorOccurred = true;
            }

            // assert
            expect(errorOccurred).to.be.false;
        });

        it("should allow a zero value", () => {
            // arrange
            let power = Powers.Zero;
            let errorOccurred = false;

            // act
            try {
                Card.validatePower(power);
            } catch (e) {
                errorOccurred = true;
            }

            // assert
            expect(errorOccurred).to.be.false;
        });

        it("should allow a plus zero value", () => {
            // arrange
            let power = Powers.PlusZero;
            let errorOccurred = false;

            // act
            try {
                Card.validatePower(power);
            } catch (e) {
                errorOccurred = true;
            }

            // assert
            expect(errorOccurred).to.be.false;
        });

        it("should allow a one half value", () => {
            // arrange
            let power = Powers.OneHalf;
            let errorOccurred = false;

            // act
            try {
                Card.validatePower(power);
            } catch (e) {
                errorOccurred = true;
            }

            // assert
            expect(errorOccurred).to.be.false;
        });

        it("should allow a plus one value", () => {
            // arrange
            let power = Powers.PlusOne;
            let errorOccurred = false;

            // act
            try {
                Card.validatePower(power);
            } catch (e) {
                errorOccurred = true;
            }

            // assert
            expect(errorOccurred).to.be.false;
        });

        it("should allow a one value", () => {
            // arrange
            let power = Powers.One;
            let errorOccurred = false;

            // act
            try {
                Card.validatePower(power);
            } catch (e) {
                errorOccurred = true;
            }

            // assert
            expect(errorOccurred).to.be.false;
        });

        it("should allow a one plus star value", () => {
            // arrange
            let power = Powers.OnePlusStar;
            let errorOccurred = false;

            // act
            try {
                Card.validatePower(power);
            } catch (e) {
                errorOccurred = true;
            }

            // assert
            expect(errorOccurred).to.be.false;
        });

        it("should allow a one and one half value", () => {
            // arrange
            let power = Powers.OneAndOneHalf;
            let errorOccurred = false;

            // act
            try {
                Card.validatePower(power);
            } catch (e) {
                errorOccurred = true;
            }

            // assert
            expect(errorOccurred).to.be.false;
        });

        it("should allow a two value", () => {
            // arrange
            let power = Powers.Two;
            let errorOccurred = false;

            // act
            try {
                Card.validatePower(power);
            } catch (e) {
                errorOccurred = true;
            }

            // assert
            expect(errorOccurred).to.be.false;
        });

        it("should allow a two plus star value", () => {
            // arrange
            let power = Powers.TwoPlusStar;
            let errorOccurred = false;

            // act
            try {
                Card.validatePower(power);
            } catch (e) {
                errorOccurred = true;
            }

            // assert
            expect(errorOccurred).to.be.false;
        });

        it("should allow a plus two value", () => {
            // arrange
            let power = Powers.PlusTwo;
            let errorOccurred = false;

            // act
            try {
                Card.validatePower(power);
            } catch (e) {
                errorOccurred = true;
            }

            // assert
            expect(errorOccurred).to.be.false;
        });

        it("should allow a two and one half value", () => {
            // arrange
            let power = Powers.TwoAndOneHalf;
            let errorOccurred = false;

            // act
            try {
                Card.validatePower(power);
            } catch (e) {
                errorOccurred = true;
            }

            // assert
            expect(errorOccurred).to.be.false;
        });

        it("should allow a plus three value", () => {
            // arrange
            let power = Powers.PlusThree;
            let errorOccurred = false;

            // act
            try {
                Card.validatePower(power);
            } catch (e) {
                errorOccurred = true;
            }

            // assert
            expect(errorOccurred).to.be.false;
        });

        it("should allow a three value", () => {
            // arrange
            let power = Powers.Three;
            let errorOccurred = false;

            // act
            try {
                Card.validatePower(power);
            } catch (e) {
                errorOccurred = true;
            }

            // assert
            expect(errorOccurred).to.be.false;
        });

        it("should allow a three and one half value", () => {
            // arrange
            let power = Powers.ThreeAndOneHalf;
            let errorOccurred = false;

            // act
            try {
                Card.validatePower(power);
            } catch (e) {
                errorOccurred = true;
            }

            // assert
            expect(errorOccurred).to.be.false;
        });

        it("should allow a plus four value", () => {
            // arrange
            let power = Powers.PlusFour;
            let errorOccurred = false;

            // act
            try {
                Card.validatePower(power);
            } catch (e) {
                errorOccurred = true;
            }

            // assert
            expect(errorOccurred).to.be.false;
        });

        it("should allow a four value", () => {
            // arrange
            let power = Powers.Four;
            let errorOccurred = false;

            // act
            try {
                Card.validatePower(power);
            } catch (e) {
                errorOccurred = true;
            }

            // assert
            expect(errorOccurred).to.be.false;
        });

        it("should allow a five value", () => {
            // arrange
            let power = Powers.Five;
            let errorOccurred = false;

            // act
            try {
                Card.validatePower(power);
            } catch (e) {
                errorOccurred = true;
            }

            // assert
            expect(errorOccurred).to.be.false;
        });

        it("should allow a six value", () => {
            // arrange
            let power = Powers.Six;
            let errorOccurred = false;

            // act
            try {
                Card.validatePower(power);
            } catch (e) {
                errorOccurred = true;
            }

            // assert
            expect(errorOccurred).to.be.false;
        });

        it("should allow a seven value", () => {
            // arrange
            let power = Powers.Seven;
            let errorOccurred = false;

            // act
            try {
                Card.validatePower(power);
            } catch (e) {
                errorOccurred = true;
            }

            // assert
            expect(errorOccurred).to.be.false;
        });

        it("should allow a eight value", () => {
            // arrange
            let power = Powers.Eight;
            let errorOccurred = false;

            // act
            try {
                Card.validatePower(power);
            } catch (e) {
                errorOccurred = true;
            }

            // assert
            expect(errorOccurred).to.be.false;
        });

        it("should allow a nine value", () => {
            // arrange
            let power = Powers.Nine;
            let errorOccurred = false;

            // act
            try {
                Card.validatePower(power);
            } catch (e) {
                errorOccurred = true;
            }

            // assert
            expect(errorOccurred).to.be.false;
        });

        it("should allow a ten value", () => {
            // arrange
            let power = Powers.Ten;
            let errorOccurred = false;

            // act
            try {
                Card.validatePower(power);
            } catch (e) {
                errorOccurred = true;
            }

            // assert
            expect(errorOccurred).to.be.false;
        });

        it("should allow a eleven value", () => {
            // arrange
            let power = Powers.Eleven;
            let errorOccurred = false;

            // act
            try {
                Card.validatePower(power);
            } catch (e) {
                errorOccurred = true;
            }

            // assert
            expect(errorOccurred).to.be.false;
        });

        it("should allow a twelve value", () => {
            // arrange
            let power = Powers.Twelve;
            let errorOccurred = false;

            // act
            try {
                Card.validatePower(power);
            } catch (e) {
                errorOccurred = true;
            }

            // assert
            expect(errorOccurred).to.be.false;
        });

        it("should allow a thirteen value", () => {
            // arrange
            let power = Powers.Thirteen;
            let errorOccurred = false;

            // act
            try {
                Card.validatePower(power);
            } catch (e) {
                errorOccurred = true;
            }

            // assert
            expect(errorOccurred).to.be.false;
        });

        it("should allow a fifteen value", () => {
            // arrange
            let power = Powers.Fifteen;
            let errorOccurred = false;

            // act
            try {
                Card.validatePower(power);
            } catch (e) {
                errorOccurred = true;
            }

            // assert
            expect(errorOccurred).to.be.false;
        });

        it("should allow a twenty value", () => {
            // arrange
            let power = Powers.Twenty;
            let errorOccurred = false;

            // act
            try {
                Card.validatePower(power);
            } catch (e) {
                errorOccurred = true;
            }

            // assert
            expect(errorOccurred).to.be.false;
        });

        it("should allow a ninety-nine value", () => {
            // arrange
            let power = Powers.NinetyNine;
            let errorOccurred = false;

            // act
            try {
                Card.validatePower(power);
            } catch (e) {
                errorOccurred = true;
            }

            // assert
            expect(errorOccurred).to.be.false;
        });

        it("should not allow a value that is not in the pre-defined list", () => {
            // arrange
            let power = "xxx";
            let errorOccurred = false;

            // act
            try {
                Card.validatePower(power);
            } catch (e) {
                errorOccurred = true;
            }

            // assert
            expect(errorOccurred).to.be.true;
        });
    });

    describe("toughness", () => {
        it("should ignore if missing", () => {
            // arrange
            let toughness;
            let errorOccurred = false;

            // act
            try {
                Card.validateToughness(toughness);
            } catch (e) {
                errorOccurred = true;
            }

            // assert
            expect(errorOccurred).to.be.false;
        });

        it("should not allow empty", () => {
            // arrange
            let toughness = "";
            let errorOccurred = false;

            // act
            try {
                Card.validateToughness(toughness);
            } catch (e) {
                errorOccurred = true;
            }

            // assert
            expect(errorOccurred).to.be.true;
        });

        it("should allow a negative one value", () => {
            // arrange
            let toughness = Toughnesses.NegativeOne;
            let errorOccurred = false;

            // act
            try {
                Card.validateToughness(toughness);
            } catch (e) {
                errorOccurred = true;
            }

            // assert
            expect(errorOccurred).to.be.false;
        });

        it("should allow a star value", () => {
            // arrange
            let toughness = Toughnesses.Star;
            let errorOccurred = false;

            // act
            try {
                Card.validateToughness(toughness);
            } catch (e) {
                errorOccurred = true;
            }

            // assert
            expect(errorOccurred).to.be.false;
        });

        it("should allow a star squared value", () => {
            // arrange
            let toughness = Toughnesses.StarSquared;
            let errorOccurred = false;

            // act
            try {
                Card.validateToughness(toughness);
            } catch (e) {
                errorOccurred = true;
            }

            // assert
            expect(errorOccurred).to.be.false;
        });

        it("should allow a question mark value", () => {
            // arrange
            let toughness = Toughnesses.QuestionMark;
            let errorOccurred = false;

            // act
            try {
                Card.validateToughness(toughness);
            } catch (e) {
                errorOccurred = true;
            }

            // assert
            expect(errorOccurred).to.be.false;
        });

        it("should allow a zero value", () => {
            // arrange
            let toughness = Toughnesses.Zero;
            let errorOccurred = false;

            // act
            try {
                Card.validateToughness(toughness);
            } catch (e) {
                errorOccurred = true;
            }

            // assert
            expect(errorOccurred).to.be.false;
        });

        it("should allow a minus zero value", () => {
            // arrange
            let toughness = Toughnesses.MinusZero;
            let errorOccurred = false;

            // act
            try {
                Card.validateToughness(toughness);
            } catch (e) {
                errorOccurred = true;
            }

            // assert
            expect(errorOccurred).to.be.false;
        });

        it("should allow a plus zero value", () => {
            // arrange
            let toughness = Toughnesses.PlusZero;
            let errorOccurred = false;

            // act
            try {
                Card.validateToughness(toughness);
            } catch (e) {
                errorOccurred = true;
            }

            // assert
            expect(errorOccurred).to.be.false;
        });

        it("should allow a one half value", () => {
            // arrange
            let toughness = Toughnesses.OneHalf;
            let errorOccurred = false;

            // act
            try {
                Card.validateToughness(toughness);
            } catch (e) {
                errorOccurred = true;
            }

            // assert
            expect(errorOccurred).to.be.false;
        });

        it("should allow a plus one value", () => {
            // arrange
            let toughness = Toughnesses.PlusOne;
            let errorOccurred = false;

            // act
            try {
                Card.validateToughness(toughness);
            } catch (e) {
                errorOccurred = true;
            }

            // assert
            expect(errorOccurred).to.be.false;
        });

        it("should allow a one value", () => {
            // arrange
            let toughness = Toughnesses.One;
            let errorOccurred = false;

            // act
            try {
                Card.validateToughness(toughness);
            } catch (e) {
                errorOccurred = true;
            }

            // assert
            expect(errorOccurred).to.be.false;
        });

        it("should allow a one plus star value", () => {
            // arrange
            let toughness = Toughnesses.OnePlusStar;
            let errorOccurred = false;

            // act
            try {
                Card.validateToughness(toughness);
            } catch (e) {
                errorOccurred = true;
            }

            // assert
            expect(errorOccurred).to.be.false;
        });

        it("should allow a one and one half value", () => {
            // arrange
            let toughness = Toughnesses.OneAndOneHalf;
            let errorOccurred = false;

            // act
            try {
                Card.validateToughness(toughness);
            } catch (e) {
                errorOccurred = true;
            }

            // assert
            expect(errorOccurred).to.be.false;
        });

        it("should allow a two value", () => {
            // arrange
            let toughness = Toughnesses.Two;
            let errorOccurred = false;

            // act
            try {
                Card.validateToughness(toughness);
            } catch (e) {
                errorOccurred = true;
            }

            // assert
            expect(errorOccurred).to.be.false;
        });

        it("should allow a two plus star value", () => {
            // arrange
            let toughness = Toughnesses.TwoPlusStar;
            let errorOccurred = false;

            // act
            try {
                Card.validateToughness(toughness);
            } catch (e) {
                errorOccurred = true;
            }

            // assert
            expect(errorOccurred).to.be.false;
        });

        it("should allow a plus two value", () => {
            // arrange
            let toughness = Toughnesses.PlusTwo;
            let errorOccurred = false;

            // act
            try {
                Card.validateToughness(toughness);
            } catch (e) {
                errorOccurred = true;
            }

            // assert
            expect(errorOccurred).to.be.false;
        });

        it("should allow a two and one half value", () => {
            // arrange
            let toughness = Toughnesses.TwoAndOneHalf;
            let errorOccurred = false;

            // act
            try {
                Card.validateToughness(toughness);
            } catch (e) {
                errorOccurred = true;
            }

            // assert
            expect(errorOccurred).to.be.false;
        });

        it("should allow a plus three value", () => {
            // arrange
            let toughness = Toughnesses.PlusThree;
            let errorOccurred = false;

            // act
            try {
                Card.validateToughness(toughness);
            } catch (e) {
                errorOccurred = true;
            }

            // assert
            expect(errorOccurred).to.be.false;
        });

        it("should allow a three value", () => {
            // arrange
            let toughness = Toughnesses.Three;
            let errorOccurred = false;

            // act
            try {
                Card.validateToughness(toughness);
            } catch (e) {
                errorOccurred = true;
            }

            // assert
            expect(errorOccurred).to.be.false;
        });

        it("should allow a three and one half value", () => {
            // arrange
            let toughness = Toughnesses.ThreeAndOneHalf;
            let errorOccurred = false;

            // act
            try {
                Card.validateToughness(toughness);
            } catch (e) {
                errorOccurred = true;
            }

            // assert
            expect(errorOccurred).to.be.false;
        });

        it("should allow a plus four value", () => {
            // arrange
            let toughness = Toughnesses.PlusFour;
            let errorOccurred = false;

            // act
            try {
                Card.validateToughness(toughness);
            } catch (e) {
                errorOccurred = true;
            }

            // assert
            expect(errorOccurred).to.be.false;
        });

        it("should allow a four value", () => {
            // arrange
            let toughness = Toughnesses.Four;
            let errorOccurred = false;

            // act
            try {
                Card.validateToughness(toughness);
            } catch (e) {
                errorOccurred = true;
            }

            // assert
            expect(errorOccurred).to.be.false;
        });

        it("should allow a five value", () => {
            // arrange
            let toughness = Toughnesses.Five;
            let errorOccurred = false;

            // act
            try {
                Card.validateToughness(toughness);
            } catch (e) {
                errorOccurred = true;
            }

            // assert
            expect(errorOccurred).to.be.false;
        });

        it("should allow a six value", () => {
            // arrange
            let toughness = Toughnesses.Six;
            let errorOccurred = false;

            // act
            try {
                Card.validateToughness(toughness);
            } catch (e) {
                errorOccurred = true;
            }

            // assert
            expect(errorOccurred).to.be.false;
        });

        it("should allow a seven value", () => {
            // arrange
            let toughness = Toughnesses.Seven;
            let errorOccurred = false;

            // act
            try {
                Card.validateToughness(toughness);
            } catch (e) {
                errorOccurred = true;
            }

            // assert
            expect(errorOccurred).to.be.false;
        });

        it("should allow an eight value", () => {
            // arrange
            let toughness = Toughnesses.Eight;
            let errorOccurred = false;

            // act
            try {
                Card.validateToughness(toughness);
            } catch (e) {
                errorOccurred = true;
            }

            // assert
            expect(errorOccurred).to.be.false;
        });

        it("should allow a nine value", () => {
            // arrange
            let toughness = Toughnesses.Nine;
            let errorOccurred = false;

            // act
            try {
                Card.validateToughness(toughness);
            } catch (e) {
                errorOccurred = true;
            }

            // assert
            expect(errorOccurred).to.be.false;
        });

        it("should allow a ten value", () => {
            // arrange
            let toughness = Toughnesses.Ten;
            let errorOccurred = false;

            // act
            try {
                Card.validateToughness(toughness);
            } catch (e) {
                errorOccurred = true;
            }

            // assert
            expect(errorOccurred).to.be.false;
        });

        it("should allow an eleven value", () => {
            // arrange
            let toughness = Toughnesses.Eleven;
            let errorOccurred = false;

            // act
            try {
                Card.validateToughness(toughness);
            } catch (e) {
                errorOccurred = true;
            }

            // assert
            expect(errorOccurred).to.be.false;
        });

        it("should allow a twelve value", () => {
            // arrange
            let toughness = Toughnesses.Twelve;
            let errorOccurred = false;

            // act
            try {
                Card.validateToughness(toughness);
            } catch (e) {
                errorOccurred = true;
            }

            // assert
            expect(errorOccurred).to.be.false;
        });

        it("should allow a thirteen value", () => {
            // arrange
            let toughness = Toughnesses.Thirteen;
            let errorOccurred = false;

            // act
            try {
                Card.validateToughness(toughness);
            } catch (e) {
                errorOccurred = true;
            }

            // assert
            expect(errorOccurred).to.be.false;
        });

        it("should allow a fourteen value", () => {
            // arrange
            let toughness = Toughnesses.Fourteen;
            let errorOccurred = false;

            // act
            try {
                Card.validateToughness(toughness);
            } catch (e) {
                errorOccurred = true;
            }

            // assert
            expect(errorOccurred).to.be.false;
        });

        it("should allow a fifteen value", () => {
            // arrange
            let toughness = Toughnesses.Fifteen;
            let errorOccurred = false;

            // act
            try {
                Card.validateToughness(toughness);
            } catch (e) {
                errorOccurred = true;
            }

            // assert
            expect(errorOccurred).to.be.false;
        });

        it("should allow a twenty value", () => {
            // arrange
            let toughness = Toughnesses.Twenty;
            let errorOccurred = false;

            // act
            try {
                Card.validateToughness(toughness);
            } catch (e) {
                errorOccurred = true;
            }

            // assert
            expect(errorOccurred).to.be.false;
        });

        it("should allow a ninety-nine value", () => {
            // arrange
            let toughness = Toughnesses.NinetyNine;
            let errorOccurred = false;

            // act
            try {
                Card.validateToughness(toughness);
            } catch (e) {
                errorOccurred = true;
            }

            // assert
            expect(errorOccurred).to.be.false;
        });

        it("should not allow a value that is not in the pre-defined list", () => {
            // arrange
            let toughness = "xxx";
            let errorOccurred = false;

            // act
            try {
                Card.validateToughness(toughness);
            } catch (e) {
                errorOccurred = true;
            }

            // assert
            expect(errorOccurred).to.be.true;
        });
    });

    describe("loyalty", () => {
        it("should ignore if missing", () => {
            // arrange
            let loyalty;
            let errorOccurred = false;

            // act
            try {
                Card.validateLoyalty(loyalty);
            } catch (e) {
                errorOccurred = true;
            }

            // assert
            expect(errorOccurred).to.be.false;
        });

        it("should not allow empty", () => {
            // arrange
            let loyalty = "";
            let errorOccurred = false;

            // act
            try {
                Card.validateLoyalty(loyalty);
            } catch (e) {
                errorOccurred = true;
            }

            // assert
            expect(errorOccurred).to.be.true;
        });

        it("should allow a X value", () => {
            // arrange
            let loyalty = Loyalties.X;
            let errorOccurred = false;

            // act
            try {
                Card.validateLoyalty(loyalty);
            } catch (e) {
                errorOccurred = true;
            }

            // assert
            expect(errorOccurred).to.be.false;
        });

        it("should allow a 1d4+1 value", () => {
            // arrange
            let loyalty = Loyalties.OneDFourPlusOne;
            let errorOccurred = false;

            // act
            try {
                Card.validateLoyalty(loyalty);
            } catch (e) {
                errorOccurred = true;
            }

            // assert
            expect(errorOccurred).to.be.false;
        });

        it("should allow a two value", () => {
            // arrange
            let loyalty = Loyalties.Two;
            let errorOccurred = false;

            // act
            try {
                Card.validateLoyalty(loyalty);
            } catch (e) {
                errorOccurred = true;
            }

            // assert
            expect(errorOccurred).to.be.false;
        });

        it("should allow a three value", () => {
            // arrange
            let loyalty = Loyalties.Three;
            let errorOccurred = false;

            // act
            try {
                Card.validateLoyalty(loyalty);
            } catch (e) {
                errorOccurred = true;
            }

            // assert
            expect(errorOccurred).to.be.false;
        });

        it("should allow a four value", () => {
            // arrange
            let loyalty = Loyalties.Four;
            let errorOccurred = false;

            // act
            try {
                Card.validateLoyalty(loyalty);
            } catch (e) {
                errorOccurred = true;
            }

            // assert
            expect(errorOccurred).to.be.false;
        });

        it("should allow a five value", () => {
            // arrange
            let loyalty = Loyalties.Five;
            let errorOccurred = false;

            // act
            try {
                Card.validateLoyalty(loyalty);
            } catch (e) {
                errorOccurred = true;
            }

            // assert
            expect(errorOccurred).to.be.false;
        });

        it("should allow a six value", () => {
            // arrange
            let loyalty = Loyalties.Six;
            let errorOccurred = false;

            // act
            try {
                Card.validateLoyalty(loyalty);
            } catch (e) {
                errorOccurred = true;
            }

            // assert
            expect(errorOccurred).to.be.false;
        });

        it("should allow a seven value", () => {
            // arrange
            let loyalty = Loyalties.Seven;
            let errorOccurred = false;

            // act
            try {
                Card.validateLoyalty(loyalty);
            } catch (e) {
                errorOccurred = true;
            }

            // assert
            expect(errorOccurred).to.be.false;
        });

        it("should allow a twenty value", () => {
            // arrange
            let loyalty = Loyalties.Twenty;
            let errorOccurred = false;

            // act
            try {
                Card.validateLoyalty(loyalty);
            } catch (e) {
                errorOccurred = true;
            }

            // assert
            expect(errorOccurred).to.be.false;
        });

        it("should not allow a value that is not in the pre-defined list", () => {
            // arrange
            let loyalty = "xxx";
            let errorOccurred = false;

            // act
            try {
                Card.validateLoyalty(loyalty);
            } catch (e) {
                errorOccurred = true;
            }

            // assert
            expect(errorOccurred).to.be.true;
        });
    });

    describe("life_modifier", () => {
        it("should ignore if missing", () => {
            // arrange
            let lifeModifier;
            let errorOccurred = false;

            // act
            try {
                Card.validateLifeModifier(lifeModifier);
            } catch (e) {
                errorOccurred = true;
            }

            // assert
            expect(errorOccurred).to.be.false;
        });

        it("should not allow empty", () => {
            // arrange
            let lifeModifier = "";
            let errorOccurred = false;

            // act
            try {
                Card.validateLifeModifier(lifeModifier);
            } catch (e) {
                errorOccurred = true;
            }

            // assert
            expect(errorOccurred).to.be.true;
        });

        it("should allow string", () => {
            // arrange
            let lifeModifier = "+2";
            let errorOccurred = false;

            // act
            try {
                Card.validateLifeModifier(lifeModifier);
            } catch (e) {
                errorOccurred = true;
            }

            // assert
            expect(errorOccurred).to.be.false;
        });
    });

    describe("hand_modifier", () => {
        it("should ignore if missing", () => {
            // arrange
            let handModifier;
            let errorOccurred = false;

            // act
            try {
                Card.validateHandModifier(handModifier);
            } catch (e) {
                errorOccurred = true;
            }

            // assert
            expect(errorOccurred).to.be.false;
        });

        it("should not allow empty", () => {
            // arrange
            let handModifier = "";
            let errorOccurred = false;

            // act
            try {
                Card.validateHandModifier(handModifier);
            } catch (e) {
                errorOccurred = true;
            }

            // assert
            expect(errorOccurred).to.be.true;
        });

        it("should allow string", () => {
            // arrange
            let handModifier = "-1";
            let errorOccurred = false;

            // act
            try {
                Card.validateHandModifier(handModifier);
            } catch (e) {
                errorOccurred = true;
            }

            // assert
            expect(errorOccurred).to.be.false;
        });
    });

    describe("colors", () => {
        it("should error if missing", () => {
            // arrange
            let colors;
            let errorOccurred = false;

            // act
            try {
                Card.validateColors(colors);
            } catch (e) {
                errorOccurred = true;
            }

            // assert
            expect(errorOccurred).to.be.true;
        });

        it("should error if not an array", () => {
            // arrange
            let colors = Colors.White;
            let errorOccurred = false;

            // act
            try {
                Card.validateColors(colors);
            } catch (e) {
                errorOccurred = true;
            }

            // assert
            expect(errorOccurred).to.be.true;
        });

        it("should allow an empty array", () => {
            // arrange
            let colors = [];
            let errorOccurred = false;

            // act
            try {
                Card.validateColors(colors);
            } catch (e) {
                errorOccurred = true;
            }

            // assert
            expect(errorOccurred).to.be.false;
        });

        it("should allow white ('W') as a valid color", () => {
            // arrange
            let colors = [Colors.White];
            let errorOccurred = false;

            // act
            try {
                Card.validateColors(colors);
            } catch (e) {
                errorOccurred = true;
            }

            // assert
            expect(errorOccurred).to.be.false;
        });

        it("should allow blue ('U') as a valid color", () => {
            // arrange
            let colors = [Colors.Blue];
            let errorOccurred = false;

            // act
            try {
                Card.validateColors(colors);
            } catch (e) {
                errorOccurred = true;
            }

            // assert
            expect(errorOccurred).to.be.false;
        });

        it("should allow black ('B') as a valid color", () => {
            // arrange
            let colors = [Colors.Black];
            let errorOccurred = false;

            // act
            try {
                Card.validateColors(colors);
            } catch (e) {
                errorOccurred = true;
            }

            // assert
            expect(errorOccurred).to.be.false;
        });

        it("should allow red ('R') as a valid color", () => {
            // arrange
            let colors = [Colors.Red];
            let errorOccurred = false;

            // act
            try {
                Card.validateColors(colors);
            } catch (e) {
                errorOccurred = true;
            }

            // assert
            expect(errorOccurred).to.be.false;
        });

        it("should allow green ('G') as a valid color", () => {
            // arrange
            let colors = [Colors.Green];
            let errorOccurred = false;

            // act
            try {
                Card.validateColors(colors);
            } catch (e) {
                errorOccurred = true;
            }

            // assert
            expect(errorOccurred).to.be.false;
        });

        it("should allow multiple unique color values", () => {
            // arrange
            let colors = [Colors.White, Colors.Black];
            let errorOccurred = false;

            // act
            try {
                Card.validateColors(colors);
            } catch (e) {
                errorOccurred = true;
            }

            // assert
            expect(errorOccurred).to.be.false;
        });

        it("should reject multiple white color values", () => {
            // arrange
            let colors = [Colors.White, Colors.White];
            let errorOccurred = false;

            // act
            try {
                Card.validateColors(colors);
            } catch (e) {
                errorOccurred = true;
            }

            // assert
            expect(errorOccurred).to.be.true;
        });

        it("should reject multiple blue color values", () => {
            // arrange
            let colors = [Colors.Blue, Colors.Blue];
            let errorOccurred = false;

            // act
            try {
                Card.validateColors(colors);
            } catch (e) {
                errorOccurred = true;
            }

            // assert
            expect(errorOccurred).to.be.true;
        });

        it("should reject multiple black color values", () => {
            // arrange
            let colors = [Colors.Black, Colors.Black];
            let errorOccurred = false;

            // act
            try {
                Card.validateColors(colors);
            } catch (e) {
                errorOccurred = true;
            }

            // assert
            expect(errorOccurred).to.be.true;
        });

        it("should reject multiple red color values", () => {
            // arrange
            let colors = [Colors.Red, Colors.Red];
            let errorOccurred = false;

            // act
            try {
                Card.validateColors(colors);
            } catch (e) {
                errorOccurred = true;
            }

            // assert
            expect(errorOccurred).to.be.true;
        });

        it("should reject multiple green color values", () => {
            // arrange
            let colors = [Colors.Green, Colors.Green];
            let errorOccurred = false;

            // act
            try {
                Card.validateColors(colors);
            } catch (e) {
                errorOccurred = true;
            }

            // assert
            expect(errorOccurred).to.be.true;
        });

        it("should reject colors not in the pre-defined list of values", () => {
            // arrange
            let colors = ["?"];
            let errorOccurred = false;

            // act
            try {
                Card.validateColors(colors);
            } catch (e) {
                errorOccurred = true;
            }

            // assert
            expect(errorOccurred).to.be.true;
        });
    });

    describe("color_indicator", () => {
        it("should ignore if missing", () => {
            // arrange
            let colorIdentity;
            let errorOccurred = false;

            // act
            try {
                Card.validateColorIndicator(colorIdentity);
            } catch (e) {
                errorOccurred = true;
            }

            // assert
            expect(errorOccurred).to.be.false;
        });

        it("should error if not an array", () => {
            // arrange
            let colorIdentity = Colors.White;
            let errorOccurred = false;

            // act
            try {
                Card.validateColorIndicator(colorIdentity);
            } catch (e) {
                errorOccurred = true;
            }

            // assert
            expect(errorOccurred).to.be.true;
        });

        it("should allow an empty array", () => {
            // arrange
            let colorIdentity = [];
            let errorOccurred = false;

            // act
            try {
                Card.validateColorIndicator(colorIdentity);
            } catch (e) {
                errorOccurred = true;
            }

            // assert
            expect(errorOccurred).to.be.false;
        });

        it("should allow white ('W') as a valid color", () => {
            // arrange
            let colorIdentity = [Colors.White];
            let errorOccurred = false;

            // act
            try {
                Card.validateColorIndicator(colorIdentity);
            } catch (e) {
                errorOccurred = true;
            }

            // assert
            expect(errorOccurred).to.be.false;
        });

        it("should allow blue ('U') as a valid color", () => {
            // arrange
            let colorIdentity = [Colors.Blue];
            let errorOccurred = false;

            // act
            try {
                Card.validateColorIndicator(colorIdentity);
            } catch (e) {
                errorOccurred = true;
            }

            // assert
            expect(errorOccurred).to.be.false;
        });

        it("should allow black ('B') as a valid color", () => {
            // arrange
            let colorIdentity = [Colors.Black];
            let errorOccurred = false;

            // act
            try {
                Card.validateColorIndicator(colorIdentity);
            } catch (e) {
                errorOccurred = true;
            }

            // assert
            expect(errorOccurred).to.be.false;
        });

        it("should allow red ('R') as a valid color", () => {
            // arrange
            let colorIdentity = [Colors.Red];
            let errorOccurred = false;

            // act
            try {
                Card.validateColorIndicator(colorIdentity);
            } catch (e) {
                errorOccurred = true;
            }

            // assert
            expect(errorOccurred).to.be.false;
        });

        it("should allow green ('G') as a valid color", () => {
            // arrange
            let colorIdentity = [Colors.Green];
            let errorOccurred = false;

            // act
            try {
                Card.validateColorIndicator(colorIdentity);
            } catch (e) {
                errorOccurred = true;
            }

            // assert
            expect(errorOccurred).to.be.false;
        });

        it("should allow multiple unique color values", () => {
            // arrange
            let colorIdentity = [Colors.White, Colors.Black];
            let errorOccurred = false;

            // act
            try {
                Card.validateColorIndicator(colorIdentity);
            } catch (e) {
                errorOccurred = true;
            }

            // assert
            expect(errorOccurred).to.be.false;
        });

        it("should reject multiple white color values", () => {
            // arrange
            let colorIdentity = [Colors.White, Colors.White];
            let errorOccurred = false;

            // act
            try {
                Card.validateColorIndicator(colorIdentity);
            } catch (e) {
                errorOccurred = true;
            }

            // assert
            expect(errorOccurred).to.be.true;
        });

        it("should reject multiple blue color values", () => {
            // arrange
            let colorIdentity = [Colors.Blue, Colors.Blue];
            let errorOccurred = false;

            // act
            try {
                Card.validateColorIndicator(colorIdentity);
            } catch (e) {
                errorOccurred = true;
            }

            // assert
            expect(errorOccurred).to.be.true;
        });

        it("should reject multiple black color values", () => {
            // arrange
            let colorIdentity = [Colors.Black, Colors.Black];
            let errorOccurred = false;

            // act
            try {
                Card.validateColorIndicator(colorIdentity);
            } catch (e) {
                errorOccurred = true;
            }

            // assert
            expect(errorOccurred).to.be.true;
        });

        it("should reject multiple red color values", () => {
            // arrange
            let colorIdentity = [Colors.Red, Colors.Red];
            let errorOccurred = false;

            // act
            try {
                Card.validateColorIndicator(colorIdentity);
            } catch (e) {
                errorOccurred = true;
            }

            // assert
            expect(errorOccurred).to.be.true;
        });

        it("should reject multiple green color values", () => {
            // arrange
            let colorIdentity = [Colors.Green, Colors.Green];
            let errorOccurred = false;

            // act
            try {
                Card.validateColorIndicator(colorIdentity);
            } catch (e) {
                errorOccurred = true;
            }

            // assert
            expect(errorOccurred).to.be.true;
        });

        it("should reject colors not in the pre-defined list of values", () => {
            // arrange
            let colorIdentity = ["?"];
            let errorOccurred = false;

            // act
            try {
                Card.validateColorIndicator(colorIdentity);
            } catch (e) {
                errorOccurred = true;
            }

            // assert
            expect(errorOccurred).to.be.true;
        });
    });

    describe("color_identity", () => {
        it("should error if missing", () => {
            // arrange
            let colors;
            let errorOccurred = false;

            // act
            try {
                Card.validateColorIdentity(colors);
            } catch (e) {
                errorOccurred = true;
            }

            // assert
            expect(errorOccurred).to.be.true;
        });

        it("should error if not an array", () => {
            // arrange
            let colors = Colors.White;
            let errorOccurred = false;

            // act
            try {
                Card.validateColorIdentity(colors);
            } catch (e) {
                errorOccurred = true;
            }

            // assert
            expect(errorOccurred).to.be.true;
        });

        it("should allow an empty array", () => {
            // arrange
            let colors = [];
            let errorOccurred = false;

            // act
            try {
                Card.validateColorIdentity(colors);
            } catch (e) {
                errorOccurred = true;
            }

            // assert
            expect(errorOccurred).to.be.false;
        });

        it("should allow white ('W') as a valid color", () => {
            // arrange
            let colors = [Colors.White];
            let errorOccurred = false;

            // act
            try {
                Card.validateColorIdentity(colors);
            } catch (e) {
                errorOccurred = true;
            }

            // assert
            expect(errorOccurred).to.be.false;
        });

        it("should allow blue ('U') as a valid color", () => {
            // arrange
            let colors = [Colors.Blue];
            let errorOccurred = false;

            // act
            try {
                Card.validateColorIdentity(colors);
            } catch (e) {
                errorOccurred = true;
            }

            // assert
            expect(errorOccurred).to.be.false;
        });

        it("should allow black ('B') as a valid color", () => {
            // arrange
            let colors = [Colors.Black];
            let errorOccurred = false;

            // act
            try {
                Card.validateColorIdentity(colors);
            } catch (e) {
                errorOccurred = true;
            }

            // assert
            expect(errorOccurred).to.be.false;
        });

        it("should allow red ('R') as a valid color", () => {
            // arrange
            let colors = [Colors.Red];
            let errorOccurred = false;

            // act
            try {
                Card.validateColorIdentity(colors);
            } catch (e) {
                errorOccurred = true;
            }

            // assert
            expect(errorOccurred).to.be.false;
        });

        it("should allow green ('G') as a valid color", () => {
            // arrange
            let colors = [Colors.Green];
            let errorOccurred = false;

            // act
            try {
                Card.validateColorIdentity(colors);
            } catch (e) {
                errorOccurred = true;
            }

            // assert
            expect(errorOccurred).to.be.false;
        });

        it("should allow multiple unique color values", () => {
            // arrange
            let colors = [Colors.White, Colors.Black];
            let errorOccurred = false;

            // act
            try {
                Card.validateColorIdentity(colors);
            } catch (e) {
                errorOccurred = true;
            }

            // assert
            expect(errorOccurred).to.be.false;
        });

        it("should reject multiple white color values", () => {
            // arrange
            let colors = [Colors.White, Colors.White];
            let errorOccurred = false;

            // act
            try {
                Card.validateColorIdentity(colors);
            } catch (e) {
                errorOccurred = true;
            }

            // assert
            expect(errorOccurred).to.be.true;
        });

        it("should reject multiple blue color values", () => {
            // arrange
            let colors = [Colors.Blue, Colors.Blue];
            let errorOccurred = false;

            // act
            try {
                Card.validateColorIdentity(colors);
            } catch (e) {
                errorOccurred = true;
            }

            // assert
            expect(errorOccurred).to.be.true;
        });

        it("should reject multiple black color values", () => {
            // arrange
            let colors = [Colors.Black, Colors.Black];
            let errorOccurred = false;

            // act
            try {
                Card.validateColorIdentity(colors);
            } catch (e) {
                errorOccurred = true;
            }

            // assert
            expect(errorOccurred).to.be.true;
        });

        it("should reject multiple red color values", () => {
            // arrange
            let colors = [Colors.Red, Colors.Red];
            let errorOccurred = false;

            // act
            try {
                Card.validateColorIdentity(colors);
            } catch (e) {
                errorOccurred = true;
            }

            // assert
            expect(errorOccurred).to.be.true;
        });

        it("should reject multiple green color values", () => {
            // arrange
            let colors = [Colors.Green, Colors.Green];
            let errorOccurred = false;

            // act
            try {
                Card.validateColorIdentity(colors);
            } catch (e) {
                errorOccurred = true;
            }

            // assert
            expect(errorOccurred).to.be.true;
        });

        it("should reject colors not in the pre-defined list of values", () => {
            // arrange
            let colors = ["?"];
            let errorOccurred = false;

            // act
            try {
                Card.validateColorIdentity(colors);
            } catch (e) {
                errorOccurred = true;
            }

            // assert
            expect(errorOccurred).to.be.true;
        });
    });

    describe("related_cards", () => {
        it("should ignore if missing", () => {
            // arrange
            let relatedCards;
            let errorOccurred = false;

            // act
            try {
                Card.validateRelatedCards(relatedCards);
            } catch (e) {
                errorOccurred = true;
            }

            // assert
            expect(errorOccurred).to.be.false;
        });

        it("should error if not Array", () => {
            // arrange
            let relatedCards = {};
            let errorOccurred = false;

            // act
            try {
                Card.validateRelatedCards(relatedCards);
            } catch (e) {
                errorOccurred = true;
            }

            // assert
            expect(errorOccurred).to.be.true;
        });

        it("should error if Array is empty", () => {
            // arrange
            let relatedCards = [];
            let errorOccurred = false;

            // act
            try {
                Card.validateRelatedCards(relatedCards);
            } catch (e) {
                errorOccurred = true;
            }

            // assert
            expect(errorOccurred).to.be.true;
        });

        it("should validate related card name", () => {
            // arrange
            let relatedCards = [
                {
                    name: "Bruna, the Fading Light",
                    set_code: "v17",
                    collector_number: "5a"
                }
            ];
            let errorOccurred = false;
            let validateNameStub = sandbox.stub(Card, "validateName");

            // act
            try {
                Card.validateRelatedCards(relatedCards);
            } catch (e) {
                errorOccurred = true;
            }

            // assert
            expect(errorOccurred).to.be.false;
            expect(validateNameStub.called).to.be.true;

            // cleanup
            validateNameStub.restore();
        });

        it("should validate related card set_code", () => {
            // arrange
            let relatedCards = [
                {
                    name: "Bruna, the Fading Light",
                    set_code: "v17",
                    collector_number: "5a"
                }
            ];
            let errorOccurred = false;
            let validateSetCodeStub = sandbox.stub(Card, "validateSetCode");

            // act
            try {
                Card.validateRelatedCards(relatedCards);
            } catch (e) {
                errorOccurred = true;
            }

            // assert
            expect(errorOccurred).to.be.false;
            expect(validateSetCodeStub.called).to.be.true;

            // cleanup
            validateSetCodeStub.restore();
        });

        it("should validate related card collector_number", () => {
            // arrange
            let relatedCards = [
                {
                    name: "Bruna, the Fading Light",
                    set_code: "v17",
                    collector_number: "5a"
                }
            ];
            let errorOccurred = false;
            let validateCollectorNumberStub = sandbox.stub(Card, "validateCollectorNumber");

            // act
            try {
                Card.validateRelatedCards(relatedCards);
            } catch (e) {
                errorOccurred = true;
            }

            // assert
            expect(errorOccurred).to.be.false;
            expect(validateCollectorNumberStub.called).to.be.true;

            // cleanup
            validateCollectorNumberStub.restore();
        });

        it("should rethrow error if error in related card name", () => {
            // arrange
            let relatedCards = [
                {
                    name: "Bruna, the Fading Light",
                    set_code: "v17",
                    collector_number: "5a"
                }
            ];
            let errorOccurred = false;
            let validateNameStub = sandbox.stub(Card, "validateName").callsFake(() => {
                throw new Error("validate name error");
            });

            // act
            try {
                Card.validateRelatedCards(relatedCards);
            } catch (e) {
                errorOccurred = true;
            }

            // assert
            expect(errorOccurred).to.be.true;
            expect(validateNameStub.called).to.be.true;

            // cleanup
            validateNameStub.restore();
        });

        it("should rethrow error if error in related card set_code", () => {
            // arrange
            let relatedCards = [
                {
                    name: "Bruna, the Fading Light",
                    set_code: "v17",
                    collector_number: "5a"
                }
            ];
            let errorOccurred = false;
            let validateSetCodeStub = sandbox.stub(Card, "validateSetCode").callsFake(() => {
                throw new Error("validate set_code error");
            });

            // act
            try {
                Card.validateRelatedCards(relatedCards);
            } catch (e) {
                errorOccurred = true;
            }

            // assert
            expect(errorOccurred).to.be.true;
            expect(validateSetCodeStub.called).to.be.true;

            // cleanup
            validateSetCodeStub.restore();
        });

        it("should rethrow error if error in related card name", () => {
            // arrange
            let relatedCards = [
                {
                    name: "Bruna, the Fading Light",
                    set_code: "v17",
                    collector_number: "5a"
                }
            ];
            let errorOccurred = false;
            let validateCollectorNumberStub = sandbox.stub(Card, "validateCollectorNumber").callsFake(() => {
                throw new Error("validate collector_number error");
            });

            // act
            try {
                Card.validateRelatedCards(relatedCards);
            } catch (e) {
                errorOccurred = true;
            }

            // assert
            expect(errorOccurred).to.be.true;
            expect(validateCollectorNumberStub.called).to.be.true;

            // cleanup
            validateCollectorNumberStub.restore();
        });

        it("should allow a single valid related card", () => {
            // arrange
            let relatedCards: IRelatedCard[] = [
                {
                    name: "Bruna, the Fading Light",
                    set_code: "v17",
                    collector_number: "5a"
                }
            ];
            let errorOccurred = false;

            // act
            try {
                Card.validateRelatedCards(relatedCards);
            } catch (e) {
                errorOccurred = true;
            }

            // assert
            expect(errorOccurred).to.be.false;
        });

        it("should allow multiple valid related cards", () => {
            // arrange
            let relatedCards: IRelatedCard[] = [
                {
                    name: "Bruna, the Fading Light",
                    set_code: "v17",
                    collector_number: "5a"
                },
                {
                    name: "Brisela, Voice of Nightmares",
                    set_code: "v17",
                    collector_number: "5b"
                },
                {
                    name: "Gisela, the Broken Blade",
                    set_code: "v17",
                    collector_number: "10a"
                }
            ];
            let errorOccurred = false;

            // act
            try {
                Card.validateRelatedCards(relatedCards);
            } catch (e) {
                errorOccurred = true;
            }

            // assert
            expect(errorOccurred).to.be.false;
        });
    });

    describe("card_faces", () => {
        it("should ignore if missing", () => {
            // arrange
            let cardFaces;
            let errorOccurred = false;

            // act
            try {
                Card.validateCardFaces(cardFaces);
            } catch (e) {
                errorOccurred = true;
            }

            // assert
            expect(errorOccurred).to.be.false;
        });

        it("should error if not Array", () => {
            // arrange
            let cardFaces = {};
            let errorOccurred = false;

            // act
            try {
                Card.validateCardFaces(cardFaces);
            } catch (e) {
                errorOccurred = true;
            }

            // assert
            expect(errorOccurred).to.be.true;
        });

        it("should error if Array is empty", () => {
            // arrange
            let cardFaces = [];
            let errorOccurred = false;

            // act
            try {
                Card.validateCardFaces(cardFaces);
            } catch (e) {
                errorOccurred = true;
            }

            // assert
            expect(errorOccurred).to.be.true;
        });

        it("should validate card face name", () => {
            // arrange
            let cardFaces: ICardFace[] = [
                {
                    name: "Conqueror's Galleon",
                    mana_cost: "{4}",
                    type_line: "Artifact — Vehicle",
                    oracle_text:
                        "When Conqueror's Galleon attacks, exile it at end of combat, then return it to the battlefield transformed under your control. Crew 4 (Tap any number of creatures you control with total power 4 or more: This Vehicle becomes an artifact creature until end of turn.)",
                    colors: [],
                    power: "2",
                    toughness: "10",
                    image_uri: "https://img.scryfall.com/cards/png/en/pxtc/234a.png",
                    color_indicator: [],
                    flavor_text: "flavor text",
                    loyalty: "3"
                }
            ];
            let errorOccurred = false;
            let validateNameStub = sandbox.stub(Card, "validateName");

            // act
            try {
                Card.validateCardFaces(cardFaces);
            } catch (e) {
                errorOccurred = true;
            }

            // assert
            expect(errorOccurred).to.be.false;
            expect(validateNameStub.called).to.be.true;

            // cleanup
            validateNameStub.restore();
        });

        it("should validate card face type_line", () => {
            // arrange
            let cardFaces: ICardFace[] = [
                {
                    name: "Conqueror's Galleon",
                    mana_cost: "{4}",
                    type_line: "Artifact — Vehicle",
                    oracle_text:
                        "When Conqueror's Galleon attacks, exile it at end of combat, then return it to the battlefield transformed under your control. Crew 4 (Tap any number of creatures you control with total power 4 or more: This Vehicle becomes an artifact creature until end of turn.)",
                    colors: [],
                    power: "2",
                    toughness: "10",
                    image_uri: "https://img.scryfall.com/cards/png/en/pxtc/234a.png",
                    color_indicator: [],
                    flavor_text: "flavor text",
                    loyalty: "3"
                }
            ];
            let errorOccurred = false;
            let validateTypeLineStub = sandbox.stub(Card, "validateTypeLine");

            // act
            try {
                Card.validateCardFaces(cardFaces);
            } catch (e) {
                errorOccurred = true;
            }

            // assert
            expect(errorOccurred).to.be.false;
            expect(validateTypeLineStub.called).to.be.true;

            // cleanup
            validateTypeLineStub.restore();
        });

        it("should validate card face oracle_text", () => {
            // arrange
            let cardFaces: ICardFace[] = [
                {
                    name: "Conqueror's Galleon",
                    mana_cost: "{4}",
                    type_line: "Artifact — Vehicle",
                    oracle_text:
                        "When Conqueror's Galleon attacks, exile it at end of combat, then return it to the battlefield transformed under your control. Crew 4 (Tap any number of creatures you control with total power 4 or more: This Vehicle becomes an artifact creature until end of turn.)",
                    colors: [],
                    power: "2",
                    toughness: "10",
                    image_uri: "https://img.scryfall.com/cards/png/en/pxtc/234a.png",
                    color_indicator: [],
                    flavor_text: "flavor text",
                    loyalty: "3"
                }
            ];
            let errorOccurred = false;
            let validateOracleTextStub = sandbox.stub(Card, "validateOracleText");

            // act
            try {
                Card.validateCardFaces(cardFaces);
            } catch (e) {
                errorOccurred = true;
            }

            // assert
            expect(errorOccurred).to.be.false;
            expect(validateOracleTextStub.called).to.be.true;

            // cleanup
            validateOracleTextStub.restore();
        });

        it("should validate card face mana_cost", () => {
            // arrange
            let cardFaces: ICardFace[] = [
                {
                    name: "Conqueror's Galleon",
                    mana_cost: "{4}",
                    type_line: "Artifact — Vehicle",
                    oracle_text:
                        "When Conqueror's Galleon attacks, exile it at end of combat, then return it to the battlefield transformed under your control. Crew 4 (Tap any number of creatures you control with total power 4 or more: This Vehicle becomes an artifact creature until end of turn.)",
                    colors: [],
                    power: "2",
                    toughness: "10",
                    image_uri: "https://img.scryfall.com/cards/png/en/pxtc/234a.png",
                    color_indicator: [],
                    flavor_text: "flavor text",
                    loyalty: "3"
                }
            ];
            let errorOccurred = false;
            let validateManaCostStub = sandbox.stub(Card, "validateManaCost");

            // act
            try {
                Card.validateCardFaces(cardFaces);
            } catch (e) {
                errorOccurred = true;
            }

            // assert
            expect(errorOccurred).to.be.false;
            expect(validateManaCostStub.called).to.be.true;

            // cleanup
            validateManaCostStub.restore();
        });

        it("should validate card face colors", () => {
            // arrange
            let cardFaces: ICardFace[] = [
                {
                    name: "Conqueror's Galleon",
                    mana_cost: "{4}",
                    type_line: "Artifact — Vehicle",
                    oracle_text:
                        "When Conqueror's Galleon attacks, exile it at end of combat, then return it to the battlefield transformed under your control. Crew 4 (Tap any number of creatures you control with total power 4 or more: This Vehicle becomes an artifact creature until end of turn.)",
                    colors: [],
                    power: "2",
                    toughness: "10",
                    image_uri: "https://img.scryfall.com/cards/png/en/pxtc/234a.png",
                    color_indicator: [],
                    flavor_text: "flavor text",
                    loyalty: "3"
                }
            ];
            let errorOccurred = false;
            let validateColorsStub = sandbox.stub(Card, "validateColors");

            // act
            try {
                Card.validateCardFaces(cardFaces);
            } catch (e) {
                errorOccurred = true;
            }

            // assert
            expect(errorOccurred).to.be.false;
            expect(validateColorsStub.called).to.be.true;

            // cleanup
            validateColorsStub.restore();
        });

        it("should validate card face color_indicator", () => {
            // arrange
            let cardFaces: ICardFace[] = [
                {
                    name: "Conqueror's Galleon",
                    mana_cost: "{4}",
                    type_line: "Artifact — Vehicle",
                    oracle_text:
                        "When Conqueror's Galleon attacks, exile it at end of combat, then return it to the battlefield transformed under your control. Crew 4 (Tap any number of creatures you control with total power 4 or more: This Vehicle becomes an artifact creature until end of turn.)",
                    colors: [],
                    power: "2",
                    toughness: "10",
                    image_uri: "https://img.scryfall.com/cards/png/en/pxtc/234a.png",
                    color_indicator: [],
                    flavor_text: "flavor text",
                    loyalty: "3"
                }
            ];
            let errorOccurred = false;
            let validateColorIndicator = sandbox.stub(Card, "validateColorIndicator");

            // act
            try {
                Card.validateCardFaces(cardFaces);
            } catch (e) {
                errorOccurred = true;
            }

            // assert
            expect(errorOccurred).to.be.false;
            expect(validateColorIndicator.called).to.be.true;

            // cleanup
            validateColorIndicator.restore();
        });

        it("should validate card face power", () => {
            // arrange
            let cardFaces: ICardFace[] = [
                {
                    name: "Conqueror's Galleon",
                    mana_cost: "{4}",
                    type_line: "Artifact — Vehicle",
                    oracle_text:
                        "When Conqueror's Galleon attacks, exile it at end of combat, then return it to the battlefield transformed under your control. Crew 4 (Tap any number of creatures you control with total power 4 or more: This Vehicle becomes an artifact creature until end of turn.)",
                    colors: [],
                    power: "2",
                    toughness: "10",
                    image_uri: "https://img.scryfall.com/cards/png/en/pxtc/234a.png",
                    color_indicator: [],
                    flavor_text: "flavor text",
                    loyalty: "3"
                }
            ];
            let errorOccurred = false;
            let validatePowerStub = sandbox.stub(Card, "validatePower");

            // act
            try {
                Card.validateCardFaces(cardFaces);
            } catch (e) {
                errorOccurred = true;
            }

            // assert
            expect(errorOccurred).to.be.false;
            expect(validatePowerStub.called).to.be.true;

            // cleanup
            validatePowerStub.restore();
        });

        it("should validate card face toughness", () => {
            // arrange
            let cardFaces: ICardFace[] = [
                {
                    name: "Conqueror's Galleon",
                    mana_cost: "{4}",
                    type_line: "Artifact — Vehicle",
                    oracle_text:
                        "When Conqueror's Galleon attacks, exile it at end of combat, then return it to the battlefield transformed under your control. Crew 4 (Tap any number of creatures you control with total power 4 or more: This Vehicle becomes an artifact creature until end of turn.)",
                    colors: [],
                    power: "2",
                    toughness: "10",
                    image_uri: "https://img.scryfall.com/cards/png/en/pxtc/234a.png",
                    color_indicator: [],
                    flavor_text: "flavor text",
                    loyalty: "3"
                }
            ];
            let errorOccurred = false;
            let validateToughnessStub = sandbox.stub(Card, "validateToughness");

            // act
            try {
                Card.validateCardFaces(cardFaces);
            } catch (e) {
                errorOccurred = true;
            }

            // assert
            expect(errorOccurred).to.be.false;
            expect(validateToughnessStub.called).to.be.true;

            // cleanup
            validateToughnessStub.restore();
        });

        it("should validate card face loyalty", () => {
            // arrange
            let cardFaces: ICardFace[] = [
                {
                    name: "Conqueror's Galleon",
                    mana_cost: "{4}",
                    type_line: "Artifact — Vehicle",
                    oracle_text:
                        "When Conqueror's Galleon attacks, exile it at end of combat, then return it to the battlefield transformed under your control. Crew 4 (Tap any number of creatures you control with total power 4 or more: This Vehicle becomes an artifact creature until end of turn.)",
                    colors: [],
                    power: "2",
                    toughness: "10",
                    image_uri: "https://img.scryfall.com/cards/png/en/pxtc/234a.png",
                    color_indicator: [],
                    flavor_text: "flavor text",
                    loyalty: "3"
                }
            ];
            let errorOccurred = false;
            let validateLoyaltyStub = sandbox.stub(Card, "validateLoyalty");

            // act
            try {
                Card.validateCardFaces(cardFaces);
            } catch (e) {
                errorOccurred = true;
            }

            // assert
            expect(errorOccurred).to.be.false;
            expect(validateLoyaltyStub.called).to.be.true;

            // cleanup
            validateLoyaltyStub.restore();
        });

        it("should validate card face flavor_text", () => {
            // arrange
            let cardFaces: ICardFace[] = [
                {
                    name: "Conqueror's Galleon",
                    mana_cost: "{4}",
                    type_line: "Artifact — Vehicle",
                    oracle_text:
                        "When Conqueror's Galleon attacks, exile it at end of combat, then return it to the battlefield transformed under your control. Crew 4 (Tap any number of creatures you control with total power 4 or more: This Vehicle becomes an artifact creature until end of turn.)",
                    colors: [],
                    power: "2",
                    toughness: "10",
                    image_uri: "https://img.scryfall.com/cards/png/en/pxtc/234a.png",
                    color_indicator: [],
                    flavor_text: "flavor text",
                    loyalty: "3"
                }
            ];
            let errorOccurred = false;
            let validateFlavorTextStub = sandbox.stub(Card, "validateFlavorText");

            // act
            try {
                Card.validateCardFaces(cardFaces);
            } catch (e) {
                errorOccurred = true;
            }

            // assert
            expect(errorOccurred).to.be.false;
            expect(validateFlavorTextStub.called).to.be.true;

            // cleanup
            validateFlavorTextStub.restore();
        });

        it("should validate card face image_url", () => {
            // arrange
            let cardFaces: ICardFace[] = [
                {
                    name: "Conqueror's Galleon",
                    mana_cost: "{4}",
                    type_line: "Artifact — Vehicle",
                    oracle_text:
                        "When Conqueror's Galleon attacks, exile it at end of combat, then return it to the battlefield transformed under your control. Crew 4 (Tap any number of creatures you control with total power 4 or more: This Vehicle becomes an artifact creature until end of turn.)",
                    colors: [],
                    power: "2",
                    toughness: "10",
                    image_uri: "https://img.scryfall.com/cards/png/en/pxtc/234a.png",
                    color_indicator: [],
                    flavor_text: "flavor text",
                    loyalty: "3"
                }
            ];
            let errorOccurred = false;
            let validateImageUriStub = sandbox.stub(Card, "validateImageUri");

            // act
            try {
                Card.validateCardFaces(cardFaces);
            } catch (e) {
                errorOccurred = true;
            }

            // assert
            expect(errorOccurred).to.be.false;
            expect(validateImageUriStub.called).to.be.true;

            // cleanup
            validateImageUriStub.restore();
        });

        it("should rethrow error on error in validating name", () => {
            // arrange
            let cardFaces: ICardFace[] = [
                {
                    name: "Conqueror's Galleon",
                    mana_cost: "{4}",
                    type_line: "Artifact — Vehicle",
                    oracle_text:
                        "When Conqueror's Galleon attacks, exile it at end of combat, then return it to the battlefield transformed under your control. Crew 4 (Tap any number of creatures you control with total power 4 or more: This Vehicle becomes an artifact creature until end of turn.)",
                    colors: [],
                    power: "2",
                    toughness: "10",
                    image_uri: "https://img.scryfall.com/cards/png/en/pxtc/234a.png",
                    color_indicator: [],
                    flavor_text: "flavor text",
                    loyalty: "3"
                }
            ];
            let errorOccurred = false;
            let validateNameStub = sandbox.stub(Card, "validateName").callsFake(() => {
                throw new Error("validate name error");
            });

            // act
            try {
                Card.validateCardFaces(cardFaces);
            } catch (e) {
                errorOccurred = true;
            }

            // assert
            expect(errorOccurred).to.be.true;
            expect(validateNameStub.called).to.be.true;

            // cleanup
            validateNameStub.restore();
        });

        it("should rethrow error on error in validating type_line", () => {
            // arrange
            let cardFaces: ICardFace[] = [
                {
                    name: "Conqueror's Galleon",
                    mana_cost: "{4}",
                    type_line: "Artifact — Vehicle",
                    oracle_text:
                        "When Conqueror's Galleon attacks, exile it at end of combat, then return it to the battlefield transformed under your control. Crew 4 (Tap any number of creatures you control with total power 4 or more: This Vehicle becomes an artifact creature until end of turn.)",
                    colors: [],
                    power: "2",
                    toughness: "10",
                    image_uri: "https://img.scryfall.com/cards/png/en/pxtc/234a.png",
                    color_indicator: [],
                    flavor_text: "flavor text",
                    loyalty: "3"
                }
            ];
            let errorOccurred = false;
            let validateTypeLineStub = sandbox.stub(Card, "validateTypeLine").callsFake(() => {
                throw new Error("validate type_line error");
            });

            // act
            try {
                Card.validateCardFaces(cardFaces);
            } catch (e) {
                errorOccurred = true;
            }

            // assert
            expect(errorOccurred).to.be.true;
            expect(validateTypeLineStub.called).to.be.true;

            // cleanup
            validateTypeLineStub.restore();
        });

        it("should rethrow error on error in validating oracle_text", () => {
            // arrange
            let cardFaces: ICardFace[] = [
                {
                    name: "Conqueror's Galleon",
                    mana_cost: "{4}",
                    type_line: "Artifact — Vehicle",
                    oracle_text:
                        "When Conqueror's Galleon attacks, exile it at end of combat, then return it to the battlefield transformed under your control. Crew 4 (Tap any number of creatures you control with total power 4 or more: This Vehicle becomes an artifact creature until end of turn.)",
                    colors: [],
                    power: "2",
                    toughness: "10",
                    image_uri: "https://img.scryfall.com/cards/png/en/pxtc/234a.png",
                    color_indicator: [],
                    flavor_text: "flavor text",
                    loyalty: "3"
                }
            ];
            let errorOccurred = false;
            let validateOracleTextStub = sandbox.stub(Card, "validateOracleText").callsFake(() => {
                throw new Error("validate oracle_text error");
            });

            // act
            try {
                Card.validateCardFaces(cardFaces);
            } catch (e) {
                errorOccurred = true;
            }

            // assert
            expect(errorOccurred).to.be.true;
            expect(validateOracleTextStub.called).to.be.true;

            // cleanup
            validateOracleTextStub.restore();
        });

        it("should rethrow error on error in validating mana_cost", () => {
            // arrange
            let cardFaces: ICardFace[] = [
                {
                    name: "Conqueror's Galleon",
                    mana_cost: "{4}",
                    type_line: "Artifact — Vehicle",
                    oracle_text:
                        "When Conqueror's Galleon attacks, exile it at end of combat, then return it to the battlefield transformed under your control. Crew 4 (Tap any number of creatures you control with total power 4 or more: This Vehicle becomes an artifact creature until end of turn.)",
                    colors: [],
                    power: "2",
                    toughness: "10",
                    image_uri: "https://img.scryfall.com/cards/png/en/pxtc/234a.png",
                    color_indicator: [],
                    flavor_text: "flavor text",
                    loyalty: "3"
                }
            ];
            let errorOccurred = false;
            let validateManaCostStub = sandbox.stub(Card, "validateManaCost").callsFake(() => {
                throw new Error("validate mana_cost error");
            });

            // act
            try {
                Card.validateCardFaces(cardFaces);
            } catch (e) {
                errorOccurred = true;
            }

            // assert
            expect(errorOccurred).to.be.true;
            expect(validateManaCostStub.called).to.be.true;

            // cleanup
            validateManaCostStub.restore();
        });

        it("should rethrow error on error in validating colors", () => {
            // arrange
            let cardFaces: ICardFace[] = [
                {
                    name: "Conqueror's Galleon",
                    mana_cost: "{4}",
                    type_line: "Artifact — Vehicle",
                    oracle_text:
                        "When Conqueror's Galleon attacks, exile it at end of combat, then return it to the battlefield transformed under your control. Crew 4 (Tap any number of creatures you control with total power 4 or more: This Vehicle becomes an artifact creature until end of turn.)",
                    colors: [],
                    power: "2",
                    toughness: "10",
                    image_uri: "https://img.scryfall.com/cards/png/en/pxtc/234a.png",
                    color_indicator: [],
                    flavor_text: "flavor text",
                    loyalty: "3"
                }
            ];
            let errorOccurred = false;
            let validateNameStub = sandbox.stub(Card, "validateColors").callsFake(() => {
                throw new Error("validate colors error");
            });

            // act
            try {
                Card.validateCardFaces(cardFaces);
            } catch (e) {
                errorOccurred = true;
            }

            // assert
            expect(errorOccurred).to.be.true;
            expect(validateNameStub.called).to.be.true;

            // cleanup
            validateNameStub.restore();
        });

        it("should rethrow error on error in validating color_indicator", () => {
            // arrange
            let cardFaces: ICardFace[] = [
                {
                    name: "Conqueror's Galleon",
                    mana_cost: "{4}",
                    type_line: "Artifact — Vehicle",
                    oracle_text:
                        "When Conqueror's Galleon attacks, exile it at end of combat, then return it to the battlefield transformed under your control. Crew 4 (Tap any number of creatures you control with total power 4 or more: This Vehicle becomes an artifact creature until end of turn.)",
                    colors: [],
                    power: "2",
                    toughness: "10",
                    image_uri: "https://img.scryfall.com/cards/png/en/pxtc/234a.png",
                    color_indicator: [],
                    flavor_text: "flavor text",
                    loyalty: "3"
                }
            ];
            let errorOccurred = false;
            let validateColorIndicatorStub = sandbox.stub(Card, "validateColorIndicator").callsFake(() => {
                throw new Error("validate color_indicator error");
            });

            // act
            try {
                Card.validateCardFaces(cardFaces);
            } catch (e) {
                errorOccurred = true;
            }

            // assert
            expect(errorOccurred).to.be.true;
            expect(validateColorIndicatorStub.called).to.be.true;

            // cleanup
            validateColorIndicatorStub.restore();
        });

        it("should rethrow error on error in validating power", () => {
            // arrange
            let cardFaces: ICardFace[] = [
                {
                    name: "Conqueror's Galleon",
                    mana_cost: "{4}",
                    type_line: "Artifact — Vehicle",
                    oracle_text:
                        "When Conqueror's Galleon attacks, exile it at end of combat, then return it to the battlefield transformed under your control. Crew 4 (Tap any number of creatures you control with total power 4 or more: This Vehicle becomes an artifact creature until end of turn.)",
                    colors: [],
                    power: "2",
                    toughness: "10",
                    image_uri: "https://img.scryfall.com/cards/png/en/pxtc/234a.png",
                    color_indicator: [],
                    flavor_text: "flavor text",
                    loyalty: "3"
                }
            ];
            let errorOccurred = false;
            let validatePowerStub = sandbox.stub(Card, "validatePower").callsFake(() => {
                throw new Error("validate power error");
            });

            // act
            try {
                Card.validateCardFaces(cardFaces);
            } catch (e) {
                errorOccurred = true;
            }

            // assert
            expect(errorOccurred).to.be.true;
            expect(validatePowerStub.called).to.be.true;

            // cleanup
            validatePowerStub.restore();
        });

        it("should rethrow error on error in validating toughness", () => {
            // arrange
            let cardFaces: ICardFace[] = [
                {
                    name: "Conqueror's Galleon",
                    mana_cost: "{4}",
                    type_line: "Artifact — Vehicle",
                    oracle_text:
                        "When Conqueror's Galleon attacks, exile it at end of combat, then return it to the battlefield transformed under your control. Crew 4 (Tap any number of creatures you control with total power 4 or more: This Vehicle becomes an artifact creature until end of turn.)",
                    colors: [],
                    power: "2",
                    toughness: "10",
                    image_uri: "https://img.scryfall.com/cards/png/en/pxtc/234a.png",
                    color_indicator: [],
                    flavor_text: "flavor text",
                    loyalty: "3"
                }
            ];
            let errorOccurred = false;
            let validateToughnessStub = sandbox.stub(Card, "validateToughness").callsFake(() => {
                throw new Error("validate toughness error");
            });

            // act
            try {
                Card.validateCardFaces(cardFaces);
            } catch (e) {
                errorOccurred = true;
            }

            // assert
            expect(errorOccurred).to.be.true;
            expect(validateToughnessStub.called).to.be.true;

            // cleanup
            validateToughnessStub.restore();
        });

        it("should rethrow error on error in validating loyalty", () => {
            // arrange
            let cardFaces: ICardFace[] = [
                {
                    name: "Conqueror's Galleon",
                    mana_cost: "{4}",
                    type_line: "Artifact — Vehicle",
                    oracle_text:
                        "When Conqueror's Galleon attacks, exile it at end of combat, then return it to the battlefield transformed under your control. Crew 4 (Tap any number of creatures you control with total power 4 or more: This Vehicle becomes an artifact creature until end of turn.)",
                    colors: [],
                    power: "2",
                    toughness: "10",
                    image_uri: "https://img.scryfall.com/cards/png/en/pxtc/234a.png",
                    color_indicator: [],
                    flavor_text: "flavor text",
                    loyalty: "3"
                }
            ];
            let errorOccurred = false;
            let validateLoyaltyStub = sandbox.stub(Card, "validateLoyalty").callsFake(() => {
                throw new Error("validate loyalty error");
            });

            // act
            try {
                Card.validateCardFaces(cardFaces);
            } catch (e) {
                errorOccurred = true;
            }

            // assert
            expect(errorOccurred).to.be.true;
            expect(validateLoyaltyStub.called).to.be.true;

            // cleanup
            validateLoyaltyStub.restore();
        });

        it("should rethrow error on error in validating flavor_text", () => {
            // arrange
            let cardFaces: ICardFace[] = [
                {
                    name: "Conqueror's Galleon",
                    mana_cost: "{4}",
                    type_line: "Artifact — Vehicle",
                    oracle_text:
                        "When Conqueror's Galleon attacks, exile it at end of combat, then return it to the battlefield transformed under your control. Crew 4 (Tap any number of creatures you control with total power 4 or more: This Vehicle becomes an artifact creature until end of turn.)",
                    colors: [],
                    power: "2",
                    toughness: "10",
                    image_uri: "https://img.scryfall.com/cards/png/en/pxtc/234a.png",
                    color_indicator: [],
                    flavor_text: "flavor text",
                    loyalty: "3"
                }
            ];
            let errorOccurred = false;
            let validateFlavorTextStub = sandbox.stub(Card, "validateFlavorText").callsFake(() => {
                throw new Error("validate flavor_text error");
            });

            // act
            try {
                Card.validateCardFaces(cardFaces);
            } catch (e) {
                errorOccurred = true;
            }

            // assert
            expect(errorOccurred).to.be.true;
            expect(validateFlavorTextStub.called).to.be.true;

            // cleanup
            validateFlavorTextStub.restore();
        });

        it("should rethrow error on error in validating image_url", () => {
            // arrange
            let cardFaces: ICardFace[] = [
                {
                    name: "Conqueror's Galleon",
                    mana_cost: "{4}",
                    type_line: "Artifact — Vehicle",
                    oracle_text:
                        "When Conqueror's Galleon attacks, exile it at end of combat, then return it to the battlefield transformed under your control. Crew 4 (Tap any number of creatures you control with total power 4 or more: This Vehicle becomes an artifact creature until end of turn.)",
                    colors: [],
                    power: "2",
                    toughness: "10",
                    image_uri: "https://img.scryfall.com/cards/png/en/pxtc/234a.png",
                    color_indicator: [],
                    flavor_text: "flavor text",
                    loyalty: "3"
                }
            ];
            let errorOccurred = false;
            let validateImageUriStub = sandbox.stub(Card, "validateImageUri").callsFake(() => {
                throw new Error("validate image_uri error");
            });

            // act
            try {
                Card.validateCardFaces(cardFaces);
            } catch (e) {
                errorOccurred = true;
            }

            // assert
            expect(errorOccurred).to.be.true;
            expect(validateImageUriStub.called).to.be.true;

            // cleanup
            validateImageUriStub.restore();
        });

        it("should allow a single valid card face", () => {
            // arrange
            let cardFaces = [
                {
                    name: "Conqueror's Galleon",
                    mana_cost: "{4}",
                    type_line: "Artifact — Vehicle",
                    oracle_text:
                        "When Conqueror's Galleon attacks, exile it at end of combat, then return it to the battlefield transformed under your control. Crew 4 (Tap any number of creatures you control with total power 4 or more: This Vehicle becomes an artifact creature until end of turn.)",
                    colors: [],
                    power: "2",
                    toughness: "10",
                    image_uri: "https://img.scryfall.com/cards/png/en/pxtc/234a.png"
                }
            ];
            let errorOccurred = false;

            // act
            try {
                Card.validateCardFaces(cardFaces);
            } catch (e) {
                errorOccurred = true;
            }

            // assert
            expect(errorOccurred).to.be.false;
        });

        it("should allow multiple valid card faces", () => {
            // arrange
            let cardFaces = [
                {
                    name: "Conqueror's Galleon",
                    mana_cost: "{4}",
                    type_line: "Artifact — Vehicle",
                    oracle_text:
                        "When Conqueror's Galleon attacks, exile it at end of combat, then return it to the battlefield transformed under your control. Crew 4 (Tap any number of creatures you control with total power 4 or more: This Vehicle becomes an artifact creature until end of turn.)",
                    colors: [],
                    power: "2",
                    toughness: "10",
                    image_uri: "https://img.scryfall.com/cards/png/en/pxtc/234a.png"
                },
                {
                    name: "Dowsing Dagger",
                    mana_cost: "{2}",
                    type_line: "Artifact — Equipment",
                    oracle_text:
                        "When Dowsing Dagger enters the battlefield, target opponent creates two 0/2 green Plant creature tokens with defender. Equipped creature gets +2/+1. Whenever equipped creature deals combat damage to a player, you may transform Dowsing Dagger. Equip {2}",
                    colors: [],
                    image_uri: "https://img.scryfall.com/cards/png/en/pxtc/235a.png"
                }
            ];
            let errorOccurred = false;

            // act
            try {
                Card.validateCardFaces(cardFaces);
            } catch (e) {
                errorOccurred = true;
            }

            // assert
            expect(errorOccurred).to.be.false;
        });
    });

    describe("legality", () => {
        it("should error if missing", () => {
            // arrange
            let legality;
            let errorOccurred = false;

            // act
            try {
                Card.validateLegality(legality);
            } catch (e) {
                errorOccurred = true;
            }

            // assert
            expect(errorOccurred).to.be.true;
        });

        it("should error if is_standard_legal is missing", () => {
            // arrange
            let legality = {
                is_commander_legal: false,
                is_duel_legal: false,
                is_frontier_legal: false,
                is_future_legal: false,
                is_legacy_legal: false,
                is_modern_legal: false,
                is_one_versus_one_legal: false,
                is_pauper_legal: false,
                is_penny_legal: false,
                is_vintage_legal: false
            };
            let errorOccurred = false;

            // act
            try {
                Card.validateLegality(legality);
            } catch (e) {
                errorOccurred = true;
            }

            // assert
            expect(errorOccurred).to.be.true;
        });

        it("should error if is_standard_legal is not a boolean", () => {
            // arrange
            let legality = {
                is_commander_legal: false,
                is_duel_legal: false,
                is_frontier_legal: false,
                is_future_legal: false,
                is_legacy_legal: false,
                is_modern_legal: false,
                is_one_versus_one_legal: false,
                is_pauper_legal: false,
                is_penny_legal: false,
                is_standard_legal: "false",
                is_vintage_legal: false
            };
            let errorOccurred = false;

            // act
            try {
                Card.validateLegality(legality);
            } catch (e) {
                errorOccurred = true;
            }

            // assert
            expect(errorOccurred).to.be.true;
        });

        it("should error if is_frontier_legal is missing", () => {
            // arrange
            let legality = {
                is_commander_legal: false,
                is_duel_legal: false,
                is_future_legal: false,
                is_legacy_legal: false,
                is_modern_legal: false,
                is_one_versus_one_legal: false,
                is_pauper_legal: false,
                is_penny_legal: false,
                is_standard_legal: false,
                is_vintage_legal: false
            };
            let errorOccurred = false;

            // act
            try {
                Card.validateLegality(legality);
            } catch (e) {
                errorOccurred = true;
            }

            // assert
            expect(errorOccurred).to.be.true;
        });

        it("should error if is_frontier_legal is not a boolean", () => {
            // arrange
            let legality = {
                is_commander_legal: false,
                is_duel_legal: false,
                is_frontier_legal: "false",
                is_future_legal: false,
                is_legacy_legal: false,
                is_modern_legal: false,
                is_one_versus_one_legal: false,
                is_pauper_legal: false,
                is_penny_legal: false,
                is_standard_legal: false,
                is_vintage_legal: false
            };
            let errorOccurred = false;

            // act
            try {
                Card.validateLegality(legality);
            } catch (e) {
                errorOccurred = true;
            }

            // assert
            expect(errorOccurred).to.be.true;
        });

        it("should error if is_modern_legal is missing", () => {
            // arrange
            let legality = {
                is_commander_legal: false,
                is_duel_legal: false,
                is_frontier_legal: false,
                is_future_legal: false,
                is_legacy_legal: false,
                is_one_versus_one_legal: false,
                is_pauper_legal: false,
                is_penny_legal: false,
                is_standard_legal: false,
                is_vintage_legal: false
            };
            let errorOccurred = false;

            // act
            try {
                Card.validateLegality(legality);
            } catch (e) {
                errorOccurred = true;
            }

            // assert
            expect(errorOccurred).to.be.true;
        });

        it("should error if is_modern_legal is not a boolean", () => {
            // arrange
            let legality = {
                is_commander_legal: false,
                is_duel_legal: false,
                is_frontier_legal: false,
                is_future_legal: false,
                is_legacy_legal: false,
                is_modern_legal: "false",
                is_one_versus_one_legal: false,
                is_pauper_legal: false,
                is_penny_legal: false,
                is_standard_legal: false,
                is_vintage_legal: false
            };
            let errorOccurred = false;

            // act
            try {
                Card.validateLegality(legality);
            } catch (e) {
                errorOccurred = true;
            }

            // assert
            expect(errorOccurred).to.be.true;
        });

        it("should error if is_pauper_legal is missing", () => {
            // arrange
            let legality = {
                is_commander_legal: false,
                is_duel_legal: false,
                is_frontier_legal: false,
                is_future_legal: false,
                is_legacy_legal: false,
                is_modern_legal: false,
                is_one_versus_one_legal: false,
                is_penny_legal: false,
                is_standard_legal: false,
                is_vintage_legal: false
            };
            let errorOccurred = false;

            // act
            try {
                Card.validateLegality(legality);
            } catch (e) {
                errorOccurred = true;
            }

            // assert
            expect(errorOccurred).to.be.true;
        });

        it("should error if is_pauper_legal is not a boolean", () => {
            // arrange
            let legality = {
                is_commander_legal: false,
                is_duel_legal: false,
                is_frontier_legal: false,
                is_future_legal: false,
                is_legacy_legal: false,
                is_modern_legal: false,
                is_one_versus_one_legal: false,
                is_pauper_legal: "false",
                is_penny_legal: false,
                is_standard_legal: false,
                is_vintage_legal: false
            };
            let errorOccurred = false;

            // act
            try {
                Card.validateLegality(legality);
            } catch (e) {
                errorOccurred = true;
            }

            // assert
            expect(errorOccurred).to.be.true;
        });

        it("should error if is_legacy_legal is missing", () => {
            // arrange
            let legality = {
                is_commander_legal: false,
                is_duel_legal: false,
                is_frontier_legal: false,
                is_future_legal: false,
                is_modern_legal: false,
                is_one_versus_one_legal: false,
                is_pauper_legal: false,
                is_penny_legal: false,
                is_standard_legal: false,
                is_vintage_legal: false
            };
            let errorOccurred = false;

            // act
            try {
                Card.validateLegality(legality);
            } catch (e) {
                errorOccurred = true;
            }

            // assert
            expect(errorOccurred).to.be.true;
        });

        it("should error if is_legacy_legal is not a boolean", () => {
            // arrange
            let legality = {
                is_commander_legal: false,
                is_duel_legal: false,
                is_frontier_legal: false,
                is_future_legal: false,
                is_legacy_legal: "false",
                is_modern_legal: false,
                is_one_versus_one_legal: false,
                is_pauper_legal: false,
                is_penny_legal: false,
                is_standard_legal: false,
                is_vintage_legal: false
            };
            let errorOccurred = false;

            // act
            try {
                Card.validateLegality(legality);
            } catch (e) {
                errorOccurred = true;
            }

            // assert
            expect(errorOccurred).to.be.true;
        });

        it("should error if is_penny_legal is missing", () => {
            // arrange
            let legality = {
                is_commander_legal: false,
                is_duel_legal: false,
                is_frontier_legal: false,
                is_future_legal: false,
                is_legacy_legal: false,
                is_modern_legal: false,
                is_one_versus_one_legal: false,
                is_pauper_legal: false,
                is_standard_legal: false,
                is_vintage_legal: false
            };
            let errorOccurred = false;

            // act
            try {
                Card.validateLegality(legality);
            } catch (e) {
                errorOccurred = true;
            }

            // assert
            expect(errorOccurred).to.be.true;
        });

        it("should error if is_penny_legal is not a boolean", () => {
            // arrange
            let legality = {
                is_commander_legal: false,
                is_duel_legal: false,
                is_frontier_legal: false,
                is_future_legal: false,
                is_legacy_legal: false,
                is_modern_legal: false,
                is_one_versus_one_legal: false,
                is_pauper_legal: false,
                is_penny_legal: "false",
                is_standard_legal: false,
                is_vintage_legal: false
            };
            let errorOccurred = false;

            // act
            try {
                Card.validateLegality(legality);
            } catch (e) {
                errorOccurred = true;
            }

            // assert
            expect(errorOccurred).to.be.true;
        });

        it("should error if is_vintage_legal is missing", () => {
            // arrange
            let legality = {
                is_commander_legal: false,
                is_duel_legal: false,
                is_frontier_legal: false,
                is_future_legal: false,
                is_legacy_legal: false,
                is_modern_legal: false,
                is_one_versus_one_legal: false,
                is_pauper_legal: false,
                is_penny_legal: false,
                is_standard_legal: false
            };
            let errorOccurred = false;

            // act
            try {
                Card.validateLegality(legality);
            } catch (e) {
                errorOccurred = true;
            }

            // assert
            expect(errorOccurred).to.be.true;
        });

        it("should error if is_vintage_legal is not a boolean", () => {
            // arrange
            let legality = {
                is_commander_legal: false,
                is_duel_legal: false,
                is_frontier_legal: false,
                is_future_legal: false,
                is_legacy_legal: false,
                is_modern_legal: false,
                is_one_versus_one_legal: false,
                is_pauper_legal: false,
                is_penny_legal: false,
                is_standard_legal: false,
                is_vintage_legal: "false"
            };
            let errorOccurred = false;

            // act
            try {
                Card.validateLegality(legality);
            } catch (e) {
                errorOccurred = true;
            }

            // assert
            expect(errorOccurred).to.be.true;
        });

        it("should error if is_duel_legal is missing", () => {
            // arrange
            let legality = {
                is_commander_legal: false,
                is_frontier_legal: false,
                is_future_legal: false,
                is_legacy_legal: false,
                is_modern_legal: false,
                is_one_versus_one_legal: false,
                is_pauper_legal: false,
                is_penny_legal: false,
                is_standard_legal: false,
                is_vintage_legal: false
            };
            let errorOccurred = false;

            // act
            try {
                Card.validateLegality(legality);
            } catch (e) {
                errorOccurred = true;
            }

            // assert
            expect(errorOccurred).to.be.true;
        });

        it("should error if is_duel_legal is not a boolean", () => {
            // arrange
            let legality = {
                is_commander_legal: false,
                is_duel_legal: "false",
                is_frontier_legal: false,
                is_future_legal: false,
                is_legacy_legal: false,
                is_modern_legal: false,
                is_one_versus_one_legal: false,
                is_pauper_legal: false,
                is_penny_legal: false,
                is_standard_legal: false,
                is_vintage_legal: false
            };
            let errorOccurred = false;

            // act
            try {
                Card.validateLegality(legality);
            } catch (e) {
                errorOccurred = true;
            }

            // assert
            expect(errorOccurred).to.be.true;
        });

        it("should error if is_commander_legal is missing", () => {
            // arrange
            let legality = {
                is_duel_legal: false,
                is_frontier_legal: false,
                is_future_legal: false,
                is_legacy_legal: false,
                is_modern_legal: false,
                is_one_versus_one_legal: false,
                is_pauper_legal: false,
                is_penny_legal: false,
                is_standard_legal: false,
                is_vintage_legal: false
            };
            let errorOccurred = false;

            // act
            try {
                Card.validateLegality(legality);
            } catch (e) {
                errorOccurred = true;
            }

            // assert
            expect(errorOccurred).to.be.true;
        });

        it("should error if is_commander_legal is not a boolean", () => {
            // arrange
            let legality = {
                is_commander_legal: "false",
                is_duel_legal: false,
                is_frontier_legal: false,
                is_future_legal: false,
                is_legacy_legal: false,
                is_modern_legal: false,
                is_one_versus_one_legal: false,
                is_pauper_legal: false,
                is_penny_legal: false,
                is_standard_legal: false,
                is_vintage_legal: false
            };
            let errorOccurred = false;

            // act
            try {
                Card.validateLegality(legality);
            } catch (e) {
                errorOccurred = true;
            }

            // assert
            expect(errorOccurred).to.be.true;
        });

        it("should error if is_one_versus_one_legal is missing", () => {
            // arrange
            let legality = {
                is_commander_legal: false,
                is_duel_legal: false,
                is_frontier_legal: false,
                is_future_legal: false,
                is_legacy_legal: false,
                is_modern_legal: false,
                is_pauper_legal: false,
                is_penny_legal: false,
                is_standard_legal: false,
                is_vintage_legal: false
            };
            let errorOccurred = false;

            // act
            try {
                Card.validateLegality(legality);
            } catch (e) {
                errorOccurred = true;
            }

            // assert
            expect(errorOccurred).to.be.true;
        });

        it("should error if is_one_versus_one_legal is not a boolean", () => {
            // arrange
            let legality = {
                is_commander_legal: false,
                is_duel_legal: false,
                is_frontier_legal: false,
                is_future_legal: false,
                is_legacy_legal: false,
                is_modern_legal: false,
                is_one_versus_one_legal: "false",
                is_pauper_legal: false,
                is_penny_legal: false,
                is_standard_legal: false,
                is_vintage_legal: false
            };
            let errorOccurred = false;

            // act
            try {
                Card.validateLegality(legality);
            } catch (e) {
                errorOccurred = true;
            }

            // assert
            expect(errorOccurred).to.be.true;
        });

        it("should error if is_future_legal is missing", () => {
            // arrange
            let legality = {
                is_commander_legal: false,
                is_duel_legal: false,
                is_frontier_legal: false,
                is_legacy_legal: false,
                is_modern_legal: false,
                is_one_versus_one_legal: false,
                is_pauper_legal: false,
                is_penny_legal: false,
                is_standard_legal: false,
                is_vintage_legal: false
            };
            let errorOccurred = false;

            // act
            try {
                Card.validateLegality(legality);
            } catch (e) {
                errorOccurred = true;
            }

            // assert
            expect(errorOccurred).to.be.true;
        });

        it("should error if is_future_legal is not a boolean", () => {
            // arrange
            let legality = {
                is_commander_legal: false,
                is_duel_legal: false,
                is_frontier_legal: false,
                is_future_legal: "false",
                is_legacy_legal: false,
                is_modern_legal: false,
                is_one_versus_one_legal: false,
                is_pauper_legal: false,
                is_penny_legal: false,
                is_standard_legal: false,
                is_vintage_legal: false
            };
            let errorOccurred = false;

            // act
            try {
                Card.validateLegality(legality);
            } catch (e) {
                errorOccurred = true;
            }

            // assert
            expect(errorOccurred).to.be.true;
        });

        it("should allow legality values to be true", () => {
            // arrange
            let legality = {
                is_commander_legal: true,
                is_duel_legal: true,
                is_frontier_legal: true,
                is_future_legal: true,
                is_legacy_legal: true,
                is_modern_legal: true,
                is_one_versus_one_legal: true,
                is_pauper_legal: true,
                is_penny_legal: true,
                is_standard_legal: true,
                is_vintage_legal: true
            };
            let errorOccurred = false;

            // act
            try {
                Card.validateLegality(legality);
            } catch (e) {
                errorOccurred = true;
            }

            // assert
            expect(errorOccurred).to.be.false;
        });

        it("should allow legality values to be false", () => {
            // arrange
            let legality = {
                is_commander_legal: false,
                is_duel_legal: false,
                is_frontier_legal: false,
                is_future_legal: false,
                is_legacy_legal: false,
                is_modern_legal: false,
                is_one_versus_one_legal: false,
                is_pauper_legal: false,
                is_penny_legal: false,
                is_standard_legal: false,
                is_vintage_legal: false
            };
            let errorOccurred = false;

            // act
            try {
                Card.validateLegality(legality);
            } catch (e) {
                errorOccurred = true;
            }

            // assert
            expect(errorOccurred).to.be.false;
        });
    });

    describe("is_reserved", () => {
        it("is required", () => {
            // arrange
            let isReserved;
            let errorOccurred = false;

            // act
            try {
                Card.validateIsReserved(isReserved);
            } catch (e) {
                errorOccurred = true;
            }

            // assert
            expect(errorOccurred).to.be.true;
        });

        it("should error if not a boolean", () => {
            // arrange
            let isReserved = "not a boolean";
            let errorOccurred = false;

            // act
            try {
                Card.validateIsReserved(isReserved);
            } catch (e) {
                errorOccurred = true;
            }

            // assert
            expect(errorOccurred).to.be.true;
        });

        it("should validate if true", () => {
            // arrange
            let isReserved = true;
            let errorOccurred = false;

            // act
            try {
                Card.validateIsReserved(isReserved);
            } catch (e) {
                errorOccurred = true;
            }

            // assert
            expect(errorOccurred).to.be.false;
        });

        it("should validate if false", () => {
            // arrange
            let isReserved = false;
            let errorOccurred = false;

            // act
            try {
                Card.validateIsReserved(isReserved);
            } catch (e) {
                errorOccurred = true;
            }

            // assert
            expect(errorOccurred).to.be.false;
        });
    });

    describe("edhrec_rank", () => {
        it("should ignore if empty", () => {
            // arrange
            let edhrecRank;
            let errorOccurred = false;

            // act
            try {
                Card.validateEDHRecRank(edhrecRank);
            } catch (e) {
                errorOccurred = true;
            }

            // assert
            expect(errorOccurred).to.be.false;
        });

        it("should error if not a number", () => {
            // arrange
            let edhrecRank = "not a number";
            let errorOccurred = false;

            // act
            try {
                Card.validateEDHRecRank(edhrecRank);
            } catch (e) {
                errorOccurred = true;
            }

            // assert
            expect(errorOccurred).to.be.true;
        });

        it("should allow a number value", () => {
            // arrange
            let edhrecRank = 1000;
            let errorOccurred = false;

            // act
            try {
                Card.validateEDHRecRank(edhrecRank);
            } catch (e) {
                errorOccurred = true;
            }

            // assert
            expect(errorOccurred).to.be.false;
        });
    });

    describe("set_code", () => {
        it("should validate set_code with validation from Set", () => {
            // arrange
            let setCode = "ust";
            let errorOccurred = false;
            let validateSetCodeStub = sandbox.stub(Set, "validateSetCode");

            // act
            try {
                Card.validateSetCode(setCode);
            } catch (e) {
                errorOccurred = true;
            }

            // assert
            expect(errorOccurred).to.be.false;
            expect(validateSetCodeStub.called).to.be.true;

            // cleanup
            validateSetCodeStub.restore();
        });

        it("should rethrow error from set_code validation from Set", () => {
            // arrange
            let setCode = "ust";
            let errorOccurred = false;
            let validateSetCodeStub = sandbox.stub(Set, "validateSetCode").callsFake(() => {
                throw new Error("set_code error from Set");
            });

            // act
            try {
                Card.validateSetCode(setCode);
            } catch (e) {
                errorOccurred = true;
            }

            // assert
            expect(errorOccurred).to.be.true;
            expect(validateSetCodeStub.called).to.be.true;

            // cleanup
            validateSetCodeStub.restore();
        });
    });

    describe("set_name", () => {
        it("should validate set_name with validation from Set", () => {
            // arrange
            let setName = "Unstable";
            let errorOccurred = false;
            let validateSetNameStub = sandbox.stub(Set, "validateSetName");

            // act
            try {
                Card.validateSetName(setName);
            } catch (e) {
                errorOccurred = true;
            }

            // assert
            expect(errorOccurred).to.be.false;
            expect(validateSetNameStub.called).to.be.true;

            // cleanup
            validateSetNameStub.restore();
        });

        it("should rethrow error from set_name validation from Set", () => {
            // arrange
            let setName = "Unstable";
            let errorOccurred = false;
            let validateSetNameStub = sandbox.stub(Set, "validateSetName").callsFake(() => {
                throw new Error("set_name error from Set");
            });

            // act
            try {
                Card.validateSetName(setName);
            } catch (e) {
                errorOccurred = true;
            }

            // assert
            expect(errorOccurred).to.be.true;
            expect(validateSetNameStub.called).to.be.true;

            // cleanup
            validateSetNameStub.restore();
        });
    });

    describe("collector_number", () => {
        it("should error if collector_number is missing", () => {
            // arrange
            let collectorNumber;
            let errorOccurred = false;

            // act
            try {
                Card.validateCollectorNumber(collectorNumber);
            } catch (e) {
                errorOccurred = true;
            }

            // assert
            expect(errorOccurred).to.be.true;
        });

        it("should error if collector_number is empty", () => {
            // arrange
            let collectorNumber = "";
            let errorOccurred = false;

            // act
            try {
                Card.validateCollectorNumber(collectorNumber);
            } catch (e) {
                errorOccurred = true;
            }

            // assert
            expect(errorOccurred).to.be.true;
        });

        it("should error if collection_number is non-alphanumeric", () => {
            // arrange
            let collectorNumber = "5a?";
            let errorOccurred = false;

            // act
            try {
                Card.validateCollectorNumber(collectorNumber);
            } catch (e) {
                errorOccurred = true;
            }

            // assert
            expect(errorOccurred).to.be.true;
        });

        it("should allow alphanumeric collector number", () => {
            // arrange
            let collectorNumber = "5a";
            let errorOccurred = false;

            // act
            try {
                Card.validateCollectorNumber(collectorNumber);
            } catch (e) {
                errorOccurred = true;
            }

            // assert
            expect(errorOccurred).to.be.false;
        });
    });

    describe("image_uri", () => {
        it("should error on missing image_uri", () => {
            // arrange
            let imageUri;
            let errorOccurred = false;

            // act
            try {
                Card.validateImageUri(imageUri);
            } catch (e) {
                errorOccurred = true;
            }

            // assert
            expect(errorOccurred).to.be.true;
        });

        it("should invalidate an empty image_uri", () => {
            // arrange
            let imageUri = "";
            let errorOccurred = false;

            // act
            try {
                Card.validateImageUri(imageUri);
            } catch (e) {
                errorOccurred = true;
            }

            // assert
            expect(errorOccurred).to.be.true;
        });

        it("should invalidate a bad image_uri", () => {
            // arrange
            let imageUri = "http://test";
            let errorOccurred = false;

            // act
            try {
                Card.validateImageUri(imageUri);
            } catch (e) {
                errorOccurred = true;
            }

            // assert
            expect(errorOccurred).to.be.true;
        });

        it("should invalidate a non-png image_uri", () => {
            // arrange
            let imageUri = "http://example.com/icon.jpg";
            let errorOccurred = false;

            // act
            try {
                Card.validateImageUri(imageUri);
            } catch (e) {
                errorOccurred = true;
            }

            // assert
            expect(errorOccurred).to.be.true;
        });

        it("should validate a image_uri as hosted png", () => {
            // arrange
            let imageUri = "http://example.com/image.png";
            let errorOccurred = false;

            // act
            try {
                Card.validateImageUri(imageUri);
            } catch (e) {
                errorOccurred = true;
            }

            // assert
            expect(errorOccurred).to.be.false;
        });
    });

    describe("is_reprint", () => {
        it("is required", () => {
            // arrange
            let isReprint;
            let errorOccurred = false;

            // act
            try {
                Card.validateIsReprint(isReprint);
            } catch (e) {
                errorOccurred = true;
            }

            // assert
            expect(errorOccurred).to.be.true;
        });

        it("should error if not a boolean", () => {
            // arrange
            let isReprint = "not a boolean";
            let errorOccurred = false;

            // act
            try {
                Card.validateIsReprint(isReprint);
            } catch (e) {
                errorOccurred = true;
            }

            // assert
            expect(errorOccurred).to.be.true;
        });

        it("should validate if true", () => {
            // arrange
            let isReprint = true;
            let errorOccurred = false;

            // act
            try {
                Card.validateIsReprint(isReprint);
            } catch (e) {
                errorOccurred = true;
            }

            // assert
            expect(errorOccurred).to.be.false;
        });

        it("should validate if false", () => {
            // arrange
            let isReprint = false;
            let errorOccurred = false;

            // act
            try {
                Card.validateIsReprint(isReprint);
            } catch (e) {
                errorOccurred = true;
            }

            // assert
            expect(errorOccurred).to.be.false;
        });
    });

    describe("is_digital", () => {
        it("should validate is_digital with validation from Set", () => {
            // arrange
            let isDigital = false;
            let errorOccurred = false;
            let validateIsDigitalStub = sandbox.stub(Set, "validateIsDigital");

            // act
            try {
                Card.validateIsDigital(isDigital);
            } catch (e) {
                errorOccurred = true;
            }

            // assert
            expect(errorOccurred).to.be.false;
            expect(validateIsDigitalStub.called).to.be.true;

            // cleanup
            validateIsDigitalStub.restore();
        });

        it("should rethrow error from is_digital validation from Set", () => {
            // arrange
            let isDigital = false;
            let errorOccurred = false;
            let validateIsDigitalStub = sandbox.stub(Set, "validateIsDigital").callsFake(() => {
                throw new Error("is_digital error from Set");
            });

            // act
            try {
                Card.validateIsDigital(isDigital);
            } catch (e) {
                errorOccurred = true;
            }

            // assert
            expect(errorOccurred).to.be.true;
            expect(validateIsDigitalStub.called).to.be.true;

            // cleanup
            validateIsDigitalStub.restore();
        });
    });

    describe("rarity", () => {
        it("should error if missing", () => {
            // arrange
            let rarity;
            let errorOccurred = false;

            // act
            try {
                Card.validateRarity(rarity);
            } catch (e) {
                errorOccurred = true;
            }

            // assert
            expect(errorOccurred).to.be.true;
        });

        it("should error if empty", () => {
            // arrange
            let rarity = "";
            let errorOccurred = false;

            // act
            try {
                Card.validateRarity(rarity);
            } catch (e) {
                errorOccurred = true;
            }

            // assert
            expect(errorOccurred).to.be.true;
        });

        it("should error if not a predefined value", () => {
            // arrange
            let rarity = "super duper rare";
            let errorOccurred = false;

            // act
            try {
                Card.validateRarity(rarity);
            } catch (e) {
                errorOccurred = true;
            }

            // assert
            expect(errorOccurred).to.be.true;
        });

        it("should allow a rarity of common", () => {
            // arrange
            let rarity = Rarities.Common;
            let errorOccurred = false;

            // act
            try {
                Card.validateRarity(rarity);
            } catch (e) {
                errorOccurred = true;
            }

            // assert
            expect(errorOccurred).to.be.false;
        });

        it("should allow a rarity of uncommon", () => {
            // arrange
            let rarity = Rarities.Uncommon;
            let errorOccurred = false;

            // act
            try {
                Card.validateRarity(rarity);
            } catch (e) {
                errorOccurred = true;
            }

            // assert
            expect(errorOccurred).to.be.false;
        });

        it("should allow a rarity of rare", () => {
            // arrange
            let rarity = Rarities.Rare;
            let errorOccurred = false;

            // act
            try {
                Card.validateRarity(rarity);
            } catch (e) {
                errorOccurred = true;
            }

            // assert
            expect(errorOccurred).to.be.false;
        });

        it("should allow a rarity of mythic", () => {
            // arrange
            let rarity = Rarities.Mythic;
            let errorOccurred = false;

            // act
            try {
                Card.validateRarity(rarity);
            } catch (e) {
                errorOccurred = true;
            }

            // assert
            expect(errorOccurred).to.be.false;
        });
    });

    describe("flavor_text", () => {
        it("should ignore if missing", () => {
            // arrange
            let flavorText;
            let errorOccurred = false;

            // act
            try {
                Card.validateFlavorText(flavorText);
            } catch (e) {
                errorOccurred = true;
            }

            // assert
            expect(errorOccurred).to.be.false;
        });

        it("should error if empty", () => {
            // arrange
            let flavorText = "";
            let errorOccurred = false;

            // act
            try {
                Card.validateFlavorText(flavorText);
            } catch (e) {
                errorOccurred = true;
            }

            // assert
            expect(errorOccurred).to.be.true;
        });

        it("should allow generic non-empty string", () => {
            // arrange
            let flavorText = "'People's thoughts just come to me. Sometimes I don't know if it's them or me thinking.'";
            let errorOccurred = false;

            // act
            try {
                Card.validateFlavorText(flavorText);
            } catch (e) {
                errorOccurred = true;
            }

            // assert
            expect(errorOccurred).to.be.false;
        });
    });

    describe("artist", () => {
        it("is requred", () => {
            // arrange
            let artist;
            let errorOccurred = false;

            // act
            try {
                Card.validateArtist(artist);
            } catch (e) {
                errorOccurred = true;
            }

            // assert
            expect(errorOccurred).to.be.true;
        });

        it("should error if empty", () => {
            // arrange
            let artist = "";
            let errorOccurred = false;

            // act
            try {
                Card.validateArtist(artist);
            } catch (e) {
                errorOccurred = true;
            }

            // assert
            expect(errorOccurred).to.be.true;
        });

        it("should allow generic non-empty string", () => {
            // arrange
            let artist = "Kieran Yanner";
            let errorOccurred = false;

            // act
            try {
                Card.validateArtist(artist);
            } catch (e) {
                errorOccurred = true;
            }

            // assert
            expect(errorOccurred).to.be.false;
        });
    });

    describe("frame", () => {
        it("should error if missing", () => {
            // arrange
            let frame;
            let errorOccurred = false;

            // act
            try {
                Card.validateFrame(frame);
            } catch (e) {
                errorOccurred = true;
            }

            // assert
            expect(errorOccurred).to.be.true;
        });

        it("should error if empty", () => {
            // arrange
            let frame = "";
            let errorOccurred = false;

            // act
            try {
                Card.validateFrame(frame);
            } catch (e) {
                errorOccurred = true;
            }

            // assert
            expect(errorOccurred).to.be.true;
        });

        it("should error if not a pre-defined value", () => {
            // arrange
            let frame = "super old frame";
            let errorOccurred = false;

            // act
            try {
                Card.validateFrame(frame);
            } catch (e) {
                errorOccurred = true;
            }

            // assert
            expect(errorOccurred).to.be.true;
        });

        it("should allow a value of 1993", () => {
            // arrange
            let frame = Frames.NineteenNinetyThree;
            let errorOccurred = false;

            // act
            try {
                Card.validateFrame(frame);
            } catch (e) {
                errorOccurred = true;
            }

            // assert
            expect(errorOccurred).to.be.false;
        });

        it("should allow a value of 1997", () => {
            // arrange
            let frame = Frames.NineteenNinetySeven;
            let errorOccurred = false;

            // act
            try {
                Card.validateFrame(frame);
            } catch (e) {
                errorOccurred = true;
            }

            // assert
            expect(errorOccurred).to.be.false;
        });

        it("should allow a value of 2003", () => {
            // arrange
            let frame = Frames.TwoThousandThree;
            let errorOccurred = false;

            // act
            try {
                Card.validateFrame(frame);
            } catch (e) {
                errorOccurred = true;
            }

            // assert
            expect(errorOccurred).to.be.false;
        });

        it("should allow a value of 2015", () => {
            // arrange
            let frame = Frames.TwoThousandFifteen;
            let errorOccurred = false;

            // act
            try {
                Card.validateFrame(frame);
            } catch (e) {
                errorOccurred = true;
            }

            // assert
            expect(errorOccurred).to.be.false;
        });

        it("should allow a value of future", () => {
            // arrange
            let frame = Frames.Future;
            let errorOccurred = false;

            // act
            try {
                Card.validateFrame(frame);
            } catch (e) {
                errorOccurred = true;
            }

            // assert
            expect(errorOccurred).to.be.false;
        });
    });

    describe("is_full_art", () => {
        it("is required", () => {
            // arrange
            let isFullArt;
            let errorOccurred = false;

            // act
            try {
                Card.validateIsFullArt(isFullArt);
            } catch (e) {
                errorOccurred = true;
            }

            // assert
            expect(errorOccurred).to.be.true;
        });

        it("should error if not a boolean", () => {
            // arrange
            let isFullArt = "not a boolean";
            let errorOccurred = false;

            // act
            try {
                Card.validateIsFullArt(isFullArt);
            } catch (e) {
                errorOccurred = true;
            }

            // assert
            expect(errorOccurred).to.be.true;
        });

        it("should validate if true", () => {
            // arrange
            let isFullArt = true;
            let errorOccurred = false;

            // act
            try {
                Card.validateIsFullArt(isFullArt);
            } catch (e) {
                errorOccurred = true;
            }

            // assert
            expect(errorOccurred).to.be.false;
        });

        it("should validate if false", () => {
            // arrange
            let isFullArt = false;
            let errorOccurred = false;

            // act
            try {
                Card.validateIsFullArt(isFullArt);
            } catch (e) {
                errorOccurred = true;
            }

            // assert
            expect(errorOccurred).to.be.false;
        });
    });

    describe("watermark", () => {
        it("should ignore if missing", () => {
            // arrange
            let watermark;
            let errorOccurred = false;

            // act
            try {
                Card.validateWatermark(watermark);
            } catch (e) {
                errorOccurred = true;
            }

            // assert
            expect(errorOccurred).to.be.false;
        });

        it("should error if empty", () => {
            // arrange
            let watermark = "";
            let errorOccurred = false;

            // act
            try {
                Card.validateWatermark(watermark);
            } catch (e) {
                errorOccurred = true;
            }

            // assert
            expect(errorOccurred).to.be.true;
        });

        it("should error if not a pre-defined value", () => {
            // arrange
            let watermark = "not pre-defined value";
            let errorOccurred = false;

            // act
            try {
                Card.validateWatermark(watermark);
            } catch (e) {
                errorOccurred = true;
            }

            // assert
            expect(errorOccurred).to.be.true;
        });

        it("should allow a value of abzan", () => {
            // arrange
            let watermark = Watermarks.Abzan;
            let errorOccurred = false;

            // act
            try {
                Card.validateWatermark(watermark);
            } catch (e) {
                errorOccurred = true;
            }

            // assert
            expect(errorOccurred).to.be.false;
        });

        it("should allow a value of agentsofsneak", () => {
            // arrange
            let watermark = Watermarks.AgentsOfSneak;
            let errorOccurred = false;

            // act
            try {
                Card.validateWatermark(watermark);
            } catch (e) {
                errorOccurred = true;
            }

            // assert
            expect(errorOccurred).to.be.false;
        });

        it("should allow a value of arena", () => {
            // arrange
            let watermark = Watermarks.Arena;
            let errorOccurred = false;

            // act
            try {
                Card.validateWatermark(watermark);
            } catch (e) {
                errorOccurred = true;
            }

            // assert
            expect(errorOccurred).to.be.false;
        });

        it("should allow a value of atarka", () => {
            // arrange
            let watermark = Watermarks.Atarka;
            let errorOccurred = false;

            // act
            try {
                Card.validateWatermark(watermark);
            } catch (e) {
                errorOccurred = true;
            }

            // assert
            expect(errorOccurred).to.be.false;
        });

        it("should allow a value of azorius", () => {
            // arrange
            let watermark = Watermarks.Azorius;
            let errorOccurred = false;

            // act
            try {
                Card.validateWatermark(watermark);
            } catch (e) {
                errorOccurred = true;
            }

            // assert
            expect(errorOccurred).to.be.false;
        });

        it("should allow a value of boros", () => {
            // arrange
            let watermark = Watermarks.Boros;
            let errorOccurred = false;

            // act
            try {
                Card.validateWatermark(watermark);
            } catch (e) {
                errorOccurred = true;
            }

            // assert
            expect(errorOccurred).to.be.false;
        });

        it("should allow a value of colorpie", () => {
            // arrange
            let watermark = Watermarks.ColorPie;
            let errorOccurred = false;

            // act
            try {
                Card.validateWatermark(watermark);
            } catch (e) {
                errorOccurred = true;
            }

            // assert
            expect(errorOccurred).to.be.false;
        });

        it("should allow a value of conspiracy", () => {
            // arrange
            let watermark = Watermarks.Conspiracy;
            let errorOccurred = false;

            // act
            try {
                Card.validateWatermark(watermark);
            } catch (e) {
                errorOccurred = true;
            }

            // assert
            expect(errorOccurred).to.be.false;
        });

        it("should allow a value of crossbreedlabs", () => {
            // arrange
            let watermark = Watermarks.CrossbreedLabs;
            let errorOccurred = false;

            // act
            try {
                Card.validateWatermark(watermark);
            } catch (e) {
                errorOccurred = true;
            }

            // assert
            expect(errorOccurred).to.be.false;
        });

        it("should allow a value of dci", () => {
            // arrange
            let watermark = Watermarks.DCI;
            let errorOccurred = false;

            // act
            try {
                Card.validateWatermark(watermark);
            } catch (e) {
                errorOccurred = true;
            }

            // assert
            expect(errorOccurred).to.be.false;
        });

        it("should allow a value of d&d", () => {
            // arrange
            let watermark = Watermarks.DAndD;
            let errorOccurred = false;

            // act
            try {
                Card.validateWatermark(watermark);
            } catch (e) {
                errorOccurred = true;
            }

            // assert
            expect(errorOccurred).to.be.false;
        });

        it("should allow a value of dimir", () => {
            // arrange
            let watermark = Watermarks.Dimir;
            let errorOccurred = false;

            // act
            try {
                Card.validateWatermark(watermark);
            } catch (e) {
                errorOccurred = true;
            }

            // assert
            expect(errorOccurred).to.be.false;
        });

        it("should allow a value of dromoka", () => {
            // arrange
            let watermark = Watermarks.Dromoka;
            let errorOccurred = false;

            // act
            try {
                Card.validateWatermark(watermark);
            } catch (e) {
                errorOccurred = true;
            }

            // assert
            expect(errorOccurred).to.be.false;
        });

        it("should allow a value of fnm", () => {
            // arrange
            let watermark = Watermarks.FNM;
            let errorOccurred = false;

            // act
            try {
                Card.validateWatermark(watermark);
            } catch (e) {
                errorOccurred = true;
            }

            // assert
            expect(errorOccurred).to.be.false;
        });

        it("should allow a value of goblinexplosioneers", () => {
            // arrange
            let watermark = Watermarks.GoblinExplosioneers;
            let errorOccurred = false;

            // act
            try {
                Card.validateWatermark(watermark);
            } catch (e) {
                errorOccurred = true;
            }

            // assert
            expect(errorOccurred).to.be.false;
        });

        it("should allow a value of golgari", () => {
            // arrange
            let watermark = Watermarks.Golgari;
            let errorOccurred = false;

            // act
            try {
                Card.validateWatermark(watermark);
            } catch (e) {
                errorOccurred = true;
            }

            // assert
            expect(errorOccurred).to.be.false;
        });

        it("should allow a value of grandprix", () => {
            // arrange
            let watermark = Watermarks.GrandPrix;
            let errorOccurred = false;

            // act
            try {
                Card.validateWatermark(watermark);
            } catch (e) {
                errorOccurred = true;
            }

            // assert
            expect(errorOccurred).to.be.false;
        });

        it("should allow a value of gruul", () => {
            // arrange
            let watermark = Watermarks.Gruul;
            let errorOccurred = false;

            // act
            try {
                Card.validateWatermark(watermark);
            } catch (e) {
                errorOccurred = true;
            }

            // assert
            expect(errorOccurred).to.be.false;
        });

        it("should allow a value of izzet", () => {
            // arrange
            let watermark = Watermarks.Izzet;
            let errorOccurred = false;

            // act
            try {
                Card.validateWatermark(watermark);
            } catch (e) {
                errorOccurred = true;
            }

            // assert
            expect(errorOccurred).to.be.false;
        });

        it("should allow a value of jeskai", () => {
            // arrange
            let watermark = Watermarks.Jeskai;
            let errorOccurred = false;

            // act
            try {
                Card.validateWatermark(watermark);
            } catch (e) {
                errorOccurred = true;
            }

            // assert
            expect(errorOccurred).to.be.false;
        });

        it("should allow a value of junior", () => {
            // arrange
            let watermark = Watermarks.Junior;
            let errorOccurred = false;

            // act
            try {
                Card.validateWatermark(watermark);
            } catch (e) {
                errorOccurred = true;
            }

            // assert
            expect(errorOccurred).to.be.false;
        });

        it("should allow a value of juniorapac", () => {
            // arrange
            let watermark = Watermarks.JuniorAPAC;
            let errorOccurred = false;

            // act
            try {
                Card.validateWatermark(watermark);
            } catch (e) {
                errorOccurred = true;
            }

            // assert
            expect(errorOccurred).to.be.false;
        });

        it("should allow a value of junioreurope", () => {
            // arrange
            let watermark = Watermarks.JuniorEurope;
            let errorOccurred = false;

            // act
            try {
                Card.validateWatermark(watermark);
            } catch (e) {
                errorOccurred = true;
            }

            // assert
            expect(errorOccurred).to.be.false;
        });

        it("should allow a value of kolaghan", () => {
            // arrange
            let watermark = Watermarks.Kolaghan;
            let errorOccurred = false;

            // act
            try {
                Card.validateWatermark(watermark);
            } catch (e) {
                errorOccurred = true;
            }

            // assert
            expect(errorOccurred).to.be.false;
        });

        it("should allow a value of leagueofdastardlydoom", () => {
            // arrange
            let watermark = Watermarks.LeagueOfDastardlyDoom;
            let errorOccurred = false;

            // act
            try {
                Card.validateWatermark(watermark);
            } catch (e) {
                errorOccurred = true;
            }

            // assert
            expect(errorOccurred).to.be.false;
        });

        it("should allow a value of mardu", () => {
            // arrange
            let watermark = Watermarks.Mardu;
            let errorOccurred = false;

            // act
            try {
                Card.validateWatermark(watermark);
            } catch (e) {
                errorOccurred = true;
            }

            // assert
            expect(errorOccurred).to.be.false;
        });

        it("should allow a value of mirran", () => {
            // arrange
            let watermark = Watermarks.Mirran;
            let errorOccurred = false;

            // act
            try {
                Card.validateWatermark(watermark);
            } catch (e) {
                errorOccurred = true;
            }

            // assert
            expect(errorOccurred).to.be.false;
        });

        it("should allow a value of mps", () => {
            // arrange
            let watermark = Watermarks.MPS;
            let errorOccurred = false;

            // act
            try {
                Card.validateWatermark(watermark);
            } catch (e) {
                errorOccurred = true;
            }

            // assert
            expect(errorOccurred).to.be.false;
        });

        it("should allow a value of mtg", () => {
            // arrange
            let watermark = Watermarks.MTG;
            let errorOccurred = false;

            // act
            try {
                Card.validateWatermark(watermark);
            } catch (e) {
                errorOccurred = true;
            }

            // assert
            expect(errorOccurred).to.be.false;
        });

        it("should allow a value of mtg10", () => {
            // arrange
            let watermark = Watermarks.MTGTen;
            let errorOccurred = false;

            // act
            try {
                Card.validateWatermark(watermark);
            } catch (e) {
                errorOccurred = true;
            }

            // assert
            expect(errorOccurred).to.be.false;
        });

        it("should allow a value of mtg15", () => {
            // arrange
            let watermark = Watermarks.MTGFifteen;
            let errorOccurred = false;

            // act
            try {
                Card.validateWatermark(watermark);
            } catch (e) {
                errorOccurred = true;
            }

            // assert
            expect(errorOccurred).to.be.false;
        });

        it("should allow a value of nerf", () => {
            // arrange
            let watermark = Watermarks.Nerf;
            let errorOccurred = false;

            // act
            try {
                Card.validateWatermark(watermark);
            } catch (e) {
                errorOccurred = true;
            }

            // assert
            expect(errorOccurred).to.be.false;
        });

        it("should allow a value of ojutai", () => {
            // arrange
            let watermark = Watermarks.Ojutai;
            let errorOccurred = false;

            // act
            try {
                Card.validateWatermark(watermark);
            } catch (e) {
                errorOccurred = true;
            }

            // assert
            expect(errorOccurred).to.be.false;
        });

        it("should allow a value of orderofthewidget", () => {
            // arrange
            let watermark = Watermarks.OrderOfTheWidget;
            let errorOccurred = false;

            // act
            try {
                Card.validateWatermark(watermark);
            } catch (e) {
                errorOccurred = true;
            }

            // assert
            expect(errorOccurred).to.be.false;
        });

        it("should allow a value of orzhov", () => {
            // arrange
            let watermark = Watermarks.Orzhov;
            let errorOccurred = false;

            // act
            try {
                Card.validateWatermark(watermark);
            } catch (e) {
                errorOccurred = true;
            }

            // assert
            expect(errorOccurred).to.be.false;
        });

        it("should allow a value of phyrexian", () => {
            // arrange
            let watermark = Watermarks.Phyrexian;
            let errorOccurred = false;

            // act
            try {
                Card.validateWatermark(watermark);
            } catch (e) {
                errorOccurred = true;
            }

            // assert
            expect(errorOccurred).to.be.false;
        });

        it("should allow a value of planeswalker", () => {
            // arrange
            let watermark = Watermarks.Planeswalker;
            let errorOccurred = false;

            // act
            try {
                Card.validateWatermark(watermark);
            } catch (e) {
                errorOccurred = true;
            }

            // assert
            expect(errorOccurred).to.be.false;
        });

        it("should allow a value of protour", () => {
            // arrange
            let watermark = Watermarks.ProTour;
            let errorOccurred = false;

            // act
            try {
                Card.validateWatermark(watermark);
            } catch (e) {
                errorOccurred = true;
            }

            // assert
            expect(errorOccurred).to.be.false;
        });

        it("should allow a value of rakdos", () => {
            // arrange
            let watermark = Watermarks.Rakdos;
            let errorOccurred = false;

            // act
            try {
                Card.validateWatermark(watermark);
            } catch (e) {
                errorOccurred = true;
            }

            // assert
            expect(errorOccurred).to.be.false;
        });

        it("should allow a value of scholarship", () => {
            // arrange
            let watermark = Watermarks.Scholarship;
            let errorOccurred = false;

            // act
            try {
                Card.validateWatermark(watermark);
            } catch (e) {
                errorOccurred = true;
            }

            // assert
            expect(errorOccurred).to.be.false;
        });

        it("should allow a value of selesnya", () => {
            // arrange
            let watermark = Watermarks.Selesnya;
            let errorOccurred = false;

            // act
            try {
                Card.validateWatermark(watermark);
            } catch (e) {
                errorOccurred = true;
            }

            // assert
            expect(errorOccurred).to.be.false;
        });

        it("should allow a value of set", () => {
            // arrange
            let watermark = Watermarks.Set;
            let errorOccurred = false;

            // act
            try {
                Card.validateWatermark(watermark);
            } catch (e) {
                errorOccurred = true;
            }

            // assert
            expect(errorOccurred).to.be.false;
        });

        it("should allow a value of silumgar", () => {
            // arrange
            let watermark = Watermarks.Silumgar;
            let errorOccurred = false;

            // act
            try {
                Card.validateWatermark(watermark);
            } catch (e) {
                errorOccurred = true;
            }

            // assert
            expect(errorOccurred).to.be.false;
        });

        it("should allow a value of simic", () => {
            // arrange
            let watermark = Watermarks.Simic;
            let errorOccurred = false;

            // act
            try {
                Card.validateWatermark(watermark);
            } catch (e) {
                errorOccurred = true;
            }

            // assert
            expect(errorOccurred).to.be.false;
        });

        it("should allow a value of sultai", () => {
            // arrange
            let watermark = Watermarks.Sultai;
            let errorOccurred = false;

            // act
            try {
                Card.validateWatermark(watermark);
            } catch (e) {
                errorOccurred = true;
            }

            // assert
            expect(errorOccurred).to.be.false;
        });

        it("should allow a value of temur", () => {
            // arrange
            let watermark = Watermarks.Temur;
            let errorOccurred = false;

            // act
            try {
                Card.validateWatermark(watermark);
            } catch (e) {
                errorOccurred = true;
            }

            // assert
            expect(errorOccurred).to.be.false;
        });

        it("should allow a value of transformers", () => {
            // arrange
            let watermark = Watermarks.Transformers;
            let errorOccurred = false;

            // act
            try {
                Card.validateWatermark(watermark);
            } catch (e) {
                errorOccurred = true;
            }

            // assert
            expect(errorOccurred).to.be.false;
        });

        it("should allow a value of wotc", () => {
            // arrange
            let watermark = Watermarks.WotC;
            let errorOccurred = false;

            // act
            try {
                Card.validateWatermark(watermark);
            } catch (e) {
                errorOccurred = true;
            }

            // assert
            expect(errorOccurred).to.be.false;
        });

        it("should allow a value of wpn", () => {
            // arrange
            let watermark = Watermarks.WPN;
            let errorOccurred = false;

            // act
            try {
                Card.validateWatermark(watermark);
            } catch (e) {
                errorOccurred = true;
            }

            // assert
            expect(errorOccurred).to.be.false;
        });
    });

    describe("border_color", () => {
        it("should error if missing", () => {
            // arrange
            let borderColor;
            let errorOccurred = false;

            // act
            try {
                Card.validateBorderColor(borderColor);
            } catch (e) {
                errorOccurred = true;
            }

            // assert
            expect(errorOccurred).to.be.true;
        });

        it("should error if empty", () => {
            // arrange
            let borderColor = "";
            let errorOccurred = false;

            // act
            try {
                Card.validateBorderColor(borderColor);
            } catch (e) {
                errorOccurred = true;
            }

            // assert
            expect(errorOccurred).to.be.true;
        });

        it("should error if not a pre-defined value", () => {
            // arrange
            let borderColor = "not pre-defined value";
            let errorOccurred = false;

            // act
            try {
                Card.validateBorderColor(borderColor);
            } catch (e) {
                errorOccurred = true;
            }

            // assert
            expect(errorOccurred).to.be.true;
        });

        it("should allow a value of black", () => {
            // arrange
            let borderColor = BorderColors.Black;
            let errorOccurred = false;

            // act
            try {
                Card.validateBorderColor(borderColor);
            } catch (e) {
                errorOccurred = true;
            }

            // assert
            expect(errorOccurred).to.be.false;
        });

        it("should allow a value of borderless", () => {
            // arrange
            let borderColor = BorderColors.Borderless;
            let errorOccurred = false;

            // act
            try {
                Card.validateBorderColor(borderColor);
            } catch (e) {
                errorOccurred = true;
            }

            // assert
            expect(errorOccurred).to.be.false;
        });

        it("should allow a value of gold", () => {
            // arrange
            let borderColor = BorderColors.Gold;
            let errorOccurred = false;

            // act
            try {
                Card.validateBorderColor(borderColor);
            } catch (e) {
                errorOccurred = true;
            }

            // assert
            expect(errorOccurred).to.be.false;
        });

        it("should allow a value of silver", () => {
            // arrange
            let borderColor = BorderColors.Silver;
            let errorOccurred = false;

            // act
            try {
                Card.validateBorderColor(borderColor);
            } catch (e) {
                errorOccurred = true;
            }

            // assert
            expect(errorOccurred).to.be.false;
        });

        it("should allow a value of white", () => {
            // arrange
            let borderColor = BorderColors.White;
            let errorOccurred = false;

            // act
            try {
                Card.validateBorderColor(borderColor);
            } catch (e) {
                errorOccurred = true;
            }

            // assert
            expect(errorOccurred).to.be.false;
        });
    });

    describe("story_spotlight_number", () => {
        it("should ignore if missing", () => {
            // arrange
            let storySpotlightNumber;
            let errorOccurred = false;

            // act
            try {
                Card.validateStorySpotlightNumber(storySpotlightNumber);
            } catch (e) {
                errorOccurred = true;
            }

            // assert
            expect(errorOccurred).to.be.false;
        });

        it("should error if not a number", () => {
            // arrange
            let storySpotlightNumber = "not a number";
            let errorOccurred = false;

            // act
            try {
                Card.validateStorySpotlightNumber(storySpotlightNumber);
            } catch (e) {
                errorOccurred = true;
            }

            // assert
            expect(errorOccurred).to.be.true;
        });

        it("should allow a number", () => {
            // arrange
            let storySpotlightNumber = 1;
            let errorOccurred = false;

            // act
            try {
                Card.validateStorySpotlightNumber(storySpotlightNumber);
            } catch (e) {
                errorOccurred = true;
            }

            // assert
            expect(errorOccurred).to.be.false;
        });
    });

    describe("story_spotlight_uri", () => {
        it("should ignore if missing", () => {
            // arrange
            let storySpotlightUri;
            let errorOccurred = false;

            // act
            try {
                Card.validateStorySpotlightUri(storySpotlightUri);
            } catch (e) {
                errorOccurred = true;
            }

            // assert
            expect(errorOccurred).to.be.false;
        });

        it("should error if empty", () => {
            // arrange
            let storySpotlightUri = "";
            let errorOccurred = false;

            // act
            try {
                Card.validateStorySpotlightUri(storySpotlightUri);
            } catch (e) {
                errorOccurred = true;
            }

            // assert
            expect(errorOccurred).to.be.true;
        });

        it("should invalidate a bad uri", () => {
            // arrange
            let storySpotlightUri = "not a valid uri";
            let errorOccurred = false;

            // act
            try {
                Card.validateStorySpotlightUri(storySpotlightUri);
            } catch (e) {
                errorOccurred = true;
            }

            // assert
            expect(errorOccurred).to.be.true;
        });

        it("should allow a valid uri", () => {
            // arrange
            let storySpotlightUri = "http://magic.wizards.com/en/articles/archive/magic-story/brazen-2017-05-03";
            let errorOccurred = false;

            // act
            try {
                Card.validateStorySpotlightUri(storySpotlightUri);
            } catch (e) {
                errorOccurred = true;
            }

            // assert
            expect(errorOccurred).to.be.false;
        });
    });

    describe("is_timeshifted", () => {
        it("is required", () => {
            // arrange
            let isTimeshifted;
            let errorOccurred = false;

            // act
            try {
                Card.validateIsTimeshifted(isTimeshifted);
            } catch (e) {
                errorOccurred = true;
            }

            // assert
            expect(errorOccurred).to.be.true;
        });

        it("should error if not a boolean", () => {
            // arrange
            let isTimeshifted = "not a boolean";
            let errorOccurred = false;

            // act
            try {
                Card.validateIsTimeshifted(isTimeshifted);
            } catch (e) {
                errorOccurred = true;
            }

            // assert
            expect(errorOccurred).to.be.true;
        });

        it("should validate if true", () => {
            // arrange
            let isTimeshifted = true;
            let errorOccurred = false;

            // act
            try {
                Card.validateIsTimeshifted(isTimeshifted);
            } catch (e) {
                errorOccurred = true;
            }

            // assert
            expect(errorOccurred).to.be.false;
        });

        it("should validate if false", () => {
            // arrange
            let isTimeshifted = false;
            let errorOccurred = false;

            // act
            try {
                Card.validateIsTimeshifted(isTimeshifted);
            } catch (e) {
                errorOccurred = true;
            }

            // assert
            expect(errorOccurred).to.be.false;
        });
    });

    describe("is_colorshifted", () => {
        it("is required", () => {
            // arrange
            let isColorshifted;
            let errorOccurred = false;

            // act
            try {
                Card.validateIsColorshifted(isColorshifted);
            } catch (e) {
                errorOccurred = true;
            }

            // assert
            expect(errorOccurred).to.be.true;
        });

        it("should error if not a boolean", () => {
            // arrange
            let isColorshifted = "not a boolean";
            let errorOccurred = false;

            // act
            try {
                Card.validateIsColorshifted(isColorshifted);
            } catch (e) {
                errorOccurred = true;
            }

            // assert
            expect(errorOccurred).to.be.true;
        });

        it("should validate if true", () => {
            // arrange
            let isColorshifted = true;
            let errorOccurred = false;

            // act
            try {
                Card.validateIsColorshifted(isColorshifted);
            } catch (e) {
                errorOccurred = true;
            }

            // assert
            expect(errorOccurred).to.be.false;
        });

        it("should validate if false", () => {
            // arrange
            let isColorshifted = false;
            let errorOccurred = false;

            // act
            try {
                Card.validateIsColorshifted(isColorshifted);
            } catch (e) {
                errorOccurred = true;
            }

            // assert
            expect(errorOccurred).to.be.false;
        });
    });

    describe("is_futureshifted", () => {
        it("is required", () => {
            // arrange
            let isFutureshifted;
            let errorOccurred = false;

            // act
            try {
                Card.validateIsFutureshifted(isFutureshifted);
            } catch (e) {
                errorOccurred = true;
            }

            // assert
            expect(errorOccurred).to.be.true;
        });

        it("should error if not a boolean", () => {
            // arrange
            let isFutureshifted = "not a boolean";
            let errorOccurred = false;

            // act
            try {
                Card.validateIsFutureshifted(isFutureshifted);
            } catch (e) {
                errorOccurred = true;
            }

            // assert
            expect(errorOccurred).to.be.true;
        });

        it("should validate if true", () => {
            // arrange
            let isFutureshifted = true;
            let errorOccurred = false;

            // act
            try {
                Card.validateIsFutureshifted(isFutureshifted);
            } catch (e) {
                errorOccurred = true;
            }

            // assert
            expect(errorOccurred).to.be.false;
        });

        it("should validate if false", () => {
            // arrange
            let isFutureshifted = false;
            let errorOccurred = false;

            // act
            try {
                Card.validateIsFutureshifted(isFutureshifted);
            } catch (e) {
                errorOccurred = true;
            }

            // assert
            expect(errorOccurred).to.be.false;
        });
    });

    describe("usd_price", () => {
        it("should ignore if empty", () => {
            // arrange
            let usd;
            let errorOccurred = false;

            // act
            try {
                Card.validateUsdPrice(usd);
            } catch (e) {
                errorOccurred = true;
            }

            // assert
            expect(errorOccurred).to.be.false;
        });

        it("should error if not a number", () => {
            // arrange
            let usd = "not a number";
            let errorOccurred = false;

            // act
            try {
                Card.validateUsdPrice(usd);
            } catch (e) {
                errorOccurred = true;
            }

            // assert
            expect(errorOccurred).to.be.true;
        });

        it("should error if a negative number", () => {
            // arrange
            let usd = -1;
            let errorOccurred = false;

            // act
            try {
                Card.validateUsdPrice(usd);
            } catch (e) {
                errorOccurred = true;
            }

            // assert
            expect(errorOccurred).to.be.true;
        });

        it("should allow a positive integer", () => {
            // arrange
            let usd = 1;
            let errorOccurred = false;

            // act
            try {
                Card.validateUsdPrice(usd);
            } catch (e) {
                errorOccurred = true;
            }

            // assert
            expect(errorOccurred).to.be.false;
        });

        it("should allow a positive decimal number", () => {
            // arrange
            let usd = 1.11;
            let errorOccurred = false;

            // act
            try {
                Card.validateUsdPrice(usd);
            } catch (e) {
                errorOccurred = true;
            }

            // assert
            expect(errorOccurred).to.be.false;
        });
    });

    describe("tix_price", () => {
        it("should ignore if empty", () => {
            // arrange
            let tix;
            let errorOccurred = false;

            // act
            try {
                Card.validateTixPrice(tix);
            } catch (e) {
                errorOccurred = true;
            }

            // assert
            expect(errorOccurred).to.be.false;
        });

        it("should error if not a number", () => {
            // arrange
            let tix = "not a number";
            let errorOccurred = false;

            // act
            try {
                Card.validateTixPrice(tix);
            } catch (e) {
                errorOccurred = true;
            }

            // assert
            expect(errorOccurred).to.be.true;
        });

        it("should error if a negative number", () => {
            // arrange
            let tix = -1;
            let errorOccurred = false;

            // act
            try {
                Card.validateTixPrice(tix);
            } catch (e) {
                errorOccurred = true;
            }

            // assert
            expect(errorOccurred).to.be.true;
        });

        it("should allow a positive integer", () => {
            // arrange
            let tix = 1;
            let errorOccurred = false;

            // act
            try {
                Card.validateTixPrice(tix);
            } catch (e) {
                errorOccurred = true;
            }

            // assert
            expect(errorOccurred).to.be.false;
        });

        it("should allow a positive decimal number", () => {
            // arrange
            let tix = 1.11;
            let errorOccurred = false;

            // act
            try {
                Card.validateTixPrice(tix);
            } catch (e) {
                errorOccurred = true;
            }

            // assert
            expect(errorOccurred).to.be.false;
        });
    });

    describe("eur_price", () => {
        it("should ignore if empty", () => {
            // arrange
            let eur;
            let errorOccurred = false;

            // act
            try {
                Card.validateEurPrice(eur);
            } catch (e) {
                errorOccurred = true;
            }

            // assert
            expect(errorOccurred).to.be.false;
        });

        it("should error if not a number", () => {
            // arrange
            let eur = "not a number";
            let errorOccurred = false;

            // act
            try {
                Card.validateEurPrice(eur);
            } catch (e) {
                errorOccurred = true;
            }

            // assert
            expect(errorOccurred).to.be.true;
        });

        it("should error if a negative number", () => {
            // arrange
            let eur = -1;
            let errorOccurred = false;

            // act
            try {
                Card.validateEurPrice(eur);
            } catch (e) {
                errorOccurred = true;
            }

            // assert
            expect(errorOccurred).to.be.true;
        });

        it("should allow a positive integer", () => {
            // arrange
            let eur = 1;
            let errorOccurred = false;

            // act
            try {
                Card.validateEurPrice(eur);
            } catch (e) {
                errorOccurred = true;
            }

            // assert
            expect(errorOccurred).to.be.false;
        });

        it("should allow a positive decimal number", () => {
            // arrange
            let eur = 1.11;
            let errorOccurred = false;

            // act
            try {
                Card.validateEurPrice(eur);
            } catch (e) {
                errorOccurred = true;
            }

            // assert
            expect(errorOccurred).to.be.false;
        });
    });

    describe("related_links", () => {
        it("should ignore if missing", () => {
            // arrange
            let relatedLinks;
            let errorOccurred = false;

            // act
            try {
                Card.validateRelatedLinks(relatedLinks);
            } catch (e) {
                errorOccurred = true;
            }

            // assert
            expect(errorOccurred).to.be.false;
        });

        it("should ignore if gatherer link is missing", () => {
            // arrange
            let relatedLinks = {
                edhrec: "http://edhrec.com/route/?cc=Cruel+Reality",
                mtgtop8: "http://mtgtop8.com/search?MD_check=1&SB_check=1&cards=Cruel+Reality",
                tcgplayer: "http://decks.tcgplayer.com/magic/deck/search?contains=Cruel+Reality&page=1&partner=Scryfall"
            };
            let errorOccurred = false;

            // act
            try {
                Card.validateRelatedLinks(relatedLinks);
            } catch (e) {
                errorOccurred = true;
            }

            // assert
            expect(errorOccurred).to.be.false;
        });

        it("should ignore if tcgplayer link is missing", () => {
            // arrange
            let relatedLinks = {
                edhrec: "http://edhrec.com/route/?cc=Cruel+Reality",
                gatherer: "http://gatherer.wizards.com/Pages/Card/Details.aspx?multiverseid=426786",
                mtgtop8: "http://mtgtop8.com/search?MD_check=1&SB_check=1&cards=Cruel+Reality"
            };
            let errorOccurred = false;

            // act
            try {
                Card.validateRelatedLinks(relatedLinks);
            } catch (e) {
                errorOccurred = true;
            }

            // assert
            expect(errorOccurred).to.be.false;
        });

        it("should ignore if edhrec link is missing", () => {
            // arrange
            let relatedLinks = {
                gatherer: "http://gatherer.wizards.com/Pages/Card/Details.aspx?multiverseid=426786",
                mtgtop8: "http://mtgtop8.com/search?MD_check=1&SB_check=1&cards=Cruel+Reality",
                tcgplayer: "http://decks.tcgplayer.com/magic/deck/search?contains=Cruel+Reality&page=1&partner=Scryfall"
            };
            let errorOccurred = false;

            // act
            try {
                Card.validateRelatedLinks(relatedLinks);
            } catch (e) {
                errorOccurred = true;
            }

            // assert
            expect(errorOccurred).to.be.false;
        });

        it("should ignore if mtgtop8 link is missing", () => {
            // arrange
            let relatedLinks = {
                edhrec: "http://edhrec.com/route/?cc=Cruel+Reality",
                gatherer: "http://gatherer.wizards.com/Pages/Card/Details.aspx?multiverseid=426786",
                tcgplayer: "http://decks.tcgplayer.com/magic/deck/search?contains=Cruel+Reality&page=1&partner=Scryfall"
            };
            let errorOccurred = false;

            // act
            try {
                Card.validateRelatedLinks(relatedLinks);
            } catch (e) {
                errorOccurred = true;
            }

            // assert
            expect(errorOccurred).to.be.false;
        });

        it("should error if gatherer link is empty", () => {
            // arrange
            let relatedLinks = {
                gatherer: ""
            };
            let errorOccurred = false;

            // act
            try {
                Card.validateRelatedLinks(relatedLinks);
            } catch (e) {
                errorOccurred = true;
            }

            // assert
            expect(errorOccurred).to.be.true;
        });

        it("should error if tcgplayer link is empty", () => {
            // arrange
            let relatedLinks = {
                tcgplayer: ""
            };
            let errorOccurred = false;

            // act
            try {
                Card.validateRelatedLinks(relatedLinks);
            } catch (e) {
                errorOccurred = true;
            }

            // assert
            expect(errorOccurred).to.be.true;
        });

        it("should error if edhrec link is empty", () => {
            // arrange
            let relatedLinks = {
                edhrec: ""
            };
            let errorOccurred = false;

            // act
            try {
                Card.validateRelatedLinks(relatedLinks);
            } catch (e) {
                errorOccurred = true;
            }

            // assert
            expect(errorOccurred).to.be.true;
        });

        it("should error if mtgtop8 link is empty", () => {
            // arrange
            let relatedLinks = {
                mtgtop8: ""
            };
            let errorOccurred = false;

            // act
            try {
                Card.validateRelatedLinks(relatedLinks);
            } catch (e) {
                errorOccurred = true;
            }

            // assert
            expect(errorOccurred).to.be.true;
        });

        it("should error if gatherer link is an invalid uri", () => {
            // arrange
            let relatedLinks = {
                gatherer: "not a valid uri"
            };
            let errorOccurred = false;

            // act
            try {
                Card.validateRelatedLinks(relatedLinks);
            } catch (e) {
                errorOccurred = true;
            }

            // assert
            expect(errorOccurred).to.be.true;
        });

        it("should error if tcgplayer link is an invalid uri", () => {
            // arrange
            let relatedLinks = {
                tcgplayer: "not a valid uri"
            };
            let errorOccurred = false;

            // act
            try {
                Card.validateRelatedLinks(relatedLinks);
            } catch (e) {
                errorOccurred = true;
            }

            // assert
            expect(errorOccurred).to.be.true;
        });

        it("should error if edhrec link is an invalid uri", () => {
            // arrange
            let relatedLinks = {
                edhrec: "not a valid uri"
            };
            let errorOccurred = false;

            // act
            try {
                Card.validateRelatedLinks(relatedLinks);
            } catch (e) {
                errorOccurred = true;
            }

            // assert
            expect(errorOccurred).to.be.true;
        });

        it("should error if mtgtop8 link is an invalid uri", () => {
            // arrange
            let relatedLinks = {
                mtgtop8: "not a valid uri"
            };
            let errorOccurred = false;

            // act
            try {
                Card.validateRelatedLinks(relatedLinks);
            } catch (e) {
                errorOccurred = true;
            }

            // assert
            expect(errorOccurred).to.be.true;
        });

        it("should allow a valid gatherer link", () => {
            // arrange
            let relatedLinks = {
                gatherer: "http://gatherer.wizards.com/Pages/Card/Details.aspx?multiverseid=426786"
            };
            let errorOccurred = false;

            // act
            try {
                Card.validateRelatedLinks(relatedLinks);
            } catch (e) {
                errorOccurred = true;
            }

            // assert
            expect(errorOccurred).to.be.false;
        });

        it("should allow a valid tcgplayer link", () => {
            // arrange
            let relatedLinks = {
                tcgplayer: "http://decks.tcgplayer.com/magic/deck/search?contains=Cruel+Reality&page=1&partner=Scryfall"
            };
            let errorOccurred = false;

            // act
            try {
                Card.validateRelatedLinks(relatedLinks);
            } catch (e) {
                errorOccurred = true;
            }

            // assert
            expect(errorOccurred).to.be.false;
        });

        it("should allow a valid edhrec link", () => {
            // arrange
            let relatedLinks = {
                edhrec: "http://edhrec.com/route/?cc=Cruel+Reality"
            };
            let errorOccurred = false;

            // act
            try {
                Card.validateRelatedLinks(relatedLinks);
            } catch (e) {
                errorOccurred = true;
            }

            // assert
            expect(errorOccurred).to.be.false;
        });

        it("should allow a valid mtgtop8 link", () => {
            // arrange
            let relatedLinks = {
                mtgtop8: "http://mtgtop8.com/search?MD_check=1&SB_check=1&cards=Cruel+Reality"
            };
            let errorOccurred = false;

            // act
            try {
                Card.validateRelatedLinks(relatedLinks);
            } catch (e) {
                errorOccurred = true;
            }

            // assert
            expect(errorOccurred).to.be.false;
        });

        it("should allow multiple valid links", () => {
            // arrange
            let relatedLinks = {
                edhrec: "http://edhrec.com/route/?cc=Cruel+Reality",
                gatherer: "http://gatherer.wizards.com/Pages/Card/Details.aspx?multiverseid=426786",
                mtgtop8: "http://mtgtop8.com/search?MD_check=1&SB_check=1&cards=Cruel+Reality",
                tcgplayer: "http://decks.tcgplayer.com/magic/deck/search?contains=Cruel+Reality&page=1&partner=Scryfall"
            };
            let errorOccurred = false;

            // act
            try {
                Card.validateRelatedLinks(relatedLinks);
            } catch (e) {
                errorOccurred = true;
            }

            // assert
            expect(errorOccurred).to.be.false;
        });
    });

    describe("purchase_links", () => {
        it("should ignore if missing", () => {
            // arrange
            let purcahseLinks;
            let errorOccurred = false;

            // act
            try {
                Card.validatePurchaseLinks(purcahseLinks);
            } catch (e) {
                errorOccurred = true;
            }

            // assert
            expect(errorOccurred).to.be.false;
        });

        it("should ignore if amazon link is missing", () => {
            // arrange
            let purchaseLinks = {
                ebay:
                    "http://rover.ebay.com/rover/1/711-53200-19255-0/1?campid=5337966903&icep_catId=19107&icep_ff3=10&icep_sortBy=12&icep_uq=Cruel+Reality&icep_vectorid=229466&ipn=psmain&kw=lg&kwid=902099&mtid=824&pub=5575230669&toolid=10001",
                tcgplayer: "http://store.tcgplayer.com/magic/amonkhet/cruel-reality",
                magiccardmarket: "https://www.cardmarket.com/Magic/Products/Singles/Amonkhet/Cruel+Reality",
                cardhoarder: "https://www.cardhoarder.com/cards/63770?affiliate_id=scryfall&ref=card-profile&utm_campaign=affiliate&utm_medium=card",
                card_kingdom: "https://www.cardkingdom.com/catalog/item/211792",
                mtgo_traders: "http://www.mtgotraders.com/deck/ref.php?id=63770",
                coolstuffinc: "http://www.coolstuffinc.com/p/Magic%3A+The+Gathering/Cruel+Reality"
            };
            let errorOccurred = false;

            // act
            try {
                Card.validatePurchaseLinks(purchaseLinks);
            } catch (e) {
                errorOccurred = true;
            }

            // assert
            expect(errorOccurred).to.be.false;
        });

        it("should error if amazon link is empty", () => {
            // arrange
            let purchaseLinks = {
                amazon: ""
            };
            let errorOccurred = false;

            // act
            try {
                Card.validatePurchaseLinks(purchaseLinks);
            } catch (e) {
                errorOccurred = true;
            }

            // assert
            expect(errorOccurred).to.be.true;
        });

        it("should error if amazon link is an invalid uri", () => {
            // arrange
            let purchaseLinks = {
                amazon: "not a valid uri"
            };
            let errorOccurred = false;

            // act
            try {
                Card.validatePurchaseLinks(purchaseLinks);
            } catch (e) {
                errorOccurred = true;
            }

            // assert
            expect(errorOccurred).to.be.true;
        });

        it("should allow a valid amazon link", () => {
            // arrange
            let purchaseLinks = {
                amazon: "https://www.amazon.com/gp/search?ie=UTF8&index=toys-and-games&keywords=Cruel+Reality"
            };
            let errorOccurred = false;

            // act
            try {
                Card.validatePurchaseLinks(purchaseLinks);
            } catch (e) {
                errorOccurred = true;
            }

            // assert
            expect(errorOccurred).to.be.false;
        });

        it("should ignore if ebay link is missing", () => {
            // arrange
            let purchaseLinks = {
                amazon: "https://www.amazon.com/gp/search?ie=UTF8&index=toys-and-games&keywords=Cruel+Reality",
                tcgplayer: "http://store.tcgplayer.com/magic/amonkhet/cruel-reality",
                magiccardmarket: "https://www.cardmarket.com/Magic/Products/Singles/Amonkhet/Cruel+Reality",
                cardhoarder: "https://www.cardhoarder.com/cards/63770?affiliate_id=scryfall&ref=card-profile&utm_campaign=affiliate&utm_medium=card",
                card_kingdom: "https://www.cardkingdom.com/catalog/item/211792",
                mtgo_traders: "http://www.mtgotraders.com/deck/ref.php?id=63770",
                coolstuffinc: "http://www.coolstuffinc.com/p/Magic%3A+The+Gathering/Cruel+Reality"
            };
            let errorOccurred = false;

            // act
            try {
                Card.validatePurchaseLinks(purchaseLinks);
            } catch (e) {
                errorOccurred = true;
            }

            // assert
            expect(errorOccurred).to.be.false;
        });

        it("should error if ebay link is empty", () => {
            // arrange
            let purchaseLinks = {
                ebay: ""
            };
            let errorOccurred = false;

            // act
            try {
                Card.validatePurchaseLinks(purchaseLinks);
            } catch (e) {
                errorOccurred = true;
            }

            // assert
            expect(errorOccurred).to.be.true;
        });

        it("should error if ebay link is an invalid uri", () => {
            // arrange
            let purchaseLinks = {
                ebay: "not a valid uri"
            };
            let errorOccurred = false;

            // act
            try {
                Card.validatePurchaseLinks(purchaseLinks);
            } catch (e) {
                errorOccurred = true;
            }

            // assert
            expect(errorOccurred).to.be.true;
        });

        it("should allow a ebay gatherer link", () => {
            // arrange
            let purchaseLinks = {
                ebay:
                    "http://rover.ebay.com/rover/1/711-53200-19255-0/1?campid=5337966903&icep_catId=19107&icep_ff3=10&icep_sortBy=12&icep_uq=Cruel+Reality&icep_vectorid=229466&ipn=psmain&kw=lg&kwid=902099&mtid=824&pub=5575230669&toolid=10001"
            };
            let errorOccurred = false;

            // act
            try {
                Card.validatePurchaseLinks(purchaseLinks);
            } catch (e) {
                errorOccurred = true;
            }

            // assert
            expect(errorOccurred).to.be.false;
        });

        it("should ignore if tcgplayer link is missing", () => {
            // arrange
            let purchaseLinks = {
                amazon: "https://www.amazon.com/gp/search?ie=UTF8&index=toys-and-games&keywords=Cruel+Reality",
                ebay:
                    "http://rover.ebay.com/rover/1/711-53200-19255-0/1?campid=5337966903&icep_catId=19107&icep_ff3=10&icep_sortBy=12&icep_uq=Cruel+Reality&icep_vectorid=229466&ipn=psmain&kw=lg&kwid=902099&mtid=824&pub=5575230669&toolid=10001",
                magiccardmarket: "https://www.cardmarket.com/Magic/Products/Singles/Amonkhet/Cruel+Reality",
                cardhoarder: "https://www.cardhoarder.com/cards/63770?affiliate_id=scryfall&ref=card-profile&utm_campaign=affiliate&utm_medium=card",
                card_kingdom: "https://www.cardkingdom.com/catalog/item/211792",
                mtgo_traders: "http://www.mtgotraders.com/deck/ref.php?id=63770",
                coolstuffinc: "http://www.coolstuffinc.com/p/Magic%3A+The+Gathering/Cruel+Reality"
            };
            let errorOccurred = false;

            // act
            try {
                Card.validatePurchaseLinks(purchaseLinks);
            } catch (e) {
                errorOccurred = true;
            }

            // assert
            expect(errorOccurred).to.be.false;
        });

        it("should error if tcgplayer link is empty", () => {
            // arrange
            let purchaseLinks = {
                tcgplayer: ""
            };
            let errorOccurred = false;

            // act
            try {
                Card.validatePurchaseLinks(purchaseLinks);
            } catch (e) {
                errorOccurred = true;
            }

            // assert
            expect(errorOccurred).to.be.true;
        });

        it("should error if tcgplayer link is an invalid uri", () => {
            // arrange
            let purchaseLinks = {
                tcgplayer: "not a valid uri"
            };
            let errorOccurred = false;

            // act
            try {
                Card.validatePurchaseLinks(purchaseLinks);
            } catch (e) {
                errorOccurred = true;
            }

            // assert
            expect(errorOccurred).to.be.true;
        });

        it("should allow a valid tcgplayer link", () => {
            // arrange
            let purchaseLinks = {
                tcgplayer: "http://store.tcgplayer.com/magic/amonkhet/cruel-reality"
            };
            let errorOccurred = false;

            // act
            try {
                Card.validatePurchaseLinks(purchaseLinks);
            } catch (e) {
                errorOccurred = true;
            }

            // assert
            expect(errorOccurred).to.be.false;
        });

        it("should ignore if magiccardmarket link is missing", () => {
            // arrange
            let purchaseLinks = {
                amazon: "https://www.amazon.com/gp/search?ie=UTF8&index=toys-and-games&keywords=Cruel+Reality",
                ebay:
                    "http://rover.ebay.com/rover/1/711-53200-19255-0/1?campid=5337966903&icep_catId=19107&icep_ff3=10&icep_sortBy=12&icep_uq=Cruel+Reality&icep_vectorid=229466&ipn=psmain&kw=lg&kwid=902099&mtid=824&pub=5575230669&toolid=10001",
                tcgplayer: "http://store.tcgplayer.com/magic/amonkhet/cruel-reality",
                cardhoarder: "https://www.cardhoarder.com/cards/63770?affiliate_id=scryfall&ref=card-profile&utm_campaign=affiliate&utm_medium=card",
                card_kingdom: "https://www.cardkingdom.com/catalog/item/211792",
                mtgo_traders: "http://www.mtgotraders.com/deck/ref.php?id=63770",
                coolstuffinc: "http://www.coolstuffinc.com/p/Magic%3A+The+Gathering/Cruel+Reality"
            };
            let errorOccurred = false;

            // act
            try {
                Card.validatePurchaseLinks(purchaseLinks);
            } catch (e) {
                errorOccurred = true;
            }

            // assert
            expect(errorOccurred).to.be.false;
        });

        it("should error if magiccardmarket link is empty", () => {
            // arrange
            let purchaseLinks = {
                magiccardmarket: ""
            };
            let errorOccurred = false;

            // act
            try {
                Card.validatePurchaseLinks(purchaseLinks);
            } catch (e) {
                errorOccurred = true;
            }

            // assert
            expect(errorOccurred).to.be.true;
        });

        it("should error if magiccardmarket link is an invalid uri", () => {
            // arrange
            let purchaseLinks = {
                magiccardmarket: "not a valid uri"
            };
            let errorOccurred = false;

            // act
            try {
                Card.validatePurchaseLinks(purchaseLinks);
            } catch (e) {
                errorOccurred = true;
            }

            // assert
            expect(errorOccurred).to.be.true;
        });

        it("should allow a valid magiccardmarket link", () => {
            // arrange
            let purchaseLinks = {
                magiccardmarket: "https://www.cardmarket.com/Magic/Products/Singles/Amonkhet/Cruel+Reality"
            };
            let errorOccurred = false;

            // act
            try {
                Card.validatePurchaseLinks(purchaseLinks);
            } catch (e) {
                errorOccurred = true;
            }

            // assert
            expect(errorOccurred).to.be.false;
        });

        it("should ignore if cardhoarder link is missing", () => {
            // arrange
            let purchaseLinks = {
                amazon: "https://www.amazon.com/gp/search?ie=UTF8&index=toys-and-games&keywords=Cruel+Reality",
                ebay:
                    "http://rover.ebay.com/rover/1/711-53200-19255-0/1?campid=5337966903&icep_catId=19107&icep_ff3=10&icep_sortBy=12&icep_uq=Cruel+Reality&icep_vectorid=229466&ipn=psmain&kw=lg&kwid=902099&mtid=824&pub=5575230669&toolid=10001",
                tcgplayer: "http://store.tcgplayer.com/magic/amonkhet/cruel-reality",
                magiccardmarket: "https://www.cardmarket.com/Magic/Products/Singles/Amonkhet/Cruel+Reality",
                card_kingdom: "https://www.cardkingdom.com/catalog/item/211792",
                mtgo_traders: "http://www.mtgotraders.com/deck/ref.php?id=63770",
                coolstuffinc: "http://www.coolstuffinc.com/p/Magic%3A+The+Gathering/Cruel+Reality"
            };
            let errorOccurred = false;

            // act
            try {
                Card.validatePurchaseLinks(purchaseLinks);
            } catch (e) {
                errorOccurred = true;
            }

            // assert
            expect(errorOccurred).to.be.false;
        });

        it("should error if cardhoarder link is empty", () => {
            // arrange
            let purchaseLinks = {
                cardhoarder: ""
            };
            let errorOccurred = false;

            // act
            try {
                Card.validatePurchaseLinks(purchaseLinks);
            } catch (e) {
                errorOccurred = true;
            }

            // assert
            expect(errorOccurred).to.be.true;
        });

        it("should error if cardhoarder link is an invalid uri", () => {
            // arrange
            let purchaseLinks = {
                cardhoarder: "not a valid uri"
            };
            let errorOccurred = false;

            // act
            try {
                Card.validatePurchaseLinks(purchaseLinks);
            } catch (e) {
                errorOccurred = true;
            }

            // assert
            expect(errorOccurred).to.be.true;
        });

        it("should allow a valid cardhoarder link", () => {
            // arrange
            let purchaseLinks = {
                cardhoarder: "https://www.cardhoarder.com/cards/63770?affiliate_id=scryfall&ref=card-profile&utm_campaign=affiliate&utm_medium=card"
            };
            let errorOccurred = false;

            // act
            try {
                Card.validatePurchaseLinks(purchaseLinks);
            } catch (e) {
                errorOccurred = true;
            }

            // assert
            expect(errorOccurred).to.be.false;
        });

        it("should ignore if card_kingdom link is missing", () => {
            // arrange
            let purchaseLinks = {
                amazon: "https://www.amazon.com/gp/search?ie=UTF8&index=toys-and-games&keywords=Cruel+Reality",
                ebay:
                    "http://rover.ebay.com/rover/1/711-53200-19255-0/1?campid=5337966903&icep_catId=19107&icep_ff3=10&icep_sortBy=12&icep_uq=Cruel+Reality&icep_vectorid=229466&ipn=psmain&kw=lg&kwid=902099&mtid=824&pub=5575230669&toolid=10001",
                tcgplayer: "http://store.tcgplayer.com/magic/amonkhet/cruel-reality",
                magiccardmarket: "https://www.cardmarket.com/Magic/Products/Singles/Amonkhet/Cruel+Reality",
                cardhoarder: "https://www.cardhoarder.com/cards/63770?affiliate_id=scryfall&ref=card-profile&utm_campaign=affiliate&utm_medium=card",
                mtgo_traders: "http://www.mtgotraders.com/deck/ref.php?id=63770",
                coolstuffinc: "http://www.coolstuffinc.com/p/Magic%3A+The+Gathering/Cruel+Reality"
            };
            let errorOccurred = false;

            // act
            try {
                Card.validatePurchaseLinks(purchaseLinks);
            } catch (e) {
                errorOccurred = true;
            }

            // assert
            expect(errorOccurred).to.be.false;
        });

        it("should error if card_kingdom link is empty", () => {
            // arrange
            let purchaseLinks = {
                card_kingdom: ""
            };
            let errorOccurred = false;

            // act
            try {
                Card.validatePurchaseLinks(purchaseLinks);
            } catch (e) {
                errorOccurred = true;
            }

            // assert
            expect(errorOccurred).to.be.true;
        });

        it("should error if card_kingdom link is an invalid uri", () => {
            // arrange
            let purchaseLinks = {
                card_kingdom: "not a valid uri"
            };
            let errorOccurred = false;

            // act
            try {
                Card.validatePurchaseLinks(purchaseLinks);
            } catch (e) {
                errorOccurred = true;
            }

            // assert
            expect(errorOccurred).to.be.true;
        });

        it("should allow a valid card_kingdom link", () => {
            // arrange
            let purchaseLinks = {
                card_kingdom: "https://www.cardkingdom.com/catalog/item/211792"
            };
            let errorOccurred = false;

            // act
            try {
                Card.validatePurchaseLinks(purchaseLinks);
            } catch (e) {
                errorOccurred = true;
            }

            // assert
            expect(errorOccurred).to.be.false;
        });

        it("should ignore if mtgo_traders link is missing", () => {
            // arrange
            let purchaseLinks = {
                amazon: "https://www.amazon.com/gp/search?ie=UTF8&index=toys-and-games&keywords=Cruel+Reality",
                ebay:
                    "http://rover.ebay.com/rover/1/711-53200-19255-0/1?campid=5337966903&icep_catId=19107&icep_ff3=10&icep_sortBy=12&icep_uq=Cruel+Reality&icep_vectorid=229466&ipn=psmain&kw=lg&kwid=902099&mtid=824&pub=5575230669&toolid=10001",
                tcgplayer: "http://store.tcgplayer.com/magic/amonkhet/cruel-reality",
                magiccardmarket: "https://www.cardmarket.com/Magic/Products/Singles/Amonkhet/Cruel+Reality",
                cardhoarder: "https://www.cardhoarder.com/cards/63770?affiliate_id=scryfall&ref=card-profile&utm_campaign=affiliate&utm_medium=card",
                card_kingdom: "https://www.cardkingdom.com/catalog/item/211792",
                coolstuffinc: "http://www.coolstuffinc.com/p/Magic%3A+The+Gathering/Cruel+Reality"
            };
            let errorOccurred = false;

            // act
            try {
                Card.validatePurchaseLinks(purchaseLinks);
            } catch (e) {
                errorOccurred = true;
            }

            // assert
            expect(errorOccurred).to.be.false;
        });

        it("should error if mtgo_traders link is empty", () => {
            // arrange
            let purchaseLinks = {
                mtgo_traders: ""
            };
            let errorOccurred = false;

            // act
            try {
                Card.validatePurchaseLinks(purchaseLinks);
            } catch (e) {
                errorOccurred = true;
            }

            // assert
            expect(errorOccurred).to.be.true;
        });

        it("should error if mtgo_traders link is an invalid uri", () => {
            // arrange
            let purchaseLinks = {
                mtgo_traders: "not a valid uri"
            };
            let errorOccurred = false;

            // act
            try {
                Card.validatePurchaseLinks(purchaseLinks);
            } catch (e) {
                errorOccurred = true;
            }

            // assert
            expect(errorOccurred).to.be.true;
        });

        it("should allow a valid mtgo_traders link", () => {
            // arrange
            let purchaseLinks = {
                mtgo_traders: "http://www.mtgotraders.com/deck/ref.php?id=63770"
            };
            let errorOccurred = false;

            // act
            try {
                Card.validatePurchaseLinks(purchaseLinks);
            } catch (e) {
                errorOccurred = true;
            }

            // assert
            expect(errorOccurred).to.be.false;
        });

        it("should ignore if coolstuffinc link is missing", () => {
            // arrange
            let purchaseLinks = {
                amazon: "https://www.amazon.com/gp/search?ie=UTF8&index=toys-and-games&keywords=Cruel+Reality",
                ebay:
                    "http://rover.ebay.com/rover/1/711-53200-19255-0/1?campid=5337966903&icep_catId=19107&icep_ff3=10&icep_sortBy=12&icep_uq=Cruel+Reality&icep_vectorid=229466&ipn=psmain&kw=lg&kwid=902099&mtid=824&pub=5575230669&toolid=10001",
                tcgplayer: "http://store.tcgplayer.com/magic/amonkhet/cruel-reality",
                magiccardmarket: "https://www.cardmarket.com/Magic/Products/Singles/Amonkhet/Cruel+Reality",
                cardhoarder: "https://www.cardhoarder.com/cards/63770?affiliate_id=scryfall&ref=card-profile&utm_campaign=affiliate&utm_medium=card",
                card_kingdom: "https://www.cardkingdom.com/catalog/item/211792",
                mtgo_traders: "http://www.mtgotraders.com/deck/ref.php?id=63770"
            };
            let errorOccurred = false;

            // act
            try {
                Card.validatePurchaseLinks(purchaseLinks);
            } catch (e) {
                errorOccurred = true;
            }

            // assert
            expect(errorOccurred).to.be.false;
        });

        it("should error if coolstuffinc link is empty", () => {
            // arrange
            let purchaseLinks = {
                coolstuffinc: ""
            };
            let errorOccurred = false;

            // act
            try {
                Card.validatePurchaseLinks(purchaseLinks);
            } catch (e) {
                errorOccurred = true;
            }

            // assert
            expect(errorOccurred).to.be.true;
        });

        it("should error if coolstuffinc link is an invalid uri", () => {
            // arrange
            let purchaseLinks = {
                coolstuffinc: "not a valid uri"
            };
            let errorOccurred = false;

            // act
            try {
                Card.validatePurchaseLinks(purchaseLinks);
            } catch (e) {
                errorOccurred = true;
            }

            // assert
            expect(errorOccurred).to.be.true;
        });

        it("should allow a valid coolstuffinc link", () => {
            // arrange
            let purchaseLinks = {
                coolstuffinc: "http://www.coolstuffinc.com/p/Magic%3A+The+Gathering/Cruel+Reality"
            };
            let errorOccurred = false;

            // act
            try {
                Card.validatePurchaseLinks(purchaseLinks);
            } catch (e) {
                errorOccurred = true;
            }

            // assert
            expect(errorOccurred).to.be.false;
        });

        it("should allow multiple valid links", () => {
            // arrange
            let purchaseLinks = {
                amazon: "https://www.amazon.com/gp/search?ie=UTF8&index=toys-and-games&keywords=Cruel+Reality",
                ebay:
                    "http://rover.ebay.com/rover/1/711-53200-19255-0/1?campid=5337966903&icep_catId=19107&icep_ff3=10&icep_sortBy=12&icep_uq=Cruel+Reality&icep_vectorid=229466&ipn=psmain&kw=lg&kwid=902099&mtid=824&pub=5575230669&toolid=10001",
                tcgplayer: "http://store.tcgplayer.com/magic/amonkhet/cruel-reality",
                magiccardmarket: "https://www.cardmarket.com/Magic/Products/Singles/Amonkhet/Cruel+Reality",
                cardhoarder: "https://www.cardhoarder.com/cards/63770?affiliate_id=scryfall&ref=card-profile&utm_campaign=affiliate&utm_medium=card",
                card_kingdom: "https://www.cardkingdom.com/catalog/item/211792",
                mtgo_traders: "http://www.mtgotraders.com/deck/ref.php?id=63770",
                coolstuffinc: "http://www.coolstuffinc.com/p/Magic%3A+The+Gathering/Cruel+Reality"
            };
            let errorOccurred = false;

            // act
            try {
                Card.validatePurchaseLinks(purchaseLinks);
            } catch (e) {
                errorOccurred = true;
            }

            // assert
            expect(errorOccurred).to.be.false;
        });
    });
});
