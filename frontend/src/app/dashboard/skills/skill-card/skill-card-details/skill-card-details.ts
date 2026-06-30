import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-skill-card-details',
  imports: [],
  templateUrl: './skill-card-details.html',
  styleUrl: './skill-card-details.css',
})
export class SkillCardDetails {
  @Input() skillDetails!: { skillName: string; percentage: number };

  @Output() deleteSkillEvent = new EventEmitter<string>();

  deleteSkill(id: string) {
    this.deleteSkillEvent.emit(id);
  }
}
