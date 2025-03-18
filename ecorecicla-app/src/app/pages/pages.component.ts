import { Component } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { SidebarComponent } from "../layout/sidebar/sidebar.component";
import { HeadLogadoComponent } from "../layout/head-logado/head-logado.component";

@Component ({
    selector: 'app-pages',
    templateUrl: 'pages.component.html',
    imports: [RouterOutlet, SidebarComponent, HeadLogadoComponent]
})

export class PagesComponent {
    
}