import {Injectable} from 'angular2/core';
import {Http} from 'angular2/http';

@Injectable()
export class GifSearch {
    constructor(http:Http) {
        this.http = http;
        this.apiKey = "dc6zaTOxFJmzC";

        this.topLimit = 25;
        this.topOffset = 0;
    }

    initTop() {
        if (this.data) {
            console.log("initTop - from cache");
            return Promise.resolve(this.data);
        }
        console.log("initTop - making new http call");
        return new Promise(resolve => {
            this.http.get('http://api.giphy.com/v1/gifs/trending?api_key=' + this.apiKey + '&limit=' + this.topLimit + '&offset=' + this.topOffset)
                .subscribe(res => {
                        console.log("getTopGifs - http returned OK");
                        this.data = res.json().data;
                        resolve(this.data);
                    },
                    error => {
                        console.log("unable to load gifs");
                    });
        });

    }
}