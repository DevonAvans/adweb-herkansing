import { CollectionReference, Firestore, collection } from "firebase/firestore";

export function getTypedCollection<T>(
    firestore: Firestore,
    collectionName: string
): CollectionReference<T> {
    return collection(firestore, collectionName) as CollectionReference<T>;
}
