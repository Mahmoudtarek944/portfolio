import { Component, EventEmitter, Input, Output } from '@angular/core';
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

  @Output() deleteSkillAction = new EventEmitter<{ catId: string; index: number }>();
  @Output() editSkillAction = new EventEmitter<{ catId: string; index: number; skill: any }>();

  forwardDelete(event: { catId: string; index: number }) {
    this.deleteSkillAction.emit(event);
  }

  forwardEdit(event: { catId: string; index: number; skill: any }) {
    this.editSkillAction.emit(event);
  }
}
