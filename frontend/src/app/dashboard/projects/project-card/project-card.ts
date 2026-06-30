import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IProject } from '../../../core/model/project.model';
import { ProjectService } from '../../../core/service/project.service';
import { showDeletedProjectAlert } from '../../../core/util/alert';

@Component({
  selector: 'app-project-card',
  imports: [],
  templateUrl: './project-card.html',
  styleUrl: './project-card.css',
})
export class ProjectCard {
  constructor(private __projectService: ProjectService) {}

  @Input() myCard!: IProject;

  @Output() projectDelete = new EventEmitter<string>();

  @Output() projectUpdata = new EventEmitter<{ proj: IProject; id: string }>();

  deteleProject(id: string) {
    // DI to delete from the DB , we need to delete from the UI and the Project know that
    console.log(id);
    this.__projectService.deleteData(id).subscribe((value) => {
      this.projectDelete.emit(id);
      // add seet alert 2 when click
      showDeletedProjectAlert('Project');
    });
  }

  oldProjectBeforeUpdate!: IProject;

  updateProject(id: string) {
    this.__projectService.getOneProject(id).subscribe((value) => {
      // must get the last values in the project
      this.oldProjectBeforeUpdate = value;
      console.log(value);

      this.projectUpdata.emit({ proj: this.oldProjectBeforeUpdate, id: id }); // get the parent the last values of project as a event
    });

    // console.log(id);
    // this.__projectService.updateData(id);
  }
}
