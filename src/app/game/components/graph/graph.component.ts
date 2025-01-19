import { Component, Input } from '@angular/core';
import { ApexOptions, NgApexchartsModule } from 'ng-apexcharts'; 

@Component({
  selector: 'game-graph',
  imports: [NgApexchartsModule],
  templateUrl: './graph.component.html',
  styleUrl: './graph.component.scss'
})
export class GraphComponent {

  @Input()
  public hits: number = 0;

  @Input()
  public misses: number = 0;

  public chartOptions: ApexOptions = {
    chart: {
      type: 'bar',
      height: 150,
      toolbar: {
        show: false
      }
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '40%',
      }
    },
    dataLabels: {
      enabled: false
    },
    xaxis: {
      categories: ['Hits', 'Misses']
    },
    series: [{
      name: 'Scores',
      data: [0, 0] // Valores iniciales
    }]
  };


  ngOnInit(): void {
    if (this.chartOptions.series) {
      this.chartOptions.series = [{
        name: 'Scores',
        data: [this.hits, this.misses]
      }];
    }
  }
}
