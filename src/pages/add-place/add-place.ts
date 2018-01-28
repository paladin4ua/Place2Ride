import {Component, ElementRef, NgZone, ViewChild} from '@angular/core';
import {IonicPage, NavController, NavParams, Slides} from 'ionic-angular';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Place} from "../../models/place"
import {TimeValidator} from "../../validators/TimeValidator";
import {PlaceService} from "../../services/place";
import {MapComponent} from "../../components/map/map";
import {ViewPlacePage} from "../view-place/view-place";
import { AuthService } from "../../services/auth";
import { LoginPage } from "../login/login";

/**
 * Generated class for the AddPlacePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-add-place',
  templateUrl: 'add-place.html',
})
export class AddPlacePage {

  private place : Place = new Place();

  @ViewChild('addWizardSlider') addWizardSlider: Slides;
  @ViewChild('location') locationInput: ElementRef;
  @ViewChild('map') map: MapComponent;

  private addForm : FormGroup;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private formBuilder: FormBuilder,
              private placeService: PlaceService,
              private authService: AuthService,
              private zone: NgZone) {

    this.addForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      openTime: ['', Validators.compose([Validators.required, TimeValidator.isValid])],
      closeTime: ['', Validators.compose([Validators.required, TimeValidator.isValid])],
    });
  }

  ionViewDidLoad() {



    let autocomplete =  new google.maps.places.Autocomplete((this.locationInput.nativeElement), {types: ['geocode']});

    autocomplete.addListener("place_changed", () => {
      this.zone.run(() => {

        let coord = autocomplete.getPlace().geometry.location;

        this.place.latitude = coord.lat();
        this.place.longitude = coord.lng();
        this.place.address = autocomplete.getPlace().formatted_address;

        this.map.addPlaceMarker({
          coord:coord
        });

      })
    });
  }

  ionViewWillEnter() {
    if (!this.authService.isUserSignedIn()) {
      this.navCtrl.push(LoginPage);
    }
  }


  addPlace() {
    let value = this.addForm.value;
    this.place.name = value.name;
    this.place.description = value.description;
    this.place.openTime = TimeValidator.parse(value.openTime);
    this.place.closeTime= TimeValidator.parse(value.closeTime);

    this.addWizardSlider.slideNext();
  };

  addLocation() {
    this.placeService.addPlace(this.place).then((placeId) => {

      this.navCtrl.setRoot(ViewPlacePage, {placeId: placeId});
    });
  }

}
