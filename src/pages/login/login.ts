import { Component } from '@angular/core';
import { AlertController, IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { AuthService } from "../../services/auth";
import { Facebook } from '@ionic-native/facebook';
import * as firebase from "firebase/app"

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  email: string;
  password: string;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public alertCtrl: AlertController,
              public platform: Platform,
              private facebook: Facebook,
              private authService: AuthService) {
  }


  onLoggedIn() {
    this.navCtrl.pop().then(() => {
      var onSuccess = this.navParams.get('onSuccess');
      if (onSuccess) {
        onSuccess();
      }
    });
  }

  loginEmail() {


    this.authService.adminLogin(this.email, this.password)
      .then(() => this.onLoggedIn())
      .catch((err) => {
        let alert = this.alertCtrl.create({
          message: err.message,
          buttons: [
            {
              text: "Ok",
              role: 'cancel'
            }
          ]
        });
        alert.present();
      });
  }

  loginFb() {

    return this.facebook.login(['email'])
      .then( response => {
        const facebookCredential = firebase.auth.FacebookAuthProvider
          .credential(response.authResponse.accessToken);

          this.authService.login(facebookCredential).then(() => this.onLoggedIn())
          .catch((err) => {
            let alert = this.alertCtrl.create({
              message: err.message,
              buttons: [
                {
                  text: "Ok",
                  role: 'cancel'
                }
              ]
            });
            alert.present();
          });

      }).catch((error) => { console.log(error) });

  }

}
