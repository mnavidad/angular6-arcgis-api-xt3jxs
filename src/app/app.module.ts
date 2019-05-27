import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { MapComponent } from './components/map.component';
import { ArcgisApiService } from './services/arcgis-api.service';

@NgModule({
  imports: [ BrowserModule, FormsModule ],
  declarations: [ AppComponent, MapComponent ],
  bootstrap: [ AppComponent ],
  providers: [ArcgisApiService]
})
export class AppModule { }
