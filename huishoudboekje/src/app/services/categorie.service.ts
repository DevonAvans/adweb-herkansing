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
    query,
    setDoc,
    where,
} from "firebase/firestore";
import { Observable } from "rxjs";

@Injectable({
    providedIn: "root",
})
export class CategorieService {
    private _collectionName = COLLECTIONS.CATEGORIEEN;
    private _collectionRef: CollectionReference<Categorie>;

    constructor(@Inject(INJECTS.FIRESTORE) private _firestore: Firestore) {
        this._collectionRef = getTypedCollection<Categorie>(
            _firestore,
            this._collectionName
        );
    }

    create(categorie: Categorie) {
        const docRef = doc(this._collectionRef, categorie.id);
        return addDoc(this._collectionRef, categorie);
    }

    read(huishoudboekje: Huishoudboekje): Observable<Categorie[]> {
        const queryRef = query(
            this._collectionRef,
            where("huishoudboekje", "==", huishoudboekje.id)
        );
        return new Observable((subscriber) => {});
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
    update(categorie: Categorie) {
        const docRef = doc(this._collectionRef, categorie.id);
        return setDoc(docRef, categorie);
    }

    delete(categorie: Categorie) {
        const docRef = doc(this._collectionRef, categorie.id);
        return deleteDoc(docRef);
    }
}
