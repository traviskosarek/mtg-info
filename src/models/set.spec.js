"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("mocha");
var chai_1 = require("chai");
var sinon = require("sinon");
var set_1 = require("./set");
var sandbox;
beforeEach(function () {
    sandbox = sinon.sandbox.create();
});
afterEach(function () {
    sandbox.restore();
});
describe("Set", function () {
    describe("validateJSON", function () {
        it("should validate set_code", function () {
            var set = {
                set_code: "ust",
                set_name: "Unstable",
                release_date: "2017-12-08",
                set_type: "funny",
                card_count: 268,
                parent_set_code: undefined,
                block_code: undefined,
                block_name: undefined,
                icon_uri: "https://assets.scryfall.com/assets/sets/ust.svg",
                is_digital: false,
                is_foil: false
            };
            var validateSetCodeStub = sandbox.stub(set_1.Set, "validateSetCode");
            set_1.Set.validateJSON(set);
            chai_1.expect(validateSetCodeStub.called).to.be.true;
            validateSetCodeStub.restore();
        });
        it("should validate set_name", function () {
            var set = {
                set_code: "ust",
                set_name: "Unstable",
                release_date: "2017-12-08",
                set_type: "funny",
                card_count: 268,
                parent_set_code: undefined,
                block_code: undefined,
                block_name: undefined,
                icon_uri: "https://assets.scryfall.com/assets/sets/ust.svg",
                is_digital: false,
                is_foil: false
            };
            var validateSetNameStub = sandbox.stub(set_1.Set, "validateSetName");
            set_1.Set.validateJSON(set);
            chai_1.expect(validateSetNameStub.called).to.be.true;
            validateSetNameStub.restore();
        });
        it("should validate release_date", function () {
            var set = {
                set_code: "ust",
                set_name: "Unstable",
                release_date: "2017-12-08",
                set_type: "funny",
                card_count: 268,
                parent_set_code: undefined,
                block_code: undefined,
                block_name: undefined,
                icon_uri: "https://assets.scryfall.com/assets/sets/ust.svg",
                is_digital: false,
                is_foil: false
            };
            var validateReleaseDateStub = sandbox.stub(set_1.Set, "validateReleaseDate");
            set_1.Set.validateJSON(set);
            chai_1.expect(validateReleaseDateStub.called).to.be.true;
            validateReleaseDateStub.restore();
        });
        it("should validate set_type", function () {
            var set = {
                set_code: "ust",
                set_name: "Unstable",
                release_date: "2017-12-08",
                set_type: "funny",
                card_count: 268,
                parent_set_code: undefined,
                block_code: undefined,
                block_name: undefined,
                icon_uri: "https://assets.scryfall.com/assets/sets/ust.svg",
                is_digital: false,
                is_foil: false
            };
            var validateSetTypeStub = sandbox.stub(set_1.Set, "validateSetType");
            set_1.Set.validateJSON(set);
            chai_1.expect(validateSetTypeStub.called).to.be.true;
            validateSetTypeStub.restore();
        });
        it("should validate card_count", function () {
            var set = {
                set_code: "ust",
                set_name: "Unstable",
                release_date: "2017-12-08",
                set_type: "funny",
                card_count: 268,
                parent_set_code: undefined,
                block_code: undefined,
                block_name: undefined,
                icon_uri: "https://assets.scryfall.com/assets/sets/ust.svg",
                is_digital: false,
                is_foil: false
            };
            var validateCardCountStub = sandbox.stub(set_1.Set, "validateCardCount");
            set_1.Set.validateJSON(set);
            chai_1.expect(validateCardCountStub.called).to.be.true;
            validateCardCountStub.restore();
        });
        it("should validate parent_set_code", function () {
            var set = {
                set_code: "ust",
                set_name: "Unstable",
                release_date: "2017-12-08",
                set_type: "funny",
                card_count: 268,
                parent_set_code: undefined,
                block_code: undefined,
                block_name: undefined,
                icon_uri: "https://assets.scryfall.com/assets/sets/ust.svg",
                is_digital: false,
                is_foil: false
            };
            var validateParentSetCodeStub = sandbox.stub(set_1.Set, "validateParentSetCode");
            set_1.Set.validateJSON(set);
            chai_1.expect(validateParentSetCodeStub.called).to.be.true;
            validateParentSetCodeStub.restore();
        });
        it("should validate block_code", function () {
            var set = {
                set_code: "ust",
                set_name: "Unstable",
                release_date: "2017-12-08",
                set_type: "funny",
                card_count: 268,
                parent_set_code: undefined,
                block_code: undefined,
                block_name: undefined,
                icon_uri: "https://assets.scryfall.com/assets/sets/ust.svg",
                is_digital: false,
                is_foil: false
            };
            var validateBlockCodeStub = sandbox.stub(set_1.Set, "validateBlockCode");
            set_1.Set.validateJSON(set);
            chai_1.expect(validateBlockCodeStub.called).to.be.true;
            validateBlockCodeStub.restore();
        });
        it("should validate block_name", function () {
            var set = {
                set_code: "ust",
                set_name: "Unstable",
                release_date: "2017-12-08",
                set_type: "funny",
                card_count: 268,
                parent_set_code: undefined,
                block_code: undefined,
                block_name: undefined,
                icon_uri: "https://assets.scryfall.com/assets/sets/ust.svg",
                is_digital: false,
                is_foil: false
            };
            var validateBlockNameStub = sandbox.stub(set_1.Set, "validateBlockName");
            set_1.Set.validateJSON(set);
            chai_1.expect(validateBlockNameStub.called).to.be.true;
            validateBlockNameStub.restore();
        });
        it("should validate icon_uri", function () {
            var set = {
                set_code: "ust",
                set_name: "Unstable",
                release_date: "2017-12-08",
                set_type: "funny",
                card_count: 268,
                parent_set_code: undefined,
                block_code: undefined,
                block_name: undefined,
                icon_uri: "https://assets.scryfall.com/assets/sets/ust.svg",
                is_digital: false,
                is_foil: false
            };
            var validateIconUriStub = sandbox.stub(set_1.Set, "validateIconUri");
            set_1.Set.validateJSON(set);
            chai_1.expect(validateIconUriStub.called).to.be.true;
            validateIconUriStub.restore();
        });
        it("should throw errors", function () {
            var set = {
                set_code: "ust",
                set_name: "Unstable",
                release_date: "2017-12-08",
                set_type: "funny",
                card_count: 268,
                parent_set_code: undefined,
                block_code: undefined,
                block_name: undefined,
                icon_uri: "https://assets.scryfall.com/assets/sets/ust.svg",
                is_digital: false,
                is_foil: false
            };
            var errorThrown = false;
            var validateSetCodeStub = sandbox.stub(set_1.Set, "validateSetCode").callsFake(function (code) {
                throw new Error("This is an error");
            });
            try {
                set_1.Set.validateJSON(set);
            }
            catch (e) {
                errorThrown = true;
            }
            chai_1.expect(errorThrown).to.be.true;
            validateSetCodeStub.restore();
        });
    });
    describe("set_code", function () {
        it("should invalidate an undefined set_code", function () {
            var setCode;
            var errorOccurred = false;
            try {
                set_1.Set.validateSetCode(setCode);
            }
            catch (e) {
                errorOccurred = true;
            }
            chai_1.expect(errorOccurred).to.be.true;
        });
        it("should invalidate an empty set_code", function () {
            var setCode = "";
            var errorOccurred = false;
            try {
                set_1.Set.validateSetCode(setCode);
            }
            catch (e) {
                errorOccurred = true;
            }
            chai_1.expect(errorOccurred).to.be.true;
        });
        it("should invalidate a non-alphanumeric set_code", function () {
            var setCode = "test!";
            var errorOccurred = false;
            try {
                set_1.Set.validateSetCode(setCode);
            }
            catch (e) {
                errorOccurred = true;
            }
            chai_1.expect(errorOccurred).to.be.true;
        });
        it("should validate an alphanumeric set_code", function () {
            var setCode = "xx12";
            var errorOccurred = false;
            try {
                set_1.Set.validateSetCode(setCode);
            }
            catch (e) {
                errorOccurred = true;
            }
            chai_1.expect(errorOccurred).to.be.false;
        });
    });
    describe("set_name", function () {
        it("should invalidate an undefined set_name", function () {
            var setName;
            var errorOccurred = false;
            try {
                set_1.Set.validateSetName(setName);
            }
            catch (e) {
                errorOccurred = true;
            }
            chai_1.expect(errorOccurred).to.be.true;
        });
        it("should invalidate an empty set_name", function () {
            var setName = "";
            var errorOccurred = false;
            try {
                set_1.Set.validateSetName(setName);
            }
            catch (e) {
                errorOccurred = true;
            }
            chai_1.expect(errorOccurred).to.be.true;
        });
        it("should validate a set_name as string value", function () {
            var setName = "Magic: The Gathering test's";
            var errorOccurred = false;
            try {
                set_1.Set.validateSetName(setName);
            }
            catch (e) {
                errorOccurred = true;
            }
            chai_1.expect(errorOccurred).to.be.false;
        });
    });
    describe("release_date", function () {
        it("should invalidate an empty release_date", function () {
            var releaseDate = "";
            var errorOccurred = false;
            try {
                set_1.Set.validateReleaseDate(releaseDate);
            }
            catch (e) {
                errorOccurred = true;
            }
            chai_1.expect(errorOccurred).to.be.true;
        });
        it("should invalidate a character text release_date", function () {
            var releaseDate = "test";
            var errorOccurred = false;
            try {
                set_1.Set.validateReleaseDate(releaseDate);
            }
            catch (e) {
                errorOccurred = true;
            }
            chai_1.expect(errorOccurred).to.be.true;
        });
        it("should invalidate a release_date of format MM-DD-YYYY", function () {
            var releaseDate = "02-22-2222";
            var errorOccurred = false;
            try {
                set_1.Set.validateReleaseDate(releaseDate);
            }
            catch (e) {
                errorOccurred = true;
            }
            chai_1.expect(errorOccurred).to.be.true;
        });
        it("should invalidate a release_date of format MM/DD/YYYY", function () {
            var releaseDate = "02/22/2222";
            var errorOccurred = false;
            try {
                set_1.Set.validateReleaseDate(releaseDate);
            }
            catch (e) {
                errorOccurred = true;
            }
            chai_1.expect(errorOccurred).to.be.true;
        });
        it("should invalidate a release_date of format DD-MM-YYYY", function () {
            var releaseDate = "22-02-2222";
            var errorOccurred = false;
            try {
                set_1.Set.validateReleaseDate(releaseDate);
            }
            catch (e) {
                errorOccurred = true;
            }
            chai_1.expect(errorOccurred).to.be.true;
        });
        it("should invalidate a release_date of format DD/MM/YYYY", function () {
            var releaseDate = "22/02/2222";
            var errorOccurred = false;
            try {
                set_1.Set.validateReleaseDate(releaseDate);
            }
            catch (e) {
                errorOccurred = true;
            }
            chai_1.expect(errorOccurred).to.be.true;
        });
        it("should invalidate a release_date of format YYYY/MM/DD", function () {
            var releaseDate = "2222/02/22";
            var errorOccurred = false;
            try {
                set_1.Set.validateReleaseDate(releaseDate);
            }
            catch (e) {
                errorOccurred = true;
            }
            chai_1.expect(errorOccurred).to.be.true;
        });
        it("should invalidate a release_date of format YYYY/DD/MM", function () {
            var releaseDate = "2222/22/02";
            var errorOccurred = false;
            try {
                set_1.Set.validateReleaseDate(releaseDate);
            }
            catch (e) {
                errorOccurred = true;
            }
            chai_1.expect(errorOccurred).to.be.true;
        });
        it("should validate a release_date as format YYYY-MM-DD", function () {
            var releaseDate = "2222-02-22";
            var errorOccurred = false;
            try {
                set_1.Set.validateReleaseDate(releaseDate);
            }
            catch (e) {
                errorOccurred = true;
            }
            chai_1.expect(errorOccurred).to.be.false;
        });
    });
    describe("set_type", function () {
        it("should invalidate an empty set_type", function () {
            var setType = "";
            var errorOccurred = false;
            try {
                set_1.Set.validateSetType(setType);
            }
            catch (e) {
                errorOccurred = true;
            }
            chai_1.expect(errorOccurred).to.be.true;
        });
        it("should invalidate a non-predefined value of 'magic_set_type'", function () {
            var setType = "magic_set_type";
            var errorOccurred = false;
            try {
                set_1.Set.validateSetType(setType);
            }
            catch (e) {
                errorOccurred = true;
            }
            chai_1.expect(errorOccurred).to.be.true;
        });
        it("should validate set_type as 'archenemy'", function () {
            var setType = "archenemy";
            var errorOccurred = false;
            try {
                set_1.Set.validateSetType(setType);
            }
            catch (e) {
                errorOccurred = true;
            }
            chai_1.expect(errorOccurred).to.be.false;
        });
        it("should validate set_type as 'box'", function () {
            var setType = "box";
            var errorOccurred = false;
            try {
                set_1.Set.validateSetType(setType);
            }
            catch (e) {
                errorOccurred = true;
            }
            chai_1.expect(errorOccurred).to.be.false;
        });
        it("should validate set_type as 'commander'", function () {
            var setType = "commander";
            var errorOccurred = false;
            try {
                set_1.Set.validateSetType(setType);
            }
            catch (e) {
                errorOccurred = true;
            }
            chai_1.expect(errorOccurred).to.be.false;
        });
        it("should validate set_type as 'conspiracy'", function () {
            var setType = "conspiracy";
            var errorOccurred = false;
            try {
                set_1.Set.validateSetType(setType);
            }
            catch (e) {
                errorOccurred = true;
            }
            chai_1.expect(errorOccurred).to.be.false;
        });
        it("should validate set_type as 'core'", function () {
            var setType = "core";
            var errorOccurred = false;
            try {
                set_1.Set.validateSetType(setType);
            }
            catch (e) {
                errorOccurred = true;
            }
            chai_1.expect(errorOccurred).to.be.false;
        });
        it("should validate set_type as 'duel_deck'", function () {
            var setType = "duel_deck";
            var errorOccurred = false;
            try {
                set_1.Set.validateSetType(setType);
            }
            catch (e) {
                errorOccurred = true;
            }
            chai_1.expect(errorOccurred).to.be.false;
        });
        it("should validate set_type as 'expansion'", function () {
            var setType = "expansion";
            var errorOccurred = false;
            try {
                set_1.Set.validateSetType(setType);
            }
            catch (e) {
                errorOccurred = true;
            }
            chai_1.expect(errorOccurred).to.be.false;
        });
        it("should validate set_type as 'from_the_vault'", function () {
            var setType = "from_the_vault";
            var errorOccurred = false;
            try {
                set_1.Set.validateSetType(setType);
            }
            catch (e) {
                errorOccurred = true;
            }
            chai_1.expect(errorOccurred).to.be.false;
        });
        it("should validate set_type as 'funny'", function () {
            var setType = "funny";
            var errorOccurred = false;
            try {
                set_1.Set.validateSetType(setType);
            }
            catch (e) {
                errorOccurred = true;
            }
            chai_1.expect(errorOccurred).to.be.false;
        });
        it("should validate set_type as 'masterpiece'", function () {
            var setType = "masterpiece";
            var errorOccurred = false;
            try {
                set_1.Set.validateSetType(setType);
            }
            catch (e) {
                errorOccurred = true;
            }
            chai_1.expect(errorOccurred).to.be.false;
        });
        it("should validate set_type as 'masters'", function () {
            var setType = "masters";
            var errorOccurred = false;
            try {
                set_1.Set.validateSetType(setType);
            }
            catch (e) {
                errorOccurred = true;
            }
            chai_1.expect(errorOccurred).to.be.false;
        });
        it("should validate set_type as 'memorabilia'", function () {
            var setType = "memorabilia";
            var errorOccurred = false;
            try {
                set_1.Set.validateSetType(setType);
            }
            catch (e) {
                errorOccurred = true;
            }
            chai_1.expect(errorOccurred).to.be.false;
        });
        it("should validate set_type as 'planechase'", function () {
            var setType = "planechase";
            var errorOccurred = false;
            try {
                set_1.Set.validateSetType(setType);
            }
            catch (e) {
                errorOccurred = true;
            }
            chai_1.expect(errorOccurred).to.be.false;
        });
        it("should validate set_type as 'premium_deck'", function () {
            var setType = "premium_deck";
            var errorOccurred = false;
            try {
                set_1.Set.validateSetType(setType);
            }
            catch (e) {
                errorOccurred = true;
            }
            chai_1.expect(errorOccurred).to.be.false;
        });
        it("should validate set_type as 'promo'", function () {
            var setType = "promo";
            var errorOccurred = false;
            try {
                set_1.Set.validateSetType(setType);
            }
            catch (e) {
                errorOccurred = true;
            }
            chai_1.expect(errorOccurred).to.be.false;
        });
        it("should validate set_type as 'starter'", function () {
            var setType = "starter";
            var errorOccurred = false;
            try {
                set_1.Set.validateSetType(setType);
            }
            catch (e) {
                errorOccurred = true;
            }
            chai_1.expect(errorOccurred).to.be.false;
        });
        it("should validate set_type as 'token'", function () {
            var setType = "token";
            var errorOccurred = false;
            try {
                set_1.Set.validateSetType(setType);
            }
            catch (e) {
                errorOccurred = true;
            }
            chai_1.expect(errorOccurred).to.be.false;
        });
        it("should validate set_type as 'vanguard'", function () {
            var setType = "vanguard";
            var errorOccurred = false;
            try {
                set_1.Set.validateSetType(setType);
            }
            catch (e) {
                errorOccurred = true;
            }
            chai_1.expect(errorOccurred).to.be.false;
        });
    });
    describe("card_count", function () {
        it("should invalidate an undefined card_count", function () {
            var cardCount;
            var errorOccurred = false;
            try {
                set_1.Set.validateCardCount(cardCount);
            }
            catch (e) {
                errorOccurred = true;
            }
            chai_1.expect(errorOccurred).to.be.true;
        });
        it("should invalidate a negative card count", function () {
            var cardCount = -1;
            var errorOccurred = false;
            try {
                set_1.Set.validateCardCount(cardCount);
            }
            catch (e) {
                errorOccurred = true;
            }
            chai_1.expect(errorOccurred).to.be.true;
        });
        it("should validate a zero card count", function () {
            var cardCount = 0;
            var errorOccurred = false;
            try {
                set_1.Set.validateCardCount(cardCount);
            }
            catch (e) {
                errorOccurred = true;
            }
            chai_1.expect(errorOccurred).to.be.false;
        });
        it("should validate a positive card count", function () {
            var cardCount = 1;
            var errorOccurred = false;
            try {
                set_1.Set.validateCardCount(cardCount);
            }
            catch (e) {
                errorOccurred = true;
            }
            chai_1.expect(errorOccurred).to.be.false;
        });
    });
    describe("parent_set_code", function () {
        it("should invalidate a non-alphanumeric parent_set_code", function () {
            var parentSetCode = "Magic: the Gathering test's";
            var errorOccurred = false;
            try {
                set_1.Set.validateParentSetCode(parentSetCode);
            }
            catch (e) {
                errorOccurred = true;
            }
            chai_1.expect(errorOccurred).to.be.true;
        });
        it("should invalidate an empty parent_set_code", function () {
            var parentSetCode = "";
            var errorOccurred = false;
            try {
                set_1.Set.validateParentSetCode(parentSetCode);
            }
            catch (e) {
                errorOccurred = true;
            }
            chai_1.expect(errorOccurred).to.be.true;
        });
        it("should ignore an undefined parent_set_code", function () {
            var parentSetCode;
            var errorOccurred = false;
            try {
                set_1.Set.validateParentSetCode(parentSetCode);
            }
            catch (e) {
                errorOccurred = true;
            }
            chai_1.expect(errorOccurred).to.be.false;
        });
        it("should validate an alphanumeric parent_set_code", function () {
            var parentSetCode = "xx12";
            var errorOccurred = false;
            try {
                set_1.Set.validateParentSetCode(parentSetCode);
            }
            catch (e) {
                errorOccurred = true;
            }
            chai_1.expect(errorOccurred).to.be.false;
        });
    });
    describe("block_code", function () {
        it("should invalidate a non-alphanumeric block_code", function () {
            var blockCode = "Magic: the Gathering test's";
            var errorOccurred = false;
            try {
                set_1.Set.validateBlockCode(blockCode);
            }
            catch (e) {
                errorOccurred = true;
            }
            chai_1.expect(errorOccurred).to.be.true;
        });
        it("should invalidate an empty block_code", function () {
            var blockCode = "";
            var errorOccurred = false;
            try {
                set_1.Set.validateBlockCode(blockCode);
            }
            catch (e) {
                errorOccurred = true;
            }
            chai_1.expect(errorOccurred).to.be.true;
        });
        it("should ignore an undefined block_code", function () {
            var blockCode;
            var errorOccurred = false;
            try {
                set_1.Set.validateBlockCode(blockCode);
            }
            catch (e) {
                errorOccurred = true;
            }
            chai_1.expect(errorOccurred).to.be.false;
        });
        it("should validate an alphanumeric block_code", function () {
            var blockCode = "xx12";
            var errorOccurred = false;
            try {
                set_1.Set.validateBlockCode(blockCode);
            }
            catch (e) {
                errorOccurred = true;
            }
            chai_1.expect(errorOccurred).to.be.false;
        });
    });
    describe("block_name", function () {
        it("should invalidate an empty block_name", function () {
            var blockName = "";
            var errorOccurred = false;
            try {
                set_1.Set.validateBlockName(blockName);
            }
            catch (e) {
                errorOccurred = true;
            }
            chai_1.expect(errorOccurred).to.be.true;
        });
        it("should validate a block_name as string value", function () {
            var blockName = "Magic: The Gathering test's";
            var errorOccurred = false;
            try {
                set_1.Set.validateBlockName(blockName);
            }
            catch (e) {
                errorOccurred = true;
            }
            chai_1.expect(errorOccurred).to.be.false;
        });
    });
    describe("icon_uri", function () {
        it("should invalidate an empty icon_uri", function () {
            var iconUri = "";
            var errorOccurred = false;
            try {
                set_1.Set.validateIconUri(iconUri);
            }
            catch (e) {
                errorOccurred = true;
            }
            chai_1.expect(errorOccurred).to.be.true;
        });
        it("should invalidate a bad icon_uri", function () {
            var iconUri = "http://test";
            var errorOccurred = false;
            try {
                set_1.Set.validateIconUri(iconUri);
            }
            catch (e) {
                errorOccurred = true;
            }
            chai_1.expect(errorOccurred).to.be.true;
        });
        it("should invalidate a non-svg icon_uri", function () {
            var iconUri = "http://example.com/icon.png";
            var errorOccurred = false;
            try {
                set_1.Set.validateIconUri(iconUri);
            }
            catch (e) {
                errorOccurred = true;
            }
            chai_1.expect(errorOccurred).to.be.true;
        });
        it("should validate a icon_uri as hosted svg", function () {
            var iconUri = "http://example.com/icon.svg";
            var errorOccurred = false;
            try {
                set_1.Set.validateIconUri(iconUri);
            }
            catch (e) {
                errorOccurred = true;
            }
            chai_1.expect(errorOccurred).to.be.false;
        });
    });
});
//# sourceMappingURL=set.spec.js.map