import { CommonModule, NgFor } from "@angular/common";
import { Component } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatToolbarModule } from "@angular/material/toolbar";
import { HeaderComponent } from "@app/components/dashboard/header/header.component";
import { Huishoudboekje } from "@app/models/huishoudboekje";
import { AuthService } from "@app/services/auth.service";
import { HuishoudboekjeService } from "@app/services/huishoudboekje.service";

@Component({
    selector: "app-huishoudboekje-create",
    standalone: true,
    imports: [
        HeaderComponent,
        MatCardModule,
        NgFor,
        FormsModule,
        CommonModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatToolbarModule,
    ],
    templateUrl: "./create.component.html",
    styleUrl: "./create.component.scss",
})
export class HuishoudboekjeCreateComponent {
    newHuishoudboekje: Huishoudboekje = {
        name: "",
        description: "",
        owner: "",
        archive: false,
        participants: [],
    };
    showArchived: boolean = false;

    constructor(
        private _huishoudboekjeService: HuishoudboekjeService,
        private _authService: AuthService
    ) {}

    addHuishoudboekje(): void {
        const userEmail = this._authService.user$.value?.email!;
        this.newHuishoudboekje.owner = userEmail;
        this._huishoudboekjeService.addHuishoudboekje(this.newHuishoudboekje);

        // Clear the form fields
        this.newHuishoudboekje = {
            name: "",
            description: "",
            owner: "",
            archive: false,
            participants: [],
        };
    }
}
