import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GraphComponent } from '../../components/graph/graph.component';

@Component({
  selector: 'app-results',
  imports: [CommonModule, GraphComponent],
  templateUrl: './results.component.html',
  styleUrl: './results.component.scss'
})
export class ResultsComponent {

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
    if (this.hits > this.misses + 10) {
      this.message = "You rock!"
    } else if (this.hits > this.misses) {
      this.message = "Nice!"
    } else if (this.hits === this.misses) {
      this.message = "Mid"
    } else {
      this.message = "Better start studying"
    }
  }

  saveHighScore(): void {
      if (!localStorage.getItem('hi-score-rounds')){
        localStorage.setItem('hi-score-rounds', JSON.stringify(0))
      }

      this.score = Math.floor(this.hits / (this.hits + this.misses) * 100)

      this.hi_score = +localStorage.getItem('hi-score-rounds')!

      if (this.hi_score < this.score) {
        this.recordMessage = 'New Highscore!'
        localStorage.setItem('hi-score-rounds', JSON.stringify(this.score))
      }
    }



  startRounds(): void {
    this.router.navigateByUrl('play/rounds')
  }

  navigateHome(): void {
    this.router.navigateByUrl('')
  }

}
