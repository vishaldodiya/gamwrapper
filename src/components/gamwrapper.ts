let gpt: any = {};

class gamWrapper {

    static adSlots: { [id: string]: any; } = {};
    static ads: any;
    public log: {};
    public options: {};

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
                _self.setupAd();
            }
        } );
    }

    public setGpt() {
        gpt = (<any>window).googletag;
    }

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

    public setupAd() {

        gpt.cmd.push( () => {

            let ad: any = {};

            gamWrapper.ads.forEach( ( ad: any ) => {
                let slot = gpt.defineSlot(
                    '/6355419/Travel/Europe/France/Paris',
                    [
                        [300, 250],
                    ],
                    ad.id
                ).addService( gpt.pubads() );

                gamWrapper.adSlots[ ad.id ] = slot;
                gamWrapper.adSlots[ ad.id ].isLoaded = false;
                gamWrapper.adSlots[ ad.id ].canRefresh = false;
                gamWrapper.adSlots[ ad.id ].screenTime = 0;
                gamWrapper.adSlots[ ad.id ].timerId = 0;

                this.bindEvent( gamWrapper.adSlots[ ad.id ] );

                gpt.enableServices();

                let target = document.querySelector( '#' + ad.id );
                let observer = new IntersectionObserver( this.handleIntersect, this.options );
                    
                observer.observe( target );
            } );
        } );
    }

    public renderAd( slotId: string ) {

        let slot = this.getAdSlot( slotId );

        gpt.cmd.push( () => {
            if ( slot && false === slot.isLoaded ) {
                gpt.display( slotId );
            }
        } );
    }

    public bindEvent( slot: any ) {
    
        gpt.pubads().addEventListener( 'slotRequested', ( event: any ) => {
            if ( event.slot === slot ) {
                console.log('Slot has been requested:');
            }
        } );

        gpt.pubads().addEventListener( 'slotRenderEnded', ( event: any ) => {
            if ( event.slot === slot ) {
                slot.isLoaded = true;
                console.log( 'Slot Render Ended' );
            }
        } );

        gpt.pubads().addEventListener( 'impressionViewable', ( event: any ) => {
            if ( event.slot == slot ) {
                console.log( 'Slot Impresssion Viewable' );
                slot.canRefresh = true;
            }
        } );
    }

    public refreshAd( slot: any ) {
        gpt.cmd.push( () => {
            if ( slot && true === slot.canRefresh ) {
                gpt.pubads().refresh( [ slot ] );
                slot.screenTime = 0;
                console.log( 'Ad refreshed' );
            }
        } );
    }

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

    public resetTimer( slotId: string ) {

        let slot = this.getAdSlot( slotId );

        if ( slot && 0 !== slot.timerId ) {
            clearInterval( slot.timerId );
            slot.timerId = 0;
            console.log( 'Timer Reset: ' + slotId );
        }
    }

    public getAdSlot( slotId: string ) {
        return ( slotId && gamWrapper.adSlots[ slotId ] ) ? gamWrapper.adSlots[ slotId ] : false;
    }
}

export default new gamWrapper();