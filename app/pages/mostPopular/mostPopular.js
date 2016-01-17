import {IonicApp, Page, NavController, NavParams} from 'ionic/ionic';
import {ItemDetailsPage} from '../item-details/item-details';
import {Giphy} from '../../providers/giphy';

@Page({
    templateUrl: 'build/pages/mostPopular/mostPopular.html'
})
export class MostPopularPage {
    constructor(app:IonicApp, nav:NavController, navParams:NavParams, giphy:Giphy) {
        this.nav = nav;
        this.giphy = giphy;
        this.gifs = [];

        this.updateList();
    }

    shouldDisplayError() {
        return !(typeof this.gifs !== 'undefined' && this.gifs.hasOwnProperty('length') && this.gifs.length > 0)
    }

    updateList() {
        console.log("updateList");

        this.giphy.initTop().then(data => {
            this.gifs = data;
            console.log("updateList returned");
        });
    }

    displayDetails(gif) {
        this.nav.push(ItemDetailsPage, gif);
    }
}
