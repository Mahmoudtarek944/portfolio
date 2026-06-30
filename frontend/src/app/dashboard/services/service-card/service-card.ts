import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IService } from '../../../core/model/service.model';
import { ServiceService } from '../../../core/service/service.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-service-card',
  imports: [FormsModule],
  templateUrl: './service-card.html',
  styleUrl: './service-card.css',
})
export class ServiceCard {
  constructor(private __serviceService: ServiceService) {}

  @Input() myCard!: IService;

  @Output() deleteServiceEvent = new EventEmitter<string>();

  @Output() updateServiceEvent = new EventEmitter<{ id: string; body: IService }>();

  deleteService(id: string) {
    this.deleteServiceEvent.emit(id);
  }

  oldServiceBeforeUpdate!: IService;
  oldIdServiceUpdate!: IService;

  updateService(id: string) {
    this.__serviceService.getOneService(id).subscribe((value: IService) => {
      this.oldIdServiceUpdate = value;
    });

    this.updateServiceEvent.emit({ id: id, body: this.oldIdServiceUpdate });
  }
}
