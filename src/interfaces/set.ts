/**
 * Represents a Magic: the Gathering set
 *
 * @export
 * @interface ISet
 */
export interface ISet {
    /**
     * The unqiue set code identifying this set
     *
     * @type {string}
     * @memberof ISet
     */
    set_code: string;

    /**
     * The full-text name of the unique set
     *
     * @type {string}
     * @memberof ISet
     */
    set_name: string;

    /**
     * The release date of this set, if known
     * 
     * @type {?string}
     * @memberof ISet
     */
    release_date: string;

    /**
     * The category of the type of set
     *
     * @type {string}
     * @memberof ISet
     */
    set_type: string;

    /**
     * The number of unique cards in the set
     *
     * @type {number}
     * @memberof ISet
     */
    card_count: number;

    /**
     * The code of the parent set in the block
     *
     * @type {string}
     * @memberof ISet
     */
    parent_set_code: string;

    /**
     * Is 'true' if this set was only released digitally
     *
     * @type {boolean}
     * @memberof ISet
     */
    is_digital: boolean;

    /**
     * Is 'true' if this set only contains foil cards
     *
     * @type {boolean}
     * @memberof ISet
     */
    is_foil: boolean;

    /**
     * The unique code representing the block this set is in, if any
     *
     * @type {?string}
     * @memberof ISet
     */
    block_code: string;

    /**
     * The full-text name of the block containing this set, if any
     *
     * @type {?string}
     * @memberof ISet
     */
    block_name: string;

    /**
     * A URI pointing to an svg that is the icon for this set
     *
     * @type {string}
     * @memberof ISet
     */
    icon_uri: string;
}
