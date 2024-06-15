import { Inject, Injectable } from "@angular/core";
import { COLLECTIONS, INJECTS } from "@app/app.constants";
import { getTypedCollection } from "@app/utils/firestore-utils";
import { Transactie } from "@models/transactie";
import {
    CollectionReference,
    Firestore,
    addDoc,
    deleteDoc,
    doc,
    getDocs,
    onSnapshot,
    query,
    updateDoc,
    where,
} from "firebase/firestore";
import { Observable } from "rxjs";

@Injectable({
    providedIn: "root",
})
export class TransactieService {
    private _collectionName = COLLECTIONS.TRANSACTIE;
    private _transactieCollectionRef: CollectionReference<Transactie>;

    constructor(@Inject(INJECTS.FIRESTORE) private _firestore: Firestore) {
        this._transactieCollectionRef = getTypedCollection<Transactie>(
            this._firestore,
            this._collectionName
        );
    }

    public createTransactie(transactie: Transactie) {
        return addDoc(this._transactieCollectionRef, transactie);
    }

    public readTransaction(id: string) {
        const collectionRef = getTypedCollection<Transactie>(
            this._firestore,
            COLLECTIONS.TRANSACTIE
        );
        const docRef = doc(collectionRef, id);
        return new Observable<Transactie>((subscriber) => {
            onSnapshot(
                docRef,
                (snapshot) => {
                    const transactie: Transactie = snapshot.data()!;
                    transactie.id = id;
                    subscriber.next(transactie);
                },
                (error) => {
                    subscriber.error(error);
                }
            );
        });
    }

    public readTransactiesOfHuishoudboekje(
        id: string,
        dateTime: Date
    ): Observable<Transactie[]> {
        const startOfMonth = new Date(
            dateTime.getFullYear(),
            dateTime.getMonth(),
            1
        );
        const endOfMonth = new Date(
            dateTime.getFullYear(),
            dateTime.getMonth() + 1,
            0
        );
        const collection = getTypedCollection<Transactie>(
            this._firestore,
            COLLECTIONS.TRANSACTIE
        );
        const queryRef = query(
            collection,
            where("huishoudboekje", "==", id),
            where("dateTime", ">=", startOfMonth),
            where("dateTime", "<", endOfMonth)
        );
        return new Observable<Transactie[]>((subscriber) => {
            onSnapshot(
                queryRef,
                (querySnapshot) => {
                    const items: Transactie[] = [];
                    querySnapshot.forEach((doc) => {
                        const transactie: Transactie = doc.data();
                        transactie.id = doc.id;
                        items.push(transactie);
                    });
                    subscriber.next(items);
                },
                (error) => {
                    subscriber.error(error);
                }
            );
        });
    }

    public readTransactiesByCategorieId(
        categorieId: string
    ): Observable<Transactie[]> {
        const collection = getTypedCollection<Transactie>(
            this._firestore,
            COLLECTIONS.TRANSACTIE
        );
        const queryRef = query(
            collection,
            where("category", "==", categorieId)
        );
        return new Observable<Transactie[]>((subscriber) => {
            onSnapshot(
                queryRef,
                (querySnapshot) => {
                    const items: Transactie[] = [];
                    querySnapshot.forEach((doc) => {
                        const transactie: Transactie = doc.data();
                        transactie.id = doc.id;
                        items.push(transactie);
                    });
                    subscriber.next(items);
                },
                (error) => {
                    subscriber.error(error);
                }
            );
        });
    }

    public updateTransactie(transactie: Transactie) {
        const docRef = doc(this._transactieCollectionRef, transactie.id);
        return updateDoc(docRef, {
            amount: transactie.amount,
            type: transactie.type,
            category: transactie.category,
        });
    }

    public deleteTransactie(transactie: Transactie) {
        const docRef = doc(this._transactieCollectionRef, transactie.id);
        return deleteDoc(docRef);
    }
}
