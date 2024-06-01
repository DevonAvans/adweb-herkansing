import { Inject, Injectable } from '@angular/core';
import { Huishoudboekje } from '@models/huishoudboekje';
import { FirebaseApp } from 'firebase/app';
import { Firestore, QuerySnapshot, addDoc, collection, doc, getDocs, onSnapshot, query, updateDoc, where } from 'firebase/firestore';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { User } from '@models/user';

@Injectable({
  providedIn: 'root'
})
export class HuishoudboekjeService {
  private refOwnHuishoudboekje: any;

  constructor(
    @Inject("FIREBASE_APP") private app: FirebaseApp,
    @Inject("FIRESTORE") private firestore: Firestore,
    private authService: AuthService,) { 
  }

  readHuishoudboekje(id: string): Observable<Huishoudboekje> {
    const collectionRef = collection(this.firestore, 'huishoudboekjes');
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

  readHuishoudboekjesByOwner(user: User | null , isArchived: boolean): Observable<Huishoudboekje[]> {
    if(user === null) {
      return new Observable<Huishoudboekje[]>((subscriber) => {
        subscriber.next([]);
      });
    }
    const collectionRef = collection(this.firestore, 'huishoudboekjes');
    const queryRef = query(
      collectionRef,
      where('owner', '==', user.email),
      where('archive', '==', isArchived)
    );

    return new Observable((subscriber) => {
      const snapshot = getDocs(queryRef).then((querySnapshot) => {
        const huishoudboekjes: Huishoudboekje[] = [];
        querySnapshot.forEach((doc) => {
          const data = doc.data() as Huishoudboekje;
          huishoudboekjes.push({ ...data, id: doc.id });
        });
        subscriber.next(huishoudboekjes);
      });
    });
  }

  readHuishoudboekjesByParticipant(user: User | null, isArchived: boolean): Observable<Huishoudboekje[]> {
    if(user === null) {
      return new Observable<Huishoudboekje[]>((subscriber) => {
        subscriber.next([]);
      });
    }
    const collectionRef = collection(this.firestore, 'huishoudboekjes');
    const queryRef = query(
      collectionRef,
      where('participants', 'array-contains', user.email),
      where('archive', '==', isArchived)
    );

    return new Observable((subscriber) => {
      const snapshot = getDocs(queryRef).then((querySnapshot) => {
        const huishoudboekjes: Huishoudboekje[] = [];
        querySnapshot.forEach((doc) => {
          const data = doc.data() as Huishoudboekje;
          huishoudboekjes.push({ ...data, id: doc.id });
        });
        subscriber.next(huishoudboekjes);
      });
    });
  }

  async getAllHuishoudboekjes(name: string): Promise<Huishoudboekje[]> {
    const huishoudboekjesCollection = collection(this.firestore, 'huishoudboekjes');
    const snapshot = await getDocs(
      query(huishoudboekjesCollection, where('name', '==', name))
    );

    return snapshot.docs.map((doc) => doc.data() as Huishoudboekje);
  }

  async addHuishoudboekje(huishoudboekje: Huishoudboekje) {
    const huishoudboekjeCollection = collection(
      this.firestore,
      'huishoudboekjes'
    );

    const snapshot = await getDocs(
      query(huishoudboekjeCollection, where('name', '==', huishoudboekje.name))
    );
    if (snapshot.empty) {
      await addDoc(huishoudboekjeCollection, huishoudboekje);
    } else {
      console.log('Huishoudboekje already exists in Firestore!!!');
    }
  }

  async updateHuishoudboekje(huishoudboekje: Huishoudboekje) {
    const huishoudboekjeCollection = collection(
      this.firestore,
      'huishoudboekjes'
    );

    const querySnapshot = await getDocs(
      query(huishoudboekjeCollection, where('name', '==', huishoudboekje.name))
    );

    if (querySnapshot.size === 0) {
      console.log('Huishoudboekje does not exist in Firestore!');
    } else {
      const docRef = querySnapshot.docs[0].ref;
      await updateDoc(docRef, {
        archive: huishoudboekje.archive,
        name: huishoudboekje.name,
        description: huishoudboekje.description,
        participants: huishoudboekje.participants,
      });
      console.log('Huishoudboekje updated in Firestore!');
    }
  }
}
