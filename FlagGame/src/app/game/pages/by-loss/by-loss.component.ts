import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { LevelComponent } from '../../components/level/level.component';
import { StatsComponent } from '../../components/stats/stats.component';

@Component({
  selector: 'app-by-loss',
  imports: [LevelComponent, StatsComponent],
  templateUrl: './by-loss.component.html',
  styleUrl: './by-loss.component.scss'
})
export class ByLossComponent {

  @ViewChild('level') levelComponent!: LevelComponent;

  public round: number = 0;
  public hits: number = 0;
  public misses: number = 0;
  public timer: number = 10;
  public timerRunning: boolean = false;
  public lastRoundFlag: boolean = false;


  constructor(
    private router: Router
  ) {}


  onStartRound( number: number ): void {
    this.round++
    this.timer = 10;
    this.timerRunning = true;
    this.runTimer();
  }




  onScore( number: number ): void {
    this.timerRunning = false;
    
    if (number === 0) {
      this.lastRoundFlag = true; 
    }else{
      this.hits += number
    }
  }




  onTimerStop( ): void {
    this.timerRunning = false;
    this.levelComponent.endRound()
  }




  private runTimer(): void {

    if (this.timer > 0 && this.timerRunning) {
      setTimeout(() => {
        if(this.timerRunning){
          this.timer--;
          this.runTimer();
        }
      }, 1000);

    } else if (this.timer === 0) {
      this.onTimerStop();
    }
  }




  onEndLevel(): void {
    let hits = this.hits
    let misses = this.misses
    this.router.navigate(['results/infinite'], {
      queryParams: {
        hits: hits,
        misses: misses,
      }
    });
  }




}
