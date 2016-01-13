import {Injectable} from 'angular2/core';
import {Http} from 'angular2/http';

@Injectable()
export class GifSearch {
    constructor(http: Http) {
        this.http = http;
        this.apiKey = "dc6zaTOxFJmzC";

        this.topLimit = 25;
        this.topOffset = 0;
    }

    getTopGifs(apiKey, limit, offset) {
        this.http.get('http://api.giphy.com/v1/gifs/trending?api_key=' + apiKey + '&limit=' + limit + '&offset=' + offset)
            .map(res => res.json())
            .subscribe(data => {
                    console.log("getTopGifs - http returned OK");
                    this.data = data.data;
                },
                error => {
                    console.log("unable to load gifs");
                });
    }

    initTop() {
        if(this.data) {
            console.log("initTop - from cache");
            return Promise.resolve(this.data);
        } else {
            console.log("initTop - making new http call");
            return new Promise(resolve => {
                this.getTopGifs(this.apiKey, this.topLimit, this.topOffset);
                resolve(this.data);
            });
        }
    }
}