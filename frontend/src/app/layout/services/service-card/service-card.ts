import { Component, Input } from '@angular/core';
import { IService } from '../../../core/model/service.model';

@Component({
  selector: 'app-service-card',
  imports: [],
  templateUrl: './service-card.html',
  styleUrl: './service-card.css',
})
export class ServiceCard {
  @Input() serviceCard!: IService;
}
