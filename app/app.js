import {App, IonicApp, Platform, Storage, SqlStorage} from 'ionic/ionic';

import {SearchPage} from './pages/search/search';
import {MostPopularPage} from './pages/mostPopular/mostPopular';
import {FavouritesPage} from './pages/favourites/favourites';

import {Giphy} from './providers/giphy';
import {FavouritesDB} from './providers/favouritesDB';
import {Ads} from './providers/ads';

@App({
    templateUrl: 'build/app.html',
    providers: [Giphy, FavouritesDB, Ads]
})
class MyApp {
    constructor(app:IonicApp, platform:Platform, ads:Ads) {
        this.app = app;
        this.platform = platform;
        this.ads = ads;
        this.initializeApp();

        this.pages = [
            {title: 'Top Gifs', component: MostPopularPage},
            {title: 'Search', component: SearchPage},
            {title: 'Favourites', component: FavouritesPage}
        ];

        this.rootPage = MostPopularPage;
    }

    initializeApp() {
        this.platform.ready().then(() => {
            if (typeof StatusBar !== 'undefined') {
                StatusBar.styleDefault();
            }

            if (typeof analytics !== 'undefined') {
                if (/(android)/i.test(navigator.userAgent)) {
                    analytics.startTrackerWithId("UA-54524356-18"); //Android
                } else {
                    analytics.startTrackerWithId("UA-54524356-19"); //iOS
                }
            } else { // Windows
                console.log("Google Analytics Unavailable");
            }
        });
    }

    openPage(page) {
        let nav = this.app.getComponent('nav');
        nav.setRoot(page.component).then(() => {
            this.app.getComponent('leftMenu').close();
        });
    }
}
