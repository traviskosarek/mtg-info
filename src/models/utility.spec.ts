import "mocha";
import { expect } from "chai";

import { Utility } from "./utility";

describe("Utility", () => {
    describe("isAlphaNumeric", () => {
        it("should allow undefined strings", () => {
            // arrange
            let testString;

            // act
            let result = Utility.isAlphaNumeric(testString);

            // assert
            expect(result).to.be.true;
        });
        
        it("should allow empty strings", () => {
            // arrange
            let testString = "";

            // act
            let result = Utility.isAlphaNumeric(testString);

            // assert
            expect(result).to.be.true;
        });

        it("should allow alpha-only strings", () => {
            // arrange
            let testString = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";

            // act
            let result = Utility.isAlphaNumeric(testString);

            // assert
            expect(result).to.be.true;
        });

        it("should allow number-only strings", () => {
            // arrange
            let testString = "0123456789";

            // act
            let result = Utility.isAlphaNumeric(testString);

            // assert
            expect(result).to.be.true;
        });

        it("should allow strings with capital letters", () => {
            // arrange
            let testString = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

            // act
            let result = Utility.isAlphaNumeric(testString);

            // assert
            expect(result).to.be.true;
        });

        it("should allow strings with lowercase letters", () => {
            // arrange
            let testString = "abcdefghijklmnopqrstuvwxyz";

            // act
            let result = Utility.isAlphaNumeric(testString);

            // assert
            expect(result).to.be.true;
        });

        it("should allow strings with spaces", () => {
            // arrange
            let testString = " ";

            // act
            let result = Utility.isAlphaNumeric(testString);

            // assert
            expect(result).to.be.true;
        });

        it("should not allow strings with punctuation", () => {
            // arrange
            let testString = "!,./;'[]<>?:";

            // act
            let result = Utility.isAlphaNumeric(testString);

            // assert
            expect(result).to.be.false;
        });
        
    });
});
