import { Component, OnDestroy, OnInit } from "@angular/core";
import { HeaderComponent } from "./header/header.component";
import { Huishoudboekje } from "@models/huishoudboekje";
import { AuthService } from "@services/auth.service";
import { Router } from "@angular/router";
import { HuishoudboekjeService } from "@services/huishoudboekje.service";
import { NgFor } from "@angular/common";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatToolbarModule } from "@angular/material/toolbar";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { ROUTES } from "@app/app.constants";

@Component({
    selector: "app-dashboard",
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
    templateUrl: "./dashboard.component.html",
    styleUrl: "./dashboard.component.scss",
})
export class DashboardComponent {
    huishoudboekjes: Huishoudboekje[] = [];
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
        private _authService: AuthService,
        private router: Router
    ) {
        _huishoudboekjeService
            .readHuishoudboekjes(
                this._authService.user$.value,
                this.showArchived
            )
            .subscribe((ownHuishoudboekjes) => {
                this.huishoudboekjes = ownHuishoudboekjes;
            });
    }

    goToDetail(itemId: Huishoudboekje): void {
        if (itemId.archive) {
            this.router.navigate([ROUTES.DASHBOARD]);
        } else {
            this.router.navigate([ROUTES.HUISHOUDBOEKJE, itemId.id, "detail"]);
        }
    }

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

    detailsHuishoudboekje(huishoudboekje: Huishoudboekje): void {
        this.router.navigate(["/overview", huishoudboekje.id]);
    }

    editHuishoudboekje(huishoudboekje: Huishoudboekje): void {
        if (this._authService.user$.value?.email === huishoudboekje.owner) {
            this.router.navigate([
                ROUTES.HUISHOUDBOEKJE,
                huishoudboekje.id,
                "edit",
            ]);
        } else {
            alert("U bent niet gemachtigd om dit huishoudboekje te bewerken.");
        }
    }

    archiveHuishoudboekje(huishoudboekje: Huishoudboekje): void {
        huishoudboekje.archive = !this.showArchived;
        this._huishoudboekjeService.updateHuishoudboekje(huishoudboekje);
    }

    toggleArchived(): void {
        this.showArchived = !this.showArchived;
        this._huishoudboekjeService
            .readHuishoudboekjes(
                this._authService.user$.value,
                this.showArchived
            )
            .subscribe((ownHuishoudboekjes) => {
                this.huishoudboekjes = ownHuishoudboekjes;
            });
    }
}
