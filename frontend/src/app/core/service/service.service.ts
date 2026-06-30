import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IService } from '../model/service.model';

@Injectable({
  providedIn: 'root',
})
export class ServiceService {
  constructor(private _http: HttpClient) {}

  serviceApiURL = 'http://localhost:3000/service';

  getData() {
    return this._http.get<IService[]>(this.serviceApiURL);
  }

  deleteSoftService(id: string, body: object) {
    return this._http.put<IService>(`${this.serviceApiURL}/${id}`, body);
  }

  getOneService(id: string) {
    return this._http.get<IService>(`${this.serviceApiURL}/${id}`);
  }

  addService(data: IService) {
    return this._http.post<IService>(this.serviceApiURL, data);
  }

  updateService(id: string, data: IService) {
    return this._http.put<IService>(`${this.serviceApiURL}/${id}`, data);
  }
}
