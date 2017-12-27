/**
 * Represents a Magic: the Gathering card that is a basic reference to another card
 *
 * @export
 * @interface IRelatedCard
 */
export interface IRelatedCard {
    /**
     * The full-text name of this card
     *
     * @type {string}
     * @memberof IRelatedCard
     */
    name: string;

    /**
     * The set code this card is in
     *
     * @type {string}
     * @memberof IRelatedCard
     */
    set_code: string;

    /**
     * The collector number of this card
     *
     * @type {string}
     * @memberof IRelatedCard
     */
    collector_number: string;
}
