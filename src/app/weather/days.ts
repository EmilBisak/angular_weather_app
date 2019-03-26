export class Days {
    constructor(
        public date: string,
        public weather_name: string,
        public weather_img: string,
        public temp: number,
        public max_temp: number,
        public min_temp: number,
        public air_pressure: number,
        public humidity: number,
        public visibility: number,
        public wind_speed: number,
        public wind_direction: string,
    ) { }
}