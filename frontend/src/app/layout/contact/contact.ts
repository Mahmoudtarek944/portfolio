import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ContactService } from '../../core/service/contact.service';
import { IContact } from '../../core/model/contact.model';
import { Form } from './form/form';

@Component({
  selector: 'app-contact',
  imports: [Form],
  templateUrl: './contact.html',
  styleUrl: './contact.css',
})
export class Contact implements OnInit {
  constructor(
    private __contactService: ContactService,
    private _cdr: ChangeDetectorRef,
  ) {}

  contactData!: IContact;

  ngOnInit(): void {
    this.__contactService.getData().subscribe((value: IContact) => {
      this.contactData = value;
      this._cdr.detectChanges();
    });
  }
}
