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

        this.http.get('http://api.giphy.com/v1/gifs/trending?api_key=dc6zaTOxFJmzC').map(res => res.json()).subscribe(data => {
                this.gifs = data.data;
            },
            err => {
                console.log("unable to load gifs");
            });
    }
}
