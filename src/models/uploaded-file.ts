
import * as firebase from 'firebase/app';
import { FirebaseUtils } from "../services/firebase-utils";

export class UploadedImage {
  id?: string;
  url? : string;
  createdAt: firebase.firestore.FieldValue = FirebaseUtils.serverTimestamp();
};
