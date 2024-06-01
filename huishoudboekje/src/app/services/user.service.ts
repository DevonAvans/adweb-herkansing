import { Inject, Injectable } from "@angular/core";
import {
	Auth,
	GoogleAuthProvider,
	getAuth,
	signInWithPopup,
	signOut,
} from "firebase/auth";
import {
	Firestore,
	addDoc,
	collection,
	getDocs,
	query,
	where,
} from "firebase/firestore";
import { User } from "../models/user";
import { FirebaseApp } from "firebase/app";

@Injectable({
	providedIn: "root",
})
export class UserService {
	public auth: Auth;
	private authProvider: GoogleAuthProvider;

	constructor(
		@Inject("FIREBASE_APP") private app: FirebaseApp,
		@Inject("FIRESTORE") private firestore: Firestore
	) {
		this.auth = getAuth(app);
		this.authProvider = new GoogleAuthProvider();
	}

	async loginWithGoogle(): Promise<void> {
		try {
			const result = await signInWithPopup(this.auth, this.authProvider);
			const user: User = {
				name: result.user.displayName!,
				email: result.user.email!,
			};
			await this.createUserInFirestore(user);
		} catch (error) {
			throw new Error("Google login failed2");
		}
	}

	async logout(): Promise<void> {
		try {
			await signOut(this.auth);
			// Additional cleanup or operations after logout if needed

			// Redirect to the login page
			//this.router.navigate(["/login"]);
		} catch (error) {
			console.error("Logout error:", error);
		}
	}

	private async createUserInFirestore(user: User): Promise<void> {
		const usersCollection = collection(this.firestore, "users");

		const snapshot = await getDocs(
			query(usersCollection, where("email", "==", user.email))
		);

		if (snapshot.empty) {
			await addDoc(usersCollection, user);
		} else {
			console.log("User already exists in Firestore!!!");
		}
	}
}
