import { Component } from "@angular/core";

@Component ({
    selector: 'app-home',
    templateUrl: 'home.component.html',
    imports: []
})
export class HomeComponent {
    constructor(){}

    usuario: string = 'Eric'
}