import { CommonModule, NgFor } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import {
    FormControl,
    FormGroup,
    FormsModule,
    ReactiveFormsModule,
    Validators,
} from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatToolbarModule } from "@angular/material/toolbar";
import { AuthService } from "@app/services/auth.service";
import { HuishoudboekjeService } from "@app/services/huishoudboekje.service";

@Component({
    selector: "app-huishoudboekje-create",
    standalone: true,
    imports: [
        MatCardModule,
        NgFor,
        FormsModule,
        CommonModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatToolbarModule,
        ReactiveFormsModule,
    ],
    templateUrl: "./create.component.html",
    styleUrl: "./create.component.scss",
})
export class HuishoudboekjeCreateComponent implements OnInit {
    public form!: FormGroup;
    showArchived: boolean = false;

    constructor(
        private _huishoudboekjeService: HuishoudboekjeService,
        private _authService: AuthService
    ) {}

    ngOnInit(): void {
        this.initForm();
    }

    onSubmit(): void {
        if (!this.form.valid) {
            return;
        }
        const userEmail = this._authService.user$.value?.email!;
        const formValue = this.form.value;
        const participants: string = formValue.participants;
        const emailArray =
            participants === ""
                ? []
                : participants.split(",").map((email) => email.trim());
        console.log(emailArray);
        this._huishoudboekjeService.addHuishoudboekje({
            owner: userEmail,
            name: formValue.name,
            description: formValue.description,
            archive: false,
            participants: emailArray,
        });
        this.initForm();
    }

    private initForm() {
        this.form = new FormGroup({
            name: new FormControl("", Validators.required),
            description: new FormControl("", Validators.required),
            participants: new FormControl("", Validators.required),
        });
    }
}
