import { Component, Input } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { ROUTES } from "@app/app.constants";
import { Transactie } from "@app/models/transactie";
import { TransactieService } from "@app/services/transactie.service";
import { Router } from "@angular/router";

@Component({
    selector: "app-transactie-card",
    standalone: true,
    imports: [MatButtonModule, MatCardModule],
    templateUrl: "./card.component.html",
    styleUrl: "./card.component.scss",
})
export class TransactieCardComponent {
    @Input() transactie!: Transactie;
    constructor(
        private _transactieService: TransactieService,
        private _router: Router
    ) {}

    public editTransactie(transactie: Transactie) {
        this._router.navigate([ROUTES.TRANSACTIE, transactie.id, "edit"]);
    }

    public deleteTransactie(transactie: Transactie) {
        this._transactieService.deleteTransactie(transactie);
    }
}
