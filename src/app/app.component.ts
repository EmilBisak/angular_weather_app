import { Component } from '@angular/core';

@Component({
    selector: 'my-app',
    template: `
    <div class="container">
    <header>
    <h1>Angular 2 Weather App</h1>
        </header>
        <router-outlet></router-outlet>
    </div>
    `
})
export class AppComponent {

}
