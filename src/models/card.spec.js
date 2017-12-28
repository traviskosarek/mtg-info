"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("mocha");
var chai_1 = require("chai");
var sinon = require("sinon");
var card_1 = require("./card");
var enums_1 = require("../enums");
var toughnesses_1 = require("../enums/toughnesses");
var sandbox;
beforeEach(function () {
    sandbox = sinon.sandbox.create();
});
afterEach(function () {
    sandbox.restore();
});
describe("Card", function () {
    describe("validateCard", function () {
        it("", function () {
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
            var toughness = toughnesses_1.Toughnesses.NegativeOne;
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
            var toughness = toughnesses_1.Toughnesses.Star;
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
            var toughness = toughnesses_1.Toughnesses.StarSquared;
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
            var toughness = toughnesses_1.Toughnesses.QuestionMark;
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
            var toughness = toughnesses_1.Toughnesses.Zero;
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
            var toughness = toughnesses_1.Toughnesses.MinusZero;
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
            var toughness = toughnesses_1.Toughnesses.PlusZero;
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
            var toughness = toughnesses_1.Toughnesses.OneHalf;
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
            var toughness = toughnesses_1.Toughnesses.PlusOne;
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
            var toughness = toughnesses_1.Toughnesses.One;
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
            var toughness = toughnesses_1.Toughnesses.OnePlusStar;
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
            var toughness = toughnesses_1.Toughnesses.OneAndOneHalf;
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
            var toughness = toughnesses_1.Toughnesses.Two;
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
            var toughness = toughnesses_1.Toughnesses.TwoPlusStar;
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
            var toughness = toughnesses_1.Toughnesses.PlusTwo;
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
            var toughness = toughnesses_1.Toughnesses.TwoAndOneHalf;
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
            var toughness = toughnesses_1.Toughnesses.PlusThree;
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
            var toughness = toughnesses_1.Toughnesses.Three;
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
            var toughness = toughnesses_1.Toughnesses.ThreeAndOneHalf;
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
            var toughness = toughnesses_1.Toughnesses.PlusFour;
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
            var toughness = toughnesses_1.Toughnesses.Four;
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
            var toughness = toughnesses_1.Toughnesses.Five;
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
            var toughness = toughnesses_1.Toughnesses.Six;
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
            var toughness = toughnesses_1.Toughnesses.Seven;
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
            var toughness = toughnesses_1.Toughnesses.Eight;
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
            var toughness = toughnesses_1.Toughnesses.Nine;
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
            var toughness = toughnesses_1.Toughnesses.Ten;
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
            var toughness = toughnesses_1.Toughnesses.Eleven;
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
            var toughness = toughnesses_1.Toughnesses.Twelve;
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
            var toughness = toughnesses_1.Toughnesses.Thirteen;
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
            var toughness = toughnesses_1.Toughnesses.Fourteen;
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
            var toughness = toughnesses_1.Toughnesses.Fifteen;
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
            var toughness = toughnesses_1.Toughnesses.Twenty;
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
            var toughness = toughnesses_1.Toughnesses.NinetyNine;
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
        it("", function () {
        });
    });
    describe("card_faces", function () {
        it("", function () {
        });
    });
    describe("legality", function () {
        it("", function () {
        });
    });
    describe("is_reserved", function () {
        it("", function () {
        });
    });
    describe("edhrec_rank", function () {
        it("", function () {
        });
    });
    describe("set_code", function () {
        it("", function () {
        });
    });
    describe("set_name", function () {
        it("", function () {
        });
    });
    describe("collector_number", function () {
        it("", function () {
        });
    });
    describe("image_uri", function () {
        it("", function () {
        });
    });
    describe("is_reprint", function () {
        it("", function () {
        });
    });
    describe("is_digital", function () {
        it("", function () {
        });
    });
    describe("rarity", function () {
        it("", function () {
        });
    });
    describe("flavor_text", function () {
        it("", function () {
        });
    });
    describe("artist", function () {
        it("", function () {
        });
    });
    describe("frame", function () {
        it("", function () {
        });
    });
    describe("is_full_art", function () {
        it("", function () {
        });
    });
    describe("watermark", function () {
        it("", function () {
        });
    });
    describe("border_color", function () {
        it("", function () {
        });
    });
    describe("story_spotlight_number", function () {
        it("", function () {
        });
    });
    describe("story_spotlight_uri", function () {
        it("", function () {
        });
    });
    describe("is_timeshifted", function () {
        it("", function () {
        });
    });
    describe("is_colorshifted", function () {
        it("", function () {
        });
    });
    describe("is_futureshifted", function () {
        it("", function () {
        });
    });
    describe("usd_price", function () {
        it("", function () {
        });
    });
    describe("tix_price", function () {
        it("", function () {
        });
    });
    describe("eur_price", function () {
        it("", function () {
        });
    });
    describe("related_links", function () {
        it("", function () {
        });
    });
    describe("purchase_links", function () {
        it("", function () {
        });
    });
});
//# sourceMappingURL=card.spec.js.map