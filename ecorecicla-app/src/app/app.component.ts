import { Component, OnInit } from '@angular/core';
import { provideRouter, Router, RouterOutlet } from '@angular/router';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    imports: [RouterOutlet],
    styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{

    title = 'ecorecicla-app';

    constructor() {}

    ngOnInit(): void {
        console.log('ola')
    }

}
