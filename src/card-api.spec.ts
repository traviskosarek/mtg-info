import "mocha";
import { expect } from "chai";
import * as sinon from "sinon";
import { mockReq, mockRes } from "sinon-express-mock";
let sinonStubPromise = require("sinon-stub-promise");
sinonStubPromise(sinon);

import * as Datastore from "@google-cloud/datastore";
import { Query } from "@google-cloud/datastore";

import { CardAPI } from "./card-api";
import { Card } from "./models";
import { Layouts, Rarities, Frames, Watermarks, BorderColors } from "./enums/index";

let sandbox;
beforeEach(function() {
    sandbox = sinon.sandbox.create();
});

afterEach(function() {
    sandbox.restore();
});

describe("CardAPI", () => {
    describe("instance", () => {
        it("should create singleton instance", () => {
            // arrange

            // act
            let instance = CardAPI.instance();

            // assert
            expect(instance).to.not.be.undefined;
        });

        it("should reuse singleton instance", () => {
            // arrange

            // act
            let originalInstance = CardAPI.instance();
            let secondInstance = CardAPI.instance();

            // assert
            expect(originalInstance).to.be.equal(secondInstance);
        });
    });

    describe("putCard", () => {
        it("should validate input on a valid card", () => {
            // arrange
            let body = {
                body: {
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
                    },
                    card_faces: undefined,
                    color_indicator: undefined,
                    hand_modifier: undefined,
                    life_modifer: undefined,
                    loyalty: undefined,
                    power: undefined,
                    related_cards: undefined,
                    toughness: undefined,
                    extra_value1: true,
                    extra_value2: "value",
                    extra_value3: 123
                }
            };
            let request = mockReq(body);
            let response = mockRes();
            let createCardStub = sandbox.stub(Card, "createCard").callsFake(() => {
                return {};
            });
            let datastoreUpsertStub = sandbox.stub(Datastore.prototype, "upsert");

            // act
            CardAPI.instance().putCard(request, response);

            // assert
            expect(createCardStub.called).to.be.true;

            // cleanup
            createCardStub.restore();
            datastoreUpsertStub.restore();
        });

        it("should reject input on an invalid card", () => {
            // arrange
            let body = {
                body: {
                    set_code: "?"
                }
            };
            let request = mockReq(body);
            let response = mockRes();
            let createCardStub = sandbox.stub(Card, "createCard").callsFake((set) => {
                throw new Error("example error");
            });
            let datastoreUpsertStub = sandbox.stub(Datastore.prototype, "upsert");

            // act
            CardAPI.instance().putCard(request, response);

            // assert
            expect(response.status.called).to.be.true;
            expect(response.status.getCall(0).args[0]).to.be.equal(400);
            expect(response.json.called).to.be.true;

            // cleanup
            createCardStub.restore();
            datastoreUpsertStub.restore();
        });

        it("should 'put' a valid card", () => {
            // arrange
            let body = {
                body: {
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
                    },
                    card_faces: undefined,
                    color_indicator: undefined,
                    hand_modifier: undefined,
                    life_modifer: undefined,
                    loyalty: undefined,
                    power: undefined,
                    related_cards: undefined,
                    toughness: undefined,
                    extra_value1: true,
                    extra_value2: "value",
                    extra_value3: 123
                }
            };
            let request = mockReq(body);
            let response = mockRes();
            let createCardStub = sandbox.stub(Card, "createCard").callsFake(() => {
                return {};
            });
            let datastoreUpsertStub = sandbox.stub(Datastore.prototype, "upsert");
            datastoreUpsertStub.returnsPromise().resolves();

            // act
            CardAPI.instance().putCard(request, response);

            // assert
            expect(response.status.called).to.be.true;
            expect(response.status.getCall(0).args[0]).to.be.equal(200);
            expect(response.json.called).to.be.true;

            // cleanup
            datastoreUpsertStub.restore();
            createCardStub.restore();
        });

        it("should fail gracefully on save error", () => {
            // arrange
            let body = {
                body: {
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
                    },
                    card_faces: undefined,
                    color_indicator: undefined,
                    hand_modifier: undefined,
                    life_modifer: undefined,
                    loyalty: undefined,
                    power: undefined,
                    related_cards: undefined,
                    toughness: undefined,
                    extra_value1: true,
                    extra_value2: "value",
                    extra_value3: 123
                }
            };
            let request = mockReq(body);
            let response = mockRes();
            let createCardStub = sandbox.stub(Card, "createCard").callsFake(() => {
                return {};
            });
            let datastoreUpsertStub = sandbox.stub(Datastore.prototype, "upsert");
            datastoreUpsertStub.returnsPromise().rejects();

            // act
            CardAPI.instance().putCard(request, response);

            // assert
            expect(response.status.called).to.be.true;
            expect(response.status.getCall(0).args[0]).to.be.equal(500);
            expect(response.json.called).to.be.true;

            // cleanup
            createCardStub.restore();
            datastoreUpsertStub.restore();
        });
    });

    describe("putCards", () => {
        it("should allow input with one or more possible cards", () => {
            // arrange
            let body = {
                body: [
                    {
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
                    }
                ]
            };
            let request = mockReq(body);
            let response = mockRes();
            let createCardStub = sandbox.stub(Card, "createCard").callsFake(() => {
                return {};
            });
            let datastoreUpsertStub = sandbox.stub(Datastore.prototype, "upsert");

            // act
            CardAPI.instance().putCards(request, response);

            // assert
            expect(datastoreUpsertStub.called).to.be.true;

            // cleanup
            createCardStub.restore();
            datastoreUpsertStub.restore();
        });

        it("should deny input with zero possible cards", () => {
            // arrange
            let body = {
                body: []
            };
            let request = mockReq(body);
            let response = mockRes();
            let createCardStub = sandbox.stub(Card, "createCard").callsFake(() => {
                return {};
            });
            let datastoreUpsertStub = sandbox.stub(Datastore.prototype, "upsert");

            // act
            CardAPI.instance().putCards(request, response);

            // assert
            expect(datastoreUpsertStub.called).to.be.false;
            expect(response.status.called).to.be.true;
            expect(response.status.getCall(0).args[0]).to.be.equal(400);
            expect(response.json.called).to.be.true;

            // cleanup
            createCardStub.restore();
            datastoreUpsertStub.restore();
        });

        it("should validate all possible cards", () => {
            // arrange
            let body = {
                body: [
                    {
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
                    },
                    {
                        multiverse_ids: [382866],
                        name: "Black Lotus",
                        layout: "normal",
                        image_uri: "https://img.scryfall.com/cards/png/en/vma/4.png?1509841329",
                        converted_mana_cost: 0,
                        type_line: "Artifact",
                        oracle_text: "{T}, Sacrifice Black Lotus: Add three mana of any one color to your mana pool.",
                        mana_cost: "{0}",
                        colors: [],
                        color_identity: [],
                        legality: {
                            is_standard_legal: false,
                            is_frontier_legal: false,
                            is_modern_legal: false,
                            is_pauper_legal: false,
                            is_legacy_legal: false,
                            is_legacy_banned: true,
                            is_penny_legal: false,
                            is_vintage_legal: true,
                            is_vintage_restricted: true,
                            is_duel_legal: false,
                            is_duel_banned: true,
                            is_commander_legal: false,
                            is_commander_banned: true,
                            is_one_versus_one_legal: false,
                            is_one_versus_one_banned: true,
                            is_future_legal: false
                        },
                        is_reserved: true,
                        is_reprint: true,
                        set_code: "vma",
                        set_name: "Vintage Masters",
                        collector_number: "4",
                        is_digital: true,
                        rarity: "mythic",
                        illustration_id: "da62ded1-bedd-44c6-8950-ca56e691a899",
                        artist: "Chris Rahn",
                        frame: "2015",
                        is_full_art: false,
                        border_color: "black",
                        is_timeshifted: false,
                        is_colorshifted: false,
                        is_futureshifted: false,
                        edhrec_rank: 13442,
                        tix_price: "64.61",
                        related_links: {
                            gatherer: "http://gatherer.wizards.com/Pages/Card/Details.aspx?multiverseid=382866",
                            tcgplayer: "http://decks.tcgplayer.com/magic/deck/search?contains=Black+Lotus&page=1&partner=Scryfall",
                            edhrec: "http://edhrec.com/route/?cc=Black+Lotus",
                            mtgtop8: "http://mtgtop8.com/search?MD_check=1&SB_check=1&cards=Black+Lotus"
                        },
                        purchase_links: {
                            amazon: "https://www.amazon.com/gp/search?ie=UTF8&index=toys-and-games&keywords=Black+Lotus&tag=scryfall-20",
                            ebay:
                                "http://rover.ebay.com/rover/1/711-53200-19255-0/1?campid=5337966903&icep_catId=19107&icep_ff3=10&icep_sortBy=12&icep_uq=Black+Lotus&icep_vectorid=229466&ipn=psmain&kw=lg&kwid=902099&mtid=824&pub=5575230669&toolid=10001",
                            tcgplayer: "http://shop.tcgplayer.com/magic/product/show?ProductName=Black+Lotus&partner=Scryfall",
                            magiccardmarket: "https://www.cardmarket.com/Magic?mainPage=showSearchResult&referrer=scryfall&searchFor=Black+Lotus",
                            cardhoarder: "https://www.cardhoarder.com/cards/53155?affiliate_id=scryfall&ref=card-profile&utm_campaign=affiliate&utm_medium=card&utm_source=scryfall",
                            card_kingdom: "https://www.cardkingdom.com/catalog/search?filter%5Bname%5D=Black+Lotus&partner=scryfall&utm_campaign=affiliate&utm_medium=scryfall&utm_source=scryfall",
                            mtgo_traders: "http://www.mtgotraders.com/deck/ref.php?id=53155&referral=scryfall",
                            coolstuffinc: "http://www.coolstuffinc.com/main_search.php?pa=searchOnName&page=1&q=Black+Lotus&resultsPerPage=50&utm_source=scryfall"
                        }
                    }
                ]
            };
            let request = mockReq(body);
            let response = mockRes();
            let createCardStub = sandbox.stub(Card, "createCard").callsFake(() => {
                return {};
            });
            let datastoreUpsertStub = sandbox.stub(Datastore.prototype, "upsert");

            // act
            CardAPI.instance().putCards(request, response);

            // assert
            expect(createCardStub.called).to.be.true;
            expect(createCardStub.callCount).to.be.equal(2);

            // cleanup
            createCardStub.restore();
            datastoreUpsertStub.restore();
        });

        it("should 'put' all validated cards", () => {
            // arrange
            let body = {
                body: [
                    {
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
                    },
                    {
                        multiverse_ids: [382866],
                        name: "Black Lotus",
                        layout: "normal",
                        image_uri: "https://img.scryfall.com/cards/png/en/vma/4.png?1509841329",
                        converted_mana_cost: 0,
                        type_line: "Artifact",
                        oracle_text: "{T}, Sacrifice Black Lotus: Add three mana of any one color to your mana pool.",
                        mana_cost: "{0}",
                        colors: [],
                        color_identity: [],
                        legality: {
                            is_standard_legal: false,
                            is_frontier_legal: false,
                            is_modern_legal: false,
                            is_pauper_legal: false,
                            is_legacy_legal: false,
                            is_legacy_banned: true,
                            is_penny_legal: false,
                            is_vintage_legal: true,
                            is_vintage_restricted: true,
                            is_duel_legal: false,
                            is_duel_banned: true,
                            is_commander_legal: false,
                            is_commander_banned: true,
                            is_one_versus_one_legal: false,
                            is_one_versus_one_banned: true,
                            is_future_legal: false
                        },
                        is_reserved: true,
                        is_reprint: true,
                        set_code: "vma",
                        set_name: "Vintage Masters",
                        collector_number: "4",
                        is_digital: true,
                        rarity: "mythic",
                        illustration_id: "da62ded1-bedd-44c6-8950-ca56e691a899",
                        artist: "Chris Rahn",
                        frame: "2015",
                        is_full_art: false,
                        border_color: "black",
                        is_timeshifted: false,
                        is_colorshifted: false,
                        is_futureshifted: false,
                        edhrec_rank: 13442,
                        tix_price: "64.61",
                        related_links: {
                            gatherer: "http://gatherer.wizards.com/Pages/Card/Details.aspx?multiverseid=382866",
                            tcgplayer: "http://decks.tcgplayer.com/magic/deck/search?contains=Black+Lotus&page=1&partner=Scryfall",
                            edhrec: "http://edhrec.com/route/?cc=Black+Lotus",
                            mtgtop8: "http://mtgtop8.com/search?MD_check=1&SB_check=1&cards=Black+Lotus"
                        },
                        purchase_links: {
                            amazon: "https://www.amazon.com/gp/search?ie=UTF8&index=toys-and-games&keywords=Black+Lotus&tag=scryfall-20",
                            ebay:
                                "http://rover.ebay.com/rover/1/711-53200-19255-0/1?campid=5337966903&icep_catId=19107&icep_ff3=10&icep_sortBy=12&icep_uq=Black+Lotus&icep_vectorid=229466&ipn=psmain&kw=lg&kwid=902099&mtid=824&pub=5575230669&toolid=10001",
                            tcgplayer: "http://shop.tcgplayer.com/magic/product/show?ProductName=Black+Lotus&partner=Scryfall",
                            magiccardmarket: "https://www.cardmarket.com/Magic?mainPage=showSearchResult&referrer=scryfall&searchFor=Black+Lotus",
                            cardhoarder: "https://www.cardhoarder.com/cards/53155?affiliate_id=scryfall&ref=card-profile&utm_campaign=affiliate&utm_medium=card&utm_source=scryfall",
                            card_kingdom: "https://www.cardkingdom.com/catalog/search?filter%5Bname%5D=Black+Lotus&partner=scryfall&utm_campaign=affiliate&utm_medium=scryfall&utm_source=scryfall",
                            mtgo_traders: "http://www.mtgotraders.com/deck/ref.php?id=53155&referral=scryfall",
                            coolstuffinc: "http://www.coolstuffinc.com/main_search.php?pa=searchOnName&page=1&q=Black+Lotus&resultsPerPage=50&utm_source=scryfall"
                        }
                    }
                ]
            };
            let request = mockReq(body);
            let response = mockRes();
            let createCardStub = sandbox.stub(Card, "createCard").callsFake(() => {
                return {};
            });
            let datastoreUpsertStub = sandbox.stub(Datastore.prototype, "upsert");
            datastoreUpsertStub.returnsPromise().resolves();

            // act
            CardAPI.instance().putCards(request, response);

            // assert
            expect(datastoreUpsertStub.called).to.be.true;
            expect(datastoreUpsertStub.getCall(0).args[0].length).to.be.equal(2);
            expect(response.status.called).to.be.true;
            expect(response.status.getCall(0).args[0]).to.be.equal(200);
            expect(response.json.called).to.be.true;

            // cleanup
            createCardStub.restore();
            datastoreUpsertStub.restore();
        });

        it("should fail gracefully on save error", () => {
            // arrange
            let body = {
                body: [
                    {
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
                    },
                    {
                        multiverse_ids: [382866],
                        name: "Black Lotus",
                        layout: "normal",
                        image_uri: "https://img.scryfall.com/cards/png/en/vma/4.png?1509841329",
                        converted_mana_cost: 0,
                        type_line: "Artifact",
                        oracle_text: "{T}, Sacrifice Black Lotus: Add three mana of any one color to your mana pool.",
                        mana_cost: "{0}",
                        colors: [],
                        color_identity: [],
                        legality: {
                            is_standard_legal: false,
                            is_frontier_legal: false,
                            is_modern_legal: false,
                            is_pauper_legal: false,
                            is_legacy_legal: false,
                            is_legacy_banned: true,
                            is_penny_legal: false,
                            is_vintage_legal: true,
                            is_vintage_restricted: true,
                            is_duel_legal: false,
                            is_duel_banned: true,
                            is_commander_legal: false,
                            is_commander_banned: true,
                            is_one_versus_one_legal: false,
                            is_one_versus_one_banned: true,
                            is_future_legal: false
                        },
                        is_reserved: true,
                        is_reprint: true,
                        set_code: "vma",
                        set_name: "Vintage Masters",
                        collector_number: "4",
                        is_digital: true,
                        rarity: "mythic",
                        illustration_id: "da62ded1-bedd-44c6-8950-ca56e691a899",
                        artist: "Chris Rahn",
                        frame: "2015",
                        is_full_art: false,
                        border_color: "black",
                        is_timeshifted: false,
                        is_colorshifted: false,
                        is_futureshifted: false,
                        edhrec_rank: 13442,
                        tix_price: "64.61",
                        related_links: {
                            gatherer: "http://gatherer.wizards.com/Pages/Card/Details.aspx?multiverseid=382866",
                            tcgplayer: "http://decks.tcgplayer.com/magic/deck/search?contains=Black+Lotus&page=1&partner=Scryfall",
                            edhrec: "http://edhrec.com/route/?cc=Black+Lotus",
                            mtgtop8: "http://mtgtop8.com/search?MD_check=1&SB_check=1&cards=Black+Lotus"
                        },
                        purchase_links: {
                            amazon: "https://www.amazon.com/gp/search?ie=UTF8&index=toys-and-games&keywords=Black+Lotus&tag=scryfall-20",
                            ebay:
                                "http://rover.ebay.com/rover/1/711-53200-19255-0/1?campid=5337966903&icep_catId=19107&icep_ff3=10&icep_sortBy=12&icep_uq=Black+Lotus&icep_vectorid=229466&ipn=psmain&kw=lg&kwid=902099&mtid=824&pub=5575230669&toolid=10001",
                            tcgplayer: "http://shop.tcgplayer.com/magic/product/show?ProductName=Black+Lotus&partner=Scryfall",
                            magiccardmarket: "https://www.cardmarket.com/Magic?mainPage=showSearchResult&referrer=scryfall&searchFor=Black+Lotus",
                            cardhoarder: "https://www.cardhoarder.com/cards/53155?affiliate_id=scryfall&ref=card-profile&utm_campaign=affiliate&utm_medium=card&utm_source=scryfall",
                            card_kingdom: "https://www.cardkingdom.com/catalog/search?filter%5Bname%5D=Black+Lotus&partner=scryfall&utm_campaign=affiliate&utm_medium=scryfall&utm_source=scryfall",
                            mtgo_traders: "http://www.mtgotraders.com/deck/ref.php?id=53155&referral=scryfall",
                            coolstuffinc: "http://www.coolstuffinc.com/main_search.php?pa=searchOnName&page=1&q=Black+Lotus&resultsPerPage=50&utm_source=scryfall"
                        }
                    }
                ]
            };
            let request = mockReq(body);
            let response = mockRes();
            let createCardStub = sandbox.stub(Card, "createCard").callsFake(() => {
                return {};
            });
            let datastoreUpsertStub = sandbox.stub(Datastore.prototype, "upsert");
            datastoreUpsertStub.returnsPromise().rejects();

            // act
            CardAPI.instance().putCards(request, response);

            // assert
            expect(datastoreUpsertStub.called).to.be.true;
            expect(datastoreUpsertStub.getCall(0).args[0].length).to.be.equal(2);
            expect(response.status.called).to.be.true;
            expect(response.status.getCall(0).args[0]).to.be.equal(500);
            expect(response.json.called).to.be.true;

            // cleanup
            createCardStub.restore();
            datastoreUpsertStub.restore();
        });

        it("should reject input on invalid cards", () => {
            // arrange
            let body = {
                body: [
                    {
                        set_code: "xxx"
                    },
                    {
                        set_code: "?"
                    }
                ]
            };
            let request = mockReq(body);
            let response = mockRes();
            let createCardStub = sandbox.stub(Card, "createCard").callsFake(() => {
                throw new Error("example error");
            });
            let datastoreUpsertStub = sandbox.stub(Datastore.prototype, "upsert");
            datastoreUpsertStub.returnsPromise().rejects();

            // act
            CardAPI.instance().putCards(request, response);

            // assert
            expect(datastoreUpsertStub.called).to.be.false;
            expect(response.status.called).to.be.true;
            expect(response.status.getCall(0).args[0]).to.be.equal(400);
            expect(response.json.called).to.be.true;

            // cleanup
            createCardStub.restore();
            datastoreUpsertStub.restore();
        });
    });

    describe("getCard", () => {
        it("should reject retrieval on invalid set_code", () => {
            // arrange
            let body = {
                body: {
                    set_code: "???",
                    collector_number: "84"
                }
            };
            let request = mockReq(body);
            let response = mockRes();
            let validateSetCodeStub = sandbox.stub(Card, "validateSetCode").callsFake(() => {
                throw new Error("example error");
            });
            let validateCollectorNumberStub = sandbox.stub(Card, "validateCollectorNumber");
            let datastoreGetStub = sandbox.stub(Datastore.prototype, "get");

            // act
            CardAPI.instance().getCard(request, response);

            // assert
            expect(validateSetCodeStub.called).to.be.true;
            expect(datastoreGetStub.called).to.be.false;
            expect(response.status.called).to.be.true;
            expect(response.status.getCall(0).args[0]).to.be.equal(400);
            expect(response.json.called).to.be.true;

            // cleanup
            validateCollectorNumberStub.restore();
            validateSetCodeStub.restore();
            datastoreGetStub.restore();
        });

        it("should reject retrieval on invalid collector_number", () => {
            // arrange
            let body = {
                body: {
                    set_code: "akh",
                    collector_number: "???"
                }
            };
            let request = mockReq(body);
            let response = mockRes();
            let validateSetCodeStub = sandbox.stub(Card, "validateSetCode");
            let validateCollectorNumberStub = sandbox.stub(Card, "validateCollectorNumber").callsFake(() => {
                throw new Error("example error");
            });
            let datastoreGetStub = sandbox.stub(Datastore.prototype, "get");

            // act
            CardAPI.instance().getCard(request, response);

            // assert
            expect(validateCollectorNumberStub.called).to.be.true;
            expect(datastoreGetStub.called).to.be.false;
            expect(response.status.called).to.be.true;
            expect(response.status.getCall(0).args[0]).to.be.equal(400);
            expect(response.json.called).to.be.true;

            // cleanup
            validateCollectorNumberStub.restore();
            validateSetCodeStub.restore();
            datastoreGetStub.restore();
        });

        it("should retrieve a set with a valid set_code and valid collector_number", () => {
            // arrange
            let body = {
                body: {
                    set_code: "akh",
                    collector_number: "84"
                }
            };
            let request = mockReq(body);
            let response = mockRes();
            let validateSetCodeStub = sandbox.stub(Card, "validateSetCode");
            let validateCollectorNumberStub = sandbox.stub(Card, "validateCollectorNumber");
            let datastoreGetStub = sandbox.stub(Datastore.prototype, "get");

            // act
            datastoreGetStub.returnsPromise().resolves([{}]);
            CardAPI.instance().getCard(request, response);

            // assert
            expect(validateSetCodeStub.called).to.be.true;
            expect(validateCollectorNumberStub.called).to.be.true;
            expect(datastoreGetStub.called).to.be.true;
            expect(response.status.called).to.be.true;
            expect(response.status.getCall(0).args[0]).to.be.equal(200);
            expect(response.json.called).to.be.true;

            // cleanup
            validateCollectorNumberStub.restore();
            validateSetCodeStub.restore();
            datastoreGetStub.restore();
        });

        it("should return a not found error code when no results are returned", () => {
            // arrange
            let body = {
                body: {
                    set_code: "akh",
                    collector_number: "84"
                }
            };
            let request = mockReq(body);
            let response = mockRes();
            let validateSetCodeStub = sandbox.stub(Card, "validateSetCode");
            let validateCollectorNumberStub = sandbox.stub(Card, "validateCollectorNumber");
            let datastoreGetStub = sandbox.stub(Datastore.prototype, "get");

            // act
            datastoreGetStub.returnsPromise().resolves([]);
            CardAPI.instance().getCard(request, response);

            // assert
            expect(validateSetCodeStub.called).to.be.true;
            expect(validateCollectorNumberStub.called).to.be.true;
            expect(datastoreGetStub.called).to.be.true;
            expect(response.status.called).to.be.true;
            expect(response.status.getCall(0).args[0]).to.be.equal(400);
            expect(response.json.called).to.be.true;

            // cleanup
            validateCollectorNumberStub.restore();
            validateSetCodeStub.restore();
            datastoreGetStub.restore();
        });

        it("should fail gracefully on save error", () => {
            // arrange
            let body = {
                body: {
                    set_code: "akh",
                    collector_number: "84"
                }
            };
            let request = mockReq(body);
            let response = mockRes();
            let validateSetCodeStub = sandbox.stub(Card, "validateSetCode");
            let validateCollectorNumberStub = sandbox.stub(Card, "validateCollectorNumber");
            let datastoreGetStub = sandbox.stub(Datastore.prototype, "get");

            // act
            datastoreGetStub.returnsPromise().rejects();
            CardAPI.instance().getCard(request, response);

            // assert
            expect(validateSetCodeStub.called).to.be.true;
            expect(validateCollectorNumberStub.called).to.be.true;
            expect(datastoreGetStub.called).to.be.true;
            expect(response.status.called).to.be.true;
            expect(response.status.getCall(0).args[0]).to.be.equal(500);
            expect(response.json.called).to.be.true;

            // cleanup
            validateCollectorNumberStub.restore();
            validateSetCodeStub.restore();
            datastoreGetStub.restore();
        });
    });

    describe("getCards", () => {
        it("should get all cards", () => {
            // arrange
            let body = {
                body: {}
            };
            let request = mockReq(body);
            let response = mockRes();

            let datastoreCreateQueryStub = sandbox.stub(Datastore.prototype, "createQuery").callsFake((kind) => {
                return new Query();
            });
            let datastoreRunQueryStub = sandbox.stub(Datastore.prototype, "runQuery");
            datastoreRunQueryStub.returnsPromise().resolves();
            let queryOrderStub = sandbox.stub(Query.prototype, "order").callsFake(() => {
                return new Query();
            });
            let queryFilterStub = sandbox.stub(Query.prototype, "filter");

            // act
            CardAPI.instance().getCards(request, response);

            // assert
            expect(datastoreCreateQueryStub.called).to.be.true;
            expect(queryOrderStub.called).to.be.true;
            expect(queryOrderStub.getCall(0).args[0]).to.be.equal("set_name");
            // expect(queryOrderStub.getCall(1).args[0]).to.be.equal("collector_number");
            expect(datastoreRunQueryStub.called).to.be.true;
            expect(response.status.called).to.be.true;
            expect(response.status.getCall(0).args[0]).to.be.equal(200);
            expect(response.json.called).to.be.true;

            // cleanup
            datastoreCreateQueryStub.restore();
            datastoreRunQueryStub.restore();
            queryOrderStub.restore();
            queryFilterStub.restore();
        });

        it("should validate and filter based on name", () => {
            // arrange
            let body = {
                body: {
                    name: "Cruel Reality"
                }
            };
            let request = mockReq(body);
            let response = mockRes();

            let datastoreCreateQueryStub = sandbox.stub(Datastore.prototype, "createQuery").callsFake((kind) => {
                return new Query();
            });
            let datastoreRunQueryStub = sandbox.stub(Datastore.prototype, "runQuery");
            datastoreRunQueryStub.returnsPromise().resolves();
            let queryOrderStub = sandbox.stub(Query.prototype, "order").callsFake(() => {
                return new Query();
            });
            let queryFilterStub = sandbox.stub(Query.prototype, "filter").callsFake(() => {
                return new Query();
            });
            let validateNameStub = sandbox.stub(Card, "validateName");

            // act
            CardAPI.instance().getCards(request, response);

            // assert
            expect(datastoreCreateQueryStub.called).to.be.true;
            expect(validateNameStub.called).to.be.true;
            expect(queryFilterStub.called).to.be.true;
            expect(queryFilterStub.getCall(0).args[0]).to.be.equal("name");
            expect(queryFilterStub.getCall(0).args[1]).to.be.equal("=");
            expect(queryFilterStub.getCall(0).args[2]).to.be.equal(body.body.name);
            expect(queryOrderStub.called).to.be.true;
            expect(queryOrderStub.getCall(0).args[0]).to.be.equal("name");
            expect(datastoreRunQueryStub.called).to.be.true;
            expect(response.status.called).to.be.true;
            expect(response.status.getCall(0).args[0]).to.be.equal(200);
            expect(response.json.called).to.be.true;

            // cleanup
            datastoreCreateQueryStub.restore();
            datastoreRunQueryStub.restore();
            queryOrderStub.restore();
            queryFilterStub.restore();
            validateNameStub.restore();
        });

        it("should invalidate and return error on invalid name", () => {
            // arrange
            let body = {
                body: {
                    name: "Cruel Reality"
                }
            };
            let request = mockReq(body);
            let response = mockRes();

            let datastoreCreateQueryStub = sandbox.stub(Datastore.prototype, "createQuery").callsFake((kind) => {
                return new Query();
            });
            let datastoreRunQueryStub = sandbox.stub(Datastore.prototype, "runQuery");
            datastoreRunQueryStub.returnsPromise().resolves();
            let queryOrderStub = sandbox.stub(Query.prototype, "order").callsFake(() => {
                return new Query();
            });
            let queryFilterStub = sandbox.stub(Query.prototype, "filter").callsFake(() => {
                return new Query();
            });
            let validateNameStub = sandbox.stub(Card, "validateName").callsFake(() => {
                throw new Error("example error");
            });

            // act
            CardAPI.instance().getCards(request, response);

            // assert
            expect(datastoreCreateQueryStub.called).to.be.true;
            expect(validateNameStub.called).to.be.true;
            expect(queryFilterStub.called).to.be.false;
            expect(queryOrderStub.called).to.be.false;
            expect(datastoreRunQueryStub.called).to.be.false;
            expect(response.status.called).to.be.true;
            expect(response.status.getCall(0).args[0]).to.be.equal(400);
            expect(response.json.called).to.be.true;

            // cleanup
            datastoreCreateQueryStub.restore();
            datastoreRunQueryStub.restore();
            queryOrderStub.restore();
            queryFilterStub.restore();
            validateNameStub.restore();
        });

        it("should validate and filter based on layout", () => {
            // arrange
            let body = {
                body: {
                    layout: Layouts.Normal
                }
            };
            let request = mockReq(body);
            let response = mockRes();

            let datastoreCreateQueryStub = sandbox.stub(Datastore.prototype, "createQuery").callsFake((kind) => {
                return new Query();
            });
            let datastoreRunQueryStub = sandbox.stub(Datastore.prototype, "runQuery");
            datastoreRunQueryStub.returnsPromise().resolves();
            let queryOrderStub = sandbox.stub(Query.prototype, "order").callsFake(() => {
                return new Query();
            });
            let queryFilterStub = sandbox.stub(Query.prototype, "filter").callsFake(() => {
                return new Query();
            });
            let validatLayoutStub = sandbox.stub(Card, "validateLayout");

            // act
            CardAPI.instance().getCards(request, response);

            // assert
            expect(datastoreCreateQueryStub.called).to.be.true;
            expect(validatLayoutStub.called).to.be.true;
            expect(queryFilterStub.called).to.be.true;
            expect(queryFilterStub.getCall(0).args[0]).to.be.equal("layout");
            expect(queryFilterStub.getCall(0).args[1]).to.be.equal("=");
            expect(queryFilterStub.getCall(0).args[2]).to.be.equal(body.body.layout);
            expect(queryOrderStub.called).to.be.true;
            expect(queryOrderStub.getCall(0).args[0]).to.be.equal("layout");
            expect(datastoreRunQueryStub.called).to.be.true;
            expect(response.status.called).to.be.true;
            expect(response.status.getCall(0).args[0]).to.be.equal(200);
            expect(response.json.called).to.be.true;

            // cleanup
            datastoreCreateQueryStub.restore();
            datastoreRunQueryStub.restore();
            queryOrderStub.restore();
            queryFilterStub.restore();
            validatLayoutStub.restore();
        });

        it("should invalidate and return error on invalid layout", () => {
            // arrange
            let body = {
                body: {
                    layout: "xxx"
                }
            };
            let request = mockReq(body);
            let response = mockRes();

            let datastoreCreateQueryStub = sandbox.stub(Datastore.prototype, "createQuery").callsFake((kind) => {
                return new Query();
            });
            let datastoreRunQueryStub = sandbox.stub(Datastore.prototype, "runQuery");
            datastoreRunQueryStub.returnsPromise().resolves();
            let queryOrderStub = sandbox.stub(Query.prototype, "order").callsFake(() => {
                return new Query();
            });
            let queryFilterStub = sandbox.stub(Query.prototype, "filter").callsFake(() => {
                return new Query();
            });
            let validatLayoutStub = sandbox.stub(Card, "validateLayout").callsFake(() => {
                throw new Error("example error");
            });

            // act
            CardAPI.instance().getCards(request, response);

            // assert
            expect(datastoreCreateQueryStub.called).to.be.true;
            expect(validatLayoutStub.called).to.be.true;
            expect(queryFilterStub.called).to.be.false;
            expect(queryOrderStub.called).to.be.false;
            expect(datastoreRunQueryStub.called).to.be.false;
            expect(response.status.called).to.be.true;
            expect(response.status.getCall(0).args[0]).to.be.equal(400);
            expect(response.json.called).to.be.true;

            // cleanup
            datastoreCreateQueryStub.restore();
            datastoreRunQueryStub.restore();
            queryOrderStub.restore();
            queryFilterStub.restore();
            validatLayoutStub.restore();
        });

        it("should validate and filter based on converted_mana_cost", () => {
            // arrange
            let body = {
                body: {
                    converted_mana_cost: 7
                }
            };
            let request = mockReq(body);
            let response = mockRes();

            let datastoreCreateQueryStub = sandbox.stub(Datastore.prototype, "createQuery").callsFake((kind) => {
                return new Query();
            });
            let datastoreRunQueryStub = sandbox.stub(Datastore.prototype, "runQuery");
            datastoreRunQueryStub.returnsPromise().resolves();
            let queryOrderStub = sandbox.stub(Query.prototype, "order").callsFake(() => {
                return new Query();
            });
            let queryFilterStub = sandbox.stub(Query.prototype, "filter").callsFake(() => {
                return new Query();
            });
            let validateConvertedManaCostStub = sandbox.stub(Card, "validateConvertedManaCost");

            // act
            CardAPI.instance().getCards(request, response);

            // assert
            expect(datastoreCreateQueryStub.called).to.be.true;
            expect(validateConvertedManaCostStub.called).to.be.true;
            expect(queryFilterStub.called).to.be.true;
            expect(queryFilterStub.getCall(0).args[0]).to.be.equal("converted_mana_cost");
            expect(queryFilterStub.getCall(0).args[1]).to.be.equal("=");
            expect(queryFilterStub.getCall(0).args[2]).to.be.equal(body.body.converted_mana_cost);
            expect(queryOrderStub.called).to.be.true;
            expect(queryOrderStub.getCall(0).args[0]).to.be.equal("converted_mana_cost");
            expect(datastoreRunQueryStub.called).to.be.true;
            expect(response.status.called).to.be.true;
            expect(response.status.getCall(0).args[0]).to.be.equal(200);
            expect(response.json.called).to.be.true;

            // cleanup
            datastoreCreateQueryStub.restore();
            datastoreRunQueryStub.restore();
            queryOrderStub.restore();
            queryFilterStub.restore();
            validateConvertedManaCostStub.restore();
        });

        it("should invalidate and return error on invalid converted_mana_cost", () => {
            // arrange
            let body = {
                body: {
                    converted_mana_cost: 7
                }
            };
            let request = mockReq(body);
            let response = mockRes();

            let datastoreCreateQueryStub = sandbox.stub(Datastore.prototype, "createQuery").callsFake((kind) => {
                return new Query();
            });
            let datastoreRunQueryStub = sandbox.stub(Datastore.prototype, "runQuery");
            datastoreRunQueryStub.returnsPromise().resolves();
            let queryOrderStub = sandbox.stub(Query.prototype, "order").callsFake(() => {
                return new Query();
            });
            let queryFilterStub = sandbox.stub(Query.prototype, "filter").callsFake(() => {
                return new Query();
            });
            let validatConvertedManaCostStub = sandbox.stub(Card, "validateConvertedManaCost").callsFake(() => {
                throw new Error("example error");
            });

            // act
            CardAPI.instance().getCards(request, response);

            // assert
            expect(datastoreCreateQueryStub.called).to.be.true;
            expect(validatConvertedManaCostStub.called).to.be.true;
            expect(queryFilterStub.called).to.be.false;
            expect(queryOrderStub.called).to.be.false;
            expect(datastoreRunQueryStub.called).to.be.false;
            expect(response.status.called).to.be.true;
            expect(response.status.getCall(0).args[0]).to.be.equal(400);
            expect(response.json.called).to.be.true;

            // cleanup
            datastoreCreateQueryStub.restore();
            datastoreRunQueryStub.restore();
            queryOrderStub.restore();
            queryFilterStub.restore();
            validatConvertedManaCostStub.restore();
        });

        it("should validate and filter based on mana_cost", () => {
            // arrange
            let body = {
                body: {
                    mana_cost: "{5}{B}{B}"
                }
            };
            let request = mockReq(body);
            let response = mockRes();

            let datastoreCreateQueryStub = sandbox.stub(Datastore.prototype, "createQuery").callsFake((kind) => {
                return new Query();
            });
            let datastoreRunQueryStub = sandbox.stub(Datastore.prototype, "runQuery");
            datastoreRunQueryStub.returnsPromise().resolves();
            let queryOrderStub = sandbox.stub(Query.prototype, "order").callsFake(() => {
                return new Query();
            });
            let queryFilterStub = sandbox.stub(Query.prototype, "filter").callsFake(() => {
                return new Query();
            });
            let validateManaCostStub = sandbox.stub(Card, "validateManaCost");

            // act
            CardAPI.instance().getCards(request, response);

            // assert
            expect(datastoreCreateQueryStub.called).to.be.true;
            expect(validateManaCostStub.called).to.be.true;
            expect(queryFilterStub.called).to.be.true;
            expect(queryFilterStub.getCall(0).args[0]).to.be.equal("mana_cost");
            expect(queryFilterStub.getCall(0).args[1]).to.be.equal("=");
            expect(queryFilterStub.getCall(0).args[2]).to.be.equal(body.body.mana_cost);
            expect(queryOrderStub.called).to.be.true;
            expect(queryOrderStub.getCall(0).args[0]).to.be.equal("mana_cost");
            expect(datastoreRunQueryStub.called).to.be.true;
            expect(response.status.called).to.be.true;
            expect(response.status.getCall(0).args[0]).to.be.equal(200);
            expect(response.json.called).to.be.true;

            // cleanup
            datastoreCreateQueryStub.restore();
            datastoreRunQueryStub.restore();
            queryOrderStub.restore();
            queryFilterStub.restore();
            validateManaCostStub.restore();
        });

        it("should invalidate and return error on invalid mana_cost", () => {
            // arrange
            let body = {
                body: {
                    mana_cost: "{5}{B}{B}"
                }
            };
            let request = mockReq(body);
            let response = mockRes();

            let datastoreCreateQueryStub = sandbox.stub(Datastore.prototype, "createQuery").callsFake((kind) => {
                return new Query();
            });
            let datastoreRunQueryStub = sandbox.stub(Datastore.prototype, "runQuery");
            datastoreRunQueryStub.returnsPromise().resolves();
            let queryOrderStub = sandbox.stub(Query.prototype, "order").callsFake(() => {
                return new Query();
            });
            let queryFilterStub = sandbox.stub(Query.prototype, "filter").callsFake(() => {
                return new Query();
            });
            let validateManaCostStub = sandbox.stub(Card, "validateManaCost").callsFake(() => {
                throw new Error("example error");
            });

            // act
            CardAPI.instance().getCards(request, response);

            // assert
            expect(datastoreCreateQueryStub.called).to.be.true;
            expect(validateManaCostStub.called).to.be.true;
            expect(queryFilterStub.called).to.be.false;
            expect(queryOrderStub.called).to.be.false;
            expect(datastoreRunQueryStub.called).to.be.false;
            expect(response.status.called).to.be.true;
            expect(response.status.getCall(0).args[0]).to.be.equal(400);
            expect(response.json.called).to.be.true;

            // cleanup
            datastoreCreateQueryStub.restore();
            datastoreRunQueryStub.restore();
            queryOrderStub.restore();
            queryFilterStub.restore();
            validateManaCostStub.restore();
        });

        it("should validate and filter based on power", () => {
            // arrange
            let body = {
                body: {
                    power: "0"
                }
            };
            let request = mockReq(body);
            let response = mockRes();

            let datastoreCreateQueryStub = sandbox.stub(Datastore.prototype, "createQuery").callsFake((kind) => {
                return new Query();
            });
            let datastoreRunQueryStub = sandbox.stub(Datastore.prototype, "runQuery");
            datastoreRunQueryStub.returnsPromise().resolves();
            let queryOrderStub = sandbox.stub(Query.prototype, "order").callsFake(() => {
                return new Query();
            });
            let queryFilterStub = sandbox.stub(Query.prototype, "filter").callsFake(() => {
                return new Query();
            });
            let validatePowerStub = sandbox.stub(Card, "validatePower");

            // act
            CardAPI.instance().getCards(request, response);

            // assert
            expect(datastoreCreateQueryStub.called).to.be.true;
            expect(validatePowerStub.called).to.be.true;
            expect(queryFilterStub.called).to.be.true;
            expect(queryFilterStub.getCall(0).args[0]).to.be.equal("power");
            expect(queryFilterStub.getCall(0).args[1]).to.be.equal("=");
            expect(queryFilterStub.getCall(0).args[2]).to.be.equal(body.body.power);
            expect(queryOrderStub.called).to.be.true;
            expect(queryOrderStub.getCall(0).args[0]).to.be.equal("power");
            expect(datastoreRunQueryStub.called).to.be.true;
            expect(response.status.called).to.be.true;
            expect(response.status.getCall(0).args[0]).to.be.equal(200);
            expect(response.json.called).to.be.true;

            // cleanup
            datastoreCreateQueryStub.restore();
            datastoreRunQueryStub.restore();
            queryOrderStub.restore();
            queryFilterStub.restore();
            validatePowerStub.restore();
        });

        it("should invalidate and return error on invalid power", () => {
            // arrange
            let body = {
                body: {
                    power: "0"
                }
            };
            let request = mockReq(body);
            let response = mockRes();

            let datastoreCreateQueryStub = sandbox.stub(Datastore.prototype, "createQuery").callsFake((kind) => {
                return new Query();
            });
            let datastoreRunQueryStub = sandbox.stub(Datastore.prototype, "runQuery");
            datastoreRunQueryStub.returnsPromise().resolves();
            let queryOrderStub = sandbox.stub(Query.prototype, "order").callsFake(() => {
                return new Query();
            });
            let queryFilterStub = sandbox.stub(Query.prototype, "filter").callsFake(() => {
                return new Query();
            });
            let validatePowerStub = sandbox.stub(Card, "validatePower").callsFake(() => {
                throw new Error("example error");
            });

            // act
            CardAPI.instance().getCards(request, response);

            // assert
            expect(datastoreCreateQueryStub.called).to.be.true;
            expect(validatePowerStub.called).to.be.true;
            expect(queryFilterStub.called).to.be.false;
            expect(queryOrderStub.called).to.be.false;
            expect(datastoreRunQueryStub.called).to.be.false;
            expect(response.status.called).to.be.true;
            expect(response.status.getCall(0).args[0]).to.be.equal(400);
            expect(response.json.called).to.be.true;

            // cleanup
            datastoreCreateQueryStub.restore();
            datastoreRunQueryStub.restore();
            queryOrderStub.restore();
            queryFilterStub.restore();
            validatePowerStub.restore();
        });

        it("should validate and filter based on toughness", () => {
            // arrange
            let body = {
                body: {
                    toughness: "2"
                }
            };
            let request = mockReq(body);
            let response = mockRes();

            let datastoreCreateQueryStub = sandbox.stub(Datastore.prototype, "createQuery").callsFake((kind) => {
                return new Query();
            });
            let datastoreRunQueryStub = sandbox.stub(Datastore.prototype, "runQuery");
            datastoreRunQueryStub.returnsPromise().resolves();
            let queryOrderStub = sandbox.stub(Query.prototype, "order").callsFake(() => {
                return new Query();
            });
            let queryFilterStub = sandbox.stub(Query.prototype, "filter").callsFake(() => {
                return new Query();
            });
            let validateToughnessStub = sandbox.stub(Card, "validateToughness");

            // act
            CardAPI.instance().getCards(request, response);

            // assert
            expect(datastoreCreateQueryStub.called).to.be.true;
            expect(validateToughnessStub.called).to.be.true;
            expect(queryFilterStub.called).to.be.true;
            expect(queryFilterStub.getCall(0).args[0]).to.be.equal("toughness");
            expect(queryFilterStub.getCall(0).args[1]).to.be.equal("=");
            expect(queryFilterStub.getCall(0).args[2]).to.be.equal(body.body.toughness);
            expect(queryOrderStub.called).to.be.true;
            expect(queryOrderStub.getCall(0).args[0]).to.be.equal("toughness");
            expect(datastoreRunQueryStub.called).to.be.true;
            expect(response.status.called).to.be.true;
            expect(response.status.getCall(0).args[0]).to.be.equal(200);
            expect(response.json.called).to.be.true;

            // cleanup
            datastoreCreateQueryStub.restore();
            datastoreRunQueryStub.restore();
            queryOrderStub.restore();
            queryFilterStub.restore();
            validateToughnessStub.restore();
        });

        it("should invalidate and return error on invalid toughness", () => {
            // arrange
            let body = {
                body: {
                    toughness: "2"
                }
            };
            let request = mockReq(body);
            let response = mockRes();

            let datastoreCreateQueryStub = sandbox.stub(Datastore.prototype, "createQuery").callsFake((kind) => {
                return new Query();
            });
            let datastoreRunQueryStub = sandbox.stub(Datastore.prototype, "runQuery");
            datastoreRunQueryStub.returnsPromise().resolves();
            let queryOrderStub = sandbox.stub(Query.prototype, "order").callsFake(() => {
                return new Query();
            });
            let queryFilterStub = sandbox.stub(Query.prototype, "filter").callsFake(() => {
                return new Query();
            });
            let validateToughnessStub = sandbox.stub(Card, "validateToughness").callsFake(() => {
                throw new Error("example error");
            });

            // act
            CardAPI.instance().getCards(request, response);

            // assert
            expect(datastoreCreateQueryStub.called).to.be.true;
            expect(validateToughnessStub.called).to.be.true;
            expect(queryFilterStub.called).to.be.false;
            expect(queryOrderStub.called).to.be.false;
            expect(datastoreRunQueryStub.called).to.be.false;
            expect(response.status.called).to.be.true;
            expect(response.status.getCall(0).args[0]).to.be.equal(400);
            expect(response.json.called).to.be.true;

            // cleanup
            datastoreCreateQueryStub.restore();
            datastoreRunQueryStub.restore();
            queryOrderStub.restore();
            queryFilterStub.restore();
            validateToughnessStub.restore();
        });

        it("should validate and filter based on loyalty", () => {
            // arrange
            let body = {
                body: {
                    loyalty: "5"
                }
            };
            let request = mockReq(body);
            let response = mockRes();

            let datastoreCreateQueryStub = sandbox.stub(Datastore.prototype, "createQuery").callsFake((kind) => {
                return new Query();
            });
            let datastoreRunQueryStub = sandbox.stub(Datastore.prototype, "runQuery");
            datastoreRunQueryStub.returnsPromise().resolves();
            let queryOrderStub = sandbox.stub(Query.prototype, "order").callsFake(() => {
                return new Query();
            });
            let queryFilterStub = sandbox.stub(Query.prototype, "filter").callsFake(() => {
                return new Query();
            });
            let validateLoyaltyStub = sandbox.stub(Card, "validateLoyalty");

            // act
            CardAPI.instance().getCards(request, response);

            // assert
            expect(datastoreCreateQueryStub.called).to.be.true;
            expect(validateLoyaltyStub.called).to.be.true;
            expect(queryFilterStub.called).to.be.true;
            expect(queryFilterStub.getCall(0).args[0]).to.be.equal("loyalty");
            expect(queryFilterStub.getCall(0).args[1]).to.be.equal("=");
            expect(queryFilterStub.getCall(0).args[2]).to.be.equal(body.body.loyalty);
            expect(queryOrderStub.called).to.be.true;
            expect(queryOrderStub.getCall(0).args[0]).to.be.equal("loyalty");
            expect(datastoreRunQueryStub.called).to.be.true;
            expect(response.status.called).to.be.true;
            expect(response.status.getCall(0).args[0]).to.be.equal(200);
            expect(response.json.called).to.be.true;

            // cleanup
            datastoreCreateQueryStub.restore();
            datastoreRunQueryStub.restore();
            queryOrderStub.restore();
            queryFilterStub.restore();
            validateLoyaltyStub.restore();
        });

        it("should invalidate and return error on invalid loyalty", () => {
            // arrange
            let body = {
                body: {
                    loyalty: "5"
                }
            };
            let request = mockReq(body);
            let response = mockRes();

            let datastoreCreateQueryStub = sandbox.stub(Datastore.prototype, "createQuery").callsFake((kind) => {
                return new Query();
            });
            let datastoreRunQueryStub = sandbox.stub(Datastore.prototype, "runQuery");
            datastoreRunQueryStub.returnsPromise().resolves();
            let queryOrderStub = sandbox.stub(Query.prototype, "order").callsFake(() => {
                return new Query();
            });
            let queryFilterStub = sandbox.stub(Query.prototype, "filter").callsFake(() => {
                return new Query();
            });
            let validateLoyaltyStub = sandbox.stub(Card, "validateLoyalty").callsFake(() => {
                throw new Error("example error");
            });

            // act
            CardAPI.instance().getCards(request, response);

            // assert
            expect(datastoreCreateQueryStub.called).to.be.true;
            expect(validateLoyaltyStub.called).to.be.true;
            expect(queryFilterStub.called).to.be.false;
            expect(queryOrderStub.called).to.be.false;
            expect(datastoreRunQueryStub.called).to.be.false;
            expect(response.status.called).to.be.true;
            expect(response.status.getCall(0).args[0]).to.be.equal(400);
            expect(response.json.called).to.be.true;

            // cleanup
            datastoreCreateQueryStub.restore();
            datastoreRunQueryStub.restore();
            queryOrderStub.restore();
            queryFilterStub.restore();
            validateLoyaltyStub.restore();
        });

        it("should validate and filter based on life_modifer", () => {
            // arrange
            let body = {
                body: {
                    life_modifer: "+2"
                }
            };
            let request = mockReq(body);
            let response = mockRes();

            let datastoreCreateQueryStub = sandbox.stub(Datastore.prototype, "createQuery").callsFake((kind) => {
                return new Query();
            });
            let datastoreRunQueryStub = sandbox.stub(Datastore.prototype, "runQuery");
            datastoreRunQueryStub.returnsPromise().resolves();
            let queryOrderStub = sandbox.stub(Query.prototype, "order").callsFake(() => {
                return new Query();
            });
            let queryFilterStub = sandbox.stub(Query.prototype, "filter").callsFake(() => {
                return new Query();
            });
            let validateLifeModifierStub = sandbox.stub(Card, "validateLifeModifier");

            // act
            CardAPI.instance().getCards(request, response);

            // assert
            expect(datastoreCreateQueryStub.called).to.be.true;
            expect(validateLifeModifierStub.called).to.be.true;
            expect(queryFilterStub.called).to.be.true;
            expect(queryFilterStub.getCall(0).args[0]).to.be.equal("life_modifer");
            expect(queryFilterStub.getCall(0).args[1]).to.be.equal("=");
            expect(queryFilterStub.getCall(0).args[2]).to.be.equal(body.body.life_modifer);
            expect(queryOrderStub.called).to.be.true;
            expect(queryOrderStub.getCall(0).args[0]).to.be.equal("life_modifer");
            expect(datastoreRunQueryStub.called).to.be.true;
            expect(response.status.called).to.be.true;
            expect(response.status.getCall(0).args[0]).to.be.equal(200);
            expect(response.json.called).to.be.true;

            // cleanup
            datastoreCreateQueryStub.restore();
            datastoreRunQueryStub.restore();
            queryOrderStub.restore();
            queryFilterStub.restore();
            validateLifeModifierStub.restore();
        });

        it("should invalidate and return error on invalid life_modifer", () => {
            // arrange
            let body = {
                body: {
                    life_modifer: "+2"
                }
            };
            let request = mockReq(body);
            let response = mockRes();

            let datastoreCreateQueryStub = sandbox.stub(Datastore.prototype, "createQuery").callsFake((kind) => {
                return new Query();
            });
            let datastoreRunQueryStub = sandbox.stub(Datastore.prototype, "runQuery");
            datastoreRunQueryStub.returnsPromise().resolves();
            let queryOrderStub = sandbox.stub(Query.prototype, "order").callsFake(() => {
                return new Query();
            });
            let queryFilterStub = sandbox.stub(Query.prototype, "filter").callsFake(() => {
                return new Query();
            });
            let validateLifeModifierStub = sandbox.stub(Card, "validateLifeModifier").callsFake(() => {
                throw new Error("example error");
            });

            // act
            CardAPI.instance().getCards(request, response);

            // assert
            expect(datastoreCreateQueryStub.called).to.be.true;
            expect(validateLifeModifierStub.called).to.be.true;
            expect(queryFilterStub.called).to.be.false;
            expect(queryOrderStub.called).to.be.false;
            expect(datastoreRunQueryStub.called).to.be.false;
            expect(response.status.called).to.be.true;
            expect(response.status.getCall(0).args[0]).to.be.equal(400);
            expect(response.json.called).to.be.true;

            // cleanup
            datastoreCreateQueryStub.restore();
            datastoreRunQueryStub.restore();
            queryOrderStub.restore();
            queryFilterStub.restore();
            validateLifeModifierStub.restore();
        });

        it("should validate and filter based on hand_modifier", () => {
            // arrange
            let body = {
                body: {
                    hand_modifier: "-1"
                }
            };
            let request = mockReq(body);
            let response = mockRes();

            let datastoreCreateQueryStub = sandbox.stub(Datastore.prototype, "createQuery").callsFake((kind) => {
                return new Query();
            });
            let datastoreRunQueryStub = sandbox.stub(Datastore.prototype, "runQuery");
            datastoreRunQueryStub.returnsPromise().resolves();
            let queryOrderStub = sandbox.stub(Query.prototype, "order").callsFake(() => {
                return new Query();
            });
            let queryFilterStub = sandbox.stub(Query.prototype, "filter").callsFake(() => {
                return new Query();
            });
            let validateHandModifierStub = sandbox.stub(Card, "validateHandModifier");

            // act
            CardAPI.instance().getCards(request, response);

            // assert
            expect(datastoreCreateQueryStub.called).to.be.true;
            expect(validateHandModifierStub.called).to.be.true;
            expect(queryFilterStub.called).to.be.true;
            expect(queryFilterStub.getCall(0).args[0]).to.be.equal("hand_modifier");
            expect(queryFilterStub.getCall(0).args[1]).to.be.equal("=");
            expect(queryFilterStub.getCall(0).args[2]).to.be.equal(body.body.hand_modifier);
            expect(queryOrderStub.called).to.be.true;
            expect(queryOrderStub.getCall(0).args[0]).to.be.equal("hand_modifier");
            expect(datastoreRunQueryStub.called).to.be.true;
            expect(response.status.called).to.be.true;
            expect(response.status.getCall(0).args[0]).to.be.equal(200);
            expect(response.json.called).to.be.true;

            // cleanup
            datastoreCreateQueryStub.restore();
            datastoreRunQueryStub.restore();
            queryOrderStub.restore();
            queryFilterStub.restore();
            validateHandModifierStub.restore();
        });

        it("should invalidate and return error on invalid hand_modifier", () => {
            // arrange
            let body = {
                body: {
                    hand_modifier: "-1"
                }
            };
            let request = mockReq(body);
            let response = mockRes();

            let datastoreCreateQueryStub = sandbox.stub(Datastore.prototype, "createQuery").callsFake((kind) => {
                return new Query();
            });
            let datastoreRunQueryStub = sandbox.stub(Datastore.prototype, "runQuery");
            datastoreRunQueryStub.returnsPromise().resolves();
            let queryOrderStub = sandbox.stub(Query.prototype, "order").callsFake(() => {
                return new Query();
            });
            let queryFilterStub = sandbox.stub(Query.prototype, "filter").callsFake(() => {
                return new Query();
            });
            let validateHandModifierStub = sandbox.stub(Card, "validateHandModifier").callsFake(() => {
                throw new Error("example error");
            });

            // act
            CardAPI.instance().getCards(request, response);

            // assert
            expect(datastoreCreateQueryStub.called).to.be.true;
            expect(validateHandModifierStub.called).to.be.true;
            expect(queryFilterStub.called).to.be.false;
            expect(queryOrderStub.called).to.be.false;
            expect(datastoreRunQueryStub.called).to.be.false;
            expect(response.status.called).to.be.true;
            expect(response.status.getCall(0).args[0]).to.be.equal(400);
            expect(response.json.called).to.be.true;

            // cleanup
            datastoreCreateQueryStub.restore();
            datastoreRunQueryStub.restore();
            queryOrderStub.restore();
            queryFilterStub.restore();
            validateHandModifierStub.restore();
        });

        it("should validate and filter based on colors", () => {
            // arrange
            let body = {
                body: {
                    colors: ["B"]
                }
            };
            let request = mockReq(body);
            let response = mockRes();

            let datastoreCreateQueryStub = sandbox.stub(Datastore.prototype, "createQuery").callsFake((kind) => {
                return new Query();
            });
            let datastoreRunQueryStub = sandbox.stub(Datastore.prototype, "runQuery");
            datastoreRunQueryStub.returnsPromise().resolves();
            let queryOrderStub = sandbox.stub(Query.prototype, "order").callsFake(() => {
                return new Query();
            });
            let queryFilterStub = sandbox.stub(Query.prototype, "filter").callsFake(() => {
                return new Query();
            });
            let validateColorsStub = sandbox.stub(Card, "validateColors");

            // act
            CardAPI.instance().getCards(request, response);

            // assert
            expect(datastoreCreateQueryStub.called).to.be.true;
            expect(validateColorsStub.called).to.be.true;
            expect(queryFilterStub.called).to.be.true;
            expect(queryFilterStub.getCall(0).args[0]).to.be.equal("colors");
            expect(queryFilterStub.getCall(0).args[1]).to.be.equal("=");
            expect(queryFilterStub.getCall(0).args[2]).to.be.equal(body.body.colors);
            expect(queryOrderStub.called).to.be.true;
            expect(queryOrderStub.getCall(0).args[0]).to.be.equal("colors");
            expect(datastoreRunQueryStub.called).to.be.true;
            expect(response.status.called).to.be.true;
            expect(response.status.getCall(0).args[0]).to.be.equal(200);
            expect(response.json.called).to.be.true;

            // cleanup
            datastoreCreateQueryStub.restore();
            datastoreRunQueryStub.restore();
            queryOrderStub.restore();
            queryFilterStub.restore();
            validateColorsStub.restore();
        });

        it("should invalidate and return error on invalid colors", () => {
            // arrange
            let body = {
                body: {
                    colors: ["B"]
                }
            };
            let request = mockReq(body);
            let response = mockRes();

            let datastoreCreateQueryStub = sandbox.stub(Datastore.prototype, "createQuery").callsFake((kind) => {
                return new Query();
            });
            let datastoreRunQueryStub = sandbox.stub(Datastore.prototype, "runQuery");
            datastoreRunQueryStub.returnsPromise().resolves();
            let queryOrderStub = sandbox.stub(Query.prototype, "order").callsFake(() => {
                return new Query();
            });
            let queryFilterStub = sandbox.stub(Query.prototype, "filter").callsFake(() => {
                return new Query();
            });
            let validateColorsStub = sandbox.stub(Card, "validateColors").callsFake(() => {
                throw new Error("example error");
            });

            // act
            CardAPI.instance().getCards(request, response);

            // assert
            expect(datastoreCreateQueryStub.called).to.be.true;
            expect(validateColorsStub.called).to.be.true;
            expect(queryFilterStub.called).to.be.false;
            expect(queryOrderStub.called).to.be.false;
            expect(datastoreRunQueryStub.called).to.be.false;
            expect(response.status.called).to.be.true;
            expect(response.status.getCall(0).args[0]).to.be.equal(400);
            expect(response.json.called).to.be.true;

            // cleanup
            datastoreCreateQueryStub.restore();
            datastoreRunQueryStub.restore();
            queryOrderStub.restore();
            queryFilterStub.restore();
            validateColorsStub.restore();
        });

        it("should validate and filter based on color_indicator", () => {
            // arrange
            let body = {
                body: {
                    color_indicator: ["U"]
                }
            };
            let request = mockReq(body);
            let response = mockRes();

            let datastoreCreateQueryStub = sandbox.stub(Datastore.prototype, "createQuery").callsFake((kind) => {
                return new Query();
            });
            let datastoreRunQueryStub = sandbox.stub(Datastore.prototype, "runQuery");
            datastoreRunQueryStub.returnsPromise().resolves();
            let queryOrderStub = sandbox.stub(Query.prototype, "order").callsFake(() => {
                return new Query();
            });
            let queryFilterStub = sandbox.stub(Query.prototype, "filter").callsFake(() => {
                return new Query();
            });
            let validateColorIndicatorStub = sandbox.stub(Card, "validateColorIndicator");

            // act
            CardAPI.instance().getCards(request, response);

            // assert
            expect(datastoreCreateQueryStub.called).to.be.true;
            expect(validateColorIndicatorStub.called).to.be.true;
            expect(queryFilterStub.called).to.be.true;
            expect(queryFilterStub.getCall(0).args[0]).to.be.equal("color_indicator");
            expect(queryFilterStub.getCall(0).args[1]).to.be.equal("=");
            expect(queryFilterStub.getCall(0).args[2]).to.be.equal(body.body.color_indicator);
            expect(queryOrderStub.called).to.be.true;
            expect(queryOrderStub.getCall(0).args[0]).to.be.equal("color_indicator");
            expect(datastoreRunQueryStub.called).to.be.true;
            expect(response.status.called).to.be.true;
            expect(response.status.getCall(0).args[0]).to.be.equal(200);
            expect(response.json.called).to.be.true;

            // cleanup
            datastoreCreateQueryStub.restore();
            datastoreRunQueryStub.restore();
            queryOrderStub.restore();
            queryFilterStub.restore();
            validateColorIndicatorStub.restore();
        });

        it("should invalidate and return error on invalid color_indicator", () => {
            // arrange
            let body = {
                body: {
                    color_indicator: ["U"]
                }
            };
            let request = mockReq(body);
            let response = mockRes();

            let datastoreCreateQueryStub = sandbox.stub(Datastore.prototype, "createQuery").callsFake((kind) => {
                return new Query();
            });
            let datastoreRunQueryStub = sandbox.stub(Datastore.prototype, "runQuery");
            datastoreRunQueryStub.returnsPromise().resolves();
            let queryOrderStub = sandbox.stub(Query.prototype, "order").callsFake(() => {
                return new Query();
            });
            let queryFilterStub = sandbox.stub(Query.prototype, "filter").callsFake(() => {
                return new Query();
            });
            let validateColorIndicatorStub = sandbox.stub(Card, "validateColorIndicator").callsFake(() => {
                throw new Error("example error");
            });

            // act
            CardAPI.instance().getCards(request, response);

            // assert
            expect(datastoreCreateQueryStub.called).to.be.true;
            expect(validateColorIndicatorStub.called).to.be.true;
            expect(queryFilterStub.called).to.be.false;
            expect(queryOrderStub.called).to.be.false;
            expect(datastoreRunQueryStub.called).to.be.false;
            expect(response.status.called).to.be.true;
            expect(response.status.getCall(0).args[0]).to.be.equal(400);
            expect(response.json.called).to.be.true;

            // cleanup
            datastoreCreateQueryStub.restore();
            datastoreRunQueryStub.restore();
            queryOrderStub.restore();
            queryFilterStub.restore();
            validateColorIndicatorStub.restore();
        });

        it("should validate and filter based on color_identity", () => {
            // arrange
            let body = {
                body: {
                    color_identity: ["B"]
                }
            };
            let request = mockReq(body);
            let response = mockRes();

            let datastoreCreateQueryStub = sandbox.stub(Datastore.prototype, "createQuery").callsFake((kind) => {
                return new Query();
            });
            let datastoreRunQueryStub = sandbox.stub(Datastore.prototype, "runQuery");
            datastoreRunQueryStub.returnsPromise().resolves();
            let queryOrderStub = sandbox.stub(Query.prototype, "order").callsFake(() => {
                return new Query();
            });
            let queryFilterStub = sandbox.stub(Query.prototype, "filter").callsFake(() => {
                return new Query();
            });
            let validateColorIdentityStub = sandbox.stub(Card, "validateColorIdentity");

            // act
            CardAPI.instance().getCards(request, response);

            // assert
            expect(datastoreCreateQueryStub.called).to.be.true;
            expect(validateColorIdentityStub.called).to.be.true;
            expect(queryFilterStub.called).to.be.true;
            expect(queryFilterStub.getCall(0).args[0]).to.be.equal("color_identity");
            expect(queryFilterStub.getCall(0).args[1]).to.be.equal("=");
            expect(queryFilterStub.getCall(0).args[2]).to.be.equal(body.body.color_identity);
            expect(queryOrderStub.called).to.be.true;
            expect(queryOrderStub.getCall(0).args[0]).to.be.equal("color_identity");
            expect(datastoreRunQueryStub.called).to.be.true;
            expect(response.status.called).to.be.true;
            expect(response.status.getCall(0).args[0]).to.be.equal(200);
            expect(response.json.called).to.be.true;

            // cleanup
            datastoreCreateQueryStub.restore();
            datastoreRunQueryStub.restore();
            queryOrderStub.restore();
            queryFilterStub.restore();
            validateColorIdentityStub.restore();
        });

        it("should invalidate and return error on invalid color_identity", () => {
            // arrange
            let body = {
                body: {
                    color_identity: ["B"]
                }
            };
            let request = mockReq(body);
            let response = mockRes();

            let datastoreCreateQueryStub = sandbox.stub(Datastore.prototype, "createQuery").callsFake((kind) => {
                return new Query();
            });
            let datastoreRunQueryStub = sandbox.stub(Datastore.prototype, "runQuery");
            datastoreRunQueryStub.returnsPromise().resolves();
            let queryOrderStub = sandbox.stub(Query.prototype, "order").callsFake(() => {
                return new Query();
            });
            let queryFilterStub = sandbox.stub(Query.prototype, "filter").callsFake(() => {
                return new Query();
            });
            let validateColorIdentityStub = sandbox.stub(Card, "validateColorIdentity").callsFake(() => {
                throw new Error("example error");
            });

            // act
            CardAPI.instance().getCards(request, response);

            // assert
            expect(datastoreCreateQueryStub.called).to.be.true;
            expect(validateColorIdentityStub.called).to.be.true;
            expect(queryFilterStub.called).to.be.false;
            expect(queryOrderStub.called).to.be.false;
            expect(datastoreRunQueryStub.called).to.be.false;
            expect(response.status.called).to.be.true;
            expect(response.status.getCall(0).args[0]).to.be.equal(400);
            expect(response.json.called).to.be.true;

            // cleanup
            datastoreCreateQueryStub.restore();
            datastoreRunQueryStub.restore();
            queryOrderStub.restore();
            queryFilterStub.restore();
            validateColorIdentityStub.restore();
        });

        describe("legality", () => {
            it("should filter based on legality.is_commander_banned", () => {
                // arrange
                let body = {
                    body: {
                        legality: {
                            is_commander_banned: false
                        }
                    }
                };
                let request = mockReq(body);
                let response = mockRes();
    
                let datastoreCreateQueryStub = sandbox.stub(Datastore.prototype, "createQuery").callsFake((kind) => {
                    return new Query();
                });
                let datastoreRunQueryStub = sandbox.stub(Datastore.prototype, "runQuery");
                datastoreRunQueryStub.returnsPromise().resolves();
                let queryOrderStub = sandbox.stub(Query.prototype, "order").callsFake(() => {
                    return new Query();
                });
                let queryFilterStub = sandbox.stub(Query.prototype, "filter").callsFake(() => {
                    return new Query();
                });
    
                // act
                CardAPI.instance().getCards(request, response);
    
                // assert
                expect(datastoreCreateQueryStub.called).to.be.true;
                expect(queryFilterStub.called).to.be.true;
                expect(queryFilterStub.getCall(0).args[0]).to.be.equal("legality.is_commander_banned");
                expect(queryFilterStub.getCall(0).args[1]).to.be.equal("=");
                expect(queryFilterStub.getCall(0).args[2]).to.be.equal(body.body.legality.is_commander_banned);
                expect(queryOrderStub.called).to.be.true;
                expect(queryOrderStub.getCall(0).args[0]).to.be.equal("legality.is_commander_banned");
                expect(datastoreRunQueryStub.called).to.be.true;
                expect(response.status.called).to.be.true;
                expect(response.status.getCall(0).args[0]).to.be.equal(200);
                expect(response.json.called).to.be.true;
    
                // cleanup
                datastoreCreateQueryStub.restore();
                datastoreRunQueryStub.restore();
                queryOrderStub.restore();
                queryFilterStub.restore();
            });

            it("should filter based on legality.is_commander_legal", () => {
                // arrange
                let body = {
                    body: {
                        legality: {
                            is_commander_legal: false
                        }
                    }
                };
                let request = mockReq(body);
                let response = mockRes();
    
                let datastoreCreateQueryStub = sandbox.stub(Datastore.prototype, "createQuery").callsFake((kind) => {
                    return new Query();
                });
                let datastoreRunQueryStub = sandbox.stub(Datastore.prototype, "runQuery");
                datastoreRunQueryStub.returnsPromise().resolves();
                let queryOrderStub = sandbox.stub(Query.prototype, "order").callsFake(() => {
                    return new Query();
                });
                let queryFilterStub = sandbox.stub(Query.prototype, "filter").callsFake(() => {
                    return new Query();
                });
    
                // act
                CardAPI.instance().getCards(request, response);
    
                // assert
                expect(datastoreCreateQueryStub.called).to.be.true;
                expect(queryFilterStub.called).to.be.true;
                expect(queryFilterStub.getCall(0).args[0]).to.be.equal("legality.is_commander_legal");
                expect(queryFilterStub.getCall(0).args[1]).to.be.equal("=");
                expect(queryFilterStub.getCall(0).args[2]).to.be.equal(body.body.legality.is_commander_legal);
                expect(queryOrderStub.called).to.be.true;
                expect(queryOrderStub.getCall(0).args[0]).to.be.equal("legality.is_commander_legal");
                expect(datastoreRunQueryStub.called).to.be.true;
                expect(response.status.called).to.be.true;
                expect(response.status.getCall(0).args[0]).to.be.equal(200);
                expect(response.json.called).to.be.true;
    
                // cleanup
                datastoreCreateQueryStub.restore();
                datastoreRunQueryStub.restore();
                queryOrderStub.restore();
                queryFilterStub.restore();
            });
            
            it("should filter based on legality.is_commander_restricted", () => {
                // arrange
                let body = {
                    body: {
                        legality: {
                            is_commander_restricted: false
                        }
                    }
                };
                let request = mockReq(body);
                let response = mockRes();
    
                let datastoreCreateQueryStub = sandbox.stub(Datastore.prototype, "createQuery").callsFake((kind) => {
                    return new Query();
                });
                let datastoreRunQueryStub = sandbox.stub(Datastore.prototype, "runQuery");
                datastoreRunQueryStub.returnsPromise().resolves();
                let queryOrderStub = sandbox.stub(Query.prototype, "order").callsFake(() => {
                    return new Query();
                });
                let queryFilterStub = sandbox.stub(Query.prototype, "filter").callsFake(() => {
                    return new Query();
                });
    
                // act
                CardAPI.instance().getCards(request, response);
    
                // assert
                expect(datastoreCreateQueryStub.called).to.be.true;
                expect(queryFilterStub.called).to.be.true;
                expect(queryFilterStub.getCall(0).args[0]).to.be.equal("legality.is_commander_restricted");
                expect(queryFilterStub.getCall(0).args[1]).to.be.equal("=");
                expect(queryFilterStub.getCall(0).args[2]).to.be.equal(body.body.legality.is_commander_restricted);
                expect(queryOrderStub.called).to.be.true;
                expect(queryOrderStub.getCall(0).args[0]).to.be.equal("legality.is_commander_restricted");
                expect(datastoreRunQueryStub.called).to.be.true;
                expect(response.status.called).to.be.true;
                expect(response.status.getCall(0).args[0]).to.be.equal(200);
                expect(response.json.called).to.be.true;
    
                // cleanup
                datastoreCreateQueryStub.restore();
                datastoreRunQueryStub.restore();
                queryOrderStub.restore();
                queryFilterStub.restore();
            });

            it("should filter based on legality.is_duel_banned", () => {
                // arrange
                let body = {
                    body: {
                        legality: {
                            is_duel_banned: false
                        }
                    }
                };
                let request = mockReq(body);
                let response = mockRes();
    
                let datastoreCreateQueryStub = sandbox.stub(Datastore.prototype, "createQuery").callsFake((kind) => {
                    return new Query();
                });
                let datastoreRunQueryStub = sandbox.stub(Datastore.prototype, "runQuery");
                datastoreRunQueryStub.returnsPromise().resolves();
                let queryOrderStub = sandbox.stub(Query.prototype, "order").callsFake(() => {
                    return new Query();
                });
                let queryFilterStub = sandbox.stub(Query.prototype, "filter").callsFake(() => {
                    return new Query();
                });
    
                // act
                CardAPI.instance().getCards(request, response);
    
                // assert
                expect(datastoreCreateQueryStub.called).to.be.true;
                expect(queryFilterStub.called).to.be.true;
                expect(queryFilterStub.getCall(0).args[0]).to.be.equal("legality.is_duel_banned");
                expect(queryFilterStub.getCall(0).args[1]).to.be.equal("=");
                expect(queryFilterStub.getCall(0).args[2]).to.be.equal(body.body.legality.is_duel_banned);
                expect(queryOrderStub.called).to.be.true;
                expect(queryOrderStub.getCall(0).args[0]).to.be.equal("legality.is_duel_banned");
                expect(datastoreRunQueryStub.called).to.be.true;
                expect(response.status.called).to.be.true;
                expect(response.status.getCall(0).args[0]).to.be.equal(200);
                expect(response.json.called).to.be.true;
    
                // cleanup
                datastoreCreateQueryStub.restore();
                datastoreRunQueryStub.restore();
                queryOrderStub.restore();
                queryFilterStub.restore();
            });
            
            it("should filter based on legality.is_duel_legal", () => {
                // arrange
                let body = {
                    body: {
                        legality: {
                            is_duel_legal: false
                        }
                    }
                };
                let request = mockReq(body);
                let response = mockRes();
    
                let datastoreCreateQueryStub = sandbox.stub(Datastore.prototype, "createQuery").callsFake((kind) => {
                    return new Query();
                });
                let datastoreRunQueryStub = sandbox.stub(Datastore.prototype, "runQuery");
                datastoreRunQueryStub.returnsPromise().resolves();
                let queryOrderStub = sandbox.stub(Query.prototype, "order").callsFake(() => {
                    return new Query();
                });
                let queryFilterStub = sandbox.stub(Query.prototype, "filter").callsFake(() => {
                    return new Query();
                });
    
                // act
                CardAPI.instance().getCards(request, response);
    
                // assert
                expect(datastoreCreateQueryStub.called).to.be.true;
                expect(queryFilterStub.called).to.be.true;
                expect(queryFilterStub.getCall(0).args[0]).to.be.equal("legality.is_duel_legal");
                expect(queryFilterStub.getCall(0).args[1]).to.be.equal("=");
                expect(queryFilterStub.getCall(0).args[2]).to.be.equal(body.body.legality.is_duel_legal);
                expect(queryOrderStub.called).to.be.true;
                expect(queryOrderStub.getCall(0).args[0]).to.be.equal("legality.is_duel_legal");
                expect(datastoreRunQueryStub.called).to.be.true;
                expect(response.status.called).to.be.true;
                expect(response.status.getCall(0).args[0]).to.be.equal(200);
                expect(response.json.called).to.be.true;
    
                // cleanup
                datastoreCreateQueryStub.restore();
                datastoreRunQueryStub.restore();
                queryOrderStub.restore();
                queryFilterStub.restore();
            });
            
            it("should filter based on legality.is_duel_restricted", () => {
                // arrange
                let body = {
                    body: {
                        legality: {
                            is_duel_restricted: false
                        }
                    }
                };
                let request = mockReq(body);
                let response = mockRes();
    
                let datastoreCreateQueryStub = sandbox.stub(Datastore.prototype, "createQuery").callsFake((kind) => {
                    return new Query();
                });
                let datastoreRunQueryStub = sandbox.stub(Datastore.prototype, "runQuery");
                datastoreRunQueryStub.returnsPromise().resolves();
                let queryOrderStub = sandbox.stub(Query.prototype, "order").callsFake(() => {
                    return new Query();
                });
                let queryFilterStub = sandbox.stub(Query.prototype, "filter").callsFake(() => {
                    return new Query();
                });
    
                // act
                CardAPI.instance().getCards(request, response);
    
                // assert
                expect(datastoreCreateQueryStub.called).to.be.true;
                expect(queryFilterStub.called).to.be.true;
                expect(queryFilterStub.getCall(0).args[0]).to.be.equal("legality.is_duel_restricted");
                expect(queryFilterStub.getCall(0).args[1]).to.be.equal("=");
                expect(queryFilterStub.getCall(0).args[2]).to.be.equal(body.body.legality.is_duel_restricted);
                expect(queryOrderStub.called).to.be.true;
                expect(queryOrderStub.getCall(0).args[0]).to.be.equal("legality.is_duel_restricted");
                expect(datastoreRunQueryStub.called).to.be.true;
                expect(response.status.called).to.be.true;
                expect(response.status.getCall(0).args[0]).to.be.equal(200);
                expect(response.json.called).to.be.true;
    
                // cleanup
                datastoreCreateQueryStub.restore();
                datastoreRunQueryStub.restore();
                queryOrderStub.restore();
                queryFilterStub.restore();
            });

            it("should filter based on legality.is_frontier_banned", () => {
                // arrange
                let body = {
                    body: {
                        legality: {
                            is_frontier_banned: false
                        }
                    }
                };
                let request = mockReq(body);
                let response = mockRes();
    
                let datastoreCreateQueryStub = sandbox.stub(Datastore.prototype, "createQuery").callsFake((kind) => {
                    return new Query();
                });
                let datastoreRunQueryStub = sandbox.stub(Datastore.prototype, "runQuery");
                datastoreRunQueryStub.returnsPromise().resolves();
                let queryOrderStub = sandbox.stub(Query.prototype, "order").callsFake(() => {
                    return new Query();
                });
                let queryFilterStub = sandbox.stub(Query.prototype, "filter").callsFake(() => {
                    return new Query();
                });
    
                // act
                CardAPI.instance().getCards(request, response);
    
                // assert
                expect(datastoreCreateQueryStub.called).to.be.true;
                expect(queryFilterStub.called).to.be.true;
                expect(queryFilterStub.getCall(0).args[0]).to.be.equal("legality.is_frontier_banned");
                expect(queryFilterStub.getCall(0).args[1]).to.be.equal("=");
                expect(queryFilterStub.getCall(0).args[2]).to.be.equal(body.body.legality.is_frontier_banned);
                expect(queryOrderStub.called).to.be.true;
                expect(queryOrderStub.getCall(0).args[0]).to.be.equal("legality.is_frontier_banned");
                expect(datastoreRunQueryStub.called).to.be.true;
                expect(response.status.called).to.be.true;
                expect(response.status.getCall(0).args[0]).to.be.equal(200);
                expect(response.json.called).to.be.true;
    
                // cleanup
                datastoreCreateQueryStub.restore();
                datastoreRunQueryStub.restore();
                queryOrderStub.restore();
                queryFilterStub.restore();
            });
            
            it("should filter based on legality.is_frontier_legal", () => {
                // arrange
                let body = {
                    body: {
                        legality: {
                            is_frontier_legal: false
                        }
                    }
                };
                let request = mockReq(body);
                let response = mockRes();
    
                let datastoreCreateQueryStub = sandbox.stub(Datastore.prototype, "createQuery").callsFake((kind) => {
                    return new Query();
                });
                let datastoreRunQueryStub = sandbox.stub(Datastore.prototype, "runQuery");
                datastoreRunQueryStub.returnsPromise().resolves();
                let queryOrderStub = sandbox.stub(Query.prototype, "order").callsFake(() => {
                    return new Query();
                });
                let queryFilterStub = sandbox.stub(Query.prototype, "filter").callsFake(() => {
                    return new Query();
                });
    
                // act
                CardAPI.instance().getCards(request, response);
    
                // assert
                expect(datastoreCreateQueryStub.called).to.be.true;
                expect(queryFilterStub.called).to.be.true;
                expect(queryFilterStub.getCall(0).args[0]).to.be.equal("legality.is_frontier_legal");
                expect(queryFilterStub.getCall(0).args[1]).to.be.equal("=");
                expect(queryFilterStub.getCall(0).args[2]).to.be.equal(body.body.legality.is_frontier_legal);
                expect(queryOrderStub.called).to.be.true;
                expect(queryOrderStub.getCall(0).args[0]).to.be.equal("legality.is_frontier_legal");
                expect(datastoreRunQueryStub.called).to.be.true;
                expect(response.status.called).to.be.true;
                expect(response.status.getCall(0).args[0]).to.be.equal(200);
                expect(response.json.called).to.be.true;
    
                // cleanup
                datastoreCreateQueryStub.restore();
                datastoreRunQueryStub.restore();
                queryOrderStub.restore();
                queryFilterStub.restore();
            });
            
            it("should filter based on legality.is_frontier_restricted", () => {
                // arrange
                let body = {
                    body: {
                        legality: {
                            is_frontier_restricted: false
                        }
                    }
                };
                let request = mockReq(body);
                let response = mockRes();
    
                let datastoreCreateQueryStub = sandbox.stub(Datastore.prototype, "createQuery").callsFake((kind) => {
                    return new Query();
                });
                let datastoreRunQueryStub = sandbox.stub(Datastore.prototype, "runQuery");
                datastoreRunQueryStub.returnsPromise().resolves();
                let queryOrderStub = sandbox.stub(Query.prototype, "order").callsFake(() => {
                    return new Query();
                });
                let queryFilterStub = sandbox.stub(Query.prototype, "filter").callsFake(() => {
                    return new Query();
                });
    
                // act
                CardAPI.instance().getCards(request, response);
    
                // assert
                expect(datastoreCreateQueryStub.called).to.be.true;
                expect(queryFilterStub.called).to.be.true;
                expect(queryFilterStub.getCall(0).args[0]).to.be.equal("legality.is_frontier_restricted");
                expect(queryFilterStub.getCall(0).args[1]).to.be.equal("=");
                expect(queryFilterStub.getCall(0).args[2]).to.be.equal(body.body.legality.is_frontier_restricted);
                expect(queryOrderStub.called).to.be.true;
                expect(queryOrderStub.getCall(0).args[0]).to.be.equal("legality.is_frontier_restricted");
                expect(datastoreRunQueryStub.called).to.be.true;
                expect(response.status.called).to.be.true;
                expect(response.status.getCall(0).args[0]).to.be.equal(200);
                expect(response.json.called).to.be.true;
    
                // cleanup
                datastoreCreateQueryStub.restore();
                datastoreRunQueryStub.restore();
                queryOrderStub.restore();
                queryFilterStub.restore();
            });

            it("should filter based on legality.is_future_banned", () => {
                // arrange
                let body = {
                    body: {
                        legality: {
                            is_future_banned: false
                        }
                    }
                };
                let request = mockReq(body);
                let response = mockRes();
    
                let datastoreCreateQueryStub = sandbox.stub(Datastore.prototype, "createQuery").callsFake((kind) => {
                    return new Query();
                });
                let datastoreRunQueryStub = sandbox.stub(Datastore.prototype, "runQuery");
                datastoreRunQueryStub.returnsPromise().resolves();
                let queryOrderStub = sandbox.stub(Query.prototype, "order").callsFake(() => {
                    return new Query();
                });
                let queryFilterStub = sandbox.stub(Query.prototype, "filter").callsFake(() => {
                    return new Query();
                });
    
                // act
                CardAPI.instance().getCards(request, response);
    
                // assert
                expect(datastoreCreateQueryStub.called).to.be.true;
                expect(queryFilterStub.called).to.be.true;
                expect(queryFilterStub.getCall(0).args[0]).to.be.equal("legality.is_future_banned");
                expect(queryFilterStub.getCall(0).args[1]).to.be.equal("=");
                expect(queryFilterStub.getCall(0).args[2]).to.be.equal(body.body.legality.is_future_banned);
                expect(queryOrderStub.called).to.be.true;
                expect(queryOrderStub.getCall(0).args[0]).to.be.equal("legality.is_future_banned");
                expect(datastoreRunQueryStub.called).to.be.true;
                expect(response.status.called).to.be.true;
                expect(response.status.getCall(0).args[0]).to.be.equal(200);
                expect(response.json.called).to.be.true;
    
                // cleanup
                datastoreCreateQueryStub.restore();
                datastoreRunQueryStub.restore();
                queryOrderStub.restore();
                queryFilterStub.restore();
            });
            
            it("should filter based on legality.is_future_legal", () => {
                // arrange
                let body = {
                    body: {
                        legality: {
                            is_future_legal: false
                        }
                    }
                };
                let request = mockReq(body);
                let response = mockRes();
    
                let datastoreCreateQueryStub = sandbox.stub(Datastore.prototype, "createQuery").callsFake((kind) => {
                    return new Query();
                });
                let datastoreRunQueryStub = sandbox.stub(Datastore.prototype, "runQuery");
                datastoreRunQueryStub.returnsPromise().resolves();
                let queryOrderStub = sandbox.stub(Query.prototype, "order").callsFake(() => {
                    return new Query();
                });
                let queryFilterStub = sandbox.stub(Query.prototype, "filter").callsFake(() => {
                    return new Query();
                });
    
                // act
                CardAPI.instance().getCards(request, response);
    
                // assert
                expect(datastoreCreateQueryStub.called).to.be.true;
                expect(queryFilterStub.called).to.be.true;
                expect(queryFilterStub.getCall(0).args[0]).to.be.equal("legality.is_future_legal");
                expect(queryFilterStub.getCall(0).args[1]).to.be.equal("=");
                expect(queryFilterStub.getCall(0).args[2]).to.be.equal(body.body.legality.is_future_legal);
                expect(queryOrderStub.called).to.be.true;
                expect(queryOrderStub.getCall(0).args[0]).to.be.equal("legality.is_future_legal");
                expect(datastoreRunQueryStub.called).to.be.true;
                expect(response.status.called).to.be.true;
                expect(response.status.getCall(0).args[0]).to.be.equal(200);
                expect(response.json.called).to.be.true;
    
                // cleanup
                datastoreCreateQueryStub.restore();
                datastoreRunQueryStub.restore();
                queryOrderStub.restore();
                queryFilterStub.restore();
            });
            
            it("should filter based on legality.is_future_restricted", () => {
                // arrange
                let body = {
                    body: {
                        legality: {
                            is_future_restricted: false
                        }
                    }
                };
                let request = mockReq(body);
                let response = mockRes();
    
                let datastoreCreateQueryStub = sandbox.stub(Datastore.prototype, "createQuery").callsFake((kind) => {
                    return new Query();
                });
                let datastoreRunQueryStub = sandbox.stub(Datastore.prototype, "runQuery");
                datastoreRunQueryStub.returnsPromise().resolves();
                let queryOrderStub = sandbox.stub(Query.prototype, "order").callsFake(() => {
                    return new Query();
                });
                let queryFilterStub = sandbox.stub(Query.prototype, "filter").callsFake(() => {
                    return new Query();
                });
    
                // act
                CardAPI.instance().getCards(request, response);
    
                // assert
                expect(datastoreCreateQueryStub.called).to.be.true;
                expect(queryFilterStub.called).to.be.true;
                expect(queryFilterStub.getCall(0).args[0]).to.be.equal("legality.is_future_restricted");
                expect(queryFilterStub.getCall(0).args[1]).to.be.equal("=");
                expect(queryFilterStub.getCall(0).args[2]).to.be.equal(body.body.legality.is_future_restricted);
                expect(queryOrderStub.called).to.be.true;
                expect(queryOrderStub.getCall(0).args[0]).to.be.equal("legality.is_future_restricted");
                expect(datastoreRunQueryStub.called).to.be.true;
                expect(response.status.called).to.be.true;
                expect(response.status.getCall(0).args[0]).to.be.equal(200);
                expect(response.json.called).to.be.true;
    
                // cleanup
                datastoreCreateQueryStub.restore();
                datastoreRunQueryStub.restore();
                queryOrderStub.restore();
                queryFilterStub.restore();
            });

            it("should filter based on legality.is_legacy_banned", () => {
                // arrange
                let body = {
                    body: {
                        legality: {
                            is_legacy_banned: false
                        }
                    }
                };
                let request = mockReq(body);
                let response = mockRes();
    
                let datastoreCreateQueryStub = sandbox.stub(Datastore.prototype, "createQuery").callsFake((kind) => {
                    return new Query();
                });
                let datastoreRunQueryStub = sandbox.stub(Datastore.prototype, "runQuery");
                datastoreRunQueryStub.returnsPromise().resolves();
                let queryOrderStub = sandbox.stub(Query.prototype, "order").callsFake(() => {
                    return new Query();
                });
                let queryFilterStub = sandbox.stub(Query.prototype, "filter").callsFake(() => {
                    return new Query();
                });
    
                // act
                CardAPI.instance().getCards(request, response);
    
                // assert
                expect(datastoreCreateQueryStub.called).to.be.true;
                expect(queryFilterStub.called).to.be.true;
                expect(queryFilterStub.getCall(0).args[0]).to.be.equal("legality.is_legacy_banned");
                expect(queryFilterStub.getCall(0).args[1]).to.be.equal("=");
                expect(queryFilterStub.getCall(0).args[2]).to.be.equal(body.body.legality.is_legacy_banned);
                expect(queryOrderStub.called).to.be.true;
                expect(queryOrderStub.getCall(0).args[0]).to.be.equal("legality.is_legacy_banned");
                expect(datastoreRunQueryStub.called).to.be.true;
                expect(response.status.called).to.be.true;
                expect(response.status.getCall(0).args[0]).to.be.equal(200);
                expect(response.json.called).to.be.true;
    
                // cleanup
                datastoreCreateQueryStub.restore();
                datastoreRunQueryStub.restore();
                queryOrderStub.restore();
                queryFilterStub.restore();
            });
            
            it("should filter based on legality.is_legacy_legal", () => {
                // arrange
                let body = {
                    body: {
                        legality: {
                            is_legacy_legal: false
                        }
                    }
                };
                let request = mockReq(body);
                let response = mockRes();
    
                let datastoreCreateQueryStub = sandbox.stub(Datastore.prototype, "createQuery").callsFake((kind) => {
                    return new Query();
                });
                let datastoreRunQueryStub = sandbox.stub(Datastore.prototype, "runQuery");
                datastoreRunQueryStub.returnsPromise().resolves();
                let queryOrderStub = sandbox.stub(Query.prototype, "order").callsFake(() => {
                    return new Query();
                });
                let queryFilterStub = sandbox.stub(Query.prototype, "filter").callsFake(() => {
                    return new Query();
                });
    
                // act
                CardAPI.instance().getCards(request, response);
    
                // assert
                expect(datastoreCreateQueryStub.called).to.be.true;
                expect(queryFilterStub.called).to.be.true;
                expect(queryFilterStub.getCall(0).args[0]).to.be.equal("legality.is_legacy_legal");
                expect(queryFilterStub.getCall(0).args[1]).to.be.equal("=");
                expect(queryFilterStub.getCall(0).args[2]).to.be.equal(body.body.legality.is_legacy_legal);
                expect(queryOrderStub.called).to.be.true;
                expect(queryOrderStub.getCall(0).args[0]).to.be.equal("legality.is_legacy_legal");
                expect(datastoreRunQueryStub.called).to.be.true;
                expect(response.status.called).to.be.true;
                expect(response.status.getCall(0).args[0]).to.be.equal(200);
                expect(response.json.called).to.be.true;
    
                // cleanup
                datastoreCreateQueryStub.restore();
                datastoreRunQueryStub.restore();
                queryOrderStub.restore();
                queryFilterStub.restore();
            });
            
            it("should filter based on legality.is_legacy_restricted", () => {
                // arrange
                let body = {
                    body: {
                        legality: {
                            is_legacy_restricted: false
                        }
                    }
                };
                let request = mockReq(body);
                let response = mockRes();
    
                let datastoreCreateQueryStub = sandbox.stub(Datastore.prototype, "createQuery").callsFake((kind) => {
                    return new Query();
                });
                let datastoreRunQueryStub = sandbox.stub(Datastore.prototype, "runQuery");
                datastoreRunQueryStub.returnsPromise().resolves();
                let queryOrderStub = sandbox.stub(Query.prototype, "order").callsFake(() => {
                    return new Query();
                });
                let queryFilterStub = sandbox.stub(Query.prototype, "filter").callsFake(() => {
                    return new Query();
                });
    
                // act
                CardAPI.instance().getCards(request, response);
    
                // assert
                expect(datastoreCreateQueryStub.called).to.be.true;
                expect(queryFilterStub.called).to.be.true;
                expect(queryFilterStub.getCall(0).args[0]).to.be.equal("legality.is_legacy_restricted");
                expect(queryFilterStub.getCall(0).args[1]).to.be.equal("=");
                expect(queryFilterStub.getCall(0).args[2]).to.be.equal(body.body.legality.is_legacy_restricted);
                expect(queryOrderStub.called).to.be.true;
                expect(queryOrderStub.getCall(0).args[0]).to.be.equal("legality.is_legacy_restricted");
                expect(datastoreRunQueryStub.called).to.be.true;
                expect(response.status.called).to.be.true;
                expect(response.status.getCall(0).args[0]).to.be.equal(200);
                expect(response.json.called).to.be.true;
    
                // cleanup
                datastoreCreateQueryStub.restore();
                datastoreRunQueryStub.restore();
                queryOrderStub.restore();
                queryFilterStub.restore();
            });

            it("should filter based on legality.is_modern_banned", () => {
                // arrange
                let body = {
                    body: {
                        legality: {
                            is_modern_banned: false
                        }
                    }
                };
                let request = mockReq(body);
                let response = mockRes();
    
                let datastoreCreateQueryStub = sandbox.stub(Datastore.prototype, "createQuery").callsFake((kind) => {
                    return new Query();
                });
                let datastoreRunQueryStub = sandbox.stub(Datastore.prototype, "runQuery");
                datastoreRunQueryStub.returnsPromise().resolves();
                let queryOrderStub = sandbox.stub(Query.prototype, "order").callsFake(() => {
                    return new Query();
                });
                let queryFilterStub = sandbox.stub(Query.prototype, "filter").callsFake(() => {
                    return new Query();
                });
    
                // act
                CardAPI.instance().getCards(request, response);
    
                // assert
                expect(datastoreCreateQueryStub.called).to.be.true;
                expect(queryFilterStub.called).to.be.true;
                expect(queryFilterStub.getCall(0).args[0]).to.be.equal("legality.is_modern_banned");
                expect(queryFilterStub.getCall(0).args[1]).to.be.equal("=");
                expect(queryFilterStub.getCall(0).args[2]).to.be.equal(body.body.legality.is_modern_banned);
                expect(queryOrderStub.called).to.be.true;
                expect(queryOrderStub.getCall(0).args[0]).to.be.equal("legality.is_modern_banned");
                expect(datastoreRunQueryStub.called).to.be.true;
                expect(response.status.called).to.be.true;
                expect(response.status.getCall(0).args[0]).to.be.equal(200);
                expect(response.json.called).to.be.true;
    
                // cleanup
                datastoreCreateQueryStub.restore();
                datastoreRunQueryStub.restore();
                queryOrderStub.restore();
                queryFilterStub.restore();
            });
            
            it("should filter based on legality.is_modern_legal", () => {
                // arrange
                let body = {
                    body: {
                        legality: {
                            is_modern_legal: false
                        }
                    }
                };
                let request = mockReq(body);
                let response = mockRes();
    
                let datastoreCreateQueryStub = sandbox.stub(Datastore.prototype, "createQuery").callsFake((kind) => {
                    return new Query();
                });
                let datastoreRunQueryStub = sandbox.stub(Datastore.prototype, "runQuery");
                datastoreRunQueryStub.returnsPromise().resolves();
                let queryOrderStub = sandbox.stub(Query.prototype, "order").callsFake(() => {
                    return new Query();
                });
                let queryFilterStub = sandbox.stub(Query.prototype, "filter").callsFake(() => {
                    return new Query();
                });
    
                // act
                CardAPI.instance().getCards(request, response);
    
                // assert
                expect(datastoreCreateQueryStub.called).to.be.true;
                expect(queryFilterStub.called).to.be.true;
                expect(queryFilterStub.getCall(0).args[0]).to.be.equal("legality.is_modern_legal");
                expect(queryFilterStub.getCall(0).args[1]).to.be.equal("=");
                expect(queryFilterStub.getCall(0).args[2]).to.be.equal(body.body.legality.is_modern_legal);
                expect(queryOrderStub.called).to.be.true;
                expect(queryOrderStub.getCall(0).args[0]).to.be.equal("legality.is_modern_legal");
                expect(datastoreRunQueryStub.called).to.be.true;
                expect(response.status.called).to.be.true;
                expect(response.status.getCall(0).args[0]).to.be.equal(200);
                expect(response.json.called).to.be.true;
    
                // cleanup
                datastoreCreateQueryStub.restore();
                datastoreRunQueryStub.restore();
                queryOrderStub.restore();
                queryFilterStub.restore();
            });
            
            it("should filter based on legality.is_modern_restricted", () => {
                // arrange
                let body = {
                    body: {
                        legality: {
                            is_modern_restricted: false
                        }
                    }
                };
                let request = mockReq(body);
                let response = mockRes();
    
                let datastoreCreateQueryStub = sandbox.stub(Datastore.prototype, "createQuery").callsFake((kind) => {
                    return new Query();
                });
                let datastoreRunQueryStub = sandbox.stub(Datastore.prototype, "runQuery");
                datastoreRunQueryStub.returnsPromise().resolves();
                let queryOrderStub = sandbox.stub(Query.prototype, "order").callsFake(() => {
                    return new Query();
                });
                let queryFilterStub = sandbox.stub(Query.prototype, "filter").callsFake(() => {
                    return new Query();
                });
    
                // act
                CardAPI.instance().getCards(request, response);
    
                // assert
                expect(datastoreCreateQueryStub.called).to.be.true;
                expect(queryFilterStub.called).to.be.true;
                expect(queryFilterStub.getCall(0).args[0]).to.be.equal("legality.is_modern_restricted");
                expect(queryFilterStub.getCall(0).args[1]).to.be.equal("=");
                expect(queryFilterStub.getCall(0).args[2]).to.be.equal(body.body.legality.is_modern_restricted);
                expect(queryOrderStub.called).to.be.true;
                expect(queryOrderStub.getCall(0).args[0]).to.be.equal("legality.is_modern_restricted");
                expect(datastoreRunQueryStub.called).to.be.true;
                expect(response.status.called).to.be.true;
                expect(response.status.getCall(0).args[0]).to.be.equal(200);
                expect(response.json.called).to.be.true;
    
                // cleanup
                datastoreCreateQueryStub.restore();
                datastoreRunQueryStub.restore();
                queryOrderStub.restore();
                queryFilterStub.restore();
            });

            it("should filter based on legality.is_one_versus_one_banned", () => {
                // arrange
                let body = {
                    body: {
                        legality: {
                            is_one_versus_one_banned: false
                        }
                    }
                };
                let request = mockReq(body);
                let response = mockRes();
    
                let datastoreCreateQueryStub = sandbox.stub(Datastore.prototype, "createQuery").callsFake((kind) => {
                    return new Query();
                });
                let datastoreRunQueryStub = sandbox.stub(Datastore.prototype, "runQuery");
                datastoreRunQueryStub.returnsPromise().resolves();
                let queryOrderStub = sandbox.stub(Query.prototype, "order").callsFake(() => {
                    return new Query();
                });
                let queryFilterStub = sandbox.stub(Query.prototype, "filter").callsFake(() => {
                    return new Query();
                });
    
                // act
                CardAPI.instance().getCards(request, response);
    
                // assert
                expect(datastoreCreateQueryStub.called).to.be.true;
                expect(queryFilterStub.called).to.be.true;
                expect(queryFilterStub.getCall(0).args[0]).to.be.equal("legality.is_one_versus_one_banned");
                expect(queryFilterStub.getCall(0).args[1]).to.be.equal("=");
                expect(queryFilterStub.getCall(0).args[2]).to.be.equal(body.body.legality.is_one_versus_one_banned);
                expect(queryOrderStub.called).to.be.true;
                expect(queryOrderStub.getCall(0).args[0]).to.be.equal("legality.is_one_versus_one_banned");
                expect(datastoreRunQueryStub.called).to.be.true;
                expect(response.status.called).to.be.true;
                expect(response.status.getCall(0).args[0]).to.be.equal(200);
                expect(response.json.called).to.be.true;
    
                // cleanup
                datastoreCreateQueryStub.restore();
                datastoreRunQueryStub.restore();
                queryOrderStub.restore();
                queryFilterStub.restore();
            });
            
            it("should filter based on legality.is_one_versus_one_legal", () => {
                // arrange
                let body = {
                    body: {
                        legality: {
                            is_one_versus_one_legal: false
                        }
                    }
                };
                let request = mockReq(body);
                let response = mockRes();
    
                let datastoreCreateQueryStub = sandbox.stub(Datastore.prototype, "createQuery").callsFake((kind) => {
                    return new Query();
                });
                let datastoreRunQueryStub = sandbox.stub(Datastore.prototype, "runQuery");
                datastoreRunQueryStub.returnsPromise().resolves();
                let queryOrderStub = sandbox.stub(Query.prototype, "order").callsFake(() => {
                    return new Query();
                });
                let queryFilterStub = sandbox.stub(Query.prototype, "filter").callsFake(() => {
                    return new Query();
                });
    
                // act
                CardAPI.instance().getCards(request, response);
    
                // assert
                expect(datastoreCreateQueryStub.called).to.be.true;
                expect(queryFilterStub.called).to.be.true;
                expect(queryFilterStub.getCall(0).args[0]).to.be.equal("legality.is_one_versus_one_legal");
                expect(queryFilterStub.getCall(0).args[1]).to.be.equal("=");
                expect(queryFilterStub.getCall(0).args[2]).to.be.equal(body.body.legality.is_one_versus_one_legal);
                expect(queryOrderStub.called).to.be.true;
                expect(queryOrderStub.getCall(0).args[0]).to.be.equal("legality.is_one_versus_one_legal");
                expect(datastoreRunQueryStub.called).to.be.true;
                expect(response.status.called).to.be.true;
                expect(response.status.getCall(0).args[0]).to.be.equal(200);
                expect(response.json.called).to.be.true;
    
                // cleanup
                datastoreCreateQueryStub.restore();
                datastoreRunQueryStub.restore();
                queryOrderStub.restore();
                queryFilterStub.restore();
            });
            
            it("should filter based on legality.is_one_versus_one_restricted", () => {
                // arrange
                let body = {
                    body: {
                        legality: {
                            is_one_versus_one_restricted: false
                        }
                    }
                };
                let request = mockReq(body);
                let response = mockRes();
    
                let datastoreCreateQueryStub = sandbox.stub(Datastore.prototype, "createQuery").callsFake((kind) => {
                    return new Query();
                });
                let datastoreRunQueryStub = sandbox.stub(Datastore.prototype, "runQuery");
                datastoreRunQueryStub.returnsPromise().resolves();
                let queryOrderStub = sandbox.stub(Query.prototype, "order").callsFake(() => {
                    return new Query();
                });
                let queryFilterStub = sandbox.stub(Query.prototype, "filter").callsFake(() => {
                    return new Query();
                });
    
                // act
                CardAPI.instance().getCards(request, response);
    
                // assert
                expect(datastoreCreateQueryStub.called).to.be.true;
                expect(queryFilterStub.called).to.be.true;
                expect(queryFilterStub.getCall(0).args[0]).to.be.equal("legality.is_one_versus_one_restricted");
                expect(queryFilterStub.getCall(0).args[1]).to.be.equal("=");
                expect(queryFilterStub.getCall(0).args[2]).to.be.equal(body.body.legality.is_one_versus_one_restricted);
                expect(queryOrderStub.called).to.be.true;
                expect(queryOrderStub.getCall(0).args[0]).to.be.equal("legality.is_one_versus_one_restricted");
                expect(datastoreRunQueryStub.called).to.be.true;
                expect(response.status.called).to.be.true;
                expect(response.status.getCall(0).args[0]).to.be.equal(200);
                expect(response.json.called).to.be.true;
    
                // cleanup
                datastoreCreateQueryStub.restore();
                datastoreRunQueryStub.restore();
                queryOrderStub.restore();
                queryFilterStub.restore();
            });

            it("should filter based on legality.is_pauper_banned", () => {
                // arrange
                let body = {
                    body: {
                        legality: {
                            is_pauper_banned: false
                        }
                    }
                };
                let request = mockReq(body);
                let response = mockRes();
    
                let datastoreCreateQueryStub = sandbox.stub(Datastore.prototype, "createQuery").callsFake((kind) => {
                    return new Query();
                });
                let datastoreRunQueryStub = sandbox.stub(Datastore.prototype, "runQuery");
                datastoreRunQueryStub.returnsPromise().resolves();
                let queryOrderStub = sandbox.stub(Query.prototype, "order").callsFake(() => {
                    return new Query();
                });
                let queryFilterStub = sandbox.stub(Query.prototype, "filter").callsFake(() => {
                    return new Query();
                });
    
                // act
                CardAPI.instance().getCards(request, response);
    
                // assert
                expect(datastoreCreateQueryStub.called).to.be.true;
                expect(queryFilterStub.called).to.be.true;
                expect(queryFilterStub.getCall(0).args[0]).to.be.equal("legality.is_pauper_banned");
                expect(queryFilterStub.getCall(0).args[1]).to.be.equal("=");
                expect(queryFilterStub.getCall(0).args[2]).to.be.equal(body.body.legality.is_pauper_banned);
                expect(queryOrderStub.called).to.be.true;
                expect(queryOrderStub.getCall(0).args[0]).to.be.equal("legality.is_pauper_banned");
                expect(datastoreRunQueryStub.called).to.be.true;
                expect(response.status.called).to.be.true;
                expect(response.status.getCall(0).args[0]).to.be.equal(200);
                expect(response.json.called).to.be.true;
    
                // cleanup
                datastoreCreateQueryStub.restore();
                datastoreRunQueryStub.restore();
                queryOrderStub.restore();
                queryFilterStub.restore();
            });
            
            it("should filter based on legality.is_pauper_legal", () => {
                // arrange
                let body = {
                    body: {
                        legality: {
                            is_pauper_legal: false
                        }
                    }
                };
                let request = mockReq(body);
                let response = mockRes();
    
                let datastoreCreateQueryStub = sandbox.stub(Datastore.prototype, "createQuery").callsFake((kind) => {
                    return new Query();
                });
                let datastoreRunQueryStub = sandbox.stub(Datastore.prototype, "runQuery");
                datastoreRunQueryStub.returnsPromise().resolves();
                let queryOrderStub = sandbox.stub(Query.prototype, "order").callsFake(() => {
                    return new Query();
                });
                let queryFilterStub = sandbox.stub(Query.prototype, "filter").callsFake(() => {
                    return new Query();
                });
    
                // act
                CardAPI.instance().getCards(request, response);
    
                // assert
                expect(datastoreCreateQueryStub.called).to.be.true;
                expect(queryFilterStub.called).to.be.true;
                expect(queryFilterStub.getCall(0).args[0]).to.be.equal("legality.is_pauper_legal");
                expect(queryFilterStub.getCall(0).args[1]).to.be.equal("=");
                expect(queryFilterStub.getCall(0).args[2]).to.be.equal(body.body.legality.is_pauper_legal);
                expect(queryOrderStub.called).to.be.true;
                expect(queryOrderStub.getCall(0).args[0]).to.be.equal("legality.is_pauper_legal");
                expect(datastoreRunQueryStub.called).to.be.true;
                expect(response.status.called).to.be.true;
                expect(response.status.getCall(0).args[0]).to.be.equal(200);
                expect(response.json.called).to.be.true;
    
                // cleanup
                datastoreCreateQueryStub.restore();
                datastoreRunQueryStub.restore();
                queryOrderStub.restore();
                queryFilterStub.restore();
            });
            
            it("should filter based on legality.is_pauper_restricted", () => {
                // arrange
                let body = {
                    body: {
                        legality: {
                            is_pauper_restricted: false
                        }
                    }
                };
                let request = mockReq(body);
                let response = mockRes();
    
                let datastoreCreateQueryStub = sandbox.stub(Datastore.prototype, "createQuery").callsFake((kind) => {
                    return new Query();
                });
                let datastoreRunQueryStub = sandbox.stub(Datastore.prototype, "runQuery");
                datastoreRunQueryStub.returnsPromise().resolves();
                let queryOrderStub = sandbox.stub(Query.prototype, "order").callsFake(() => {
                    return new Query();
                });
                let queryFilterStub = sandbox.stub(Query.prototype, "filter").callsFake(() => {
                    return new Query();
                });
    
                // act
                CardAPI.instance().getCards(request, response);
    
                // assert
                expect(datastoreCreateQueryStub.called).to.be.true;
                expect(queryFilterStub.called).to.be.true;
                expect(queryFilterStub.getCall(0).args[0]).to.be.equal("legality.is_pauper_restricted");
                expect(queryFilterStub.getCall(0).args[1]).to.be.equal("=");
                expect(queryFilterStub.getCall(0).args[2]).to.be.equal(body.body.legality.is_pauper_restricted);
                expect(queryOrderStub.called).to.be.true;
                expect(queryOrderStub.getCall(0).args[0]).to.be.equal("legality.is_pauper_restricted");
                expect(datastoreRunQueryStub.called).to.be.true;
                expect(response.status.called).to.be.true;
                expect(response.status.getCall(0).args[0]).to.be.equal(200);
                expect(response.json.called).to.be.true;
    
                // cleanup
                datastoreCreateQueryStub.restore();
                datastoreRunQueryStub.restore();
                queryOrderStub.restore();
                queryFilterStub.restore();
            });

            it("should filter based on legality.is_penny_banned", () => {
                // arrange
                let body = {
                    body: {
                        legality: {
                            is_penny_banned: false
                        }
                    }
                };
                let request = mockReq(body);
                let response = mockRes();
    
                let datastoreCreateQueryStub = sandbox.stub(Datastore.prototype, "createQuery").callsFake((kind) => {
                    return new Query();
                });
                let datastoreRunQueryStub = sandbox.stub(Datastore.prototype, "runQuery");
                datastoreRunQueryStub.returnsPromise().resolves();
                let queryOrderStub = sandbox.stub(Query.prototype, "order").callsFake(() => {
                    return new Query();
                });
                let queryFilterStub = sandbox.stub(Query.prototype, "filter").callsFake(() => {
                    return new Query();
                });
    
                // act
                CardAPI.instance().getCards(request, response);
    
                // assert
                expect(datastoreCreateQueryStub.called).to.be.true;
                expect(queryFilterStub.called).to.be.true;
                expect(queryFilterStub.getCall(0).args[0]).to.be.equal("legality.is_penny_banned");
                expect(queryFilterStub.getCall(0).args[1]).to.be.equal("=");
                expect(queryFilterStub.getCall(0).args[2]).to.be.equal(body.body.legality.is_penny_banned);
                expect(queryOrderStub.called).to.be.true;
                expect(queryOrderStub.getCall(0).args[0]).to.be.equal("legality.is_penny_banned");
                expect(datastoreRunQueryStub.called).to.be.true;
                expect(response.status.called).to.be.true;
                expect(response.status.getCall(0).args[0]).to.be.equal(200);
                expect(response.json.called).to.be.true;
    
                // cleanup
                datastoreCreateQueryStub.restore();
                datastoreRunQueryStub.restore();
                queryOrderStub.restore();
                queryFilterStub.restore();
            });
            
            it("should filter based on legality.is_penny_legal", () => {
                // arrange
                let body = {
                    body: {
                        legality: {
                            is_penny_legal: false
                        }
                    }
                };
                let request = mockReq(body);
                let response = mockRes();
    
                let datastoreCreateQueryStub = sandbox.stub(Datastore.prototype, "createQuery").callsFake((kind) => {
                    return new Query();
                });
                let datastoreRunQueryStub = sandbox.stub(Datastore.prototype, "runQuery");
                datastoreRunQueryStub.returnsPromise().resolves();
                let queryOrderStub = sandbox.stub(Query.prototype, "order").callsFake(() => {
                    return new Query();
                });
                let queryFilterStub = sandbox.stub(Query.prototype, "filter").callsFake(() => {
                    return new Query();
                });
    
                // act
                CardAPI.instance().getCards(request, response);
    
                // assert
                expect(datastoreCreateQueryStub.called).to.be.true;
                expect(queryFilterStub.called).to.be.true;
                expect(queryFilterStub.getCall(0).args[0]).to.be.equal("legality.is_penny_legal");
                expect(queryFilterStub.getCall(0).args[1]).to.be.equal("=");
                expect(queryFilterStub.getCall(0).args[2]).to.be.equal(body.body.legality.is_penny_legal);
                expect(queryOrderStub.called).to.be.true;
                expect(queryOrderStub.getCall(0).args[0]).to.be.equal("legality.is_penny_legal");
                expect(datastoreRunQueryStub.called).to.be.true;
                expect(response.status.called).to.be.true;
                expect(response.status.getCall(0).args[0]).to.be.equal(200);
                expect(response.json.called).to.be.true;
    
                // cleanup
                datastoreCreateQueryStub.restore();
                datastoreRunQueryStub.restore();
                queryOrderStub.restore();
                queryFilterStub.restore();
            });
            
            it("should filter based on legality.is_penny_restricted", () => {
                // arrange
                let body = {
                    body: {
                        legality: {
                            is_penny_restricted: false
                        }
                    }
                };
                let request = mockReq(body);
                let response = mockRes();
    
                let datastoreCreateQueryStub = sandbox.stub(Datastore.prototype, "createQuery").callsFake((kind) => {
                    return new Query();
                });
                let datastoreRunQueryStub = sandbox.stub(Datastore.prototype, "runQuery");
                datastoreRunQueryStub.returnsPromise().resolves();
                let queryOrderStub = sandbox.stub(Query.prototype, "order").callsFake(() => {
                    return new Query();
                });
                let queryFilterStub = sandbox.stub(Query.prototype, "filter").callsFake(() => {
                    return new Query();
                });
    
                // act
                CardAPI.instance().getCards(request, response);
    
                // assert
                expect(datastoreCreateQueryStub.called).to.be.true;
                expect(queryFilterStub.called).to.be.true;
                expect(queryFilterStub.getCall(0).args[0]).to.be.equal("legality.is_penny_restricted");
                expect(queryFilterStub.getCall(0).args[1]).to.be.equal("=");
                expect(queryFilterStub.getCall(0).args[2]).to.be.equal(body.body.legality.is_penny_restricted);
                expect(queryOrderStub.called).to.be.true;
                expect(queryOrderStub.getCall(0).args[0]).to.be.equal("legality.is_penny_restricted");
                expect(datastoreRunQueryStub.called).to.be.true;
                expect(response.status.called).to.be.true;
                expect(response.status.getCall(0).args[0]).to.be.equal(200);
                expect(response.json.called).to.be.true;
    
                // cleanup
                datastoreCreateQueryStub.restore();
                datastoreRunQueryStub.restore();
                queryOrderStub.restore();
                queryFilterStub.restore();
            });

            it("should filter based on legality.is_standard_banned", () => {
                // arrange
                let body = {
                    body: {
                        legality: {
                            is_standard_banned: false
                        }
                    }
                };
                let request = mockReq(body);
                let response = mockRes();
    
                let datastoreCreateQueryStub = sandbox.stub(Datastore.prototype, "createQuery").callsFake((kind) => {
                    return new Query();
                });
                let datastoreRunQueryStub = sandbox.stub(Datastore.prototype, "runQuery");
                datastoreRunQueryStub.returnsPromise().resolves();
                let queryOrderStub = sandbox.stub(Query.prototype, "order").callsFake(() => {
                    return new Query();
                });
                let queryFilterStub = sandbox.stub(Query.prototype, "filter").callsFake(() => {
                    return new Query();
                });
    
                // act
                CardAPI.instance().getCards(request, response);
    
                // assert
                expect(datastoreCreateQueryStub.called).to.be.true;
                expect(queryFilterStub.called).to.be.true;
                expect(queryFilterStub.getCall(0).args[0]).to.be.equal("legality.is_standard_banned");
                expect(queryFilterStub.getCall(0).args[1]).to.be.equal("=");
                expect(queryFilterStub.getCall(0).args[2]).to.be.equal(body.body.legality.is_standard_banned);
                expect(queryOrderStub.called).to.be.true;
                expect(queryOrderStub.getCall(0).args[0]).to.be.equal("legality.is_standard_banned");
                expect(datastoreRunQueryStub.called).to.be.true;
                expect(response.status.called).to.be.true;
                expect(response.status.getCall(0).args[0]).to.be.equal(200);
                expect(response.json.called).to.be.true;
    
                // cleanup
                datastoreCreateQueryStub.restore();
                datastoreRunQueryStub.restore();
                queryOrderStub.restore();
                queryFilterStub.restore();
            });
            
            it("should filter based on legality.is_standard_legal", () => {
                // arrange
                let body = {
                    body: {
                        legality: {
                            is_standard_legal: false
                        }
                    }
                };
                let request = mockReq(body);
                let response = mockRes();
    
                let datastoreCreateQueryStub = sandbox.stub(Datastore.prototype, "createQuery").callsFake((kind) => {
                    return new Query();
                });
                let datastoreRunQueryStub = sandbox.stub(Datastore.prototype, "runQuery");
                datastoreRunQueryStub.returnsPromise().resolves();
                let queryOrderStub = sandbox.stub(Query.prototype, "order").callsFake(() => {
                    return new Query();
                });
                let queryFilterStub = sandbox.stub(Query.prototype, "filter").callsFake(() => {
                    return new Query();
                });
    
                // act
                CardAPI.instance().getCards(request, response);
    
                // assert
                expect(datastoreCreateQueryStub.called).to.be.true;
                expect(queryFilterStub.called).to.be.true;
                expect(queryFilterStub.getCall(0).args[0]).to.be.equal("legality.is_standard_legal");
                expect(queryFilterStub.getCall(0).args[1]).to.be.equal("=");
                expect(queryFilterStub.getCall(0).args[2]).to.be.equal(body.body.legality.is_standard_legal);
                expect(queryOrderStub.called).to.be.true;
                expect(queryOrderStub.getCall(0).args[0]).to.be.equal("legality.is_standard_legal");
                expect(datastoreRunQueryStub.called).to.be.true;
                expect(response.status.called).to.be.true;
                expect(response.status.getCall(0).args[0]).to.be.equal(200);
                expect(response.json.called).to.be.true;
    
                // cleanup
                datastoreCreateQueryStub.restore();
                datastoreRunQueryStub.restore();
                queryOrderStub.restore();
                queryFilterStub.restore();
            });
            
            it("should filter based on legality.is_standard_restricted", () => {
                // arrange
                let body = {
                    body: {
                        legality: {
                            is_standard_restricted: false
                        }
                    }
                };
                let request = mockReq(body);
                let response = mockRes();
    
                let datastoreCreateQueryStub = sandbox.stub(Datastore.prototype, "createQuery").callsFake((kind) => {
                    return new Query();
                });
                let datastoreRunQueryStub = sandbox.stub(Datastore.prototype, "runQuery");
                datastoreRunQueryStub.returnsPromise().resolves();
                let queryOrderStub = sandbox.stub(Query.prototype, "order").callsFake(() => {
                    return new Query();
                });
                let queryFilterStub = sandbox.stub(Query.prototype, "filter").callsFake(() => {
                    return new Query();
                });
    
                // act
                CardAPI.instance().getCards(request, response);
    
                // assert
                expect(datastoreCreateQueryStub.called).to.be.true;
                expect(queryFilterStub.called).to.be.true;
                expect(queryFilterStub.getCall(0).args[0]).to.be.equal("legality.is_standard_restricted");
                expect(queryFilterStub.getCall(0).args[1]).to.be.equal("=");
                expect(queryFilterStub.getCall(0).args[2]).to.be.equal(body.body.legality.is_standard_restricted);
                expect(queryOrderStub.called).to.be.true;
                expect(queryOrderStub.getCall(0).args[0]).to.be.equal("legality.is_standard_restricted");
                expect(datastoreRunQueryStub.called).to.be.true;
                expect(response.status.called).to.be.true;
                expect(response.status.getCall(0).args[0]).to.be.equal(200);
                expect(response.json.called).to.be.true;
    
                // cleanup
                datastoreCreateQueryStub.restore();
                datastoreRunQueryStub.restore();
                queryOrderStub.restore();
                queryFilterStub.restore();
            });

            it("should filter based on legality.is_vintage_banned", () => {
                // arrange
                let body = {
                    body: {
                        legality: {
                            is_vintage_banned: false
                        }
                    }
                };
                let request = mockReq(body);
                let response = mockRes();
    
                let datastoreCreateQueryStub = sandbox.stub(Datastore.prototype, "createQuery").callsFake((kind) => {
                    return new Query();
                });
                let datastoreRunQueryStub = sandbox.stub(Datastore.prototype, "runQuery");
                datastoreRunQueryStub.returnsPromise().resolves();
                let queryOrderStub = sandbox.stub(Query.prototype, "order").callsFake(() => {
                    return new Query();
                });
                let queryFilterStub = sandbox.stub(Query.prototype, "filter").callsFake(() => {
                    return new Query();
                });
    
                // act
                CardAPI.instance().getCards(request, response);
    
                // assert
                expect(datastoreCreateQueryStub.called).to.be.true;
                expect(queryFilterStub.called).to.be.true;
                expect(queryFilterStub.getCall(0).args[0]).to.be.equal("legality.is_vintage_banned");
                expect(queryFilterStub.getCall(0).args[1]).to.be.equal("=");
                expect(queryFilterStub.getCall(0).args[2]).to.be.equal(body.body.legality.is_vintage_banned);
                expect(queryOrderStub.called).to.be.true;
                expect(queryOrderStub.getCall(0).args[0]).to.be.equal("legality.is_vintage_banned");
                expect(datastoreRunQueryStub.called).to.be.true;
                expect(response.status.called).to.be.true;
                expect(response.status.getCall(0).args[0]).to.be.equal(200);
                expect(response.json.called).to.be.true;
    
                // cleanup
                datastoreCreateQueryStub.restore();
                datastoreRunQueryStub.restore();
                queryOrderStub.restore();
                queryFilterStub.restore();
            });
            
            it("should filter based on legality.is_vintage_legal", () => {
                // arrange
                let body = {
                    body: {
                        legality: {
                            is_vintage_legal: false
                        }
                    }
                };
                let request = mockReq(body);
                let response = mockRes();
    
                let datastoreCreateQueryStub = sandbox.stub(Datastore.prototype, "createQuery").callsFake((kind) => {
                    return new Query();
                });
                let datastoreRunQueryStub = sandbox.stub(Datastore.prototype, "runQuery");
                datastoreRunQueryStub.returnsPromise().resolves();
                let queryOrderStub = sandbox.stub(Query.prototype, "order").callsFake(() => {
                    return new Query();
                });
                let queryFilterStub = sandbox.stub(Query.prototype, "filter").callsFake(() => {
                    return new Query();
                });
    
                // act
                CardAPI.instance().getCards(request, response);
    
                // assert
                expect(datastoreCreateQueryStub.called).to.be.true;
                expect(queryFilterStub.called).to.be.true;
                expect(queryFilterStub.getCall(0).args[0]).to.be.equal("legality.is_vintage_legal");
                expect(queryFilterStub.getCall(0).args[1]).to.be.equal("=");
                expect(queryFilterStub.getCall(0).args[2]).to.be.equal(body.body.legality.is_vintage_legal);
                expect(queryOrderStub.called).to.be.true;
                expect(queryOrderStub.getCall(0).args[0]).to.be.equal("legality.is_vintage_legal");
                expect(datastoreRunQueryStub.called).to.be.true;
                expect(response.status.called).to.be.true;
                expect(response.status.getCall(0).args[0]).to.be.equal(200);
                expect(response.json.called).to.be.true;
    
                // cleanup
                datastoreCreateQueryStub.restore();
                datastoreRunQueryStub.restore();
                queryOrderStub.restore();
                queryFilterStub.restore();
            });
            
            it("should filter based on legality.is_vintage_restricted", () => {
                // arrange
                let body = {
                    body: {
                        legality: {
                            is_vintage_restricted: false
                        }
                    }
                };
                let request = mockReq(body);
                let response = mockRes();
    
                let datastoreCreateQueryStub = sandbox.stub(Datastore.prototype, "createQuery").callsFake((kind) => {
                    return new Query();
                });
                let datastoreRunQueryStub = sandbox.stub(Datastore.prototype, "runQuery");
                datastoreRunQueryStub.returnsPromise().resolves();
                let queryOrderStub = sandbox.stub(Query.prototype, "order").callsFake(() => {
                    return new Query();
                });
                let queryFilterStub = sandbox.stub(Query.prototype, "filter").callsFake(() => {
                    return new Query();
                });
    
                // act
                CardAPI.instance().getCards(request, response);
    
                // assert
                expect(datastoreCreateQueryStub.called).to.be.true;
                expect(queryFilterStub.called).to.be.true;
                expect(queryFilterStub.getCall(0).args[0]).to.be.equal("legality.is_vintage_restricted");
                expect(queryFilterStub.getCall(0).args[1]).to.be.equal("=");
                expect(queryFilterStub.getCall(0).args[2]).to.be.equal(body.body.legality.is_vintage_restricted);
                expect(queryOrderStub.called).to.be.true;
                expect(queryOrderStub.getCall(0).args[0]).to.be.equal("legality.is_vintage_restricted");
                expect(datastoreRunQueryStub.called).to.be.true;
                expect(response.status.called).to.be.true;
                expect(response.status.getCall(0).args[0]).to.be.equal(200);
                expect(response.json.called).to.be.true;
    
                // cleanup
                datastoreCreateQueryStub.restore();
                datastoreRunQueryStub.restore();
                queryOrderStub.restore();
                queryFilterStub.restore();
            });
        });

        it("should validate and filter based on is_reserved", () => {
            // arrange
            let body = {
                body: {
                    is_reserved: false
                }
            };
            let request = mockReq(body);
            let response = mockRes();

            let datastoreCreateQueryStub = sandbox.stub(Datastore.prototype, "createQuery").callsFake((kind) => {
                return new Query();
            });
            let datastoreRunQueryStub = sandbox.stub(Datastore.prototype, "runQuery");
            datastoreRunQueryStub.returnsPromise().resolves();
            let queryOrderStub = sandbox.stub(Query.prototype, "order").callsFake(() => {
                return new Query();
            });
            let queryFilterStub = sandbox.stub(Query.prototype, "filter").callsFake(() => {
                return new Query();
            });
            let validateIsReservedStub = sandbox.stub(Card, "validateIsReserved");

            // act
            CardAPI.instance().getCards(request, response);

            // assert
            expect(datastoreCreateQueryStub.called).to.be.true;
            expect(validateIsReservedStub.called).to.be.true;
            expect(queryFilterStub.called).to.be.true;
            expect(queryFilterStub.getCall(0).args[0]).to.be.equal("is_reserved");
            expect(queryFilterStub.getCall(0).args[1]).to.be.equal("=");
            expect(queryFilterStub.getCall(0).args[2]).to.be.equal(body.body.is_reserved);
            expect(queryOrderStub.called).to.be.true;
            expect(queryOrderStub.getCall(0).args[0]).to.be.equal("is_reserved");
            expect(datastoreRunQueryStub.called).to.be.true;
            expect(response.status.called).to.be.true;
            expect(response.status.getCall(0).args[0]).to.be.equal(200);
            expect(response.json.called).to.be.true;

            // cleanup
            datastoreCreateQueryStub.restore();
            datastoreRunQueryStub.restore();
            queryOrderStub.restore();
            queryFilterStub.restore();
            validateIsReservedStub.restore();
        });

        it("should invalidate and return error on invalid is_reserved", () => {
            // arrange
            let body = {
                body: {
                    is_reserved: false
                }
            };
            let request = mockReq(body);
            let response = mockRes();

            let datastoreCreateQueryStub = sandbox.stub(Datastore.prototype, "createQuery").callsFake((kind) => {
                return new Query();
            });
            let datastoreRunQueryStub = sandbox.stub(Datastore.prototype, "runQuery");
            datastoreRunQueryStub.returnsPromise().resolves();
            let queryOrderStub = sandbox.stub(Query.prototype, "order").callsFake(() => {
                return new Query();
            });
            let queryFilterStub = sandbox.stub(Query.prototype, "filter").callsFake(() => {
                return new Query();
            });
            let validateIsReservedStub = sandbox.stub(Card, "validateIsReserved").callsFake(() => {
                throw new Error("example error");
            });

            // act
            CardAPI.instance().getCards(request, response);

            // assert
            expect(datastoreCreateQueryStub.called).to.be.true;
            expect(validateIsReservedStub.called).to.be.true;
            expect(queryFilterStub.called).to.be.false;
            expect(queryOrderStub.called).to.be.false;
            expect(datastoreRunQueryStub.called).to.be.false;
            expect(response.status.called).to.be.true;
            expect(response.status.getCall(0).args[0]).to.be.equal(400);
            expect(response.json.called).to.be.true;

            // cleanup
            datastoreCreateQueryStub.restore();
            datastoreRunQueryStub.restore();
            queryOrderStub.restore();
            queryFilterStub.restore();
            validateIsReservedStub.restore();
        });

        it("should validate and filter based on edhrec_rank", () => {
            // arrange
            let body = {
                body: {
                    edhrec_rank: 1849
                }
            };
            let request = mockReq(body);
            let response = mockRes();

            let datastoreCreateQueryStub = sandbox.stub(Datastore.prototype, "createQuery").callsFake((kind) => {
                return new Query();
            });
            let datastoreRunQueryStub = sandbox.stub(Datastore.prototype, "runQuery");
            datastoreRunQueryStub.returnsPromise().resolves();
            let queryOrderStub = sandbox.stub(Query.prototype, "order").callsFake(() => {
                return new Query();
            });
            let queryFilterStub = sandbox.stub(Query.prototype, "filter").callsFake(() => {
                return new Query();
            });
            let validateEDHRecRankStub = sandbox.stub(Card, "validateEDHRecRank");

            // act
            CardAPI.instance().getCards(request, response);

            // assert
            expect(datastoreCreateQueryStub.called).to.be.true;
            expect(validateEDHRecRankStub.called).to.be.true;
            expect(queryFilterStub.called).to.be.true;
            expect(queryFilterStub.getCall(0).args[0]).to.be.equal("edhrec_rank");
            expect(queryFilterStub.getCall(0).args[1]).to.be.equal("=");
            expect(queryFilterStub.getCall(0).args[2]).to.be.equal(body.body.edhrec_rank);
            expect(queryOrderStub.called).to.be.true;
            expect(queryOrderStub.getCall(0).args[0]).to.be.equal("edhrec_rank");
            expect(datastoreRunQueryStub.called).to.be.true;
            expect(response.status.called).to.be.true;
            expect(response.status.getCall(0).args[0]).to.be.equal(200);
            expect(response.json.called).to.be.true;

            // cleanup
            datastoreCreateQueryStub.restore();
            datastoreRunQueryStub.restore();
            queryOrderStub.restore();
            queryFilterStub.restore();
            validateEDHRecRankStub.restore();
        });

        it("should invalidate and return error on invalid edhrec_rank", () => {
            // arrange
            let body = {
                body: {
                    edhrec_rank: 1849
                }
            };
            let request = mockReq(body);
            let response = mockRes();

            let datastoreCreateQueryStub = sandbox.stub(Datastore.prototype, "createQuery").callsFake((kind) => {
                return new Query();
            });
            let datastoreRunQueryStub = sandbox.stub(Datastore.prototype, "runQuery");
            datastoreRunQueryStub.returnsPromise().resolves();
            let queryOrderStub = sandbox.stub(Query.prototype, "order").callsFake(() => {
                return new Query();
            });
            let queryFilterStub = sandbox.stub(Query.prototype, "filter").callsFake(() => {
                return new Query();
            });
            let validateEDHRecRankStub = sandbox.stub(Card, "validateEDHRecRank").callsFake(() => {
                throw new Error("example error");
            });

            // act
            CardAPI.instance().getCards(request, response);

            // assert
            expect(datastoreCreateQueryStub.called).to.be.true;
            expect(validateEDHRecRankStub.called).to.be.true;
            expect(queryFilterStub.called).to.be.false;
            expect(queryOrderStub.called).to.be.false;
            expect(datastoreRunQueryStub.called).to.be.false;
            expect(response.status.called).to.be.true;
            expect(response.status.getCall(0).args[0]).to.be.equal(400);
            expect(response.json.called).to.be.true;

            // cleanup
            datastoreCreateQueryStub.restore();
            datastoreRunQueryStub.restore();
            queryOrderStub.restore();
            queryFilterStub.restore();
            validateEDHRecRankStub.restore();
        });

        it("should validate and filter based on set_code", () => {
            // arrange
            let body = {
                body: {
                    set_code: "akh"
                }
            };
            let request = mockReq(body);
            let response = mockRes();

            let datastoreCreateQueryStub = sandbox.stub(Datastore.prototype, "createQuery").callsFake((kind) => {
                return new Query();
            });
            let datastoreRunQueryStub = sandbox.stub(Datastore.prototype, "runQuery");
            datastoreRunQueryStub.returnsPromise().resolves();
            let queryOrderStub = sandbox.stub(Query.prototype, "order").callsFake(() => {
                return new Query();
            });
            let queryFilterStub = sandbox.stub(Query.prototype, "filter").callsFake(() => {
                return new Query();
            });
            let validateSetCodeStub = sandbox.stub(Card, "validateSetCode");

            // act
            CardAPI.instance().getCards(request, response);

            // assert
            expect(datastoreCreateQueryStub.called).to.be.true;
            expect(validateSetCodeStub.called).to.be.true;
            expect(queryFilterStub.called).to.be.true;
            expect(queryFilterStub.getCall(0).args[0]).to.be.equal("set_code");
            expect(queryFilterStub.getCall(0).args[1]).to.be.equal("=");
            expect(queryFilterStub.getCall(0).args[2]).to.be.equal(body.body.set_code);
            expect(queryOrderStub.called).to.be.true;
            expect(queryOrderStub.getCall(0).args[0]).to.be.equal("set_code");
            expect(datastoreRunQueryStub.called).to.be.true;
            expect(response.status.called).to.be.true;
            expect(response.status.getCall(0).args[0]).to.be.equal(200);
            expect(response.json.called).to.be.true;

            // cleanup
            datastoreCreateQueryStub.restore();
            datastoreRunQueryStub.restore();
            queryOrderStub.restore();
            queryFilterStub.restore();
            validateSetCodeStub.restore();
        });

        it("should invalidate and return error on invalid set_code", () => {
            // arrange
            let body = {
                body: {
                    set_code: "akh"
                }
            };
            let request = mockReq(body);
            let response = mockRes();

            let datastoreCreateQueryStub = sandbox.stub(Datastore.prototype, "createQuery").callsFake((kind) => {
                return new Query();
            });
            let datastoreRunQueryStub = sandbox.stub(Datastore.prototype, "runQuery");
            datastoreRunQueryStub.returnsPromise().resolves();
            let queryOrderStub = sandbox.stub(Query.prototype, "order").callsFake(() => {
                return new Query();
            });
            let queryFilterStub = sandbox.stub(Query.prototype, "filter").callsFake(() => {
                return new Query();
            });
            let validateSetCodeStub = sandbox.stub(Card, "validateSetCode").callsFake(() => {
                throw new Error("example error");
            });

            // act
            CardAPI.instance().getCards(request, response);

            // assert
            expect(datastoreCreateQueryStub.called).to.be.true;
            expect(validateSetCodeStub.called).to.be.true;
            expect(queryFilterStub.called).to.be.false;
            expect(queryOrderStub.called).to.be.false;
            expect(datastoreRunQueryStub.called).to.be.false;
            expect(response.status.called).to.be.true;
            expect(response.status.getCall(0).args[0]).to.be.equal(400);
            expect(response.json.called).to.be.true;

            // cleanup
            datastoreCreateQueryStub.restore();
            datastoreRunQueryStub.restore();
            queryOrderStub.restore();
            queryFilterStub.restore();
            validateSetCodeStub.restore();
        });

        it("should validate and filter based on set_name", () => {
            // arrange
            let body = {
                body: {
                    set_name: "Amonkhet"
                }
            };
            let request = mockReq(body);
            let response = mockRes();

            let datastoreCreateQueryStub = sandbox.stub(Datastore.prototype, "createQuery").callsFake((kind) => {
                return new Query();
            });
            let datastoreRunQueryStub = sandbox.stub(Datastore.prototype, "runQuery");
            datastoreRunQueryStub.returnsPromise().resolves();
            let queryOrderStub = sandbox.stub(Query.prototype, "order").callsFake(() => {
                return new Query();
            });
            let queryFilterStub = sandbox.stub(Query.prototype, "filter").callsFake(() => {
                return new Query();
            });
            let validateSetNameStub = sandbox.stub(Card, "validateSetName");

            // act
            CardAPI.instance().getCards(request, response);

            // assert
            expect(datastoreCreateQueryStub.called).to.be.true;
            expect(validateSetNameStub.called).to.be.true;
            expect(queryFilterStub.called).to.be.true;
            expect(queryFilterStub.getCall(0).args[0]).to.be.equal("set_name");
            expect(queryFilterStub.getCall(0).args[1]).to.be.equal("=");
            expect(queryFilterStub.getCall(0).args[2]).to.be.equal(body.body.set_name);
            expect(queryOrderStub.called).to.be.true;
            expect(queryOrderStub.getCall(0).args[0]).to.be.equal("set_name");
            expect(datastoreRunQueryStub.called).to.be.true;
            expect(response.status.called).to.be.true;
            expect(response.status.getCall(0).args[0]).to.be.equal(200);
            expect(response.json.called).to.be.true;

            // cleanup
            datastoreCreateQueryStub.restore();
            datastoreRunQueryStub.restore();
            queryOrderStub.restore();
            queryFilterStub.restore();
            validateSetNameStub.restore();
        });

        it("should invalidate and return error on invalid set_name", () => {
            // arrange
            let body = {
                body: {
                    set_name: "Amonkhet"
                }
            };
            let request = mockReq(body);
            let response = mockRes();

            let datastoreCreateQueryStub = sandbox.stub(Datastore.prototype, "createQuery").callsFake((kind) => {
                return new Query();
            });
            let datastoreRunQueryStub = sandbox.stub(Datastore.prototype, "runQuery");
            datastoreRunQueryStub.returnsPromise().resolves();
            let queryOrderStub = sandbox.stub(Query.prototype, "order").callsFake(() => {
                return new Query();
            });
            let queryFilterStub = sandbox.stub(Query.prototype, "filter").callsFake(() => {
                return new Query();
            });
            let validateSetNameStub = sandbox.stub(Card, "validateSetName").callsFake(() => {
                throw new Error("example error");
            });

            // act
            CardAPI.instance().getCards(request, response);

            // assert
            expect(datastoreCreateQueryStub.called).to.be.true;
            expect(validateSetNameStub.called).to.be.true;
            expect(queryFilterStub.called).to.be.false;
            expect(queryOrderStub.called).to.be.false;
            expect(datastoreRunQueryStub.called).to.be.false;
            expect(response.status.called).to.be.true;
            expect(response.status.getCall(0).args[0]).to.be.equal(400);
            expect(response.json.called).to.be.true;

            // cleanup
            datastoreCreateQueryStub.restore();
            datastoreRunQueryStub.restore();
            queryOrderStub.restore();
            queryFilterStub.restore();
            validateSetNameStub.restore();
        });

        it("should validate and filter based on collector_number", () => {
            // arrange
            let body = {
                body: {
                    collector_number: "84"
                }
            };
            let request = mockReq(body);
            let response = mockRes();

            let datastoreCreateQueryStub = sandbox.stub(Datastore.prototype, "createQuery").callsFake((kind) => {
                return new Query();
            });
            let datastoreRunQueryStub = sandbox.stub(Datastore.prototype, "runQuery");
            datastoreRunQueryStub.returnsPromise().resolves();
            let queryOrderStub = sandbox.stub(Query.prototype, "order").callsFake(() => {
                return new Query();
            });
            let queryFilterStub = sandbox.stub(Query.prototype, "filter").callsFake(() => {
                return new Query();
            });
            let validateCollectorNumberStub = sandbox.stub(Card, "validateCollectorNumber");

            // act
            CardAPI.instance().getCards(request, response);

            // assert
            expect(datastoreCreateQueryStub.called).to.be.true;
            expect(validateCollectorNumberStub.called).to.be.true;
            expect(queryFilterStub.called).to.be.true;
            expect(queryFilterStub.getCall(0).args[0]).to.be.equal("collector_number");
            expect(queryFilterStub.getCall(0).args[1]).to.be.equal("=");
            expect(queryFilterStub.getCall(0).args[2]).to.be.equal(body.body.collector_number);
            expect(queryOrderStub.called).to.be.true;
            expect(queryOrderStub.getCall(0).args[0]).to.be.equal("collector_number");
            expect(datastoreRunQueryStub.called).to.be.true;
            expect(response.status.called).to.be.true;
            expect(response.status.getCall(0).args[0]).to.be.equal(200);
            expect(response.json.called).to.be.true;

            // cleanup
            datastoreCreateQueryStub.restore();
            datastoreRunQueryStub.restore();
            queryOrderStub.restore();
            queryFilterStub.restore();
            validateCollectorNumberStub.restore();
        });

        it("should invalidate and return error on invalid collector_number", () => {
            // arrange
            let body = {
                body: {
                    collector_number: "84"
                }
            };
            let request = mockReq(body);
            let response = mockRes();

            let datastoreCreateQueryStub = sandbox.stub(Datastore.prototype, "createQuery").callsFake((kind) => {
                return new Query();
            });
            let datastoreRunQueryStub = sandbox.stub(Datastore.prototype, "runQuery");
            datastoreRunQueryStub.returnsPromise().resolves();
            let queryOrderStub = sandbox.stub(Query.prototype, "order").callsFake(() => {
                return new Query();
            });
            let queryFilterStub = sandbox.stub(Query.prototype, "filter").callsFake(() => {
                return new Query();
            });
            let validateCollectorNumberStub = sandbox.stub(Card, "validateCollectorNumber").callsFake(() => {
                throw new Error("example error");
            });

            // act
            CardAPI.instance().getCards(request, response);

            // assert
            expect(datastoreCreateQueryStub.called).to.be.true;
            expect(validateCollectorNumberStub.called).to.be.true;
            expect(queryFilterStub.called).to.be.false;
            expect(queryOrderStub.called).to.be.false;
            expect(datastoreRunQueryStub.called).to.be.false;
            expect(response.status.called).to.be.true;
            expect(response.status.getCall(0).args[0]).to.be.equal(400);
            expect(response.json.called).to.be.true;

            // cleanup
            datastoreCreateQueryStub.restore();
            datastoreRunQueryStub.restore();
            queryOrderStub.restore();
            queryFilterStub.restore();
            validateCollectorNumberStub.restore();
        });

        it("should validate and filter based on is_reprint", () => {
            // arrange
            let body = {
                body: {
                    is_reprint: false
                }
            };
            let request = mockReq(body);
            let response = mockRes();

            let datastoreCreateQueryStub = sandbox.stub(Datastore.prototype, "createQuery").callsFake((kind) => {
                return new Query();
            });
            let datastoreRunQueryStub = sandbox.stub(Datastore.prototype, "runQuery");
            datastoreRunQueryStub.returnsPromise().resolves();
            let queryOrderStub = sandbox.stub(Query.prototype, "order").callsFake(() => {
                return new Query();
            });
            let queryFilterStub = sandbox.stub(Query.prototype, "filter").callsFake(() => {
                return new Query();
            });
            let validateIsReprintStub = sandbox.stub(Card, "validateIsReprint");

            // act
            CardAPI.instance().getCards(request, response);

            // assert
            expect(datastoreCreateQueryStub.called).to.be.true;
            expect(validateIsReprintStub.called).to.be.true;
            expect(queryFilterStub.called).to.be.true;
            expect(queryFilterStub.getCall(0).args[0]).to.be.equal("is_reprint");
            expect(queryFilterStub.getCall(0).args[1]).to.be.equal("=");
            expect(queryFilterStub.getCall(0).args[2]).to.be.equal(body.body.is_reprint);
            expect(queryOrderStub.called).to.be.true;
            expect(queryOrderStub.getCall(0).args[0]).to.be.equal("is_reprint");
            expect(datastoreRunQueryStub.called).to.be.true;
            expect(response.status.called).to.be.true;
            expect(response.status.getCall(0).args[0]).to.be.equal(200);
            expect(response.json.called).to.be.true;

            // cleanup
            datastoreCreateQueryStub.restore();
            datastoreRunQueryStub.restore();
            queryOrderStub.restore();
            queryFilterStub.restore();
            validateIsReprintStub.restore();
        });

        it("should invalidate and return error on invalid is_reprint", () => {
            // arrange
            let body = {
                body: {
                    is_reprint: false
                }
            };
            let request = mockReq(body);
            let response = mockRes();

            let datastoreCreateQueryStub = sandbox.stub(Datastore.prototype, "createQuery").callsFake((kind) => {
                return new Query();
            });
            let datastoreRunQueryStub = sandbox.stub(Datastore.prototype, "runQuery");
            datastoreRunQueryStub.returnsPromise().resolves();
            let queryOrderStub = sandbox.stub(Query.prototype, "order").callsFake(() => {
                return new Query();
            });
            let queryFilterStub = sandbox.stub(Query.prototype, "filter").callsFake(() => {
                return new Query();
            });
            let validateIsReprintStub = sandbox.stub(Card, "validateIsReprint").callsFake(() => {
                throw new Error("example error");
            });

            // act
            CardAPI.instance().getCards(request, response);

            // assert
            expect(datastoreCreateQueryStub.called).to.be.true;
            expect(validateIsReprintStub.called).to.be.true;
            expect(queryFilterStub.called).to.be.false;
            expect(queryOrderStub.called).to.be.false;
            expect(datastoreRunQueryStub.called).to.be.false;
            expect(response.status.called).to.be.true;
            expect(response.status.getCall(0).args[0]).to.be.equal(400);
            expect(response.json.called).to.be.true;

            // cleanup
            datastoreCreateQueryStub.restore();
            datastoreRunQueryStub.restore();
            queryOrderStub.restore();
            queryFilterStub.restore();
            validateIsReprintStub.restore();
        });

        it("should validate and filter based on is_digital", () => {
            // arrange
            let body = {
                body: {
                    is_digital: false
                }
            };
            let request = mockReq(body);
            let response = mockRes();

            let datastoreCreateQueryStub = sandbox.stub(Datastore.prototype, "createQuery").callsFake((kind) => {
                return new Query();
            });
            let datastoreRunQueryStub = sandbox.stub(Datastore.prototype, "runQuery");
            datastoreRunQueryStub.returnsPromise().resolves();
            let queryOrderStub = sandbox.stub(Query.prototype, "order").callsFake(() => {
                return new Query();
            });
            let queryFilterStub = sandbox.stub(Query.prototype, "filter").callsFake(() => {
                return new Query();
            });
            let validateIsDigitalStub = sandbox.stub(Card, "validateIsDigital");

            // act
            CardAPI.instance().getCards(request, response);

            // assert
            expect(datastoreCreateQueryStub.called).to.be.true;
            expect(validateIsDigitalStub.called).to.be.true;
            expect(queryFilterStub.called).to.be.true;
            expect(queryFilterStub.getCall(0).args[0]).to.be.equal("is_digital");
            expect(queryFilterStub.getCall(0).args[1]).to.be.equal("=");
            expect(queryFilterStub.getCall(0).args[2]).to.be.equal(body.body.is_digital);
            expect(queryOrderStub.called).to.be.true;
            expect(queryOrderStub.getCall(0).args[0]).to.be.equal("is_digital");
            expect(datastoreRunQueryStub.called).to.be.true;
            expect(response.status.called).to.be.true;
            expect(response.status.getCall(0).args[0]).to.be.equal(200);
            expect(response.json.called).to.be.true;

            // cleanup
            datastoreCreateQueryStub.restore();
            datastoreRunQueryStub.restore();
            queryOrderStub.restore();
            queryFilterStub.restore();
            validateIsDigitalStub.restore();
        });

        it("should invalidate and return error on invalid is_digital", () => {
            // arrange
            let body = {
                body: {
                    is_digital: false
                }
            };
            let request = mockReq(body);
            let response = mockRes();

            let datastoreCreateQueryStub = sandbox.stub(Datastore.prototype, "createQuery").callsFake((kind) => {
                return new Query();
            });
            let datastoreRunQueryStub = sandbox.stub(Datastore.prototype, "runQuery");
            datastoreRunQueryStub.returnsPromise().resolves();
            let queryOrderStub = sandbox.stub(Query.prototype, "order").callsFake(() => {
                return new Query();
            });
            let queryFilterStub = sandbox.stub(Query.prototype, "filter").callsFake(() => {
                return new Query();
            });
            let validateIsDigitalStub = sandbox.stub(Card, "validateIsDigital").callsFake(() => {
                throw new Error("example error");
            });

            // act
            CardAPI.instance().getCards(request, response);

            // assert
            expect(datastoreCreateQueryStub.called).to.be.true;
            expect(validateIsDigitalStub.called).to.be.true;
            expect(queryFilterStub.called).to.be.false;
            expect(queryOrderStub.called).to.be.false;
            expect(datastoreRunQueryStub.called).to.be.false;
            expect(response.status.called).to.be.true;
            expect(response.status.getCall(0).args[0]).to.be.equal(400);
            expect(response.json.called).to.be.true;

            // cleanup
            datastoreCreateQueryStub.restore();
            datastoreRunQueryStub.restore();
            queryOrderStub.restore();
            queryFilterStub.restore();
            validateIsDigitalStub.restore();
        });

        it("should validate and filter based on rarity", () => {
            // arrange
            let body = {
                body: {
                    rarity: Rarities.Common
                }
            };
            let request = mockReq(body);
            let response = mockRes();

            let datastoreCreateQueryStub = sandbox.stub(Datastore.prototype, "createQuery").callsFake((kind) => {
                return new Query();
            });
            let datastoreRunQueryStub = sandbox.stub(Datastore.prototype, "runQuery");
            datastoreRunQueryStub.returnsPromise().resolves();
            let queryOrderStub = sandbox.stub(Query.prototype, "order").callsFake(() => {
                return new Query();
            });
            let queryFilterStub = sandbox.stub(Query.prototype, "filter").callsFake(() => {
                return new Query();
            });
            let validateRarityStub = sandbox.stub(Card, "validateRarity");

            // act
            CardAPI.instance().getCards(request, response);

            // assert
            expect(datastoreCreateQueryStub.called).to.be.true;
            expect(validateRarityStub.called).to.be.true;
            expect(queryFilterStub.called).to.be.true;
            expect(queryFilterStub.getCall(0).args[0]).to.be.equal("rarity");
            expect(queryFilterStub.getCall(0).args[1]).to.be.equal("=");
            expect(queryFilterStub.getCall(0).args[2]).to.be.equal(body.body.rarity);
            expect(queryOrderStub.called).to.be.true;
            expect(queryOrderStub.getCall(0).args[0]).to.be.equal("rarity");
            expect(datastoreRunQueryStub.called).to.be.true;
            expect(response.status.called).to.be.true;
            expect(response.status.getCall(0).args[0]).to.be.equal(200);
            expect(response.json.called).to.be.true;

            // cleanup
            datastoreCreateQueryStub.restore();
            datastoreRunQueryStub.restore();
            queryOrderStub.restore();
            queryFilterStub.restore();
            validateRarityStub.restore();
        });

        it("should invalidate and return error on invalid rarity", () => {
            // arrange
            let body = {
                body: {
                    rarity: Rarities.Common
                }
            };
            let request = mockReq(body);
            let response = mockRes();

            let datastoreCreateQueryStub = sandbox.stub(Datastore.prototype, "createQuery").callsFake((kind) => {
                return new Query();
            });
            let datastoreRunQueryStub = sandbox.stub(Datastore.prototype, "runQuery");
            datastoreRunQueryStub.returnsPromise().resolves();
            let queryOrderStub = sandbox.stub(Query.prototype, "order").callsFake(() => {
                return new Query();
            });
            let queryFilterStub = sandbox.stub(Query.prototype, "filter").callsFake(() => {
                return new Query();
            });
            let validateRarityStub = sandbox.stub(Card, "validateRarity").callsFake(() => {
                throw new Error("example error");
            });

            // act
            CardAPI.instance().getCards(request, response);

            // assert
            expect(datastoreCreateQueryStub.called).to.be.true;
            expect(validateRarityStub.called).to.be.true;
            expect(queryFilterStub.called).to.be.false;
            expect(queryOrderStub.called).to.be.false;
            expect(datastoreRunQueryStub.called).to.be.false;
            expect(response.status.called).to.be.true;
            expect(response.status.getCall(0).args[0]).to.be.equal(400);
            expect(response.json.called).to.be.true;

            // cleanup
            datastoreCreateQueryStub.restore();
            datastoreRunQueryStub.restore();
            queryOrderStub.restore();
            queryFilterStub.restore();
            validateRarityStub.restore();
        });

        it("should validate and filter based on artist", () => {
            // arrange
            let body = {
                body: {
                    artist: "Kieran Yanner"
                }
            };
            let request = mockReq(body);
            let response = mockRes();

            let datastoreCreateQueryStub = sandbox.stub(Datastore.prototype, "createQuery").callsFake((kind) => {
                return new Query();
            });
            let datastoreRunQueryStub = sandbox.stub(Datastore.prototype, "runQuery");
            datastoreRunQueryStub.returnsPromise().resolves();
            let queryOrderStub = sandbox.stub(Query.prototype, "order").callsFake(() => {
                return new Query();
            });
            let queryFilterStub = sandbox.stub(Query.prototype, "filter").callsFake(() => {
                return new Query();
            });
            let validateArtistStub = sandbox.stub(Card, "validateArtist");

            // act
            CardAPI.instance().getCards(request, response);

            // assert
            expect(datastoreCreateQueryStub.called).to.be.true;
            expect(validateArtistStub.called).to.be.true;
            expect(queryFilterStub.called).to.be.true;
            expect(queryFilterStub.getCall(0).args[0]).to.be.equal("artist");
            expect(queryFilterStub.getCall(0).args[1]).to.be.equal("=");
            expect(queryFilterStub.getCall(0).args[2]).to.be.equal(body.body.artist);
            expect(queryOrderStub.called).to.be.true;
            expect(queryOrderStub.getCall(0).args[0]).to.be.equal("artist");
            expect(datastoreRunQueryStub.called).to.be.true;
            expect(response.status.called).to.be.true;
            expect(response.status.getCall(0).args[0]).to.be.equal(200);
            expect(response.json.called).to.be.true;

            // cleanup
            datastoreCreateQueryStub.restore();
            datastoreRunQueryStub.restore();
            queryOrderStub.restore();
            queryFilterStub.restore();
            validateArtistStub.restore();
        });

        it("should invalidate and return error on invalid artist", () => {
            // arrange
            let body = {
                body: {
                    artist: "Kieran Yanner"
                }
            };
            let request = mockReq(body);
            let response = mockRes();

            let datastoreCreateQueryStub = sandbox.stub(Datastore.prototype, "createQuery").callsFake((kind) => {
                return new Query();
            });
            let datastoreRunQueryStub = sandbox.stub(Datastore.prototype, "runQuery");
            datastoreRunQueryStub.returnsPromise().resolves();
            let queryOrderStub = sandbox.stub(Query.prototype, "order").callsFake(() => {
                return new Query();
            });
            let queryFilterStub = sandbox.stub(Query.prototype, "filter").callsFake(() => {
                return new Query();
            });
            let validateArtistStub = sandbox.stub(Card, "validateArtist").callsFake(() => {
                throw new Error("example error");
            });

            // act
            CardAPI.instance().getCards(request, response);

            // assert
            expect(datastoreCreateQueryStub.called).to.be.true;
            expect(validateArtistStub.called).to.be.true;
            expect(queryFilterStub.called).to.be.false;
            expect(queryOrderStub.called).to.be.false;
            expect(datastoreRunQueryStub.called).to.be.false;
            expect(response.status.called).to.be.true;
            expect(response.status.getCall(0).args[0]).to.be.equal(400);
            expect(response.json.called).to.be.true;

            // cleanup
            datastoreCreateQueryStub.restore();
            datastoreRunQueryStub.restore();
            queryOrderStub.restore();
            queryFilterStub.restore();
            validateArtistStub.restore();
        });

        it("should validate and filter based on frame", () => {
            // arrange
            let body = {
                body: {
                    frame: Frames.Future
                }
            };
            let request = mockReq(body);
            let response = mockRes();

            let datastoreCreateQueryStub = sandbox.stub(Datastore.prototype, "createQuery").callsFake((kind) => {
                return new Query();
            });
            let datastoreRunQueryStub = sandbox.stub(Datastore.prototype, "runQuery");
            datastoreRunQueryStub.returnsPromise().resolves();
            let queryOrderStub = sandbox.stub(Query.prototype, "order").callsFake(() => {
                return new Query();
            });
            let queryFilterStub = sandbox.stub(Query.prototype, "filter").callsFake(() => {
                return new Query();
            });
            let validateFrameStub = sandbox.stub(Card, "validateFrame");

            // act
            CardAPI.instance().getCards(request, response);

            // assert
            expect(datastoreCreateQueryStub.called).to.be.true;
            expect(validateFrameStub.called).to.be.true;
            expect(queryFilterStub.called).to.be.true;
            expect(queryFilterStub.getCall(0).args[0]).to.be.equal("frame");
            expect(queryFilterStub.getCall(0).args[1]).to.be.equal("=");
            expect(queryFilterStub.getCall(0).args[2]).to.be.equal(body.body.frame);
            expect(queryOrderStub.called).to.be.true;
            expect(queryOrderStub.getCall(0).args[0]).to.be.equal("frame");
            expect(datastoreRunQueryStub.called).to.be.true;
            expect(response.status.called).to.be.true;
            expect(response.status.getCall(0).args[0]).to.be.equal(200);
            expect(response.json.called).to.be.true;

            // cleanup
            datastoreCreateQueryStub.restore();
            datastoreRunQueryStub.restore();
            queryOrderStub.restore();
            queryFilterStub.restore();
            validateFrameStub.restore();
        });

        it("should invalidate and return error on invalid frame", () => {
            // arrange
            let body = {
                body: {
                    frame: Frames.Future
                }
            };
            let request = mockReq(body);
            let response = mockRes();

            let datastoreCreateQueryStub = sandbox.stub(Datastore.prototype, "createQuery").callsFake((kind) => {
                return new Query();
            });
            let datastoreRunQueryStub = sandbox.stub(Datastore.prototype, "runQuery");
            datastoreRunQueryStub.returnsPromise().resolves();
            let queryOrderStub = sandbox.stub(Query.prototype, "order").callsFake(() => {
                return new Query();
            });
            let queryFilterStub = sandbox.stub(Query.prototype, "filter").callsFake(() => {
                return new Query();
            });
            let validateFrameStub = sandbox.stub(Card, "validateFrame").callsFake(() => {
                throw new Error("example error");
            });

            // act
            CardAPI.instance().getCards(request, response);

            // assert
            expect(datastoreCreateQueryStub.called).to.be.true;
            expect(validateFrameStub.called).to.be.true;
            expect(queryFilterStub.called).to.be.false;
            expect(queryOrderStub.called).to.be.false;
            expect(datastoreRunQueryStub.called).to.be.false;
            expect(response.status.called).to.be.true;
            expect(response.status.getCall(0).args[0]).to.be.equal(400);
            expect(response.json.called).to.be.true;

            // cleanup
            datastoreCreateQueryStub.restore();
            datastoreRunQueryStub.restore();
            queryOrderStub.restore();
            queryFilterStub.restore();
            validateFrameStub.restore();
        });

        it("should validate and filter based on is_full_art", () => {
            // arrange
            let body = {
                body: {
                    is_full_art: false
                }
            };
            let request = mockReq(body);
            let response = mockRes();

            let datastoreCreateQueryStub = sandbox.stub(Datastore.prototype, "createQuery").callsFake((kind) => {
                return new Query();
            });
            let datastoreRunQueryStub = sandbox.stub(Datastore.prototype, "runQuery");
            datastoreRunQueryStub.returnsPromise().resolves();
            let queryOrderStub = sandbox.stub(Query.prototype, "order").callsFake(() => {
                return new Query();
            });
            let queryFilterStub = sandbox.stub(Query.prototype, "filter").callsFake(() => {
                return new Query();
            });
            let validateIsFullArtStub = sandbox.stub(Card, "validateIsFullArt");

            // act
            CardAPI.instance().getCards(request, response);

            // assert
            expect(datastoreCreateQueryStub.called).to.be.true;
            expect(validateIsFullArtStub.called).to.be.true;
            expect(queryFilterStub.called).to.be.true;
            expect(queryFilterStub.getCall(0).args[0]).to.be.equal("is_full_art");
            expect(queryFilterStub.getCall(0).args[1]).to.be.equal("=");
            expect(queryFilterStub.getCall(0).args[2]).to.be.equal(body.body.is_full_art);
            expect(queryOrderStub.called).to.be.true;
            expect(queryOrderStub.getCall(0).args[0]).to.be.equal("is_full_art");
            expect(datastoreRunQueryStub.called).to.be.true;
            expect(response.status.called).to.be.true;
            expect(response.status.getCall(0).args[0]).to.be.equal(200);
            expect(response.json.called).to.be.true;

            // cleanup
            datastoreCreateQueryStub.restore();
            datastoreRunQueryStub.restore();
            queryOrderStub.restore();
            queryFilterStub.restore();
            validateIsFullArtStub.restore();
        });

        it("should invalidate and return error on invalid is_full_art", () => {
            // arrange
            let body = {
                body: {
                    is_full_art: false
                }
            };
            let request = mockReq(body);
            let response = mockRes();

            let datastoreCreateQueryStub = sandbox.stub(Datastore.prototype, "createQuery").callsFake((kind) => {
                return new Query();
            });
            let datastoreRunQueryStub = sandbox.stub(Datastore.prototype, "runQuery");
            datastoreRunQueryStub.returnsPromise().resolves();
            let queryOrderStub = sandbox.stub(Query.prototype, "order").callsFake(() => {
                return new Query();
            });
            let queryFilterStub = sandbox.stub(Query.prototype, "filter").callsFake(() => {
                return new Query();
            });
            let validateIsFullArtStub = sandbox.stub(Card, "validateIsFullArt").callsFake(() => {
                throw new Error("example error");
            });

            // act
            CardAPI.instance().getCards(request, response);

            // assert
            expect(datastoreCreateQueryStub.called).to.be.true;
            expect(validateIsFullArtStub.called).to.be.true;
            expect(queryFilterStub.called).to.be.false;
            expect(queryOrderStub.called).to.be.false;
            expect(datastoreRunQueryStub.called).to.be.false;
            expect(response.status.called).to.be.true;
            expect(response.status.getCall(0).args[0]).to.be.equal(400);
            expect(response.json.called).to.be.true;

            // cleanup
            datastoreCreateQueryStub.restore();
            datastoreRunQueryStub.restore();
            queryOrderStub.restore();
            queryFilterStub.restore();
            validateIsFullArtStub.restore();
        });

        it("should validate and filter based on watermark", () => {
            // arrange
            let body = {
                body: {
                    watermark: Watermarks.Planeswalker
                }
            };
            let request = mockReq(body);
            let response = mockRes();

            let datastoreCreateQueryStub = sandbox.stub(Datastore.prototype, "createQuery").callsFake((kind) => {
                return new Query();
            });
            let datastoreRunQueryStub = sandbox.stub(Datastore.prototype, "runQuery");
            datastoreRunQueryStub.returnsPromise().resolves();
            let queryOrderStub = sandbox.stub(Query.prototype, "order").callsFake(() => {
                return new Query();
            });
            let queryFilterStub = sandbox.stub(Query.prototype, "filter").callsFake(() => {
                return new Query();
            });
            let validateWatermarkStub = sandbox.stub(Card, "validateWatermark");

            // act
            CardAPI.instance().getCards(request, response);

            // assert
            expect(datastoreCreateQueryStub.called).to.be.true;
            expect(validateWatermarkStub.called).to.be.true;
            expect(queryFilterStub.called).to.be.true;
            expect(queryFilterStub.getCall(0).args[0]).to.be.equal("watermark");
            expect(queryFilterStub.getCall(0).args[1]).to.be.equal("=");
            expect(queryFilterStub.getCall(0).args[2]).to.be.equal(body.body.watermark);
            expect(queryOrderStub.called).to.be.true;
            expect(queryOrderStub.getCall(0).args[0]).to.be.equal("watermark");
            expect(datastoreRunQueryStub.called).to.be.true;
            expect(response.status.called).to.be.true;
            expect(response.status.getCall(0).args[0]).to.be.equal(200);
            expect(response.json.called).to.be.true;

            // cleanup
            datastoreCreateQueryStub.restore();
            datastoreRunQueryStub.restore();
            queryOrderStub.restore();
            queryFilterStub.restore();
            validateWatermarkStub.restore();
        });

        it("should invalidate and return error on invalid watermark", () => {
            // arrange
            let body = {
                body: {
                    watermark: Watermarks.Planeswalker
                }
            };
            let request = mockReq(body);
            let response = mockRes();

            let datastoreCreateQueryStub = sandbox.stub(Datastore.prototype, "createQuery").callsFake((kind) => {
                return new Query();
            });
            let datastoreRunQueryStub = sandbox.stub(Datastore.prototype, "runQuery");
            datastoreRunQueryStub.returnsPromise().resolves();
            let queryOrderStub = sandbox.stub(Query.prototype, "order").callsFake(() => {
                return new Query();
            });
            let queryFilterStub = sandbox.stub(Query.prototype, "filter").callsFake(() => {
                return new Query();
            });
            let validateWatermarkStub = sandbox.stub(Card, "validateWatermark").callsFake(() => {
                throw new Error("example error");
            });

            // act
            CardAPI.instance().getCards(request, response);

            // assert
            expect(datastoreCreateQueryStub.called).to.be.true;
            expect(validateWatermarkStub.called).to.be.true;
            expect(queryFilterStub.called).to.be.false;
            expect(queryOrderStub.called).to.be.false;
            expect(datastoreRunQueryStub.called).to.be.false;
            expect(response.status.called).to.be.true;
            expect(response.status.getCall(0).args[0]).to.be.equal(400);
            expect(response.json.called).to.be.true;

            // cleanup
            datastoreCreateQueryStub.restore();
            datastoreRunQueryStub.restore();
            queryOrderStub.restore();
            queryFilterStub.restore();
            validateWatermarkStub.restore();
        });

        it("should validate and filter based on border_color", () => {
            // arrange
            let body = {
                body: {
                    border_color: BorderColors.Black
                }
            };
            let request = mockReq(body);
            let response = mockRes();

            let datastoreCreateQueryStub = sandbox.stub(Datastore.prototype, "createQuery").callsFake((kind) => {
                return new Query();
            });
            let datastoreRunQueryStub = sandbox.stub(Datastore.prototype, "runQuery");
            datastoreRunQueryStub.returnsPromise().resolves();
            let queryOrderStub = sandbox.stub(Query.prototype, "order").callsFake(() => {
                return new Query();
            });
            let queryFilterStub = sandbox.stub(Query.prototype, "filter").callsFake(() => {
                return new Query();
            });
            let validateBorderColorStub = sandbox.stub(Card, "validateBorderColor");

            // act
            CardAPI.instance().getCards(request, response);

            // assert
            expect(datastoreCreateQueryStub.called).to.be.true;
            expect(validateBorderColorStub.called).to.be.true;
            expect(queryFilterStub.called).to.be.true;
            expect(queryFilterStub.getCall(0).args[0]).to.be.equal("border_color");
            expect(queryFilterStub.getCall(0).args[1]).to.be.equal("=");
            expect(queryFilterStub.getCall(0).args[2]).to.be.equal(body.body.border_color);
            expect(queryOrderStub.called).to.be.true;
            expect(queryOrderStub.getCall(0).args[0]).to.be.equal("border_color");
            expect(datastoreRunQueryStub.called).to.be.true;
            expect(response.status.called).to.be.true;
            expect(response.status.getCall(0).args[0]).to.be.equal(200);
            expect(response.json.called).to.be.true;

            // cleanup
            datastoreCreateQueryStub.restore();
            datastoreRunQueryStub.restore();
            queryOrderStub.restore();
            queryFilterStub.restore();
            validateBorderColorStub.restore();
        });

        it("should invalidate and return error on invalid border_color", () => {
            // arrange
            let body = {
                body: {
                    border_color: BorderColors.Black
                }
            };
            let request = mockReq(body);
            let response = mockRes();

            let datastoreCreateQueryStub = sandbox.stub(Datastore.prototype, "createQuery").callsFake((kind) => {
                return new Query();
            });
            let datastoreRunQueryStub = sandbox.stub(Datastore.prototype, "runQuery");
            datastoreRunQueryStub.returnsPromise().resolves();
            let queryOrderStub = sandbox.stub(Query.prototype, "order").callsFake(() => {
                return new Query();
            });
            let queryFilterStub = sandbox.stub(Query.prototype, "filter").callsFake(() => {
                return new Query();
            });
            let validateBorderColorStub = sandbox.stub(Card, "validateBorderColor").callsFake(() => {
                throw new Error("example error");
            });

            // act
            CardAPI.instance().getCards(request, response);

            // assert
            expect(datastoreCreateQueryStub.called).to.be.true;
            expect(validateBorderColorStub.called).to.be.true;
            expect(queryFilterStub.called).to.be.false;
            expect(queryOrderStub.called).to.be.false;
            expect(datastoreRunQueryStub.called).to.be.false;
            expect(response.status.called).to.be.true;
            expect(response.status.getCall(0).args[0]).to.be.equal(400);
            expect(response.json.called).to.be.true;

            // cleanup
            datastoreCreateQueryStub.restore();
            datastoreRunQueryStub.restore();
            queryOrderStub.restore();
            queryFilterStub.restore();
            validateBorderColorStub.restore();
        });

        it("should validate and filter based on is_timeshifted", () => {
            // arrange
            let body = {
                body: {
                    is_timeshifted: false
                }
            };
            let request = mockReq(body);
            let response = mockRes();

            let datastoreCreateQueryStub = sandbox.stub(Datastore.prototype, "createQuery").callsFake((kind) => {
                return new Query();
            });
            let datastoreRunQueryStub = sandbox.stub(Datastore.prototype, "runQuery");
            datastoreRunQueryStub.returnsPromise().resolves();
            let queryOrderStub = sandbox.stub(Query.prototype, "order").callsFake(() => {
                return new Query();
            });
            let queryFilterStub = sandbox.stub(Query.prototype, "filter").callsFake(() => {
                return new Query();
            });
            let validateIsTimeshiftedStub = sandbox.stub(Card, "validateIsTimeshifted");

            // act
            CardAPI.instance().getCards(request, response);

            // assert
            expect(datastoreCreateQueryStub.called).to.be.true;
            expect(validateIsTimeshiftedStub.called).to.be.true;
            expect(queryFilterStub.called).to.be.true;
            expect(queryFilterStub.getCall(0).args[0]).to.be.equal("is_timeshifted");
            expect(queryFilterStub.getCall(0).args[1]).to.be.equal("=");
            expect(queryFilterStub.getCall(0).args[2]).to.be.equal(body.body.is_timeshifted);
            expect(queryOrderStub.called).to.be.true;
            expect(queryOrderStub.getCall(0).args[0]).to.be.equal("is_timeshifted");
            expect(datastoreRunQueryStub.called).to.be.true;
            expect(response.status.called).to.be.true;
            expect(response.status.getCall(0).args[0]).to.be.equal(200);
            expect(response.json.called).to.be.true;

            // cleanup
            datastoreCreateQueryStub.restore();
            datastoreRunQueryStub.restore();
            queryOrderStub.restore();
            queryFilterStub.restore();
            validateIsTimeshiftedStub.restore();
        });

        it("should invalidate and return error on invalid is_timeshifted", () => {
            // arrange
            let body = {
                body: {
                    is_timeshifted: false
                }
            };
            let request = mockReq(body);
            let response = mockRes();

            let datastoreCreateQueryStub = sandbox.stub(Datastore.prototype, "createQuery").callsFake((kind) => {
                return new Query();
            });
            let datastoreRunQueryStub = sandbox.stub(Datastore.prototype, "runQuery");
            datastoreRunQueryStub.returnsPromise().resolves();
            let queryOrderStub = sandbox.stub(Query.prototype, "order").callsFake(() => {
                return new Query();
            });
            let queryFilterStub = sandbox.stub(Query.prototype, "filter").callsFake(() => {
                return new Query();
            });
            let validateIsTimeshiftedStub = sandbox.stub(Card, "validateIsTimeshifted").callsFake(() => {
                throw new Error("example error");
            });

            // act
            CardAPI.instance().getCards(request, response);

            // assert
            expect(datastoreCreateQueryStub.called).to.be.true;
            expect(validateIsTimeshiftedStub.called).to.be.true;
            expect(queryFilterStub.called).to.be.false;
            expect(queryOrderStub.called).to.be.false;
            expect(datastoreRunQueryStub.called).to.be.false;
            expect(response.status.called).to.be.true;
            expect(response.status.getCall(0).args[0]).to.be.equal(400);
            expect(response.json.called).to.be.true;

            // cleanup
            datastoreCreateQueryStub.restore();
            datastoreRunQueryStub.restore();
            queryOrderStub.restore();
            queryFilterStub.restore();
            validateIsTimeshiftedStub.restore();
        });

        it("should validate and filter based on is_colorshifted", () => {
            // arrange
            let body = {
                body: {
                    is_colorshifted: false
                }
            };
            let request = mockReq(body);
            let response = mockRes();

            let datastoreCreateQueryStub = sandbox.stub(Datastore.prototype, "createQuery").callsFake((kind) => {
                return new Query();
            });
            let datastoreRunQueryStub = sandbox.stub(Datastore.prototype, "runQuery");
            datastoreRunQueryStub.returnsPromise().resolves();
            let queryOrderStub = sandbox.stub(Query.prototype, "order").callsFake(() => {
                return new Query();
            });
            let queryFilterStub = sandbox.stub(Query.prototype, "filter").callsFake(() => {
                return new Query();
            });
            let validateIsColorshiftedStub = sandbox.stub(Card, "validateIsColorshifted");

            // act
            CardAPI.instance().getCards(request, response);

            // assert
            expect(datastoreCreateQueryStub.called).to.be.true;
            expect(validateIsColorshiftedStub.called).to.be.true;
            expect(queryFilterStub.called).to.be.true;
            expect(queryFilterStub.getCall(0).args[0]).to.be.equal("is_colorshifted");
            expect(queryFilterStub.getCall(0).args[1]).to.be.equal("=");
            expect(queryFilterStub.getCall(0).args[2]).to.be.equal(body.body.is_colorshifted);
            expect(queryOrderStub.called).to.be.true;
            expect(queryOrderStub.getCall(0).args[0]).to.be.equal("is_colorshifted");
            expect(datastoreRunQueryStub.called).to.be.true;
            expect(response.status.called).to.be.true;
            expect(response.status.getCall(0).args[0]).to.be.equal(200);
            expect(response.json.called).to.be.true;

            // cleanup
            datastoreCreateQueryStub.restore();
            datastoreRunQueryStub.restore();
            queryOrderStub.restore();
            queryFilterStub.restore();
            validateIsColorshiftedStub.restore();
        });

        it("should invalidate and return error on invalid is_colorshifted", () => {
            // arrange
            let body = {
                body: {
                    is_colorshifted: false
                }
            };
            let request = mockReq(body);
            let response = mockRes();

            let datastoreCreateQueryStub = sandbox.stub(Datastore.prototype, "createQuery").callsFake((kind) => {
                return new Query();
            });
            let datastoreRunQueryStub = sandbox.stub(Datastore.prototype, "runQuery");
            datastoreRunQueryStub.returnsPromise().resolves();
            let queryOrderStub = sandbox.stub(Query.prototype, "order").callsFake(() => {
                return new Query();
            });
            let queryFilterStub = sandbox.stub(Query.prototype, "filter").callsFake(() => {
                return new Query();
            });
            let validateIsColorshiftedStub = sandbox.stub(Card, "validateIsColorshifted").callsFake(() => {
                throw new Error("example error");
            });

            // act
            CardAPI.instance().getCards(request, response);

            // assert
            expect(datastoreCreateQueryStub.called).to.be.true;
            expect(validateIsColorshiftedStub.called).to.be.true;
            expect(queryFilterStub.called).to.be.false;
            expect(queryOrderStub.called).to.be.false;
            expect(datastoreRunQueryStub.called).to.be.false;
            expect(response.status.called).to.be.true;
            expect(response.status.getCall(0).args[0]).to.be.equal(400);
            expect(response.json.called).to.be.true;

            // cleanup
            datastoreCreateQueryStub.restore();
            datastoreRunQueryStub.restore();
            queryOrderStub.restore();
            queryFilterStub.restore();
            validateIsColorshiftedStub.restore();
        });

        it("should validate and filter based on is_futureshifted", () => {
            // arrange
            let body = {
                body: {
                    is_futureshifted: false
                }
            };
            let request = mockReq(body);
            let response = mockRes();

            let datastoreCreateQueryStub = sandbox.stub(Datastore.prototype, "createQuery").callsFake((kind) => {
                return new Query();
            });
            let datastoreRunQueryStub = sandbox.stub(Datastore.prototype, "runQuery");
            datastoreRunQueryStub.returnsPromise().resolves();
            let queryOrderStub = sandbox.stub(Query.prototype, "order").callsFake(() => {
                return new Query();
            });
            let queryFilterStub = sandbox.stub(Query.prototype, "filter").callsFake(() => {
                return new Query();
            });
            let validateIsFutureshiftedStub = sandbox.stub(Card, "validateIsFutureshifted");

            // act
            CardAPI.instance().getCards(request, response);

            // assert
            expect(datastoreCreateQueryStub.called).to.be.true;
            expect(validateIsFutureshiftedStub.called).to.be.true;
            expect(queryFilterStub.called).to.be.true;
            expect(queryFilterStub.getCall(0).args[0]).to.be.equal("is_futureshifted");
            expect(queryFilterStub.getCall(0).args[1]).to.be.equal("=");
            expect(queryFilterStub.getCall(0).args[2]).to.be.equal(body.body.is_futureshifted);
            expect(queryOrderStub.called).to.be.true;
            expect(queryOrderStub.getCall(0).args[0]).to.be.equal("is_futureshifted");
            expect(datastoreRunQueryStub.called).to.be.true;
            expect(response.status.called).to.be.true;
            expect(response.status.getCall(0).args[0]).to.be.equal(200);
            expect(response.json.called).to.be.true;

            // cleanup
            datastoreCreateQueryStub.restore();
            datastoreRunQueryStub.restore();
            queryOrderStub.restore();
            queryFilterStub.restore();
            validateIsFutureshiftedStub.restore();
        });

        it("should invalidate and return error on invalid is_futureshifted", () => {
            // arrange
            let body = {
                body: {
                    is_futureshifted: false
                }
            };
            let request = mockReq(body);
            let response = mockRes();

            let datastoreCreateQueryStub = sandbox.stub(Datastore.prototype, "createQuery").callsFake((kind) => {
                return new Query();
            });
            let datastoreRunQueryStub = sandbox.stub(Datastore.prototype, "runQuery");
            datastoreRunQueryStub.returnsPromise().resolves();
            let queryOrderStub = sandbox.stub(Query.prototype, "order").callsFake(() => {
                return new Query();
            });
            let queryFilterStub = sandbox.stub(Query.prototype, "filter").callsFake(() => {
                return new Query();
            });
            let validateIsFutureshiftedStub = sandbox.stub(Card, "validateIsFutureshifted").callsFake(() => {
                throw new Error("example error");
            });

            // act
            CardAPI.instance().getCards(request, response);

            // assert
            expect(datastoreCreateQueryStub.called).to.be.true;
            expect(validateIsFutureshiftedStub.called).to.be.true;
            expect(queryFilterStub.called).to.be.false;
            expect(queryOrderStub.called).to.be.false;
            expect(datastoreRunQueryStub.called).to.be.false;
            expect(response.status.called).to.be.true;
            expect(response.status.getCall(0).args[0]).to.be.equal(400);
            expect(response.json.called).to.be.true;

            // cleanup
            datastoreCreateQueryStub.restore();
            datastoreRunQueryStub.restore();
            queryOrderStub.restore();
            queryFilterStub.restore();
            validateIsFutureshiftedStub.restore();
        });

        it("should allow filtering on multiple keys", () => {
            // arrange
            let body = {
                body: {
                    rarity: "common",
                    set_code: "ust"
                }
            };
            let request = mockReq(body);
            let response = mockRes();

            let datastoreCreateQueryStub = sandbox.stub(Datastore.prototype, "createQuery").callsFake((kind) => {
                return new Query();
            });
            let datastoreRunQueryStub = sandbox.stub(Datastore.prototype, "runQuery");
            datastoreRunQueryStub.returnsPromise().resolves();
            let queryOrderStub = sandbox.stub(Query.prototype, "order").callsFake(() => {
                return new Query();
            });
            let queryFilterStub = sandbox.stub(Query.prototype, "filter").callsFake(() => {
                return new Query();
            });
            let validateSetCodeStub = sandbox.stub(Card, "validateSetCode");
            let validateRarityStub = sandbox.stub(Card, "validateRarity");

            // act
            CardAPI.instance().getCards(request, response);

            // assert
            expect(datastoreCreateQueryStub.called).to.be.true;
            expect(validateSetCodeStub.called).to.be.true;
            expect(validateRarityStub.called).to.be.true;
            expect(queryFilterStub.called).to.be.true;
            expect(queryFilterStub.getCall(0).args[0]).to.be.equal("set_code");
            expect(queryFilterStub.getCall(0).args[1]).to.be.equal("=");
            expect(queryFilterStub.getCall(0).args[2]).to.be.equal(body.body.set_code);
            expect(queryFilterStub.getCall(1).args[0]).to.be.equal("rarity");
            expect(queryFilterStub.getCall(1).args[1]).to.be.equal("=");
            expect(queryFilterStub.getCall(1).args[2]).to.be.equal(body.body.rarity);
            expect(queryOrderStub.called).to.be.true;
            expect(queryOrderStub.getCall(0).args[0]).to.be.equal("set_code");
            expect(queryOrderStub.getCall(1).args[0]).to.be.equal("rarity");
            expect(datastoreRunQueryStub.called).to.be.true;
            expect(response.status.called).to.be.true;
            expect(response.status.getCall(0).args[0]).to.be.equal(200);
            expect(response.json.called).to.be.true;

            // cleanup
            datastoreCreateQueryStub.restore();
            datastoreRunQueryStub.restore();
            queryOrderStub.restore();
            queryFilterStub.restore();
            validateSetCodeStub.restore();
            validateRarityStub.restore();
        });

        it("should fail gracefully on save error", () => {
            // arrange
            let body = {
                body: {}
            };
            let request = mockReq(body);
            let response = mockRes();

            let datastoreCreateQueryStub = sandbox.stub(Datastore.prototype, "createQuery").callsFake((kind) => {
                return new Query();
            });
            let datastoreRunQueryStub = sandbox.stub(Datastore.prototype, "runQuery");
            datastoreRunQueryStub.returnsPromise().rejects();
            let queryOrderStub = sandbox.stub(Query.prototype, "order").callsFake(() => {
                return new Query();
            });
            let queryFilterStub = sandbox.stub(Query.prototype, "filter").callsFake(() => {
                return new Query();
            });

            // act
            CardAPI.instance().getCards(request, response);

            // assert
            expect(datastoreCreateQueryStub.called).to.be.true;
            expect(datastoreRunQueryStub.called).to.be.true;
            expect(response.status.called).to.be.true;
            expect(response.status.getCall(0).args[0]).to.be.equal(500);
            expect(response.json.called).to.be.true;

            // cleanup
            datastoreCreateQueryStub.restore();
            datastoreRunQueryStub.restore();
            queryOrderStub.restore();
            queryFilterStub.restore();
        });
    });
});
