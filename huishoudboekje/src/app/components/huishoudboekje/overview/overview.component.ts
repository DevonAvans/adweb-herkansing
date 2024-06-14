import { CommonModule, NgFor } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { Huishoudboekje } from "@app/models/huishoudboekje";
import { AuthService } from "@app/services/auth.service";
import { HuishoudboekjeService } from "@app/services/huishoudboekje.service";
import { HuishoudboekjeCardComponent } from "../card/card.component";

@Component({
    selector: "app-huishoudboekje-overview",
    standalone: true,
    imports: [
        CommonModule,
        HuishoudboekjeCardComponent,
        MatButtonModule,
        NgFor,
    ],
    templateUrl: "./overview.component.html",
    styleUrl: "./overview.component.scss",
})
export class HuishoudboekjeOverviewComponent implements OnInit {
    huishoudboekjes: Huishoudboekje[] = [];
    showArchived: boolean = false;

    constructor(
        private _huishoudboekjeService: HuishoudboekjeService,
        private _authService: AuthService
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
