import { NgFor } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import {
    FormControl,
    FormGroup,
    FormsModule,
    ReactiveFormsModule,
    Validators,
} from "@angular/forms";
import { MatButton } from "@angular/material/button";
import { MatOption } from "@angular/material/core";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatSelectModule } from "@angular/material/select";
import { ActivatedRoute } from "@angular/router";
import { Categorie } from "@app/models/categorie";
import { TransactieType } from "@app/models/transactie";
import { TransactieService } from "@app/services/transactie.service";
import { CategorieService } from "@services/categorie.service";
import { Timestamp } from "firebase/firestore";

@Component({
    selector: "app-create-transactie",
    standalone: true,
    imports: [
        FormsModule,
        MatButton,
        MatFormFieldModule,
        MatInputModule,
        MatOption,
        MatSelectModule,
        NgFor,
        ReactiveFormsModule,
    ],
    templateUrl: "./create.component.html",
    styleUrl: "./create.component.scss",
})
export class TransactieCreateComponent {
    public form: FormGroup;
    public options: TransactieType[] = ["uitgaven", "inkomen"];
    public categories: Categorie[] = [];
    private _huishoudboekjeId: string;

    constructor(
        private _transactieService: TransactieService,
        private _categorieService: CategorieService,
        private _route: ActivatedRoute
    ) {
        this.form = new FormGroup({
            dateTime: new FormControl(new Date(), Validators.required),
            amount: new FormControl(0, Validators.required),
            selectedOptionType: new FormControl("", Validators.required),
            selectedOptionCategory: new FormControl(null, Validators.required),
        });
        this._huishoudboekjeId = this._route.snapshot.paramMap.get("id") ?? "";
    }

    ngOnInit() {
        this.loadCategories();
    }

    private loadCategories() {
        this._categorieService.readByHuishoudboekjeId(this._huishoudboekjeId).subscribe((categories) => {
            this.categories = categories;
        });
    }

    public onSubmit() {
        if (!this.form.valid) {
            return;
        }
        const formValue = this.form.value;
        const selectedDatum: Date = formValue.dateTime;
        this._transactieService.createTransactie({
            type: formValue.selectedOptionType,
            amount: formValue.amount,
            huishoudboekje: this._huishoudboekjeId,
            category: formValue.selectedOptionCategory,
            dateTime: Timestamp.fromDate(selectedDatum),
        });
        this.form.reset();
    }

    public validateNumber(event: any) {
        console.log(event);
        const inputValue = event.target.value;
        const pattern = /^[0-9]*$/;

        if (!pattern.test(inputValue)) {
            // Remove non-numeric characters from the input value
            const numericValue = inputValue.replace(/[^0-9]/g, "");
            event.target.value = numericValue;
        }
    }
}
