import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Huishoudboekje } from "@app/models/huishoudboekje";
import { HuishoudboekjeService } from "@app/services/huishoudboekje.service";
import { Observable } from "rxjs";
import { NgIf } from "@angular/common";
import { CommonModule } from "@angular/common";
import { MatCardModule } from "@angular/material/card";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { TransactieCreateComponent } from "@app/components/transactie/create/create.component";
import { TransactieOverviewComponent } from "@app/components/transactie/overview/overview.component";
import { ROUTES } from "@app/app.constants";
import { BarChartComponent } from "@app/components/charts/bar-chart/bar-chart.component";
import { LineChartComponent } from "@app/components/charts/line-chart/line-chart.component";
import { MonthPickerComponent } from "@app/components/month-picker/month-picker.component";
import * as _moment from "moment";
import { default as _rollupMoment, Moment } from "moment";
const moment = _rollupMoment || _moment;

@Component({
    selector: "app-details",
    standalone: true,
    imports: [
        CommonModule,
        MatDatepickerModule,
        MatCardModule,
        MonthPickerComponent,
        NgIf,
        TransactieCreateComponent,
        TransactieOverviewComponent,
        BarChartComponent,
        LineChartComponent,
    ],
    templateUrl: "./details.component.html",
    styleUrl: "./details.component.scss",
})
export class DetailsComponent implements OnInit {
    huishoudboekje$: Observable<Huishoudboekje | null> | undefined;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private huishoudboekjeService: HuishoudboekjeService
    ) {}

    ngOnInit(): void {
        let id = this.route.snapshot.paramMap.get("id");
        if (id === null) {
            this.router.navigate([ROUTES.DASHBOARD]);
            return;
        }
        this.huishoudboekje$ =
            this.huishoudboekjeService.readHuishoudboekje(id);
    }

    selectedDate: Moment = moment();

    onDateChange(date: Moment) {
        this.selectedDate = date;
    }
}
