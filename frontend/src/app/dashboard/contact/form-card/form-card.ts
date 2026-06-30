import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IForm } from '../../../core/model/form.model';
import { FormService } from '../../../core/service/form.service';

@Component({
  selector: '[app-form-card]',
  imports: [],
  templateUrl: './form-card.html',
  styleUrl: './form-card.css',
})
export class FormCard {
  constructor(private __formService: FormService) {}

  @Input() myCard!: IForm;

  @Output() rowDelete = new EventEmitter<string>(); // because emit the contact to change immedatitly the data

  deleteRow(id: string) {
    this.__formService.deleteData(id).subscribe((value) => {
      this.rowDelete.emit(id);
    });
  }
}
