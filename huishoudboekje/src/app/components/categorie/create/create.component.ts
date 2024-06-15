import { Component } from "@angular/core";
import { CommonModule, Location } from "@angular/common";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { FormsModule } from "@angular/forms";
import { Categorie } from "@app/models/categorie";
import { CategorieService } from "@app/services/categorie.service";
import { MatCardModule } from "@angular/material/card";
import { MatButtonModule } from "@angular/material/button";
import { ActivatedRoute } from "@angular/router";

@Component({
    selector: "app-create-categorie",
    standalone: true,
    imports: [
        CommonModule,
        MatFormFieldModule,
        MatInputModule,
        FormsModule,
        MatCardModule,
        MatButtonModule,
    ],
    templateUrl: "./create.component.html",
    styleUrl: "./create.component.scss",
})
export class CreateComponent {
    private _huishoudboekjeId: string;

    public newCategorie: Categorie = {
        name: "",
        budget: 0,
        endDate: null,
        huishoudboekje: "",
    };

    constructor(
        private _categorieService: CategorieService,
        private _route: ActivatedRoute,
        private _location: Location
    ) {
        this._huishoudboekjeId = this._route.snapshot.paramMap.get("id")!;
    }

    createCategorie(): void {
        this.newCategorie.huishoudboekje = this._huishoudboekjeId;
        this._categorieService.create(this.newCategorie);
        this._location.back();
    }
}
