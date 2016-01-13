import {Page, NavController} from 'ionic/ionic';

@Page({
    templateUrl: 'build/pages/search/search.html'
})
export class SearchPage {
    constructor(nav:NavController) {
        this.nav = nav;
        this.searchQuery = '';
    }

    searchGIFs(event) {
        console.log("searching for " + event.value)
    }
}
