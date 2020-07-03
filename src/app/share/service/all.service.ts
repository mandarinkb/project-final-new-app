import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UrlService } from '../config/url.service';
import { Items } from '../model/items.model';
@Injectable({
  providedIn: 'root'
})
export class AllService {
  listItems: Items[];
  constructor(private rootUrl: UrlService ,
              private http: HttpClient) {
  }
    // history desc
    postHistory(formData: any, fromValue) {
      return this.http.post(this.rootUrl.rootURL + '/history-name?from=' + fromValue, formData, this.rootUrl.httpOptions);
    }

    // category
    postCategory(formData: any, fromValue) {
      return this.http.post(this.rootUrl.rootURL + '/category?from=' + fromValue, formData, this.rootUrl.httpOptions);
    }

    // name
    postName(formData: any, fromValue) {
      return this.http.post(this.rootUrl.rootURL + '/name?from=' + fromValue, formData, this.rootUrl.httpOptions);
    }

    // name filter
    postNameAndFilter(formData: any, fromValue) {
      return this.http.post(this.rootUrl.rootURL + '/name-and-filter?from=' + fromValue, formData, this.rootUrl.httpOptions);
    }

    // web name for filter search
    getWebName() {
      return this.http.get(this.rootUrl.rootURL + '/web-name', this.rootUrl.httpOptions);
    }
}
