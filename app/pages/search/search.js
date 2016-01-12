import {Page, NavController} from 'ionic/ionic';

@Page({
    templateUrl: 'build/pages/hello-ionic/Search.html'
})
export class SearchPage {
    constructor(nav:NavController) {
        this.nav = nav;
    }
}
