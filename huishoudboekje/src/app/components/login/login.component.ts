import { Component, OnInit } from "@angular/core";
import { AuthService } from "@services/auth.service";

@Component({
    selector: "app-login",
    standalone: true,
    imports: [],
    templateUrl: "./login.component.html",
    styleUrl: "./login.component.scss",
})
export class LoginComponent implements OnInit {
    constructor(private authService: AuthService) {}

    ngOnInit(): void {}

    loginWithGoogle() {
        this.authService.loginWithGoogle();
    }
}
