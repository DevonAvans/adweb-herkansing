import { Inject, Injectable } from "@angular/core";
import { COLLECTIONS, INJECTS } from "@app/app.constants";
import { Categorie } from "@app/models/categorie";
import { Huishoudboekje } from "@app/models/huishoudboekje";
import { getTypedCollection } from "@app/utils/firestore-utils";
import {
    CollectionReference,
    Firestore,
    addDoc,
    collection,
    deleteDoc,
    doc,
    onSnapshot,
    query,
    setDoc,
    where,
} from "firebase/firestore";
import { Observable, Subscriber } from "rxjs";

@Injectable({
    providedIn: "root",
})
export class CategorieService {
    private _collectionName = COLLECTIONS.CATEGORIEEN;
    private _collectionRef: CollectionReference<Categorie>;

    constructor(@Inject("FIRESTORE") private firestore: Firestore) {
        this._collectionRef = getTypedCollection<Categorie>(
            firestore,
            this._collectionName
        );
    }

    readAll(): Observable<Categorie[]> {
        return new Observable((subscriber : Subscriber<any[]>) => {
            onSnapshot(
                collection(this.firestore, "categorieen"), 
                (snapshot) => {
                    let categorieen: any[] = [];
                    snapshot.forEach((doc) => {
                        const data = doc.data() as Categorie;
                        categorieen.push({ ...data, id: doc.id});
                    });
                    subscriber.next(categorieen);
                });
        });
    }

    read(id: string): Observable<Categorie> {
        const docRef = doc(this._collectionRef, id);
        return new Observable((subscriber: Subscriber<Categorie>) => {
            onSnapshot(docRef, (doc) => {
                const data = doc.data() as Categorie;
                subscriber.next({ ...data, id: doc.id });
            });
        });
    }
    /*
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
 */

    create(categorie: Categorie) {
        return addDoc(this._collectionRef, categorie);
    }

    update(categorie: Categorie) {
        const docRef = doc(this._collectionRef, categorie.id);
        return setDoc(docRef, categorie);
    }

    delete(categorie: Categorie) {
        return deleteDoc(doc(this._collectionRef, categorie.id));
    }
}
