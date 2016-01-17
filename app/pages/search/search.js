import {IonicApp, Page, NavController, NavParams} from 'ionic/ionic';
import {ItemDetailsPage} from '../item-details/item-details';
import {Giphy} from '../../providers/giphy';

@Page({
    templateUrl: 'build/pages/search/search.html'
})
export class SearchPage {
    constructor(app:IonicApp, nav:NavController, navParams:NavParams, giphy:Giphy) {
        this.nav = nav;
        this.searchQuery = '';
        this.giphy = giphy;
        this.gifs = [];
    }

    shouldDisplayError() {
        return !(typeof this.gifs !== 'undefined' && this.gifs.hasOwnProperty('length') && this.gifs.length > 0)
    }

    searchGIFs() {
        console.log("searchGIFs");
        this.giphy.search(this.searchQuery).then(data => {
            this.gifs = data;
            console.log("searchGIFs returned");
        });
    }

    displayDetails(gif) {
        this.nav.push(ItemDetailsPage, gif);
    }
}
