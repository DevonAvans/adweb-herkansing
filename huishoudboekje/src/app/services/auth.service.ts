import { Inject, Injectable } from "@angular/core";
import {
    Auth,
    User as FireUser,
    GoogleAuthProvider,
    getAuth,
    signInWithPopup,
    signOut,
} from "firebase/auth";
import { BehaviorSubject } from "rxjs";
import { onAuthStateChanged } from "firebase/auth";
import { UserService } from "@services/user.service";
import { Router } from "@angular/router";
import { INJECTS, LOCALSTORAGE, ROUTES } from "@app/app.constants";
import { FirebaseApp } from "firebase/app";
import { User } from "@app/models/user";

@Injectable({
    providedIn: "root",
})
export class AuthService {
    private auth: Auth;
    private _authProvider: GoogleAuthProvider;

    public readonly user$: BehaviorSubject<FireUser | null>;

    constructor(
        @Inject(INJECTS.FIREBASE_APP) private _app: FirebaseApp,
        private userService: UserService,
        private router: Router
    ) {
        this.auth = getAuth(_app);
        this._authProvider = new GoogleAuthProvider();

        this.user$ = new BehaviorSubject<FireUser | null>(null);

        const storedUser = localStorage.getItem(LOCALSTORAGE.USER_KEY);
        if (storedUser) {
            this.user$.next(JSON.parse(storedUser));
        }

        onAuthStateChanged(this.auth, (user) => {
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

    async loginWithGoogle(): Promise<void> {
        try {
            const result = await signInWithPopup(this.auth, this._authProvider);
            const user: User = {
                name: result.user.displayName!,
                email: result.user.email!,
            };
            await this.userService.create(user);
        } catch (error) {
            console.error("Google login failed");
        }
    }

    async logout(): Promise<void> {
        try {
            await signOut(this.auth);
            this.router.navigate([ROUTES.LOGIN]);
        } catch (error) {
            console.error("Logout error:", error);
        }
    }
}
