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
        console.log("sharing gif");
    }
}
