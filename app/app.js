import {App, IonicApp, Platform, Storage, SqlStorage} from 'ionic/ionic';

import {SearchPage} from './pages/search/search';
import {MostPopularPage} from './pages/mostPopular/mostPopular';
import {FavouritesPage} from './pages/favourites/favourites';

import {Giphy} from './providers/giphy';
import {FavouritesDB} from './providers/favouritesDB';

@App({
    templateUrl: 'build/app.html',
    providers: [Giphy, FavouritesDB]
})
class MyApp {
    constructor(app:IonicApp, platform:Platform) {
        this.app = app;
        this.platform = platform;
        this.initializeApp();

        // set our app's pages
        this.pages = [
            {title: 'Top GIFs', component: MostPopularPage},
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
                if (device.platform === "Android") {
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
