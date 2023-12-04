import { Component, Input, OnInit } from '@angular/core';
import * as ChartJs from 'chart.js/auto';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css'],
})
export class ChartComponent implements OnInit {
  @Input() oddCount: number = 0;
  @Input() evenCount: number = 0;

  chart: any;

  ngOnInit(): void {
    const data = [
      { users: 'Workers', count: this.oddCount },
      { users: 'Boss', count: this.evenCount },
    ];
    this.chart = new ChartJs.Chart('MyChart', {
      type: 'bar',
      data: {
        labels: data.map((row) => row.users),
        datasets: [
          {
            label: 'Entreprise stats',
            data: data.map((row) => row.count),
          },
        ],
      },
    });
  }
}
