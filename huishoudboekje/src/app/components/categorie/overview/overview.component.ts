import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Categorie } from "@app/models/categorie";
import { CategorieService } from "@app/services/categorie.service";
import { MatCardModule } from "@angular/material/card";
import { MatButtonModule } from "@angular/material/button";
import { NgFor } from "@angular/common";
import { NgClass } from '@angular/common';
import { Transactie } from '@app/models/transactie';
import { TransactieService } from '@app/services/transactie.service';

@Component({
  selector: 'app-overview-categorie',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, NgFor, NgClass],
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class OverviewComponent {
  private _huishoudboekjeId: string
  public categorieen: Categorie[] = [];
  private _transactiesPerCategorie: { [key: string]: Transactie[] } = {};

  constructor(
    private _categorieService: CategorieService,
    private _transactieService: TransactieService,
    private _router: Router,
  ) { 
    this._huishoudboekjeId = this._router.url.split('/')[2];
    this._categorieService.readByHuishoudboekjeId(this._huishoudboekjeId).subscribe((categorieen) => {
      this.categorieen = categorieen;
      this.categorieen.forEach(categorie => {
        if (categorie.id) {
          this.loadTransacties(categorie.id);
        } else {
          console.error('Category has no ID:', categorie);
        }
      });
    });
  }

  loadTransacties(categorieId: string): void {
    this._transactieService.readTransactiesByCategorieId(categorieId).subscribe(transacties => {
      this._transactiesPerCategorie[categorieId] = transacties;
    });
  }

  calculateRemainingBudget(categorie: Categorie): number {
    if (!categorie.id) {
      return 0;
    }
    const transacties = this._transactiesPerCategorie[categorie.id] || [];
    let remainingBudget = categorie.budget;

    transacties.forEach(transactie => {
      if (transactie.type === 'uitgaven') {
        remainingBudget -= transactie.amount;
      } else if (transactie.type === 'inkomen') {
        remainingBudget += transactie.amount;
      }
    });

    return remainingBudget;
  }

  getBudgetClass(categorie: Categorie): string {
    const remainingBudget = this.calculateRemainingBudget(categorie);
    if (remainingBudget < 0) {
      return 'negative-budget';
    } else if (remainingBudget < categorie.budget * 0.2) {
      return 'almost-negative-budget';
    } else if (remainingBudget > categorie.budget * 0.5) {
      return 'more-than-half-budget';
    } else {
      return '';
    }
  }

  detailsCategorie(itemId?: Categorie): void {
    this._router.navigate(["/categorie", itemId?.id]);
  }

  editCategorie(categorie: Categorie): void {
    console.log(categorie);
    this._router.navigate(["/categorie/edit", categorie.id]);
  }

  deleteCategorie(categorie: Categorie): void {
    this._categorieService.delete(categorie);
  }
}
