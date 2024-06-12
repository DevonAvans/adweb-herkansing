import { CommonModule } from "@angular/common";
import { Component, Input } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatToolbarModule } from "@angular/material/toolbar";
import { Router } from "@angular/router";
import { ROUTES } from "@app/app.constants";
import { Huishoudboekje } from "@app/models/huishoudboekje";
import { AuthService } from "@app/services/auth.service";
import { HuishoudboekjeService } from "@app/services/huishoudboekje.service";

@Component({
    selector: "app-huishoudboekje-card",
    standalone: true,
    imports: [CommonModule, MatCardModule, MatButtonModule, MatToolbarModule],
    templateUrl: "./card.component.html",
    styleUrl: "./card.component.scss",
})
export class HuishoudboekjeCardComponent {
    @Input() huishoudboekje!: Huishoudboekje;

    constructor(
        private _authService: AuthService,
        private _huishoudboekjeService: HuishoudboekjeService,
        private _router: Router
    ) {}

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
        // if (this._authService.user$.value?.email === huishoudboekje.owner) {
        this._router.navigate([
            ROUTES.HUISHOUDBOEKJE,
            huishoudboekje.id,
            "edit",
        ]);
        // } else {
        // alert("U bent niet gemachtigd om dit huishoudboekje te bewerken.");
        // }
    }

    archiveHuishoudboekje(huishoudboekje: Huishoudboekje) {
        this._huishoudboekjeService.toggleArchiveHuishoudboekje(huishoudboekje);
    }
}
