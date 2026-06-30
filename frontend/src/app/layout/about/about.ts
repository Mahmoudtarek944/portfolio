import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AboutService } from '../../core/service/about.service';
import { IAbout } from '../../core/model/about.model';

@Component({
  selector: 'app-about',
  imports: [RouterLink],
  templateUrl: './about.html',
  styleUrl: './about.css',
})
export class About implements OnInit {
  constructor(
    private __aboutService: AboutService,
    private _cdr: ChangeDetectorRef,
  ) {}

  aboutData!: IAbout;
  imageURL = 'http://localhost:3000/upload/';
  ngOnInit() {
    this.__aboutService.getDate().subscribe({
      next: (res) => {
        this.aboutData = res;
        console.log(this.aboutData);
        this._cdr.detectChanges();
      },
    });
  }
}
