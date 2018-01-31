import { Component, ViewChild } from '@angular/core';
import { AlertController, IonicPage, NavController, NavParams, Slides } from 'ionic-angular';
import {PlaceService} from "../../services/place";
import {Place} from "../../models/place";
import { UploadedImage } from "../../models/uploaded-file";
import { ImagesService } from "../../services/images";
import { AuthService } from "../../services/auth";
import {AddReviewPage} from "../add-review/add-review";
import { PageUtils } from "../utils";

/**
 * Generated class for the ViewPlacePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@IonicPage()
@Component({
  selector: 'page-view-place',
  templateUrl: 'view-place.html',
})
export class ViewPlacePage {

  @ViewChild(Slides) images: Slides;

  private place: Place = new Place();
  private placeId: string;
  private uploadedImages : UploadedImage[] = [];

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public authService: AuthService,
              private placeService: PlaceService,
              private imagesService: ImagesService,
              private alertCtrl: AlertController,
              private pageUtils: PageUtils) {
    this.placeId = navParams.get('placeId');
    placeService.getPlace(this.placeId).subscribe(
      (place) => this.place = place
    );
  }

  ionViewDidLoad() {
    this.placeService.getPlaceImages(this.placeId).subscribe(uploadedImages => {
      this.uploadedImages = uploadedImages;
    });
  }

  imageChange(event) {
    const fileList: FileList = event.target.files;
    if (fileList.length > 0) {
      const file = fileList[0];


      this.imagesService.addImageTo(
        this.placeService.placeImagesCollection(this.placeId), file).then(
          () => {}
        ).catch(
          (err) => this.showError(err)
        );

    }
  }

  addReview(){

    this.pageUtils.verifyAuthAndPush(this.navCtrl, AddReviewPage, {placeId: this.placeId});

  }

  showError(err) {
    console.log(err);
    let alert = this.alertCtrl.create({
      title: 'Upload upload',
      subTitle: 'Image upload failed',
      buttons: ['Dismiss']
    });
    alert.present();
  }

}
