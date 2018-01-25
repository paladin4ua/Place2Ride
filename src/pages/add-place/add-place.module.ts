import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddPlacePage } from './add-place';
import { ComponentsModule } from "../../components/components.module";

@NgModule({
  declarations: [
    AddPlacePage
  ],
  imports: [
    IonicPageModule.forChild(AddPlacePage),
    ComponentsModule,
  ],
})
export class AddPlacePageModule {}
