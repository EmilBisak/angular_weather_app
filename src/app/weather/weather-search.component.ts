import { Component, OnInit } from "@angular/core";
import { WeatherService } from "./weather.service";
import { Subject } from "rxjs/Subject";
import { WeatherDay } from "./weather-day";
import { Days } from "./days";
import { Router } from "@angular/router";


@Component({
    selector: 'weather-search',
    template: `
    <section class="weather-search" >
    <form #f="ngForm" (ngSubmit)="onSubmit()">
        <label for="city">City</label>
        <input 
        ngControl="location" 
        type="text" 
        id="city" 
        (input)="onSearchLocation(input.value)" 
        #input 
        required 
        placeholder="Enter city name" 
        autocomplete="off">
        <button type="submit" routerLink="city" (click)="onSubmit($event)">Search</button>
        <city-list *ngFor="let city of this.cities" [city]="city" (click)="getValue(input,$event.target.innerHTML)"></city-list>
    </form>
</section>
    `,
    providers: [WeatherService]
})
export class WeatherSearchComponent implements OnInit {
    private searchStream = new Subject<string>();
    data: any = {};
    cities: any = [];
    sentData: any;
    clickedCity: any;

    constructor(private _weatherService: WeatherService, private router: Router) {
    }



    onSearchLocation(value: string) {
        this.searchStream
            .next(value);
    }
    getValue(input: any, event: Event) {
        this.clickedCity = event;
        input.value = this.clickedCity;
        this.data = this.clickedCity;
        this.onSubmit();
        this.router.navigate(["weather/city"])
    }

    removeDuplicates(value: any) {
        return value.filter((v: any, i: number) => value.indexOf(v) === i)
    }

    onSubmit() {
        this._weatherService.searchWeatherInfo(this.data)
            .then(res => this.data = res)
            .then(() => this._weatherService.searchWeatherByCityNum(this.data[0].woeid))
            .then((res: any) => {
                let days: any;
                let sharedData: any;

                days = [...res.consolidated_weather.map((item: any, i: number) => new Days(
                    item.applicable_date,
                    item.weather_state_name,
                    item.weather_state_abbr,
                    parseInt(item.the_temp.toFixed(0)),
                    parseInt(item.max_temp.toFixed(0)),
                    parseInt(item.min_temp.toFixed(0)),
                    parseInt(item.air_pressure.toFixed(0)),
                    parseInt(item.humidity.toFixed(0)),
                    parseInt(item.visibility.toFixed(0)),
                    parseInt(item.wind_speed.toFixed(0)),
                    item.wind_direction_compass,
                ))
                ]


                sharedData = this._weatherService.addWeatherItem(new WeatherDay(res.title, days));

                return sharedData;
            })
            .then(() => this._weatherService.changeData(this._weatherService.getWeatherItems()))

    }

    ngOnInit(): any {
        this.searchStream
            .debounceTime(100)
            .distinctUntilChanged()
            .switchMap((term: string) => term ? this._weatherService.searchWeatherInfo(term) : this.searchStream)
            .subscribe(
                (city: any) => {
                    if(typeof city === "object") {
                    this.cities = city.map((item: any) => item.title)
                    this.data = this.cities
                    return this.data
                    }
                }
            );
    }
}



