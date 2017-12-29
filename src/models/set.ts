import { Response } from "express";
import * as moment from "moment";
import * as validUrl from "valid-url";

import { SetType } from "../enums";
import { ISet } from "../interfaces";
import { Utility } from "./utility";

/**
 * Represents a Magic: the Gathering set
 *
 * @export
 * @interface Set
 */
export class Set {
    public static createSet(set: any): any {
        this.validateSet(set);

        let newSet: ISet = {
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

        return newSet;
    }

    public static validateSet(set: any) {
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
        } catch (e) {
            throw e;
        }
    }

    public static validateSetCode(setCode: any) {
        if (setCode === undefined) {
            throw new Error("set_code is required");
        }
        else if (setCode === "") {
            throw new Error("set_code cannot be empty");
        }
        else if (!Utility.isAlphaNumeric(setCode)) {
            throw new Error("set_code must be alphanumeric *** set_code = " + setCode);
        }
    }

    public static validateSetName(setName: any) {
        if (setName === undefined) {
            throw new Error("set_name is required");
        }
        else if (setName === "") {
            throw new Error("set_name cannot be empty");
        }
    }

    public static validateReleaseDate(releaseDate: any) {
        if (releaseDate !== undefined && !(moment(releaseDate, "YYYY-MM-DD", true).isValid())) {
            throw new Error("release_date must be in the form of YYYY-MM-DD *** release_date = " + releaseDate);
        }
    }

    public static validateSetType(setType: any) {
        if (setType === undefined) {
            throw new Error("set_type is required");
        }
        else if (setType === "") {
            throw new Error("set_type cannot be empty");
        }
        else {
            switch (setType) {
                case SetType.Archenemy:
                case SetType.Box:
                case SetType.Commander:
                case SetType.Conspiracy:
                case SetType.Core:
                case SetType.DuelDeck:
                case SetType.Expansion:
                case SetType.FromTheVault:
                case SetType.Funny:
                case SetType.Masterpiece:
                case SetType.Masters:
                case SetType.Memorabilia:
                case SetType.Planechase:
                case SetType.PremiumDeck:
                case SetType.Promo:
                case SetType.Starter:
                case SetType.Token:
                case SetType.Vanguard:
                    break;
                default:
                    throw new Error("set_type is not a valid pre-defined value *** set_type = " + setType);
            }
        }
    }

    public static validateCardCount(cardCount: any) {
        if (cardCount === undefined) {
            throw new Error("card_count is required");
        }
        else if (isNaN(cardCount)) {
            throw new Error("card_count must be a number");
        }
        else if (cardCount < 0) {
            throw new Error("card_count must be greater than or equal to 0 *** card_count = " + cardCount);
        }
    }

    public static validateParentSetCode(parentSetCode: any) {
        if (parentSetCode !== undefined && !Utility.isAlphaNumeric(parentSetCode)) {
            throw new Error("parent_set_code must be alphanumeric *** parent_set_code = " + parentSetCode);
        }
        else if (parentSetCode === "") {
            throw new Error("parent_set_code cannot be empty");
        }
    }

    public static validateIsDigital(isDigital: any) {
        if (isDigital !== undefined && !(typeof (isDigital) === "boolean")) {
            throw new Error("is_digital must be of type boolean *** is_digital = " + isDigital);
        }
    }

    public static validateIsFoil(isFoil: any) {
        if (isFoil !== undefined && !(typeof (isFoil) === "boolean")) {
            throw new Error("is_foil must be of type boolean *** is_foil = " + isFoil);
        }
    }

    public static validateBlockCode(blockCode: any) {
        if (blockCode !== undefined && !Utility.isAlphaNumeric(blockCode)) {
            throw new Error("block_code must be alphanumeric *** block_code = " + blockCode);
        }
        else if (blockCode === "") {
            throw new Error("block_code cannot be empty");
        }
    }

    public static validateBlockName(blockName: any) {
        if (blockName === "") {
            throw new Error("block_name cannot be empty");
        }
    }

    public static validateIconUri(iconUri: any) {
        if (iconUri !== undefined) {
            if (!validUrl.isWebUri(iconUri)) {
                throw new Error("icon_uri must be a valid URI *** icon_uri = " + iconUri);
            }
            else if (!(iconUri.substr(iconUri.length - 4) === ".svg")) {
                throw new Error("icon_uri must point to a .svg file *** icon_uri = " + iconUri);
            }
        }    
    }
}
