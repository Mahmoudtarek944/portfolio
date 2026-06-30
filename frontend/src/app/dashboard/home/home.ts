import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { HomeDashboardService } from '../../core/service/home-dashboard.service';
import { RecentMessages } from './recent-messages/recent-messages';
import { IForm } from '../../core/model/form.model';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [RecentMessages, RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit {
  constructor(
    private __homeDashboardService: HomeDashboardService,
    private _cdr: ChangeDetectorRef,
  ) {}

  totalMessage: number = 0;
  totalProject: number = 0;
  totalSkill: number = 0;
  totalCategorySkills: number = 0;

  latestMessages: IForm[] = [];
  ngOnInit(): void {
    this.__homeDashboardService.getMessage().subscribe((value) => {
      console.log(value);
      this.totalMessage = value.length;
      console.log(this.totalMessage);
      this._cdr.detectChanges();
    });
    this.__homeDashboardService.getProject().subscribe((value) => {
      this.totalProject = value.length;
      this._cdr.detectChanges();
    });
    this.__homeDashboardService.getSkill().subscribe((value) => {
      this.totalCategorySkills = value.length;
      value.forEach((obj) => {
        this.totalSkill += obj.skills.length;
      });
      this._cdr.detectChanges();
    });

    this.__homeDashboardService.getRecentMessages().subscribe((value) => {
      this.latestMessages = value;
      this._cdr.detectChanges();
    });
  }
}
