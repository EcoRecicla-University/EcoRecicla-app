import { Component } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import {MatIconModule} from '@angular/material/icon';
import { RouterLink } from "@angular/router";

@Component ({
    selector: 'app-home',
    templateUrl: 'home.component.html',
    imports: [
        MatIconModule,
        RouterLink,
        MatButtonModule
    ]
})
export class HomeComponent {
    constructor(){}

    usuario: string = 'Eric'
}