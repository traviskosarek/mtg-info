import { Response } from "express";
import * as moment from "moment";
import * as validUrl from "valid-url";

import { SetType } from "./set-type";
import { ISet } from "../interfaces";
import { Utility } from "./utility";

/**
 * Represents a Magic: the Gathering set
 *
 * @export
 * @interface Set
 */
export class Set {
    public static validateJSON(set: ISet) {
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
        } catch (e) {
            throw e;
        }
    }

    public static validateSetCode(setCode: string) {
        if (setCode === undefined) {
            throw new Error("set_code is required");
        }
        else if (setCode === "") {
            throw new Error("set_code cannot be empty");
        }
        else if (!Utility.isAlphaNumeric(setCode)) {
            throw new Error("set_code must be alphanumeric. *** set_code = " + setCode);
        }
    }

    public static validateSetName(setName: string) {
        if (setName === undefined) {
            throw new Error("set_name is required");
        }
        else if (setName === "") {
            throw new Error("set_name cannot be empty");
        }
    }

    public static validateReleaseDate(releaseDate: string) {
        if (!(moment(releaseDate, "YYYY-MM-DD", true).isValid())) {
            throw new Error("release_date must be in the form of YYYY-MM-DD. *** release_date = " + releaseDate);
        }
    }

    public static validateSetType(setType: string) {
        if (setType === "") {
            throw new Error("set_type cannot be empty");
        }
        else {
            switch (setType) {
                case SetType.archenemy:
                case SetType.box:
                case SetType.commander:
                case SetType.conspiracy:
                case SetType.core:
                case SetType.duel_deck:
                case SetType.expansion:
                case SetType.from_the_vault:
                case SetType.funny:
                case SetType.masterpiece:
                case SetType.masters:
                case SetType.memorabilia:
                case SetType.planechase:
                case SetType.premium_deck:
                case SetType.promo:
                case SetType.starter:
                case SetType.token:
                case SetType.vanguard:
                    break;
                default:
                    throw new Error("set_type is not a valid pre-defined value *** set_type = " + setType);
            }
        }
    }

    public static validateCardCount(cardCount: number) {
        if (cardCount === undefined) {
            throw new Error("card_count is required");
        }
        else if (cardCount < 0) {
            throw new Error("card_count must be greater than or equal to 0. *** card_count = " + cardCount);
        }
    }

    public static validateParentSetCode(parentSetCode: string) {
        if (parentSetCode !== undefined && !Utility.isAlphaNumeric(parentSetCode)) {
            throw new Error("parent_set_code must be alphanumeric. *** parent_set_code = " + parentSetCode);
        }
        else if (parentSetCode === "") {
            throw new Error("parent_set_code cannot be empty");
        }
    }

    public static validateBlockCode(blockCode: string) {
        if (blockCode !== undefined && !Utility.isAlphaNumeric(blockCode)) {
            throw new Error("block_code must be alphanumeric. *** block_code = " + blockCode);
        }
        else if (blockCode === "") {
            throw new Error("block_code cannot be empty");
        }
    }

    public static validateBlockName(blockName: string) {
        if (blockName === "") {
            throw new Error("block_name cannot be empty");
        }
    }

    public static validateIconUri(iconUri: string) {
        if (!validUrl.isWebUri(iconUri)) {
            throw new Error("icon_uri must be a valid URI. *** icon_uri = " + iconUri);
        }
        else if (!(iconUri.substr(iconUri.length - 4) === ".svg")) {
            throw new Error("icon_uri must point to a .svg file. *** icon_uri = " + iconUri);
        }
    }
}
