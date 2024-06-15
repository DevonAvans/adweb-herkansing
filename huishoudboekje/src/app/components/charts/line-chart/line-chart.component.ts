import { Component, Input, ViewChild } from "@angular/core";
import { ChartOptions } from "./chartOptions";
import { ActivatedRoute } from "@angular/router";
import { BehaviorSubject, Observable, of } from "rxjs";
import { mergeMap } from "rxjs/operators";
import { TransactieService } from "@app/services/transactie.service";
import { Transactie } from "@app/models/transactie";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { ReactiveFormsModule } from "@angular/forms";
import { NgApexchartsModule } from "ng-apexcharts";
import * as _moment from "moment";
import { default as _rollupMoment } from "moment";

const moment = _rollupMoment || _moment;

@Component({
    selector: "app-line-chart",
    standalone: true,
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        NgApexchartsModule,
    ],
    templateUrl: "./line-chart.component.html",
    styleUrls: ["./line-chart.component.scss"],
})
export class LineChartComponent {
    @Input() date$!: BehaviorSubject<Date>;
    @ViewChild("chart") chart: LineChartComponent | undefined;
    public chartOptions!: ChartOptions;
    public id: string = "";
    public isFirst: boolean = false;

    constructor(
        private route: ActivatedRoute,
        private transactieService: TransactieService
    ) {}

    ngOnInit() {
        this.route.params.subscribe((params) => {
            this.id = params["id"];
            this.getUitgavenInkomstenPerHuishoudboekje(this.id);
        });
        this.chartOptions = {
            series: [
                {
                    name: "Uitgaven",
                    data: [],
                },
                {
                    name: "Inkomsten",
                    data: [],
                },
            ],
            chart: {
                height: 350,
                type: "line",
                zoom: {
                    enabled: false,
                },
            },
            dataLabels: {
                enabled: false,
            },
            stroke: {
                curve: "straight",
            },
            title: {
                text: "Uitgaven en inkomsten per maand",
                align: "left",
            },
            grid: {
                row: {
                    colors: ["#f3f3f3", "transparent"],
                    opacity: 0.5,
                },
            },
            xaxis: {
                categories: moment.months(),
            },
        };
    }

    public getUitgavenInkomstenPerHuishoudboekje(id: string) {
        const dataSource$: Observable<Transactie[]> = of([]);

        this.date$.subscribe((date) => {
            const data$: Observable<Transactie[]> = dataSource$.pipe(
                mergeMap(() =>
                    this.transactieService.readTransactiesOfHuishoudboekjePerYear(
                        id,
                        date
                    )
                )
            );
            data$.subscribe((uitgavenInkomsten: Transactie[]) => {
                const uitgavenData = new Array(12).fill(0);
                const inkomstenData = new Array(12).fill(0);

                uitgavenInkomsten.forEach((transaction: Transactie) => {
                    const { dateTime, amount, type } = transaction;
                    const monthIndex = dateTime.toDate().getMonth();

                    if (type === "uitgaven") {
                        uitgavenData[monthIndex] += Number(amount);
                    } else {
                        inkomstenData[monthIndex] += Number(amount);
                    }
                });

                this.chartOptions.series = [
                    {
                        name: "Uitgaven",
                        data: uitgavenData,
                    },
                    {
                        name: "Inkomsten",
                        data: inkomstenData,
                    },
                ];
                this.isFirst = true;
            });
        });
    }
}
