import { Component, Input } from '@angular/core';
import { ISkill } from '../../../core/model/skill.model';
import { SkillCardDetails } from './skill-card-details/skill-card-details';

@Component({
  selector: 'app-skill-card',
  imports: [SkillCardDetails],
  templateUrl: './skill-card.html',
  styleUrl: './skill-card.css',
})
export class SkillCard {
  @Input() skillCategory!: ISkill;
}
