import {Injectable} from 'angular2/core';
import {Storage, SqlStorage, Platform} from 'ionic/ionic';

@Injectable()
export class FavouritesDB {
    constructor(platform:Platform) {
        this.platform = platform;

        this.platform.ready().then(() => {
            this.storage = new Storage(SqlStorage);

            this.createDB();

        });
    }

    createDB() {
        this.platform.ready().then(() => {
            this.storage.query('CREATE TABLE IF NOT EXISTS favourites (id TEXT PRIMARY KEY, url TEXT, downsized_url TEXT, original_url TEXT, fixed_width_still_url TEXT)').then((data) => {
                console.log("TABLE CREATED -> " + JSON.stringify(data.res));
            }, (error) => {
                console.log("ERROR -> " + JSON.stringify(error.err));
            });
        });
    }

    getFavourites() {
        return new Promise(resolve => {
            this.platform.ready().then(() => {
                this.storage.query("SELECT id, url, downsized_url, original_url, fixed_width_still_url FROM favourites").then((data) => {
                        var favourites = [];
                        if (data.res.rows.length > 0) {
                            for (var i = 0; i < data.res.rows.length; i++) {
                                console.log("adding gif to display: " + JSON.stringify(data.res.rows.item(i)));
                                favourites.push({
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
                        resolve(favourites);
                    },
                    (error) => {
                        console.log("ERROR -> " + JSON.stringify(error.err));
                    });
            });
        });
    };
}