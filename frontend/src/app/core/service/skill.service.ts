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

  deleteDate(id: string, index: number) {
    return this._http.get<ISkill>(`${this.skillApiURL}/${id}/subskill/${index}`);
  }

  updateSubSkill(catId: string, index: number, body: { skillName: string; percentage: number }) {
    return this._http.put<ISkill>(`${this.skillApiURL}/${catId}/subskill/${index}`, body);
  }
  addData(body: any) {
    return this._http.post<ISkill>(this.skillApiURL, body);
  }
}
