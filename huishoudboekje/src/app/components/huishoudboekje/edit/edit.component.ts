import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Huishoudboekje } from "@app/models/huishoudboekje";
import { HuishoudboekjeService } from "@app/services/huishoudboekje.service";
import { FormGroup, FormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatOption } from "@angular/material/core";
import { CommonModule, Location } from "@angular/common";
import { UserService } from "@app/services/user.service";
import { AuthService } from "@app/services/auth.service";

@Component({
    selector: "app-edit",
    standalone: true,
    imports: [
        CommonModule,
        FormsModule,
        MatButtonModule,
        MatCheckboxModule,
        MatFormFieldModule,
        MatInputModule,
        MatOption,
    ],
    templateUrl: "./edit.component.html",
    styleUrl: "./edit.component.scss",
})
export class EditComponent implements OnInit {
    huishoudboekje: Huishoudboekje | undefined;
    huishoudboekjeForm!: FormGroup;
    allParticipants: string[] = [];
    selectedParticipants: string[] = [];

    constructor(
        private _route: ActivatedRoute,
        private _huishoudboekjeService: HuishoudboekjeService,
        private _authService: AuthService,
        private _userService: UserService,
        private _location: Location
    ) {}

    ngOnInit(): void {
        this._route.params.subscribe((params) => {
            const huishoudboekjeId = params["id"];
            this._huishoudboekjeService
                .readHuishoudboekje(huishoudboekjeId)
                .subscribe((huishoudboekje) => {
                    this.huishoudboekje = huishoudboekje;
                    if (huishoudboekje.participants) {
                        this.selectedParticipants = huishoudboekje.participants;
                    }
                });
        });
        const userEmail = this._authService.user$.value?.email!;
        this._userService
            .readAllUserExceptYourself(userEmail)
            .subscribe((users) => {
                this.allParticipants = users.map((user) => user.email);
            });
    }

    isParticipantSelected(participant: string): boolean {
        return this.selectedParticipants.includes(participant);
    }

    onParticipantChange(participant: string, isChecked: boolean): void {
        if (isChecked) {
            this.selectedParticipants.push(participant);
        } else {
            const index = this.selectedParticipants.indexOf(participant);
            if (index !== -1) {
                this.selectedParticipants.splice(index, 1);
            }
        }
    }

    saveChanges(): void {
        if (this.huishoudboekje) {
            this._huishoudboekjeService.updateHuishoudboekje(
                this.huishoudboekje
            );
            this._location.back();
        }
    }
}
