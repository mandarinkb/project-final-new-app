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
    // item 50 desc
    getItems(fromValue) {
      return this.http.get(this.rootUrl.rootURL + '/items?from=' + fromValue, this.rootUrl.httpOptions);
    }

    // category
    postCategory(formData: any) {
      return this.http.post(this.rootUrl.rootURL + '/category', formData, this.rootUrl.httpOptions);
    }

    // name
    postName(formData: any) {
      return this.http.post(this.rootUrl.rootURL + '/name', formData, this.rootUrl.httpOptions);
    }

        // name
    postNameAndFilter(formData: any) {
      return this.http.post(this.rootUrl.rootURL + '/name-and-filter', formData, this.rootUrl.httpOptions);
    }

    // web name for filter search
    getWebName() {
      return this.http.get(this.rootUrl.rootURL + '/web-name', this.rootUrl.httpOptions);
    }

    // count item 50 desc
    getcountItems() {
      return this.http.get(this.rootUrl.rootURL + '/count-items', this.rootUrl.httpOptions);
    }

    // count category
    postCountCategory(formData: any) {
      return this.http.post(this.rootUrl.rootURL + '/count-category', formData, this.rootUrl.httpOptions);
    }

    // count name
    postCountName(formData: any) {
      return this.http.post(this.rootUrl.rootURL + '/count-name', formData, this.rootUrl.httpOptions);
    }

    // count name
    postCountNameAndFilter(formData: any) {
      return this.http.post(this.rootUrl.rootURL + '/count-name-and-filter', formData, this.rootUrl.httpOptions);
    }

}
