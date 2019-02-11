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
            threshold: 1
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
            if ( 1 === entry.intersectionRatio ) {
                this.renderAd( entry.target.id );
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

                this.bindEvent( gamWrapper.adSlots[ ad.id ] );

                gpt.enableServices();

                let target = document.querySelector( '#' + ad.id );
                let observer = new IntersectionObserver( this.handleIntersect, this.options );
                    
                observer.observe( target );
            } );
        } );
    }

    public renderAd( slotId: string ) {
        gpt.cmd.push( () => {
            if ( gamWrapper.adSlots[ slotId ] && false === gamWrapper.adSlots[ slotId ].isLoaded ) {
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
}

export default new gamWrapper();