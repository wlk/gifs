import {Injectable} from 'angular2/core';
import {Platform} from 'ionic/ionic';

@Injectable()
export class Ads {
    constructor(platform:Platform) {
        this.sessionGifViews = 0;
        this.platform = platform;
        this.admobid = {};

        this.testing = true;

        this.platform.ready().then(() => {
            if (/(android)/i.test(navigator.userAgent)) { // for android & amazon-fireos
                this.admobid = {
                    banner: 'ca-app-pub-5829945009169600/7279897964',
                    interstitial: 'ca-app-pub-5829945009169600/6050719960'
                };
            } else if (/(ipod|iphone|ipad)/i.test(navigator.userAgent)) { // for ios
                this.admobid = {
                    banner: 'ca-app-pub-5829945009169600/1233364361',
                    interstitial: 'ca-app-pub-xxx/kkk' // TODO
                };
            } else { // for windows phone
                this.admobid = {
                    banner: 'ca-app-pub-5829945009169600/4186830760',
                    interstitial: 'ca-app-pub-xxx/kkk' // TODO
                };
            }

            if (AdMob) {
                AdMob.createBanner({
                    isTesting: this.testing,
                    adId: this.admobid.banner,
                    position: AdMob.AD_POSITION.TOP_CENTER,
                    autoShow: true
                });

                this.preloadInterstitial();
            }
        });
    }

    registerItemView() {
        this.sessionGifViews++;
        this.maybeShowInterstitial();
    }

    preloadInterstitial() {
        AdMob.prepareInterstitial({adId: this.admobid.interstitial, autoShow: false, isTesting: this.testing});
    }

    maybeShowInterstitial() {
        this.platform.ready().then(() => {
            if (this.sessionGifViews >= 8 && this.sessionGifViews % 8 == 0) {
                AdMob.showInterstitial();
                this.preloadInterstitial();
            }
        });
    }
}