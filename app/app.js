import {App, IonicApp, Platform, Storage, SqlStorage} from 'ionic/ionic';

import {SearchPage} from './pages/search/search';
import {MostPopularPage} from './pages/mostPopular/mostPopular';
import {FavouritesPage} from './pages/favourites/favourites';

import {GifSearch} from './providers/gif-search';

@App({
    templateUrl: 'build/app.html',
    providers: [GifSearch]
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

            this.storage = new Storage(SqlStorage);
            this.storage.query('CREATE TABLE IF NOT EXISTS favourites (id TEXT PRIMARY KEY, url TEXT, downsized_url TEXT, original_url TEXT, fixed_width_still_url TEXT)').then((data) => {
                console.log("TABLE CREATED -> " + JSON.stringify(data.res));
            }, (error) => {
                console.log("ERROR -> " + JSON.stringify(error.err));
            });

        });
    }

    openPage(page) {
        let nav = this.app.getComponent('nav');
        nav.setRoot(page.component).then(() => {
            this.app.getComponent('leftMenu').close();
        });
    }


}
