import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IContact } from '../model/contact.model';

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  constructor(private _http: HttpClient) {}

  apiContectURL = 'http://localhost:3000/contact';

  getData() {
    return this._http.get<IContact>(this.apiContectURL);
  }
}
