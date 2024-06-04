import { Routes } from "@angular/router";
import { DashboardComponent } from "@components/dashboard/dashboard.component";
import { LoginComponent } from "@components/login/login.component";
import { EditComponent } from "@components/huishoudboekje/edit/edit.component";
import { authGuard } from "@guards/auth.guard";
import { ROUTES } from "./app.constants";
import { DetailsComponent } from "./components/huishoudboekje/details/details.component";
import { TransactieEditComponent } from "./components/transactie/edit/edit.component";

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
    {
        path: `${ROUTES.HUISHOUDBOEKJE_ID}/detail`,
        component: DetailsComponent,
        canActivate: [authGuard],
    },
    {
        path: `${ROUTES.HUISHOUDBOEKJE_ID}/edit`,
        component: EditComponent,
        canActivate: [authGuard],
    },
    {
        path: `${ROUTES.TRANSACTIE_ID}/edit`,
        component: TransactieEditComponent,
        canActivate: [authGuard],
    },
];
