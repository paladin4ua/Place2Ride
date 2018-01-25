import { Component } from '@angular/core';
import { AlertController, IonicPage, NavController, NavParams } from 'ionic-angular';
import {PlaceService} from "../../services/place";
import {Place} from "../../models/place";
import { UploadedImage } from "../../models/uploaded-file";
import { ImagesService } from "../../services/images";

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

  private place: Place = new Place();
  private placeId: string;
  private uploadedImages : UploadedImage[] = [];

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private placeService: PlaceService,
              private imagesService: ImagesService,
              private alertCtrl: AlertController) {
    this.placeId = navParams.get('placeId');
    placeService.getPlace(this.placeId).then(
      (place) => this.place = place
    );
  }

  ionViewDidLoad() {
  }

  imageChange(event) {
    const fileList: FileList = event.target.files;
    if (fileList.length > 0) {
      const file = fileList[0];


      this.imagesService.addImageTo(
        this.placeService.placeImagesCollection(this.placeId), file).then(
          (image) => this.uploadedImages.push(image)
        ).catch(
          () => this.showError()
        );

    }
  }

  showError() {
    let alert = this.alertCtrl.create({
      title: 'Upload upload',
      subTitle: 'Image upload failed',
      buttons: ['Dismiss']
    });
    alert.present();
  }

}
