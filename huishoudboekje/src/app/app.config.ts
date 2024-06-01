import { ApplicationConfig, provideZoneChangeDetection } from "@angular/core";
import { provideRouter } from "@angular/router";

import { routes } from "./app.routes";
import { provideClientHydration } from "@angular/platform-browser";
import { environment } from "../environments/environment.development";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseApp = initializeApp(environment.firebase);
const firestore = getFirestore(firebaseApp);

export const appConfig: ApplicationConfig = {
	providers: [
		{ provide: "FIREBASE_APP", useValue: firebaseApp },
		{ provide: "FIRESTORE", useValue: firestore },
		provideZoneChangeDetection({ eventCoalescing: true }),
		provideRouter(routes),
		provideClientHydration(),
	],
};
