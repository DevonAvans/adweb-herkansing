import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Huishoudboekje } from "@app/models/huishoudboekje";
import { AuthService } from "@app/services/auth.service";
import { HuishoudboekjeService } from "@app/services/huishoudboekje.service";
import { FormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { CommonModule, Location } from "@angular/common";
import { Observable } from "rxjs";

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
    ],
    templateUrl: "./edit.component.html",
    styleUrl: "./edit.component.scss",
})
export class EditComponent implements OnInit {
    huishoudboekje: Huishoudboekje | undefined;

    constructor(
        private _route: ActivatedRoute,
        private _huishoudboekjeService: HuishoudboekjeService,
        private _location: Location
    ) {}

    saveChanges(): void {
        if (this.huishoudboekje) {
            this._huishoudboekjeService.updateHuishoudboekje(
                this.huishoudboekje
            );
            this._location.back();
        }
    }

    ngOnInit(): void {
        this._route.params.subscribe((params) => {
            const huishoudboekjeId = params["id"];
            this._huishoudboekjeService
                .readHuishoudboekje(huishoudboekjeId)
                .subscribe((huishoudboekje) => {
                    this.huishoudboekje = huishoudboekje;
                });
        });
    }
}
