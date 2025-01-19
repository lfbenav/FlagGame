import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-results-infinite',
  imports: [CommonModule],
  templateUrl: './results-infinite.component.html',
  styleUrl: './results-infinite.component.scss'
})
export class ResultsInfiniteComponent {
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

      this.loadText()
      this.saveHighScore()
      this.loaded = true
    });
  }

  loadText(): void {
    if (this.hits === 0){
      this.message = "You can do better than this."
    }
    else if (this.hits === 1){
      this.message = "Mediocre."
    }
    else if (this.hits > 10){
      this.message = "You are a legend!"
    }
    else if (this.hits > 5){
      this.message = "SUPER!"
    }
    else if (this.hits > 3){
      this.message = "Cool!"
    }
  }

  saveHighScore(): void {
      if (!localStorage.getItem('hi-score-infinite')){
        localStorage.setItem('hi-score-infinite', JSON.stringify(0))
      }

      this.score = this.hits

      this.hi_score = +localStorage.getItem('hi-score-infinite')!

      if (this.hi_score < this.score) {
        this.recordMessage = 'New Highscore!'
        localStorage.setItem('hi-score-infinite', JSON.stringify(this.score))
      }
    }



  startRounds(): void {
    this.router.navigateByUrl('play/infinite')
  }

  navigateHome(): void {
    this.router.navigateByUrl('')
  }

}
