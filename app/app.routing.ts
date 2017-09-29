import { NgModule } from "@angular/core";
import { NativeScriptRouterModule } from "nativescript-angular/router";
import { Routes } from "@angular/router";

import { AuthGuard } from "./auth-guard.service";

import { LoginComponent } from "./login/login.component";
import { CameraComponent } from "./camera/camera.component";

const routes: Routes = [
    { 
        path: "",
        redirectTo: "/login", 
        pathMatch: "full"
    },
    { 
        path: "login", 
        component: LoginComponent,
        canActivate: [AuthGuard]
    },
    { path: "camera", component: CameraComponent }
];

@NgModule({
    imports: [NativeScriptRouterModule.forRoot(routes)],
    exports: [NativeScriptRouterModule]
})
export class AppRoutingModule { }