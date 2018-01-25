import { Injectable } from "@angular/core";
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';

import { Place } from "../models/place";
import { FirebaseUtils } from "./firebase-utils";

@Injectable()
export class PlaceService {

  constructor(private firestore: AngularFirestore) {
  }

  private placesCollection() {
    return this.firestore.collection<Place>('places');
  }

  public placeDoc(placeId) {
    return this.placesCollection().doc(placeId);
  }

  public placeImagesCollection(placeId): AngularFirestoreCollection<any> {
    return this.placeDoc(placeId).collection('images');
  }

  addPlace(place: Place): Promise<string> {
    return this.placesCollection().add(FirebaseUtils.mapToObject(place))
      .then((docRef) => docRef.id);
  }

  getPlace(placeId: string): Promise<Place> {
    return this.placesCollection().doc(placeId).ref.get().then((doc) => {
      return FirebaseUtils.mapFromObject(Place, doc.data());
    });
  }

}
