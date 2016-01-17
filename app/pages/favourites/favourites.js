import {IonicApp, Page, NavController, NavParams} from 'ionic/ionic';
import {ItemDetailsPage} from '../item-details/item-details';
import {FavouritesDB} from '../../providers/favouritesDB';

@Page({
    templateUrl: 'build/pages/favourites/favourites.html'
})
export class FavouritesPage {
    constructor(app:IonicApp, nav:NavController, navParams:NavParams, favourites: FavouritesDB) {
        this.nav = nav;
        this.favourites = favourites;
        this.favourites.getFavourites().then(data => {
            this.gifs =  data;
        });
    }

    displayDetails(gif) {
        this.nav.push(ItemDetailsPage, gif);
    }

    shouldDisplayError() {
        return !(typeof this.gifs !== 'undefined' && this.gifs !== null && this.gifs.hasOwnProperty('length') && this.gifs.length > 0)
    }
}
