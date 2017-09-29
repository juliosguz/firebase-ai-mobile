import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "./auth.service";

@Component({
    selector: "ns-app",
    templateUrl: "app.component.html",
})

export class AppComponent implements OnInit {
    logged: boolean = false;

    constructor(
        private router: Router,
        private authService: AuthService
    ) {}

    ngOnInit() {
        this.authService
            .loggedIn()
            .then(status => {
                this.logged = status;
            });
    }

    logOut() {
        this.authService.logOut();
        this.router.navigate(["/login"]);
    }

}
