import { inject } from "@angular/core";
import { CanActivateFn } from "@angular/router";
import { AuthService } from "../services/auth.service";
import { firstValueFrom } from "rxjs";

export const authGuard: CanActivateFn = (route, state) => {
	const authService = inject(AuthService);
	return firstValueFrom(authService.user$).then((e) => e !== null);
};
