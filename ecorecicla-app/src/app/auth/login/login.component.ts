import { Component } from "@angular/core";
import { RouterLink } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';

@Component ({
    selector: 'app-login',
    templateUrl: 'login.component.html',
    imports: [RouterLink, MatInputModule, FormsModule, ReactiveFormsModule, MatButtonModule]
})

export class LoginComponent {

    constructor() { }

    login() {
        console.log("logou!")
    }
}