"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var gpt = {}; // Create global gpt variable, @todo: try adding it as static in class.
/**
 * Google Ad Manager Wrapper class.
 */
var gamWrapper = /** @class */ (function () {
    /**
     * Class gamWrapper constructor.
     */
    function gamWrapper() {
        var _self = this;
        this.log = document.querySelector('#log');
        this.options = {
            root: null,
            rootMargin: '0px',
            threshold: 0.75
        };
        gamWrapper.ads = document.querySelectorAll('.gamwrapper-ad');
        window.addEventListener('load', function (event) {
            if (window.googletag && window.googletag.apiReady) {
                _self.setGpt();
                _self.setupAd(window.adConfig || false);
            }
        });
    }
    /**
     * Assign googletag object to gpt variable.
     */
    gamWrapper.prototype.setGpt = function () {
        gpt = window.googletag;
    };
    /**
     * Intersection observer call back to handle element intersection in viewport.
     *
     * @param entries list of all elements under observation.
     * @param observer instance of observer.
     */
    gamWrapper.prototype.handleIntersect = function (entries, observer) {
        entries.forEach(function (entry) {
            if (0.75 < entry.intersectionRatio) {
                this.renderAd(entry.target.id);
                this.setTimer(entry.target.id);
            }
            else {
                this.resetTimer(entry.target.id);
            }
        }, new gamWrapper());
    };
    /**
     * Does initial Setup of Ads.
     */
    gamWrapper.prototype.setupAd = function (adConfig) {
        var _this = this;
        if (!adConfig) {
            return;
        }
        gpt.cmd.push(function () {
            var ad = {}; // @todo: If not needed remove it.
            gamWrapper.ads.forEach(function (ad) {
                if (!adConfig[ad.id]) {
                    return;
                }
                // Create slot.
                var slot = gpt.defineSlot(adConfig[ad.id].path, adConfig[ad.id].size, ad.id).addService(gpt.pubads());
                if (adConfig[ad.id].targeting) {
                    for (var key in adConfig[ad.id].targeting) {
                        slot.setTargeting(key, adConfig[ad.id].targeting[key]);
                    }
                }
                // Assign custom object keys.
                gamWrapper.adSlots[ad.id] = slot;
                gamWrapper.adSlots[ad.id].isLoaded = false;
                gamWrapper.adSlots[ad.id].canRefresh = false;
                gamWrapper.adSlots[ad.id].screenTime = 0;
                gamWrapper.adSlots[ad.id].timerId = 0;
                // Bind events.
                _this.bindEvent(gamWrapper.adSlots[ad.id]);
                gpt.enableServices();
                // Get the Ad div and assign observer.
                var target = document.querySelector('#' + ad.id);
                var observer = new IntersectionObserver(_this.handleIntersect, _this.options);
                observer.observe(target);
            });
        });
    };
    /**
     * To first time display Ad on screen.
     *
     * @param slotId Ad Slot Id.
     */
    gamWrapper.prototype.renderAd = function (slotId) {
        var slot = this.getAdSlot(slotId);
        gpt.cmd.push(function () {
            if (slot && false === slot.isLoaded) {
                gpt.display(slotId);
            }
        });
    };
    /**
     * Bind events to Ad slots.
     *
     * @param slot Ad slot googletag object.
     */
    gamWrapper.prototype.bindEvent = function (slot) {
        // Called when Ad first requested.
        gpt.pubads().addEventListener('slotRequested', function (event) {
            if (event.slot === slot) {
                console.log('Slot has been requested:');
            }
        });
        // Called when Ad gets rendered.
        gpt.pubads().addEventListener('slotRenderEnded', function (event) {
            if (event.slot === slot) {
                slot.isLoaded = true;
                console.log('Slot Render Ended');
            }
        });
        // Called when Ad is in viewport and ready to count as impression.
        gpt.pubads().addEventListener('impressionViewable', function (event) {
            if (event.slot == slot) {
                console.log('Slot Impresssion Viewable');
                slot.canRefresh = true;
            }
        });
    };
    /**
     * Refresh one particular Ad slot.
     *
     * @param slot Ad slot googletag object.
     */
    gamWrapper.prototype.refreshAd = function (slot) {
        gpt.cmd.push(function () {
            if (slot && true === slot.canRefresh) {
                gpt.pubads().refresh([slot]);
                slot.screenTime = 0;
                console.log('Ad refreshed');
            }
        });
    };
    /**
     * Set timer to Ad slot to keep track of Ad's screen time.
     * Also, Refreshes Ad after every 30 second of total screen time in view port.
     *
     * @param slotId Ad Slot Id.
     */
    gamWrapper.prototype.setTimer = function (slotId) {
        var _this = this;
        var slot = this.getAdSlot(slotId);
        if (slot && 0 === slot.timerId) {
            slot.timerId = setInterval(function () {
                slot.screenTime += 1;
                console.log(slotId + ' Screen Time: ' + slot.screenTime);
                if (30 < slot.screenTime) {
                    console.log(slotId + ' Screen Time > 30s');
                    _this.refreshAd(slot);
                }
            }, 1000);
            console.log('Timer set: ' + slotId);
        }
    };
    /**
     * Reset timer on Ad slot, It clears assigned interval when Ad is not in view port.
     *
     * @param slotId Ad Slot Id.
     */
    gamWrapper.prototype.resetTimer = function (slotId) {
        var slot = this.getAdSlot(slotId);
        if (slot && 0 !== slot.timerId) {
            clearInterval(slot.timerId);
            slot.timerId = 0;
            console.log('Timer Reset: ' + slotId);
        }
    };
    /**
     * Returns Ad slot object if slotId is valid else false.
     *
     * @param slotId Ad Slot Id.
     *
     * @returns Ad slot googletag object.
     */
    gamWrapper.prototype.getAdSlot = function (slotId) {
        return (slotId && gamWrapper.adSlots[slotId]) ? gamWrapper.adSlots[slotId] : false;
    };
    /**
     * Contains all Ad slots.
     */
    gamWrapper.adSlots = {};
    return gamWrapper;
}());
exports.default = gamWrapper;
//# sourceMappingURL=gamwrapper.js.map