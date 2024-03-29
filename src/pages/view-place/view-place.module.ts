import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ViewPlacePage } from './view-place';
import { MomentModule } from 'angular2-moment';
import {Ionic2RatingModule} from "ionic2-rating";

@NgModule({
  declarations: [
    ViewPlacePage,
  ],
  imports: [
    IonicPageModule.forChild(ViewPlacePage),
    Ionic2RatingModule,
    MomentModule,
  ],
})
export class ViewPlacePageModule {}
