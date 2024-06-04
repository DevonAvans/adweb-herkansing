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
    setDoc,
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

    createTransactie(transactie: Transactie) {
        return addDoc(this._transactieCollectionRef, transactie);
    }

    readTransactiesOfHuishoudboekje(id: string): Observable<Transactie[]> {
        const collection = getTypedCollection<Transactie>(
            this._firestore,
            COLLECTIONS.TRANSACTIE
        );
        const queryRef = query(collection, where("huishoudboekje", "==", id));
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

    // readTransactiesByMonthAndYear(
    //     user: User,
    //     month: number,
    //     year: number
    // ): Observable<Transactie[]> {}

    // readTransactiesByMonthAndYear(
    //     user: User,
    //     month: number,
    //     year: number
    // ): Observable<Transactie[]> {
    //     const collection = getTypedCollection<Transactie>(
    //         this._firestore,
    //         COLLECTIONS.TRANSACTIE.NAME
    //     );
    //     const queryRef = query(
    //         collection,
    //         where(this._fields.dateTime, ">=", ""),
    //         where(this._fields.dateTime, "<", "")
    //     );
    //     return new Observable<Transactie[]>((subscriber) => {
    //         getDocs(queryRef)
    //             .then((querySnapshot) => {
    //                 const items: Transactie[] = [];
    //                 querySnapshot.forEach((doc) => {
    //                     items.push(doc.data());
    //                 });
    //                 subscriber.next(items);
    //             })
    //             .catch((error) => {
    //                 subscriber.error(error);
    //             });
    //     });
    // }

    updateTransactie(transactie: Transactie) {
        const docRef = doc(this._transactieCollectionRef, transactie.id);
        return setDoc(docRef, transactie);
    }

    deleteTransactie(transactie: Transactie) {
        const docRef = doc(this._transactieCollectionRef, transactie.id);
        return deleteDoc(docRef);
    }
}
