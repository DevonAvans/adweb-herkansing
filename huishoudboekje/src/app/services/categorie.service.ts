import { Inject, Injectable } from "@angular/core";
import { COLLECTIONS, INJECTS } from "@app/app.constants";
import { Categorie } from "@app/models/categorie";
import { Huishoudboekje } from "@app/models/huishoudboekje";
import { Transactie } from "@app/models/transactie";
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

    constructor(@Inject("FIRESTORE") private _firestore: Firestore) {
        this._collectionRef = getTypedCollection<Categorie>(
            _firestore,
            this._collectionName
        );
    }

    public readAll(): Observable<Categorie[]> {
        return new Observable((subscriber: Subscriber<Categorie[]>) => {
            onSnapshot(
                collection(this._firestore, COLLECTIONS.CATEGORIEEN),
                (snapshot) => {
                    let categorieen: Categorie[] = [];
                    snapshot.forEach((doc) => {
                        const data = doc.data() as Categorie;
                        categorieen.push({ ...data, id: doc.id });
                    });
                    subscriber.next(categorieen);
                }
            );
        });
    }

    public read(id: string): Observable<Categorie> {
        const docRef = doc(this._collectionRef, id);
        return new Observable((subscriber: Subscriber<Categorie>) => {
            onSnapshot(docRef, (doc) => {
                const data = doc.data() as Categorie;
                subscriber.next({ ...data, id: doc.id });
            });
        });
    }

    public readByHuishoudboekjeId(
        huishoudboekjeId: string
    ): Observable<Categorie[]> {
        const collection = getTypedCollection<Categorie>(
            this._firestore,
            COLLECTIONS.CATEGORIEEN
        );
        const queryRef = query(
            collection,
            where("huishoudboekje", "==", huishoudboekjeId)
        );
        return new Observable<Categorie[]>((subscriber) => {
            onSnapshot(
                queryRef,
                (querySnapshot) => {
                    const items: Categorie[] = [];
                    querySnapshot.forEach((doc) => {
                        const categorie: Categorie = doc.data();
                        categorie.id = doc.id;
                        items.push(categorie);
                    });
                    subscriber.next(items);
                },
                (error) => {
                    subscriber.error(error);
                }
            );
        });
    }

    public create(categorie: Categorie) {
        return addDoc(this._collectionRef, categorie);
    }

    public update(categorie: Categorie) {
        const docRef = doc(this._collectionRef, categorie.id);
        return setDoc(docRef, categorie);
    }

    public delete(categorie: Categorie) {
        return deleteDoc(doc(this._collectionRef, categorie.id));
    }
}
