import { Component } from "@angular/core";
import {MatIconModule} from '@angular/material/icon';

@Component ({
    selector: 'app-home',
    templateUrl: 'home.component.html',
    imports: [MatIconModule]
})
export class HomeComponent {
    constructor(){}

    usuario: string = 'Eric'
}