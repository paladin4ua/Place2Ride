
import {Injectable} from "@angular/core";
import { AngularFirestoreCollection } from 'angularfire2/firestore';
import { UploadedImage } from "../models/uploaded-file";
import { FirebaseApp } from "angularfire2";
import * as firebase from "firebase";
import { FirebaseUtils } from "./firebase-utils";

@Injectable()
export class ImagesService {

  constructor(private firebaseApp: FirebaseApp) {
  }

  addImageTo(collection : AngularFirestoreCollection<UploadedImage>, imageFile : File) :Promise<UploadedImage> {

    let promiss = new Promise<UploadedImage>((resolve, reject) => {

      let image = new UploadedImage();

      collection.add(FirebaseUtils.mapToObject(image)).then((imgDocRef) => {
        let storageRef = this.firebaseApp.storage().ref();
        let uploadTask = storageRef.child(`images/places/${imgDocRef.id}`).put(imageFile);

        uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
          (snapshot) => {
          },
          (error) => {
            reject(error);
          },
          () => {

            resolve(imgDocRef.update({
              url: uploadTask.snapshot.downloadURL,
            }).then(() => {
              return  <UploadedImage> {
                id : imgDocRef.id,
                url : uploadTask.snapshot.downloadURL
              };
            }));

          }
        );
      });
    });

    return promiss;
  }
}
