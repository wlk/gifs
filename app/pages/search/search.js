import {Page, NavController} from 'ionic/ionic';

@Page({
    templateUrl: 'build/pages/search/search.html'
})
export class SearchPage {
    constructor(nav:NavController) {
        this.nav = nav;
    }
}
