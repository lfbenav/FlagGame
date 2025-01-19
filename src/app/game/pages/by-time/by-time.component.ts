import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { LevelComponent } from '../../components/level/level.component';
import { StatsComponent } from '../../components/stats/stats.component';

@Component({
  selector: 'app-by-time',
  imports: [LevelComponent, StatsComponent],
  templateUrl: './by-time.component.html',
  styleUrl: './by-time.component.scss'
})
export class ByTimeComponent {

  @ViewChild('level') levelComponent!: LevelComponent;

  public round: number = 0;
  public maxRounds: number = 10;
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
    if (this.round >= this.maxRounds){
      this.lastRoundFlag = true; 
    }
    this.timer = 10;
    this.timerRunning = true;
    this.runTimer();
  }




  onScore( number: number ): void {
    this.timerRunning = false;
    
    if (number === 0) {
      this.misses += 1

    }else{
      this.hits += number * this.timer * 100
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
    this.router.navigate(['results/time'], {
      queryParams: {
        hits: hits,
        misses: misses,
      }
    });
  }



}
