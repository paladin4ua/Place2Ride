
import { Injectable } from "@angular/core";
import { User } from "../models/user";
import { AngularFireAuth } from "angularfire2/auth";
import { Observable } from "rxjs/Observable";
import { UsersService } from "./users";
import { flatMap } from "rxjs/operators"
import { empty } from "rxjs/observable/empty";

@Injectable()
export class AuthService {

  private signedInUser: User = null;
  private signedInUserId: string = null;

  isUserSignedIn() {
    return !!this.signedInUser;
  }

  getSignedInUser() {
    return this.signedInUser;
  }

  getSignedInUserId() {
    return this.signedInUserId;
  }

  isAdminSignedIn() {
    return this.signedInUser && this.signedInUser.isAdmin;
  }

  constructor(private angularFireAuth: AngularFireAuth, private usersService: UsersService) {
    this.authState().subscribe(user => {
      this.signedInUser = user;
    });
  }


  signOut() {
    return this.angularFireAuth.auth.signOut();
  }

  login(  credential: firebase.auth.AuthCredential) {

    return this.angularFireAuth.auth.signInWithCredential(credential).then((firebaseUser) => {
      return this.usersService.createOrUpdateSocialProfile(firebaseUser.uid, {
        displayName: firebaseUser.displayName,
        photoURL: firebaseUser.photoURL
      });
    });

  }

  adminLogin(email: string, password:string) {
    return  this.angularFireAuth.auth.signInWithEmailAndPassword(email, password);
  }


  authState(): Observable<User> {
    return this.angularFireAuth.authState.pipe( flatMap((fireUser) => {
      if (fireUser && fireUser.uid) {
        this.signedInUserId = fireUser.uid;
        return this.usersService.getUser(fireUser.uid);
      } else {
        return empty();
      }
    }));
  }

}
