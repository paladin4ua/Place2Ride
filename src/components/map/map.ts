import {AfterViewInit, Component, ElementRef, ViewChild} from '@angular/core';

export class MarkerInfo {
  id? : any;
  coord:  google.maps.LatLng;
  label?: string;
  onClick?: () => void;
  categories?: string[];
}

class AddedMarker {
  gmapMarker: any;
  categories: string[];
}

declare var MapLabel: any;

@Component({
  selector: 'map',
  templateUrl: 'map.html'
})
export class MapComponent implements AfterViewInit{

  @ViewChild('mapContainer') mapContainer: ElementRef;
  private map : google.maps.Map;

  private addedMarkers : {[id: string]: AddedMarker} = {};

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

    new MapLabel({
      text: markerInfo.label,
      position: markerInfo.coord,
      map: this.map,
      fontSize: 12,
      fontColor: 'red'
    });

    if (markerInfo.onClick) {
      marker.addListener('click', markerInfo.onClick);
    }

    if (markerInfo.id) {
      this.addedMarkers[markerInfo.id] = {
        gmapMarker : marker,
        categories: markerInfo.categories
      };
    }
  }

  moveMarker(id : any, location:  google.maps.LatLng) {

    let marker = this.addedMarkers[id];
    if (marker) {
      marker.gmapMarker.setPosition(location);
    }
  }

  removeMarker(id: any) {
    let marker = this.addedMarkers[id];
    if (marker) {
      marker.gmapMarker.setMap(null);
    }
  }

  filterMarkersByCategories(filterBy: string[]) {
    for (let id in this.addedMarkers) {
      let marker = this.addedMarkers[id];

      let hasCategories = true;

      filterBy.forEach(filterCat => {
        if (!marker.categories.find( cat => cat == filterCat )) {
          hasCategories = false;
        }
      });

      marker.gmapMarker.setVisible(hasCategories);

    }
  }

}
