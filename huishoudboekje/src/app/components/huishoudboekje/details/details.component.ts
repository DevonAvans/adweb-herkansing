import { ChangeDetectorRef, Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Huishoudboekje } from "@app/models/huishoudboekje";
import { HuishoudboekjeService } from "@app/services/huishoudboekje.service";
import { BehaviorSubject, Observable } from "rxjs";
import { NgIf } from "@angular/common";
import { CommonModule } from "@angular/common";
import { MatCardModule } from "@angular/material/card";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { TransactieCreateComponent } from "@components/transactie/create/create.component";
import { TransactieOverviewComponent } from "@components/transactie/overview/overview.component";
import { ROUTES } from "@app/app.constants";
import { BarChartComponent } from "@components/charts/bar-chart/bar-chart.component";
import { LineChartComponent } from "@components/charts/line-chart/line-chart.component";
import { MonthPickerComponent } from "@components/month-picker/month-picker.component";
import * as _moment from "moment";
import { default as _rollupMoment, Moment } from "moment";
import { CreateComponent } from "@components/categorie/create/create.component";
import { MatButtonModule } from "@angular/material/button";
import { MatFormFieldModule } from "@angular/material/form-field";
import { FormControl, ReactiveFormsModule } from "@angular/forms";
import { TransactieService } from "@app/services/transactie.service";
import { Transactie } from "@app/models/transactie";
const moment = _rollupMoment || _moment;

@Component({
    selector: "app-details",
    standalone: true,
    imports: [
        CommonModule,
        MatDatepickerModule,
        MatCardModule,
        MatButtonModule,
        MatFormFieldModule,
        ReactiveFormsModule,
        MonthPickerComponent,
        NgIf,
        TransactieCreateComponent,
        TransactieOverviewComponent,
        BarChartComponent,
        LineChartComponent,
        CreateComponent,
    ],
    templateUrl: "./details.component.html",
    styleUrl: "./details.component.scss",
})
export class DetailsComponent implements OnInit {
    private _huishoudboekjeId: string;
    huishoudboekje!: Huishoudboekje;
    public selectedDate$: BehaviorSubject<Date>;
    public date = new FormControl(moment());

    constructor(
        private _route: ActivatedRoute,
        private _router: Router,
        private _huishoudboekjeService: HuishoudboekjeService
    ) {
        this._huishoudboekjeId = this._route.snapshot.paramMap.get("id")!;
        this.selectedDate$ = new BehaviorSubject(moment().toDate());
    }

    ngOnInit(): void {
        if (this._huishoudboekjeId === null) {
            this._router.navigate([ROUTES.DASHBOARD]);
            return;
        }
        this._huishoudboekjeService
            .readHuishoudboekje(this._huishoudboekjeId)
            .subscribe((huishoudboekje) => {
                this.huishoudboekje = huishoudboekje;
            });
    }

    onDateChange(date: Moment) {
        this.selectedDate$.next(date.toDate());
    }

    openCreateTransactie() {
        this._router.navigate([
            ROUTES.HUISHOUDBOEKJE,
            this._huishoudboekjeId,
            "transactie",
        ]);
    }

    openCreateCategorie() {
        this._router.navigate([
            ROUTES.HUISHOUDBOEKJE,
            this._huishoudboekjeId,
            "categorie",
        ]);
    }

    test() {}
}
