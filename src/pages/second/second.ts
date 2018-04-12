import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {
  GoogleMaps,
  GoogleMap,
  GoogleMapsEvent,
  Marker,
  GoogleMapsAnimation,
  MyLocation,
  Environment
} from '@ionic-native/google-maps';

const CAMERA_DEFAULT_LAT = 40.771133;
const CAMERA_DEFAULT_LONG = -73.974187;
const CAMERA_DEFAULT_ZOOMLEVEL = 13;


@Component({
  selector: 'page-second',
  templateUrl: 'second.html'
})
export class SecondPage {

  mapReady: boolean = false;
  map: GoogleMap;


  constructor(public navCtrl: NavController) {
  }

  ionViewDidEnter() {
    console.log('SecondPage: ionViewDidEnter()');
    this.loadMap();
  }

  loadMap() {
    console.log('SecondPage: loadMap()');
    this.map = GoogleMaps.create('map_second', {
      mapType: 'MAP_TYPE_NORMAL',
      controls: {
        compass: true,
        myLocationButton: true,
        indoorPicker: false,
        zoom: true
      },
      gestures: {
        scroll: true,
        tilt: false,
        rotate: true,
        zoom: true
      },
      styles: [
        {
          featureType: "all",
          stylers: [
            {saturation: -80}
          ]
        },
        {
          featureType: "poi.business",
          elementType: "labels",
          stylers: [
            {visibility: "off"}
          ]
        }
      ],
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
      console.log('SecondPage: map is ready...');
    });

  }

  ionViewWillLeave() {
    console.log('SecondPage: ionViewWillLeave()');
    /* According to Google Maps plugin's developer destroying the map
    is not needed, as soon as the containing HTML element is removed the map will be destroyed...
    However, it is still possible to destroy it manually if you like...
    this.map.destroy();
    */
  }

}
