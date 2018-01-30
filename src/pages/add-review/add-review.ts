import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {AuthService} from "../../services/auth";
import PlacesService, {PlaceService} from "../../services/place";

/**
 * Generated class for the AddReviewPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-add-review',
  templateUrl: 'add-review.html',
})
export class AddReviewPage {

 // private authStateSubscription: Subscription;

  rating: number;
  comment: string;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public authService:AuthService,
              private placesService: PlaceService) {
  }

  ionViewDidLoad() {
   // this.authStateSubscription = this.authService.authState().subscribe((user) => );
  }

  ionViewWillUnload() {
  }


  addReview() {

    this.placesService.ratePlace(
        this.navParams.get('placeId'),
        this.authService.getSignedInUserId(),
        this.authService.getSignedInUser(),
        this.rating,
        this.comment
    ).then(() => {
          this.navCtrl.pop();
    });
  }
}
