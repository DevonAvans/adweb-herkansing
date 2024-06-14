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
import { MatOptionModule } from "@angular/material/core";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatSelectModule } from "@angular/material/select";
import { MatToolbarModule } from "@angular/material/toolbar";
import { User } from "@app/models/user";
import { AuthService } from "@app/services/auth.service";
import { HuishoudboekjeService } from "@app/services/huishoudboekje.service";
import { UserService } from "@app/services/user.service";

@Component({
    selector: "app-huishoudboekje-create",
    standalone: true,
    imports: [
        CommonModule,
        FormsModule,
        MatButtonModule,
        MatCardModule,
        MatFormFieldModule,
        MatSelectModule,
        MatInputModule,
        MatOptionModule,
        MatButtonModule,
        MatToolbarModule,
        NgFor,
        ReactiveFormsModule,
    ],
    templateUrl: "./create.component.html",
    styleUrl: "./create.component.scss",
})
export class HuishoudboekjeCreateComponent implements OnInit {
    public form!: FormGroup;
    showArchived: boolean = false;
    public users: User[] = [];

    constructor(
        private _huishoudboekjeService: HuishoudboekjeService,
        private _authService: AuthService,
        private _userService: UserService
    ) {}

    ngOnInit(): void {
        const userEmail = this._authService.user$.value?.email!;
        this.initForm();

        this._userService
            .readAllUserExceptYourself(userEmail)
            .subscribe((users) => {
                this.users = users;
            });
    }

    onSubmit(): void {
        if (!this.form.valid) {
            return;
        }
        const userEmail = this._authService.user$.value?.email!;
        const formValue = this.form.value;
        this._huishoudboekjeService.addHuishoudboekje({
            owner: userEmail,
            name: formValue.name,
            description: formValue.description,
            archive: false,
            participants: formValue.participants,
        });
        this.initForm();
    }

    private initForm() {
        this.form = new FormGroup({
            name: new FormControl("", Validators.required),
            description: new FormControl("", Validators.required),
            participants: new FormControl(this.users),
        });
    }
}
