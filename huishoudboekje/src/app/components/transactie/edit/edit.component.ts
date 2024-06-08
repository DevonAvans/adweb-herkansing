import { NgFor, NgIf } from "@angular/common";
import { Component } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatOption } from "@angular/material/core";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatSelectModule } from "@angular/material/select";
import { ActivatedRoute } from "@angular/router";
import { Transactie, TransactieType } from "@app/models/transactie";
import { TransactieService } from "@app/services/transactie.service";

@Component({
    selector: "app-transactie-edit",
    standalone: true,
    imports: [
        FormsModule,
        MatButtonModule,
        MatFormFieldModule,
        MatInputModule,
        MatOption,
        MatSelectModule,
        NgFor,
        NgIf,
        ReactiveFormsModule,
    ],
    templateUrl: "./edit.component.html",
    styleUrl: "./edit.component.scss",
})
export class TransactieEditComponent {
    public options: TransactieType[] = ["uitgaven", "inkomen"];
    private _transactionId: string;
    public transactie: Transactie | null = null;

    constructor(
        private _transactieService: TransactieService,
        private _route: ActivatedRoute
    ) {
        this._transactionId = this._route.snapshot.paramMap.get("id") ?? "";
        this._transactieService
            .readTransaction(this._transactionId)
            .subscribe((data) => {
                this.transactie = data;
            });
    }

    public onSubmit() {
        this._transactieService.updateTransactie(this.transactie!);
    }

    public validateNumber(event: Event) {
        const inputValue = (event.target as HTMLInputElement).value;
        const pattern = /^[0-9]*$/;

        if (!pattern.test(inputValue)) {
            // Remove non-numeric characters from the input value
            const numericValue = inputValue.replace(/[^0-9]/g, "");
            (event.target as HTMLInputElement).value = numericValue;
        }
    }
}
