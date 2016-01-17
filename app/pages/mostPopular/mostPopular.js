import {IonicApp, Page, NavController, NavParams, Platform} from 'ionic/ionic';
import {ItemDetailsPage} from '../item-details/item-details';
import {GifSearch} from '../../providers/gif-search';

@Page({
    templateUrl: 'build/pages/mostPopular/mostPopular.html'
})
export class MostPopularPage {
    constructor(app:IonicApp, nav:NavController, navParams:NavParams, gifSearch:GifSearch, platform:Platform) {
        this.nav = nav;
        this.gifSearch = gifSearch;
        this.platform = platform;
        this.gifs = [];

        this.updateList();
    }

    shouldDisplayError() {
        return !(typeof this.gifs !== 'undefined' && this.gifs.hasOwnProperty('length') && this.gifs.length > 0)
    }

    updateList() {
        console.log("updateList");

        this.gifSearch.initTop().then(data => {
            this.gifs = data;
            console.log("updateList returned");
        });
    }

    displayDetails(gif) {
        this.nav.push(ItemDetailsPage, gif);
    }
}
