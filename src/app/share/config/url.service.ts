import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UrlService {
  readonly rootURL = 'http://10.6.2.31:8888/mobile'; // http://localhost:8080 //
  readonly httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };
  constructor() { }
}
