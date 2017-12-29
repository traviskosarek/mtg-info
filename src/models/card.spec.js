"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("mocha");
var chai_1 = require("chai");
var sinon = require("sinon");
var set_1 = require("./set");
var card_1 = require("./card");
var enums_1 = require("../enums");
var sandbox;
beforeEach(function () {
    sandbox = sinon.sandbox.create();
});
afterEach(function () {
    sandbox.restore();
});
describe("Card", function () {
    describe("validateCard", function () {
        it("should validate card fields", function () {
            var card = {
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
                    ebay: "http://rover.ebay.com/rover/1/711-53200-19255-0/1?campid=5337966903&icep_catId=19107&icep_ff3=10&icep_sortBy=12&icep_uq=Cruel+Reality&icep_vectorid=229466&ipn=psmain&kw=lg&kwid=902099&mtid=824&pub=5575230669&toolid=10001",
                    tcgplayer: "http://store.tcgplayer.com/magic/amonkhet/cruel-reality?partner=Scryfall",
                    magiccardmarket: "https://www.cardmarket.com/Magic/Products/Singles/Amonkhet/Cruel+Reality?referrer=scryfall",
                    cardhoarder: "https://www.cardhoarder.com/cards/63770?affiliate_id=scryfall&ref=card-profile&utm_campaign=affiliate&utm_medium=card&utm_source=scryfall",
                    card_kingdom: "https://www.cardkingdom.com/catalog/item/211792?partner=scryfall&utm_campaign=affiliate&utm_medium=scryfall&utm_source=scryfall",
                    mtgo_traders: "http://www.mtgotraders.com/deck/ref.php?id=63770&referral=scryfall",
                    coolstuffinc: "http://www.coolstuffinc.com/p/Magic%3A+The+Gathering/Cruel+Reality?utm_source=scryfall"
                }
            };
            var errorThrown = false;
            var validateArtistStub = sandbox.stub(card_1.Card, "validateArtist");
            var validateBorderColorStub = sandbox.stub(card_1.Card, "validateBorderColor");
            var validateCardFacesStub = sandbox.stub(card_1.Card, "validateCardFaces");
            var validateCollectorNumberStub = sandbox.stub(card_1.Card, "validateCollectorNumber");
            var validateColorIdentityStub = sandbox.stub(card_1.Card, "validateColorIdentity");
            var validateColorIndicatorStub = sandbox.stub(card_1.Card, "validateColorIndicator");
            var validateColorsStub = sandbox.stub(card_1.Card, "validateColors");
            var validateConvertedManaCostStub = sandbox.stub(card_1.Card, "validateConvertedManaCost");
            var validateEDHRecRankStub = sandbox.stub(card_1.Card, "validateEDHRecRank");
            var validateEurPriceStub = sandbox.stub(card_1.Card, "validateEurPrice");
            var validateTixPriceStub = sandbox.stub(card_1.Card, "validateTixPrice");
            var validateUsdPriceStub = sandbox.stub(card_1.Card, "validateUsdPrice");
            var validateFlavorTextStub = sandbox.stub(card_1.Card, "validateFlavorText");
            var validateFrameStub = sandbox.stub(card_1.Card, "validateFrame");
            var validateHandModifierStub = sandbox.stub(card_1.Card, "validateHandModifier");
            var validateImageUriStub = sandbox.stub(card_1.Card, "validateImageUri");
            var validateIsColorshiftedStub = sandbox.stub(card_1.Card, "validateIsColorshifted");
            var validateIsDigitalStub = sandbox.stub(card_1.Card, "validateIsDigital");
            var validateIsFullArtStub = sandbox.stub(card_1.Card, "validateIsFullArt");
            var validateIsFutureshiftedStub = sandbox.stub(card_1.Card, "validateIsFutureshifted");
            var validateIsReprintStub = sandbox.stub(card_1.Card, "validateIsReprint");
            var validateIsReservedStub = sandbox.stub(card_1.Card, "validateIsReserved");
            var validateIsTimeshiftedStub = sandbox.stub(card_1.Card, "validateIsTimeshifted");
            var validateLayoutStub = sandbox.stub(card_1.Card, "validateLayout");
            var validateLegalityStub = sandbox.stub(card_1.Card, "validateLegality");
            var validateLifeModifierStub = sandbox.stub(card_1.Card, "validateLifeModifier");
            var validateLoyaltyStub = sandbox.stub(card_1.Card, "validateLoyalty");
            var validateManaCostStub = sandbox.stub(card_1.Card, "validateManaCost");
            var validateMultiverseIdsStub = sandbox.stub(card_1.Card, "validateMultiverseIds");
            var validateNameStub = sandbox.stub(card_1.Card, "validateName");
            var validateOracleTextStub = sandbox.stub(card_1.Card, "validateOracleText");
            var validatePowerStub = sandbox.stub(card_1.Card, "validatePower");
            var validatePurchaseLinksStub = sandbox.stub(card_1.Card, "validatePurchaseLinks");
            var validateRarityStub = sandbox.stub(card_1.Card, "validateRarity");
            var validateRelatedCardsStub = sandbox.stub(card_1.Card, "validateRelatedCards");
            var validateRelatedLinksStub = sandbox.stub(card_1.Card, "validateRelatedLinks");
            var validateSetCodeStub = sandbox.stub(card_1.Card, "validateSetCode");
            var validateSetNameStub = sandbox.stub(card_1.Card, "validateSetName");
            var validateStorySpotlightNumberStub = sandbox.stub(card_1.Card, "validateStorySpotlightNumber");
            var validateStorySpotlightUriStub = sandbox.stub(card_1.Card, "validateStorySpotlightUri");
            var validateToughnessStub = sandbox.stub(card_1.Card, "validateToughness");
            var validateTypeLineStub = sandbox.stub(card_1.Card, "validateTypeLine");
            var validateWatermarkStub = sandbox.stub(card_1.Card, "validateWatermark");
            try {
                card_1.Card.validateCard(card);
            }
            catch (e) {
                errorThrown = true;
            }
            chai_1.expect(errorThrown).to.be.false;
            chai_1.expect(validateArtistStub.called).to.be.true;
            chai_1.expect(validateBorderColorStub.called).to.be.true;
            chai_1.expect(validateCardFacesStub.called).to.be.true;
            chai_1.expect(validateCollectorNumberStub.called).to.be.true;
            chai_1.expect(validateColorIdentityStub.called).to.be.true;
            chai_1.expect(validateColorIndicatorStub.called).to.be.true;
            chai_1.expect(validateColorsStub.called).to.be.true;
            chai_1.expect(validateConvertedManaCostStub.called).to.be.true;
            chai_1.expect(validateEDHRecRankStub.called).to.be.true;
            chai_1.expect(validateEurPriceStub.called).to.be.true;
            chai_1.expect(validateTixPriceStub.called).to.be.true;
            chai_1.expect(validateUsdPriceStub.called).to.be.true;
            chai_1.expect(validateFlavorTextStub.called).to.be.true;
            chai_1.expect(validateFrameStub.called).to.be.true;
            chai_1.expect(validateHandModifierStub.called).to.be.true;
            chai_1.expect(validateImageUriStub.called).to.be.true;
            chai_1.expect(validateIsColorshiftedStub.called).to.be.true;
            chai_1.expect(validateIsDigitalStub.called).to.be.true;
            chai_1.expect(validateIsFullArtStub.called).to.be.true;
            chai_1.expect(validateIsFutureshiftedStub.called).to.be.true;
            chai_1.expect(validateIsReprintStub.called).to.be.true;
            chai_1.expect(validateIsReservedStub.called).to.be.true;
            chai_1.expect(validateIsTimeshiftedStub.called).to.be.true;
            chai_1.expect(validateLayoutStub.called).to.be.true;
            chai_1.expect(validateLegalityStub.called).to.be.true;
            chai_1.expect(validateLifeModifierStub.called).to.be.true;
            chai_1.expect(validateLoyaltyStub.called).to.be.true;
            chai_1.expect(validateManaCostStub.called).to.be.true;
            chai_1.expect(validateMultiverseIdsStub.called).to.be.true;
            chai_1.expect(validateNameStub.called).to.be.true;
            chai_1.expect(validateOracleTextStub.called).to.be.true;
            chai_1.expect(validatePowerStub.called).to.be.true;
            chai_1.expect(validatePurchaseLinksStub.called).to.be.true;
            chai_1.expect(validateRarityStub.called).to.be.true;
            chai_1.expect(validateRelatedCardsStub.called).to.be.true;
            chai_1.expect(validateRelatedLinksStub.called).to.be.true;
            chai_1.expect(validateSetCodeStub.called).to.be.true;
            chai_1.expect(validateSetNameStub.called).to.be.true;
            chai_1.expect(validateStorySpotlightNumberStub.called).to.be.true;
            chai_1.expect(validateStorySpotlightUriStub.called).to.be.true;
            chai_1.expect(validateToughnessStub.called).to.be.true;
            chai_1.expect(validateTypeLineStub.called).to.be.true;
            chai_1.expect(validateWatermarkStub.called).to.be.true;
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
        it("should rethrow errors", function () {
            var card = {
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
                    ebay: "http://rover.ebay.com/rover/1/711-53200-19255-0/1?campid=5337966903&icep_catId=19107&icep_ff3=10&icep_sortBy=12&icep_uq=Cruel+Reality&icep_vectorid=229466&ipn=psmain&kw=lg&kwid=902099&mtid=824&pub=5575230669&toolid=10001",
                    tcgplayer: "http://store.tcgplayer.com/magic/amonkhet/cruel-reality?partner=Scryfall",
                    magiccardmarket: "https://www.cardmarket.com/Magic/Products/Singles/Amonkhet/Cruel+Reality?referrer=scryfall",
                    cardhoarder: "https://www.cardhoarder.com/cards/63770?affiliate_id=scryfall&ref=card-profile&utm_campaign=affiliate&utm_medium=card&utm_source=scryfall",
                    card_kingdom: "https://www.cardkingdom.com/catalog/item/211792?partner=scryfall&utm_campaign=affiliate&utm_medium=scryfall&utm_source=scryfall",
                    mtgo_traders: "http://www.mtgotraders.com/deck/ref.php?id=63770&referral=scryfall",
                    coolstuffinc: "http://www.coolstuffinc.com/p/Magic%3A+The+Gathering/Cruel+Reality?utm_source=scryfall"
                }
            };
            var errorThrown = false;
            var validateCollectorNumberStub = sandbox.stub(card_1.Card, "validateCollectorNumber").callsFake(function (code) {
                throw new Error("This is an error");
            });
            try {
                card_1.Card.validateCard(card);
            }
            catch (e) {
                errorThrown = true;
            }
            chai_1.expect(errorThrown).to.be.true;
            validateCollectorNumberStub.restore();
        });
    });
    describe("multiverse_ids", function () {
        it("should ignore a missing multiverse_ids value", function () {
            var ids;
            var errorOccurred = false;
            try {
                card_1.Card.validateMultiverseIds(ids);
            }
            catch (e) {
                errorOccurred = true;
            }
            chai_1.expect(errorOccurred).to.be.false;
        });
        it("should invalidate a value that is not a list", function () {
            var ids = 0;
            var errorOccurred = false;
            try {
                card_1.Card.validateMultiverseIds(ids);
            }
            catch (e) {
                errorOccurred = true;
            }
            chai_1.expect(errorOccurred).to.be.true;
        });
        it("should invalidate non-numeric values", function () {
            var ids = ["invalid"];
            var errorOccurred = false;
            try {
                card_1.Card.validateMultiverseIds(ids);
            }
            catch (e) {
                errorOccurred = true;
            }
            chai_1.expect(errorOccurred).to.be.true;
        });
        it("should invalidate negative values", function () {
            var ids = [-1];
            var errorOccurred = false;
            try {
                card_1.Card.validateMultiverseIds(ids);
            }
            catch (e) {
                errorOccurred = true;
            }
            chai_1.expect(errorOccurred).to.be.true;
        });
        it("should allow an array of 0 values", function () {
            var ids = [];
            var errorOccurred = false;
            try {
                card_1.Card.validateMultiverseIds(ids);
            }
            catch (e) {
                errorOccurred = true;
            }
            chai_1.expect(errorOccurred).to.be.false;
        });
        it("should allow an array of a single positive number", function () {
            var ids = [1];
            var errorOccurred = false;
            try {
                card_1.Card.validateMultiverseIds(ids);
            }
            catch (e) {
                errorOccurred = true;
            }
            chai_1.expect(errorOccurred).to.be.false;
        });
        it("should allow an array of multiple positive numbers", function () {
            var ids = [1, 2, 3];
            var errorOccurred = false;
            try {
                card_1.Card.validateMultiverseIds(ids);
            }
            catch (e) {
                errorOccurred = true;
            }
            chai_1.expect(errorOccurred).to.be.false;
        });
    });
    describe("name", function () {
        it("should error if missing", function () {
            var name;
            var errorOccurred = false;
            try {
                card_1.Card.validateName(name);
            }
            catch (e) {
                errorOccurred = true;
            }
            chai_1.expect(errorOccurred).to.be.true;
        });
        it("should invalidate if an empty string", function () {
            var name = "";
            var errorOccurred = false;
            try {
                card_1.Card.validateName(name);
            }
            catch (e) {
                errorOccurred = true;
            }
            chai_1.expect(errorOccurred).to.be.true;
        });
        it("should validate string values", function () {
            var name = "Urza, Academy Headmaster";
            var errorOccurred = false;
            try {
                card_1.Card.validateName(name);
            }
            catch (e) {
                errorOccurred = true;
            }
            chai_1.expect(errorOccurred).to.be.false;
        });
    });
    describe("layout", function () {
        it("should allow missing value", function () {
            var layout;
            var errorOccurred = false;
            try {
                card_1.Card.validateLayout(layout);
            }
            catch (e) {
                errorOccurred = true;
            }
            chai_1.expect(errorOccurred).to.be.false;
        });
        it("should validate a value of 'normal'", function () {
            var layout = enums_1.Layouts.Normal;
            var errorOccurred = false;
            try {
                card_1.Card.validateLayout(layout);
            }
            catch (e) {
                errorOccurred = true;
            }
            chai_1.expect(errorOccurred).to.be.false;
        });
        it("should validate a value of 'split'", function () {
            var layout = enums_1.Layouts.Split;
            var errorOccurred = false;
            try {
                card_1.Card.validateLayout(layout);
            }
            catch (e) {
                errorOccurred = true;
            }
            chai_1.expect(errorOccurred).to.be.false;
        });
        it("should validate a value of 'flip'", function () {
            var layout = enums_1.Layouts.Flip;
            var errorOccurred = false;
            try {
                card_1.Card.validateLayout(layout);
            }
            catch (e) {
                errorOccurred = true;
            }
            chai_1.expect(errorOccurred).to.be.false;
        });
        it("should validate a value of 'transform'", function () {
            var layout = enums_1.Layouts.Transform;
            var errorOccurred = false;
            try {
                card_1.Card.validateLayout(layout);
            }
            catch (e) {
                errorOccurred = true;
            }
            chai_1.expect(errorOccurred).to.be.false;
        });
        it("should validate a value of 'meld'", function () {
            var layout = enums_1.Layouts.Meld;
            var errorOccurred = false;
            try {
                card_1.Card.validateLayout(layout);
            }
            catch (e) {
                errorOccurred = true;
            }
            chai_1.expect(errorOccurred).to.be.false;
        });
        it("should validate a value of 'leveler'", function () {
            var layout = enums_1.Layouts.Leveler;
            var errorOccurred = false;
            try {
                card_1.Card.validateLayout(layout);
            }
            catch (e) {
                errorOccurred = true;
            }
            chai_1.expect(errorOccurred).to.be.false;
        });
        it("should validate a value of 'planar'", function () {
            var layout = enums_1.Layouts.Planar;
            var errorOccurred = false;
            try {
                card_1.Card.validateLayout(layout);
            }
            catch (e) {
                errorOccurred = true;
            }
            chai_1.expect(errorOccurred).to.be.false;
        });
        it("should validate a value of 'scheme'", function () {
            var layout = enums_1.Layouts.Scheme;
            var errorOccurred = false;
            try {
                card_1.Card.validateLayout(layout);
            }
            catch (e) {
                errorOccurred = true;
            }
            chai_1.expect(errorOccurred).to.be.false;
        });
        it("should validate a value of 'vanguard'", function () {
            var layout = enums_1.Layouts.Vanguard;
            var errorOccurred = false;
            try {
                card_1.Card.validateLayout(layout);
            }
            catch (e) {
                errorOccurred = true;
            }
            chai_1.expect(errorOccurred).to.be.false;
        });
        it("should validate a value of 'token'", function () {
            var layout = enums_1.Layouts.Token;
            var errorOccurred = false;
            try {
                card_1.Card.validateLayout(layout);
            }
            catch (e) {
                errorOccurred = true;
            }
            chai_1.expect(errorOccurred).to.be.false;
        });
        it("should validate a value of 'double_faced_token'", function () {
            var layout = enums_1.Layouts.DoubleFacedToken;
            var errorOccurred = false;
            try {
                card_1.Card.validateLayout(layout);
            }
            catch (e) {
                errorOccurred = true;
            }
            chai_1.expect(errorOccurred).to.be.false;
        });
        it("should validate a value of 'emblem'", function () {
            var layout = enums_1.Layouts.Emblem;
            var errorOccurred = false;
            try {
                card_1.Card.validateLayout(layout);
            }
            catch (e) {
                errorOccurred = true;
            }
            chai_1.expect(errorOccurred).to.be.false;
        });
        it("should validate a value of 'augment'", function () {
            var layout = enums_1.Layouts.Augment;
            var errorOccurred = false;
            try {
                card_1.Card.validateLayout(layout);
            }
            catch (e) {
                errorOccurred = true;
            }
            chai_1.expect(errorOccurred).to.be.false;
        });
        it("should validate a value of 'host'", function () {
            var layout = enums_1.Layouts.Host;
            var errorOccurred = false;
            try {
                card_1.Card.validateLayout(layout);
            }
            catch (e) {
                errorOccurred = true;
            }
            chai_1.expect(errorOccurred).to.be.false;
        });
        it("should should invalidate an empty value", function () {
            var layout = "";
            var errorOccurred = false;
            try {
                card_1.Card.validateLayout(layout);
            }
            catch (e) {
                errorOccurred = true;
            }
            chai_1.expect(errorOccurred).to.be.true;
        });
        it("should should invalidate a value not in pre-defined list", function () {
            var layout = "xxx";
            var errorOccurred = false;
            try {
                card_1.Card.validateLayout(layout);
            }
            catch (e) {
                errorOccurred = true;
            }
            chai_1.expect(errorOccurred).to.be.true;
        });
    });
    describe("converted_mana_cost", function () {
        it("should error if missing", function () {
            var convertedManaCost;
            var errorOccurred = false;
            try {
                card_1.Card.validateConvertedManaCost(convertedManaCost);
            }
            catch (e) {
                errorOccurred = true;
            }
            chai_1.expect(errorOccurred).to.be.true;
        });
        it("should error if not a number", function () {
            var convertedManaCost = "not a number";
            var errorOccurred = false;
            try {
                card_1.Card.validateConvertedManaCost(convertedManaCost);
            }
            catch (e) {
                errorOccurred = true;
            }
            chai_1.expect(errorOccurred).to.be.true;
        });
        it("should error if negative", function () {
            var convertedManaCost = -1;
            var errorOccurred = false;
            try {
                card_1.Card.validateConvertedManaCost(convertedManaCost);
            }
            catch (e) {
                errorOccurred = true;
            }
            chai_1.expect(errorOccurred).to.be.true;
        });
        it("should allow integer values", function () {
            var convertedManaCost = 1;
            var errorOccurred = false;
            try {
                card_1.Card.validateConvertedManaCost(convertedManaCost);
            }
            catch (e) {
                errorOccurred = true;
            }
            chai_1.expect(errorOccurred).to.be.false;
        });
        it("should allow decimal values", function () {
            var convertedManaCost = 1.5;
            var errorOccurred = false;
            try {
                card_1.Card.validateConvertedManaCost(convertedManaCost);
            }
            catch (e) {
                errorOccurred = true;
            }
            chai_1.expect(errorOccurred).to.be.false;
        });
    });
    describe("type_line", function () {
        it("should error if missing", function () {
            var typeLine;
            var errorOccurred = false;
            try {
                card_1.Card.validateTypeLine(typeLine);
            }
            catch (e) {
                errorOccurred = true;
            }
            chai_1.expect(errorOccurred).to.be.true;
        });
        it("should error if empty string", function () {
            var typeLine = "";
            var errorOccurred = false;
            try {
                card_1.Card.validateTypeLine(typeLine);
            }
            catch (e) {
                errorOccurred = true;
            }
            chai_1.expect(errorOccurred).to.be.true;
        });
        it("should allow generic non-empty string", function () {
            var typeLine = "Legendary Planeswalker — Urza";
            var errorOccurred = false;
            try {
                card_1.Card.validateTypeLine(typeLine);
            }
            catch (e) {
                errorOccurred = true;
            }
            chai_1.expect(errorOccurred).to.be.false;
        });
    });
    describe("oracle_text", function () {
        it("should ignore if missing", function () {
            var oracleText;
            var errorOccurred = false;
            try {
                card_1.Card.validateOracleText(oracleText);
            }
            catch (e) {
                errorOccurred = true;
            }
            chai_1.expect(errorOccurred).to.be.false;
        });
        it("should error if empty", function () {
            var oracleText = "";
            var errorOccurred = false;
            try {
                card_1.Card.validateOracleText(oracleText);
            }
            catch (e) {
                errorOccurred = true;
            }
            chai_1.expect(errorOccurred).to.be.true;
        });
        it("should allow generic non-empty string", function () {
            var oracleText = "+1: Head to AskUrza.com and click +1. -1: Head to AskUrza.com and click -1. -6: Head to AskUrza.com and click -6.";
            var errorOccurred = false;
            try {
                card_1.Card.validateOracleText(oracleText);
            }
            catch (e) {
                errorOccurred = true;
            }
            chai_1.expect(errorOccurred).to.be.false;
        });
    });
    describe("mana_cost", function () {
        it("should error if missing", function () {
            var manaCost;
            var errorOccurred = false;
            try {
                card_1.Card.validateManaCost(manaCost);
            }
            catch (e) {
                errorOccurred = true;
            }
            chai_1.expect(errorOccurred).to.be.true;
        });
        it("should allow empty", function () {
            var manaCost = "";
            var errorOccurred = false;
            try {
                card_1.Card.validateManaCost(manaCost);
            }
            catch (e) {
                errorOccurred = true;
            }
            chai_1.expect(errorOccurred).to.be.false;
        });
        it("should allow a generic X symbol {X}", function () {
            var manaCost = enums_1.Symbols.XGeneric;
            var errorOccurred = false;
            try {
                card_1.Card.validateManaCost(manaCost);
            }
            catch (e) {
                errorOccurred = true;
            }
            chai_1.expect(errorOccurred).to.be.false;
        });
        it("should allow a generic Y symbol {Y}", function () {
            var manaCost = enums_1.Symbols.YGeneric;
            var errorOccurred = false;
            try {
                card_1.Card.validateManaCost(manaCost);
            }
            catch (e) {
                errorOccurred = true;
            }
            chai_1.expect(errorOccurred).to.be.false;
        });
        it("should allow a generic Z symbol {Z}", function () {
            var manaCost = enums_1.Symbols.ZGeneric;
            var errorOccurred = false;
            try {
                card_1.Card.validateManaCost(manaCost);
            }
            catch (e) {
                errorOccurred = true;
            }
            chai_1.expect(errorOccurred).to.be.false;
        });
        it("should allow a zero symbol {0}", function () {
            var manaCost = enums_1.Symbols.Zero;
            var errorOccurred = false;
            try {
                card_1.Card.validateManaCost(manaCost);
            }
            catch (e) {
                errorOccurred = true;
            }
            chai_1.expect(errorOccurred).to.be.false;
        });
        it("should allow a one half symbol {½}", function () {
            var manaCost = enums_1.Symbols.OneHalf;
            var errorOccurred = false;
            try {
                card_1.Card.validateManaCost(manaCost);
            }
            catch (e) {
                errorOccurred = true;
            }
            chai_1.expect(errorOccurred).to.be.false;
        });
        it("should allow a one symbol {1}", function () {
            var manaCost = enums_1.Symbols.One;
            var errorOccurred = false;
            try {
                card_1.Card.validateManaCost(manaCost);
            }
            catch (e) {
                errorOccurred = true;
            }
            chai_1.expect(errorOccurred).to.be.false;
        });
        it("should allow a two symbol {2}", function () {
            var manaCost = enums_1.Symbols.Two;
            var errorOccurred = false;
            try {
                card_1.Card.validateManaCost(manaCost);
            }
            catch (e) {
                errorOccurred = true;
            }
            chai_1.expect(errorOccurred).to.be.false;
        });
        it("should allow a three symbol {3}", function () {
            var manaCost = enums_1.Symbols.Three;
            var errorOccurred = false;
            try {
                card_1.Card.validateManaCost(manaCost);
            }
            catch (e) {
                errorOccurred = true;
            }
            chai_1.expect(errorOccurred).to.be.false;
        });
        it("should allow a four symbol {4}", function () {
            var manaCost = enums_1.Symbols.Four;
            var errorOccurred = false;
            try {
                card_1.Card.validateManaCost(manaCost);
            }
            catch (e) {
                errorOccurred = true;
            }
            chai_1.expect(errorOccurred).to.be.false;
        });
        it("should allow a five symbol {5}", function () {
            var manaCost = enums_1.Symbols.Five;
            var errorOccurred = false;
            try {
                card_1.Card.validateManaCost(manaCost);
            }
            catch (e) {
                errorOccurred = true;
            }
            chai_1.expect(errorOccurred).to.be.false;
        });
        it("should allow a six symbol {6}", function () {
            var manaCost = enums_1.Symbols.Six;
            var errorOccurred = false;
            try {
                card_1.Card.validateManaCost(manaCost);
            }
            catch (e) {
                errorOccurred = true;
            }
            chai_1.expect(errorOccurred).to.be.false;
        });
        it("should allow a seven symbol {7}", function () {
            var manaCost = enums_1.Symbols.Seven;
            var errorOccurred = false;
            try {
                card_1.Card.validateManaCost(manaCost);
            }
            catch (e) {
                errorOccurred = true;
            }
            chai_1.expect(errorOccurred).to.be.false;
        });
        it("should allow an eight symbol {8}", function () {
            var manaCost = enums_1.Symbols.Eight;
            var errorOccurred = false;
            try {
                card_1.Card.validateManaCost(manaCost);
            }
            catch (e) {
                errorOccurred = true;
            }
            chai_1.expect(errorOccurred).to.be.false;
        });
        it("should allow a nine symbol {9}", function () {
            var manaCost = enums_1.Symbols.Nine;
            var errorOccurred = false;
            try {
                card_1.Card.validateManaCost(manaCost);
            }
            catch (e) {
                errorOccurred = true;
            }
            chai_1.expect(errorOccurred).to.be.false;
        });
        it("should allow a ten symbol {10}", function () {
            var manaCost = enums_1.Symbols.Ten;
            var errorOccurred = false;
            try {
                card_1.Card.validateManaCost(manaCost);
            }
            catch (e) {
                errorOccurred = true;
            }
            chai_1.expect(errorOccurred).to.be.false;
        });
        it("should allow a eleven symbol {11}", function () {
            var manaCost = enums_1.Symbols.Eleven;
            var errorOccurred = false;
            try {
                card_1.Card.validateManaCost(manaCost);
            }
            catch (e) {
                errorOccurred = true;
            }
            chai_1.expect(errorOccurred).to.be.false;
        });
        it("should allow a twelve symbol {12}", function () {
            var manaCost = enums_1.Symbols.Twelve;
            var errorOccurred = false;
            try {
                card_1.Card.validateManaCost(manaCost);
            }
            catch (e) {
                errorOccurred = true;
            }
            chai_1.expect(errorOccurred).to.be.false;
        });
        it("should allow a thirteen symbol {13}", function () {
            var manaCost = enums_1.Symbols.Thirteen;
            var errorOccurred = false;
            try {
                card_1.Card.validateManaCost(manaCost);
            }
            catch (e) {
                errorOccurred = true;
            }
            chai_1.expect(errorOccurred).to.be.false;
        });
        it("should allow a fourteen symbol {14}", function () {
            var manaCost = enums_1.Symbols.Fourteen;
            var errorOccurred = false;
            try {
                card_1.Card.validateManaCost(manaCost);
            }
            catch (e) {
                errorOccurred = true;
            }
            chai_1.expect(errorOccurred).to.be.false;
        });
        it("should allow a fifteen symbol {15}", function () {
            var manaCost = enums_1.Symbols.Fifteen;
            var errorOccurred = false;
            try {
                card_1.Card.validateManaCost(manaCost);
            }
            catch (e) {
                errorOccurred = true;
            }
            chai_1.expect(errorOccurred).to.be.false;
        });
        it("should allow a sixteen symbol {16}", function () {
            var manaCost = enums_1.Symbols.Sixteen;
            var errorOccurred = false;
            try {
                card_1.Card.validateManaCost(manaCost);
            }
            catch (e) {
                errorOccurred = true;
            }
            chai_1.expect(errorOccurred).to.be.false;
        });
        it("should allow a seventeen symbol {17}", function () {
            var manaCost = enums_1.Symbols.Seventeen;
            var errorOccurred = false;
            try {
                card_1.Card.validateManaCost(manaCost);
            }
            catch (e) {
                errorOccurred = true;
            }
            chai_1.expect(errorOccurred).to.be.false;
        });
        it("should allow an eighteen symbol {18}", function () {
            var manaCost = enums_1.Symbols.Eighteen;
            var errorOccurred = false;
            try {
                card_1.Card.validateManaCost(manaCost);
            }
            catch (e) {
                errorOccurred = true;
            }
            chai_1.expect(errorOccurred).to.be.false;
        });
        it("should allow a nineteen symbol {19}", function () {
            var manaCost = enums_1.Symbols.Nineteen;
            var errorOccurred = false;
            try {
                card_1.Card.validateManaCost(manaCost);
            }
            catch (e) {
                errorOccurred = true;
            }
            chai_1.expect(errorOccurred).to.be.false;
        });
        it("should allow a twenty symbol {20}", function () {
            var manaCost = enums_1.Symbols.Twenty;
            var errorOccurred = false;
            try {
                card_1.Card.validateManaCost(manaCost);
            }
            catch (e) {
                errorOccurred = true;
            }
            chai_1.expect(errorOccurred).to.be.false;
        });
        it("should allow a one hundred symbol {100}", function () {
            var manaCost = enums_1.Symbols.OneHundred;
            var errorOccurred = false;
            try {
                card_1.Card.validateManaCost(manaCost);
            }
            catch (e) {
                errorOccurred = true;
            }
            chai_1.expect(errorOccurred).to.be.false;
        });
        it("should allow a one million symbol {1000000}", function () {
            var manaCost = enums_1.Symbols.OneMillion;
            var errorOccurred = false;
            try {
                card_1.Card.validateManaCost(manaCost);
            }
            catch (e) {
                errorOccurred = true;
            }
            chai_1.expect(errorOccurred).to.be.false;
        });
        it("should allow an infinity symbol {∞}", function () {
            var manaCost = enums_1.Symbols.Infinity;
            var errorOccurred = false;
            try {
                card_1.Card.validateManaCost(manaCost);
            }
            catch (e) {
                errorOccurred = true;
            }
            chai_1.expect(errorOccurred).to.be.false;
        });
        it("should allow a one white or blue symbol {W/U}", function () {
            var manaCost = enums_1.Symbols.OneWhiteOrOneBlue;
            var errorOccurred = false;
            try {
                card_1.Card.validateManaCost(manaCost);
            }
            catch (e) {
                errorOccurred = true;
            }
            chai_1.expect(errorOccurred).to.be.false;
        });
        it("should allow a one white or one black symbol {W/B}", function () {
            var manaCost = enums_1.Symbols.OneWhiteOrOneBlack;
            var errorOccurred = false;
            try {
                card_1.Card.validateManaCost(manaCost);
            }
            catch (e) {
                errorOccurred = true;
            }
            chai_1.expect(errorOccurred).to.be.false;
        });
        it("should allow a one black or one red symbol {B/R}", function () {
            var manaCost = enums_1.Symbols.OneBlackOrOneRed;
            var errorOccurred = false;
            try {
                card_1.Card.validateManaCost(manaCost);
            }
            catch (e) {
                errorOccurred = true;
            }
            chai_1.expect(errorOccurred).to.be.false;
        });
        it("should allow a one black or one green symbol {B/G}", function () {
            var manaCost = enums_1.Symbols.OneBlackOrOneGreen;
            var errorOccurred = false;
            try {
                card_1.Card.validateManaCost(manaCost);
            }
            catch (e) {
                errorOccurred = true;
            }
            chai_1.expect(errorOccurred).to.be.false;
        });
        it("should allow a one blue or one black symbol {U/B}", function () {
            var manaCost = enums_1.Symbols.OneBlueOrOneBlack;
            var errorOccurred = false;
            try {
                card_1.Card.validateManaCost(manaCost);
            }
            catch (e) {
                errorOccurred = true;
            }
            chai_1.expect(errorOccurred).to.be.false;
        });
        it("should allow a one blue or one red symbol {U/R}", function () {
            var manaCost = enums_1.Symbols.OneBlueOrOneRed;
            var errorOccurred = false;
            try {
                card_1.Card.validateManaCost(manaCost);
            }
            catch (e) {
                errorOccurred = true;
            }
            chai_1.expect(errorOccurred).to.be.false;
        });
        it("should allow a one red or one green symbol {R/G}", function () {
            var manaCost = enums_1.Symbols.OneRedOrOneGreen;
            var errorOccurred = false;
            try {
                card_1.Card.validateManaCost(manaCost);
            }
            catch (e) {
                errorOccurred = true;
            }
            chai_1.expect(errorOccurred).to.be.false;
        });
        it("should allow a one red or one white symbol {R/W}", function () {
            var manaCost = enums_1.Symbols.OneRedOrOneWhite;
            var errorOccurred = false;
            try {
                card_1.Card.validateManaCost(manaCost);
            }
            catch (e) {
                errorOccurred = true;
            }
            chai_1.expect(errorOccurred).to.be.false;
        });
        it("should allow a one green or one white symbol {G/W}", function () {
            var manaCost = enums_1.Symbols.OneGreenOrOneWhite;
            var errorOccurred = false;
            try {
                card_1.Card.validateManaCost(manaCost);
            }
            catch (e) {
                errorOccurred = true;
            }
            chai_1.expect(errorOccurred).to.be.false;
        });
        it("should allow a green or one blue symbol {G/U}", function () {
            var manaCost = enums_1.Symbols.OneGreenOrOneBlue;
            var errorOccurred = false;
            try {
                card_1.Card.validateManaCost(manaCost);
            }
            catch (e) {
                errorOccurred = true;
            }
            chai_1.expect(errorOccurred).to.be.false;
        });
        it("should allow a two generic or one white symbol {2/W}", function () {
            var manaCost = enums_1.Symbols.TwoGenericOrOneWhite;
            var errorOccurred = false;
            try {
                card_1.Card.validateManaCost(manaCost);
            }
            catch (e) {
                errorOccurred = true;
            }
            chai_1.expect(errorOccurred).to.be.false;
        });
        it("should allow a two generic or one blue symbol {2/U}", function () {
            var manaCost = enums_1.Symbols.TwoGenericOrOneBlue;
            var errorOccurred = false;
            try {
                card_1.Card.validateManaCost(manaCost);
            }
            catch (e) {
                errorOccurred = true;
            }
            chai_1.expect(errorOccurred).to.be.false;
        });
        it("should allow a two generic or one black symbol {2/B}", function () {
            var manaCost = enums_1.Symbols.TwoGenericOrOneBlack;
            var errorOccurred = false;
            try {
                card_1.Card.validateManaCost(manaCost);
            }
            catch (e) {
                errorOccurred = true;
            }
            chai_1.expect(errorOccurred).to.be.false;
        });
        it("should allow a two generic or one red symbol {2/R}", function () {
            var manaCost = enums_1.Symbols.TwoGenericOrOneRed;
            var errorOccurred = false;
            try {
                card_1.Card.validateManaCost(manaCost);
            }
            catch (e) {
                errorOccurred = true;
            }
            chai_1.expect(errorOccurred).to.be.false;
        });
        it("should allow a two generic or one green symbol {2/G}", function () {
            var manaCost = enums_1.Symbols.TwoGenericOrOneGreen;
            var errorOccurred = false;
            try {
                card_1.Card.validateManaCost(manaCost);
            }
            catch (e) {
                errorOccurred = true;
            }
            chai_1.expect(errorOccurred).to.be.false;
        });
        it("should allow a one colored or two life symbol {P}", function () {
            var manaCost = enums_1.Symbols.OneColoredOrTwoLife;
            var errorOccurred = false;
            try {
                card_1.Card.validateManaCost(manaCost);
            }
            catch (e) {
                errorOccurred = true;
            }
            chai_1.expect(errorOccurred).to.be.false;
        });
        it("should allow a one white or two life symbol {W/P}", function () {
            var manaCost = enums_1.Symbols.OneWhiteOrTwoLife;
            var errorOccurred = false;
            try {
                card_1.Card.validateManaCost(manaCost);
            }
            catch (e) {
                errorOccurred = true;
            }
            chai_1.expect(errorOccurred).to.be.false;
        });
        it("should allow a one blue or two life symbol {U/P}", function () {
            var manaCost = enums_1.Symbols.OneBlueOrTwoLife;
            var errorOccurred = false;
            try {
                card_1.Card.validateManaCost(manaCost);
            }
            catch (e) {
                errorOccurred = true;
            }
            chai_1.expect(errorOccurred).to.be.false;
        });
        it("should allow a one black or two life symbol {B/P}", function () {
            var manaCost = enums_1.Symbols.OneBlackOrTwoLife;
            var errorOccurred = false;
            try {
                card_1.Card.validateManaCost(manaCost);
            }
            catch (e) {
                errorOccurred = true;
            }
            chai_1.expect(errorOccurred).to.be.false;
        });
        it("should allow a one red or two life symbol {R/P}", function () {
            var manaCost = enums_1.Symbols.OneRedOrTwoLife;
            var errorOccurred = false;
            try {
                card_1.Card.validateManaCost(manaCost);
            }
            catch (e) {
                errorOccurred = true;
            }
            chai_1.expect(errorOccurred).to.be.false;
        });
        it("should allow a one green or two life symbol {G/P}", function () {
            var manaCost = enums_1.Symbols.OneGreenOrTwoLife;
            var errorOccurred = false;
            try {
                card_1.Card.validateManaCost(manaCost);
            }
            catch (e) {
                errorOccurred = true;
            }
            chai_1.expect(errorOccurred).to.be.false;
        });
        it("should allow a one half white symbol {HW}", function () {
            var manaCost = enums_1.Symbols.OneHalfWhite;
            var errorOccurred = false;
            try {
                card_1.Card.validateManaCost(manaCost);
            }
            catch (e) {
                errorOccurred = true;
            }
            chai_1.expect(errorOccurred).to.be.false;
        });
        it("should allow a one half red symbol {HR}", function () {
            var manaCost = enums_1.Symbols.OneHalfRed;
            var errorOccurred = false;
            try {
                card_1.Card.validateManaCost(manaCost);
            }
            catch (e) {
                errorOccurred = true;
            }
            chai_1.expect(errorOccurred).to.be.false;
        });
        it("should allow a white symbol {W}", function () {
            var manaCost = enums_1.Symbols.White;
            var errorOccurred = false;
            try {
                card_1.Card.validateManaCost(manaCost);
            }
            catch (e) {
                errorOccurred = true;
            }
            chai_1.expect(errorOccurred).to.be.false;
        });
        it("should allow a blue symbol {U}", function () {
            var manaCost = enums_1.Symbols.Blue;
            var errorOccurred = false;
            try {
                card_1.Card.validateManaCost(manaCost);
            }
            catch (e) {
                errorOccurred = true;
            }
            chai_1.expect(errorOccurred).to.be.false;
        });
        it("should allow a black symbol {B}", function () {
            var manaCost = enums_1.Symbols.Black;
            var errorOccurred = false;
            try {
                card_1.Card.validateManaCost(manaCost);
            }
            catch (e) {
                errorOccurred = true;
            }
            chai_1.expect(errorOccurred).to.be.false;
        });
        it("should allow a red symbol {R}", function () {
            var manaCost = enums_1.Symbols.Red;
            var errorOccurred = false;
            try {
                card_1.Card.validateManaCost(manaCost);
            }
            catch (e) {
                errorOccurred = true;
            }
            chai_1.expect(errorOccurred).to.be.false;
        });
        it("should allow a green symbol {G}", function () {
            var manaCost = enums_1.Symbols.Green;
            var errorOccurred = false;
            try {
                card_1.Card.validateManaCost(manaCost);
            }
            catch (e) {
                errorOccurred = true;
            }
            chai_1.expect(errorOccurred).to.be.false;
        });
        it("should allow a colorless symbol {C}", function () {
            var manaCost = enums_1.Symbols.Colorless;
            var errorOccurred = false;
            try {
                card_1.Card.validateManaCost(manaCost);
            }
            catch (e) {
                errorOccurred = true;
            }
            chai_1.expect(errorOccurred).to.be.false;
        });
        it("should allow a snow symbol {S}", function () {
            var manaCost = enums_1.Symbols.Snow;
            var errorOccurred = false;
            try {
                card_1.Card.validateManaCost(manaCost);
            }
            catch (e) {
                errorOccurred = true;
            }
            chai_1.expect(errorOccurred).to.be.false;
        });
        it("should allow multiple symbols", function () {
            var manaCost = enums_1.Symbols.Infinity + enums_1.Symbols.Black + enums_1.Symbols.Three;
            var errorOccurred = false;
            try {
                card_1.Card.validateManaCost(manaCost);
            }
            catch (e) {
                errorOccurred = true;
            }
            chai_1.expect(errorOccurred).to.be.false;
        });
        it("should reject symbols not in the format of {x}", function () {
            var manaCost = "W";
            var errorOccurred = false;
            try {
                card_1.Card.validateManaCost(manaCost);
            }
            catch (e) {
                errorOccurred = true;
            }
            chai_1.expect(errorOccurred).to.be.true;
        });
        it("should reject symbols not in the predefined list", function () {
            var manaCost = "{XXX}";
            var errorOccurred = false;
            try {
                card_1.Card.validateManaCost(manaCost);
            }
            catch (e) {
                errorOccurred = true;
            }
            chai_1.expect(errorOccurred).to.be.true;
        });
    });
    describe("power", function () {
        it("should ignore if missing", function () {
            var power;
            var errorOccurred = false;
            try {
                card_1.Card.validatePower(power);
            }
            catch (e) {
                errorOccurred = true;
            }
            chai_1.expect(errorOccurred).to.be.false;
        });
        it("should not allow empty", function () {
            var power = "";
            var errorOccurred = false;
            try {
                card_1.Card.validatePower(power);
            }
            catch (e) {
                errorOccurred = true;
            }
            chai_1.expect(errorOccurred).to.be.true;
        });
        it("should allow a negative one value", function () {
            var power = enums_1.Powers.NegativeOne;
            var errorOccurred = false;
            try {
                card_1.Card.validatePower(power);
            }
            catch (e) {
                errorOccurred = true;
            }
            chai_1.expect(errorOccurred).to.be.false;
        });
        it("should allow a star value", function () {
            var power = enums_1.Powers.Star;
            var errorOccurred = false;
            try {
                card_1.Card.validatePower(power);
            }
            catch (e) {
                errorOccurred = true;
            }
            chai_1.expect(errorOccurred).to.be.false;
        });
        it("should allow an infinity value", function () {
            var power = enums_1.Powers.Infinity;
            var errorOccurred = false;
            try {
                card_1.Card.validatePower(power);
            }
            catch (e) {
                errorOccurred = true;
            }
            chai_1.expect(errorOccurred).to.be.false;
        });
        it("should allow a star squared value", function () {
            var power = enums_1.Powers.StarSquared;
            var errorOccurred = false;
            try {
                card_1.Card.validatePower(power);
            }
            catch (e) {
                errorOccurred = true;
            }
            chai_1.expect(errorOccurred).to.be.false;
        });
        it("should allow a question mark value", function () {
            var power = enums_1.Powers.QuestionMark;
            var errorOccurred = false;
            try {
                card_1.Card.validatePower(power);
            }
            catch (e) {
                errorOccurred = true;
            }
            chai_1.expect(errorOccurred).to.be.false;
        });
        it("should allow a zero value", function () {
            var power = enums_1.Powers.Zero;
            var errorOccurred = false;
            try {
                card_1.Card.validatePower(power);
            }
            catch (e) {
                errorOccurred = true;
            }
            chai_1.expect(errorOccurred).to.be.false;
        });
        it("should allow a plus zero value", function () {
            var power = enums_1.Powers.PlusZero;
            var errorOccurred = false;
            try {
                card_1.Card.validatePower(power);
            }
            catch (e) {
                errorOccurred = true;
            }
            chai_1.expect(errorOccurred).to.be.false;
        });
        it("should allow a one half value", function () {
            var power = enums_1.Powers.OneHalf;
            var errorOccurred = false;
            try {
                card_1.Card.validatePower(power);
            }
            catch (e) {
                errorOccurred = true;
            }
            chai_1.expect(errorOccurred).to.be.false;
        });
        it("should allow a plus one value", function () {
            var power = enums_1.Powers.PlusOne;
            var errorOccurred = false;
            try {
                card_1.Card.validatePower(power);
            }
            catch (e) {
                errorOccurred = true;
            }
            chai_1.expect(errorOccurred).to.be.false;
        });
        it("should allow a one value", function () {
            var power = enums_1.Powers.One;
            var errorOccurred = false;
            try {
                card_1.Card.validatePower(power);
            }
            catch (e) {
                errorOccurred = true;
            }
            chai_1.expect(errorOccurred).to.be.false;
        });
        it("should allow a one plus star value", function () {
            var power = enums_1.Powers.OnePlusStar;
            var errorOccurred = false;
            try {
                card_1.Card.validatePower(power);
            }
            catch (e) {
                errorOccurred = true;
            }
            chai_1.expect(errorOccurred).to.be.false;
        });
        it("should allow a one and one half value", function () {
            var power = enums_1.Powers.OneAndOneHalf;
            var errorOccurred = false;
            try {
                card_1.Card.validatePower(power);
            }
            catch (e) {
                errorOccurred = true;
            }
            chai_1.expect(errorOccurred).to.be.false;
        });
        it("should allow a two value", function () {
            var power = enums_1.Powers.Two;
            var errorOccurred = false;
            try {
                card_1.Card.validatePower(power);
            }
            catch (e) {
                errorOccurred = true;
            }
            chai_1.expect(errorOccurred).to.be.false;
        });
        it("should allow a two plus star value", function () {
            var power = enums_1.Powers.TwoPlusStar;
            var errorOccurred = false;
            try {
                card_1.Card.validatePower(power);
            }
            catch (e) {
                errorOccurred = true;
            }
            chai_1.expect(errorOccurred).to.be.false;
        });
        it("should allow a plus two value", function () {
            var power = enums_1.Powers.PlusTwo;
            var errorOccurred = false;
            try {
                card_1.Card.validatePower(power);
            }
            catch (e) {
                errorOccurred = true;
            }
            chai_1.expect(errorOccurred).to.be.false;
        });
        it("should allow a two and one half value", function () {
            var power = enums_1.Powers.TwoAndOneHalf;
            var errorOccurred = false;
            try {
                card_1.Card.validatePower(power);
            }
            catch (e) {
                errorOccurred = true;
            }
            chai_1.expect(errorOccurred).to.be.false;
        });
        it("should allow a plus three value", function () {
            var power = enums_1.Powers.PlusThree;
            var errorOccurred = false;
            try {
                card_1.Card.validatePower(power);
            }
            catch (e) {
                errorOccurred = true;
            }
            chai_1.expect(errorOccurred).to.be.false;
        });
        it("should allow a three value", function () {
            var power = enums_1.Powers.Three;
            var errorOccurred = false;
            try {
                card_1.Card.validatePower(power);
            }
            catch (e) {
                errorOccurred = true;
            }
            chai_1.expect(errorOccurred).to.be.false;
        });
        it("should allow a three and one half value", function () {
            var power = enums_1.Powers.ThreeAndOneHalf;
            var errorOccurred = false;
            try {
                card_1.Card.validatePower(power);
            }
            catch (e) {
                errorOccurred = true;
            }
            chai_1.expect(errorOccurred).to.be.false;
        });
        it("should allow a plus four value", function () {
            var power = enums_1.Powers.PlusFour;
            var errorOccurred = false;
            try {
                card_1.Card.validatePower(power);
            }
            catch (e) {
                errorOccurred = true;
            }
            chai_1.expect(errorOccurred).to.be.false;
        });
        it("should allow a four value", function () {
            var power = enums_1.Powers.Four;
            var errorOccurred = false;
            try {
                card_1.Card.validatePower(power);
            }
            catch (e) {
                errorOccurred = true;
            }
            chai_1.expect(errorOccurred).to.be.false;
        });
        it("should allow a five value", function () {
            var power = enums_1.Powers.Five;
            var errorOccurred = false;
            try {
                card_1.Card.validatePower(power);
            }
            catch (e) {
                errorOccurred = true;
            }
            chai_1.expect(errorOccurred).to.be.false;
        });
        it("should allow a six value", function () {
            var power = enums_1.Powers.Six;
            var errorOccurred = false;
            try {
                card_1.Card.validatePower(power);
            }
            catch (e) {
                errorOccurred = true;
            }
            chai_1.expect(errorOccurred).to.be.false;
        });
        it("should allow a seven value", function () {
            var power = enums_1.Powers.Seven;
            var errorOccurred = false;
            try {
                card_1.Card.validatePower(power);
            }
            catch (e) {
                errorOccurred = true;
            }
            chai_1.expect(errorOccurred).to.be.false;
        });
        it("should allow a eight value", function () {
            var power = enums_1.Powers.Eight;
            var errorOccurred = false;
            try {
                card_1.Card.validatePower(power);
            }
            catch (e) {
                errorOccurred = true;
            }
            chai_1.expect(errorOccurred).to.be.false;
        });
        it("should allow a nine value", function () {
            var power = enums_1.Powers.Nine;
            var errorOccurred = false;
            try {
                card_1.Card.validatePower(power);
            }
            catch (e) {
                errorOccurred = true;
            }
            chai_1.expect(errorOccurred).to.be.false;
        });
        it("should allow a ten value", function () {
            var power = enums_1.Powers.Ten;
            var errorOccurred = false;
            try {
                card_1.Card.validatePower(power);
            }
            catch (e) {
                errorOccurred = true;
            }
            chai_1.expect(errorOccurred).to.be.false;
        });
        it("should allow a eleven value", function () {
            var power = enums_1.Powers.Eleven;
            var errorOccurred = false;
            try {
                card_1.Card.validatePower(power);
            }
            catch (e) {
                errorOccurred = true;
            }
            chai_1.expect(errorOccurred).to.be.false;
        });
        it("should allow a twelve value", function () {
            var power = enums_1.Powers.Twelve;
            var errorOccurred = false;
            try {
                card_1.Card.validatePower(power);
            }
            catch (e) {
                errorOccurred = true;
            }
            chai_1.expect(errorOccurred).to.be.false;
        });
        it("should allow a thirteen value", function () {
            var power = enums_1.Powers.Thirteen;
            var errorOccurred = false;
            try {
                card_1.Card.validatePower(power);
            }
            catch (e) {
                errorOccurred = true;
            }
            chai_1.expect(errorOccurred).to.be.false;
        });
        it("should allow a fifteen value", function () {
            var power = enums_1.Powers.Fifteen;
            var errorOccurred = false;
            try {
                card_1.Card.validatePower(power);
            }
            catch (e) {
                errorOccurred = true;
            }
            chai_1.expect(errorOccurred).to.be.false;
        });
        it("should allow a twenty value", function () {
            var power = enums_1.Powers.Twenty;
            var errorOccurred = false;
            try {
                card_1.Card.validatePower(power);
            }
            catch (e) {
                errorOccurred = true;
            }
            chai_1.expect(errorOccurred).to.be.false;
        });
        it("should allow a ninety-nine value", function () {
            var power = enums_1.Powers.NinetyNine;
            var errorOccurred = false;
            try {
                card_1.Card.validatePower(power);
            }
            catch (e) {
                errorOccurred = true;
            }
            chai_1.expect(errorOccurred).to.be.false;
        });
        it("should not allow a value that is not in the pre-defined list", function () {
            var power = "xxx";
            var errorOccurred = false;
            try {
                card_1.Card.validatePower(power);
            }
            catch (e) {
                errorOccurred = true;
            }
            chai_1.expect(errorOccurred).to.be.true;
        });
    });
    describe("toughness", function () {
        it("should ignore if missing", function () {
            var toughness;
            var errorOccurred = false;
            try {
                card_1.Card.validateToughness(toughness);
            }
            catch (e) {
                errorOccurred = true;
            }
            chai_1.expect(errorOccurred).to.be.false;
        });
        it("should not allow empty", function () {
            var toughness = "";
            var errorOccurred = false;
            try {
                card_1.Card.validateToughness(toughness);
            }
            catch (e) {
                errorOccurred = true;
            }
            chai_1.expect(errorOccurred).to.be.true;
        });
        it("should allow a negative one value", function () {
            var toughness = enums_1.Toughnesses.NegativeOne;
            var errorOccurred = false;
            try {
                card_1.Card.validateToughness(toughness);
            }
            catch (e) {
                errorOccurred = true;
            }
            chai_1.expect(errorOccurred).to.be.false;
        });
        it("should allow a star value", function () {
            var toughness = enums_1.Toughnesses.Star;
            var errorOccurred = false;
            try {
                card_1.Card.validateToughness(toughness);
            }
            catch (e) {
                errorOccurred = true;
            }
            chai_1.expect(errorOccurred).to.be.false;
        });
        it("should allow a star squared value", function () {
            var toughness = enums_1.Toughnesses.StarSquared;
            var errorOccurred = false;
            try {
                card_1.Card.validateToughness(toughness);
            }
            catch (e) {
                errorOccurred = true;
            }
            chai_1.expect(errorOccurred).to.be.false;
        });
        it("should allow a question mark value", function () {
            var toughness = enums_1.Toughnesses.QuestionMark;
            var errorOccurred = false;
            try {
                card_1.Card.validateToughness(toughness);
            }
            catch (e) {
                errorOccurred = true;
            }
            chai_1.expect(errorOccurred).to.be.false;
        });
        it("should allow a zero value", function () {
            var toughness = enums_1.Toughnesses.Zero;
            var errorOccurred = false;
            try {
                card_1.Card.validateToughness(toughness);
            }
            catch (e) {
                errorOccurred = true;
            }
            chai_1.expect(errorOccurred).to.be.false;
        });
        it("should allow a minus zero value", function () {
            var toughness = enums_1.Toughnesses.MinusZero;
            var errorOccurred = false;
            try {
                card_1.Card.validateToughness(toughness);
            }
            catch (e) {
                errorOccurred = true;
            }
            chai_1.expect(errorOccurred).to.be.false;
        });
        it("should allow a plus zero value", function () {
            var toughness = enums_1.Toughnesses.PlusZero;
            var errorOccurred = false;
            try {
                card_1.Card.validateToughness(toughness);
            }
            catch (e) {
                errorOccurred = true;
            }
            chai_1.expect(errorOccurred).to.be.false;
        });
        it("should allow a one half value", function () {
            var toughness = enums_1.Toughnesses.OneHalf;
            var errorOccurred = false;
            try {
                card_1.Card.validateToughness(toughness);
            }
            catch (e) {
                errorOccurred = true;
            }
            chai_1.expect(errorOccurred).to.be.false;
        });
        it("should allow a plus one value", function () {
            var toughness = enums_1.Toughnesses.PlusOne;
            var errorOccurred = false;
            try {
                card_1.Card.validateToughness(toughness);
            }
            catch (e) {
                errorOccurred = true;
            }
            chai_1.expect(errorOccurred).to.be.false;
        });
        it("should allow a one value", function () {
            var toughness = enums_1.Toughnesses.One;
            var errorOccurred = false;
            try {
                card_1.Card.validateToughness(toughness);
            }
            catch (e) {
                errorOccurred = true;
            }
            chai_1.expect(errorOccurred).to.be.false;
        });
        it("should allow a one plus star value", function () {
            var toughness = enums_1.Toughnesses.OnePlusStar;
            var errorOccurred = false;
            try {
                card_1.Card.validateToughness(toughness);
            }
            catch (e) {
                errorOccurred = true;
            }
            chai_1.expect(errorOccurred).to.be.false;
        });
        it("should allow a one and one half value", function () {
            var toughness = enums_1.Toughnesses.OneAndOneHalf;
            var errorOccurred = false;
            try {
                card_1.Card.validateToughness(toughness);
            }
            catch (e) {
                errorOccurred = true;
            }
            chai_1.expect(errorOccurred).to.be.false;
        });
        it("should allow a two value", function () {
            var toughness = enums_1.Toughnesses.Two;
            var errorOccurred = false;
            try {
                card_1.Card.validateToughness(toughness);
            }
            catch (e) {
                errorOccurred = true;
            }
            chai_1.expect(errorOccurred).to.be.false;
        });
        it("should allow a two plus star value", function () {
            var toughness = enums_1.Toughnesses.TwoPlusStar;
            var errorOccurred = false;
            try {
                card_1.Card.validateToughness(toughness);
            }
            catch (e) {
                errorOccurred = true;
            }
            chai_1.expect(errorOccurred).to.be.false;
        });
        it("should allow a plus two value", function () {
            var toughness = enums_1.Toughnesses.PlusTwo;
            var errorOccurred = false;
            try {
                card_1.Card.validateToughness(toughness);
            }
            catch (e) {
                errorOccurred = true;
            }
            chai_1.expect(errorOccurred).to.be.false;
        });
        it("should allow a two and one half value", function () {
            var toughness = enums_1.Toughnesses.TwoAndOneHalf;
            var errorOccurred = false;
            try {
                card_1.Card.validateToughness(toughness);
            }
            catch (e) {
                errorOccurred = true;
            }
            chai_1.expect(errorOccurred).to.be.false;
        });
        it("should allow a plus three value", function () {
            var toughness = enums_1.Toughnesses.PlusThree;
            var errorOccurred = false;
            try {
                card_1.Card.validateToughness(toughness);
            }
            catch (e) {
                errorOccurred = true;
            }
            chai_1.expect(errorOccurred).to.be.false;
        });
        it("should allow a three value", function () {
            var toughness = enums_1.Toughnesses.Three;
            var errorOccurred = false;
            try {
                card_1.Card.validateToughness(toughness);
            }
            catch (e) {
                errorOccurred = true;
            }
            chai_1.expect(errorOccurred).to.be.false;
        });
        it("should allow a three and one half value", function () {
            var toughness = enums_1.Toughnesses.ThreeAndOneHalf;
            var errorOccurred = false;
            try {
                card_1.Card.validateToughness(toughness);
            }
            catch (e) {
                errorOccurred = true;
            }
            chai_1.expect(errorOccurred).to.be.false;
        });
        it("should allow a plus four value", function () {
            var toughness = enums_1.Toughnesses.PlusFour;
            var errorOccurred = false;
            try {
                card_1.Card.validateToughness(toughness);
            }
            catch (e) {
                errorOccurred = true;
            }
            chai_1.expect(errorOccurred).to.be.false;
        });
        it("should allow a four value", function () {
            var toughness = enums_1.Toughnesses.Four;
            var errorOccurred = false;
            try {
                card_1.Card.validateToughness(toughness);
            }
            catch (e) {
                errorOccurred = true;
            }
            chai_1.expect(errorOccurred).to.be.false;
        });
        it("should allow a five value", function () {
            var toughness = enums_1.Toughnesses.Five;
            var errorOccurred = false;
            try {
                card_1.Card.validateToughness(toughness);
            }
            catch (e) {
                errorOccurred = true;
            }
            chai_1.expect(errorOccurred).to.be.false;
        });
        it("should allow a six value", function () {
            var toughness = enums_1.Toughnesses.Six;
            var errorOccurred = false;
            try {
                card_1.Card.validateToughness(toughness);
            }
            catch (e) {
                errorOccurred = true;
            }
            chai_1.expect(errorOccurred).to.be.false;
        });
        it("should allow a seven value", function () {
            var toughness = enums_1.Toughnesses.Seven;
            var errorOccurred = false;
            try {
                card_1.Card.validateToughness(toughness);
            }
            catch (e) {
                errorOccurred = true;
            }
            chai_1.expect(errorOccurred).to.be.false;
        });
        it("should allow an eight value", function () {
            var toughness = enums_1.Toughnesses.Eight;
            var errorOccurred = false;
            try {
                card_1.Card.validateToughness(toughness);
            }
            catch (e) {
                errorOccurred = true;
            }
            chai_1.expect(errorOccurred).to.be.false;
        });
        it("should allow a nine value", function () {
            var toughness = enums_1.Toughnesses.Nine;
            var errorOccurred = false;
            try {
                card_1.Card.validateToughness(toughness);
            }
            catch (e) {
                errorOccurred = true;
            }
            chai_1.expect(errorOccurred).to.be.false;
        });
        it("should allow a ten value", function () {
            var toughness = enums_1.Toughnesses.Ten;
            var errorOccurred = false;
            try {
                card_1.Card.validateToughness(toughness);
            }
            catch (e) {
                errorOccurred = true;
            }
            chai_1.expect(errorOccurred).to.be.false;
        });
        it("should allow an eleven value", function () {
            var toughness = enums_1.Toughnesses.Eleven;
            var errorOccurred = false;
            try {
                card_1.Card.validateToughness(toughness);
            }
            catch (e) {
                errorOccurred = true;
            }
            chai_1.expect(errorOccurred).to.be.false;
        });
        it("should allow a twelve value", function () {
            var toughness = enums_1.Toughnesses.Twelve;
            var errorOccurred = false;
            try {
                card_1.Card.validateToughness(toughness);
            }
            catch (e) {
                errorOccurred = true;
            }
            chai_1.expect(errorOccurred).to.be.false;
        });
        it("should allow a thirteen value", function () {
            var toughness = enums_1.Toughnesses.Thirteen;
            var errorOccurred = false;
            try {
                card_1.Card.validateToughness(toughness);
            }
            catch (e) {
                errorOccurred = true;
            }
            chai_1.expect(errorOccurred).to.be.false;
        });
        it("should allow a fourteen value", function () {
            var toughness = enums_1.Toughnesses.Fourteen;
            var errorOccurred = false;
            try {
                card_1.Card.validateToughness(toughness);
            }
            catch (e) {
                errorOccurred = true;
            }
            chai_1.expect(errorOccurred).to.be.false;
        });
        it("should allow a fifteen value", function () {
            var toughness = enums_1.Toughnesses.Fifteen;
            var errorOccurred = false;
            try {
                card_1.Card.validateToughness(toughness);
            }
            catch (e) {
                errorOccurred = true;
            }
            chai_1.expect(errorOccurred).to.be.false;
        });
        it("should allow a twenty value", function () {
            var toughness = enums_1.Toughnesses.Twenty;
            var errorOccurred = false;
            try {
                card_1.Card.validateToughness(toughness);
            }
            catch (e) {
                errorOccurred = true;
            }
            chai_1.expect(errorOccurred).to.be.false;
        });
        it("should allow a ninety-nine value", function () {
            var toughness = enums_1.Toughnesses.NinetyNine;
            var errorOccurred = false;
            try {
                card_1.Card.validateToughness(toughness);
            }
            catch (e) {
                errorOccurred = true;
            }
            chai_1.expect(errorOccurred).to.be.false;
        });
        it("should not allow a value that is not in the pre-defined list", function () {
            var toughness = "xxx";
            var errorOccurred = false;
            try {
                card_1.Card.validateToughness(toughness);
            }
            catch (e) {
                errorOccurred = true;
            }
            chai_1.expect(errorOccurred).to.be.true;
        });
    });
    describe("loyalty", function () {
        it("should ignore if missing", function () {
            var loyalty;
            var errorOccurred = false;
            try {
                card_1.Card.validateLoyalty(loyalty);
            }
            catch (e) {
                errorOccurred = true;
            }
            chai_1.expect(errorOccurred).to.be.false;
        });
        it("should not allow empty", function () {
            var loyalty = "";
            var errorOccurred = false;
            try {
                card_1.Card.validateLoyalty(loyalty);
            }
            catch (e) {
                errorOccurred = true;
            }
            chai_1.expect(errorOccurred).to.be.true;
        });
        it("should allow a X value", function () {
            var loyalty = enums_1.Loyalties.X;
            var errorOccurred = false;
            try {
                card_1.Card.validateLoyalty(loyalty);
            }
            catch (e) {
                errorOccurred = true;
            }
            chai_1.expect(errorOccurred).to.be.false;
        });
        it("should allow a 1d4+1 value", function () {
            var loyalty = enums_1.Loyalties.OneDFourPlusOne;
            var errorOccurred = false;
            try {
                card_1.Card.validateLoyalty(loyalty);
            }
            catch (e) {
                errorOccurred = true;
            }
            chai_1.expect(errorOccurred).to.be.false;
        });
        it("should allow a two value", function () {
            var loyalty = enums_1.Loyalties.Two;
            var errorOccurred = false;
            try {
                card_1.Card.validateLoyalty(loyalty);
            }
            catch (e) {
                errorOccurred = true;
            }
            chai_1.expect(errorOccurred).to.be.false;
        });
        it("should allow a three value", function () {
            var loyalty = enums_1.Loyalties.Three;
            var errorOccurred = false;
            try {
                card_1.Card.validateLoyalty(loyalty);
            }
            catch (e) {
                errorOccurred = true;
            }
            chai_1.expect(errorOccurred).to.be.false;
        });
        it("should allow a four value", function () {
            var loyalty = enums_1.Loyalties.Four;
            var errorOccurred = false;
            try {
                card_1.Card.validateLoyalty(loyalty);
            }
            catch (e) {
                errorOccurred = true;
            }
            chai_1.expect(errorOccurred).to.be.false;
        });
        it("should allow a five value", function () {
            var loyalty = enums_1.Loyalties.Five;
            var errorOccurred = false;
            try {
                card_1.Card.validateLoyalty(loyalty);
            }
            catch (e) {
                errorOccurred = true;
            }
            chai_1.expect(errorOccurred).to.be.false;
        });
        it("should allow a six value", function () {
            var loyalty = enums_1.Loyalties.Six;
            var errorOccurred = false;
            try {
                card_1.Card.validateLoyalty(loyalty);
            }
            catch (e) {
                errorOccurred = true;
            }
            chai_1.expect(errorOccurred).to.be.false;
        });
        it("should allow a seven value", function () {
            var loyalty = enums_1.Loyalties.Seven;
            var errorOccurred = false;
            try {
                card_1.Card.validateLoyalty(loyalty);
            }
            catch (e) {
                errorOccurred = true;
            }
            chai_1.expect(errorOccurred).to.be.false;
        });
        it("should allow a twenty value", function () {
            var loyalty = enums_1.Loyalties.Twenty;
            var errorOccurred = false;
            try {
                card_1.Card.validateLoyalty(loyalty);
            }
            catch (e) {
                errorOccurred = true;
            }
            chai_1.expect(errorOccurred).to.be.false;
        });
        it("should not allow a value that is not in the pre-defined list", function () {
            var loyalty = "xxx";
            var errorOccurred = false;
            try {
                card_1.Card.validateLoyalty(loyalty);
            }
            catch (e) {
                errorOccurred = true;
            }
            chai_1.expect(errorOccurred).to.be.true;
        });
    });
    describe("life_modifier", function () {
        it("should ignore if missing", function () {
            var lifeModifier;
            var errorOccurred = false;
            try {
                card_1.Card.validateLifeModifier(lifeModifier);
            }
            catch (e) {
                errorOccurred = true;
            }
            chai_1.expect(errorOccurred).to.be.false;
        });
        it("should not allow empty", function () {
            var lifeModifier = "";
            var errorOccurred = false;
            try {
                card_1.Card.validateLifeModifier(lifeModifier);
            }
            catch (e) {
                errorOccurred = true;
            }
            chai_1.expect(errorOccurred).to.be.true;
        });
        it("should allow string", function () {
            var lifeModifier = "+2";
            var errorOccurred = false;
            try {
                card_1.Card.validateLifeModifier(lifeModifier);
            }
            catch (e) {
                errorOccurred = true;
            }
            chai_1.expect(errorOccurred).to.be.false;
        });
    });
    describe("hand_modifier", function () {
        it("should ignore if missing", function () {
            var handModifier;
            var errorOccurred = false;
            try {
                card_1.Card.validateHandModifier(handModifier);
            }
            catch (e) {
                errorOccurred = true;
            }
            chai_1.expect(errorOccurred).to.be.false;
        });
        it("should not allow empty", function () {
            var handModifier = "";
            var errorOccurred = false;
            try {
                card_1.Card.validateHandModifier(handModifier);
            }
            catch (e) {
                errorOccurred = true;
            }
            chai_1.expect(errorOccurred).to.be.true;
        });
        it("should allow string", function () {
            var handModifier = "-1";
            var errorOccurred = false;
            try {
                card_1.Card.validateHandModifier(handModifier);
            }
            catch (e) {
                errorOccurred = true;
            }
            chai_1.expect(errorOccurred).to.be.false;
        });
    });
    describe("colors", function () {
        it("should error if missing", function () {
            var colors;
            var errorOccurred = false;
            try {
                card_1.Card.validateColors(colors);
            }
            catch (e) {
                errorOccurred = true;
            }
            chai_1.expect(errorOccurred).to.be.true;
        });
        it("should error if not an array", function () {
            var colors = enums_1.Colors.White;
            var errorOccurred = false;
            try {
                card_1.Card.validateColors(colors);
            }
            catch (e) {
                errorOccurred = true;
            }
            chai_1.expect(errorOccurred).to.be.true;
        });
        it("should allow an empty array", function () {
            var colors = [];
            var errorOccurred = false;
            try {
                card_1.Card.validateColors(colors);
            }
            catch (e) {
                errorOccurred = true;
            }
            chai_1.expect(errorOccurred).to.be.false;
        });
        it("should allow white ('W') as a valid color", function () {
            var colors = [enums_1.Colors.White];
            var errorOccurred = false;
            try {
                card_1.Card.validateColors(colors);
            }
            catch (e) {
                errorOccurred = true;
            }
            chai_1.expect(errorOccurred).to.be.false;
        });
        it("should allow blue ('U') as a valid color", function () {
            var colors = [enums_1.Colors.Blue];
            var errorOccurred = false;
            try {
                card_1.Card.validateColors(colors);
            }
            catch (e) {
                errorOccurred = true;
            }
            chai_1.expect(errorOccurred).to.be.false;
        });
        it("should allow black ('B') as a valid color", function () {
            var colors = [enums_1.Colors.Black];
            var errorOccurred = false;
            try {
                card_1.Card.validateColors(colors);
            }
            catch (e) {
                errorOccurred = true;
            }
            chai_1.expect(errorOccurred).to.be.false;
        });
        it("should allow red ('R') as a valid color", function () {
            var colors = [enums_1.Colors.Red];
            var errorOccurred = false;
            try {
                card_1.Card.validateColors(colors);
            }
            catch (e) {
                errorOccurred = true;
            }
            chai_1.expect(errorOccurred).to.be.false;
        });
        it("should allow green ('G') as a valid color", function () {
            var colors = [enums_1.Colors.Green];
            var errorOccurred = false;
            try {
                card_1.Card.validateColors(colors);
            }
            catch (e) {
                errorOccurred = true;
            }
            chai_1.expect(errorOccurred).to.be.false;
        });
        it("should allow multiple unique color values", function () {
            var colors = [enums_1.Colors.White, enums_1.Colors.Black];
            var errorOccurred = false;
            try {
                card_1.Card.validateColors(colors);
            }
            catch (e) {
                errorOccurred = true;
            }
            chai_1.expect(errorOccurred).to.be.false;
        });
        it("should reject multiple white color values", function () {
            var colors = [enums_1.Colors.White, enums_1.Colors.White];
            var errorOccurred = false;
            try {
                card_1.Card.validateColors(colors);
            }
            catch (e) {
                errorOccurred = true;
            }
            chai_1.expect(errorOccurred).to.be.true;
        });
        it("should reject multiple blue color values", function () {
            var colors = [enums_1.Colors.Blue, enums_1.Colors.Blue];
            var errorOccurred = false;
            try {
                card_1.Card.validateColors(colors);
            }
            catch (e) {
                errorOccurred = true;
            }
            chai_1.expect(errorOccurred).to.be.true;
        });
        it("should reject multiple black color values", function () {
            var colors = [enums_1.Colors.Black, enums_1.Colors.Black];
            var errorOccurred = false;
            try {
                card_1.Card.validateColors(colors);
            }
            catch (e) {
                errorOccurred = true;
            }
            chai_1.expect(errorOccurred).to.be.true;
        });
        it("should reject multiple red color values", function () {
            var colors = [enums_1.Colors.Red, enums_1.Colors.Red];
            var errorOccurred = false;
            try {
                card_1.Card.validateColors(colors);
            }
            catch (e) {
                errorOccurred = true;
            }
            chai_1.expect(errorOccurred).to.be.true;
        });
        it("should reject multiple green color values", function () {
            var colors = [enums_1.Colors.Green, enums_1.Colors.Green];
            var errorOccurred = false;
            try {
                card_1.Card.validateColors(colors);
            }
            catch (e) {
                errorOccurred = true;
            }
            chai_1.expect(errorOccurred).to.be.true;
        });
        it("should reject colors not in the pre-defined list of values", function () {
            var colors = ["?"];
            var errorOccurred = false;
            try {
                card_1.Card.validateColors(colors);
            }
            catch (e) {
                errorOccurred = true;
            }
            chai_1.expect(errorOccurred).to.be.true;
        });
    });
    describe("color_indicator", function () {
        it("should ignore if missing", function () {
            var colorIdentity;
            var errorOccurred = false;
            try {
                card_1.Card.validateColorIndicator(colorIdentity);
            }
            catch (e) {
                errorOccurred = true;
            }
            chai_1.expect(errorOccurred).to.be.false;
        });
        it("should error if not an array", function () {
            var colorIdentity = enums_1.Colors.White;
            var errorOccurred = false;
            try {
                card_1.Card.validateColorIndicator(colorIdentity);
            }
            catch (e) {
                errorOccurred = true;
            }
            chai_1.expect(errorOccurred).to.be.true;
        });
        it("should allow an empty array", function () {
            var colorIdentity = [];
            var errorOccurred = false;
            try {
                card_1.Card.validateColorIndicator(colorIdentity);
            }
            catch (e) {
                errorOccurred = true;
            }
            chai_1.expect(errorOccurred).to.be.false;
        });
        it("should allow white ('W') as a valid color", function () {
            var colorIdentity = [enums_1.Colors.White];
            var errorOccurred = false;
            try {
                card_1.Card.validateColorIndicator(colorIdentity);
            }
            catch (e) {
                errorOccurred = true;
            }
            chai_1.expect(errorOccurred).to.be.false;
        });
        it("should allow blue ('U') as a valid color", function () {
            var colorIdentity = [enums_1.Colors.Blue];
            var errorOccurred = false;
            try {
                card_1.Card.validateColorIndicator(colorIdentity);
            }
            catch (e) {
                errorOccurred = true;
            }
            chai_1.expect(errorOccurred).to.be.false;
        });
        it("should allow black ('B') as a valid color", function () {
            var colorIdentity = [enums_1.Colors.Black];
            var errorOccurred = false;
            try {
                card_1.Card.validateColorIndicator(colorIdentity);
            }
            catch (e) {
                errorOccurred = true;
            }
            chai_1.expect(errorOccurred).to.be.false;
        });
        it("should allow red ('R') as a valid color", function () {
            var colorIdentity = [enums_1.Colors.Red];
            var errorOccurred = false;
            try {
                card_1.Card.validateColorIndicator(colorIdentity);
            }
            catch (e) {
                errorOccurred = true;
            }
            chai_1.expect(errorOccurred).to.be.false;
        });
        it("should allow green ('G') as a valid color", function () {
            var colorIdentity = [enums_1.Colors.Green];
            var errorOccurred = false;
            try {
                card_1.Card.validateColorIndicator(colorIdentity);
            }
            catch (e) {
                errorOccurred = true;
            }
            chai_1.expect(errorOccurred).to.be.false;
        });
        it("should allow multiple unique color values", function () {
            var colorIdentity = [enums_1.Colors.White, enums_1.Colors.Black];
            var errorOccurred = false;
            try {
                card_1.Card.validateColorIndicator(colorIdentity);
            }
            catch (e) {
                errorOccurred = true;
            }
            chai_1.expect(errorOccurred).to.be.false;
        });
        it("should reject multiple white color values", function () {
            var colorIdentity = [enums_1.Colors.White, enums_1.Colors.White];
            var errorOccurred = false;
            try {
                card_1.Card.validateColorIndicator(colorIdentity);
            }
            catch (e) {
                errorOccurred = true;
            }
            chai_1.expect(errorOccurred).to.be.true;
        });
        it("should reject multiple blue color values", function () {
            var colorIdentity = [enums_1.Colors.Blue, enums_1.Colors.Blue];
            var errorOccurred = false;
            try {
                card_1.Card.validateColorIndicator(colorIdentity);
            }
            catch (e) {
                errorOccurred = true;
            }
            chai_1.expect(errorOccurred).to.be.true;
        });
        it("should reject multiple black color values", function () {
            var colorIdentity = [enums_1.Colors.Black, enums_1.Colors.Black];
            var errorOccurred = false;
            try {
                card_1.Card.validateColorIndicator(colorIdentity);
            }
            catch (e) {
                errorOccurred = true;
            }
            chai_1.expect(errorOccurred).to.be.true;
        });
        it("should reject multiple red color values", function () {
            var colorIdentity = [enums_1.Colors.Red, enums_1.Colors.Red];
            var errorOccurred = false;
            try {
                card_1.Card.validateColorIndicator(colorIdentity);
            }
            catch (e) {
                errorOccurred = true;
            }
            chai_1.expect(errorOccurred).to.be.true;
        });
        it("should reject multiple green color values", function () {
            var colorIdentity = [enums_1.Colors.Green, enums_1.Colors.Green];
            var errorOccurred = false;
            try {
                card_1.Card.validateColorIndicator(colorIdentity);
            }
            catch (e) {
                errorOccurred = true;
            }
            chai_1.expect(errorOccurred).to.be.true;
        });
        it("should reject colors not in the pre-defined list of values", function () {
            var colorIdentity = ["?"];
            var errorOccurred = false;
            try {
                card_1.Card.validateColorIndicator(colorIdentity);
            }
            catch (e) {
                errorOccurred = true;
            }
            chai_1.expect(errorOccurred).to.be.true;
        });
    });
    describe("color_identity", function () {
        it("should error if missing", function () {
            var colors;
            var errorOccurred = false;
            try {
                card_1.Card.validateColorIdentity(colors);
            }
            catch (e) {
                errorOccurred = true;
            }
            chai_1.expect(errorOccurred).to.be.true;
        });
        it("should error if not an array", function () {
            var colors = enums_1.Colors.White;
            var errorOccurred = false;
            try {
                card_1.Card.validateColorIdentity(colors);
            }
            catch (e) {
                errorOccurred = true;
            }
            chai_1.expect(errorOccurred).to.be.true;
        });
        it("should allow an empty array", function () {
            var colors = [];
            var errorOccurred = false;
            try {
                card_1.Card.validateColorIdentity(colors);
            }
            catch (e) {
                errorOccurred = true;
            }
            chai_1.expect(errorOccurred).to.be.false;
        });
        it("should allow white ('W') as a valid color", function () {
            var colors = [enums_1.Colors.White];
            var errorOccurred = false;
            try {
                card_1.Card.validateColorIdentity(colors);
            }
            catch (e) {
                errorOccurred = true;
            }
            chai_1.expect(errorOccurred).to.be.false;
        });
        it("should allow blue ('U') as a valid color", function () {
            var colors = [enums_1.Colors.Blue];
            var errorOccurred = false;
            try {
                card_1.Card.validateColorIdentity(colors);
            }
            catch (e) {
                errorOccurred = true;
            }
            chai_1.expect(errorOccurred).to.be.false;
        });
        it("should allow black ('B') as a valid color", function () {
            var colors = [enums_1.Colors.Black];
            var errorOccurred = false;
            try {
                card_1.Card.validateColorIdentity(colors);
            }
            catch (e) {
                errorOccurred = true;
            }
            chai_1.expect(errorOccurred).to.be.false;
        });
        it("should allow red ('R') as a valid color", function () {
            var colors = [enums_1.Colors.Red];
            var errorOccurred = false;
            try {
                card_1.Card.validateColorIdentity(colors);
            }
            catch (e) {
                errorOccurred = true;
            }
            chai_1.expect(errorOccurred).to.be.false;
        });
        it("should allow green ('G') as a valid color", function () {
            var colors = [enums_1.Colors.Green];
            var errorOccurred = false;
            try {
                card_1.Card.validateColorIdentity(colors);
            }
            catch (e) {
                errorOccurred = true;
            }
            chai_1.expect(errorOccurred).to.be.false;
        });
        it("should allow multiple unique color values", function () {
            var colors = [enums_1.Colors.White, enums_1.Colors.Black];
            var errorOccurred = false;
            try {
                card_1.Card.validateColorIdentity(colors);
            }
            catch (e) {
                errorOccurred = true;
            }
            chai_1.expect(errorOccurred).to.be.false;
        });
        it("should reject multiple white color values", function () {
            var colors = [enums_1.Colors.White, enums_1.Colors.White];
            var errorOccurred = false;
            try {
                card_1.Card.validateColorIdentity(colors);
            }
            catch (e) {
                errorOccurred = true;
            }
            chai_1.expect(errorOccurred).to.be.true;
        });
        it("should reject multiple blue color values", function () {
            var colors = [enums_1.Colors.Blue, enums_1.Colors.Blue];
            var errorOccurred = false;
            try {
                card_1.Card.validateColorIdentity(colors);
            }
            catch (e) {
                errorOccurred = true;
            }
            chai_1.expect(errorOccurred).to.be.true;
        });
        it("should reject multiple black color values", function () {
            var colors = [enums_1.Colors.Black, enums_1.Colors.Black];
            var errorOccurred = false;
            try {
                card_1.Card.validateColorIdentity(colors);
            }
            catch (e) {
                errorOccurred = true;
            }
            chai_1.expect(errorOccurred).to.be.true;
        });
        it("should reject multiple red color values", function () {
            var colors = [enums_1.Colors.Red, enums_1.Colors.Red];
            var errorOccurred = false;
            try {
                card_1.Card.validateColorIdentity(colors);
            }
            catch (e) {
                errorOccurred = true;
            }
            chai_1.expect(errorOccurred).to.be.true;
        });
        it("should reject multiple green color values", function () {
            var colors = [enums_1.Colors.Green, enums_1.Colors.Green];
            var errorOccurred = false;
            try {
                card_1.Card.validateColorIdentity(colors);
            }
            catch (e) {
                errorOccurred = true;
            }
            chai_1.expect(errorOccurred).to.be.true;
        });
        it("should reject colors not in the pre-defined list of values", function () {
            var colors = ["?"];
            var errorOccurred = false;
            try {
                card_1.Card.validateColorIdentity(colors);
            }
            catch (e) {
                errorOccurred = true;
            }
            chai_1.expect(errorOccurred).to.be.true;
        });
    });
    describe("related_cards", function () {
        it("should ignore if missing", function () {
            var relatedCards;
            var errorOccurred = false;
            try {
                card_1.Card.validateRelatedCards(relatedCards);
            }
            catch (e) {
                errorOccurred = true;
            }
            chai_1.expect(errorOccurred).to.be.false;
        });
        it("should error if not Array", function () {
            var relatedCards = {};
            var errorOccurred = false;
            try {
                card_1.Card.validateRelatedCards(relatedCards);
            }
            catch (e) {
                errorOccurred = true;
            }
            chai_1.expect(errorOccurred).to.be.true;
        });
        it("should error if Array is empty", function () {
            var relatedCards = [];
            var errorOccurred = false;
            try {
                card_1.Card.validateRelatedCards(relatedCards);
            }
            catch (e) {
                errorOccurred = true;
            }
            chai_1.expect(errorOccurred).to.be.true;
        });
        it("should validate related card name", function () {
            var relatedCards = [
                {
                    name: "Bruna, the Fading Light",
                    set_code: "v17",
                    collector_number: "5a"
                }
            ];
            var errorOccurred = false;
            var validateNameStub = sandbox.stub(card_1.Card, "validateName");
            try {
                card_1.Card.validateRelatedCards(relatedCards);
            }
            catch (e) {
                errorOccurred = true;
            }
            chai_1.expect(errorOccurred).to.be.false;
            chai_1.expect(validateNameStub.called).to.be.true;
            validateNameStub.restore();
        });
        it("should validate related card set_code", function () {
            var relatedCards = [
                {
                    name: "Bruna, the Fading Light",
                    set_code: "v17",
                    collector_number: "5a"
                }
            ];
            var errorOccurred = false;
            var validateSetCodeStub = sandbox.stub(card_1.Card, "validateSetCode");
            try {
                card_1.Card.validateRelatedCards(relatedCards);
            }
            catch (e) {
                errorOccurred = true;
            }
            chai_1.expect(errorOccurred).to.be.false;
            chai_1.expect(validateSetCodeStub.called).to.be.true;
            validateSetCodeStub.restore();
        });
        it("should validate related card collector_number", function () {
            var relatedCards = [
                {
                    name: "Bruna, the Fading Light",
                    set_code: "v17",
                    collector_number: "5a"
                }
            ];
            var errorOccurred = false;
            var validateCollectorNumberStub = sandbox.stub(card_1.Card, "validateCollectorNumber");
            try {
                card_1.Card.validateRelatedCards(relatedCards);
            }
            catch (e) {
                errorOccurred = true;
            }
            chai_1.expect(errorOccurred).to.be.false;
            chai_1.expect(validateCollectorNumberStub.called).to.be.true;
            validateCollectorNumberStub.restore();
        });
        it("should rethrow error if error in related card name", function () {
            var relatedCards = [
                {
                    name: "Bruna, the Fading Light",
                    set_code: "v17",
                    collector_number: "5a"
                }
            ];
            var errorOccurred = false;
            var validateNameStub = sandbox.stub(card_1.Card, "validateName").callsFake(function () {
                throw new Error("validate name error");
            });
            try {
                card_1.Card.validateRelatedCards(relatedCards);
            }
            catch (e) {
                errorOccurred = true;
            }
            chai_1.expect(errorOccurred).to.be.true;
            chai_1.expect(validateNameStub.called).to.be.true;
            validateNameStub.restore();
        });
        it("should rethrow error if error in related card set_code", function () {
            var relatedCards = [
                {
                    name: "Bruna, the Fading Light",
                    set_code: "v17",
                    collector_number: "5a"
                }
            ];
            var errorOccurred = false;
            var validateSetCodeStub = sandbox.stub(card_1.Card, "validateSetCode").callsFake(function () {
                throw new Error("validate set_code error");
            });
            try {
                card_1.Card.validateRelatedCards(relatedCards);
            }
            catch (e) {
                errorOccurred = true;
            }
            chai_1.expect(errorOccurred).to.be.true;
            chai_1.expect(validateSetCodeStub.called).to.be.true;
            validateSetCodeStub.restore();
        });
        it("should rethrow error if error in related card name", function () {
            var relatedCards = [
                {
                    name: "Bruna, the Fading Light",
                    set_code: "v17",
                    collector_number: "5a"
                }
            ];
            var errorOccurred = false;
            var validateCollectorNumberStub = sandbox.stub(card_1.Card, "validateCollectorNumber").callsFake(function () {
                throw new Error("validate collector_number error");
            });
            try {
                card_1.Card.validateRelatedCards(relatedCards);
            }
            catch (e) {
                errorOccurred = true;
            }
            chai_1.expect(errorOccurred).to.be.true;
            chai_1.expect(validateCollectorNumberStub.called).to.be.true;
            validateCollectorNumberStub.restore();
        });
        it("should allow a single valid related card", function () {
            var relatedCards = [
                {
                    name: "Bruna, the Fading Light",
                    set_code: "v17",
                    collector_number: "5a"
                }
            ];
            var errorOccurred = false;
            try {
                card_1.Card.validateRelatedCards(relatedCards);
            }
            catch (e) {
                errorOccurred = true;
            }
            chai_1.expect(errorOccurred).to.be.false;
        });
        it("should allow multiple valid related cards", function () {
            var relatedCards = [
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
            var errorOccurred = false;
            try {
                card_1.Card.validateRelatedCards(relatedCards);
            }
            catch (e) {
                errorOccurred = true;
            }
            chai_1.expect(errorOccurred).to.be.false;
        });
    });
    describe("card_faces", function () {
        it("should ignore if missing", function () {
            var cardFaces;
            var errorOccurred = false;
            try {
                card_1.Card.validateCardFaces(cardFaces);
            }
            catch (e) {
                errorOccurred = true;
            }
            chai_1.expect(errorOccurred).to.be.false;
        });
        it("should error if not Array", function () {
            var cardFaces = {};
            var errorOccurred = false;
            try {
                card_1.Card.validateCardFaces(cardFaces);
            }
            catch (e) {
                errorOccurred = true;
            }
            chai_1.expect(errorOccurred).to.be.true;
        });
        it("should error if Array is empty", function () {
            var cardFaces = [];
            var errorOccurred = false;
            try {
                card_1.Card.validateCardFaces(cardFaces);
            }
            catch (e) {
                errorOccurred = true;
            }
            chai_1.expect(errorOccurred).to.be.true;
        });
        it("should validate card face name", function () {
            var cardFaces = [
                {
                    name: "Conqueror's Galleon",
                    mana_cost: "{4}",
                    type_line: "Artifact — Vehicle",
                    oracle_text: "When Conqueror's Galleon attacks, exile it at end of combat, then return it to the battlefield transformed under your control. Crew 4 (Tap any number of creatures you control with total power 4 or more: This Vehicle becomes an artifact creature until end of turn.)",
                    colors: [],
                    power: "2",
                    toughness: "10",
                    image_uri: "https://img.scryfall.com/cards/png/en/pxtc/234a.png",
                    color_indicator: [],
                    flavor_text: "flavor text",
                    loyalty: "3"
                }
            ];
            var errorOccurred = false;
            var validateNameStub = sandbox.stub(card_1.Card, "validateName");
            try {
                card_1.Card.validateCardFaces(cardFaces);
            }
            catch (e) {
                errorOccurred = true;
            }
            chai_1.expect(errorOccurred).to.be.false;
            chai_1.expect(validateNameStub.called).to.be.true;
            validateNameStub.restore();
        });
        it("should validate card face type_line", function () {
            var cardFaces = [
                {
                    name: "Conqueror's Galleon",
                    mana_cost: "{4}",
                    type_line: "Artifact — Vehicle",
                    oracle_text: "When Conqueror's Galleon attacks, exile it at end of combat, then return it to the battlefield transformed under your control. Crew 4 (Tap any number of creatures you control with total power 4 or more: This Vehicle becomes an artifact creature until end of turn.)",
                    colors: [],
                    power: "2",
                    toughness: "10",
                    image_uri: "https://img.scryfall.com/cards/png/en/pxtc/234a.png",
                    color_indicator: [],
                    flavor_text: "flavor text",
                    loyalty: "3"
                }
            ];
            var errorOccurred = false;
            var validateTypeLineStub = sandbox.stub(card_1.Card, "validateTypeLine");
            try {
                card_1.Card.validateCardFaces(cardFaces);
            }
            catch (e) {
                errorOccurred = true;
            }
            chai_1.expect(errorOccurred).to.be.false;
            chai_1.expect(validateTypeLineStub.called).to.be.true;
            validateTypeLineStub.restore();
        });
        it("should validate card face oracle_text", function () {
            var cardFaces = [
                {
                    name: "Conqueror's Galleon",
                    mana_cost: "{4}",
                    type_line: "Artifact — Vehicle",
                    oracle_text: "When Conqueror's Galleon attacks, exile it at end of combat, then return it to the battlefield transformed under your control. Crew 4 (Tap any number of creatures you control with total power 4 or more: This Vehicle becomes an artifact creature until end of turn.)",
                    colors: [],
                    power: "2",
                    toughness: "10",
                    image_uri: "https://img.scryfall.com/cards/png/en/pxtc/234a.png",
                    color_indicator: [],
                    flavor_text: "flavor text",
                    loyalty: "3"
                }
            ];
            var errorOccurred = false;
            var validateOracleTextStub = sandbox.stub(card_1.Card, "validateOracleText");
            try {
                card_1.Card.validateCardFaces(cardFaces);
            }
            catch (e) {
                errorOccurred = true;
            }
            chai_1.expect(errorOccurred).to.be.false;
            chai_1.expect(validateOracleTextStub.called).to.be.true;
            validateOracleTextStub.restore();
        });
        it("should validate card face mana_cost", function () {
            var cardFaces = [
                {
                    name: "Conqueror's Galleon",
                    mana_cost: "{4}",
                    type_line: "Artifact — Vehicle",
                    oracle_text: "When Conqueror's Galleon attacks, exile it at end of combat, then return it to the battlefield transformed under your control. Crew 4 (Tap any number of creatures you control with total power 4 or more: This Vehicle becomes an artifact creature until end of turn.)",
                    colors: [],
                    power: "2",
                    toughness: "10",
                    image_uri: "https://img.scryfall.com/cards/png/en/pxtc/234a.png",
                    color_indicator: [],
                    flavor_text: "flavor text",
                    loyalty: "3"
                }
            ];
            var errorOccurred = false;
            var validateManaCostStub = sandbox.stub(card_1.Card, "validateManaCost");
            try {
                card_1.Card.validateCardFaces(cardFaces);
            }
            catch (e) {
                errorOccurred = true;
            }
            chai_1.expect(errorOccurred).to.be.false;
            chai_1.expect(validateManaCostStub.called).to.be.true;
            validateManaCostStub.restore();
        });
        it("should validate card face colors", function () {
            var cardFaces = [
                {
                    name: "Conqueror's Galleon",
                    mana_cost: "{4}",
                    type_line: "Artifact — Vehicle",
                    oracle_text: "When Conqueror's Galleon attacks, exile it at end of combat, then return it to the battlefield transformed under your control. Crew 4 (Tap any number of creatures you control with total power 4 or more: This Vehicle becomes an artifact creature until end of turn.)",
                    colors: [],
                    power: "2",
                    toughness: "10",
                    image_uri: "https://img.scryfall.com/cards/png/en/pxtc/234a.png",
                    color_indicator: [],
                    flavor_text: "flavor text",
                    loyalty: "3"
                }
            ];
            var errorOccurred = false;
            var validateColorsStub = sandbox.stub(card_1.Card, "validateColors");
            try {
                card_1.Card.validateCardFaces(cardFaces);
            }
            catch (e) {
                errorOccurred = true;
            }
            chai_1.expect(errorOccurred).to.be.false;
            chai_1.expect(validateColorsStub.called).to.be.true;
            validateColorsStub.restore();
        });
        it("should validate card face color_indicator", function () {
            var cardFaces = [
                {
                    name: "Conqueror's Galleon",
                    mana_cost: "{4}",
                    type_line: "Artifact — Vehicle",
                    oracle_text: "When Conqueror's Galleon attacks, exile it at end of combat, then return it to the battlefield transformed under your control. Crew 4 (Tap any number of creatures you control with total power 4 or more: This Vehicle becomes an artifact creature until end of turn.)",
                    colors: [],
                    power: "2",
                    toughness: "10",
                    image_uri: "https://img.scryfall.com/cards/png/en/pxtc/234a.png",
                    color_indicator: [],
                    flavor_text: "flavor text",
                    loyalty: "3"
                }
            ];
            var errorOccurred = false;
            var validateColorIndicator = sandbox.stub(card_1.Card, "validateColorIndicator");
            try {
                card_1.Card.validateCardFaces(cardFaces);
            }
            catch (e) {
                errorOccurred = true;
            }
            chai_1.expect(errorOccurred).to.be.false;
            chai_1.expect(validateColorIndicator.called).to.be.true;
            validateColorIndicator.restore();
        });
        it("should validate card face power", function () {
            var cardFaces = [
                {
                    name: "Conqueror's Galleon",
                    mana_cost: "{4}",
                    type_line: "Artifact — Vehicle",
                    oracle_text: "When Conqueror's Galleon attacks, exile it at end of combat, then return it to the battlefield transformed under your control. Crew 4 (Tap any number of creatures you control with total power 4 or more: This Vehicle becomes an artifact creature until end of turn.)",
                    colors: [],
                    power: "2",
                    toughness: "10",
                    image_uri: "https://img.scryfall.com/cards/png/en/pxtc/234a.png",
                    color_indicator: [],
                    flavor_text: "flavor text",
                    loyalty: "3"
                }
            ];
            var errorOccurred = false;
            var validatePowerStub = sandbox.stub(card_1.Card, "validatePower");
            try {
                card_1.Card.validateCardFaces(cardFaces);
            }
            catch (e) {
                errorOccurred = true;
            }
            chai_1.expect(errorOccurred).to.be.false;
            chai_1.expect(validatePowerStub.called).to.be.true;
            validatePowerStub.restore();
        });
        it("should validate card face toughness", function () {
            var cardFaces = [
                {
                    name: "Conqueror's Galleon",
                    mana_cost: "{4}",
                    type_line: "Artifact — Vehicle",
                    oracle_text: "When Conqueror's Galleon attacks, exile it at end of combat, then return it to the battlefield transformed under your control. Crew 4 (Tap any number of creatures you control with total power 4 or more: This Vehicle becomes an artifact creature until end of turn.)",
                    colors: [],
                    power: "2",
                    toughness: "10",
                    image_uri: "https://img.scryfall.com/cards/png/en/pxtc/234a.png",
                    color_indicator: [],
                    flavor_text: "flavor text",
                    loyalty: "3"
                }
            ];
            var errorOccurred = false;
            var validateToughnessStub = sandbox.stub(card_1.Card, "validateToughness");
            try {
                card_1.Card.validateCardFaces(cardFaces);
            }
            catch (e) {
                errorOccurred = true;
            }
            chai_1.expect(errorOccurred).to.be.false;
            chai_1.expect(validateToughnessStub.called).to.be.true;
            validateToughnessStub.restore();
        });
        it("should validate card face loyalty", function () {
            var cardFaces = [
                {
                    name: "Conqueror's Galleon",
                    mana_cost: "{4}",
                    type_line: "Artifact — Vehicle",
                    oracle_text: "When Conqueror's Galleon attacks, exile it at end of combat, then return it to the battlefield transformed under your control. Crew 4 (Tap any number of creatures you control with total power 4 or more: This Vehicle becomes an artifact creature until end of turn.)",
                    colors: [],
                    power: "2",
                    toughness: "10",
                    image_uri: "https://img.scryfall.com/cards/png/en/pxtc/234a.png",
                    color_indicator: [],
                    flavor_text: "flavor text",
                    loyalty: "3"
                }
            ];
            var errorOccurred = false;
            var validateLoyaltyStub = sandbox.stub(card_1.Card, "validateLoyalty");
            try {
                card_1.Card.validateCardFaces(cardFaces);
            }
            catch (e) {
                errorOccurred = true;
            }
            chai_1.expect(errorOccurred).to.be.false;
            chai_1.expect(validateLoyaltyStub.called).to.be.true;
            validateLoyaltyStub.restore();
        });
        it("should validate card face flavor_text", function () {
            var cardFaces = [
                {
                    name: "Conqueror's Galleon",
                    mana_cost: "{4}",
                    type_line: "Artifact — Vehicle",
                    oracle_text: "When Conqueror's Galleon attacks, exile it at end of combat, then return it to the battlefield transformed under your control. Crew 4 (Tap any number of creatures you control with total power 4 or more: This Vehicle becomes an artifact creature until end of turn.)",
                    colors: [],
                    power: "2",
                    toughness: "10",
                    image_uri: "https://img.scryfall.com/cards/png/en/pxtc/234a.png",
                    color_indicator: [],
                    flavor_text: "flavor text",
                    loyalty: "3"
                }
            ];
            var errorOccurred = false;
            var validateFlavorTextStub = sandbox.stub(card_1.Card, "validateFlavorText");
            try {
                card_1.Card.validateCardFaces(cardFaces);
            }
            catch (e) {
                errorOccurred = true;
            }
            chai_1.expect(errorOccurred).to.be.false;
            chai_1.expect(validateFlavorTextStub.called).to.be.true;
            validateFlavorTextStub.restore();
        });
        it("should validate card face image_url", function () {
            var cardFaces = [
                {
                    name: "Conqueror's Galleon",
                    mana_cost: "{4}",
                    type_line: "Artifact — Vehicle",
                    oracle_text: "When Conqueror's Galleon attacks, exile it at end of combat, then return it to the battlefield transformed under your control. Crew 4 (Tap any number of creatures you control with total power 4 or more: This Vehicle becomes an artifact creature until end of turn.)",
                    colors: [],
                    power: "2",
                    toughness: "10",
                    image_uri: "https://img.scryfall.com/cards/png/en/pxtc/234a.png",
                    color_indicator: [],
                    flavor_text: "flavor text",
                    loyalty: "3"
                }
            ];
            var errorOccurred = false;
            var validateImageUriStub = sandbox.stub(card_1.Card, "validateImageUri");
            try {
                card_1.Card.validateCardFaces(cardFaces);
            }
            catch (e) {
                errorOccurred = true;
            }
            chai_1.expect(errorOccurred).to.be.false;
            chai_1.expect(validateImageUriStub.called).to.be.true;
            validateImageUriStub.restore();
        });
        it("should rethrow error on error in validating name", function () {
            var cardFaces = [
                {
                    name: "Conqueror's Galleon",
                    mana_cost: "{4}",
                    type_line: "Artifact — Vehicle",
                    oracle_text: "When Conqueror's Galleon attacks, exile it at end of combat, then return it to the battlefield transformed under your control. Crew 4 (Tap any number of creatures you control with total power 4 or more: This Vehicle becomes an artifact creature until end of turn.)",
                    colors: [],
                    power: "2",
                    toughness: "10",
                    image_uri: "https://img.scryfall.com/cards/png/en/pxtc/234a.png",
                    color_indicator: [],
                    flavor_text: "flavor text",
                    loyalty: "3"
                }
            ];
            var errorOccurred = false;
            var validateNameStub = sandbox.stub(card_1.Card, "validateName").callsFake(function () {
                throw new Error("validate name error");
            });
            try {
                card_1.Card.validateCardFaces(cardFaces);
            }
            catch (e) {
                errorOccurred = true;
            }
            chai_1.expect(errorOccurred).to.be.true;
            chai_1.expect(validateNameStub.called).to.be.true;
            validateNameStub.restore();
        });
        it("should rethrow error on error in validating type_line", function () {
            var cardFaces = [
                {
                    name: "Conqueror's Galleon",
                    mana_cost: "{4}",
                    type_line: "Artifact — Vehicle",
                    oracle_text: "When Conqueror's Galleon attacks, exile it at end of combat, then return it to the battlefield transformed under your control. Crew 4 (Tap any number of creatures you control with total power 4 or more: This Vehicle becomes an artifact creature until end of turn.)",
                    colors: [],
                    power: "2",
                    toughness: "10",
                    image_uri: "https://img.scryfall.com/cards/png/en/pxtc/234a.png",
                    color_indicator: [],
                    flavor_text: "flavor text",
                    loyalty: "3"
                }
            ];
            var errorOccurred = false;
            var validateTypeLineStub = sandbox.stub(card_1.Card, "validateTypeLine").callsFake(function () {
                throw new Error("validate type_line error");
            });
            try {
                card_1.Card.validateCardFaces(cardFaces);
            }
            catch (e) {
                errorOccurred = true;
            }
            chai_1.expect(errorOccurred).to.be.true;
            chai_1.expect(validateTypeLineStub.called).to.be.true;
            validateTypeLineStub.restore();
        });
        it("should rethrow error on error in validating oracle_text", function () {
            var cardFaces = [
                {
                    name: "Conqueror's Galleon",
                    mana_cost: "{4}",
                    type_line: "Artifact — Vehicle",
                    oracle_text: "When Conqueror's Galleon attacks, exile it at end of combat, then return it to the battlefield transformed under your control. Crew 4 (Tap any number of creatures you control with total power 4 or more: This Vehicle becomes an artifact creature until end of turn.)",
                    colors: [],
                    power: "2",
                    toughness: "10",
                    image_uri: "https://img.scryfall.com/cards/png/en/pxtc/234a.png",
                    color_indicator: [],
                    flavor_text: "flavor text",
                    loyalty: "3"
                }
            ];
            var errorOccurred = false;
            var validateOracleTextStub = sandbox.stub(card_1.Card, "validateOracleText").callsFake(function () {
                throw new Error("validate oracle_text error");
            });
            try {
                card_1.Card.validateCardFaces(cardFaces);
            }
            catch (e) {
                errorOccurred = true;
            }
            chai_1.expect(errorOccurred).to.be.true;
            chai_1.expect(validateOracleTextStub.called).to.be.true;
            validateOracleTextStub.restore();
        });
        it("should rethrow error on error in validating mana_cost", function () {
            var cardFaces = [
                {
                    name: "Conqueror's Galleon",
                    mana_cost: "{4}",
                    type_line: "Artifact — Vehicle",
                    oracle_text: "When Conqueror's Galleon attacks, exile it at end of combat, then return it to the battlefield transformed under your control. Crew 4 (Tap any number of creatures you control with total power 4 or more: This Vehicle becomes an artifact creature until end of turn.)",
                    colors: [],
                    power: "2",
                    toughness: "10",
                    image_uri: "https://img.scryfall.com/cards/png/en/pxtc/234a.png",
                    color_indicator: [],
                    flavor_text: "flavor text",
                    loyalty: "3"
                }
            ];
            var errorOccurred = false;
            var validateManaCostStub = sandbox.stub(card_1.Card, "validateManaCost").callsFake(function () {
                throw new Error("validate mana_cost error");
            });
            try {
                card_1.Card.validateCardFaces(cardFaces);
            }
            catch (e) {
                errorOccurred = true;
            }
            chai_1.expect(errorOccurred).to.be.true;
            chai_1.expect(validateManaCostStub.called).to.be.true;
            validateManaCostStub.restore();
        });
        it("should rethrow error on error in validating colors", function () {
            var cardFaces = [
                {
                    name: "Conqueror's Galleon",
                    mana_cost: "{4}",
                    type_line: "Artifact — Vehicle",
                    oracle_text: "When Conqueror's Galleon attacks, exile it at end of combat, then return it to the battlefield transformed under your control. Crew 4 (Tap any number of creatures you control with total power 4 or more: This Vehicle becomes an artifact creature until end of turn.)",
                    colors: [],
                    power: "2",
                    toughness: "10",
                    image_uri: "https://img.scryfall.com/cards/png/en/pxtc/234a.png",
                    color_indicator: [],
                    flavor_text: "flavor text",
                    loyalty: "3"
                }
            ];
            var errorOccurred = false;
            var validateNameStub = sandbox.stub(card_1.Card, "validateColors").callsFake(function () {
                throw new Error("validate colors error");
            });
            try {
                card_1.Card.validateCardFaces(cardFaces);
            }
            catch (e) {
                errorOccurred = true;
            }
            chai_1.expect(errorOccurred).to.be.true;
            chai_1.expect(validateNameStub.called).to.be.true;
            validateNameStub.restore();
        });
        it("should rethrow error on error in validating color_indicator", function () {
            var cardFaces = [
                {
                    name: "Conqueror's Galleon",
                    mana_cost: "{4}",
                    type_line: "Artifact — Vehicle",
                    oracle_text: "When Conqueror's Galleon attacks, exile it at end of combat, then return it to the battlefield transformed under your control. Crew 4 (Tap any number of creatures you control with total power 4 or more: This Vehicle becomes an artifact creature until end of turn.)",
                    colors: [],
                    power: "2",
                    toughness: "10",
                    image_uri: "https://img.scryfall.com/cards/png/en/pxtc/234a.png",
                    color_indicator: [],
                    flavor_text: "flavor text",
                    loyalty: "3"
                }
            ];
            var errorOccurred = false;
            var validateColorIndicatorStub = sandbox.stub(card_1.Card, "validateColorIndicator").callsFake(function () {
                throw new Error("validate color_indicator error");
            });
            try {
                card_1.Card.validateCardFaces(cardFaces);
            }
            catch (e) {
                errorOccurred = true;
            }
            chai_1.expect(errorOccurred).to.be.true;
            chai_1.expect(validateColorIndicatorStub.called).to.be.true;
            validateColorIndicatorStub.restore();
        });
        it("should rethrow error on error in validating power", function () {
            var cardFaces = [
                {
                    name: "Conqueror's Galleon",
                    mana_cost: "{4}",
                    type_line: "Artifact — Vehicle",
                    oracle_text: "When Conqueror's Galleon attacks, exile it at end of combat, then return it to the battlefield transformed under your control. Crew 4 (Tap any number of creatures you control with total power 4 or more: This Vehicle becomes an artifact creature until end of turn.)",
                    colors: [],
                    power: "2",
                    toughness: "10",
                    image_uri: "https://img.scryfall.com/cards/png/en/pxtc/234a.png",
                    color_indicator: [],
                    flavor_text: "flavor text",
                    loyalty: "3"
                }
            ];
            var errorOccurred = false;
            var validatePowerStub = sandbox.stub(card_1.Card, "validatePower").callsFake(function () {
                throw new Error("validate power error");
            });
            try {
                card_1.Card.validateCardFaces(cardFaces);
            }
            catch (e) {
                errorOccurred = true;
            }
            chai_1.expect(errorOccurred).to.be.true;
            chai_1.expect(validatePowerStub.called).to.be.true;
            validatePowerStub.restore();
        });
        it("should rethrow error on error in validating toughness", function () {
            var cardFaces = [
                {
                    name: "Conqueror's Galleon",
                    mana_cost: "{4}",
                    type_line: "Artifact — Vehicle",
                    oracle_text: "When Conqueror's Galleon attacks, exile it at end of combat, then return it to the battlefield transformed under your control. Crew 4 (Tap any number of creatures you control with total power 4 or more: This Vehicle becomes an artifact creature until end of turn.)",
                    colors: [],
                    power: "2",
                    toughness: "10",
                    image_uri: "https://img.scryfall.com/cards/png/en/pxtc/234a.png",
                    color_indicator: [],
                    flavor_text: "flavor text",
                    loyalty: "3"
                }
            ];
            var errorOccurred = false;
            var validateToughnessStub = sandbox.stub(card_1.Card, "validateToughness").callsFake(function () {
                throw new Error("validate toughness error");
            });
            try {
                card_1.Card.validateCardFaces(cardFaces);
            }
            catch (e) {
                errorOccurred = true;
            }
            chai_1.expect(errorOccurred).to.be.true;
            chai_1.expect(validateToughnessStub.called).to.be.true;
            validateToughnessStub.restore();
        });
        it("should rethrow error on error in validating loyalty", function () {
            var cardFaces = [
                {
                    name: "Conqueror's Galleon",
                    mana_cost: "{4}",
                    type_line: "Artifact — Vehicle",
                    oracle_text: "When Conqueror's Galleon attacks, exile it at end of combat, then return it to the battlefield transformed under your control. Crew 4 (Tap any number of creatures you control with total power 4 or more: This Vehicle becomes an artifact creature until end of turn.)",
                    colors: [],
                    power: "2",
                    toughness: "10",
                    image_uri: "https://img.scryfall.com/cards/png/en/pxtc/234a.png",
                    color_indicator: [],
                    flavor_text: "flavor text",
                    loyalty: "3"
                }
            ];
            var errorOccurred = false;
            var validateLoyaltyStub = sandbox.stub(card_1.Card, "validateLoyalty").callsFake(function () {
                throw new Error("validate loyalty error");
            });
            try {
                card_1.Card.validateCardFaces(cardFaces);
            }
            catch (e) {
                errorOccurred = true;
            }
            chai_1.expect(errorOccurred).to.be.true;
            chai_1.expect(validateLoyaltyStub.called).to.be.true;
            validateLoyaltyStub.restore();
        });
        it("should rethrow error on error in validating flavor_text", function () {
            var cardFaces = [
                {
                    name: "Conqueror's Galleon",
                    mana_cost: "{4}",
                    type_line: "Artifact — Vehicle",
                    oracle_text: "When Conqueror's Galleon attacks, exile it at end of combat, then return it to the battlefield transformed under your control. Crew 4 (Tap any number of creatures you control with total power 4 or more: This Vehicle becomes an artifact creature until end of turn.)",
                    colors: [],
                    power: "2",
                    toughness: "10",
                    image_uri: "https://img.scryfall.com/cards/png/en/pxtc/234a.png",
                    color_indicator: [],
                    flavor_text: "flavor text",
                    loyalty: "3"
                }
            ];
            var errorOccurred = false;
            var validateFlavorTextStub = sandbox.stub(card_1.Card, "validateFlavorText").callsFake(function () {
                throw new Error("validate flavor_text error");
            });
            try {
                card_1.Card.validateCardFaces(cardFaces);
            }
            catch (e) {
                errorOccurred = true;
            }
            chai_1.expect(errorOccurred).to.be.true;
            chai_1.expect(validateFlavorTextStub.called).to.be.true;
            validateFlavorTextStub.restore();
        });
        it("should rethrow error on error in validating image_url", function () {
            var cardFaces = [
                {
                    name: "Conqueror's Galleon",
                    mana_cost: "{4}",
                    type_line: "Artifact — Vehicle",
                    oracle_text: "When Conqueror's Galleon attacks, exile it at end of combat, then return it to the battlefield transformed under your control. Crew 4 (Tap any number of creatures you control with total power 4 or more: This Vehicle becomes an artifact creature until end of turn.)",
                    colors: [],
                    power: "2",
                    toughness: "10",
                    image_uri: "https://img.scryfall.com/cards/png/en/pxtc/234a.png",
                    color_indicator: [],
                    flavor_text: "flavor text",
                    loyalty: "3"
                }
            ];
            var errorOccurred = false;
            var validateImageUriStub = sandbox.stub(card_1.Card, "validateImageUri").callsFake(function () {
                throw new Error("validate image_uri error");
            });
            try {
                card_1.Card.validateCardFaces(cardFaces);
            }
            catch (e) {
                errorOccurred = true;
            }
            chai_1.expect(errorOccurred).to.be.true;
            chai_1.expect(validateImageUriStub.called).to.be.true;
            validateImageUriStub.restore();
        });
        it("should allow a single valid card face", function () {
            var cardFaces = [
                {
                    name: "Conqueror's Galleon",
                    mana_cost: "{4}",
                    type_line: "Artifact — Vehicle",
                    oracle_text: "When Conqueror's Galleon attacks, exile it at end of combat, then return it to the battlefield transformed under your control. Crew 4 (Tap any number of creatures you control with total power 4 or more: This Vehicle becomes an artifact creature until end of turn.)",
                    colors: [],
                    power: "2",
                    toughness: "10",
                    image_uri: "https://img.scryfall.com/cards/png/en/pxtc/234a.png"
                }
            ];
            var errorOccurred = false;
            try {
                card_1.Card.validateCardFaces(cardFaces);
            }
            catch (e) {
                errorOccurred = true;
            }
            chai_1.expect(errorOccurred).to.be.false;
        });
        it("should allow multiple valid card faces", function () {
            var cardFaces = [
                {
                    name: "Conqueror's Galleon",
                    mana_cost: "{4}",
                    type_line: "Artifact — Vehicle",
                    oracle_text: "When Conqueror's Galleon attacks, exile it at end of combat, then return it to the battlefield transformed under your control. Crew 4 (Tap any number of creatures you control with total power 4 or more: This Vehicle becomes an artifact creature until end of turn.)",
                    colors: [],
                    power: "2",
                    toughness: "10",
                    image_uri: "https://img.scryfall.com/cards/png/en/pxtc/234a.png"
                },
                {
                    name: "Dowsing Dagger",
                    mana_cost: "{2}",
                    type_line: "Artifact — Equipment",
                    oracle_text: "When Dowsing Dagger enters the battlefield, target opponent creates two 0/2 green Plant creature tokens with defender. Equipped creature gets +2/+1. Whenever equipped creature deals combat damage to a player, you may transform Dowsing Dagger. Equip {2}",
                    colors: [],
                    image_uri: "https://img.scryfall.com/cards/png/en/pxtc/235a.png"
                }
            ];
            var errorOccurred = false;
            try {
                card_1.Card.validateCardFaces(cardFaces);
            }
            catch (e) {
                errorOccurred = true;
            }
            chai_1.expect(errorOccurred).to.be.false;
        });
    });
    describe("legality", function () {
        it("should error if missing", function () {
            var legality;
            var errorOccurred = false;
            try {
                card_1.Card.validateLegality(legality);
            }
            catch (e) {
                errorOccurred = true;
            }
            chai_1.expect(errorOccurred).to.be.true;
        });
        it("should error if is_standard_legal is missing", function () {
            var legality = {
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
            var errorOccurred = false;
            try {
                card_1.Card.validateLegality(legality);
            }
            catch (e) {
                errorOccurred = true;
            }
            chai_1.expect(errorOccurred).to.be.true;
        });
        it("should error if is_standard_legal is not a boolean", function () {
            var legality = {
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
            var errorOccurred = false;
            try {
                card_1.Card.validateLegality(legality);
            }
            catch (e) {
                errorOccurred = true;
            }
            chai_1.expect(errorOccurred).to.be.true;
        });
        it("should error if is_frontier_legal is missing", function () {
            var legality = {
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
            var errorOccurred = false;
            try {
                card_1.Card.validateLegality(legality);
            }
            catch (e) {
                errorOccurred = true;
            }
            chai_1.expect(errorOccurred).to.be.true;
        });
        it("should error if is_frontier_legal is not a boolean", function () {
            var legality = {
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
            var errorOccurred = false;
            try {
                card_1.Card.validateLegality(legality);
            }
            catch (e) {
                errorOccurred = true;
            }
            chai_1.expect(errorOccurred).to.be.true;
        });
        it("should error if is_modern_legal is missing", function () {
            var legality = {
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
            var errorOccurred = false;
            try {
                card_1.Card.validateLegality(legality);
            }
            catch (e) {
                errorOccurred = true;
            }
            chai_1.expect(errorOccurred).to.be.true;
        });
        it("should error if is_modern_legal is not a boolean", function () {
            var legality = {
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
            var errorOccurred = false;
            try {
                card_1.Card.validateLegality(legality);
            }
            catch (e) {
                errorOccurred = true;
            }
            chai_1.expect(errorOccurred).to.be.true;
        });
        it("should error if is_pauper_legal is missing", function () {
            var legality = {
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
            var errorOccurred = false;
            try {
                card_1.Card.validateLegality(legality);
            }
            catch (e) {
                errorOccurred = true;
            }
            chai_1.expect(errorOccurred).to.be.true;
        });
        it("should error if is_pauper_legal is not a boolean", function () {
            var legality = {
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
            var errorOccurred = false;
            try {
                card_1.Card.validateLegality(legality);
            }
            catch (e) {
                errorOccurred = true;
            }
            chai_1.expect(errorOccurred).to.be.true;
        });
        it("should error if is_legacy_legal is missing", function () {
            var legality = {
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
            var errorOccurred = false;
            try {
                card_1.Card.validateLegality(legality);
            }
            catch (e) {
                errorOccurred = true;
            }
            chai_1.expect(errorOccurred).to.be.true;
        });
        it("should error if is_legacy_legal is not a boolean", function () {
            var legality = {
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
            var errorOccurred = false;
            try {
                card_1.Card.validateLegality(legality);
            }
            catch (e) {
                errorOccurred = true;
            }
            chai_1.expect(errorOccurred).to.be.true;
        });
        it("should error if is_penny_legal is missing", function () {
            var legality = {
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
            var errorOccurred = false;
            try {
                card_1.Card.validateLegality(legality);
            }
            catch (e) {
                errorOccurred = true;
            }
            chai_1.expect(errorOccurred).to.be.true;
        });
        it("should error if is_penny_legal is not a boolean", function () {
            var legality = {
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
            var errorOccurred = false;
            try {
                card_1.Card.validateLegality(legality);
            }
            catch (e) {
                errorOccurred = true;
            }
            chai_1.expect(errorOccurred).to.be.true;
        });
        it("should error if is_vintage_legal is missing", function () {
            var legality = {
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
            var errorOccurred = false;
            try {
                card_1.Card.validateLegality(legality);
            }
            catch (e) {
                errorOccurred = true;
            }
            chai_1.expect(errorOccurred).to.be.true;
        });
        it("should error if is_vintage_legal is not a boolean", function () {
            var legality = {
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
            var errorOccurred = false;
            try {
                card_1.Card.validateLegality(legality);
            }
            catch (e) {
                errorOccurred = true;
            }
            chai_1.expect(errorOccurred).to.be.true;
        });
        it("should error if is_duel_legal is missing", function () {
            var legality = {
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
            var errorOccurred = false;
            try {
                card_1.Card.validateLegality(legality);
            }
            catch (e) {
                errorOccurred = true;
            }
            chai_1.expect(errorOccurred).to.be.true;
        });
        it("should error if is_duel_legal is not a boolean", function () {
            var legality = {
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
            var errorOccurred = false;
            try {
                card_1.Card.validateLegality(legality);
            }
            catch (e) {
                errorOccurred = true;
            }
            chai_1.expect(errorOccurred).to.be.true;
        });
        it("should error if is_commander_legal is missing", function () {
            var legality = {
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
            var errorOccurred = false;
            try {
                card_1.Card.validateLegality(legality);
            }
            catch (e) {
                errorOccurred = true;
            }
            chai_1.expect(errorOccurred).to.be.true;
        });
        it("should error if is_commander_legal is not a boolean", function () {
            var legality = {
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
            var errorOccurred = false;
            try {
                card_1.Card.validateLegality(legality);
            }
            catch (e) {
                errorOccurred = true;
            }
            chai_1.expect(errorOccurred).to.be.true;
        });
        it("should error if is_one_versus_one_legal is missing", function () {
            var legality = {
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
            var errorOccurred = false;
            try {
                card_1.Card.validateLegality(legality);
            }
            catch (e) {
                errorOccurred = true;
            }
            chai_1.expect(errorOccurred).to.be.true;
        });
        it("should error if is_one_versus_one_legal is not a boolean", function () {
            var legality = {
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
            var errorOccurred = false;
            try {
                card_1.Card.validateLegality(legality);
            }
            catch (e) {
                errorOccurred = true;
            }
            chai_1.expect(errorOccurred).to.be.true;
        });
        it("should error if is_future_legal is missing", function () {
            var legality = {
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
            var errorOccurred = false;
            try {
                card_1.Card.validateLegality(legality);
            }
            catch (e) {
                errorOccurred = true;
            }
            chai_1.expect(errorOccurred).to.be.true;
        });
        it("should error if is_future_legal is not a boolean", function () {
            var legality = {
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
            var errorOccurred = false;
            try {
                card_1.Card.validateLegality(legality);
            }
            catch (e) {
                errorOccurred = true;
            }
            chai_1.expect(errorOccurred).to.be.true;
        });
        it("should allow legality values to be true", function () {
            var legality = {
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
            var errorOccurred = false;
            try {
                card_1.Card.validateLegality(legality);
            }
            catch (e) {
                errorOccurred = true;
            }
            chai_1.expect(errorOccurred).to.be.false;
        });
        it("should allow legality values to be false", function () {
            var legality = {
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
            var errorOccurred = false;
            try {
                card_1.Card.validateLegality(legality);
            }
            catch (e) {
                errorOccurred = true;
            }
            chai_1.expect(errorOccurred).to.be.false;
        });
    });
    describe("is_reserved", function () {
        it("is required", function () {
            var isReserved;
            var errorOccurred = false;
            try {
                card_1.Card.validateIsReserved(isReserved);
            }
            catch (e) {
                errorOccurred = true;
            }
            chai_1.expect(errorOccurred).to.be.true;
        });
        it("should error if not a boolean", function () {
            var isReserved = "not a boolean";
            var errorOccurred = false;
            try {
                card_1.Card.validateIsReserved(isReserved);
            }
            catch (e) {
                errorOccurred = true;
            }
            chai_1.expect(errorOccurred).to.be.true;
        });
        it("should validate if true", function () {
            var isReserved = true;
            var errorOccurred = false;
            try {
                card_1.Card.validateIsReserved(isReserved);
            }
            catch (e) {
                errorOccurred = true;
            }
            chai_1.expect(errorOccurred).to.be.false;
        });
        it("should validate if false", function () {
            var isReserved = false;
            var errorOccurred = false;
            try {
                card_1.Card.validateIsReserved(isReserved);
            }
            catch (e) {
                errorOccurred = true;
            }
            chai_1.expect(errorOccurred).to.be.false;
        });
    });
    describe("edhrec_rank", function () {
        it("should ignore if empty", function () {
            var edhrecRank;
            var errorOccurred = false;
            try {
                card_1.Card.validateEDHRecRank(edhrecRank);
            }
            catch (e) {
                errorOccurred = true;
            }
            chai_1.expect(errorOccurred).to.be.false;
        });
        it("should error if not a number", function () {
            var edhrecRank = "not a number";
            var errorOccurred = false;
            try {
                card_1.Card.validateEDHRecRank(edhrecRank);
            }
            catch (e) {
                errorOccurred = true;
            }
            chai_1.expect(errorOccurred).to.be.true;
        });
        it("should allow a number value", function () {
            var edhrecRank = 1000;
            var errorOccurred = false;
            try {
                card_1.Card.validateEDHRecRank(edhrecRank);
            }
            catch (e) {
                errorOccurred = true;
            }
            chai_1.expect(errorOccurred).to.be.false;
        });
    });
    describe("set_code", function () {
        it("should validate set_code with validation from Set", function () {
            var setCode = "ust";
            var errorOccurred = false;
            var validateSetCodeStub = sandbox.stub(set_1.Set, "validateSetCode");
            try {
                card_1.Card.validateSetCode(setCode);
            }
            catch (e) {
                errorOccurred = true;
            }
            chai_1.expect(errorOccurred).to.be.false;
            chai_1.expect(validateSetCodeStub.called).to.be.true;
            validateSetCodeStub.restore();
        });
        it("should rethrow error from set_code validation from Set", function () {
            var setCode = "ust";
            var errorOccurred = false;
            var validateSetCodeStub = sandbox.stub(set_1.Set, "validateSetCode").callsFake(function () {
                throw new Error("set_code error from Set");
            });
            try {
                card_1.Card.validateSetCode(setCode);
            }
            catch (e) {
                errorOccurred = true;
            }
            chai_1.expect(errorOccurred).to.be.true;
            chai_1.expect(validateSetCodeStub.called).to.be.true;
            validateSetCodeStub.restore();
        });
    });
    describe("set_name", function () {
        it("should validate set_name with validation from Set", function () {
            var setName = "Unstable";
            var errorOccurred = false;
            var validateSetNameStub = sandbox.stub(set_1.Set, "validateSetName");
            try {
                card_1.Card.validateSetName(setName);
            }
            catch (e) {
                errorOccurred = true;
            }
            chai_1.expect(errorOccurred).to.be.false;
            chai_1.expect(validateSetNameStub.called).to.be.true;
            validateSetNameStub.restore();
        });
        it("should rethrow error from set_name validation from Set", function () {
            var setName = "Unstable";
            var errorOccurred = false;
            var validateSetNameStub = sandbox.stub(set_1.Set, "validateSetName").callsFake(function () {
                throw new Error("set_name error from Set");
            });
            try {
                card_1.Card.validateSetName(setName);
            }
            catch (e) {
                errorOccurred = true;
            }
            chai_1.expect(errorOccurred).to.be.true;
            chai_1.expect(validateSetNameStub.called).to.be.true;
            validateSetNameStub.restore();
        });
    });
    describe("collector_number", function () {
        it("should error if collector_number is missing", function () {
            var collectorNumber;
            var errorOccurred = false;
            try {
                card_1.Card.validateCollectorNumber(collectorNumber);
            }
            catch (e) {
                errorOccurred = true;
            }
            chai_1.expect(errorOccurred).to.be.true;
        });
        it("should error if collector_number is empty", function () {
            var collectorNumber = "";
            var errorOccurred = false;
            try {
                card_1.Card.validateCollectorNumber(collectorNumber);
            }
            catch (e) {
                errorOccurred = true;
            }
            chai_1.expect(errorOccurred).to.be.true;
        });
        it("should error if collection_number is non-alphanumeric", function () {
            var collectorNumber = "5a?";
            var errorOccurred = false;
            try {
                card_1.Card.validateCollectorNumber(collectorNumber);
            }
            catch (e) {
                errorOccurred = true;
            }
            chai_1.expect(errorOccurred).to.be.true;
        });
        it("should allow alphanumeric collector number", function () {
            var collectorNumber = "5a";
            var errorOccurred = false;
            try {
                card_1.Card.validateCollectorNumber(collectorNumber);
            }
            catch (e) {
                errorOccurred = true;
            }
            chai_1.expect(errorOccurred).to.be.false;
        });
    });
    describe("image_uri", function () {
        it("should error on missing image_uri", function () {
            var imageUri;
            var errorOccurred = false;
            try {
                card_1.Card.validateImageUri(imageUri);
            }
            catch (e) {
                errorOccurred = true;
            }
            chai_1.expect(errorOccurred).to.be.true;
        });
        it("should invalidate an empty image_uri", function () {
            var imageUri = "";
            var errorOccurred = false;
            try {
                card_1.Card.validateImageUri(imageUri);
            }
            catch (e) {
                errorOccurred = true;
            }
            chai_1.expect(errorOccurred).to.be.true;
        });
        it("should invalidate a bad image_uri", function () {
            var imageUri = "http://test";
            var errorOccurred = false;
            try {
                card_1.Card.validateImageUri(imageUri);
            }
            catch (e) {
                errorOccurred = true;
            }
            chai_1.expect(errorOccurred).to.be.true;
        });
        it("should invalidate a non-png image_uri", function () {
            var imageUri = "http://example.com/icon.jpg";
            var errorOccurred = false;
            try {
                card_1.Card.validateImageUri(imageUri);
            }
            catch (e) {
                errorOccurred = true;
            }
            chai_1.expect(errorOccurred).to.be.true;
        });
        it("should validate a image_uri as hosted png", function () {
            var imageUri = "http://example.com/image.png";
            var errorOccurred = false;
            try {
                card_1.Card.validateImageUri(imageUri);
            }
            catch (e) {
                errorOccurred = true;
            }
            chai_1.expect(errorOccurred).to.be.false;
        });
    });
    describe("is_reprint", function () {
        it("is required", function () {
            var isReprint;
            var errorOccurred = false;
            try {
                card_1.Card.validateIsReprint(isReprint);
            }
            catch (e) {
                errorOccurred = true;
            }
            chai_1.expect(errorOccurred).to.be.true;
        });
        it("should error if not a boolean", function () {
            var isReprint = "not a boolean";
            var errorOccurred = false;
            try {
                card_1.Card.validateIsReprint(isReprint);
            }
            catch (e) {
                errorOccurred = true;
            }
            chai_1.expect(errorOccurred).to.be.true;
        });
        it("should validate if true", function () {
            var isReprint = true;
            var errorOccurred = false;
            try {
                card_1.Card.validateIsReprint(isReprint);
            }
            catch (e) {
                errorOccurred = true;
            }
            chai_1.expect(errorOccurred).to.be.false;
        });
        it("should validate if false", function () {
            var isReprint = false;
            var errorOccurred = false;
            try {
                card_1.Card.validateIsReprint(isReprint);
            }
            catch (e) {
                errorOccurred = true;
            }
            chai_1.expect(errorOccurred).to.be.false;
        });
    });
    describe("is_digital", function () {
        it("should validate is_digital with validation from Set", function () {
            var isDigital = false;
            var errorOccurred = false;
            var validateIsDigitalStub = sandbox.stub(set_1.Set, "validateIsDigital");
            try {
                card_1.Card.validateIsDigital(isDigital);
            }
            catch (e) {
                errorOccurred = true;
            }
            chai_1.expect(errorOccurred).to.be.false;
            chai_1.expect(validateIsDigitalStub.called).to.be.true;
            validateIsDigitalStub.restore();
        });
        it("should rethrow error from is_digital validation from Set", function () {
            var isDigital = false;
            var errorOccurred = false;
            var validateIsDigitalStub = sandbox.stub(set_1.Set, "validateIsDigital").callsFake(function () {
                throw new Error("is_digital error from Set");
            });
            try {
                card_1.Card.validateIsDigital(isDigital);
            }
            catch (e) {
                errorOccurred = true;
            }
            chai_1.expect(errorOccurred).to.be.true;
            chai_1.expect(validateIsDigitalStub.called).to.be.true;
            validateIsDigitalStub.restore();
        });
    });
    describe("rarity", function () {
        it("should error if missing", function () {
            var rarity;
            var errorOccurred = false;
            try {
                card_1.Card.validateRarity(rarity);
            }
            catch (e) {
                errorOccurred = true;
            }
            chai_1.expect(errorOccurred).to.be.true;
        });
        it("should error if empty", function () {
            var rarity = "";
            var errorOccurred = false;
            try {
                card_1.Card.validateRarity(rarity);
            }
            catch (e) {
                errorOccurred = true;
            }
            chai_1.expect(errorOccurred).to.be.true;
        });
        it("should error if not a predefined value", function () {
            var rarity = "super duper rare";
            var errorOccurred = false;
            try {
                card_1.Card.validateRarity(rarity);
            }
            catch (e) {
                errorOccurred = true;
            }
            chai_1.expect(errorOccurred).to.be.true;
        });
        it("should allow a rarity of common", function () {
            var rarity = enums_1.Rarities.Common;
            var errorOccurred = false;
            try {
                card_1.Card.validateRarity(rarity);
            }
            catch (e) {
                errorOccurred = true;
            }
            chai_1.expect(errorOccurred).to.be.false;
        });
        it("should allow a rarity of uncommon", function () {
            var rarity = enums_1.Rarities.Uncommon;
            var errorOccurred = false;
            try {
                card_1.Card.validateRarity(rarity);
            }
            catch (e) {
                errorOccurred = true;
            }
            chai_1.expect(errorOccurred).to.be.false;
        });
        it("should allow a rarity of rare", function () {
            var rarity = enums_1.Rarities.Rare;
            var errorOccurred = false;
            try {
                card_1.Card.validateRarity(rarity);
            }
            catch (e) {
                errorOccurred = true;
            }
            chai_1.expect(errorOccurred).to.be.false;
        });
        it("should allow a rarity of mythic", function () {
            var rarity = enums_1.Rarities.Mythic;
            var errorOccurred = false;
            try {
                card_1.Card.validateRarity(rarity);
            }
            catch (e) {
                errorOccurred = true;
            }
            chai_1.expect(errorOccurred).to.be.false;
        });
    });
    describe("flavor_text", function () {
        it("should ignore if missing", function () {
            var flavorText;
            var errorOccurred = false;
            try {
                card_1.Card.validateFlavorText(flavorText);
            }
            catch (e) {
                errorOccurred = true;
            }
            chai_1.expect(errorOccurred).to.be.false;
        });
        it("should error if empty", function () {
            var flavorText = "";
            var errorOccurred = false;
            try {
                card_1.Card.validateFlavorText(flavorText);
            }
            catch (e) {
                errorOccurred = true;
            }
            chai_1.expect(errorOccurred).to.be.true;
        });
        it("should allow generic non-empty string", function () {
            var flavorText = "'People's thoughts just come to me. Sometimes I don't know if it's them or me thinking.'";
            var errorOccurred = false;
            try {
                card_1.Card.validateFlavorText(flavorText);
            }
            catch (e) {
                errorOccurred = true;
            }
            chai_1.expect(errorOccurred).to.be.false;
        });
    });
    describe("artist", function () {
        it("is requred", function () {
            var artist;
            var errorOccurred = false;
            try {
                card_1.Card.validateArtist(artist);
            }
            catch (e) {
                errorOccurred = true;
            }
            chai_1.expect(errorOccurred).to.be.true;
        });
        it("should error if empty", function () {
            var artist = "";
            var errorOccurred = false;
            try {
                card_1.Card.validateArtist(artist);
            }
            catch (e) {
                errorOccurred = true;
            }
            chai_1.expect(errorOccurred).to.be.true;
        });
        it("should allow generic non-empty string", function () {
            var artist = "Kieran Yanner";
            var errorOccurred = false;
            try {
                card_1.Card.validateArtist(artist);
            }
            catch (e) {
                errorOccurred = true;
            }
            chai_1.expect(errorOccurred).to.be.false;
        });
    });
    describe("frame", function () {
        it("should error if missing", function () {
            var frame;
            var errorOccurred = false;
            try {
                card_1.Card.validateFrame(frame);
            }
            catch (e) {
                errorOccurred = true;
            }
            chai_1.expect(errorOccurred).to.be.true;
        });
        it("should error if empty", function () {
            var frame = "";
            var errorOccurred = false;
            try {
                card_1.Card.validateFrame(frame);
            }
            catch (e) {
                errorOccurred = true;
            }
            chai_1.expect(errorOccurred).to.be.true;
        });
        it("should error if not a pre-defined value", function () {
            var frame = "super old frame";
            var errorOccurred = false;
            try {
                card_1.Card.validateFrame(frame);
            }
            catch (e) {
                errorOccurred = true;
            }
            chai_1.expect(errorOccurred).to.be.true;
        });
        it("should allow a value of 1993", function () {
            var frame = enums_1.Frames.NineteenNinetyThree;
            var errorOccurred = false;
            try {
                card_1.Card.validateFrame(frame);
            }
            catch (e) {
                errorOccurred = true;
            }
            chai_1.expect(errorOccurred).to.be.false;
        });
        it("should allow a value of 1997", function () {
            var frame = enums_1.Frames.NineteenNinetySeven;
            var errorOccurred = false;
            try {
                card_1.Card.validateFrame(frame);
            }
            catch (e) {
                errorOccurred = true;
            }
            chai_1.expect(errorOccurred).to.be.false;
        });
        it("should allow a value of 2003", function () {
            var frame = enums_1.Frames.TwoThousandThree;
            var errorOccurred = false;
            try {
                card_1.Card.validateFrame(frame);
            }
            catch (e) {
                errorOccurred = true;
            }
            chai_1.expect(errorOccurred).to.be.false;
        });
        it("should allow a value of 2015", function () {
            var frame = enums_1.Frames.TwoThousandFifteen;
            var errorOccurred = false;
            try {
                card_1.Card.validateFrame(frame);
            }
            catch (e) {
                errorOccurred = true;
            }
            chai_1.expect(errorOccurred).to.be.false;
        });
        it("should allow a value of future", function () {
            var frame = enums_1.Frames.Future;
            var errorOccurred = false;
            try {
                card_1.Card.validateFrame(frame);
            }
            catch (e) {
                errorOccurred = true;
            }
            chai_1.expect(errorOccurred).to.be.false;
        });
    });
    describe("is_full_art", function () {
        it("is required", function () {
            var isFullArt;
            var errorOccurred = false;
            try {
                card_1.Card.validateIsFullArt(isFullArt);
            }
            catch (e) {
                errorOccurred = true;
            }
            chai_1.expect(errorOccurred).to.be.true;
        });
        it("should error if not a boolean", function () {
            var isFullArt = "not a boolean";
            var errorOccurred = false;
            try {
                card_1.Card.validateIsFullArt(isFullArt);
            }
            catch (e) {
                errorOccurred = true;
            }
            chai_1.expect(errorOccurred).to.be.true;
        });
        it("should validate if true", function () {
            var isFullArt = true;
            var errorOccurred = false;
            try {
                card_1.Card.validateIsFullArt(isFullArt);
            }
            catch (e) {
                errorOccurred = true;
            }
            chai_1.expect(errorOccurred).to.be.false;
        });
        it("should validate if false", function () {
            var isFullArt = false;
            var errorOccurred = false;
            try {
                card_1.Card.validateIsFullArt(isFullArt);
            }
            catch (e) {
                errorOccurred = true;
            }
            chai_1.expect(errorOccurred).to.be.false;
        });
    });
    describe("watermark", function () {
        it("should ignore if missing", function () {
            var watermark;
            var errorOccurred = false;
            try {
                card_1.Card.validateWatermark(watermark);
            }
            catch (e) {
                errorOccurred = true;
            }
            chai_1.expect(errorOccurred).to.be.false;
        });
        it("should error if empty", function () {
            var watermark = "";
            var errorOccurred = false;
            try {
                card_1.Card.validateWatermark(watermark);
            }
            catch (e) {
                errorOccurred = true;
            }
            chai_1.expect(errorOccurred).to.be.true;
        });
        it("should error if not a pre-defined value", function () {
            var watermark = "not pre-defined value";
            var errorOccurred = false;
            try {
                card_1.Card.validateWatermark(watermark);
            }
            catch (e) {
                errorOccurred = true;
            }
            chai_1.expect(errorOccurred).to.be.true;
        });
        it("should allow a value of abzan", function () {
            var watermark = enums_1.Watermarks.Abzan;
            var errorOccurred = false;
            try {
                card_1.Card.validateWatermark(watermark);
            }
            catch (e) {
                errorOccurred = true;
            }
            chai_1.expect(errorOccurred).to.be.false;
        });
        it("should allow a value of agentsofsneak", function () {
            var watermark = enums_1.Watermarks.AgentsOfSneak;
            var errorOccurred = false;
            try {
                card_1.Card.validateWatermark(watermark);
            }
            catch (e) {
                errorOccurred = true;
            }
            chai_1.expect(errorOccurred).to.be.false;
        });
        it("should allow a value of arena", function () {
            var watermark = enums_1.Watermarks.Arena;
            var errorOccurred = false;
            try {
                card_1.Card.validateWatermark(watermark);
            }
            catch (e) {
                errorOccurred = true;
            }
            chai_1.expect(errorOccurred).to.be.false;
        });
        it("should allow a value of atarka", function () {
            var watermark = enums_1.Watermarks.Atarka;
            var errorOccurred = false;
            try {
                card_1.Card.validateWatermark(watermark);
            }
            catch (e) {
                errorOccurred = true;
            }
            chai_1.expect(errorOccurred).to.be.false;
        });
        it("should allow a value of azorius", function () {
            var watermark = enums_1.Watermarks.Azorius;
            var errorOccurred = false;
            try {
                card_1.Card.validateWatermark(watermark);
            }
            catch (e) {
                errorOccurred = true;
            }
            chai_1.expect(errorOccurred).to.be.false;
        });
        it("should allow a value of boros", function () {
            var watermark = enums_1.Watermarks.Boros;
            var errorOccurred = false;
            try {
                card_1.Card.validateWatermark(watermark);
            }
            catch (e) {
                errorOccurred = true;
            }
            chai_1.expect(errorOccurred).to.be.false;
        });
        it("should allow a value of colorpie", function () {
            var watermark = enums_1.Watermarks.ColorPie;
            var errorOccurred = false;
            try {
                card_1.Card.validateWatermark(watermark);
            }
            catch (e) {
                errorOccurred = true;
            }
            chai_1.expect(errorOccurred).to.be.false;
        });
        it("should allow a value of conspiracy", function () {
            var watermark = enums_1.Watermarks.Conspiracy;
            var errorOccurred = false;
            try {
                card_1.Card.validateWatermark(watermark);
            }
            catch (e) {
                errorOccurred = true;
            }
            chai_1.expect(errorOccurred).to.be.false;
        });
        it("should allow a value of crossbreedlabs", function () {
            var watermark = enums_1.Watermarks.CrossbreedLabs;
            var errorOccurred = false;
            try {
                card_1.Card.validateWatermark(watermark);
            }
            catch (e) {
                errorOccurred = true;
            }
            chai_1.expect(errorOccurred).to.be.false;
        });
        it("should allow a value of dci", function () {
            var watermark = enums_1.Watermarks.DCI;
            var errorOccurred = false;
            try {
                card_1.Card.validateWatermark(watermark);
            }
            catch (e) {
                errorOccurred = true;
            }
            chai_1.expect(errorOccurred).to.be.false;
        });
        it("should allow a value of d&d", function () {
            var watermark = enums_1.Watermarks.DAndD;
            var errorOccurred = false;
            try {
                card_1.Card.validateWatermark(watermark);
            }
            catch (e) {
                errorOccurred = true;
            }
            chai_1.expect(errorOccurred).to.be.false;
        });
        it("should allow a value of dimir", function () {
            var watermark = enums_1.Watermarks.Dimir;
            var errorOccurred = false;
            try {
                card_1.Card.validateWatermark(watermark);
            }
            catch (e) {
                errorOccurred = true;
            }
            chai_1.expect(errorOccurred).to.be.false;
        });
        it("should allow a value of dromoka", function () {
            var watermark = enums_1.Watermarks.Dromoka;
            var errorOccurred = false;
            try {
                card_1.Card.validateWatermark(watermark);
            }
            catch (e) {
                errorOccurred = true;
            }
            chai_1.expect(errorOccurred).to.be.false;
        });
        it("should allow a value of fnm", function () {
            var watermark = enums_1.Watermarks.FNM;
            var errorOccurred = false;
            try {
                card_1.Card.validateWatermark(watermark);
            }
            catch (e) {
                errorOccurred = true;
            }
            chai_1.expect(errorOccurred).to.be.false;
        });
        it("should allow a value of goblinexplosioneers", function () {
            var watermark = enums_1.Watermarks.GoblinExplosioneers;
            var errorOccurred = false;
            try {
                card_1.Card.validateWatermark(watermark);
            }
            catch (e) {
                errorOccurred = true;
            }
            chai_1.expect(errorOccurred).to.be.false;
        });
        it("should allow a value of golgari", function () {
            var watermark = enums_1.Watermarks.Golgari;
            var errorOccurred = false;
            try {
                card_1.Card.validateWatermark(watermark);
            }
            catch (e) {
                errorOccurred = true;
            }
            chai_1.expect(errorOccurred).to.be.false;
        });
        it("should allow a value of grandprix", function () {
            var watermark = enums_1.Watermarks.GrandPrix;
            var errorOccurred = false;
            try {
                card_1.Card.validateWatermark(watermark);
            }
            catch (e) {
                errorOccurred = true;
            }
            chai_1.expect(errorOccurred).to.be.false;
        });
        it("should allow a value of gruul", function () {
            var watermark = enums_1.Watermarks.Gruul;
            var errorOccurred = false;
            try {
                card_1.Card.validateWatermark(watermark);
            }
            catch (e) {
                errorOccurred = true;
            }
            chai_1.expect(errorOccurred).to.be.false;
        });
        it("should allow a value of izzet", function () {
            var watermark = enums_1.Watermarks.Izzet;
            var errorOccurred = false;
            try {
                card_1.Card.validateWatermark(watermark);
            }
            catch (e) {
                errorOccurred = true;
            }
            chai_1.expect(errorOccurred).to.be.false;
        });
        it("should allow a value of jeskai", function () {
            var watermark = enums_1.Watermarks.Jeskai;
            var errorOccurred = false;
            try {
                card_1.Card.validateWatermark(watermark);
            }
            catch (e) {
                errorOccurred = true;
            }
            chai_1.expect(errorOccurred).to.be.false;
        });
        it("should allow a value of junior", function () {
            var watermark = enums_1.Watermarks.Junior;
            var errorOccurred = false;
            try {
                card_1.Card.validateWatermark(watermark);
            }
            catch (e) {
                errorOccurred = true;
            }
            chai_1.expect(errorOccurred).to.be.false;
        });
        it("should allow a value of juniorapac", function () {
            var watermark = enums_1.Watermarks.JuniorAPAC;
            var errorOccurred = false;
            try {
                card_1.Card.validateWatermark(watermark);
            }
            catch (e) {
                errorOccurred = true;
            }
            chai_1.expect(errorOccurred).to.be.false;
        });
        it("should allow a value of junioreurope", function () {
            var watermark = enums_1.Watermarks.JuniorEurope;
            var errorOccurred = false;
            try {
                card_1.Card.validateWatermark(watermark);
            }
            catch (e) {
                errorOccurred = true;
            }
            chai_1.expect(errorOccurred).to.be.false;
        });
        it("should allow a value of kolaghan", function () {
            var watermark = enums_1.Watermarks.Kolaghan;
            var errorOccurred = false;
            try {
                card_1.Card.validateWatermark(watermark);
            }
            catch (e) {
                errorOccurred = true;
            }
            chai_1.expect(errorOccurred).to.be.false;
        });
        it("should allow a value of leagueofdastardlydoom", function () {
            var watermark = enums_1.Watermarks.LeagueOfDastardlyDoom;
            var errorOccurred = false;
            try {
                card_1.Card.validateWatermark(watermark);
            }
            catch (e) {
                errorOccurred = true;
            }
            chai_1.expect(errorOccurred).to.be.false;
        });
        it("should allow a value of mardu", function () {
            var watermark = enums_1.Watermarks.Mardu;
            var errorOccurred = false;
            try {
                card_1.Card.validateWatermark(watermark);
            }
            catch (e) {
                errorOccurred = true;
            }
            chai_1.expect(errorOccurred).to.be.false;
        });
        it("should allow a value of mirran", function () {
            var watermark = enums_1.Watermarks.Mirran;
            var errorOccurred = false;
            try {
                card_1.Card.validateWatermark(watermark);
            }
            catch (e) {
                errorOccurred = true;
            }
            chai_1.expect(errorOccurred).to.be.false;
        });
        it("should allow a value of mps", function () {
            var watermark = enums_1.Watermarks.MPS;
            var errorOccurred = false;
            try {
                card_1.Card.validateWatermark(watermark);
            }
            catch (e) {
                errorOccurred = true;
            }
            chai_1.expect(errorOccurred).to.be.false;
        });
        it("should allow a value of mtg", function () {
            var watermark = enums_1.Watermarks.MTG;
            var errorOccurred = false;
            try {
                card_1.Card.validateWatermark(watermark);
            }
            catch (e) {
                errorOccurred = true;
            }
            chai_1.expect(errorOccurred).to.be.false;
        });
        it("should allow a value of mtg10", function () {
            var watermark = enums_1.Watermarks.MTGTen;
            var errorOccurred = false;
            try {
                card_1.Card.validateWatermark(watermark);
            }
            catch (e) {
                errorOccurred = true;
            }
            chai_1.expect(errorOccurred).to.be.false;
        });
        it("should allow a value of mtg15", function () {
            var watermark = enums_1.Watermarks.MTGFifteen;
            var errorOccurred = false;
            try {
                card_1.Card.validateWatermark(watermark);
            }
            catch (e) {
                errorOccurred = true;
            }
            chai_1.expect(errorOccurred).to.be.false;
        });
        it("should allow a value of nerf", function () {
            var watermark = enums_1.Watermarks.Nerf;
            var errorOccurred = false;
            try {
                card_1.Card.validateWatermark(watermark);
            }
            catch (e) {
                errorOccurred = true;
            }
            chai_1.expect(errorOccurred).to.be.false;
        });
        it("should allow a value of ojutai", function () {
            var watermark = enums_1.Watermarks.Ojutai;
            var errorOccurred = false;
            try {
                card_1.Card.validateWatermark(watermark);
            }
            catch (e) {
                errorOccurred = true;
            }
            chai_1.expect(errorOccurred).to.be.false;
        });
        it("should allow a value of orderofthewidget", function () {
            var watermark = enums_1.Watermarks.OrderOfTheWidget;
            var errorOccurred = false;
            try {
                card_1.Card.validateWatermark(watermark);
            }
            catch (e) {
                errorOccurred = true;
            }
            chai_1.expect(errorOccurred).to.be.false;
        });
        it("should allow a value of orzhov", function () {
            var watermark = enums_1.Watermarks.Orzhov;
            var errorOccurred = false;
            try {
                card_1.Card.validateWatermark(watermark);
            }
            catch (e) {
                errorOccurred = true;
            }
            chai_1.expect(errorOccurred).to.be.false;
        });
        it("should allow a value of phyrexian", function () {
            var watermark = enums_1.Watermarks.Phyrexian;
            var errorOccurred = false;
            try {
                card_1.Card.validateWatermark(watermark);
            }
            catch (e) {
                errorOccurred = true;
            }
            chai_1.expect(errorOccurred).to.be.false;
        });
        it("should allow a value of planeswalker", function () {
            var watermark = enums_1.Watermarks.Planeswalker;
            var errorOccurred = false;
            try {
                card_1.Card.validateWatermark(watermark);
            }
            catch (e) {
                errorOccurred = true;
            }
            chai_1.expect(errorOccurred).to.be.false;
        });
        it("should allow a value of protour", function () {
            var watermark = enums_1.Watermarks.ProTour;
            var errorOccurred = false;
            try {
                card_1.Card.validateWatermark(watermark);
            }
            catch (e) {
                errorOccurred = true;
            }
            chai_1.expect(errorOccurred).to.be.false;
        });
        it("should allow a value of rakdos", function () {
            var watermark = enums_1.Watermarks.Rakdos;
            var errorOccurred = false;
            try {
                card_1.Card.validateWatermark(watermark);
            }
            catch (e) {
                errorOccurred = true;
            }
            chai_1.expect(errorOccurred).to.be.false;
        });
        it("should allow a value of scholarship", function () {
            var watermark = enums_1.Watermarks.Scholarship;
            var errorOccurred = false;
            try {
                card_1.Card.validateWatermark(watermark);
            }
            catch (e) {
                errorOccurred = true;
            }
            chai_1.expect(errorOccurred).to.be.false;
        });
        it("should allow a value of selesnya", function () {
            var watermark = enums_1.Watermarks.Selesnya;
            var errorOccurred = false;
            try {
                card_1.Card.validateWatermark(watermark);
            }
            catch (e) {
                errorOccurred = true;
            }
            chai_1.expect(errorOccurred).to.be.false;
        });
        it("should allow a value of set", function () {
            var watermark = enums_1.Watermarks.Set;
            var errorOccurred = false;
            try {
                card_1.Card.validateWatermark(watermark);
            }
            catch (e) {
                errorOccurred = true;
            }
            chai_1.expect(errorOccurred).to.be.false;
        });
        it("should allow a value of silumgar", function () {
            var watermark = enums_1.Watermarks.Silumgar;
            var errorOccurred = false;
            try {
                card_1.Card.validateWatermark(watermark);
            }
            catch (e) {
                errorOccurred = true;
            }
            chai_1.expect(errorOccurred).to.be.false;
        });
        it("should allow a value of simic", function () {
            var watermark = enums_1.Watermarks.Simic;
            var errorOccurred = false;
            try {
                card_1.Card.validateWatermark(watermark);
            }
            catch (e) {
                errorOccurred = true;
            }
            chai_1.expect(errorOccurred).to.be.false;
        });
        it("should allow a value of sultai", function () {
            var watermark = enums_1.Watermarks.Sultai;
            var errorOccurred = false;
            try {
                card_1.Card.validateWatermark(watermark);
            }
            catch (e) {
                errorOccurred = true;
            }
            chai_1.expect(errorOccurred).to.be.false;
        });
        it("should allow a value of temur", function () {
            var watermark = enums_1.Watermarks.Temur;
            var errorOccurred = false;
            try {
                card_1.Card.validateWatermark(watermark);
            }
            catch (e) {
                errorOccurred = true;
            }
            chai_1.expect(errorOccurred).to.be.false;
        });
        it("should allow a value of transformers", function () {
            var watermark = enums_1.Watermarks.Transformers;
            var errorOccurred = false;
            try {
                card_1.Card.validateWatermark(watermark);
            }
            catch (e) {
                errorOccurred = true;
            }
            chai_1.expect(errorOccurred).to.be.false;
        });
        it("should allow a value of wotc", function () {
            var watermark = enums_1.Watermarks.WotC;
            var errorOccurred = false;
            try {
                card_1.Card.validateWatermark(watermark);
            }
            catch (e) {
                errorOccurred = true;
            }
            chai_1.expect(errorOccurred).to.be.false;
        });
        it("should allow a value of wpn", function () {
            var watermark = enums_1.Watermarks.WPN;
            var errorOccurred = false;
            try {
                card_1.Card.validateWatermark(watermark);
            }
            catch (e) {
                errorOccurred = true;
            }
            chai_1.expect(errorOccurred).to.be.false;
        });
    });
    describe("border_color", function () {
        it("should error if missing", function () {
            var borderColor;
            var errorOccurred = false;
            try {
                card_1.Card.validateBorderColor(borderColor);
            }
            catch (e) {
                errorOccurred = true;
            }
            chai_1.expect(errorOccurred).to.be.true;
        });
        it("should error if empty", function () {
            var borderColor = "";
            var errorOccurred = false;
            try {
                card_1.Card.validateBorderColor(borderColor);
            }
            catch (e) {
                errorOccurred = true;
            }
            chai_1.expect(errorOccurred).to.be.true;
        });
        it("should error if not a pre-defined value", function () {
            var borderColor = "not pre-defined value";
            var errorOccurred = false;
            try {
                card_1.Card.validateBorderColor(borderColor);
            }
            catch (e) {
                errorOccurred = true;
            }
            chai_1.expect(errorOccurred).to.be.true;
        });
        it("should allow a value of black", function () {
            var borderColor = enums_1.BorderColors.Black;
            var errorOccurred = false;
            try {
                card_1.Card.validateBorderColor(borderColor);
            }
            catch (e) {
                errorOccurred = true;
            }
            chai_1.expect(errorOccurred).to.be.false;
        });
        it("should allow a value of borderless", function () {
            var borderColor = enums_1.BorderColors.Borderless;
            var errorOccurred = false;
            try {
                card_1.Card.validateBorderColor(borderColor);
            }
            catch (e) {
                errorOccurred = true;
            }
            chai_1.expect(errorOccurred).to.be.false;
        });
        it("should allow a value of gold", function () {
            var borderColor = enums_1.BorderColors.Gold;
            var errorOccurred = false;
            try {
                card_1.Card.validateBorderColor(borderColor);
            }
            catch (e) {
                errorOccurred = true;
            }
            chai_1.expect(errorOccurred).to.be.false;
        });
        it("should allow a value of silver", function () {
            var borderColor = enums_1.BorderColors.Silver;
            var errorOccurred = false;
            try {
                card_1.Card.validateBorderColor(borderColor);
            }
            catch (e) {
                errorOccurred = true;
            }
            chai_1.expect(errorOccurred).to.be.false;
        });
        it("should allow a value of white", function () {
            var borderColor = enums_1.BorderColors.White;
            var errorOccurred = false;
            try {
                card_1.Card.validateBorderColor(borderColor);
            }
            catch (e) {
                errorOccurred = true;
            }
            chai_1.expect(errorOccurred).to.be.false;
        });
    });
    describe("story_spotlight_number", function () {
        it("should ignore if missing", function () {
            var storySpotlightNumber;
            var errorOccurred = false;
            try {
                card_1.Card.validateStorySpotlightNumber(storySpotlightNumber);
            }
            catch (e) {
                errorOccurred = true;
            }
            chai_1.expect(errorOccurred).to.be.false;
        });
        it("should error if not a number", function () {
            var storySpotlightNumber = "not a number";
            var errorOccurred = false;
            try {
                card_1.Card.validateStorySpotlightNumber(storySpotlightNumber);
            }
            catch (e) {
                errorOccurred = true;
            }
            chai_1.expect(errorOccurred).to.be.true;
        });
        it("should allow a number", function () {
            var storySpotlightNumber = 1;
            var errorOccurred = false;
            try {
                card_1.Card.validateStorySpotlightNumber(storySpotlightNumber);
            }
            catch (e) {
                errorOccurred = true;
            }
            chai_1.expect(errorOccurred).to.be.false;
        });
    });
    describe("story_spotlight_uri", function () {
        it("should ignore if missing", function () {
            var storySpotlightUri;
            var errorOccurred = false;
            try {
                card_1.Card.validateStorySpotlightUri(storySpotlightUri);
            }
            catch (e) {
                errorOccurred = true;
            }
            chai_1.expect(errorOccurred).to.be.false;
        });
        it("should error if empty", function () {
            var storySpotlightUri = "";
            var errorOccurred = false;
            try {
                card_1.Card.validateStorySpotlightUri(storySpotlightUri);
            }
            catch (e) {
                errorOccurred = true;
            }
            chai_1.expect(errorOccurred).to.be.true;
        });
        it("should invalidate a bad uri", function () {
            var storySpotlightUri = "not a valid uri";
            var errorOccurred = false;
            try {
                card_1.Card.validateStorySpotlightUri(storySpotlightUri);
            }
            catch (e) {
                errorOccurred = true;
            }
            chai_1.expect(errorOccurred).to.be.true;
        });
        it("should allow a valid uri", function () {
            var storySpotlightUri = "http://magic.wizards.com/en/articles/archive/magic-story/brazen-2017-05-03";
            var errorOccurred = false;
            try {
                card_1.Card.validateStorySpotlightUri(storySpotlightUri);
            }
            catch (e) {
                errorOccurred = true;
            }
            chai_1.expect(errorOccurred).to.be.false;
        });
    });
    describe("is_timeshifted", function () {
        it("is required", function () {
            var isTimeshifted;
            var errorOccurred = false;
            try {
                card_1.Card.validateIsTimeshifted(isTimeshifted);
            }
            catch (e) {
                errorOccurred = true;
            }
            chai_1.expect(errorOccurred).to.be.true;
        });
        it("should error if not a boolean", function () {
            var isTimeshifted = "not a boolean";
            var errorOccurred = false;
            try {
                card_1.Card.validateIsTimeshifted(isTimeshifted);
            }
            catch (e) {
                errorOccurred = true;
            }
            chai_1.expect(errorOccurred).to.be.true;
        });
        it("should validate if true", function () {
            var isTimeshifted = true;
            var errorOccurred = false;
            try {
                card_1.Card.validateIsTimeshifted(isTimeshifted);
            }
            catch (e) {
                errorOccurred = true;
            }
            chai_1.expect(errorOccurred).to.be.false;
        });
        it("should validate if false", function () {
            var isTimeshifted = false;
            var errorOccurred = false;
            try {
                card_1.Card.validateIsTimeshifted(isTimeshifted);
            }
            catch (e) {
                errorOccurred = true;
            }
            chai_1.expect(errorOccurred).to.be.false;
        });
    });
    describe("is_colorshifted", function () {
        it("is required", function () {
            var isColorshifted;
            var errorOccurred = false;
            try {
                card_1.Card.validateIsColorshifted(isColorshifted);
            }
            catch (e) {
                errorOccurred = true;
            }
            chai_1.expect(errorOccurred).to.be.true;
        });
        it("should error if not a boolean", function () {
            var isColorshifted = "not a boolean";
            var errorOccurred = false;
            try {
                card_1.Card.validateIsColorshifted(isColorshifted);
            }
            catch (e) {
                errorOccurred = true;
            }
            chai_1.expect(errorOccurred).to.be.true;
        });
        it("should validate if true", function () {
            var isColorshifted = true;
            var errorOccurred = false;
            try {
                card_1.Card.validateIsColorshifted(isColorshifted);
            }
            catch (e) {
                errorOccurred = true;
            }
            chai_1.expect(errorOccurred).to.be.false;
        });
        it("should validate if false", function () {
            var isColorshifted = false;
            var errorOccurred = false;
            try {
                card_1.Card.validateIsColorshifted(isColorshifted);
            }
            catch (e) {
                errorOccurred = true;
            }
            chai_1.expect(errorOccurred).to.be.false;
        });
    });
    describe("is_futureshifted", function () {
        it("is required", function () {
            var isFutureshifted;
            var errorOccurred = false;
            try {
                card_1.Card.validateIsFutureshifted(isFutureshifted);
            }
            catch (e) {
                errorOccurred = true;
            }
            chai_1.expect(errorOccurred).to.be.true;
        });
        it("should error if not a boolean", function () {
            var isFutureshifted = "not a boolean";
            var errorOccurred = false;
            try {
                card_1.Card.validateIsFutureshifted(isFutureshifted);
            }
            catch (e) {
                errorOccurred = true;
            }
            chai_1.expect(errorOccurred).to.be.true;
        });
        it("should validate if true", function () {
            var isFutureshifted = true;
            var errorOccurred = false;
            try {
                card_1.Card.validateIsFutureshifted(isFutureshifted);
            }
            catch (e) {
                errorOccurred = true;
            }
            chai_1.expect(errorOccurred).to.be.false;
        });
        it("should validate if false", function () {
            var isFutureshifted = false;
            var errorOccurred = false;
            try {
                card_1.Card.validateIsFutureshifted(isFutureshifted);
            }
            catch (e) {
                errorOccurred = true;
            }
            chai_1.expect(errorOccurred).to.be.false;
        });
    });
    describe("usd_price", function () {
        it("should ignore if empty", function () {
            var usd;
            var errorOccurred = false;
            try {
                card_1.Card.validateUsdPrice(usd);
            }
            catch (e) {
                errorOccurred = true;
            }
            chai_1.expect(errorOccurred).to.be.false;
        });
        it("should error if not a number", function () {
            var usd = "not a number";
            var errorOccurred = false;
            try {
                card_1.Card.validateUsdPrice(usd);
            }
            catch (e) {
                errorOccurred = true;
            }
            chai_1.expect(errorOccurred).to.be.true;
        });
        it("should error if a negative number", function () {
            var usd = -1;
            var errorOccurred = false;
            try {
                card_1.Card.validateUsdPrice(usd);
            }
            catch (e) {
                errorOccurred = true;
            }
            chai_1.expect(errorOccurred).to.be.true;
        });
        it("should allow a positive integer", function () {
            var usd = 1;
            var errorOccurred = false;
            try {
                card_1.Card.validateUsdPrice(usd);
            }
            catch (e) {
                errorOccurred = true;
            }
            chai_1.expect(errorOccurred).to.be.false;
        });
        it("should allow a positive decimal number", function () {
            var usd = 1.11;
            var errorOccurred = false;
            try {
                card_1.Card.validateUsdPrice(usd);
            }
            catch (e) {
                errorOccurred = true;
            }
            chai_1.expect(errorOccurred).to.be.false;
        });
    });
    describe("tix_price", function () {
        it("should ignore if empty", function () {
            var tix;
            var errorOccurred = false;
            try {
                card_1.Card.validateTixPrice(tix);
            }
            catch (e) {
                errorOccurred = true;
            }
            chai_1.expect(errorOccurred).to.be.false;
        });
        it("should error if not a number", function () {
            var tix = "not a number";
            var errorOccurred = false;
            try {
                card_1.Card.validateTixPrice(tix);
            }
            catch (e) {
                errorOccurred = true;
            }
            chai_1.expect(errorOccurred).to.be.true;
        });
        it("should error if a negative number", function () {
            var tix = -1;
            var errorOccurred = false;
            try {
                card_1.Card.validateTixPrice(tix);
            }
            catch (e) {
                errorOccurred = true;
            }
            chai_1.expect(errorOccurred).to.be.true;
        });
        it("should allow a positive integer", function () {
            var tix = 1;
            var errorOccurred = false;
            try {
                card_1.Card.validateTixPrice(tix);
            }
            catch (e) {
                errorOccurred = true;
            }
            chai_1.expect(errorOccurred).to.be.false;
        });
        it("should allow a positive decimal number", function () {
            var tix = 1.11;
            var errorOccurred = false;
            try {
                card_1.Card.validateTixPrice(tix);
            }
            catch (e) {
                errorOccurred = true;
            }
            chai_1.expect(errorOccurred).to.be.false;
        });
    });
    describe("eur_price", function () {
        it("should ignore if empty", function () {
            var eur;
            var errorOccurred = false;
            try {
                card_1.Card.validateEurPrice(eur);
            }
            catch (e) {
                errorOccurred = true;
            }
            chai_1.expect(errorOccurred).to.be.false;
        });
        it("should error if not a number", function () {
            var eur = "not a number";
            var errorOccurred = false;
            try {
                card_1.Card.validateEurPrice(eur);
            }
            catch (e) {
                errorOccurred = true;
            }
            chai_1.expect(errorOccurred).to.be.true;
        });
        it("should error if a negative number", function () {
            var eur = -1;
            var errorOccurred = false;
            try {
                card_1.Card.validateEurPrice(eur);
            }
            catch (e) {
                errorOccurred = true;
            }
            chai_1.expect(errorOccurred).to.be.true;
        });
        it("should allow a positive integer", function () {
            var eur = 1;
            var errorOccurred = false;
            try {
                card_1.Card.validateEurPrice(eur);
            }
            catch (e) {
                errorOccurred = true;
            }
            chai_1.expect(errorOccurred).to.be.false;
        });
        it("should allow a positive decimal number", function () {
            var eur = 1.11;
            var errorOccurred = false;
            try {
                card_1.Card.validateEurPrice(eur);
            }
            catch (e) {
                errorOccurred = true;
            }
            chai_1.expect(errorOccurred).to.be.false;
        });
    });
    describe("related_links", function () {
        it("should ignore if missing", function () {
            var relatedLinks;
            var errorOccurred = false;
            try {
                card_1.Card.validateRelatedLinks(relatedLinks);
            }
            catch (e) {
                errorOccurred = true;
            }
            chai_1.expect(errorOccurred).to.be.false;
        });
        it("should ignore if gatherer link is missing", function () {
            var relatedLinks = {
                edhrec: "http://edhrec.com/route/?cc=Cruel+Reality",
                mtgtop8: "http://mtgtop8.com/search?MD_check=1&SB_check=1&cards=Cruel+Reality",
                tcgplayer: "http://decks.tcgplayer.com/magic/deck/search?contains=Cruel+Reality&page=1&partner=Scryfall"
            };
            var errorOccurred = false;
            try {
                card_1.Card.validateRelatedLinks(relatedLinks);
            }
            catch (e) {
                errorOccurred = true;
            }
            chai_1.expect(errorOccurred).to.be.false;
        });
        it("should ignore if tcgplayer link is missing", function () {
            var relatedLinks = {
                edhrec: "http://edhrec.com/route/?cc=Cruel+Reality",
                gatherer: "http://gatherer.wizards.com/Pages/Card/Details.aspx?multiverseid=426786",
                mtgtop8: "http://mtgtop8.com/search?MD_check=1&SB_check=1&cards=Cruel+Reality"
            };
            var errorOccurred = false;
            try {
                card_1.Card.validateRelatedLinks(relatedLinks);
            }
            catch (e) {
                errorOccurred = true;
            }
            chai_1.expect(errorOccurred).to.be.false;
        });
        it("should ignore if edhrec link is missing", function () {
            var relatedLinks = {
                gatherer: "http://gatherer.wizards.com/Pages/Card/Details.aspx?multiverseid=426786",
                mtgtop8: "http://mtgtop8.com/search?MD_check=1&SB_check=1&cards=Cruel+Reality",
                tcgplayer: "http://decks.tcgplayer.com/magic/deck/search?contains=Cruel+Reality&page=1&partner=Scryfall"
            };
            var errorOccurred = false;
            try {
                card_1.Card.validateRelatedLinks(relatedLinks);
            }
            catch (e) {
                errorOccurred = true;
            }
            chai_1.expect(errorOccurred).to.be.false;
        });
        it("should ignore if mtgtop8 link is missing", function () {
            var relatedLinks = {
                edhrec: "http://edhrec.com/route/?cc=Cruel+Reality",
                gatherer: "http://gatherer.wizards.com/Pages/Card/Details.aspx?multiverseid=426786",
                tcgplayer: "http://decks.tcgplayer.com/magic/deck/search?contains=Cruel+Reality&page=1&partner=Scryfall"
            };
            var errorOccurred = false;
            try {
                card_1.Card.validateRelatedLinks(relatedLinks);
            }
            catch (e) {
                errorOccurred = true;
            }
            chai_1.expect(errorOccurred).to.be.false;
        });
        it("should error if gatherer link is empty", function () {
            var relatedLinks = {
                gatherer: ""
            };
            var errorOccurred = false;
            try {
                card_1.Card.validateRelatedLinks(relatedLinks);
            }
            catch (e) {
                errorOccurred = true;
            }
            chai_1.expect(errorOccurred).to.be.true;
        });
        it("should error if tcgplayer link is empty", function () {
            var relatedLinks = {
                tcgplayer: ""
            };
            var errorOccurred = false;
            try {
                card_1.Card.validateRelatedLinks(relatedLinks);
            }
            catch (e) {
                errorOccurred = true;
            }
            chai_1.expect(errorOccurred).to.be.true;
        });
        it("should error if edhrec link is empty", function () {
            var relatedLinks = {
                edhrec: ""
            };
            var errorOccurred = false;
            try {
                card_1.Card.validateRelatedLinks(relatedLinks);
            }
            catch (e) {
                errorOccurred = true;
            }
            chai_1.expect(errorOccurred).to.be.true;
        });
        it("should error if mtgtop8 link is empty", function () {
            var relatedLinks = {
                mtgtop8: ""
            };
            var errorOccurred = false;
            try {
                card_1.Card.validateRelatedLinks(relatedLinks);
            }
            catch (e) {
                errorOccurred = true;
            }
            chai_1.expect(errorOccurred).to.be.true;
        });
        it("should error if gatherer link is an invalid uri", function () {
            var relatedLinks = {
                gatherer: "not a valid uri"
            };
            var errorOccurred = false;
            try {
                card_1.Card.validateRelatedLinks(relatedLinks);
            }
            catch (e) {
                errorOccurred = true;
            }
            chai_1.expect(errorOccurred).to.be.true;
        });
        it("should error if tcgplayer link is an invalid uri", function () {
            var relatedLinks = {
                tcgplayer: "not a valid uri"
            };
            var errorOccurred = false;
            try {
                card_1.Card.validateRelatedLinks(relatedLinks);
            }
            catch (e) {
                errorOccurred = true;
            }
            chai_1.expect(errorOccurred).to.be.true;
        });
        it("should error if edhrec link is an invalid uri", function () {
            var relatedLinks = {
                edhrec: "not a valid uri"
            };
            var errorOccurred = false;
            try {
                card_1.Card.validateRelatedLinks(relatedLinks);
            }
            catch (e) {
                errorOccurred = true;
            }
            chai_1.expect(errorOccurred).to.be.true;
        });
        it("should error if mtgtop8 link is an invalid uri", function () {
            var relatedLinks = {
                mtgtop8: "not a valid uri"
            };
            var errorOccurred = false;
            try {
                card_1.Card.validateRelatedLinks(relatedLinks);
            }
            catch (e) {
                errorOccurred = true;
            }
            chai_1.expect(errorOccurred).to.be.true;
        });
        it("should allow a valid gatherer link", function () {
            var relatedLinks = {
                gatherer: "http://gatherer.wizards.com/Pages/Card/Details.aspx?multiverseid=426786"
            };
            var errorOccurred = false;
            try {
                card_1.Card.validateRelatedLinks(relatedLinks);
            }
            catch (e) {
                errorOccurred = true;
            }
            chai_1.expect(errorOccurred).to.be.false;
        });
        it("should allow a valid tcgplayer link", function () {
            var relatedLinks = {
                tcgplayer: "http://decks.tcgplayer.com/magic/deck/search?contains=Cruel+Reality&page=1&partner=Scryfall"
            };
            var errorOccurred = false;
            try {
                card_1.Card.validateRelatedLinks(relatedLinks);
            }
            catch (e) {
                errorOccurred = true;
            }
            chai_1.expect(errorOccurred).to.be.false;
        });
        it("should allow a valid edhrec link", function () {
            var relatedLinks = {
                edhrec: "http://edhrec.com/route/?cc=Cruel+Reality"
            };
            var errorOccurred = false;
            try {
                card_1.Card.validateRelatedLinks(relatedLinks);
            }
            catch (e) {
                errorOccurred = true;
            }
            chai_1.expect(errorOccurred).to.be.false;
        });
        it("should allow a valid mtgtop8 link", function () {
            var relatedLinks = {
                mtgtop8: "http://mtgtop8.com/search?MD_check=1&SB_check=1&cards=Cruel+Reality"
            };
            var errorOccurred = false;
            try {
                card_1.Card.validateRelatedLinks(relatedLinks);
            }
            catch (e) {
                errorOccurred = true;
            }
            chai_1.expect(errorOccurred).to.be.false;
        });
        it("should allow multiple valid links", function () {
            var relatedLinks = {
                edhrec: "http://edhrec.com/route/?cc=Cruel+Reality",
                gatherer: "http://gatherer.wizards.com/Pages/Card/Details.aspx?multiverseid=426786",
                mtgtop8: "http://mtgtop8.com/search?MD_check=1&SB_check=1&cards=Cruel+Reality",
                tcgplayer: "http://decks.tcgplayer.com/magic/deck/search?contains=Cruel+Reality&page=1&partner=Scryfall"
            };
            var errorOccurred = false;
            try {
                card_1.Card.validateRelatedLinks(relatedLinks);
            }
            catch (e) {
                errorOccurred = true;
            }
            chai_1.expect(errorOccurred).to.be.false;
        });
    });
    describe("purchase_links", function () {
        it("should ignore if missing", function () {
            var purcahseLinks;
            var errorOccurred = false;
            try {
                card_1.Card.validatePurchaseLinks(purcahseLinks);
            }
            catch (e) {
                errorOccurred = true;
            }
            chai_1.expect(errorOccurred).to.be.false;
        });
        it("should ignore if amazon link is missing", function () {
            var purchaseLinks = {
                ebay: "http://rover.ebay.com/rover/1/711-53200-19255-0/1?campid=5337966903&icep_catId=19107&icep_ff3=10&icep_sortBy=12&icep_uq=Cruel+Reality&icep_vectorid=229466&ipn=psmain&kw=lg&kwid=902099&mtid=824&pub=5575230669&toolid=10001",
                tcgplayer: "http://store.tcgplayer.com/magic/amonkhet/cruel-reality",
                magiccardmarket: "https://www.cardmarket.com/Magic/Products/Singles/Amonkhet/Cruel+Reality",
                cardhoarder: "https://www.cardhoarder.com/cards/63770?affiliate_id=scryfall&ref=card-profile&utm_campaign=affiliate&utm_medium=card",
                card_kingdom: "https://www.cardkingdom.com/catalog/item/211792",
                mtgo_traders: "http://www.mtgotraders.com/deck/ref.php?id=63770",
                coolstuffinc: "http://www.coolstuffinc.com/p/Magic%3A+The+Gathering/Cruel+Reality"
            };
            var errorOccurred = false;
            try {
                card_1.Card.validatePurchaseLinks(purchaseLinks);
            }
            catch (e) {
                errorOccurred = true;
            }
            chai_1.expect(errorOccurred).to.be.false;
        });
        it("should error if amazon link is empty", function () {
            var purchaseLinks = {
                amazon: ""
            };
            var errorOccurred = false;
            try {
                card_1.Card.validatePurchaseLinks(purchaseLinks);
            }
            catch (e) {
                errorOccurred = true;
            }
            chai_1.expect(errorOccurred).to.be.true;
        });
        it("should error if amazon link is an invalid uri", function () {
            var purchaseLinks = {
                amazon: "not a valid uri"
            };
            var errorOccurred = false;
            try {
                card_1.Card.validatePurchaseLinks(purchaseLinks);
            }
            catch (e) {
                errorOccurred = true;
            }
            chai_1.expect(errorOccurred).to.be.true;
        });
        it("should allow a valid amazon link", function () {
            var purchaseLinks = {
                amazon: "https://www.amazon.com/gp/search?ie=UTF8&index=toys-and-games&keywords=Cruel+Reality"
            };
            var errorOccurred = false;
            try {
                card_1.Card.validatePurchaseLinks(purchaseLinks);
            }
            catch (e) {
                errorOccurred = true;
            }
            chai_1.expect(errorOccurred).to.be.false;
        });
        it("should ignore if ebay link is missing", function () {
            var purchaseLinks = {
                amazon: "https://www.amazon.com/gp/search?ie=UTF8&index=toys-and-games&keywords=Cruel+Reality",
                tcgplayer: "http://store.tcgplayer.com/magic/amonkhet/cruel-reality",
                magiccardmarket: "https://www.cardmarket.com/Magic/Products/Singles/Amonkhet/Cruel+Reality",
                cardhoarder: "https://www.cardhoarder.com/cards/63770?affiliate_id=scryfall&ref=card-profile&utm_campaign=affiliate&utm_medium=card",
                card_kingdom: "https://www.cardkingdom.com/catalog/item/211792",
                mtgo_traders: "http://www.mtgotraders.com/deck/ref.php?id=63770",
                coolstuffinc: "http://www.coolstuffinc.com/p/Magic%3A+The+Gathering/Cruel+Reality"
            };
            var errorOccurred = false;
            try {
                card_1.Card.validatePurchaseLinks(purchaseLinks);
            }
            catch (e) {
                errorOccurred = true;
            }
            chai_1.expect(errorOccurred).to.be.false;
        });
        it("should error if ebay link is empty", function () {
            var purchaseLinks = {
                ebay: ""
            };
            var errorOccurred = false;
            try {
                card_1.Card.validatePurchaseLinks(purchaseLinks);
            }
            catch (e) {
                errorOccurred = true;
            }
            chai_1.expect(errorOccurred).to.be.true;
        });
        it("should error if ebay link is an invalid uri", function () {
            var purchaseLinks = {
                ebay: "not a valid uri"
            };
            var errorOccurred = false;
            try {
                card_1.Card.validatePurchaseLinks(purchaseLinks);
            }
            catch (e) {
                errorOccurred = true;
            }
            chai_1.expect(errorOccurred).to.be.true;
        });
        it("should allow a ebay gatherer link", function () {
            var purchaseLinks = {
                ebay: "http://rover.ebay.com/rover/1/711-53200-19255-0/1?campid=5337966903&icep_catId=19107&icep_ff3=10&icep_sortBy=12&icep_uq=Cruel+Reality&icep_vectorid=229466&ipn=psmain&kw=lg&kwid=902099&mtid=824&pub=5575230669&toolid=10001"
            };
            var errorOccurred = false;
            try {
                card_1.Card.validatePurchaseLinks(purchaseLinks);
            }
            catch (e) {
                errorOccurred = true;
            }
            chai_1.expect(errorOccurred).to.be.false;
        });
        it("should ignore if tcgplayer link is missing", function () {
            var purchaseLinks = {
                amazon: "https://www.amazon.com/gp/search?ie=UTF8&index=toys-and-games&keywords=Cruel+Reality",
                ebay: "http://rover.ebay.com/rover/1/711-53200-19255-0/1?campid=5337966903&icep_catId=19107&icep_ff3=10&icep_sortBy=12&icep_uq=Cruel+Reality&icep_vectorid=229466&ipn=psmain&kw=lg&kwid=902099&mtid=824&pub=5575230669&toolid=10001",
                magiccardmarket: "https://www.cardmarket.com/Magic/Products/Singles/Amonkhet/Cruel+Reality",
                cardhoarder: "https://www.cardhoarder.com/cards/63770?affiliate_id=scryfall&ref=card-profile&utm_campaign=affiliate&utm_medium=card",
                card_kingdom: "https://www.cardkingdom.com/catalog/item/211792",
                mtgo_traders: "http://www.mtgotraders.com/deck/ref.php?id=63770",
                coolstuffinc: "http://www.coolstuffinc.com/p/Magic%3A+The+Gathering/Cruel+Reality"
            };
            var errorOccurred = false;
            try {
                card_1.Card.validatePurchaseLinks(purchaseLinks);
            }
            catch (e) {
                errorOccurred = true;
            }
            chai_1.expect(errorOccurred).to.be.false;
        });
        it("should error if tcgplayer link is empty", function () {
            var purchaseLinks = {
                tcgplayer: ""
            };
            var errorOccurred = false;
            try {
                card_1.Card.validatePurchaseLinks(purchaseLinks);
            }
            catch (e) {
                errorOccurred = true;
            }
            chai_1.expect(errorOccurred).to.be.true;
        });
        it("should error if tcgplayer link is an invalid uri", function () {
            var purchaseLinks = {
                tcgplayer: "not a valid uri"
            };
            var errorOccurred = false;
            try {
                card_1.Card.validatePurchaseLinks(purchaseLinks);
            }
            catch (e) {
                errorOccurred = true;
            }
            chai_1.expect(errorOccurred).to.be.true;
        });
        it("should allow a valid tcgplayer link", function () {
            var purchaseLinks = {
                tcgplayer: "http://store.tcgplayer.com/magic/amonkhet/cruel-reality"
            };
            var errorOccurred = false;
            try {
                card_1.Card.validatePurchaseLinks(purchaseLinks);
            }
            catch (e) {
                errorOccurred = true;
            }
            chai_1.expect(errorOccurred).to.be.false;
        });
        it("should ignore if magiccardmarket link is missing", function () {
            var purchaseLinks = {
                amazon: "https://www.amazon.com/gp/search?ie=UTF8&index=toys-and-games&keywords=Cruel+Reality",
                ebay: "http://rover.ebay.com/rover/1/711-53200-19255-0/1?campid=5337966903&icep_catId=19107&icep_ff3=10&icep_sortBy=12&icep_uq=Cruel+Reality&icep_vectorid=229466&ipn=psmain&kw=lg&kwid=902099&mtid=824&pub=5575230669&toolid=10001",
                tcgplayer: "http://store.tcgplayer.com/magic/amonkhet/cruel-reality",
                cardhoarder: "https://www.cardhoarder.com/cards/63770?affiliate_id=scryfall&ref=card-profile&utm_campaign=affiliate&utm_medium=card",
                card_kingdom: "https://www.cardkingdom.com/catalog/item/211792",
                mtgo_traders: "http://www.mtgotraders.com/deck/ref.php?id=63770",
                coolstuffinc: "http://www.coolstuffinc.com/p/Magic%3A+The+Gathering/Cruel+Reality"
            };
            var errorOccurred = false;
            try {
                card_1.Card.validatePurchaseLinks(purchaseLinks);
            }
            catch (e) {
                errorOccurred = true;
            }
            chai_1.expect(errorOccurred).to.be.false;
        });
        it("should error if magiccardmarket link is empty", function () {
            var purchaseLinks = {
                magiccardmarket: ""
            };
            var errorOccurred = false;
            try {
                card_1.Card.validatePurchaseLinks(purchaseLinks);
            }
            catch (e) {
                errorOccurred = true;
            }
            chai_1.expect(errorOccurred).to.be.true;
        });
        it("should error if magiccardmarket link is an invalid uri", function () {
            var purchaseLinks = {
                magiccardmarket: "not a valid uri"
            };
            var errorOccurred = false;
            try {
                card_1.Card.validatePurchaseLinks(purchaseLinks);
            }
            catch (e) {
                errorOccurred = true;
            }
            chai_1.expect(errorOccurred).to.be.true;
        });
        it("should allow a valid magiccardmarket link", function () {
            var purchaseLinks = {
                magiccardmarket: "https://www.cardmarket.com/Magic/Products/Singles/Amonkhet/Cruel+Reality"
            };
            var errorOccurred = false;
            try {
                card_1.Card.validatePurchaseLinks(purchaseLinks);
            }
            catch (e) {
                errorOccurred = true;
            }
            chai_1.expect(errorOccurred).to.be.false;
        });
        it("should ignore if cardhoarder link is missing", function () {
            var purchaseLinks = {
                amazon: "https://www.amazon.com/gp/search?ie=UTF8&index=toys-and-games&keywords=Cruel+Reality",
                ebay: "http://rover.ebay.com/rover/1/711-53200-19255-0/1?campid=5337966903&icep_catId=19107&icep_ff3=10&icep_sortBy=12&icep_uq=Cruel+Reality&icep_vectorid=229466&ipn=psmain&kw=lg&kwid=902099&mtid=824&pub=5575230669&toolid=10001",
                tcgplayer: "http://store.tcgplayer.com/magic/amonkhet/cruel-reality",
                magiccardmarket: "https://www.cardmarket.com/Magic/Products/Singles/Amonkhet/Cruel+Reality",
                card_kingdom: "https://www.cardkingdom.com/catalog/item/211792",
                mtgo_traders: "http://www.mtgotraders.com/deck/ref.php?id=63770",
                coolstuffinc: "http://www.coolstuffinc.com/p/Magic%3A+The+Gathering/Cruel+Reality"
            };
            var errorOccurred = false;
            try {
                card_1.Card.validatePurchaseLinks(purchaseLinks);
            }
            catch (e) {
                errorOccurred = true;
            }
            chai_1.expect(errorOccurred).to.be.false;
        });
        it("should error if cardhoarder link is empty", function () {
            var purchaseLinks = {
                cardhoarder: ""
            };
            var errorOccurred = false;
            try {
                card_1.Card.validatePurchaseLinks(purchaseLinks);
            }
            catch (e) {
                errorOccurred = true;
            }
            chai_1.expect(errorOccurred).to.be.true;
        });
        it("should error if cardhoarder link is an invalid uri", function () {
            var purchaseLinks = {
                cardhoarder: "not a valid uri"
            };
            var errorOccurred = false;
            try {
                card_1.Card.validatePurchaseLinks(purchaseLinks);
            }
            catch (e) {
                errorOccurred = true;
            }
            chai_1.expect(errorOccurred).to.be.true;
        });
        it("should allow a valid cardhoarder link", function () {
            var purchaseLinks = {
                cardhoarder: "https://www.cardhoarder.com/cards/63770?affiliate_id=scryfall&ref=card-profile&utm_campaign=affiliate&utm_medium=card"
            };
            var errorOccurred = false;
            try {
                card_1.Card.validatePurchaseLinks(purchaseLinks);
            }
            catch (e) {
                errorOccurred = true;
            }
            chai_1.expect(errorOccurred).to.be.false;
        });
        it("should ignore if card_kingdom link is missing", function () {
            var purchaseLinks = {
                amazon: "https://www.amazon.com/gp/search?ie=UTF8&index=toys-and-games&keywords=Cruel+Reality",
                ebay: "http://rover.ebay.com/rover/1/711-53200-19255-0/1?campid=5337966903&icep_catId=19107&icep_ff3=10&icep_sortBy=12&icep_uq=Cruel+Reality&icep_vectorid=229466&ipn=psmain&kw=lg&kwid=902099&mtid=824&pub=5575230669&toolid=10001",
                tcgplayer: "http://store.tcgplayer.com/magic/amonkhet/cruel-reality",
                magiccardmarket: "https://www.cardmarket.com/Magic/Products/Singles/Amonkhet/Cruel+Reality",
                cardhoarder: "https://www.cardhoarder.com/cards/63770?affiliate_id=scryfall&ref=card-profile&utm_campaign=affiliate&utm_medium=card",
                mtgo_traders: "http://www.mtgotraders.com/deck/ref.php?id=63770",
                coolstuffinc: "http://www.coolstuffinc.com/p/Magic%3A+The+Gathering/Cruel+Reality"
            };
            var errorOccurred = false;
            try {
                card_1.Card.validatePurchaseLinks(purchaseLinks);
            }
            catch (e) {
                errorOccurred = true;
            }
            chai_1.expect(errorOccurred).to.be.false;
        });
        it("should error if card_kingdom link is empty", function () {
            var purchaseLinks = {
                card_kingdom: ""
            };
            var errorOccurred = false;
            try {
                card_1.Card.validatePurchaseLinks(purchaseLinks);
            }
            catch (e) {
                errorOccurred = true;
            }
            chai_1.expect(errorOccurred).to.be.true;
        });
        it("should error if card_kingdom link is an invalid uri", function () {
            var purchaseLinks = {
                card_kingdom: "not a valid uri"
            };
            var errorOccurred = false;
            try {
                card_1.Card.validatePurchaseLinks(purchaseLinks);
            }
            catch (e) {
                errorOccurred = true;
            }
            chai_1.expect(errorOccurred).to.be.true;
        });
        it("should allow a valid card_kingdom link", function () {
            var purchaseLinks = {
                card_kingdom: "https://www.cardkingdom.com/catalog/item/211792"
            };
            var errorOccurred = false;
            try {
                card_1.Card.validatePurchaseLinks(purchaseLinks);
            }
            catch (e) {
                errorOccurred = true;
            }
            chai_1.expect(errorOccurred).to.be.false;
        });
        it("should ignore if mtgo_traders link is missing", function () {
            var purchaseLinks = {
                amazon: "https://www.amazon.com/gp/search?ie=UTF8&index=toys-and-games&keywords=Cruel+Reality",
                ebay: "http://rover.ebay.com/rover/1/711-53200-19255-0/1?campid=5337966903&icep_catId=19107&icep_ff3=10&icep_sortBy=12&icep_uq=Cruel+Reality&icep_vectorid=229466&ipn=psmain&kw=lg&kwid=902099&mtid=824&pub=5575230669&toolid=10001",
                tcgplayer: "http://store.tcgplayer.com/magic/amonkhet/cruel-reality",
                magiccardmarket: "https://www.cardmarket.com/Magic/Products/Singles/Amonkhet/Cruel+Reality",
                cardhoarder: "https://www.cardhoarder.com/cards/63770?affiliate_id=scryfall&ref=card-profile&utm_campaign=affiliate&utm_medium=card",
                card_kingdom: "https://www.cardkingdom.com/catalog/item/211792",
                coolstuffinc: "http://www.coolstuffinc.com/p/Magic%3A+The+Gathering/Cruel+Reality"
            };
            var errorOccurred = false;
            try {
                card_1.Card.validatePurchaseLinks(purchaseLinks);
            }
            catch (e) {
                errorOccurred = true;
            }
            chai_1.expect(errorOccurred).to.be.false;
        });
        it("should error if mtgo_traders link is empty", function () {
            var purchaseLinks = {
                mtgo_traders: ""
            };
            var errorOccurred = false;
            try {
                card_1.Card.validatePurchaseLinks(purchaseLinks);
            }
            catch (e) {
                errorOccurred = true;
            }
            chai_1.expect(errorOccurred).to.be.true;
        });
        it("should error if mtgo_traders link is an invalid uri", function () {
            var purchaseLinks = {
                mtgo_traders: "not a valid uri"
            };
            var errorOccurred = false;
            try {
                card_1.Card.validatePurchaseLinks(purchaseLinks);
            }
            catch (e) {
                errorOccurred = true;
            }
            chai_1.expect(errorOccurred).to.be.true;
        });
        it("should allow a valid mtgo_traders link", function () {
            var purchaseLinks = {
                mtgo_traders: "http://www.mtgotraders.com/deck/ref.php?id=63770"
            };
            var errorOccurred = false;
            try {
                card_1.Card.validatePurchaseLinks(purchaseLinks);
            }
            catch (e) {
                errorOccurred = true;
            }
            chai_1.expect(errorOccurred).to.be.false;
        });
        it("should ignore if coolstuffinc link is missing", function () {
            var purchaseLinks = {
                amazon: "https://www.amazon.com/gp/search?ie=UTF8&index=toys-and-games&keywords=Cruel+Reality",
                ebay: "http://rover.ebay.com/rover/1/711-53200-19255-0/1?campid=5337966903&icep_catId=19107&icep_ff3=10&icep_sortBy=12&icep_uq=Cruel+Reality&icep_vectorid=229466&ipn=psmain&kw=lg&kwid=902099&mtid=824&pub=5575230669&toolid=10001",
                tcgplayer: "http://store.tcgplayer.com/magic/amonkhet/cruel-reality",
                magiccardmarket: "https://www.cardmarket.com/Magic/Products/Singles/Amonkhet/Cruel+Reality",
                cardhoarder: "https://www.cardhoarder.com/cards/63770?affiliate_id=scryfall&ref=card-profile&utm_campaign=affiliate&utm_medium=card",
                card_kingdom: "https://www.cardkingdom.com/catalog/item/211792",
                mtgo_traders: "http://www.mtgotraders.com/deck/ref.php?id=63770"
            };
            var errorOccurred = false;
            try {
                card_1.Card.validatePurchaseLinks(purchaseLinks);
            }
            catch (e) {
                errorOccurred = true;
            }
            chai_1.expect(errorOccurred).to.be.false;
        });
        it("should error if coolstuffinc link is empty", function () {
            var purchaseLinks = {
                coolstuffinc: ""
            };
            var errorOccurred = false;
            try {
                card_1.Card.validatePurchaseLinks(purchaseLinks);
            }
            catch (e) {
                errorOccurred = true;
            }
            chai_1.expect(errorOccurred).to.be.true;
        });
        it("should error if coolstuffinc link is an invalid uri", function () {
            var purchaseLinks = {
                coolstuffinc: "not a valid uri"
            };
            var errorOccurred = false;
            try {
                card_1.Card.validatePurchaseLinks(purchaseLinks);
            }
            catch (e) {
                errorOccurred = true;
            }
            chai_1.expect(errorOccurred).to.be.true;
        });
        it("should allow a valid coolstuffinc link", function () {
            var purchaseLinks = {
                coolstuffinc: "http://www.coolstuffinc.com/p/Magic%3A+The+Gathering/Cruel+Reality"
            };
            var errorOccurred = false;
            try {
                card_1.Card.validatePurchaseLinks(purchaseLinks);
            }
            catch (e) {
                errorOccurred = true;
            }
            chai_1.expect(errorOccurred).to.be.false;
        });
        it("should allow multiple valid links", function () {
            var purchaseLinks = {
                amazon: "https://www.amazon.com/gp/search?ie=UTF8&index=toys-and-games&keywords=Cruel+Reality",
                ebay: "http://rover.ebay.com/rover/1/711-53200-19255-0/1?campid=5337966903&icep_catId=19107&icep_ff3=10&icep_sortBy=12&icep_uq=Cruel+Reality&icep_vectorid=229466&ipn=psmain&kw=lg&kwid=902099&mtid=824&pub=5575230669&toolid=10001",
                tcgplayer: "http://store.tcgplayer.com/magic/amonkhet/cruel-reality",
                magiccardmarket: "https://www.cardmarket.com/Magic/Products/Singles/Amonkhet/Cruel+Reality",
                cardhoarder: "https://www.cardhoarder.com/cards/63770?affiliate_id=scryfall&ref=card-profile&utm_campaign=affiliate&utm_medium=card",
                card_kingdom: "https://www.cardkingdom.com/catalog/item/211792",
                mtgo_traders: "http://www.mtgotraders.com/deck/ref.php?id=63770",
                coolstuffinc: "http://www.coolstuffinc.com/p/Magic%3A+The+Gathering/Cruel+Reality"
            };
            var errorOccurred = false;
            try {
                card_1.Card.validatePurchaseLinks(purchaseLinks);
            }
            catch (e) {
                errorOccurred = true;
            }
            chai_1.expect(errorOccurred).to.be.false;
        });
    });
});
//# sourceMappingURL=card.spec.js.map