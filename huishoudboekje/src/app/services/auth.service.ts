import { Injectable } from "@angular/core";
import { User as FireUser } from "firebase/auth";
import { BehaviorSubject } from "rxjs";
import { onAuthStateChanged } from "firebase/auth";
import { UserService } from "@services/user.service";
import { Router } from "@angular/router";
import { LOCALSTORAGE, ROUTES } from "@app/app.constants";

@Injectable({
    providedIn: "root",
})
export class AuthService {
    public readonly user$: BehaviorSubject<FireUser | null>;

    constructor(private userService: UserService, private router: Router) {
        this.user$ = new BehaviorSubject<FireUser | null>(null);

        const storedUser = localStorage.getItem(LOCALSTORAGE.USER_KEY);
        if (storedUser) {
            this.user$.next(JSON.parse(storedUser));
        }

        onAuthStateChanged(this.userService.auth, (user) => {
            if (user) {
                this.user$.next(user);
                localStorage.setItem(
                    LOCALSTORAGE.USER_KEY,
                    JSON.stringify(user)
                );
                this.router.navigate([ROUTES.DASHBOARD]);
            } else {
                this.user$.next(null);
                localStorage.removeItem(LOCALSTORAGE.USER_KEY);
                this.router.navigate([ROUTES.LOGIN]);
            }
        });
    }

    async login() {
        try {
            await this.userService.loginWithGoogle();
        } catch (error) {
            console.error("Google login error:", error);
        }
    }

    async logout(): Promise<void> {
        try {
            await this.userService.logout();
            this.router.navigate([ROUTES.LOGIN]);
        } catch (error) {
            console.error("Logout error:", error);
        }
    }
}
