import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { SkillService } from '../../core/service/skill.service';
import { ISkill } from '../../core/model/skill.model';
import { SkillCard } from './skill-card/skill-card';

@Component({
  selector: 'app-skills',
  imports: [SkillCard],
  templateUrl: './skills.html',
  styleUrl: './skills.css',
})
export class Skills implements OnInit {
  constructor(
    private __skillService: SkillService,
    private _cdr: ChangeDetectorRef,
  ) {}

  mySkills: ISkill[] = [];

  ngOnInit(): void {
    this.__skillService.getData().subscribe((value: ISkill[]) => {
      this.mySkills = value;
      console.log(this.mySkills);
      this._cdr.detectChanges();
    });
  }
}
