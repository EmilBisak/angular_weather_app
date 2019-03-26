import { Component, DoCheck, OnInit } from '@angular/core';

import { WeatherDay } from "./weather-day";
import { WeatherService } from './weather.service';


@Component({
    selector: 'my-app',
    template: `
        <header>
            <h1>{{this.sentData[0].title}}</h1>
                
            <div class="weather-days-wrapper">

                <div class="days">
                <img src="../assets/images/{{this.sentData[0].days[0].weather_img + this.imgType}}" alt="weather" />
                <h2>{{this.sentData[0].days[0].weather_name}}</h2>
                <p>Date: {{this.sentData[0].days[0].date}}</p>
                <p>Humidity:{{this.sentData[0].days[0].humidity}}</p>
                <p>Temp: {{this.sentData[0].days[0].temp}} °C</p> 
                <p>Max temp: {{this.sentData[0].days[0].max_temp}} °C</p>
                <p>Min temp: {{this.sentData[0].days[0].min_temp}} °C</p> 
                <p>Visibility: {{this.sentData[0].days[0].visibility}}</p>
                <p>Wind Direction: {{this.sentData[0].days[0].wind_direction}}</p>
                <p>Wind Speed: {{this.sentData[0].days[0].wind_speed}} </p>
                <p>Air Pressure: {{this.sentData[0].days[0].air_pressure}}</p>
                </div>
                <div class="days">
                <img src="../assets/images/{{this.sentData[0].days[1].weather_img + this.imgType}}" alt="weather" />
                <h2>{{this.sentData[0].days[1].weather_name}}</h2>
                <p>Date: {{this.sentData[0].days[1].date}}</p>
                <p>Humidity:{{this.sentData[0].days[1].humidity}}</p>
                <p>Temp: {{this.sentData[0].days[1].temp}} °C</p> 
                <p>Max temp: {{this.sentData[0].days[1].max_temp}} °C</p>
                <p>Min temp: {{this.sentData[0].days[1].min_temp}} °C</p> 
                <p>Visibility: {{this.sentData[0].days[1].visibility}}</p>
                <p>Wind Direction: {{this.sentData[0].days[1].wind_direction}}</p>
                <p>Wind Speed: {{this.sentData[0].days[1].wind_speed}} </p>
                <p>Air Pressure: {{this.sentData[0].days[1].air_pressure}}</p>
                </div>
                <div class="days">
                <img src="../assets/images/{{this.sentData[0].days[2].weather_img + this.imgType}}" alt="weather" />
                    <h2>{{this.sentData[0].days[2].weather_name}}</h2>
                    <p>Date: {{this.sentData[0].days[2].date}}</p>
                    <p>Humidity:{{this.sentData[0].days[2].humidity}}</p>
                    <p>Temp: {{this.sentData[0].days[2].temp}} °C</p> 
                    <p>Max temp: {{this.sentData[0].days[2].max_temp}} °C</p>
                    <p>Min temp: {{this.sentData[0].days[2].min_temp}} °C</p> 
                    <p>Visibility: {{this.sentData[0].days[2].visibility}}</p>
                    <p>Wind Direction: {{this.sentData[0].days[2].wind_direction}}</p>
                    <p>Wind Speed: {{this.sentData[0].days[2].wind_speed}} </p>
                    <p>Air Pressure: {{this.sentData[0].days[2].air_pressure}}</p>
                </div>
            
            </div>

            <div class="btn-holder">
                <a routerLink="" class="back-btn">Back</a>
            </div>
            </header>
            `
})
export class CityWeatherComponent implements DoCheck, OnInit {
    sentData: any;
    imgType: string = ".gif";
    weatherDays: WeatherDay[];
    constructor(private _weatherService: WeatherService) {
    }

    ngOnInit() {
        this._weatherService.currentMessage.subscribe((sentData: any) => this.sentData = sentData);
        this.weatherDays = this._weatherService.getWeatherItems();
    }

    ngDoCheck() {
        if (this.sentData !== this.weatherDays && this.weatherDays.length !== 0) {
            this._weatherService.currentMessage.subscribe((sentData: any) => this.sentData = sentData);
            this.weatherDays = this._weatherService.getWeatherItems();
            this.sentData = this.weatherDays;
            this.imgType = ".png"
        }
    }
}