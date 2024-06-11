import { CommonModule, NgFor } from "@angular/common";
import { Component } from "@angular/core";
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
    imports: [
        CommonModule,
        FormsModule,
        MatButtonModule,
        MatDatepickerModule,
        MatCardModule,
        MatFormFieldModule,
        MatInputModule,
        MatLabel,
        MatOption,
        MatSelectModule,
        NgFor,
        TransactieCardComponent,
        ReactiveFormsModule,
    ],
    providers: [provideMomentDateAdapter(MY_FORMATS)],
    templateUrl: "./overview.component.html",
    styleUrl: "./overview.component.scss",
})
export class TransactieOverviewComponent {
    private _huishoudboekjeId: string;
    public transacties: Transactie[] = [];
    public date = new FormControl(moment());

    constructor(
        private _route: ActivatedRoute,
        private _transactieService: TransactieService
    ) {
        this._huishoudboekjeId = this._route.snapshot.paramMap.get("id") ?? "";
        this.readTransactions();
    }

    private readTransactions() {
        this._transactieService
            .readTransactiesOfHuishoudboekje(
                this._huishoudboekjeId,
                this.date.value?.toDate()!
            )
            .subscribe((transacties) => {
                this.transacties = transacties;
            });
    }

    public setMonthAndYear(
        normalizedMonthAndYear: Moment,
        datepicker: MatDatepicker<Moment>
    ) {
        const ctrlValue = this.date.value ?? moment();
        ctrlValue.month(normalizedMonthAndYear.month());
        ctrlValue.year(normalizedMonthAndYear.year());
        this.date.setValue(ctrlValue);
        datepicker.close();
        this.readTransactions();
    }
}
