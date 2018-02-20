import { Component, ViewChild } from '@angular/core';
import { Loading, LoadingController, NavController } from 'ionic-angular';
import { PlaceService, PlacesGeoQuery } from "../../services/place";
import { MapComponent } from "../../components/map/map";
import { ViewPlacePage } from "../view-place/view-place";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  @ViewChild('map') map: MapComponent;
  private placesGeoQuery : PlacesGeoQuery;

  private startTime = new Date();
  private loader : Loading = null;

  constructor(public navCtrl: NavController, private placeService: PlaceService, public loadingCtrl: LoadingController) {
  }
  ionViewDidLoad() {

    this.loader = this.loadingCtrl.create({
      content:"Loading..."
    });

    this.loader.present();

    this.map.onBoundsChanged((bounds) => {

      if (!this.placesGeoQuery) {
        this.placesGeoQuery = this.createGeoQuery(bounds);
      } else {
        this.placesGeoQuery.updateCriteria(bounds);
      }
    })
  }

  private createGeoQuery(bounds) {
    let placesGeoQuery = this.placeService.createPlaceQuery(bounds);
    placesGeoQuery.onPlaceEnter((placeId, location, place) => {

      if (this.loader) {
        this.loader.dismiss();
        this.loader = null;
      }

      this.map.addPlaceMarker({
        id: placeId,
        coord: location,
        label: place.name,
        onClick: () => {
          this.navCtrl.push(ViewPlacePage, {placeId: placeId});
        }
      });
    });

    placesGeoQuery.onPlaceMoved((placeId, location) => {
      this.map.moveMarker(placeId, location);
    });

    placesGeoQuery.onPlaceExit((placeId) => {
      this.map.removeMarker(placeId);
    });

    return placesGeoQuery;
  }

  ionViewWillUnload() {
    if (this.placesGeoQuery) {
      this.placesGeoQuery.cancel();
    }
  }

  /*presentRadioPopover(ev: UIEvent) {
    let popover = this.popoverCtrl.create(PageTwo, {
      contentEle: this.content.nativeElement,
      textEle: this.text.nativeElement
    });

    popover.present({
      ev: ev
    });
  }*/

}
