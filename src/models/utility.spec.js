"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("mocha");
var chai_1 = require("chai");
var utility_1 = require("./utility");
describe("Utility", function () {
    describe("isAlphaNumeric", function () {
        it("should allow undefined strings", function () {
            var testString;
            var result = utility_1.Utility.isAlphaNumeric(testString);
            chai_1.expect(result).to.be.true;
        });
        it("should allow empty strings", function () {
            var testString = "";
            var result = utility_1.Utility.isAlphaNumeric(testString);
            chai_1.expect(result).to.be.true;
        });
        it("should allow alpha-only strings", function () {
            var testString = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
            var result = utility_1.Utility.isAlphaNumeric(testString);
            chai_1.expect(result).to.be.true;
        });
        it("should allow number-only strings", function () {
            var testString = "0123456789";
            var result = utility_1.Utility.isAlphaNumeric(testString);
            chai_1.expect(result).to.be.true;
        });
        it("should allow strings with capital letters", function () {
            var testString = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
            var result = utility_1.Utility.isAlphaNumeric(testString);
            chai_1.expect(result).to.be.true;
        });
        it("should allow strings with lowercase letters", function () {
            var testString = "abcdefghijklmnopqrstuvwxyz";
            var result = utility_1.Utility.isAlphaNumeric(testString);
            chai_1.expect(result).to.be.true;
        });
        it("should not allow strings with spaces", function () {
            var testString = " ";
            var result = utility_1.Utility.isAlphaNumeric(testString);
            chai_1.expect(result).to.be.false;
        });
        it("should not allow strings with punctuation", function () {
            var testString = "!,./;'[]<>?:";
            var result = utility_1.Utility.isAlphaNumeric(testString);
            chai_1.expect(result).to.be.false;
        });
    });
});
//# sourceMappingURL=utility.spec.js.map