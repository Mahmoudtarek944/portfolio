import { Component } from '@angular/core';
import { FormService } from '../../../core/service/form.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { IForm } from '../../../core/model/form.model';
import { IContact } from '../../../core/model/contact.model';

@Component({
  selector: 'app-form',
  imports: [ReactiveFormsModule],
  templateUrl: './form.html',
  styleUrl: './form.css',
})
export class Form {
  constructor(private __fromService: FormService) {}

  myForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    email: new FormControl('', [
      Validators.required,
      Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/),
    ]),
    subject: new FormControl('', [Validators.required]),
    message: new FormControl('', [Validators.required]),
  });

  now = new Date();

  // Get just the date portion (e.g., "Mon Jun 29 2026")
  onSubmit() {
    const bodyData: IForm = {
      // to ensure add fileds
      // _id : '',
      name: this.myForm.value.name!,
      email: this.myForm.value.email!,
      subject: this.myForm.value.subject!,
      message: this.myForm.value.message!,
      date: this.now.toDateString(),
    };
    this.__fromService.addData(bodyData).subscribe((data) => {
      this.myForm.reset();
    });
  }
}
