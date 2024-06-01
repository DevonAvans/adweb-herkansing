import { Injectable } from "@angular/core";
import { User as FireUser } from "firebase/auth";
import { BehaviorSubject } from "rxjs";
import { onAuthStateChanged } from "firebase/auth";
import { UserService } from "./user.service";
import { Router } from "@angular/router";

@Injectable({
	providedIn: "root",
})
export class AuthService {
	private readonly LOCAL_STORAGE_USER_KEY = "loggedInUser";
	public readonly user$: BehaviorSubject<FireUser | null>;

	constructor(private userService: UserService, private router: Router) {
		this.user$ = new BehaviorSubject<FireUser | null>(null);

		const storedUser = localStorage.getItem(this.LOCAL_STORAGE_USER_KEY);
		if (storedUser) {
			this.user$.next(JSON.parse(storedUser));
		}

		onAuthStateChanged(this.userService.auth, (user) => {
			if (user) {
				this.user$.next(user);
				localStorage.setItem(
					this.LOCAL_STORAGE_USER_KEY,
					JSON.stringify(user)
				);
				this.router.navigate(["/dashboard"]);
			} else {
				this.user$.next(null);
				localStorage.removeItem(this.LOCAL_STORAGE_USER_KEY);
				this.router.navigate(["/login"]);
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
}
