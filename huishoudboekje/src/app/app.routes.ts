import { Routes } from "@angular/router";
import { DashboardComponent } from "@components/dashboard/dashboard.component";
import { LoginComponent } from "@components/login/login.component";
import { authGuard } from "@guards/auth.guard";
import { ROUTES } from "./app.constants";

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
];
