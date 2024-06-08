import { NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Categorie } from '@app/models/categorie';
import { CategorieService } from '@app/services/categorie.service';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [NgIf, CommonModule, MatCardModule],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss'
})
export class DetailsComponent implements OnInit {
  categorie$: Observable<Categorie> = new Observable<Categorie>();

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _categorieService: CategorieService
  ) { }

  ngOnInit(): void {
    let id = this._route.snapshot.paramMap.get('id');
    if (id === null) {
      this._router.navigate(['/dashboard']);
      return;
    }
    this.categorie$ = this._categorieService.read(id);
  }
}
