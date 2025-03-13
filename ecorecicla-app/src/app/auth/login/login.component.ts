import { Component } from "@angular/core";
import { RouterLink } from "@angular/router";
import {
    Validators,
    FormsModule,
    ReactiveFormsModule,
  } from '@angular/forms';

import {MatInputModule} from '@angular/material/input';

@Component ({
    selector: 'app-login',
    templateUrl: 'login.component.html',
    imports: [RouterLink, MatInputModule, FormsModule, ReactiveFormsModule]
})

export class LoginComponent {

    

}