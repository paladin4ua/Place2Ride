import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { Facebook } from '@ionic-native/facebook';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';

import { AddPlacePageModule } from "../pages/add-place/add-place.module"

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { ServicesModule } from "../services/services.module";
import { ComponentsModule } from "../components/components.module";
import { ViewPlacePageModule } from "../pages/view-place/view-place.module";
import { AngularFireDatabaseModule } from "angularfire2/database-deprecated";
import { LoginPageModule } from "../pages/login/login.module";
import { AddReviewPageModule } from "../pages/add-review/add-review.module";
import { PageUtils } from "../pages/utils";

export const firebaseConfig = {
  apiKey: "AIzaSyBq3Swf88Mt28PwjeUbf4xStxz5hQUv1OQ",
  authDomain: "place2ride.firebaseapp.com",
  databaseURL: "https://place2ride.firebaseio.com",
  projectId: "place2ride",
  storageBucket: "place2ride.appspot.com",
  messagingSenderId: "1035706966511"
};

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule,
    AddPlacePageModule,
    ViewPlacePageModule,
    AddReviewPageModule,
    LoginPageModule,
    ComponentsModule,
    ServicesModule,
    AngularFirestoreModule,
    AngularFireDatabaseModule,
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Facebook,
    PageUtils,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {
}
