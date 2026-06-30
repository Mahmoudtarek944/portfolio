import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { HomeService } from '../../../core/service/home.service';

@Component({
  selector: 'app-header',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header implements OnInit {
  constructor(
    private __headerService: HomeService,
    private _cdr: ChangeDetectorRef,
  ) {}

  username: string = '';
  firstChar: string = '';
  lastName: string = '';

  ngOnInit(): void {
    this.__headerService.getData().subscribe((value) => {
      this.username = value.name;
      this._cdr.detectChanges();
      const nameParts = this.username.trim().split(' ');
      if (nameParts.length > 0) {
        this.firstChar = nameParts[0][0].toUpperCase();
        this._cdr.detectChanges();
        if (nameParts.length > 1) {
          this.lastName = nameParts[nameParts.length - 1];
          this._cdr.detectChanges();
        } else {
          this.lastName = '';
          this._cdr.detectChanges();
        }
      }
    });
  }
}
