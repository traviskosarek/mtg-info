"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var moment = require("moment");
var validUrl = require("valid-url");
var set_type_1 = require("./set-type");
var utility_1 = require("./utility");
var Set = (function () {
    function Set() {
    }
    Set.validateJSON = function (set) {
        try {
            this.validateSetCode(set.set_code);
            this.validateSetName(set.set_name);
            this.validateReleaseDate(set.release_date);
            this.validateSetType(set.set_type);
            this.validateCardCount(set.card_count);
            this.validateParentSetCode(set.parent_set_code);
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
            throw new Error("set_code must be alphanumeric. *** set_code = " + setCode);
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
        if (!(moment(releaseDate, "YYYY-MM-DD", true).isValid())) {
            throw new Error("release_date must be in the form of YYYY-MM-DD. *** release_date = " + releaseDate);
        }
    };
    Set.validateSetType = function (setType) {
        if (setType === "") {
            throw new Error("set_type cannot be empty");
        }
        else {
            switch (setType) {
                case set_type_1.SetType.archenemy:
                case set_type_1.SetType.box:
                case set_type_1.SetType.commander:
                case set_type_1.SetType.conspiracy:
                case set_type_1.SetType.core:
                case set_type_1.SetType.duel_deck:
                case set_type_1.SetType.expansion:
                case set_type_1.SetType.from_the_vault:
                case set_type_1.SetType.funny:
                case set_type_1.SetType.masterpiece:
                case set_type_1.SetType.masters:
                case set_type_1.SetType.memorabilia:
                case set_type_1.SetType.planechase:
                case set_type_1.SetType.premium_deck:
                case set_type_1.SetType.promo:
                case set_type_1.SetType.starter:
                case set_type_1.SetType.token:
                case set_type_1.SetType.vanguard:
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
        else if (cardCount < 0) {
            throw new Error("card_count must be greater than or equal to 0. *** card_count = " + cardCount);
        }
    };
    Set.validateParentSetCode = function (parentSetCode) {
        if (parentSetCode !== undefined && !utility_1.Utility.isAlphaNumeric(parentSetCode)) {
            throw new Error("parent_set_code must be alphanumeric. *** parent_set_code = " + parentSetCode);
        }
        else if (parentSetCode === "") {
            throw new Error("parent_set_code cannot be empty");
        }
    };
    Set.validateBlockCode = function (blockCode) {
        if (blockCode !== undefined && !utility_1.Utility.isAlphaNumeric(blockCode)) {
            throw new Error("block_code must be alphanumeric. *** block_code = " + blockCode);
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
        if (!validUrl.isWebUri(iconUri)) {
            throw new Error("icon_uri must be a valid URI. *** icon_uri = " + iconUri);
        }
        else if (!(iconUri.substr(iconUri.length - 4) === ".svg")) {
            throw new Error("icon_uri must point to a .svg file. *** icon_uri = " + iconUri);
        }
    };
    return Set;
}());
exports.Set = Set;
//# sourceMappingURL=set.js.map