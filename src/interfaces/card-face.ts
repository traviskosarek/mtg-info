/**
 * Represents a Magic: the Gathering card face
 * 
 * @export
 * @interface ICardFace
 */
export interface ICardFace {
    
    /**
     * The full-text name of this card
     *
     * @type {string}
     * @memberof ICardFace
     */
    name: string;

    /**
     * The full-text type line of this card face
     *
     * @type {string}
     * @memberof ICardFace
     */
    type_line: string;

    /**
     * The oracle text for this card face, if any
     *
     * @type {?string}
     * @memberof ICardFace
     */
    oracle_text: string;

    /**
     * The mana cost of this card face represented by symbols
     *
     * @type {string}
     * @memberof ICardFace
     */
    mana_cost: string;

    /**
     * The colors of this card face
     *
     * @type {string[]}
     * @memberof ICardFace
     */
    colors: string[];

    /**
     * The colors in this card face's color indicator, if any
     *
     * @type {?string[]}
     * @memberof ICardFace
     */
    color_indicator: string[];

    /**
     * The power (attack) of this card face, if any
     *
     * @type {?string}
     * @memberof ICardFace
     */
    power: string;

    /**
     * The toughness (defense) of this card face, if any
     *
     * @type {?string}
     * @memberof ICardFace
     */
    toughness: string;

    /**
     * The loyalty of this card face, if any
     *
     * @type {?string}
     * @memberof ICardFace
     */
    loyalty: string;

    /**
     * The flavor text printed on this card face, if any
     *
     * @type {?string}
     * @memberof ICardFace
     */
    flavor_text: string;

    /**
     * The PNG of this card face, if any
     *
     * @type {?string}
     * @memberof ICardFace
     */
    image_uri: string;
}
