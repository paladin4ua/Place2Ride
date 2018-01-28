
import { FirebaseUtils } from "../services/firebase-utils";

export class Place {

  name : string;

  description : string;

  address : string;

  latitude : number;

  longitude : number;

  openTime : number;

  closeTime : number;

  avarageRaiting?: number;
  numberRaitings?: number;


  createdAt: firebase.firestore.FieldValue = FirebaseUtils.serverTimestamp();

}
