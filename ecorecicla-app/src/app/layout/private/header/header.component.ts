import { Component } from "@angular/core";
import { MatIconModule } from "@angular/material/icon";
import { RouterLink } from "@angular/router";

@Component ({
    selector: 'app-layout-private-header',
    templateUrl: 'header.component.html',
    imports: [RouterLink, MatIconModule]
})
export class LayoutPrivateHeaderComponent {
    
}