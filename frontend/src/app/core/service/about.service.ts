import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IAbout } from '../model/about.model';

@Injectable({
  providedIn: 'root',
})
export class AboutService {
  constructor(private _http: HttpClient) {}

  apiAboutURL = 'http://localhost:3000/about';
  getDate() {
    return this._http.get<IAbout>(this.apiAboutURL);
  }
}
