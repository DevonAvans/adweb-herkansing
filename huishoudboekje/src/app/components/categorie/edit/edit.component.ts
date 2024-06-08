import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Categorie } from '@app/models/categorie';
import { CategorieService } from '@app/services/categorie.service';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-edit',
  standalone: true,
  imports: [CommonModule, FormsModule, MatButtonModule, MatFormFieldModule, MatInputModule],
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.scss'
})
export class EditComponent implements OnInit {
  categorie: Categorie | undefined;

  constructor(
    private _route: ActivatedRoute,
    private _categorieService: CategorieService,
    private _router: Router
  ) {}

  saveChanges(): void {
    if (this.categorie) {
      this._categorieService.update(this.categorie);
      this._router.navigate(['/dashboard']);
    }
  }

  ngOnInit(): void {
    this._route.params.subscribe(params => {
      const categorieId = params['id'];
      this._categorieService.read(categorieId).subscribe(categorie => {
        this.categorie = categorie;
      });
    });
  }

}
