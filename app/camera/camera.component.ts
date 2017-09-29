import { Component, OnInit } from "@angular/core";
import * as camera from "nativescript-camera";
import { Image } from "ui/image";

import * as firebase from "nativescript-plugin-firebase";

import * as imageSourceModule from "image-source";
import * as fs from "tns-core-modules/file-system";

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
          let image = new Image();
          image.src = imageAsset;

          const fileName = Date.now() + "_firedude.png";
          let documents = fs.knownFolders.documents();
          let path = fs.path.join(documents.path, fileName);
          imageSourceModule.fromAsset(imageAsset)
              .then(imageSource => {
                console.log(path);
                if(imageSource.saveToFile(path, "png")) {
                  firebase.uploadFile({
                    remoteFullPath: "uploads/" + fileName,
                    localFile: fs.File.fromPath(path),
                    onProgress: function(status) {
                      console.log("Uploaded fraction: " + status.fractionCompleted);
                      console.log("Percentage complete: " + status.percentageCompleted);
                    }
                  }).then(
                      function (uploadedFile) {
                        console.log("File uploaded: " + JSON.stringify(uploadedFile));
                      },
                      function (error) {
                        console.log("File upload error: " + error);
                      }
                  );
                }
              });
      }).catch((err) => {
          console.log("Error -> " + err.message);
      });
  }
}