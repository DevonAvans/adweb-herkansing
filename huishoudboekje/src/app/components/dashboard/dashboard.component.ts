import { Component } from "@angular/core";
import { HuishoudboekjeCreateComponent } from "../huishoudboekje/create/create.component";
import { HuishoudboekjeOverviewComponent } from "../huishoudboekje/overview/overview.component";
@Component({
    selector: "app-dashboard",
    standalone: true,
    imports: [HuishoudboekjeCreateComponent, HuishoudboekjeOverviewComponent],
    templateUrl: "./dashboard.component.html",
    styleUrl: "./dashboard.component.scss",
})
export class DashboardComponent {}
