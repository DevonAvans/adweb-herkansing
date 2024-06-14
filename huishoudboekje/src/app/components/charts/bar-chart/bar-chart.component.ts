import { Component, ViewChild, OnInit, Input } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { BehaviorSubject, Observable, of } from "rxjs";
import { map, mergeMap } from "rxjs/operators";
import { ChartOptions } from "./chartOptions";
import { HuishoudboekjeService } from "@app/services/huishoudboekje.service";
import { Transactie } from "@app/models/transactie";
import { TransactieService } from "@app/services/transactie.service";
import { NgApexchartsModule } from "ng-apexcharts";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";
import { ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import {
    ChartComponent,
    ApexAxisChartSeries,
    ApexChart,
    ApexXAxis,
    ApexTitleSubtitle,
} from "ng-apexcharts";
import { Categorie } from "@app/models/categorie";
import { CategorieService } from "@app/services/categorie.service";

@Component({
    selector: "app-bar-chart",
    standalone: true,
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        NgApexchartsModule,
    ],
    templateUrl: "./bar-chart.component.html",
    styleUrl: "./bar-chart.component.scss",
})
export class BarChartComponent {
    @Input() date$!: BehaviorSubject<Date>;
    @ViewChild("chart") chart: ChartComponent | undefined;
    public chartOptions!: ChartOptions;
    huishoudBoekjeId: string = "";
    isFirstLoad: boolean = false;

    constructor(
        private route: ActivatedRoute,
        private transactieService: TransactieService,
        private _categorieService: CategorieService
    ) {}

    ngOnInit() {
        this.route.paramMap.subscribe((params) => {
            this.huishoudBoekjeId = params.get("id") || "";
            this.initColomChartData(this.huishoudBoekjeId);
        });

        this.chartOptions = {
            series: [], // Will be populated in initColomChartData
            chart: {
                type: "bar",
                height: 350,
            },
            plotOptions: {
                bar: {
                    horizontal: false,
                    columnWidth: "30%",
                },
            },
            dataLabels: {
                enabled: false,
            },
            stroke: {
                show: true,
                width: 2,
                colors: ["transparent"],
            },
            xaxis: {
                categories: [], // Will be populated in initColomChartData
            },
            yaxis: {
                title: {
                    text: "Aantal €",
                },
            },
            fill: {
                opacity: 1,
            },
            tooltip: {
                y: {
                    formatter: function (val) {
                        return "€ " + val + " euro";
                    },
                },
            },
            legend: {
                show: true,
            },
        };
    }

    public initColomChartData(huishoudBoekjeID: string): void {
        const initialData$: Observable<Transactie[]> = of([]);
        const categorieNaamMap = new Map<string, string>();

        const categorieData$: Observable<Categorie[]> =
            this._categorieService.readAll();

        categorieData$.subscribe((categorieen) => {
            categorieen.forEach((categorie) => {
                if (categorie.id && categorie.name) {
                    categorieNaamMap.set(categorie.id, categorie.name);
                }
            });

            this.date$.subscribe((date) => {
                const data$: Observable<Transactie[]> = initialData$.pipe(
                    mergeMap(() =>
                        this.transactieService.readTransactiesOfHuishoudboekje(
                            huishoudBoekjeID,
                            date
                        )
                    )
                );

                data$.subscribe((transacties: Transactie[]) => {
                    transacties.sort((a, b) => {
                        if (a.type === b.type) {
                            const categoryNameA = a.category || "";
                            const categoryNameB = b.category || "";
                            return categoryNameA.localeCompare(categoryNameB);
                        } else {
                            return a.type === "uitgaven" ? -1 : 1;
                        }
                    });

                    let totalUitgaven = 0;
                    let totalInkomsten = 0;
                    const categoryDataMap = new Map<
                        string,
                        { uitgaven: number; inkomsten: number }
                    >();

                    transacties.forEach((transaction: Transactie) => {
                        const { amount, type, category } = transaction;
                        const value = type === "uitgaven" ? +amount : amount;

                        if (type === "uitgaven") {
                            totalUitgaven += Number(value);
                        } else {
                            totalInkomsten += Number(value);
                        }

                        if (category) {
                            const categoryName =
                                categorieNaamMap.get(category) || category;
                            const existingData = categoryDataMap.get(
                                categoryName
                            ) || { uitgaven: 0, inkomsten: 0 };
                            categoryDataMap.set(categoryName, {
                                uitgaven:
                                    Number(existingData.uitgaven) +
                                    Number(type === "uitgaven" ? value : 0),
                                inkomsten:
                                    Number(existingData.inkomsten) +
                                    Number(type !== "uitgaven" ? value : 0),
                            });
                        }
                    });

                    const uitgavenData = Array.from(
                        categoryDataMap.values(),
                        (data) => data.uitgaven
                    );
                    const inkomstenData = Array.from(
                        categoryDataMap.values(),
                        (data) => data.inkomsten
                    );

                    const categories = Array.from(categoryDataMap.keys());

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
                    this.chartOptions.xaxis = {
                        categories: categories,
                    };
                    this.isFirstLoad = true;
                });
            });
        });
    }
}
