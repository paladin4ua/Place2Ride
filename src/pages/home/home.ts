import { Component, ViewChild } from '@angular/core';
import { NavController } from 'ionic-angular';
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

  constructor(public navCtrl: NavController, private placeService: PlaceService) {
  }

  ionViewDidLoad() {

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
      this.map.addPlaceMarker({
        id: placeId,
        coord: location,
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

}
