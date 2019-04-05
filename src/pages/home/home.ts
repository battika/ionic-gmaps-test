import {Component} from '@angular/core';
import {AlertController, Events, NavController} from 'ionic-angular';
import {
  GoogleMaps,
  GoogleMap,
  GoogleMapsEvent,
  LocationService, GoogleMapOptions, Environment, MarkerOptions
} from '@ionic-native/google-maps';

import {ToastController, Platform} from 'ionic-angular';

import {SecondPage} from "../second/second";
import {MapControllerProvider, MapInstance} from "../../providers/map-controller";

const CAMERA_DEFAULT_LAT = 47.497912;
const CAMERA_DEFAULT_LONG = 19.040235;
const CAMERA_DEFAULT_ZOOMLEVEL = 13;
const POLYGON_STROKE_COLOR = '#73922a70';
const POLYGON_FILL_COLOR = '#8fbf1c20';
const POLYGON_STROKE_WIDTH = 2;

const mapId = 'HOME_MAP';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  private hMap: MapInstance;

  constructor(private navCtrl: NavController,
              private events: Events,
              private mapCtrl: MapControllerProvider,
              private toastCtrl: ToastController,
              private alertCtrl: AlertController,
              private platform: Platform)
  {
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

  ionViewWillLeave() {
    console.log('HomePage: ionViewWillLeave()');
    this.hMap.hide();
    this.events.unsubscribe('MARKER.CLICK', this._handleMarkerClick);
  }

  ionViewDidLoad() {
    console.log('HomePage: ionViewDidLoad()');

    const newMapOptions: GoogleMapOptions = {
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
    };

    this.hMap = this.mapCtrl.addMap('HOME', 'map_canvas', newMapOptions );
  }

  ionViewDidEnter() {
    console.log('HomePage: ionViewDidEnter()');
    this.platform.ready().then(
        () => {
          this.hMap.show();
          this.events.subscribe('MARKER.CLICK', this._handleMarkerClick);
        }
    );
  }

  private _handleMarkerClick(evtData) {
    console.log(JSON.stringify(evtData));
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
    this.navCtrl.setRoot(SecondPage, {}, {animate: false});
  }

  hideMap() {
    console.log('HomePage: hideMap()');
    this.hMap.hide();
  }

  showMap() {
    console.log('HomePage: showMap()');
    this.hMap.show();
  }

  addNewMarker() {
    console.log('HomePage: addNewMarker()');
    //this.hMap.addMarker();
  }


}
