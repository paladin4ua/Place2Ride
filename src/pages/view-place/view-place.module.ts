import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ViewPlacePage } from './view-place';
import { MomentModule } from 'angular2-moment';

@NgModule({
  declarations: [
    ViewPlacePage,
  ],
  imports: [
    IonicPageModule.forChild(ViewPlacePage),
    MomentModule,
  ],
})
export class ViewPlacePageModule {}
