import { Component } from "@angular/core";
import { TransactieService } from "@app/services/transactie.service";

@Component({
    selector: "app-transactie-edit",
    standalone: true,
    imports: [],
    templateUrl: "./edit.component.html",
    styleUrl: "./edit.component.scss",
})
export class TransactieEditComponent {
    constructor(private _transactieService: TransactieService) {}
}
