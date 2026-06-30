import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IHome } from '../model/home.model';

@Injectable({
  providedIn: 'root',
})
export class HomeService {
  constructor(private _http: HttpClient) {}
  apiHomeURL = 'http://localhost:3000/';
  getData() {
    return this._http.get<IHome>(this.apiHomeURL);
  }
}
