import { Component, ElementRef, EventEmitter, Input, Output, QueryList, ViewChildren } from '@angular/core';
import { GameService } from '../../services/game.service';
import { Country } from '../../interfaces/countries.interface';
import confetti from 'canvas-confetti';

@Component({
  selector: 'game-level',
  imports: [],
  templateUrl: './level.component.html',
  styleUrl: './level.component.scss'
})
export class LevelComponent {

  @ViewChildren('boton') botones!: QueryList<ElementRef>;

  @Input()
  public isLastRound = false;

  @Output()
  public onStartRound = new EventEmitter<number>();

  @Output()
  public onScore = new EventEmitter<number>();

  @Output()
  public onEndLevel = new EventEmitter<boolean>();

  public opciones: Country[] = [];
  public opcionCorrecta?: Country;;

  constructor(
    private gameService: GameService
  ) {}




  ngOnInit(): void {
    this.startRound()
  }




  startRound(): void {

    // Obtener los paises del service
    this.gameService.getCountries()
      .subscribe( (countries) => {
        this.loadQuestion(countries)
        this.emitStartRound()
      })
  }




  loadQuestion( countries: Country[] ): void {
    if (countries.length < 4) { return }

    // Seleccionar las opciones
    this.opciones[0] = countries.splice(Math.floor(Math.random() * countries.length), 1)[0];
    this.opciones[1] = countries.splice(Math.floor(Math.random() * countries.length), 1)[0];
    this.opciones[2] = countries.splice(Math.floor(Math.random() * countries.length), 1)[0];
    this.opciones[3] = countries.splice(Math.floor(Math.random() * countries.length), 1)[0];

    // Seleccionar la opción correcta 
    this.opcionCorrecta = this.opciones[Math.floor(Math.random() * this.opciones.length)]
  }




  validateAnswer(name?: string): void {

    // Si seleccionó la opción correcta, emitir true
    if (name == this.opcionCorrecta?.name) {
  
      confetti({
        particleCount: 400,
        spread: 200,
        origin: { y: 1 },
      });

      this.emitScore(1)

    }else{
      this.emitScore(0)
    }

    // Estilizar los botones
    this.stylizeOptions()

    // Cargar la siguiente ronda
    this.nextRound()
  }




  nextRound(): void {

    // Si no se ha dado la señal de terminar, sigue
    setTimeout(() => {
      if (this.isLastRound) {
        this.emitEndLevel()

      } else {
        this.botones.forEach((boton) => {
          const el = boton.nativeElement;
          el.disabled = false;
          el.classList.remove('correct');
          el.classList.remove('incorrect');
        });
    
        this.startRound()
      }
    }, 2000)
  }




  endRound(): void {
    this.emitScore(0)
    this.stylizeOptions()
    this.nextRound();
  }




  emitEndLevel(): void {
    this.onEndLevel.emit(true);
  }




  emitScore(score: number): void {
    this.onScore.emit(score);
  }




  emitStartRound(): void {
    this.onStartRound.emit(1);
  }




  stylizeOptions(): void {
    this.botones.forEach( (boton) => {
      const el = boton.nativeElement;
      el.setAttribute('disabled', 'true');
      
      if (el.textContent == this.opcionCorrecta?.name){
        el.classList.add('correct');
  
      }else{
        el.classList.add('incorrect');
      }
    });
  }


}
