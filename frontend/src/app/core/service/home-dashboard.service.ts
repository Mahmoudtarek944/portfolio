import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IForm } from '../model/form.model';
import { IProject } from '../model/project.model';
import { ISkill } from '../model/skill.model';
import { IHome } from '../model/home.model';

@Injectable({
  providedIn: 'root',
})
export class HomeDashboardService {
  constructor(private _http: HttpClient) {}

  private apiMessage = 'http://localhost:3000/contact/form';
  getMessage() {
    return this._http.get<IHome[]>(this.apiMessage);
  }

  private apiProject = 'http://localhost:3000/project';
  getProject() {
    return this._http.get<IProject[]>(this.apiProject);
  }

  private apiSkill = 'http://localhost:3000/skill';
  getSkill() {
    return this._http.get<ISkill[]>(this.apiSkill);
  }

  getRecentMessages() {
    return this._http.get<IForm[]>(`${this.apiMessage}/latest-messages`);
  }
}
