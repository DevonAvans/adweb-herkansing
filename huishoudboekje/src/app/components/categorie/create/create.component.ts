import { Component } from '@angular/core';
import { CommonModule } from "@angular/common";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from "@angular/forms";
import { Categorie } from "@app/models/categorie";
import { CategorieService } from '@app/services/categorie.service';
import { MatCardModule } from "@angular/material/card";
import { MatButtonModule } from "@angular/material/button";
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-create-categorie',
  standalone: true,
  imports: [CommonModule, MatFormFieldModule, MatInputModule, FormsModule, MatCardModule, MatButtonModule],
  templateUrl: './create.component.html',
  styleUrl: './create.component.scss'
})
export class CreateComponent {
  public newCategorie: Categorie = {
    name: "",
    budget: 0,
    endDate: null,
    huishoudboekje: "",
  };

  constructor(
    private _categorieService: CategorieService,
    private _route: ActivatedRoute,
  ) { }

  createCategorie(): void {
    const huishoudboekjeId = this._route.snapshot.paramMap.get("id")  ?? "";;
    this.newCategorie.huishoudboekje = huishoudboekjeId;
    this._categorieService.create(this.newCategorie);
    this.newCategorie = {
        name: "",
        budget: 0,
        endDate: null,
        huishoudboekje: "",
    };
  }
}
