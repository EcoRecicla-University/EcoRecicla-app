import { Component } from "@angular/core";
import { MatIconModule } from "@angular/material/icon";
import { Router } from "@angular/router";
import { LoginService } from "../../../core/services/auth.service";
import { MatButtonModule } from "@angular/material/button";

@Component ({
    selector: 'app-layout-private-header',
    templateUrl: 'header.component.html',
    imports: [MatIconModule, MatButtonModule]
})
export class LayoutPrivateHeaderComponent {
    
    constructor(
        private authService: LoginService,
        private router: Router
    ) { }

    logout() {
        this.authService.logout();

        this.router.navigate(['/login']);
    }
}