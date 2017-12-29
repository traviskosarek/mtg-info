/**
 * Represents URIs related to a specific card
 *
 * @export
 * @interface ICardRelatedLinks
 */
export interface ICardRelatedLinks {
    /**
     * A URI linking to this card on Gatherer
     *
     * @type {string}
     * @memberof ICardRelatedLinks
     */
    gatherer: string;

    /**
     * A URI linking to this card on TCGPlayer
     *
     * @type {string}
     * @memberof ICardRelatedLinks
     */
    tcgplayer: string;

    /**
     * A URI linking to this card on EDHREC
     *
     * @type {string}
     * @memberof ICardRelatedLinks
     */
    edhrec: string;

    /**
     * A URI linking to this card on MTG Top 8
     *
     * @type {string}
     * @memberof ICardRelatedLinks
     */
    mtgtop8: string;
}
