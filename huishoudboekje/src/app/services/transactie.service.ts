import { Inject, Injectable } from "@angular/core";
import { COLLECTIONS, INJECTS } from "@app/app.constants";
import { Huishoudboekje } from "@app/models/huishoudboekje";
import { User } from "@app/models/user";
import { getTypedCollection } from "@app/utils/firestore-utils";
import { Transactie } from "@models/transactie";
import {
    CollectionReference,
    Firestore,
    addDoc,
    deleteDoc,
    doc,
    getDocs,
    query,
    setDoc,
    where,
} from "firebase/firestore";
import { Observable } from "rxjs";

@Injectable({
    providedIn: "root",
})
export class TransactieService {
    private _collectionName = COLLECTIONS.TRANSACTIE.NAME;
    private _fields = COLLECTIONS.TRANSACTIE.FIELDS;
    private _transactieCollectionRef: CollectionReference<Transactie>;

    constructor(@Inject(INJECTS.FIRESTORE) private _firestore: Firestore) {
        this._transactieCollectionRef = getTypedCollection<Transactie>(
            this._firestore,
            this._collectionName
        );
    }

    create(transactie: Transactie) {
        return addDoc(this._transactieCollectionRef, transactie);
    }

    read(huishoudboekje: Huishoudboekje): Observable<Transactie[]> {
        const collection = getTypedCollection<Transactie>(
            this._firestore,
            COLLECTIONS.TRANSACTIE.NAME
        );
        const queryRef = query(
            collection,
            where(
                COLLECTIONS.TRANSACTIE.FIELDS.huishoudboekje,
                "==",
                huishoudboekje.id
            )
        );
        return new Observable<Transactie[]>((subscriber) => {
            getDocs(queryRef)
                .then((querySnapshot) => {
                    const items: Transactie[] = [];
                    querySnapshot.forEach((doc) => {
                        items.push(doc.data());
                    });
                    subscriber.next(items);
                })
                .catch((error) => {
                    subscriber.error(error);
                });
        });
    }

    // readByMonthAndYear(
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

    update(transactie: Transactie) {
        const docRef = doc(this._transactieCollectionRef, transactie.id);
        return setDoc(docRef, transactie);
    }

    delete(transactie: Transactie) {
        const docRef = doc(this._transactieCollectionRef, transactie.id);
        return deleteDoc(docRef);
    }
}
