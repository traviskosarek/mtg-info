import "mocha";
import { expect } from "chai";
import * as sinon from "sinon";

import { Card } from "./card";
import { ICard } from "../interfaces";
import { Layouts, Symbols, Powers, Loyalties, Colors } from "../enums";
import { Toughnesses } from "../enums/toughnesses";

let sandbox;
beforeEach(function() {
    sandbox = sinon.sandbox.create();
});

afterEach(function() {
    sandbox.restore();
});

describe("Card", () => {
    describe("validateCard", () => {
        it("", () => {
            //
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
        it("", () => {
            //
        });
    });

    describe("card_faces", () => {
        it("", () => {
            //
        });
    });

    describe("legality", () => {
        it("", () => {
            //
        });
    });

    describe("is_reserved", () => {
        it("", () => {
            //
        });
    });

    describe("edhrec_rank", () => {
        it("", () => {
            //
        });
    });

    describe("set_code", () => {
        it("", () => {
            //
        });
    });

    describe("set_name", () => {
        it("", () => {
            //
        });
    });

    describe("collector_number", () => {
        it("", () => {
            //
        });
    });

    describe("image_uri", () => {
        it("", () => {
            //
        });
    });

    describe("is_reprint", () => {
        it("", () => {
            //
        });
    });

    describe("is_digital", () => {
        it("", () => {
            //
        });
    });

    describe("rarity", () => {
        it("", () => {
            //
        });
    });

    describe("flavor_text", () => {
        it("", () => {
            //
        });
    });

    describe("artist", () => {
        it("", () => {
            //
        });
    });

    describe("frame", () => {
        it("", () => {
            //
        });
    });

    describe("is_full_art", () => {
        it("", () => {
            //
        });
    });

    describe("watermark", () => {
        it("", () => {
            //
        });
    });

    describe("border_color", () => {
        it("", () => {
            //
        });
    });

    describe("story_spotlight_number", () => {
        it("", () => {
            //
        });
    });

    describe("story_spotlight_uri", () => {
        it("", () => {
            //
        });
    });

    describe("is_timeshifted", () => {
        it("", () => {
            //
        });
    });

    describe("is_colorshifted", () => {
        it("", () => {
            //
        });
    });

    describe("is_futureshifted", () => {
        it("", () => {
            //
        });
    });

    describe("usd_price", () => {
        it("", () => {
            //
        });
    });

    describe("tix_price", () => {
        it("", () => {
            //
        });
    });

    describe("eur_price", () => {
        it("", () => {
            //
        });
    });

    describe("related_links", () => {
        it("", () => {
            //
        });
    });

    describe("purchase_links", () => {
        it("", () => {
            //
        });
    });
});
