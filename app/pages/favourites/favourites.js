import {IonicApp, Page, NavController, NavParams, Storage, SqlStorage, Platform} from 'ionic/ionic';
import {ItemDetailsPage} from '../item-details/item-details';

@Page({
    templateUrl: 'build/pages/favourites/favourites.html'
})
export class FavouritesPage {
    constructor(app:IonicApp, nav:NavController, navParams:NavParams, platform:Platform) {
        this.nav = nav;
        this.platform = platform;
        this.gifs = null;

        this.platform.ready().then(() => {
            this.storage = new Storage(SqlStorage);
            this.storage.query("SELECT id, url, downsized_url, original_url, fixed_width_still_url FROM favourites").then((data) => {
                    this.gifs = [];
                    if (data.res.rows.length > 0) {
                        for (var i = 0; i < data.res.rows.length; i++) {
                            console.log("adding gif to display: " + JSON.stringify(data.res.rows.item(i)));
                            this.gifs.push({
                                id: data.res.rows.item(i).id,
                                url: data.res.rows.item(i).url,
                                images: {
                                    downsized: {url: data.res.rows.item(i).downsized_url},
                                    original: {url: data.res.rows.item(i).original_url},
                                    fixed_width_still: {url: data.res.rows.item(i).fixed_width_still_url}
                                }
                            });
                        }
                    }
                },
                (error) => {
                    console.log("ERROR -> " + JSON.stringify(error.err));
                });
        });
    }

    displayDetails(gif) {
        this.nav.push(ItemDetailsPage, gif);
    }

    shouldDisplayError() {
        return !(typeof this.gifs !== 'undefined' && this.gifs !== null && this.gifs.hasOwnProperty('length') && this.gifs.length > 0)
    }
}
