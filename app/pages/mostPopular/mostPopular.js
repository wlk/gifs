import {IonicApp, Page, NavController, NavParams} from 'ionic/ionic';
import {ItemDetailsPage} from '../item-details/item-details';
import {GifSearch} from '../../providers/gif-search';

@Page({
    templateUrl: 'build/pages/mostPopular/mostPopular.html'
})
export class MostPopularPage {
    constructor(app:IonicApp, nav:NavController, navParams:NavParams, gifSearch:GifSearch) {
        this.nav = nav;
        this.gifSearch = gifSearch;
        this.gifs = [];
        this.areGifsLoadedOk = false;

        this.updateList();
    }

    updateList() {
        console.log("updateList");

        this.gifSearch.initTop().then(data => {
            this.gifs = data;
            this.areGifsLoadedOk = data.length > 0;
            console.log("updateList returned");
        });
    }

    displayDetails(gif) {
        this.nav.push(ItemDetailsPage, gif);
    }
}
