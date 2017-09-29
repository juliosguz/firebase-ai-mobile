import { Injectable } from "@angular/core";
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { RouterExtensions } from "nativescript-angular/router";

import { AuthService } from "./auth.service";
import { Observable } from 'rxjs/Observable';

import * as firebase from "nativescript-plugin-firebase";

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(
    private router: RouterExtensions,
    private authService: AuthService
  ) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    return this.authService
      .loggedIn()
      .then(status => {
        let response = true;
        if(status) {
          this.router.navigate(["/camera"], { clearHistory: true });
          response = true;
        } else {
          if(state.url !== "/login") {
            this.router.navigate(["/login"], { clearHistory: true });
            response = false;
          }
        }

        return response;
      });
  }
}