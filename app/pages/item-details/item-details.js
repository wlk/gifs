import {Page, NavParams} from 'ionic/ionic';

@Page({
    templateUrl: 'build/pages/item-details/item-details.html'
})
export class ItemDetailsPage {
    constructor(navParams:NavParams) {
        this.navParams = navParams;
        this.gif = navParams.data;
    }
}
