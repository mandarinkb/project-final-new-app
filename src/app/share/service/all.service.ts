import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { UrlService } from '../config/url.service';
import { Items } from '../model/items.model';
@Injectable({
  providedIn: 'root'
})
export class AllService {

  listItems: Items[];
  constructor(private rootUrl: UrlService ,
              private http: HttpClient) { }
    // item 50 desc
    getItems() {
      return this.http.get(this.rootUrl.rootURL + '/items', this.rootUrl.httpOptions);
    }

    // category
    postCategory(formData: any) {
      return this.http.post(this.rootUrl.rootURL + '/category', formData, this.rootUrl.httpOptions);
    }

    // name
    postName(formData: any) {
      return this.http.post(this.rootUrl.rootURL + '/name', formData, this.rootUrl.httpOptions);
    }

}
