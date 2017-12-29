import { ICardFace } from "./card-face";
import { ICardLegality } from "./card-legality";
import { IRelatedCard } from "./related-card";
import { ICardRelatedLinks } from "./card-related-links";
import { ICardPurchaseLinks } from "./card-purchase-links";
/**
 * Represents a Magic: the Gathering card
 *
 * @export
 * @interface ICard
 */
export interface ICard {
    /**
     * The identifiers of this card's multiverse IDs on Gatherer, if any
     *
     * @type {?string[]}
     * @memberof ICard
     */
    multiverse_ids: number[];

    /**
     * The full-text name of this card
     *
     * @type {string}
     * @memberof ICard
     */
    name: string;

    /**
     * The layout type of this card
     *
     * @type {string}
     * @memberof ICard
     */
    layout: string;

    /**
     * The card's converted mana cost
     *
     * @type {number}
     * @memberof ICard
     */
    converted_mana_cost: number;

    /**
     * The full-text type line of this card
     *
     * @type {string}
     * @memberof ICard
     */
    type_line: string;

    /**
     * The oracle text for this card, if any
     *
     * @type {?string}
     * @memberof ICard
     */
    oracle_text: string;

    /**
     * The mana cost of this card represented by symbols
     *
     * @type {string}
     * @memberof ICard
     */
    mana_cost: string;

    /**
     * The power (attack) of this card, if any
     *
     * @type {?string}
     * @memberof ICard
     */
    power: string;

    /**
     * The toughness (defense) of this card, if any
     *
     * @type {?string}
     * @memberof ICard
     */
    toughness: string;

    /**
     * The loyalty of this card, if any
     *
     * @type {?string}
     * @memberof ICard
     */
    loyalty: string;

    /**
     * This card's life modifier, if it is a Vanguard card. This value will contain a delta.
     *
     * @type {?string}
     * @memberof ICard
     */
    life_modifer: string;

    /**
     * This card's hand modifier, if it is a Vanguard card. This value will contain a delta
     *
     * @type {string}
     * @memberof ICard
     */
    hand_modifier: string;

    /**
     * The colors of this card
     *
     * @type {string[]}
     * @memberof ICard
     */
    colors: string[];

    /**
     * The colors in this card's color indicator, if any
     *
     * @type {?string[]}
     * @memberof ICard
     */
    color_indicator: string[];

    /**
     * The color identity of this card
     *
     * @type {string[]}
     * @memberof ICard
     */
    color_identity: string[];

    /**
     * Cards related to this card
     *
     * @type {IRelatedCard[]}
     * @memberof ICard
     */
    related_cards: IRelatedCard[];

    /**
     * The faces of this card, if any
     *
     * @type {?ICardFace[]}
     * @memberof ICard
     */
    card_faces: ICardFace[];

    /**
     * An object representing the various formats this card is legal in
     *
     * @type {ICardLegality}
     * @memberof ICard
     */
    legality: ICardLegality;

    /**
     * Returns if this card is on the reserved list or not
     *
     * @type {boolean}
     * @memberof ICard
     */
    is_reserved: boolean;

    /**
     * This card's overall rank/popularity on EDHREC
     *
     * @type {?number}
     * @memberof ICard
     */
    edhrec_rank: number;

    /**
     * The set code this card is in
     *
     * @type {string}
     * @memberof ICard
     */
    set_code: string;

    /**
     * The full-text name of the set this card is in
     *
     * @type {string}
     * @memberof ICard
     */
    set_name: string;

    /**
     * The collector number of this card
     *
     * @type {string}
     * @memberof ICard
     */
    collector_number: string;

    /**
     * A URI that points to a PNG image of this card
     *
     * @type {?string}
     * @memberof ICard
     */
    image_uri: string;

    /**
     * Returns if this card is a reprint or not
     *
     * @type {boolean}
     * @memberof ICard
     */
    is_reprint: boolean;

    /**
     * Returns if this card is a digital card on Magic Online or not
     *
     * @type {boolean}
     * @memberof ICard
     */
    is_digital: boolean;

    /**
     * The rarity of the card
     *
     * @type {string}
     * @memberof ICard
     */
    rarity: string;

    /**
     * The flavor text of this card, if any
     *
     * @type {?string}
     * @memberof ICard
     */
    flavor_text: string;

    /**
     * The artist who created the artwork for this card, if available
     *
     * @type {?string}
     * @memberof ICard
     */
    artist: string;

    /**
     * The frame type of this card
     *
     * @type {string}
     * @memberof ICard
     */
    frame: string;

    /**
     * Returns if this card is full art or not
     *
     * @type {boolean}
     * @memberof ICard
     */
    is_full_art: boolean;

    /**
     * The watermark representing this card
     *
     * @type {?string}
     * @memberof ICard
     */
    watermark: string;

    /**
     * The border color type of this card
     *
     * @type {string}
     * @memberof ICard
     */
    border_color: string;

    /**
     * This card's story spotlight number, if any
     *
     * @type {?number}
     * @memberof ICard
     */
    story_spotlight_number: number;

    /**
     * A url to this card's story spotlight article, if any
     *
     * @type {?string}
     * @memberof ICard
     */
    story_spotlight_uri: string;

    /**
     * Returns if this card is timeshifted or not
     *
     * @type {boolean}
     * @memberof ICard
     */
    is_timeshifted: boolean;

    /**
     * Returns if this card is colorshifted or not
     *
     * @type {boolean}
     * @memberof ICard
     */
    is_colorshifted: boolean;

    /**
     * Returns if this card is futureshifted or not
     *
     * @type {boolean}
     * @memberof ICard
     */
    is_futureshifted: boolean;

    /**
     * The current value of this card in USD
     *
     * @type {string}
     * @memberof ICard
     */
    usd_price: string;

    /**
     * The current value of this card in tix
     *
     * @type {string}
     * @memberof ICard
     */
    tix_price: string;

    /**
     * The current value of this card in EUR
     *
     * @type {string}
     * @memberof ICard
     */
    eur_price: string;

    /**
     * An object representing related links to this card
     *
     * @type {ICardRelatedLinks}
     * @memberof ICard
     */
    related_links: ICardRelatedLinks;

    /**
     * An object representing links where this card could be purchased
     *
     * @type {ICardPurchaseLinks}
     * @memberof ICard
     */
    purchase_links: ICardPurchaseLinks;
}
