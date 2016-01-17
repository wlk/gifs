import {Page, NavParams, Storage, SqlStorage, Platform} from 'ionic/ionic';

@Page({
    templateUrl: 'build/pages/item-details/item-details.html'
})
export class ItemDetailsPage {
    constructor(navParams:NavParams, platform:Platform) {
        this.navParams = navParams;
        this.platform = platform;
        this.gif = navParams.data;

        this.platform.ready().then(() => {
            this.storage = new Storage(SqlStorage);
        });
    }

    isFavourite() {
        this.platform.ready().then(() => {
            console.log("is favourite");
            this.storage.query("SELECT id FROM favourites WHERE id = '" + this.gif.id + "'").then((data) => {
                    return data.res.rows.length > 0;
                },
                (error) => {
                    console.log("ERROR -> " + JSON.stringify(error.err));
                });
        });
    }

    addToFavourites() {
        this.platform.ready().then(() => {
            console.log("adding gif to favourites");
            this.storage.query("INSERT INTO favourites (id, url, downsized_url, original_url, fixed_width_still_url) " +
                    "VALUES('" + this.gif.id + "', '" + this.gif.url + "','" + this.gif.images.downsized.url + "','" + this.gif.images.original.url + "','" + this.gif.images.fixed_width_still.url + "') ")
                .then(
                    (data) => {
                        console.log(JSON.stringify(data.res));
                    },
                    (error) => {
                        console.log("ERROR -> " + JSON.stringify(error.err));
                    });
        });
    }

    share() {
        if (device.platform === "Android" || device.platform === "iOS") {
            window.plugins.socialsharing.share(this.gif.url);
        } else {
            window.plugins.socialsharing.share(this.gif.url, null, null, null);
        }

    }
}
