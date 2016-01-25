import {Injectable} from 'angular2/core';
import {Http} from 'angular2/http';

@Injectable()
export class Giphy {
    constructor(http:Http) {
        this.http = http;
        this.apiKey = "dc6zaTOxFJmzC";

        this.topLimit = 25;
        this.topOffset = 0;
    }

    initTop() {
        if (this.data) {
            return Promise.resolve(this.data);
        }
        return new Promise(resolve => {
            this.http.get('http://api.giphy.com/v1/gifs/trending?api_key=' + this.apiKey + '&limit=' + this.topLimit + '&offset=' + this.topOffset)
                .subscribe(res => {
                        this.data = res.json().data;
                        resolve(this.data);
                    },
                    error => {
                    });
        });
    }

    search(query) {
        return new Promise(resolve => {
            this.http.get('http://api.giphy.com/v1/gifs/search?api_key=' + this.apiKey + '&limit=' + this.topLimit + '&offset=' + this.topOffset + '&q=' + query)
                .subscribe(res => {
                        resolve(res.json().data);
                    },
                    error => {
                    });
        });
    }
}