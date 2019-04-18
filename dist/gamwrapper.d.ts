/**
 * Google Ad Manager Wrapper class.
 */
export default class gamWrapper {
    /**
     * Contains all Ad slots.
     */
    static adSlots: {
        [id: string]: any;
    };
    /**
     * Contains all Ads div present on page.
     */
    static ads: any;
    /**
     * Element for display debugging log.
     * @todo Nothing has been done yet. Use it or update it.
     */
    log: {};
    /**
     * Intersection observer Options object.
     */
    options: {};
    /**
     * Class gamWrapper constructor.
     */
    constructor();
    /**
     * Assign googletag object to gpt variable.
     */
    setGpt(): void;
    /**
     * Intersection observer call back to handle element intersection in viewport.
     *
     * @param entries list of all elements under observation.
     * @param observer instance of observer.
     */
    handleIntersect(entries: Array<object>, observer: object): void;
    /**
     * Does initial Setup of Ads.
     */
    setupAd(adConfig: any): void;
    /**
     * To first time display Ad on screen.
     *
     * @param slotId Ad Slot Id.
     */
    renderAd(slotId: string): void;
    /**
     * Bind events to Ad slots.
     *
     * @param slot Ad slot googletag object.
     */
    bindEvent(slot: any): void;
    /**
     * Refresh one particular Ad slot.
     *
     * @param slot Ad slot googletag object.
     */
    refreshAd(slot: any): void;
    /**
     * Set timer to Ad slot to keep track of Ad's screen time.
     * Also, Refreshes Ad after every 30 second of total screen time in view port.
     *
     * @param slotId Ad Slot Id.
     */
    setTimer(slotId: string): void;
    /**
     * Reset timer on Ad slot, It clears assigned interval when Ad is not in view port.
     *
     * @param slotId Ad Slot Id.
     */
    resetTimer(slotId: string): void;
    /**
     * Returns Ad slot object if slotId is valid else false.
     *
     * @param slotId Ad Slot Id.
     *
     * @returns Ad slot googletag object.
     */
    getAdSlot(slotId: string): any;
}
