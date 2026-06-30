import { Component, Input } from '@angular/core';
import { IForm } from '../../../core/model/form.model';

@Component({
  selector: 'app-recent-messages',
  imports: [],
  templateUrl: './recent-messages.html',
  styleUrl: './recent-messages.css',
})
export class RecentMessages {
  @Input() myCard!: IForm;
}
