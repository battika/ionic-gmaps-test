import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {
  GoogleMaps,
  GoogleMap,
  GoogleMapsEvent,
  Marker,
  GoogleMapsAnimation,
  MyLocation,
  ILatLng
} from '@ionic-native/google-maps';

import { ToastController } from 'ionic-angular';

import {SecondPage} from "../second/second";

const CAMERA_DEFAULT_LAT = 47.497912;
const CAMERA_DEFAULT_LONG = 19.040235;
const CAMERA_DEFAULT_ZOOMLEVEL = 13;
const POLYGON_STROKE_COLOR = '#73922a70';
const POLYGON_FILL_COLOR = '#8fbf1c20';
const POLYGON_STROKE_WIDTH = 2;


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  mapReady: boolean = false;
  map: GoogleMap = null;
  radarPos: ILatLng = {lat: CAMERA_DEFAULT_LAT, lng: CAMERA_DEFAULT_LONG};
  radarRadius = 400;
  radarObj: any;


  constructor(public navCtrl: NavController,
              private toastCtrl: ToastController) {
  }

  ionViewDidLoad() {
    console.log('HomePage: ionViewDidLoad');
    this.loadMap();
  }

  loadMap() {
    console.log('HomePage: loadMap()');
    this.map = GoogleMaps.create('map_canvas', {
      'mapType': 'MAP_TYPE_NORMAL',
      'controls': {
        'compass': true,
        'myLocationButton': true,
        'indoorPicker': false,
        'zoom': true
      },
      'gestures': {
        'scroll': true,
        'tilt': false,
        'rotate': true,
        'zoom': true
      },
      'camera': {
        target: {
          lat: CAMERA_DEFAULT_LAT,
          lng: CAMERA_DEFAULT_LONG
        },
        zoom: CAMERA_DEFAULT_ZOOMLEVEL
      },
      'preferences': {
        'zoom': {
          'minZoom': 10,
          'maxZoom': 18
        },
        'building': false
      }
    });

    this.map.one(GoogleMapsEvent.MAP_READY).then(() => {
      this.mapReady = true;
      console.log('HomePage: map is ready...');
/*    this.map.on(GoogleMapsEvent.CAMERA_MOVE).subscribe(
        (pos) => {
          this.setRadar();
        }
    );


      this.map.on(GoogleMapsEvent.CAMERA_MOVE_START).subscribe(
          (pos) => {
            this.setRadar();
          }
      );

      this.map.on(GoogleMapsEvent.CAMERA_MOVE_END).subscribe(
          (pos) => {
            this.setRadar();
          }
      );*/
    });

  }

  ionViewWillLeave() {
    console.log('HomePage: ionViewWillLeave()');
    this.map.setDiv(null);
  }

  ionViewDidEnter() {
    console.log('HomePage: ionViewDidEnter()');
    if (this.map) {
      this.map.setDiv('map_canvas');
    }
  }

  displayToast() {
    console.log('displayToast()');
    let toast = this.toastCtrl.create({
      message: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      showCloseButton: true,
      position: 'top'
    });

    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });

    toast.present();
  }

  setRadar() {
    this.radarPos = this.map.getCameraTarget();
    if (!this.radarObj) {
      this.map.addCircle({
        center: this.radarPos,
        radius: this.radarRadius,
        strokeColor: POLYGON_STROKE_COLOR,
        fillColor: POLYGON_FILL_COLOR,
        strokeWidth: POLYGON_STROKE_WIDTH
      }).then(
          (obj) => {
            this.radarObj = obj;
          }
      );
    } else {
      this.radarObj.setCenter(this.radarPos);
    }

  }

  openSecondPage() {
    console.log('HomePage: openSecondPage()');
    this.navCtrl.push(SecondPage);
  }

  }
