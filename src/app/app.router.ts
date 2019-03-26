import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { WeatherSearchComponent } from './weather/weather-search.component';
import { CityWeatherComponent } from './weather/city-weather.component';

export const router: Routes = [
    { path: 'weather', component: WeatherSearchComponent },
    { path: 'weather/city', component: CityWeatherComponent },
    { path: '', redirectTo: '/weather', pathMatch: 'full' }
];

export const routes = RouterModule.forRoot(router);