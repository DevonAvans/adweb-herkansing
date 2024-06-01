import { Routes } from "@angular/router";
import { DashboardComponent } from "@components/dashboard/dashboard.component";
import { LoginComponent } from "@components/login/login.component";
import { authGuard } from "@guards/auth.guard";

export const routes: Routes = [
	{ path: "", redirectTo: "/dashboard", pathMatch: "full" },
	{
		path: "dashboard",
		component: DashboardComponent,
		canActivate: [authGuard],
	},
	{ path: "login", component: LoginComponent },
];
