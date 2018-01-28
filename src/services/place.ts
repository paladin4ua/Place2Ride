import { Injectable } from "@angular/core";
import { AngularFirestore, AngularFirestoreCollection, QueryFn } from 'angularfire2/firestore';

import { Place } from "../models/place";
import { UploadedImage } from "../models/uploaded-file";
import { FirebaseUtils } from "./firebase-utils";
import { AngularFireDatabase } from "angularfire2/database-deprecated";
import * as GeoFire from "geofire";
import { Observable } from "rxjs/Rx";

import { take } from 'rxjs/operators'


export class PlacesGeoQuery {

  private geoQuery;

  constructor(private geoFire, private placeService:PlaceService, bounds: google.maps.LatLngBounds) {
    this.geoQuery = this.geoFire.query(PlacesGeoQuery.convertToGeoFireQueryParams(bounds));
  }

  onPlaceEnter( callback : (placeId: string, location: google.maps.LatLng, place: Place) => void) {

    return this.geoQuery.on('key_entered', (key, location, distance) => {

      this.placeService.getPlace(key).pipe( take(1))
        .subscribe((place) => callback(key, new google.maps.LatLng(location[0], location[1]), place));

    });

  }
  onPlaceExit(callback: (placeId: string) => void) {
    return this.geoQuery.on('key_exited', (key, location, distance) => {
      callback(key);
    });
  }
  onPlaceMoved(callback: (placeId: string, newLocation: google.maps.LatLng) => void) {

    this.geoQuery.on('key_moved', (key, location, distance) => {
      callback(key, new google.maps.LatLng(location[0], location[1]));
    });

  }

  updateCriteria(bounds: google.maps.LatLngBounds) {
    this.geoQuery.updateCriteria(PlacesGeoQuery.convertToGeoFireQueryParams(bounds));
  }

  cancel() {
    this.geoQuery.cancel();
  }

  private static convertToGeoFireQueryParams(bounds: google.maps.LatLngBounds) {

    const center = bounds.getCenter();
    const ne = bounds.getNorthEast();

    // r = radius of the earth in statute miles
    const r = 3963.0;

    // Convert lat or lng from decimal degrees into radians (divide by 57.2958)
    const lat1 = center.lat() / 57.2958;
    const lon1 = center.lng() / 57.2958;
    const lat2 = ne.lat() / 57.2958;
    const lon2 = ne.lng() / 57.2958;

    // distance = circle radius from center to Northeast corner of bounds
    const radius = r * Math.acos(Math.sin(lat1) * Math.sin(lat2) +
      Math.cos(lat1) * Math.cos(lat2) * Math.cos(lon2 - lon1));
    return {
      center: [center.lat(), center.lng()],
      radius: radius
    }
  }
}

@Injectable()
export class PlaceService {

  geoFire: GeoFire;

  constructor(private firestore: AngularFirestore, private realtimedb: AngularFireDatabase) {
    let dbRef = this.realtimedb.list('/locations');
    this.geoFire = new GeoFire(dbRef.$ref);
  }

  private placesCollection() {
    return this.firestore.collection<Place>('places');
  }

  public placeDoc(placeId) {
    return this.placesCollection().doc(placeId);
  }

  public placeImagesCollection(placeId, queryFn?: QueryFn): AngularFirestoreCollection<UploadedImage> {
    return this.placeDoc(placeId).collection('images', queryFn);
  }

  public getPlaceImages(placeId) : Observable<UploadedImage[]> {
    return this.placeImagesCollection(placeId, ref => ref.orderBy('createdAt')).snapshotChanges().map(actions => {
      return actions.map(a => {
        const data = a.payload.doc.data() as UploadedImage;
        data.id  = a.payload.doc.id;
        return data;
      });
    });
  }

  addPlace(place: Place): Promise<string> {

    return this.placesCollection().add(FirebaseUtils.mapToObject(place))
      .then((docRef) => {
        return this.geoFire.set(docRef.id, [place.latitude, place.longitude])
          .then(() => docRef.id);
      });
  }

  getPlace(placeId: string): Observable<Place> {
    return this.placesCollection().doc(placeId).valueChanges()
      .map((place) => place as Place);
  }

  createPlaceQuery(bounds: google.maps.LatLngBounds) {
    return new PlacesGeoQuery(this.geoFire, this, bounds);
  }


}
