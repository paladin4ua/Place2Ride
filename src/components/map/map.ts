import {AfterViewInit, Component, ElementRef, ViewChild} from '@angular/core';

export class MarkerInfo {
  id? : any;
  coord:  google.maps.LatLng;
}


@Component({
  selector: 'map',
  templateUrl: 'map.html'
})
export class MapComponent implements AfterViewInit{

  @ViewChild('mapContainer') mapContainer: ElementRef;
  private map : google.maps.Map;

  private addedMarkers : {[id: string]: any};

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

  addPlaceMarker( markerInfo : MarkerInfo) {

    let marker = new google.maps.Marker({
      map: this.map,
      animation: google.maps.Animation.DROP,
      position: markerInfo.coord
    });

    if (markerInfo.id) {
      this.addedMarkers[markerInfo.id] = marker;
    }
  }
}
