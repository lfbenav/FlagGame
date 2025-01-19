import { GameService } from './../../services/game.service';
import { Component, ViewChild } from '@angular/core';
import { LevelComponent } from "../../components/level/level.component";
import { StatsComponent } from "../../components/stats/stats.component";
import { Router } from '@angular/router';

@Component({
  selector: 'app-by-rounds',
  imports: [LevelComponent, StatsComponent],
  templateUrl: './by-rounds.component.html',
  styleUrl: './by-rounds.component.scss'
})
export class ByRoundsComponent {

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
    this.router.navigate(['results/rounds'], {
      queryParams: {
        hits: hits,
        misses: misses,
      }
    });
  }




}
