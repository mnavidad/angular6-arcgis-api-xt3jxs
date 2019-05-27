import { Injectable } from '@angular/core';
import { loadModules, loadScript } from 'esri-loader';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class ArcgisApiService {
  loaded$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor() {
    this.loaded$.subscribe(loaded => {
      if (!loaded) {
        loadScript({
          // use a specific version of the JSAPI
          url: 'https://js.arcgis.com/4.7/'
        })
          .then(() => {
            this.loaded$.next(true)
          }).catch(err => this.loaded$.next(true))
      }
    });
  }

  constructMap(opts: { basemap: any; elevation: boolean }): Promise<any[]> {
    return new Promise((resolve, reject) => {
      loadModules(['esri/WebMap']).then(([WebMap]) => {
        const map = new WebMap({
          portalItem:{
            id:"8e42e164d4174da09f61fe0d3f206641"
          },
          basemap: opts.basemap
        });
        if (opts.elevation) {
          map.ground = 'world-elevation';
        }
        resolve(map);
      });
    });
  }

  constructMapView(opts: {
    center: number[];
    zoom: number;
    container: string;
    map: any;
    padding?: any;
  }): Promise<any[]> {
    return new Promise((resolve, reject) => {
      loadModules(['esri/views/MapView',"esri/widgets/Home","esri/widgets/Print","esri/widgets/Expand","esri/widgets/BasemapGallery","esri/widgets/Legend","esri/widgets/LayerList"])
        .then(([MapView,Home,Print,Expand,BasemapGallery,Legend,LayerList]) => {
          const view = new MapView({
            center: opts.center,
            zoom: opts.zoom,
            map: opts.map,
            container: opts.container,
            padding: opts.padding ? opts.padding : {}
          });
          const homeWidget = new Home({
          view: view
          });
           const print = new Print({
           view: view,
           printServiceUrl:"https://utility.arcgisonline.com/arcgis/rest/services/Utilities/PrintingTools/GPServer/Export%20Web%20Map%20Task"
 });
        const printExpand = new Expand({
        view: view,
        content: print
        });
        const basemapGallery = new BasemapGallery({
        view: view,
        source: {
        portal: {
            url: "https://www.arcgis.com",
            useVectorBasemaps: true  // Load vector tile basemaps
        }
    }
});
      const bgExpand = new Expand({
      view: view,
      content: basemapGallery
      });
      const legend = new Legend({
      view: view
   
      });
      const legendExpand = new Expand({
      view: view,
      content: legend
        });
        const layerList = new LayerList({
        view: view
});
      const layerListExpand = new Expand({
      view: view,
      content: layerList
});
          view.ui.add(homeWidget,  "top-left");
          view.ui.add(printExpand,"top-right");
          view.ui.add(bgExpand,"top-right");
          view.ui.add(legendExpand,"top-right");
          view.ui.add(layerListExpand,"top-right");
          view.when(() => {
            resolve(view);
          });
      });
    });
  }
}
