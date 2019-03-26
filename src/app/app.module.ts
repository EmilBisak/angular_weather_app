import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { routes } from './app.router';
import { AppComponent } from './app.component';
import { WeatherSearchComponent } from './weather/weather-search.component';
import { CityWeatherComponent } from './weather/city-weather.component';
import { WeatherService } from './weather/weather.service';
import { CityListComponent } from './weather/city-list.component';

@NgModule({
  imports: [BrowserModule, FormsModule, HttpModule, routes],
  declarations: [AppComponent, WeatherSearchComponent, CityWeatherComponent, CityListComponent],
  bootstrap: [AppComponent],
  providers: [ WeatherService]
})
export class AppModule { }
