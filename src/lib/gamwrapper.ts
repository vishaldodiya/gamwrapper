let gpt: any = {}; // Create global gpt variable, @todo: try adding it as static in class.

/**
 * Google Ad Manager Wrapper class. 
 */
export class gamWrapper {

    /**
     * Contains all Ad slots.
     */
    static adSlots: { [id: string]: any; } = {};

    /**
     * Contains all Ads div present on page.
     */
    static ads: any;

    /**
     * Element for display debugging log.
     * @todo Nothing has been done yet. Use it or update it.
     */
    public log: {};

    /**
     * Intersection observer Options object.
     */
    public options: {};

    /** 
     * Class gamWrapper constructor.
     */
    constructor() {

        let _self = this;
        this.log = document.querySelector( '#log' );
        this.options = {
            root: null,
            rootMargin: '0px',
            threshold: 0.75
        };

        gamWrapper.ads = document.querySelectorAll( '.gamwrapper-ad' );

        window.addEventListener( 'load', function(event) {
            if ( (<any>window).googletag && (<any>window).googletag.apiReady ) {
                _self.setGpt();
                _self.setupAd( (<any>window).adConfig || false );
            }
        } );
    }

    /** 
     * Assign googletag object to gpt variable. 
     */
    public setGpt() {
        gpt = (<any>window).googletag;
    }

    /**
     * Intersection observer call back to handle element intersection in viewport.
     *
     * @param entries list of all elements under observation.
     * @param observer instance of observer.
     */
    public handleIntersect( entries: Array<object>, observer: object ) {

        entries.forEach( function( entry: any ) {
            if ( 0.75 < entry.intersectionRatio ) {
                this.renderAd( entry.target.id );
                this.setTimer( entry.target.id );
            } else {
                this.resetTimer( entry.target.id );
            }
        }, new gamWrapper() );
    }

    /**
     * Does initial Setup of Ads. 
     */
    public setupAd( adConfig: any ) {

        if ( ! adConfig ) {
            return;
        }

        gpt.cmd.push( () => {

            let ad: any = {}; // @todo: If not needed remove it.

            gamWrapper.ads.forEach( ( ad: any ) => {

                if ( ! adConfig[ ad.id ] ) {
                    return;
                }
                // Create slot.
                let slot = gpt.defineSlot(
                    adConfig[ ad.id ].path,
                    adConfig[ ad.id ].size,
                    ad.id
                ).addService( gpt.pubads() );

                if ( adConfig[ ad.id ].targeting ) {
                    for ( let key in adConfig[ ad.id ].targeting ) {
                        slot.setTargeting( key, adConfig[ ad.id ].targeting[ key ] );
                    }
                }

                // Assign custom object keys.
                gamWrapper.adSlots[ ad.id ] = slot;
                gamWrapper.adSlots[ ad.id ].isLoaded = false;
                gamWrapper.adSlots[ ad.id ].canRefresh = false;
                gamWrapper.adSlots[ ad.id ].screenTime = 0;
                gamWrapper.adSlots[ ad.id ].timerId = 0;

                // Bind events.
                this.bindEvent( gamWrapper.adSlots[ ad.id ] );

                gpt.enableServices();

                // Get the Ad div and assign observer.
                let target = document.querySelector( '#' + ad.id );
                let observer = new IntersectionObserver( this.handleIntersect, this.options ); 
                observer.observe( target );
            } );
        } );
    }

    /**
     * To first time display Ad on screen.
     *
     * @param slotId Ad Slot Id.
     */
    public renderAd( slotId: string ) {

        let slot = this.getAdSlot( slotId );

        gpt.cmd.push( () => {
            if ( slot && false === slot.isLoaded ) {
                gpt.display( slotId );
            }
        } );
    }

    /**
     * Bind events to Ad slots.
     *
     * @param slot Ad slot googletag object.
     */
    public bindEvent( slot: any ) {
    
        // Called when Ad first requested.
        gpt.pubads().addEventListener( 'slotRequested', ( event: any ) => {
            if ( event.slot === slot ) {
                console.log('Slot has been requested:');
            }
        } );

        // Called when Ad gets rendered.
        gpt.pubads().addEventListener( 'slotRenderEnded', ( event: any ) => {
            if ( event.slot === slot ) {
                slot.isLoaded = true;
                console.log( 'Slot Render Ended' );
            }
        } );

        // Called when Ad is in viewport and ready to count as impression.
        gpt.pubads().addEventListener( 'impressionViewable', ( event: any ) => {
            if ( event.slot == slot ) {
                console.log( 'Slot Impresssion Viewable' );
                slot.canRefresh = true;
            }
        } );
    }

    /**
     * Refresh one particular Ad slot.
     *
     * @param slot Ad slot googletag object.
     */
    public refreshAd( slot: any ) {
        gpt.cmd.push( () => {
            if ( slot && true === slot.canRefresh ) {
                gpt.pubads().refresh( [ slot ] );
                slot.screenTime = 0;
                console.log( 'Ad refreshed' );
            }
        } );
    }

    /**
     * Set timer to Ad slot to keep track of Ad's screen time.
     * Also, Refreshes Ad after every 30 second of total screen time in view port.
     *
     * @param slotId Ad Slot Id.
     */
    public setTimer( slotId: string ) {

        let slot = this.getAdSlot( slotId );

        if ( slot && 0 === slot.timerId ) {

            slot.timerId = setInterval( () => {
                slot.screenTime += 1;
                console.log( slotId + ' Screen Time: ' + slot.screenTime );
                if ( 30 < slot.screenTime ) {
                    console.log( slotId + ' Screen Time > 30s' );
                    this.refreshAd( slot );
                }
            }, 1000 );
            console.log( 'Timer set: ' + slotId );
        }
    }

    /**
     * Reset timer on Ad slot, It clears assigned interval when Ad is not in view port.
     *
     * @param slotId Ad Slot Id.
     */
    public resetTimer( slotId: string ) {

        let slot = this.getAdSlot( slotId );

        if ( slot && 0 !== slot.timerId ) {
            clearInterval( slot.timerId );
            slot.timerId = 0;
            console.log( 'Timer Reset: ' + slotId );
        }
    }

    /**
     * Returns Ad slot object if slotId is valid else false.
     *
     * @param slotId Ad Slot Id.
     *
     * @returns Ad slot googletag object.
     */
    public getAdSlot( slotId: string ) {
        return ( slotId && gamWrapper.adSlots[ slotId ] ) ? gamWrapper.adSlots[ slotId ] : false;
    }
}
