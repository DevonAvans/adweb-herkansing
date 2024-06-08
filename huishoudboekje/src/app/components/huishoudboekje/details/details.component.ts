import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Huishoudboekje } from "@app/models/huishoudboekje";
import { HuishoudboekjeService } from "@app/services/huishoudboekje.service";
import { Observable } from "rxjs";
import { NgIf } from "@angular/common";
import { CommonModule } from "@angular/common";
import { MatCardModule } from "@angular/material/card";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { TransactieCreateComponent } from "@app/components/transactie/create/create.component";
import { TransactieOverviewComponent } from "@app/components/transactie/overview/overview.component";
import { ROUTES } from "@app/app.constants";
import { HeaderComponent } from "@app/components/dashboard/header/header.component";

@Component({
    selector: "app-details",
    standalone: true,
    imports: [
        CommonModule,
        HeaderComponent,
        MatDatepickerModule,
        MatCardModule,
        NgIf,
        TransactieCreateComponent,
        TransactieOverviewComponent,
    ],
    templateUrl: "./details.component.html",
    styleUrl: "./details.component.scss",
})
export class DetailsComponent implements OnInit {
    huishoudboekje$: Observable<Huishoudboekje | null> | undefined;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private huishoudboekjeService: HuishoudboekjeService
    ) {}

    ngOnInit(): void {
        let id = this.route.snapshot.paramMap.get("id");
        if (id === null) {
            this.router.navigate([ROUTES.DASHBOARD]);
            return;
        }
        this.huishoudboekje$ =
            this.huishoudboekjeService.readHuishoudboekje(id);
    }
}
