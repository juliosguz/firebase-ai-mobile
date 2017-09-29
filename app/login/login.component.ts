import { Component, OnInit } from "@angular/core";
import { RouterExtensions } from "nativescript-angular/router";

import { Page } from "ui/page";
import { TextField } from "ui/text-field";

import * as firebase from "nativescript-plugin-firebase";

@Component({
  selector: "ns-items",
  moduleId: module.id,
  templateUrl: "./login.component.html",
  styleUrls: ["./login.css"]
})
export class LoginComponent implements OnInit {
  username: TextField;
  password: TextField;
  constructor(
    private router: RouterExtensions,
    private page: Page
  ) { }

  ngOnInit(): void {
    this.username = this.page.getViewById<TextField>("username");
    this.password = this.page.getViewById<TextField>("password");
  }

  login(): void {
    firebase
    .login({
      type: firebase.LoginType.PASSWORD,
      passwordOptions: {
        email: this.username.text,
        password: this.password.text
      }
    })
    .then(result => {
      this.router.navigate(["/camera"], { clearHistory: true });
    });

  }
}