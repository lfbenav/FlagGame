import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  public roundsFlag: boolean = false;
  public infiniteFlag: boolean = false;
  public timeFlag: boolean = false;

  constructor(
    private router: Router
  ) {}


  startRounds(): void {
    this.router.navigateByUrl('play/rounds')
  }

  hoverRounds( ): void {
    this.roundsFlag = true;
    this.infiniteFlag = false;
    this.timeFlag = false;
  }

  startInfinite(): void {
    this.router.navigateByUrl('play/infinite')
  }

  hoverInfinite( ): void {
    this.roundsFlag = false;
    this.infiniteFlag = true;
    this.timeFlag = false;
  }

  startTimeTrial(): void {
    this.router.navigateByUrl('play/time')
  }

  hoverTimeTrial( ): void {
    this.roundsFlag = false;
    this.infiniteFlag = false;
    this.timeFlag = true;
  }

}
