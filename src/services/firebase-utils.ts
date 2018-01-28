
import * as firebase from 'firebase/app';

export class FirebaseUtils {

  static mapToObject<T>(instance:T) : T {
    const result = {};
    Object.keys(instance).map(key => result[key] = instance[key]);
    return <T>result;
  }

  static serverTimestamp() {
    return firebase.firestore.FieldValue.serverTimestamp();
  }

}
