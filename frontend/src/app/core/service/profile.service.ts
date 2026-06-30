import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IHome } from '../model/home.model';
import { IAbout } from '../model/about.model';
import { IContact } from '../model/contact.model';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  constructor(private _http: HttpClient) {}

  apiDataHome = 'http://localhost:3000/';
  getProfileFromHome() {
    return this._http.get<IHome>(this.apiDataHome);
  }
  updateProfileFromHome(body: object) {
    return this._http.put<IHome>(this.apiDataHome, body);
  }

  apiDataAbout = 'http://localhost:3000/about';
  getProfileFromAbout() {
    return this._http.get<IAbout>(this.apiDataAbout);
  }
  updateProfileFromAbout(body: FormData) {
    return this._http.put<IAbout>(this.apiDataAbout, body);
  }

  apiDataContact = 'http://localhost:3000/contact';
  getProfileFromContact() {
    return this._http.get<IContact>(this.apiDataContact);
  }
  updateProfileFromContact(body: object) {
    return this._http.put<IContact>(this.apiDataContact, body);
  }
}
