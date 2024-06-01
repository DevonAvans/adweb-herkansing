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
import { COLLECTIONS, INJECTS } from "../app.constants";

@Injectable({
    providedIn: "root",
})
export class UserService {
    constructor(@Inject(INJECTS.FIRESTORE) private _firestore: Firestore) {}

    public async create(user: User): Promise<void> {
        const usersCollection = collection(
            this._firestore,
            COLLECTIONS.USERS.NAME
        );

        const snapshot = await getDocs(
            query(
                usersCollection,
                where(COLLECTIONS.USERS.FIELDS.email, "==", user.email)
            )
        );

        if (snapshot.empty) {
            await addDoc(usersCollection, user);
        } else {
            console.log("User already exists in Firestore!!!");
        }
    }
}
