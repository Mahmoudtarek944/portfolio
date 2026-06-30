import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { HomeService } from '../../core/service/home.service';
import { IHome } from '../../core/model/home.model';
import Typed from 'typed.js';
@Component({
  selector: 'app-home',
  imports: [RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit {
  constructor(
    private __homeService: HomeService,
    private _cdr: ChangeDetectorRef,
  ) {}

  homeData!: IHome;
  typedInstance!: Typed;

  ngOnInit(): void {
    this.__homeService.getData().subscribe((value: IHome) => {
      this.homeData = value;
      this._cdr.detectChanges();
      console.log(this.homeData);
    });

    setTimeout(() => {
      this.initTypedEffect();
      // this._cdr.detectChanges();
    }, 50);
  }
  // the liberary to make the typing effect
  initTypedEffect() {
    const options = {
      strings: this.homeData.role,
      typeSpeed: 70,
      backSpeed: 50,
      backDelay: 1500,
      loop: true,
      showCursor: false,
    };
    this.typedInstance = new Typed('#typed-text', options);
  }
  ngOnDestroy() {
    if (this.typedInstance) {
      this.typedInstance.destroy();
    }
  }
}
