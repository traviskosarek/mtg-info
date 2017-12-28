import "mocha";
import { expect } from "chai";
import * as sinon from "sinon";

import { Set } from "./set";
import { ISet } from "../interfaces";
import { SetType } from "../enums";


let sandbox;
beforeEach(function() {
    sandbox = sinon.sandbox.create();
});

afterEach(function() {
    sandbox.restore();
});

describe("Set", () => {
    describe("validateSet", () => {

        it("should validate set_code", () => {
            // arrange
            let set: ISet = {
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

            let validateSetCodeStub = sandbox.stub(Set, "validateSetCode");

            // act
            Set.validateSet(set);
        
            // assert
            expect(validateSetCodeStub.called).to.be.true;

            // cleanup
            validateSetCodeStub.restore();
        });

        it("should validate set_name", () => {
            // arrange
            let set: ISet = {
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

            let validateSetNameStub = sandbox.stub(Set, "validateSetName");

            // act
            Set.validateSet(set);
        
            // assert
            expect(validateSetNameStub.called).to.be.true;
            
            // cleanup
            validateSetNameStub.restore();
        });
        
        it("should validate release_date", () => {
            // arrange
            let set: ISet = {
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

            let validateReleaseDateStub = sandbox.stub(Set, "validateReleaseDate");

            // act
            Set.validateSet(set);
        
            // assert
            expect(validateReleaseDateStub.called).to.be.true;

            // cleanup
            validateReleaseDateStub.restore();
        });

        it("should validate set_type", () => {
            // arrange
            let set: ISet = {
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

            let validateSetTypeStub = sandbox.stub(Set, "validateSetType");

            // act
            Set.validateSet(set);
        
            // assert
            expect(validateSetTypeStub.called).to.be.true;

            // cleanup
            validateSetTypeStub.restore();
        });
        
        it("should validate card_count", () => {
            // arrange
            let set: ISet = {
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

            let validateCardCountStub = sandbox.stub(Set, "validateCardCount");

            // act
            Set.validateSet(set);
        
            // assert
            expect(validateCardCountStub.called).to.be.true;

            // cleanup
            validateCardCountStub.restore();
        });

        it("should validate parent_set_code", () => {
            // arrange
            let set: ISet = {
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

            let validateParentSetCodeStub = sandbox.stub(Set, "validateParentSetCode");

            // act
            Set.validateSet(set);
        
            // assert
            expect(validateParentSetCodeStub.called).to.be.true;

            // cleanup
            validateParentSetCodeStub.restore();
        });
        
        it("should validate block_code", () => {
            // arrange
            let set: ISet = {
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

            let validateBlockCodeStub = sandbox.stub(Set, "validateBlockCode");

            // act
            Set.validateSet(set);
        
            // assert
            expect(validateBlockCodeStub.called).to.be.true;

            // cleanup
            validateBlockCodeStub.restore();
        });

        it("should validate block_name", () => {
            // arrange
            let set: ISet = {
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

            let validateBlockNameStub = sandbox.stub(Set, "validateBlockName");

            // act
            Set.validateSet(set);
        
            // assert
            expect(validateBlockNameStub.called).to.be.true;

            // cleanup
            validateBlockNameStub.restore();
        });
        
        it("should validate icon_uri", () => {
            // arrange
            let set: ISet = {
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

            let validateIconUriStub = sandbox.stub(Set, "validateIconUri");

            // act
            Set.validateSet(set);
        
            // assert
            expect(validateIconUriStub.called).to.be.true;

            // cleanup
            validateIconUriStub.restore();
        });
        
        it("should throw errors", () => {
            // arrange
            let set: ISet = {
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
            let errorThrown = false;

            let validateSetCodeStub = sandbox.stub(Set, "validateSetCode").callsFake((code) => {
                throw new Error("This is an error");
            });

            // act
            try {
                Set.validateSet(set);
            }
            catch (e) {
                errorThrown = true;
            }
            // assert
            expect(errorThrown).to.be.true;

            // cleanup
            validateSetCodeStub.restore();
        });
    });

    describe("set_code", () => {
        it("should invalidate an undefined set_code", () => {
            // arrange
            let setCode;
            let errorOccurred = false;

            // act
            try {
                Set.validateSetCode(setCode);
            }
            catch (e) {
                errorOccurred = true;
            }
        
            // assert
            expect(errorOccurred).to.be.true;
        });
    
        it("should invalidate an empty set_code", () => {
            // arrange
            let setCode = "";
            let errorOccurred = false;

            // act
            try {
                Set.validateSetCode(setCode);
            }
            catch (e) {
                errorOccurred = true;
            }
        
            // assert
            expect(errorOccurred).to.be.true;
        });
    
        it("should invalidate a non-alphanumeric set_code", () => {
            // arrange
            let setCode = "test!";
            let errorOccurred = false;

            // act
            try {
                Set.validateSetCode(setCode);
            }
            catch (e) {
                errorOccurred = true;
            }
        
            // assert
            expect(errorOccurred).to.be.true;
        });

        it("should validate an alphanumeric set_code", () => {
            // arrange
            let setCode = "xx12";
            let errorOccurred = false;

            // act
            try {
                Set.validateSetCode(setCode);
            }
            catch (e) {
                errorOccurred = true;
            }
        
            // assert
            expect(errorOccurred).to.be.false;
        });
    });

    describe("set_name", () => {
        it("should invalidate an undefined set_name", () => {
            // arrange
            let setName;
            let errorOccurred = false;

            // act
            try {
                Set.validateSetName(setName);
            }
            catch (e) {
                errorOccurred = true;
            }
        
            // assert
            expect(errorOccurred).to.be.true;
        });
    
        it("should invalidate an empty set_name", () => {
            // arrange
            let setName = "";
            let errorOccurred = false;

            // act
            try {
                Set.validateSetName(setName);
            }
            catch (e) {
                errorOccurred = true;
            }
        
            // assert
            expect(errorOccurred).to.be.true;
        });

        it("should validate a set_name as string value", () => {
            // arrange
            let setName = "Magic: The Gathering test's";
            let errorOccurred = false;

            // act
            try {
                Set.validateSetName(setName);
            }
            catch (e) {
                errorOccurred = true;
            }
        
            // assert
            expect(errorOccurred).to.be.false;
        });
    });

    describe("release_date", () => {
        it("should ignore an empty release_date", () => {
            // arrange
            let releaseDate;
            let errorOccurred = false;

            // act
            try {
                Set.validateReleaseDate(releaseDate);
            }
            catch (e) {
                errorOccurred = true;
            }
        
            // assert
            expect(errorOccurred).to.be.false;
        });

        it("should invalidate an empty release_date", () => {
            // arrange
            let releaseDate = "";
            let errorOccurred = false;

            // act
            try {
                Set.validateReleaseDate(releaseDate);
            }
            catch (e) {
                errorOccurred = true;
            }
        
            // assert
            expect(errorOccurred).to.be.true;
        });
        
        it("should invalidate a character text release_date", () => {
            // arrange
            let releaseDate = "test";
            let errorOccurred = false;

            // act
            try {
                Set.validateReleaseDate(releaseDate);
            }
            catch (e) {
                errorOccurred = true;
            }
        
            // assert
            expect(errorOccurred).to.be.true;
        });

        it("should invalidate a release_date of format MM-DD-YYYY", () => {
            // arrange
            let releaseDate = "02-22-2222";
            let errorOccurred = false;

            // act
            try {
                Set.validateReleaseDate(releaseDate);
            }
            catch (e) {
                errorOccurred = true;
            }
        
            // assert
            expect(errorOccurred).to.be.true;
        });
    
        it("should invalidate a release_date of format MM/DD/YYYY", () => {
            // arrange
            let releaseDate = "02/22/2222";
            let errorOccurred = false;

            // act
            try {
                Set.validateReleaseDate(releaseDate);
            }
            catch (e) {
                errorOccurred = true;
            }
        
            // assert
            expect(errorOccurred).to.be.true;
        });

        it("should invalidate a release_date of format DD-MM-YYYY", () => {
            // arrange
            let releaseDate = "22-02-2222";
            let errorOccurred = false;

            // act
            try {
                Set.validateReleaseDate(releaseDate);
            }
            catch (e) {
                errorOccurred = true;
            }
        
            // assert
            expect(errorOccurred).to.be.true;
        });
    
        it("should invalidate a release_date of format DD/MM/YYYY", () => {
            // arrange
            let releaseDate = "22/02/2222";
            let errorOccurred = false;

            // act
            try {
                Set.validateReleaseDate(releaseDate);
            }
            catch (e) {
                errorOccurred = true;
            }
        
            // assert
            expect(errorOccurred).to.be.true;
        });

        it("should invalidate a release_date of format YYYY/MM/DD", () => {
            // arrange
            let releaseDate = "2222/02/22";
            let errorOccurred = false;

            // act
            try {
                Set.validateReleaseDate(releaseDate);
            }
            catch (e) {
                errorOccurred = true;
            }
        
            // assert
            expect(errorOccurred).to.be.true;
        });
        
        it("should invalidate a release_date of format YYYY/DD/MM", () => {
            // arrange
            let releaseDate = "2222/22/02";
            let errorOccurred = false;

            // act
            try {
                Set.validateReleaseDate(releaseDate);
            }
            catch (e) {
                errorOccurred = true;
            }
        
            // assert
            expect(errorOccurred).to.be.true;
        });

        it("should validate a release_date as format YYYY-MM-DD", () => {
            // arrange
            let releaseDate = "2222-02-22";
            let errorOccurred = false;

            // act
            try {
                Set.validateReleaseDate(releaseDate);
            }
            catch (e) {
                errorOccurred = true;
            }
        
            // assert
            expect(errorOccurred).to.be.false;
        });
    });

    describe("set_type", () => {
        
        it("should invalidate an undefined set_type", () => {
            // arrange
            let setType;
            let errorOccurred = false;

            // act
            try {
                Set.validateSetType(setType);
            }
            catch (e) {
                errorOccurred = true;
            }
        
            // assert
            expect(errorOccurred).to.be.true;
        });

        it("should invalidate an empty set_type", () => {
            // arrange
            let setType = "";
            let errorOccurred = false;

            // act
            try {
                Set.validateSetType(setType);
            }
            catch (e) {
                errorOccurred = true;
            }
        
            // assert
            expect(errorOccurred).to.be.true;
        });

        it("should invalidate a non-predefined value of 'magic_set_type'", () => {
            // arrange
            let setType = "magic_set_type";
            let errorOccurred = false;

            // act
            try {
                Set.validateSetType(setType);
            }
            catch (e) {
                errorOccurred = true;
            }
        
            // assert
            expect(errorOccurred).to.be.true;
        });

        it("should validate set_type as 'archenemy'", () => {
            // arrange
            let setType = SetType.Archenemy;
            let errorOccurred = false;

            // act
            try {
                Set.validateSetType(setType);
            }
            catch (e) {
                errorOccurred = true;
            }
        
            // assert
            expect(errorOccurred).to.be.false;
        });

        it("should validate set_type as 'box'", () => {
            // arrange
            let setType = SetType.Box;
            let errorOccurred = false;

            // act
            try {
                Set.validateSetType(setType);
            }
            catch (e) {
                errorOccurred = true;
            }
        
            // assert
            expect(errorOccurred).to.be.false;
        });

        it("should validate set_type as 'commander'", () => {
            // arrange
            let setType = SetType.Commander;
            let errorOccurred = false;

            // act
            try {
                Set.validateSetType(setType);
            }
            catch (e) {
                errorOccurred = true;
            }
        
            // assert
            expect(errorOccurred).to.be.false;
        });
        
        it("should validate set_type as 'conspiracy'", () => {
            // arrange
            let setType = SetType.Conspiracy;
            let errorOccurred = false;

            // act
            try {
                Set.validateSetType(setType);
            }
            catch (e) {
                errorOccurred = true;
            }
        
            // assert
            expect(errorOccurred).to.be.false;
        });

        it("should validate set_type as 'core'", () => {
            // arrange
            let setType = SetType.Core;
            let errorOccurred = false;

            // act
            try {
                Set.validateSetType(setType);
            }
            catch (e) {
                errorOccurred = true;
            }
        
            // assert
            expect(errorOccurred).to.be.false;
        });
        
        it("should validate set_type as 'duel_deck'", () => {
            // arrange
            let setType = SetType.DuelDeck;
            let errorOccurred = false;

            // act
            try {
                Set.validateSetType(setType);
            }
            catch (e) {
                errorOccurred = true;
            }
        
            // assert
            expect(errorOccurred).to.be.false;
        });

        it("should validate set_type as 'expansion'", () => {
            // arrange
            let setType = SetType.Expansion;
            let errorOccurred = false;

            // act
            try {
                Set.validateSetType(setType);
            }
            catch (e) {
                errorOccurred = true;
            }
        
            // assert
            expect(errorOccurred).to.be.false;
        });
        
        it("should validate set_type as 'from_the_vault'", () => {
            // arrange
            let setType = SetType.FromTheVault;
            let errorOccurred = false;

            // act
            try {
                Set.validateSetType(setType);
            }
            catch (e) {
                errorOccurred = true;
            }
        
            // assert
            expect(errorOccurred).to.be.false;
        });

        it("should validate set_type as 'funny'", () => {
            // arrange
            let setType = SetType.Funny;
            let errorOccurred = false;

            // act
            try {
                Set.validateSetType(setType);
            }
            catch (e) {
                errorOccurred = true;
            }
        
            // assert
            expect(errorOccurred).to.be.false;
        });
        
        it("should validate set_type as 'masterpiece'", () => {
            // arrange
            let setType = SetType.Masterpiece;
            let errorOccurred = false;

            // act
            try {
                Set.validateSetType(setType);
            }
            catch (e) {
                errorOccurred = true;
            }
        
            // assert
            expect(errorOccurred).to.be.false;
        });
        
        it("should validate set_type as 'masters'", () => {
            // arrange
            let setType = SetType.Masters;
            let errorOccurred = false;

            // act
            try {
                Set.validateSetType(setType);
            }
            catch (e) {
                errorOccurred = true;
            }
        
            // assert
            expect(errorOccurred).to.be.false;
        });

        it("should validate set_type as 'memorabilia'", () => {
            // arrange
            let setType = SetType.Memorabilia;
            let errorOccurred = false;

            // act
            try {
                Set.validateSetType(setType);
            }
            catch (e) {
                errorOccurred = true;
            }
        
            // assert
            expect(errorOccurred).to.be.false;
        });
        
        it("should validate set_type as 'planechase'", () => {
            // arrange
            let setType = SetType.Planechase;
            let errorOccurred = false;

            // act
            try {
                Set.validateSetType(setType);
            }
            catch (e) {
                errorOccurred = true;
            }
        
            // assert
            expect(errorOccurred).to.be.false;
        });

        it("should validate set_type as 'premium_deck'", () => {
            // arrange
            let setType = SetType.PremiumDeck;
            let errorOccurred = false;

            // act
            try {
                Set.validateSetType(setType);
            }
            catch (e) {
                errorOccurred = true;
            }
        
            // assert
            expect(errorOccurred).to.be.false;
        });
        
        it("should validate set_type as 'promo'", () => {
            // arrange
            let setType = SetType.Promo;
            let errorOccurred = false;

            // act
            try {
                Set.validateSetType(setType);
            }
            catch (e) {
                errorOccurred = true;
            }
        
            // assert
            expect(errorOccurred).to.be.false;
        });

        it("should validate set_type as 'starter'", () => {
            // arrange
            let setType = SetType.Starter;
            let errorOccurred = false;

            // act
            try {
                Set.validateSetType(setType);
            }
            catch (e) {
                errorOccurred = true;
            }
        
            // assert
            expect(errorOccurred).to.be.false;
        });
        
        it("should validate set_type as 'token'", () => {
            // arrange
            let setType = SetType.Token;
            let errorOccurred = false;

            // act
            try {
                Set.validateSetType(setType);
            }
            catch (e) {
                errorOccurred = true;
            }
        
            // assert
            expect(errorOccurred).to.be.false;
        });
        
        it("should validate set_type as 'vanguard'", () => {
            // arrange
            let setType = SetType.Vanguard;
            let errorOccurred = false;

            // act
            try {
                Set.validateSetType(setType);
            }
            catch (e) {
                errorOccurred = true;
            }
        
            // assert
            expect(errorOccurred).to.be.false;
        });
    });

    describe("card_count", () => {
        it("should invalidate an undefined card_count", () => {
            // arrange
            let cardCount;
            let errorOccurred = false;

            // act
            try {
                Set.validateCardCount(cardCount);
            }
            catch (e) {
                errorOccurred = true;
            }
        
            // assert
            expect(errorOccurred).to.be.true;
        });
        
        it("should invalidate a non-number value", () => {
            // arrange
            let cardCount = "error";
            let errorOccurred = false;

            // act
            try {
                Set.validateCardCount(cardCount);
            }
            catch (e) {
                errorOccurred = true;
            }
        
            // assert
            expect(errorOccurred).to.be.true;
        });
    
        it("should invalidate a negative card count", () => {
            // arrange
            let cardCount = -1;
            let errorOccurred = false;

            // act
            try {
                Set.validateCardCount(cardCount);
            }
            catch (e) {
                errorOccurred = true;
            }
        
            // assert
            expect(errorOccurred).to.be.true;
        });

        it("should validate a zero card count", () => {
            // arrange
            let cardCount = 0;
            let errorOccurred = false;

            // act
            try {
                Set.validateCardCount(cardCount);
            }
            catch (e) {
                errorOccurred = true;
            }
        
            // assert
            expect(errorOccurred).to.be.false;
        });

        it("should validate a positive card count", () => {
            // arrange
            let cardCount = 1;
            let errorOccurred = false;

            // act
            try {
                Set.validateCardCount(cardCount);
            }
            catch (e) {
                errorOccurred = true;
            }
        
            // assert
            expect(errorOccurred).to.be.false;
        });
    });
    
    describe("parent_set_code", () => {
        it("should invalidate a non-alphanumeric parent_set_code", () => {
            // arrange
            let parentSetCode = "Magic: the Gathering test's";
            let errorOccurred = false;

            // act
            try {
                Set.validateParentSetCode(parentSetCode);
            }
            catch (e) {
                errorOccurred = true;
            }
        
            // assert
            expect(errorOccurred).to.be.true;
        });
    
        it("should invalidate an empty parent_set_code", () => {
            // arrange
            let parentSetCode = "";
            let errorOccurred = false;

            // act
            try {
                Set.validateParentSetCode(parentSetCode);
            }
            catch (e) {
                errorOccurred = true;
            }
        
            // assert
            expect(errorOccurred).to.be.true;
        });
    
        it("should ignore an undefined parent_set_code", () => {
            // arrange
            let parentSetCode;
            let errorOccurred = false;

            // act
            try {
                Set.validateParentSetCode(parentSetCode);
            }
            catch (e) {
                errorOccurred = true;
            }
        
            // assert
            expect(errorOccurred).to.be.false;
        });

        it("should validate an alphanumeric parent_set_code", () => {
            // arrange
            let parentSetCode = "xx12";
            let errorOccurred = false;

            // act
            try {
                Set.validateParentSetCode(parentSetCode);
            }
            catch (e) {
                errorOccurred = true;
            }
        
            // assert
            expect(errorOccurred).to.be.false;
        });
    });
    
    describe("block_code", () => {
        it("should invalidate a non-alphanumeric block_code", () => {
            // arrange
            let blockCode = "Magic: the Gathering test's";
            let errorOccurred = false;

            // act
            try {
                Set.validateBlockCode(blockCode);
            }
            catch (e) {
                errorOccurred = true;
            }
        
            // assert
            expect(errorOccurred).to.be.true;
        });
    
        it("should invalidate an empty block_code", () => {
            // arrange
            let blockCode = "";
            let errorOccurred = false;

            // act
            try {
                Set.validateBlockCode(blockCode);
            }
            catch (e) {
                errorOccurred = true;
            }
        
            // assert
            expect(errorOccurred).to.be.true;
        });
    
        it("should ignore an undefined block_code", () => {
            // arrange
            let blockCode;
            let errorOccurred = false;

            // act
            try {
                Set.validateBlockCode(blockCode);
            }
            catch (e) {
                errorOccurred = true;
            }
        
            // assert
            expect(errorOccurred).to.be.false;
        });

        it("should validate an alphanumeric block_code", () => {
            // arrange
            let blockCode = "xx12";
            let errorOccurred = false;

            // act
            try {
                Set.validateBlockCode(blockCode);
            }
            catch (e) {
                errorOccurred = true;
            }
        
            // assert
            expect(errorOccurred).to.be.false;
        });
    });
    
    describe("block_name", () => {
        it("should invalidate an empty block_name", () => {
            // arrange
            let blockName = "";
            let errorOccurred = false;

            // act
            try {
                Set.validateBlockName(blockName);
            }
            catch (e) {
                errorOccurred = true;
            }
        
            // assert
            expect(errorOccurred).to.be.true;
        });

        it("should validate a block_name as string value", () => {
            // arrange
            let blockName = "Magic: The Gathering test's";
            let errorOccurred = false;

            // act
            try {
                Set.validateBlockName(blockName);
            }
            catch (e) {
                errorOccurred = true;
            }
        
            // assert
            expect(errorOccurred).to.be.false;
        });
    });
    
    describe("icon_uri", () => {
        
        it("should allow a blank icon_uri", () => {
            // arrange
            let iconUri;
            let errorOccurred = false;

            // act
            try {
                Set.validateIconUri(iconUri);
            }
            catch (e) {
                errorOccurred = true;
            }
        
            // assert
            expect(errorOccurred).to.be.false;
        });

        it("should invalidate an empty icon_uri", () => {
            // arrange
            let iconUri = "";
            let errorOccurred = false;

            // act
            try {
                Set.validateIconUri(iconUri);
            }
            catch (e) {
                errorOccurred = true;
            }
        
            // assert
            expect(errorOccurred).to.be.true;
        });

        it("should invalidate a bad icon_uri", () => {
            // arrange
            let iconUri = "http://test";
            let errorOccurred = false;

            // act
            try {
                Set.validateIconUri(iconUri);
            }
            catch (e) {
                errorOccurred = true;
            }
        
            // assert
            expect(errorOccurred).to.be.true;
        });

        it("should invalidate a non-svg icon_uri", () => {
            // arrange
            let iconUri = "http://example.com/icon.png";
            let errorOccurred = false;

            // act
            try {
                Set.validateIconUri(iconUri);
            }
            catch (e) {
                errorOccurred = true;
            }
        
            // assert
            expect(errorOccurred).to.be.true;
        });

        it("should validate a icon_uri as hosted svg", () => {
            // arrange
            let iconUri = "http://example.com/icon.svg";
            let errorOccurred = false;

            // act
            try {
                Set.validateIconUri(iconUri);
            }
            catch (e) {
                errorOccurred = true;
            }
        
            // assert
            expect(errorOccurred).to.be.false;
        });
    });
});
