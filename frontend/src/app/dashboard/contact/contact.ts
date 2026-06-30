import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormService } from '../../core/service/form.service';
import { IForm } from '../../core/model/form.model';
import { FormCard } from './form-card/form-card';
import { showDeletedProjectAlert } from '../../core/util/alert';

@Component({
  selector: 'app-contact',
  imports: [FormCard],
  templateUrl: './contact.html',
  styleUrl: './contact.css',
})
export class Contact implements OnInit {
  constructor(
    private __formService: FormService,
    private cdr: ChangeDetectorRef,
  ) {}

  myFromData: IForm[] = [];

  ngOnInit(): void {
    this.__formService.getData().subscribe((value: IForm[]) => {
      console.log(value);
      this.myFromData = value;
      this.cdr.detectChanges();
    });
  }

  onDeleteRow(idRowDeleted: string) {
    this.myFromData = this.myFromData.filter((row) => row._id != idRowDeleted);
    this.cdr.detectChanges();
    showDeletedProjectAlert('Message');
  }
}
