
import { FirebaseUtils } from "../services/firebase-utils";

enum PlaceType {
  Store = 'store',
  Workshop = 'workshop',
  Both = 'both'
}

export class Place {

  name : string;

  type: PlaceType;

  categories: string[];

  description : string;

  address : string;

  latitude : number;

  longitude : number;

  openTime : number;

  closeTime : number;

  averageRating?: number;
  numberRatings?: number;


  createdAt: firebase.firestore.FieldValue = FirebaseUtils.serverTimestamp();

}
