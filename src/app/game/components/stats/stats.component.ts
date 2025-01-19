import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'game-stats',
  imports: [CommonModule],
  templateUrl: './stats.component.html',
  styleUrl: './stats.component.scss'
})
export class StatsComponent {

  @Input()
  public score: number = 0;

  @Input()
  public misses: number = -1;

  @Input()
  public time: number = 0;

  @Input()
  public round: number = 0;
  
}
