import { Component } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { LayoutPrivateSidebarComponent } from "./sidebar/sidebar.component";
import { LayoutPrivateHeaderComponent } from "./header/header.component";

@Component ({
    selector: 'app-layout-private',
    templateUrl: './private.component.html',
    imports: [RouterOutlet, LayoutPrivateSidebarComponent, LayoutPrivateHeaderComponent]
})

export class LayoutPrivateComponent {
    
}