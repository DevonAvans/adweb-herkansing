import { Inject, Injectable } from '@angular/core';
import { Huishoudboekje } from '@models/huishoudboekje';
import { FirebaseApp } from 'firebase/app';
import { Firestore, QuerySnapshot, addDoc, collection, doc, getDocs, onSnapshot, query, updateDoc, where } from 'firebase/firestore';
import { Observable, Subscriber } from 'rxjs';
import { AuthService } from './auth.service';
import { User } from '@models/user';
import { on } from 'events';

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

    return new Observable((subscriber: Subscriber<any[]>) => {
      onSnapshot(collection(this.firestore, 'huishoudboekjes'), (snapshot) => {
        let huishoudboekjes: any[] = [];
        snapshot.forEach((doc) => {
          const data = doc.data() as Huishoudboekje;
          if (data.owner === user.email && data.archive === isArchived) {
            huishoudboekjes.push({ ...data, id: doc.id });
          }
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

    return new Observable((subscriber: Subscriber<any[]>) => {
      onSnapshot(collection(this.firestore, 'huishoudboekjes'), (snapshot) => {
        let huishoudboekjes: any[] = [];
        snapshot.forEach((doc) => {
          const data = doc.data() as Huishoudboekje;
          if (data.participants !== undefined) {
            if (data.participants.includes(user.email) && data.archive === isArchived) {
              huishoudboekjes.push({ ...data, id: doc.id });
            }
          }
        });
        subscriber.next(huishoudboekjes);
      });
    });
  }

  async getAllHuishoudboekjes(id: string): Promise<Huishoudboekje[]> {
    console.log(id);
    const huishoudboekjesCollection = collection(this.firestore, 'huishoudboekjes');
    const snapshot = await getDocs(
      query(huishoudboekjesCollection, where('id', '==', id))
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
    console.log(huishoudboekje);
    const huishoudboekjeRef = doc(this.firestore, `huishoudboekjes/${huishoudboekje.id}`);
    try {
      await updateDoc(huishoudboekjeRef, {
        name: huishoudboekje.name,
        description: huishoudboekje.description,
        owner: huishoudboekje.owner,
        archive: huishoudboekje.archive,
        participants: huishoudboekje.participants ?? [],
      });
      console.log('Huishoudboekje succesvol bijgewerkt');
    } catch (error) {
      console.error('Fout bij het bijwerken van huishoudboekje: ', error);
      throw error;
    }
  }
}
