import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ServiceService } from '../../core/service/service.service';
import { IService } from '../../core/model/service.model';
import { ServiceCard } from './service-card/service-card';

@Component({
  selector: 'app-services',
  imports: [ServiceCard],
  templateUrl: './services.html',
  styleUrl: './services.css',
})
export class Services implements OnInit {
  constructor(
    private __serviceService: ServiceService,
    private _cdr: ChangeDetectorRef,
  ) {}

  allService!: IService[];

  ngOnInit(): void {
    this.__serviceService.getData().subscribe((value: IService[]) => {
      this.allService = value;
      this._cdr.detectChanges();
    });
  }
}
