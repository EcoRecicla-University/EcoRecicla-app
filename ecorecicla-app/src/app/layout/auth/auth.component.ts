import { Component } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { LayoutAuthHeaderComponent } from "./header/header.component";

@Component ({
    selector: 'app-layout-auth',
    templateUrl: 'auth.component.html',
    imports: [RouterOutlet, LayoutAuthHeaderComponent]
})

export class LayoutAuthComponent {

}