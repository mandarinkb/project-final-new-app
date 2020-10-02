import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UrlService {
  readonly rootURL = 'http://10.6.8.114:8888/mobile'; // ram ip 10.6.9.190   //my ip 10.10.10.116
  readonly httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };
  constructor() { }
}
