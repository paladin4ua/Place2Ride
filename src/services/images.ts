
import {Injectable} from "@angular/core";
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { UploadedImage } from "../models/uploaded-file";

@Injectable()
export class ImagesService {

  constructor(private firestore: AngularFirestore) {
  }

  addImageTo(collection : AngularFirestoreCollection<any>, imageFile : File) :Promise<UploadedImage> {

    let promiss = new Promise<UploadedImage>((resolve, reject) => {

      collection.add({}).then((imgDocRef) => {
        let storageRef = firebase.storage().ref();
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
