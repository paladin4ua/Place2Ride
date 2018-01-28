import {AfterViewInit, Component, ElementRef, ViewChild} from '@angular/core';

export class MarkerInfo {
  id? : any;
  coord:  google.maps.LatLng;
  onClick?: () => void;
}


@Component({
  selector: 'map',
  templateUrl: 'map.html'
})
export class MapComponent implements AfterViewInit{

  @ViewChild('mapContainer') mapContainer: ElementRef;
  private map : google.maps.Map;

  private addedMarkers : {[id: string]: any} = {};

  constructor() {
  }

  ngAfterViewInit() {

    let latLng = new google.maps.LatLng(49.83826, 24.02324);

    let mapOptions = {
      streetViewControl: false,
      mapTypeControl: false,
      center: latLng,
      zoom: 12,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    this.map = new google.maps.Map(this.mapContainer.nativeElement, mapOptions);
  }

  onBoundsChanged(callback:(bounds: google.maps.LatLngBounds) => void ) {
    google.maps.event.addListener(this.map, 'bounds_changed', () => {
      callback(this.map.getBounds());
    });
  }

  getBounds() {
    return this.map.getBounds();
  }

  addPlaceMarker( markerInfo : MarkerInfo) {

    let marker = new google.maps.Marker({
      map: this.map,
      animation: google.maps.Animation.DROP,
      position: markerInfo.coord
    });

    if (markerInfo.onClick) {
      marker.addListener('click', markerInfo.onClick);
    }

    if (markerInfo.id) {
      this.addedMarkers[markerInfo.id] = marker;
    }
  }

  moveMarker(id : any, location:  google.maps.LatLng) {

    let marker = this.addedMarkers[id];
    if (marker) {
      marker.setPosition(location);
    }
  }

  removeMarker(id: any) {
    let marker = this.addedMarkers[id];
    if (marker) {
      marker.setMap(null);
    }
  }

}
