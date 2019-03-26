import {Component, Input, Output, EventEmitter} from "@angular/core";
@Component({
    selector: 'city-list',
    template: `
        <div class="cities-holder">
            <p class="city-options">{{ city }}<p>          
        </div>
    `,
    inputs: ['city: cities'],
})
export class CityListComponent {
    @Input() city:string;
    constructor() {
    }

}