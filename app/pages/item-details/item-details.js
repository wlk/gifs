import {Page, NavParams} from 'ionic/ionic';

@Page({
    templateUrl: 'build/pages/item-details/item-details.html'
})
export class ItemDetailsPage {
    constructor(navParams:NavParams) {
        this.navParams = navParams;
        this.gif = navParams.data;
    }

    addToFavourites() {
        console.log("adding gif to favourites");
    }

    share() {
        if(device.platform === "Android" || device.platform === "iOS") {
            window.plugins.socialsharing.share(this.gif.url);
        } else {
            window.plugins.socialsharing.share(this.gif.url, null, null, null);
        }

    }
}
