import { Component } from "@angular/core";
import { Router, RouterLink } from "@angular/router";
import { MatInputModule } from '@angular/material/input';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

import { LoginService } from "../../core/services/auth.service";
import { LoginPayload } from "../../core/models/auth/login.model";

@Component ({
    selector: 'app-login',
    templateUrl: './login.component.html',
    imports: [
        RouterLink, 
        MatInputModule, 
        FormsModule, 
        ReactiveFormsModule
    ]
})
export class LoginComponent {

    constructor(
        private _loginService: LoginService,
        private _router: Router
    ) { }

    formularioLogin = new FormGroup({
        email: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('', [Validators.required])
    });

    loginSuccess:boolean = null

    loginErrorMessage:string = null;

    getLogin(): void{

        const payload: LoginPayload = {

            email: this.formularioLogin.get('email').value,
            password: this.formularioLogin.get('password').value
        }

        this._loginService.getLogin(payload)
        .subscribe((response) => {
            if(response.success == true){

                this.loginSuccess = response.success
                this._router.navigate(['/auth-redirect'])

            } else {

                this.loginSuccess = response.success
                this.loginErrorMessage = response.message

            }
        })
    }

}