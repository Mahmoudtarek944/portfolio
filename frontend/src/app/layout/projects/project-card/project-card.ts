import { Component, Input } from '@angular/core';
import { IProject } from '../../../core/model/project.model';

@Component({
  selector: 'app-project-card',
  imports: [],
  templateUrl: './project-card.html',
  styleUrl: './project-card.css',
})
export class ProjectCard {
  @Input() projectCard!: IProject;
}
