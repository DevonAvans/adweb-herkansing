import { CommonModule, NgFor } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatToolbarModule } from "@angular/material/toolbar";
import { Router } from "@angular/router";
import { ROUTES } from "@app/app.constants";
import { Huishoudboekje } from "@app/models/huishoudboekje";
import { AuthService } from "@app/services/auth.service";
import { HuishoudboekjeService } from "@app/services/huishoudboekje.service";

@Component({
    selector: "app-huishoudboekje-overview",
    standalone: true,
    imports: [
        MatCardModule,
        NgFor,
        CommonModule,
        MatButtonModule,
        MatToolbarModule,
    ],
    templateUrl: "./overview.component.html",
    styleUrl: "./overview.component.scss",
})
export class HuishoudboekjeOverviewComponent implements OnInit {
    huishoudboekjes: Huishoudboekje[] = [];
    showArchived: boolean = false;

    constructor(
        private _huishoudboekjeService: HuishoudboekjeService,
        private _authService: AuthService,
        private _router: Router
    ) {}

    ngOnInit(): void {
        this._huishoudboekjeService
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
            this._router.navigate([ROUTES.DASHBOARD]);
        } else {
            this._router.navigate([ROUTES.HUISHOUDBOEKJE, itemId.id, "detail"]);
        }
    }

    detailsHuishoudboekje(huishoudboekje: Huishoudboekje): void {
        this._router.navigate(["/overview", huishoudboekje.id]);
    }

    editHuishoudboekje(huishoudboekje: Huishoudboekje): void {
        if (this._authService.user$.value?.email === huishoudboekje.owner) {
            this._router.navigate([
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
