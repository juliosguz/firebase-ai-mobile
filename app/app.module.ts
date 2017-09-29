import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptModule } from "nativescript-angular/nativescript.module";
import { AppRoutingModule } from "./app.routing";

import { AuthGuard } from "./auth-guard.service";
import { AuthService } from "./auth.service";

import { AppComponent } from "./app.component";

import { LoginComponent } from "./login/login.component";
import { CameraComponent } from "./camera/camera.component";
import * as firebase from "nativescript-plugin-firebase";
import { environments } from "./environments";

// Uncomment and add to NgModule imports if you need to use two-way binding
// import { NativeScriptFormsModule } from "nativescript-angular/forms";

// Uncomment and add to NgModule imports  if you need to use the HTTP wrapper
// import { NativeScriptHttpModule } from "nativescript-angular/http";

firebase.init({
    storageBucket: environments.storageBucket,
    onAuthStateChanged: function(data) { // optional but useful to immediately re-logon the user when he re-visits your app
        console.log(data.loggedIn ? "Logged in to firebase" : "Logged out from firebase");
        if (data.loggedIn) {
            console.log("user's email address: " + (data.user.email ? data.user.email : "N/A"));
        }
    }
});

@NgModule({
    bootstrap: [
        AppComponent
    ],
    imports: [
        NativeScriptModule,
        AppRoutingModule
    ],
    declarations: [
        AppComponent,
        LoginComponent,
        CameraComponent
    ],
    providers: [
        AuthGuard,
        AuthService
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
/*
Pass your application module to the bootstrapModule function located in main.ts to start your app
*/
export class AppModule { }
