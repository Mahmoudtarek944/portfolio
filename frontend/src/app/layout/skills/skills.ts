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

  allSkill!: ISkill[];

  ngOnInit(): void {
    this.__skillService.getData().subscribe((value: ISkill[]) => {
      this.allSkill = value;
      this._cdr.detectChanges();
    });
  }
}
