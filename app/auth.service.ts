import { Injectable } from "@angular/core";
import * as firebase from "nativescript-plugin-firebase";

@Injectable()
export class AuthService {

  constructor() { }

  loggedIn() {
    return firebase
      .getCurrentUser()
      .then(user => {
        return true;
      })
      .catch(error => {
        return false;
      });
  }

  logOut() {
    firebase.logout();
  }
}