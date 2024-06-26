import { Component } from "@angular/core";
import { AuthService } from "src/app/services/auth.service";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatButtonModule } from "@angular/material/button";
import { Router } from "@angular/router";

@Component({
    selector: "app-header",
    standalone: true,
    imports: [MatToolbarModule, MatButtonModule],
    templateUrl: "./header.component.html",
    styleUrl: "./header.component.scss",
})
export class HeaderComponent {
    constructor(private _authService: AuthService, private _router: Router) {}

    navigateHome() {
        this._router.navigate(["/dashboard"]);
    }

    logout() {
        this._authService.logout();
    }
}
