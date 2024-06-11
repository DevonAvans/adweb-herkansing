import { CommonModule, NgFor } from "@angular/common";
import { Component, Input, OnInit } from "@angular/core";
import { FormControl, FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatOption } from "@angular/material/core";
import {
    MatDatepicker,
    MatDatepickerModule,
} from "@angular/material/datepicker";
import { MatFormFieldModule, MatLabel } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatSelectModule } from "@angular/material/select";
import { ActivatedRoute } from "@angular/router";
import { Transactie } from "@app/models/transactie";
import { TransactieService } from "@app/services/transactie.service";
import * as _moment from "moment";
import { default as _rollupMoment, Moment } from "moment";
const moment = _rollupMoment || _moment;
import { provideMomentDateAdapter } from "@angular/material-moment-adapter";
import { TransactieCardComponent } from "../card/card.component";

export const MY_FORMATS = {
    parse: {
        dateInput: "MM-YYYY",
    },
    display: {
        dateInput: "MM-YYYY",
        monthYearLabel: "MMM YYYY",
        dateA11yLabel: "LL",
        monthYearA11yLabel: "MMMM YYYY",
    },
};

@Component({
    selector: "app-transactie-overview",
    standalone: true,
    imports: [NgFor, TransactieCardComponent],
    providers: [provideMomentDateAdapter(MY_FORMATS)],
    templateUrl: "./overview.component.html",
    styleUrl: "./overview.component.scss",
})
export class TransactieOverviewComponent implements OnInit {
    @Input() date!: Date;

    private _huishoudboekjeId: string;
    public transacties: Transactie[] = [];

    constructor(
        private _route: ActivatedRoute,
        private _transactieService: TransactieService
    ) {
        this._huishoudboekjeId = this._route.snapshot.paramMap.get("id") ?? "";
    }

    ngOnInit(): void {
        this.readTransactions();
    }

    private readTransactions() {
        this._transactieService
            .readTransactiesOfHuishoudboekje(this._huishoudboekjeId, this.date)
            .subscribe((transacties) => {
                this.transacties = transacties;
            });
    }
}
