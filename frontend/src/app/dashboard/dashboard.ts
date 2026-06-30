import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router, RouterModule, NavigationEnd } from '@angular/router';
import { CommonModule } from '@angular/common';
import { filter } from 'rxjs/operators';
import { HomeService } from '../core/service/home.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './dashboard.html',
  host: { class: 'dashboard-body' },
})
export class Dashboard implements OnInit {
  constructor(
    private __homeService: HomeService,
    private _cd: ChangeDetectorRef,
  ) {}
  userName: string = '';
  firstChar: string = '';

  lastName: string = '';
  firstName: string = '';
  ngOnInit(): void {
    this.__homeService.getData().subscribe((value) => {
      this.userName = value.name;

      const nameParts = this.userName.trim().split(' ');
      if (nameParts.length > 0) {
        this.firstChar = nameParts[0][0].toUpperCase();
        if (nameParts.length > 1) {
          this.lastName = nameParts[nameParts.length - 1];
        } else {
          this.lastName = '';
        }
      }
      this._cd.detectChanges();
    });
  }
}
