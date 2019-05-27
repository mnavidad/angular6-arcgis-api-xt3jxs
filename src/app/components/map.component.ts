import { Component, OnInit, Input } from '@angular/core';
import { ArcgisApiService } from '../services';

@Component({
  selector: 'my-map',
  template: `<div [id]="id" [style.width]="width" [style.height]="height"></div>`,
  styles: []
})
export class MapComponent implements OnInit  {
  sceneView: any;

  @Input() id: string;
  @Input() center: [number, number];
  @Input() width: string;
  @Input() height: string;
  @Input() zoom: number;
  @Input() basemap: string;
  @Input() title: string;

  constructor(private arcgisService: ArcgisApiService) {}

  ngOnInit() {
    this.arcgisService.loaded$.subscribe(loaded => {
      if(loaded) {
        this.arcgisService.constructMap({basemap: this.basemap, elevation: true}).then(map => {
          this.arcgisService.constructSceneView(
            { 
            map: map,
            container: this.id,
            center: [1, 45],
            zoom: 5
            }
            ).then(sceneView => this.sceneView = sceneView)
        })
      }
    })
  }
}
