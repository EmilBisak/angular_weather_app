import 'rxjs/Rx';
import { Injectable } from '@angular/core'
import { Http } from "@angular/http";
import { WeatherDay } from './weather-day';
import { WEATHER_DAYS } from './mock-weather';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';








@Injectable()
export class WeatherService {
    private messageSource = new BehaviorSubject([
        {
            title: "Loading...",
            days: [
                {
                    air_pressure: "n/a",
                    date: "n/a",
                    humidity: "n/a",
                    max_temp: "n/a",
                    min_temp: "n/a",
                    temp: "n/a",
                    visibility: "n/a",
                    weather_img: "loading",
                    weather_name: "n/a",
                    wind_direction: "n/a",
                    wind_speed: "n/a"
                },
                {
                    air_pressure: "n/a",
                    date: "n/a",
                    humidity: "n/a",
                    max_temp: "n/a",
                    min_temp: "n/a",
                    temp: "n/a",
                    visibility: "n/a",
                    weather_img: "loading",
                    weather_name: "n/a",
                    wind_direction: "n/a",
                    wind_speed: "n/a"
                },
                {
                    air_pressure: "n/a",
                    date: "n/a",
                    humidity: "n/a",
                    max_temp: "n/a",
                    min_temp: "n/a",
                    temp: "n/a",
                    visibility: "n/a",
                    weather_img: "loading",
                    weather_name: "n/a",
                    wind_direction: "n/a",
                    wind_speed: "n/a"
                },
            ]
        }]
    );
    currentMessage = this.messageSource.asObservable();

    constructor(private _http: Http) {
    }


    getWeatherItems() {
        return WEATHER_DAYS;
    }

    addWeatherItem(day: WeatherDay) {
        WEATHER_DAYS.splice(0);
        WEATHER_DAYS.push(day);
    }

    changeData(sentData: any) {
        this.messageSource.next(sentData)
    }

    searchWeatherInfo(city: string) {
        let promise = new Promise((resolve, reject) => {
            this._http
                .get('https://cors-anywhere.herokuapp.com/https://www.metaweather.com/api/location/search/?query=' + city)
                .toPromise()
                .then(res => res.json())
                .then(
                    res => {
                        resolve(res);
                    },
                    err => {
                        reject(err);
                    }
                );
        });
        return promise;
    }
    searchWeatherByCityNum(cityNum: number) {
        let promise = new Promise((resolve, reject) => {
            this._http
                .get(`https://cors-anywhere.herokuapp.com/https://www.metaweather.com/api/location/${cityNum}/`)
                .toPromise()
                .then(res => res.json())
                .then(
                    res => {
                        resolve(res);
                    },
                    err => {
                        reject(err);
                    }
                );
        });
        return promise;
    }
}