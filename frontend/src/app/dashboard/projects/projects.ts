import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ProjectService } from '../../core/service/project.service';
import { IProject } from '../../core/model/project.model';
import { ProjectCard } from './project-card/project-card';
import { CommonModule } from '@angular/common';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-projects',
  imports: [ProjectCard, CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './projects.html',
  styleUrl: './projects.css',
})
export class Projects implements OnInit {
  constructor(
    private __projectService: ProjectService,
    private _cdr: ChangeDetectorRef,
  ) {}

  myProject: IProject[] = [];

  ngOnInit(): void {
    this.__projectService.getData().subscribe((value: IProject[]) => {
      this.myProject = value;
      console.log(this.myProject);
      this._cdr.detectChanges();
    });
  }

  onDeleteProject(idProjectDelete: string) {
    this.myProject = this.myProject.filter((proj) => proj._id != idProjectDelete);
    this._cdr.detectChanges();
  }

  isModalOpen = false;
  modalMode: 'add' | 'update' = 'add';

  myForm: FormGroup = new FormGroup({
    title: new FormControl('', Validators.required),
    category: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    githubLink: new FormControl('', Validators.required),
    dimoLink: new FormControl(''),
  });

  openModal(): void {
    this.modalMode = 'add';
    this.myForm.reset({
      // reset all inputs
      title: '',
      category: '',
      description: '',
      githubLink: '',
      dimoLink: '',
    });
    this.isModalOpen = true;
    this._cdr.detectChanges();
  }

  closeModal(): void {
    this.isModalOpen = false;
  }

  onOverlayClick(event: MouseEvent): void {
    if ((event.target as HTMLElement).classList.contains('modal-overlay')) {
      this.closeModal();
    }
  }

  myOldDataProject!: IProject;
  myUpdataId!: string;

  onUpdateProject(eventData: { proj: IProject; id: string }) {
    this.modalMode = 'update';
    this.myUpdataId = eventData.id;
    this.myOldDataProject = eventData.proj;

    this.myForm.patchValue({
      // update in the input value not all
      title: eventData.proj.title,
      category: eventData.proj.category,
      description: eventData.proj.description,
      githubLink: eventData.proj.githubLink,
      dimoLink: eventData.proj.dimoLink ?? '',
    });

    this.isModalOpen = true;
    this._cdr.detectChanges();
  }

  onSubmit() {
    if (this.modalMode === 'add') {
      // the returned observable have an observabler -> next to send data , error to send error
      this.__projectService.addData(this.myForm.value).subscribe({
        next: (value) => {
          this.myProject = [...this.myProject, value];
          this.closeModal();
          this._cdr.detectChanges();
        },
      });
    } else if (this.modalMode === 'update') {
      this.__projectService.updateData(this.myUpdataId, this.myForm.value).subscribe({
        next: (value) => {
          this.myProject = this.myProject.map((p) => (p._id === this.myUpdataId ? value : p));
          this.closeModal();
          this._cdr.detectChanges();
        },
      });
    }
  }
}
