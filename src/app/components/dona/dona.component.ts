import { Component, OnInit, Input } from '@angular/core';
import { ChartData, ChartEvent, ChartType, Color } from 'chart.js';

@Component({
  selector: 'app-dona',
  templateUrl: './dona.component.html',
  styles: [
  ]
})
export class DonaComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {

    this.doughnutChartData = {
      labels: this.doughnutChartLabels,
    datasets: [
      { data: this.data,
        backgroundColor: [ '#6857E6', '#009FEE', '#F02059']
       },
      
    ]
  }
  }

  @Input('title') title :string = 'Sin titulo';

  @Input('labels') doughnutChartLabels: string[] = [];
  @Input('data') data :number[] = [];
  public doughnutChartData: ChartData<'doughnut'> = {datasets:[]};
  public doughnutChartType: ChartType = 'doughnut';

}
