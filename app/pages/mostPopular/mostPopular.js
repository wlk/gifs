import {IonicApp, Page, NavController, NavParams} from 'ionic/ionic';
import {Http} from 'angular2/http';
import 'rxjs/add/operator/map';

@Page({
    templateUrl: 'build/pages/mostPopular/mostPopular.html'
})
export class MostPopularPage {
    constructor(app:IonicApp, nav:NavController, navParams:NavParams, http:Http) {
        this.nav = nav;
        this.http = http;
        this.gifs = null;

        // If we navigated to this page, we will have an item available as a nav param
        this.selectedItem = navParams.get('item');

        this.http.get('http://api.giphy.com/v1/gifs/trending?api_key=dc6zaTOxFJmzC').map(res => res.json()).subscribe(data => {
                console.log("gifs loaded");
                this.gifs = data.data.children;
            },
            err => {
                console.log("Oops!");
            });
    }
}
