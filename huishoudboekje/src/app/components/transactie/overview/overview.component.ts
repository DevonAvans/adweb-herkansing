import { NgFor } from "@angular/common";
import {
    ChangeDetectorRef,
    Component,
    Input,
    OnChanges,
    OnInit,
    SimpleChanges,
} from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Transactie } from "@app/models/transactie";
import { TransactieService } from "@app/services/transactie.service";
import * as _moment from "moment";
import { default as _rollupMoment, Moment } from "moment";
const moment = _rollupMoment || _moment;
import { provideMomentDateAdapter } from "@angular/material-moment-adapter";
import { TransactieCardComponent } from "../card/card.component";
import { BehaviorSubject } from "rxjs";

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
    @Input() date$!: BehaviorSubject<Date>;

    private _huishoudboekjeId: string;
    public transacties: Transactie[] = [];

    constructor(
        private _route: ActivatedRoute,
        private _transactieService: TransactieService
    ) {
        this._huishoudboekjeId = this._route.snapshot.paramMap.get("id") ?? "";
    }

    ngOnInit(): void {
        this.date$.subscribe((date) => {
            this.readTransactions(date);
        });
    }

    private readTransactions(date: Date) {
        this._transactieService
            .readTransactiesOfHuishoudboekjePerMonth(this._huishoudboekjeId, date)
            .subscribe((transacties) => {
                this.transacties = transacties;
            });
    }
}
