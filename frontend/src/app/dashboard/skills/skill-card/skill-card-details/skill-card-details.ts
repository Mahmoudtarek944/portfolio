import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-skill-card-details',
  imports: [],
  templateUrl: './skill-card-details.html',
  styleUrl: './skill-card-details.css',
})
export class SkillCardDetails {
  @Input() skillDetails!: { skillName: string; percentage: number };
  @Input() categoryId!: string;
  @Input() skillIndex!: number;

  @Output() deleteSkillEvent = new EventEmitter<{ catId: string; index: number }>();
  @Output() editSkillEvent = new EventEmitter<{ catId: string; index: number; skill: any }>();

  onDeleteSkill() {
    this.deleteSkillEvent.emit({ catId: this.categoryId, index: this.skillIndex });
  }

  onEditClick() {
    this.editSkillEvent.emit({
      catId: this.categoryId,
      index: this.skillIndex,
      skill: this.skillDetails,
    });
  }
}
