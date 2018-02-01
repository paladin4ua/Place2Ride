
import { FirebaseUtils } from "../services/firebase-utils";

export class Place {

  name : string;

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
