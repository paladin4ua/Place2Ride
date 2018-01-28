
import { NgModule } from '@angular/core';
import { PlaceService } from "./place";
import { ImagesService } from "./images";
import { AuthService } from "./auth";
import { UsersService } from "./users";


@NgModule({
  declarations: [
  ],
  imports: [
  ],
  providers: [
    PlaceService,
    ImagesService,
    AuthService,
    UsersService,
  ]
})
export class ServicesModule {}
