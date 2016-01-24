import {Page, NavParams, Storage, SqlStorage, Platform} from 'ionic/ionic';
import {FavouritesDB} from '../../providers/favouritesDB';
import {Ads} from '../../providers/ads';

@Page({
    templateUrl: 'build/pages/item-details/item-details.html'
})
export class ItemDetailsPage {
    constructor(navParams:NavParams, platform:Platform, favourites:FavouritesDB, ads:Ads) {
        if (typeof analytics !== 'undefined') {
            analytics.trackView("ItemDetailsPage view");
        }

        this.navParams = navParams;
        this.platform = platform;
        this.gif = navParams.data;
        this.favourites = favourites;
        this.isFavourite = null;

        ads.registerItemView();

        this.checkIsFavourite();
    }

    checkIsFavourite() {
        this.favourites.isFavourite(this.gif.id).then(data => {
            this.isFavourite = data;
        });
    }

    addToFavourites() {
        if (!this.isFavourite) {
            this.favourites.addToFavourites(this.gif);
            this.checkIsFavourite();
        }
    }

    removeFromFavourites() {
        if (this.isFavourite) {
            this.favourites.removeFromFavourites(this.gif);
            this.checkIsFavourite();
        }
    }

    share() {
        if (device.platform === "Android" || device.platform === "iOS") {
            window.plugins.socialsharing.share(this.gif.url);
        } else {
            window.plugins.socialsharing.share(this.gif.url, null, null, null);
        }
    }
}
