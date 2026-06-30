import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IForm } from '../model/form.model';

@Injectable({
  providedIn: 'root',
})
export class FormService {
  constructor(private _http: HttpClient) {}

  apiFromURL = 'http://localhost:3000/contact/form';

  getData() {
    return this._http.get<IForm[]>(this.apiFromURL);
  }
  addData(data: IForm) {
    return this._http.post<IForm>(this.apiFromURL, data);
  }

  deleteData(id: string) {
    return this._http.delete<IForm>(`${this.apiFromURL}/${id}`);
  }
}
