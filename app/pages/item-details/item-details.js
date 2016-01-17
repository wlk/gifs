import {Page, NavParams, Storage, SqlStorage, Platform} from 'ionic/ionic';
import {FavouritesDB} from '../../providers/favouritesDB';

@Page({
    templateUrl: 'build/pages/item-details/item-details.html'
})
export class ItemDetailsPage {
    constructor(navParams:NavParams, platform:Platform, favourites:FavouritesDB) {
        this.navParams = navParams;
        this.platform = platform;
        this.gif = navParams.data;
        this.favourites = favourites;
        this.isFavourite = null;

        this.checkIsFavourite();
    }

    checkIsFavourite() {
        this.favourites.isFavourite(this.gif.id).then(data => {
            this.isFavourite = data;
        });
    }

    addToFavourites() {
        if(!this.checkIsFavourite()){
            this.favourites.addToFavourites(this.gif);
            this.checkIsFavourite();
        }
    }

    removeFromFavourites() {
        if(this.checkIsFavourite()){
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
