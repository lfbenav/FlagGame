import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-results-time',
  imports: [CommonModule],
  templateUrl: './results-time.component.html',
  styleUrl: './results-time.component.scss'
})
export class ResultsTimeComponent {

  public hits!: number;
  public misses!: number;

  public message: string = '';
  public recordMessage: string = '';
  public score: number = 0;
  public hi_score: number = 0;

  public loaded: boolean = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(params => {
      this.hits = +params['hits'];
      this.misses = +params['misses'];

      this.saveHighScore()
      this.loadText()
      this.loaded = true
    });
  }

  loadText(): void {
    if (this.score >= 10000) {
      this.message = "You cheated didn't you?";
    }
    else if (this.score >= 6000) {
      this.message = "You are a pro!";
    }
    else if (this.score >= 5000) {
      this.message = "Super!";
    }
    else if (this.score >= 2000) {
      this.message = "Nice!";
    }
    else if (this.score >= 1500) {
      this.message = "Try harder!";
    }
    else if (this.score >= 0) {
      this.message = "Come on";
    }
    else if (this.misses === 10) {
      this.message = "So bad";
    }
}

  saveHighScore(): void {
      if (!localStorage.getItem('hi-score-time')){
        localStorage.setItem('hi-score-time', JSON.stringify(0))
      }

      this.score = this.hits

      this.hi_score = +localStorage.getItem('hi-score-time')!

      if (this.hi_score < this.score) {
        this.recordMessage = 'New Highscore!'
        localStorage.setItem('hi-score-time', JSON.stringify(this.score))
      }
    }



  startRounds(): void {
    this.router.navigateByUrl('play/time')
  }

  navigateHome(): void {
    this.router.navigateByUrl('')
  }

}
