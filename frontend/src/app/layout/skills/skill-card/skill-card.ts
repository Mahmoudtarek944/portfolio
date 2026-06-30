import { Component, Input } from '@angular/core';
import { ISkill } from '../../../core/model/skill.model';
import { DetailsSkillCard } from './details-skill-card/details-skill-card';

@Component({
  selector: 'app-skill-card',
  imports: [DetailsSkillCard],
  templateUrl: './skill-card.html',
  styleUrl: './skill-card.css',
})
export class SkillCard {
  @Input() skillCard!: ISkill;
}
