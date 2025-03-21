import { Component } from "@angular/core";
import { RouterLink } from "@angular/router";
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import { MatIcon } from "@angular/material/icon";
import {MatTooltipModule} from '@angular/material/tooltip';

@Component ({
    selector: 'app-login',
    templateUrl: 'login.component.html',
    imports: [
        RouterLink, 
        MatInputModule, 
        FormsModule, 
        ReactiveFormsModule, 
        MatButtonModule,  
    ]
})

export class LoginComponent {

    constructor() { }

    formularioLogin = new FormGroup({
        email: new FormControl('', [Validators.required, Validators.email]),
        senha: new FormControl('', [Validators.required])
    });
}