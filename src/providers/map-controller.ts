import {Injectable} from '@angular/core';
import {
  GoogleMap,
  GoogleMapOptions,
  GoogleMaps, GoogleMapsEvent,
} from "@ionic-native/google-maps";
import {Events} from "ionic-angular";


export interface IMapInstance {
  mapId: string;
  div: string;
  eventMgr: Events;
  options: GoogleMapOptions;
}

export class MapInstance {
  private inst: IMapInstance;

  private ready: Promise<boolean>;
  private readyResolve: any;
  public nativeMapObj: GoogleMap;

  constructor(mapId: string, div: string, eventMgr: Events, options?: GoogleMapOptions) {
    this.inst = {
      mapId: mapId,
      div: div,
      eventMgr: eventMgr,
      options: options ? options : null
    };
    this.ready = new Promise<boolean>(resolve => {
      this.readyResolve = resolve;
    });
  }


  getId() {
    return this.inst.mapId;
  }

  getOptions() {
    return this.inst.options;
  }

  setOptions(options: GoogleMapOptions) {
    this.inst.options = options;
  }

  show() {
    console.log('show()');
    console.log(JSON.stringify(this.inst));

    if (this.inst) {
      if (this.nativeMapObj) {
        if (!this.nativeMapObj.getDiv()) {
          this.nativeMapObj.setDiv(this.inst.div);
        }
      } else {
        this.nativeMapObj = GoogleMaps.create(this.inst.div, this.inst.options);
        this.nativeMapObj.one(GoogleMapsEvent.MAP_READY).then(() => {
          this.readyResolve(true);
          console.log('Map is ready.....');
        });
      }
    }
  }

  hide() {
    if (this.inst) {
      if (this.nativeMapObj) {
        this.nativeMapObj.setDiv();
      }
    }
  }
}

@Injectable()
export class MapControllerProvider {

  private maps: Array<MapInstance> = [];

  constructor(private events: Events) {
  }

  addMap(mapId: string, div: string, options?: GoogleMapOptions) {
    if (!this.hasMap(mapId)) {
      const mapInst = new MapInstance(mapId, div, this.events, options);
      this.maps.push(mapInst);
      return mapInst;
    }
    return this.getMapInstance(mapId);
  }

  removeMap(map: MapInstance | string) {
    this.maps = this.maps.filter(mapEl => {
      return map instanceof MapInstance ? mapEl != map : mapEl.getId() != map;
    });
  }

  hasMap(map: MapInstance | string): boolean {
    return this.getMapInstance(map) != undefined;
  }

  getMapInstance(map: MapInstance | string): MapInstance {
    return this.maps.find(mapEl => {
      return map instanceof MapInstance ? mapEl == map : mapEl.getId() == map;
    });
  }
}
