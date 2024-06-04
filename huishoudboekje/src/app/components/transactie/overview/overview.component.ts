import { CommonModule, NgFor } from "@angular/common";
import { Component } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatCardModule } from "@angular/material/card";
import { ActivatedRoute } from "@angular/router";
import { Transactie } from "@app/models/transactie";
import { TransactieService } from "@app/services/transactie.service";
import { Observable } from "rxjs";

@Component({
    selector: "app-overview-transactie",
    standalone: true,
    imports: [
        CommonModule,
        FormsModule,
        MatCardModule,
        NgFor,
        ReactiveFormsModule,
    ],
    templateUrl: "./overview.component.html",
    styleUrl: "./overview.component.scss",
})
export class TransactieOverviewComponent {
    private _huishoudboekjeId: string;
    public transacties: Transactie[] = [];

    constructor(
        private _route: ActivatedRoute,
        private _transactieService: TransactieService
    ) {
        this._huishoudboekjeId = this._route.snapshot.paramMap.get("id") ?? "";
        _transactieService
            .readTransactiesOfHuishoudboekje(this._huishoudboekjeId)
            .subscribe((transacties) => {
                this.transacties = transacties;
            });
    }

    public editTransactie(transactie: Transactie) {
        this._transactieService.updateTransactie(transactie);
    }

    public deleteTransactie(transactie: Transactie) {
        this._transactieService.deleteTransactie(transactie);
    }
}
