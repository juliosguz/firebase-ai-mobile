import { Component, OnInit } from "@angular/core";
import * as camera from "nativescript-camera";
import { Image } from "ui/image";

// Add explicit camera permission 
camera.requestPermissions();

@Component({
  selector: "ns-items",
  moduleId: module.id,
  templateUrl: "./camera.component.html",
  styleUrls: ["./camera.css"]
})
export class CameraComponent implements OnInit {
  constructor() { }

  ngOnInit(): void {

  }

  takePicture() {
    camera
      .takePicture()
      .then((imageAsset) => {
          console.log("Result is an image asset instance");
          let image = new Image();
          image.src = imageAsset;
          console.log("Size: " + imageAsset.options.width + "x" + imageAsset.options.height);
          console.log("keepAspectRatio: " + imageAsset.options.keepAspectRatio);
          console.log("Photo saved in Photos/Gallery for Android or in Camera Roll for iOS");
      }).catch((err) => {
          console.log("Error -> " + err.message);
      });
  }
}