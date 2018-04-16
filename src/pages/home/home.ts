import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {
  GoogleMaps,
  GoogleMap,
  GoogleMapsEvent,
  LocationService
} from '@ionic-native/google-maps';

import { ToastController, Platform } from 'ionic-angular';

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
  firstLoad: boolean = true;

  constructor(public navCtrl: NavController,
              private toastCtrl: ToastController,
              private platform: Platform) {

    this.setupEventListeners();
  }

  setupEventListeners() {
    console.log('HomePage: setupEventListeners()');
    this.platform.pause.subscribe(() => {
      console.info('Application is in running in the background...');
    });

    this.platform.resume.subscribe(() => {
      console.info('Application is in running in the foreground...');
    });
  }

  ionViewDidLoad() {
    console.log('HomePage: ionViewDidLoad()');
    this.loadMap();
  }

  loadMap() {
    console.log('HomePage: loadMap()');
    this.map = GoogleMaps.create('map_canvas', {
      mapType: "MAP_TYPE_NORMAL",
      controls: {
        compass: false,
        myLocation: true,
        myLocationButton: false,
        zoom: true
      },
      gestures: {
        scroll: true,
        tilt: false,
        rotate: true,
        zoom: true
      },
      camera: {
        target: {
          lat: CAMERA_DEFAULT_LAT,
          lng: CAMERA_DEFAULT_LONG
        },
        zoom: CAMERA_DEFAULT_ZOOMLEVEL
      },
      preferences: {
        zoom: {
          minZoom: 10,
          maxZoom: 18
        },
        building: false
      }
    });

    this.map.one(GoogleMapsEvent.MAP_READY).then(() => {
      this.mapReady = true;
      console.log('HomePage: map is ready...');
    });

  }

  ionViewWillLeave() {
    console.log('HomePage: ionViewWillLeave()');

    /* According to Google Maps plugin's developer hiding the map
    is no longer needed from version 2.2.8 as the plugin takes care of hiding/showing the map automatically.
    However, it is still possible to hide it manually if needed...

    this.map.setDiv(null);
*/
  }

  ionViewDidEnter() {
    console.log('HomePage: ionViewDidEnter()');

    if (!this.firstLoad) {
      this.map.setDiv('map_canvas');
    } else {
      this.firstLoad = false;
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


  openSecondPage() {
    console.log('HomePage: openSecondPage()');
    this.navCtrl.push(SecondPage,{},{animate:false});
  }

  getUserLocation() {
    console.log('HomePage: getUserLocation()');
    LocationService.getMyLocation({enableHighAccuracy: true}).then(
        (result) => {
          console.log(JSON.stringify(result));
        },
        (err) => {
          console.error(JSON.stringify(err));
        }
    ).catch((e) => {
      console.error(JSON.stringify(e));
    });
    }

  }
