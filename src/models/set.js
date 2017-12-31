"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var moment = require("moment");
var validUrl = require("valid-url");
var enums_1 = require("../enums");
var utility_1 = require("./utility");
var Set = (function () {
    function Set() {
    }
    Set.createSet = function (set) {
        this.validateSet(set);
        var newSet = {
            set_code: set.set_code,
            set_name: set.set_name,
            release_date: set.release_date,
            set_type: set.set_type,
            card_count: set.card_count,
            parent_set_code: set.parent_set_code,
            is_digital: set.is_digital,
            is_foil: set.is_foil,
            block_code: set.block_code,
            block_name: set.block_name,
            icon_uri: set.icon_uri
        };
        return JSON.parse(JSON.stringify(newSet));
    };
    Set.validateSet = function (set) {
        try {
            this.validateSetCode(set.set_code);
            this.validateSetName(set.set_name);
            this.validateReleaseDate(set.release_date);
            this.validateSetType(set.set_type);
            this.validateCardCount(set.card_count);
            this.validateParentSetCode(set.parent_set_code);
            this.validateIsDigital(set.is_digital);
            this.validateIsFoil(set.is_foil);
            this.validateBlockCode(set.block_code);
            this.validateBlockName(set.block_name);
            this.validateIconUri(set.icon_uri);
        }
        catch (e) {
            throw e;
        }
    };
    Set.validateSetCode = function (setCode) {
        if (setCode === undefined) {
            throw new Error("set_code is required");
        }
        else if (setCode === "") {
            throw new Error("set_code cannot be empty");
        }
        else if (!utility_1.Utility.isAlphaNumeric(setCode)) {
            throw new Error("set_code must be alphanumeric *** set_code = " + setCode);
        }
    };
    Set.validateSetName = function (setName) {
        if (setName === undefined) {
            throw new Error("set_name is required");
        }
        else if (setName === "") {
            throw new Error("set_name cannot be empty");
        }
    };
    Set.validateReleaseDate = function (releaseDate) {
        if (releaseDate !== undefined && !(moment(releaseDate, "YYYY-MM-DD", true).isValid())) {
            throw new Error("release_date must be in the form of YYYY-MM-DD *** release_date = " + releaseDate);
        }
    };
    Set.validateSetType = function (setType) {
        if (setType === undefined) {
            throw new Error("set_type is required");
        }
        else if (setType === "") {
            throw new Error("set_type cannot be empty");
        }
        else {
            switch (setType) {
                case enums_1.SetType.Archenemy:
                case enums_1.SetType.Box:
                case enums_1.SetType.Commander:
                case enums_1.SetType.Conspiracy:
                case enums_1.SetType.Core:
                case enums_1.SetType.DuelDeck:
                case enums_1.SetType.Expansion:
                case enums_1.SetType.FromTheVault:
                case enums_1.SetType.Funny:
                case enums_1.SetType.Masterpiece:
                case enums_1.SetType.Masters:
                case enums_1.SetType.Memorabilia:
                case enums_1.SetType.Planechase:
                case enums_1.SetType.PremiumDeck:
                case enums_1.SetType.Promo:
                case enums_1.SetType.Starter:
                case enums_1.SetType.Token:
                case enums_1.SetType.Vanguard:
                    break;
                default:
                    throw new Error("set_type is not a valid pre-defined value *** set_type = " + setType);
            }
        }
    };
    Set.validateCardCount = function (cardCount) {
        if (cardCount === undefined) {
            throw new Error("card_count is required");
        }
        else if (isNaN(cardCount)) {
            throw new Error("card_count must be a number");
        }
        else if (cardCount < 0) {
            throw new Error("card_count must be greater than or equal to 0 *** card_count = " + cardCount);
        }
    };
    Set.validateParentSetCode = function (parentSetCode) {
        if (parentSetCode !== undefined && !utility_1.Utility.isAlphaNumeric(parentSetCode)) {
            throw new Error("parent_set_code must be alphanumeric *** parent_set_code = " + parentSetCode);
        }
        else if (parentSetCode === "") {
            throw new Error("parent_set_code cannot be empty");
        }
    };
    Set.validateIsDigital = function (isDigital) {
        if (isDigital !== undefined && !(typeof (isDigital) === "boolean")) {
            throw new Error("is_digital must be of type boolean *** is_digital = " + isDigital);
        }
    };
    Set.validateIsFoil = function (isFoil) {
        if (isFoil !== undefined && !(typeof (isFoil) === "boolean")) {
            throw new Error("is_foil must be of type boolean *** is_foil = " + isFoil);
        }
    };
    Set.validateBlockCode = function (blockCode) {
        if (blockCode !== undefined && !utility_1.Utility.isAlphaNumeric(blockCode)) {
            throw new Error("block_code must be alphanumeric *** block_code = " + blockCode);
        }
        else if (blockCode === "") {
            throw new Error("block_code cannot be empty");
        }
    };
    Set.validateBlockName = function (blockName) {
        if (blockName === "") {
            throw new Error("block_name cannot be empty");
        }
    };
    Set.validateIconUri = function (iconUri) {
        if (iconUri !== undefined) {
            if (!validUrl.isWebUri(iconUri)) {
                throw new Error("icon_uri must be a valid URI *** icon_uri = " + iconUri);
            }
            else if (!(iconUri.substr(iconUri.length - 4) === ".svg")) {
                throw new Error("icon_uri must point to a .svg file *** icon_uri = " + iconUri);
            }
        }
    };
    return Set;
}());
exports.Set = Set;
//# sourceMappingURL=set.js.map