import { Inject, Injectable } from "@angular/core";
import { Huishoudboekje } from "@models/huishoudboekje";
import { FirebaseApp } from "firebase/app";
import {
    Firestore,
    addDoc,
    collection,
    doc,
    getDocs,
    onSnapshot,
    query,
    setDoc,
    updateDoc,
    where,
} from "firebase/firestore";
import { Observable, Subscriber } from "rxjs";
import { User } from "@models/user";
import { getTypedCollection } from "@app/utils/firestore-utils";
import { COLLECTIONS } from "@app/app.constants";

@Injectable({
    providedIn: "root",
})
export class HuishoudboekjeService {
    private _collectionName = COLLECTIONS.HUISHOUDBOEKJES;

    constructor(@Inject("FIRESTORE") private _firestore: Firestore) {}

    readHuishoudboekjes(
        user: User | null,
        isArchived: boolean
    ): Observable<Huishoudboekje[]> {
        if (user === null) {
            return new Observable<Huishoudboekje[]>((subscriber) => {
                subscriber.next([]);
            });
        }

        return new Observable((subscriber) => {
            onSnapshot(
                collection(this._firestore, "huishoudboekjes"),
                (snapshot) => {
                    let huishoudboekjes: Huishoudboekje[] = [];
                    snapshot.forEach((doc) => {
                        const data = doc.data() as Huishoudboekje;
                        if (
                            (data.owner === user.email ||
                                (data.participants !== undefined &&
                                    data.participants.includes(user.email))) &&
                            data.archive === isArchived
                        ) {
                            huishoudboekjes.push({ ...data, id: doc.id });
                        }
                    });
                    subscriber.next(huishoudboekjes);
                }
            );
        });
    }

    readHuishoudboekje(id: string): Observable<Huishoudboekje> {
        const collectionRef = collection(this._firestore, "huishoudboekjes");
        const docRef = doc(collectionRef, id);
        return new Observable<Huishoudboekje>((subscriber) => {
            onSnapshot(
                docRef,
                (snapshot) => {
                    const data = snapshot.data() as Huishoudboekje;
                    const huishoudboekje: Huishoudboekje = {
                        id: snapshot.id,
                        name: data.name,
                        description: data.description,
                        owner: data.owner,
                        archive: data.archive,
                    };
                    subscriber.next(huishoudboekje);
                },
                (error) => {
                    subscriber.error(error);
                }
            );
        });
    }

    async addHuishoudboekje(huishoudboekje: Huishoudboekje) {
        const huishoudboekjeCollection = getTypedCollection<Huishoudboekje>(
            this._firestore,
            this._collectionName
        );

        const snapshot = await getDocs(
            query(
                huishoudboekjeCollection,
                where("name", "==", huishoudboekje.name)
            )
        );
        if (snapshot.empty) {
            await addDoc(huishoudboekjeCollection, huishoudboekje);
        } else {
            console.log("Huishoudboekje already exists in Firestore!!!");
        }
    }

    async updateHuishoudboekje(huishoudboekje: Huishoudboekje) {
        console.log(huishoudboekje);
        const huishoudboekjeRef = doc(
            this._firestore,
            `huishoudboekjes/${huishoudboekje.id}`
        );
        try {
            await updateDoc(huishoudboekjeRef, {
                name: huishoudboekje.name,
                description: huishoudboekje.description,
                owner: huishoudboekje.owner,
                archive: huishoudboekje.archive,
                participants: huishoudboekje.participants ?? [],
            });
            console.log("Huishoudboekje succesvol bijgewerkt");
        } catch (error) {
            console.error("Fout bij het bijwerken van huishoudboekje: ", error);
            throw error;
        }
    }

    toggleArchiveHuishoudboekje(huishoudboekje: Huishoudboekje) {
        const collectionRef = getTypedCollection<Huishoudboekje>(
            this._firestore,
            this._collectionName
        );
        const docRef = doc(collectionRef, huishoudboekje?.id);
        return updateDoc(docRef, {
            archive: !huishoudboekje?.archive,
        });
    }
}
