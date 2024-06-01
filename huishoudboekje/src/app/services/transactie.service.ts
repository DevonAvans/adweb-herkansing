import { Inject, Injectable } from "@angular/core";
import { COLLECTIONS, INJECTS } from "@app/app.constants";
import { getTypedCollection } from "@app/utils/firestore-utils";
import { Transactie } from "@models/transactie";
import {
    CollectionReference,
    Firestore,
    addDoc,
    collection,
    deleteDoc,
    doc,
    setDoc,
} from "firebase/firestore";

@Injectable({
    providedIn: "root",
})
export class TransactieService {
    private _transactieCollectionRef: CollectionReference<Transactie>;

    constructor(@Inject(INJECTS.FIRESTORE) private _firestore: Firestore) {
        this._transactieCollectionRef = getTypedCollection<Transactie>(
            this._firestore,
            COLLECTIONS.TRANSACTIE.NAME
        );
    }

    create(transactie: Transactie) {
        return addDoc(this._transactieCollectionRef, transactie);
    }

    read() {}

    update(transactie: Transactie) {
        const docRef = doc(this._transactieCollectionRef, transactie.id);
        return setDoc(docRef, transactie);
    }

    delete(transactie: Transactie) {
        const docRef = doc(this._transactieCollectionRef, transactie.id);
        return deleteDoc(docRef);
    }
}
