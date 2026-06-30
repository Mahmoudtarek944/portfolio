import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ProjectService } from '../../core/service/project.service';
import { IProject } from '../../core/model/project.model';
import { ProjectCard } from './project-card/project-card';

@Component({
  selector: 'app-projects',
  imports: [ProjectCard],
  templateUrl: './projects.html',
  styleUrl: './projects.css',
})
export class Projects implements OnInit {
  constructor(
    private __projectService: ProjectService,
    private _cdr: ChangeDetectorRef,
  ) {}

  allProject!: IProject[];

  ngOnInit(): void {
    this.__projectService.getData().subscribe((value: IProject[]) => {
      this.allProject = value;
      this._cdr.detectChanges();
    });
  }
}
