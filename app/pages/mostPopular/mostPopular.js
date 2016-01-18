import {IonicApp, Page, NavController, NavParams} from 'ionic/ionic';
import {ItemDetailsPage} from '../item-details/item-details';
import {Giphy} from '../../providers/giphy';
import {Ads} from '../../providers/ads';

@Page({
    templateUrl: 'build/pages/mostPopular/mostPopular.html'
})
export class MostPopularPage {
    constructor(app:IonicApp, nav:NavController, navParams:NavParams, giphy:Giphy) {
        if (typeof analytics !== 'undefined') {
            analytics.trackView("MostPopularPage view");
        }

        this.nav = nav;
        this.giphy = giphy;
        this.gifs = [];

        this.updateList();
    }

    shouldDisplayError() {
        return !(typeof this.gifs !== 'undefined' && this.gifs.hasOwnProperty('length') && this.gifs.length > 0)
    }

    updateList() {
        this.giphy.initTop().then(data => {
            this.gifs = data;
        });
    }

    displayDetails(gif) {
        this.nav.push(ItemDetailsPage, gif);
    }
}
