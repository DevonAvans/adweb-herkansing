import { Routes } from "@angular/router";
import { DashboardComponent } from "@components/dashboard/dashboard.component";
import { LoginComponent } from "@components/login/login.component";
import { EditComponent } from "@components/huishoudboekje/edit/edit.component";
import { authGuard } from "@guards/auth.guard";
import { ROUTES } from "./app.constants";
import { DetailsComponent } from "./components/huishoudboekje/details/details.component";

export const routes: Routes = [
    {
        path: ROUTES.BASE,
        redirectTo: `/${ROUTES.DASHBOARD}`,
        pathMatch: "full",
    },
    {
        path: ROUTES.DASHBOARD,
        component: DashboardComponent,
        canActivate: [authGuard],
    },
    { path: ROUTES.LOGIN, component: LoginComponent },
    { path: ROUTES.HUISHOUDBOEKJEDETAILS, component: DetailsComponent, canActivate: [authGuard] },
    { path: ROUTES.HUISHOUDBOEKJEEDIT, component: EditComponent, canActivate: [authGuard] },
];
