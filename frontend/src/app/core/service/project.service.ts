import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IProject } from '../model/project.model';

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  constructor(private _http: HttpClient) {}

  projectApiURL = 'http://localhost:3000/project';

  getData() {
    return this._http.get<IProject[]>(this.projectApiURL);
  }

  addData(data: IProject) {
    return this._http.post<IProject>(this.projectApiURL, data);
  }

  deleteData(id: string) {
    return this._http.delete<IProject>(`${this.projectApiURL}/${id}`);
  }

  updateData(id: string, body: IProject) {
    return this._http.put<IProject>(`${this.projectApiURL}/${id}`, body);
  }

  getOneProject(id: string) {
    console.log(`${this.projectApiURL}/${id}`);
    return this._http.get<IProject>(`${this.projectApiURL}/${id}`);
  }
}
