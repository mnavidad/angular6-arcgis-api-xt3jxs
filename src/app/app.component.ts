import { Component, OnInit } from '@angular/core';
import { ArcgisApiService } from './services';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent implements OnInit  {
 // sceneView: any;
 mapView: any;

  constructor(private arcgisService: ArcgisApiService) {}

  ngOnInit() {
    this.arcgisService.loaded$.subscribe(loaded => {
      if(loaded) {
        this.arcgisService.constructMap({basemap: "hybrid", elevation: true}).then(map => {
          this.arcgisService.constructMapView({map: map, container: "map", center: [-122.6762071, 45.5234515], zoom: 15}).then(mapView => this.mapView = mapView)
        })
      }
    })
  }
}
