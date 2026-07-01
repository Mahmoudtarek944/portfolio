import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { HomeService } from '../../core/service/home.service';
import { IHome } from '../../core/model/home.model';

@Component({
  selector: 'app-footer',
  imports: [RouterLink],
  templateUrl: './footer.html',
  styleUrl: './footer.css',
})
export class Footer implements OnInit {
  constructor(private __homeService: HomeService) {}

  footerData!: IHome;
  firstChar: string = '';
  lastName: string = '';

  ngOnInit(): void {
    this.__homeService.getData().subscribe((value) => {
      this.footerData = value;
      const arrName = this.footerData.name.split(' ');
      if (arrName.length > 0) {
        this.firstChar = arrName[0];
        if (arrName.length > 1) {
          this.lastName = arrName[arrName.length - 1];
        } else {
          this.lastName = '';
        }
      }
    });
  }
}
