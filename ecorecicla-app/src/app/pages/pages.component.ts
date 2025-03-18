import { Component } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { SidebarComponent } from "./sidebar/sidebar.component";

@Component ({
    selector: 'app-pages',
    templateUrl: 'pages.component.html',
    imports: [RouterOutlet, SidebarComponent]
})

export class PagesComponent {
    
}