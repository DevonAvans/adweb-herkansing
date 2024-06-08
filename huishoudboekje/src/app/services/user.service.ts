import { Inject, Injectable } from "@angular/core";
import {
    Firestore,
    addDoc,
    collection,
    getDocs,
    onSnapshot,
    query,
    where,
} from "firebase/firestore";
import { User } from "../models/user";
import { COLLECTIONS, INJECTS } from "../app.constants";
import { Observable, Subscriber } from "rxjs";

@Injectable({
    providedIn: "root",
})
export class UserService {
    constructor(@Inject(INJECTS.FIRESTORE) private _firestore: Firestore) {}

    readAllUsers(): Observable<User[]> {
        return new Observable((subscriber) => {
            getDocs(collection(this._firestore, COLLECTIONS.USERS)).then(
                (snapshot) => {
                    const users: User[] = [];
                    snapshot.forEach((doc) => {
                        users.push(doc.data() as User);
                    });
                    subscriber.next(users);
                }
            );
        });
    }

    readAllUserExceptYourself(owner: string): Observable<User[]> {
        return new Observable((subscriber: Subscriber<any[]>) => {
            onSnapshot(
                collection(this._firestore, COLLECTIONS.USERS),
                (snapshot) => {
                    let users: any[] = [];
                    snapshot.forEach((doc) => {
                        const data = doc.data() as User;
                        if (data.email != owner) {
                            users.push(data);
                        }
                    });
                    subscriber.next(users);
                }
            );
        });
    }

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
