import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-details-skill-card',
  imports: [],
  templateUrl: './details-skill-card.html',
  styleUrl: './details-skill-card.css',
})
export class DetailsSkillCard {
  @Input() detailsCard!: { skillName: string; percentage: number };
}
