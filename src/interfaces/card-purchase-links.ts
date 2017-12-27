/**
 * Represents URIs where this card could be purchased
 *
 * @export
 * @interface ICardPurchaseLinks
 */
export interface ICardPurchaseLinks {
    /**
     * A URI linking to this card's results on Amazon
     *
     * @type {string}
     * @memberof ICardPurchaseLinks
     */
    amazon: string;

    /**
     * A URI linking to this card's results on eBay
     *
     * @type {string}
     * @memberof ICardPurchaseLinks
     */
    ebay: string;

    /**
     * A URI linking to this card's results on TCGPlayer
     *
     * @type {string}
     * @memberof ICardPurchaseLinks
     */
    tcgplayer: string;

    /**
     * A URI linking to this card's results on Magic Card Market
     *
     * @type {string}
     * @memberof ICardPurchaseLinks
     */
    magiccardmarket: string;

    /**
     * A URI linking to this card's results on Card Hoarder
     *
     * @type {string}
     * @memberof ICardPurchaseLinks
     */
    cardhoarder: string;

    /**
     * A URI linking to this card's results on Card Kingdom
     *
     * @type {string}
     * @memberof ICardPurchaseLinks
     */
    card_kingdom: string;

    /**
     * A URI linking to this card's results on MTGO Traders
     *
     * @type {string}
     * @memberof ICardPurchaseLinks
     */
    mtgo_traders: string;

    /**
     * A URI linking to this card's results on CoolStuffInc
     *
     * @type {string}
     * @memberof ICardPurchaseLinks
     */
    coolstuffinc: string;
}
