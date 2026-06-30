import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ISkill } from '../model/skill.model';

@Injectable({
  providedIn: 'root',
})
export class SkillService {
  constructor(private _http: HttpClient) {}

  private skillApiURL = 'http://localhost:3000/skill';

  getData() {
    return this._http.get<ISkill[]>(this.skillApiURL);
  }
}
