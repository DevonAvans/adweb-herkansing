import { Component, ViewChild } from '@angular/core';
import {
  ApexChart,
  ApexAxisChartSeries,
  ChartComponent,
  ApexDataLabels,
  ApexPlotOptions,
  ApexYAxis,
  ApexLegend,
  ApexGrid,
} from 'ng-apexcharts';
import { ChartOptions } from './chartOptions';
import { ActivatedRoute } from '@angular/router';
import { Observable, of } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { TransactieService } from '@app/services/transactie.service';
import { Transactie } from '@app/models/transactie';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { NgApexchartsModule } from 'ng-apexcharts';

@Component({
  selector: 'app-line-chart',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, NgApexchartsModule],
  templateUrl: './line-chart.component.html',
  styleUrl: './line-chart.component.scss'
})
export class LineChartComponent {
  @ViewChild('chart') chart: LineChartComponent | undefined;
  public chartOptions!: ChartOptions;
  public id: string = '';
  public isFirst: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private transactieService: TransactieService,
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.id = params['id'];
      this.getUitgavenInkomstenPerHuishoudboekje(this.id);
    });
    this.chartOptions = {
      series: [
        {
          name: 'Desktops',
          data: [],
        },
      ],
      chart: {
        height: 350,
        type: 'line',
        zoom: {
          enabled: false,
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: 'straight',
      },
      title: {
        text: 'Uitgaven en inkomsten per maand',
        align: 'left',
      },
      grid: {
        row: {
          colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
          opacity: 0.5,
        },
      },
      xaxis: {
        categories: [],
      },
    };

    
  }

  public getUitgavenInkomstenPerHuishoudboekje(id: string) {
    const dataSource$: Observable<Transactie[]> = of([]);
  
    const data$: Observable<Transactie[]> = dataSource$.pipe(
      mergeMap(() => this.transactieService.readTransactiesOfHuishoudboekje(id))
    );
  
    data$.subscribe((uitgavenInkomsten: Transactie[]) => {
      uitgavenInkomsten.sort((a, b) => {
        const dateATime = a.dateTime.toMillis();
        const dateBTime = b.dateTime.toMillis();
        
        return dateATime - dateBTime; 
      });
  
      let totalUitgaven = 0;
      let totalInkomsten = 0;
      const monthDataMap = new Map<string, { uitgaven: number; inkomsten: number }>();
  
      uitgavenInkomsten.forEach((transaction: Transactie) => {
        const { dateTime, amount, type } = transaction;
        const month = dateTime.toDate().toLocaleString('default', { month: 'long' });
        const value = type === 'uitgaven' ? -amount : amount;
  
        if (type === 'uitgaven') {
          totalUitgaven += Number(value);
        } else {
          totalInkomsten += Number(value);
        }
  
        const existingData = monthDataMap.get(month) || { uitgaven: 0, inkomsten: 0 };
        monthDataMap.set(month, {
          uitgaven: Number(existingData.uitgaven) + Number(type === 'uitgaven' ? value : 0),
          inkomsten: Number(existingData.inkomsten) + Number(type !== 'uitgaven' ? value : 0),
        });
      });
  
      const uitgavenData = Array.from(monthDataMap.values(), (data) => data.uitgaven);
      const inkomstenData = Array.from(monthDataMap.values(), (data) => data.inkomsten);
  
      const months = Array.from(monthDataMap.keys());
  
      this.chartOptions.series = [
        {
          name: 'Uitgaven',
          data: uitgavenData,
        },
        {
          name: 'Inkomsten',
          data: inkomstenData,
        },
      ];
      this.chartOptions.xaxis = {
        categories: months,
      };
      this.isFirst = true;
    });
  }
}
