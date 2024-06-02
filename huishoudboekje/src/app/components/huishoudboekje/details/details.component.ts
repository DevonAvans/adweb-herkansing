import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Huishoudboekje } from '@app/models/huishoudboekje';
import { HuishoudboekjeService } from '@app/services/huishoudboekje.service';
import { Observable } from 'rxjs';
import { NgIf } from '@angular/common';
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
  huishoudboekje$: Observable<Huishoudboekje | null> | undefined;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private huishoudboekjeService: HuishoudboekjeService
  ) { }

  ngOnInit(): void {
    let id = this.route.snapshot.paramMap.get('id');
    if (id === null) {
      this.router.navigate(['/dashboard']);
      return;
    }
    this.huishoudboekje$ = this.huishoudboekjeService.readHuishoudboekje(id);
  }

}
