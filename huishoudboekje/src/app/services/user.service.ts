import { Inject, Injectable } from "@angular/core";
import {
    Firestore,
    addDoc,
    collection,
    getDocs,
    query,
    where,
} from "firebase/firestore";
import { User } from "../models/user";
import { COLLECTIONS, INJECTS } from "../app.constants";

@Injectable({
    providedIn: "root",
})
export class UserService {
    constructor(@Inject(INJECTS.FIRESTORE) private _firestore: Firestore) {}

    public async create(user: User): Promise<void> {
        const usersCollection = collection(this._firestore, COLLECTIONS.USERS);

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
