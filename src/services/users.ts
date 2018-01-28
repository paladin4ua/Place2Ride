
import { Injectable } from "@angular/core";
import { AngularFirestore } from "angularfire2/firestore";
import { User } from "../models/user";
import { FirebaseUtils } from "./firebase-utils";

@Injectable()
export class UsersService {
  constructor(private firestore: AngularFirestore) {

  }

  private usersCollection() {
    return this.firestore.collection<User>('users');
  }

  public createOrUpdateSocialProfile(userId: string, user : User) : Promise<void> {
    return this.usersCollection().doc(userId).set(FirebaseUtils.mapToObject(user));
  }

  public getUser(userId: string) {
    return this.usersCollection().doc(userId).valueChanges();
  }


}
