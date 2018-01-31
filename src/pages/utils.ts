import { Injectable } from "@angular/core";
import { NavController } from "ionic-angular";
import { NavOptions, Page, TransitionDoneFn } from "ionic-angular/navigation/nav-util";
import { AuthService } from "../services/auth";
import { LoginPage } from "./login/login";

@Injectable()
export class PageUtils {
  constructor(private authService: AuthService) {

  }

  verifyAuthAndPush(navCtrl: NavController, page: Page | string, params?: any, opts?: NavOptions, done?: TransitionDoneFn) {

    let push = () => {
      navCtrl.push(page, params, opts, done);
    };

    if (this.authService.isUserSignedIn()) {
      push();
    } else {
      navCtrl.push(LoginPage, {onSuccess: push});
    }
  }
}