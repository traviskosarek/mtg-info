/**
 * Represents Magic: the Gathering card legality
 *
 * @export
 * @interface ICardLegality
 */
export interface ICardLegality {
    /**
     * Returns if this card is legal in the standard format or not
     *
     * @type {boolean}
     * @memberof ICardLegality
     */
    is_standard_legal: boolean;

    /**
     * Returns if this card is legal in the frontier format or not
     *
     * @type {boolean}
     * @memberof ICardLegality
     */
    is_frontier_legal: boolean;

    /**
     * Returns if this card is legal in the modern format or not
     *
     * @type {boolean}
     * @memberof ICardLegality
     */
    is_modern_legal: boolean;

    /**
     * Returns if this card is legal in the pauper format or not
     *
     * @type {boolean}
     * @memberof ICardLegality
     */
    is_pauper_legal: boolean;

    /**
     * Returns if this card is legal in the legacy format or not
     *
     * @type {boolean}
     * @memberof ICardLegality
     */
    is_legacy_legal: boolean;

    /**
     * Returns if this card is legal in the penny format or not
     *
     * @type {boolean}
     * @memberof ICardLegality
     */
    is_penny_legal: boolean;

    /**
     * Returns if this card is legal in the vintage format or not
     *
     * @type {boolean}
     * @memberof ICardLegality
     */
    is_vintage_legal: boolean;

    /**
     * Returns if this card is legal in the duel format or not
     *
     * @type {boolean}
     * @memberof ICardLegality
     */
    is_duel_legal: boolean;

    /**
     * Returns if this card is legal in the commander format or not
     *
     * @type {boolean}
     * @memberof ICardLegality
     */
    is_commander_legal: boolean;

    /**
     * Returns if this card is legal in the 1v1 format or not
     *
     * @type {boolean}
     * @memberof ICardLegality
     */
    is_one_versus_one_legal: boolean;

    /**
     * Returns if this card is legal in the future format or not
     *
     * @type {boolean}
     * @memberof ICardLegality
     */
    is_future_legal: boolean;
}
