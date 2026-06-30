import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ServiceService } from '../../core/service/service.service';
import { IService } from '../../core/model/service.model';
import { ServiceCard } from './service-card/service-card';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-services',
  imports: [ServiceCard, ReactiveFormsModule],
  templateUrl: './services.html',
  styleUrl: './services.css',
})
export class Services implements OnInit {
  constructor(
    private __serviceService: ServiceService,
    private _cdr: ChangeDetectorRef,
  ) {}

  myService: IService[] = [];

  ngOnInit(): void {
    this.__serviceService.getData().subscribe((value: IService[]) => {
      this.myService = value;
      this._cdr.detectChanges();
    });
  }

  deleteService(id: string) {
    // SOFT DELETE
    this.__serviceService.deleteSoftService(id, { isDeleted: true }).subscribe((value) => {
      this.myService = this.myService.filter((serv) => serv._id != id);
      this._cdr.detectChanges();
    });
  }

  isModalOpen = false;
  modalMode: 'add' | 'update' = 'add';

  myForm: FormGroup = new FormGroup({
    icon: new FormControl(''),
    title: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
  });

  openModal(): void {
    this.modalMode = 'add';
    this.myForm.reset({
      // reset all inputs
      icon: '',
      title: '',
      description: '',
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

  myOldDataProject!: IService;
  myUpdataId!: string;

  onUpdateService(eventData: { id: string; body: IService }) {
    this.modalMode = 'update';

    // get the old data form the child from the bode : eventData
    this.myOldDataProject = eventData.body;
    this.myUpdataId = eventData.id;

    this.myForm.patchValue({
      // add the old data in the old
      icon: this.myOldDataProject.icon,
      title: this.myOldDataProject.title,
      description: this.myOldDataProject.description,
    });

    this.isModalOpen = true;
    this._cdr.detectChanges();
  }

  onSubmit() {
    if (this.modalMode == 'add') {
      this.__serviceService.addService(this.myForm.value).subscribe({
        next: (value) => {
          this.myService = [...this.myService, value];
          this.closeModal();
          this._cdr.detectChanges();
        },
      });
    } else if (this.modalMode == 'update') {
      this.__serviceService.updateService(this.myUpdataId, this.myForm.value).subscribe({
        next: (value) => {
          this.myService = this.myService.map((serv) =>
            serv._id === this.myUpdataId ? value : serv,
          );
          this.closeModal();
          this._cdr.detectChanges();
        },
      });
    }
  }
}
