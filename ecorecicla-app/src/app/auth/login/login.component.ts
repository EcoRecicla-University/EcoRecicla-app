import { Component, OnInit } from "@angular/core";
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
        email: new FormControl('eric@gmail.com', [Validators.required, Validators.email]),
        password: new FormControl('91008', [Validators.required])
    });

    loginSuccess:boolean = null

    loginErrorMessage:string = null;

    getLogin(): void{

        const payload: LoginPayload = {

            email: this.formularioLogin.get('email').value,
            password: this.formularioLogin.get('password').value
        }


    }

    
    onSubmit(){

        const login: LoginPayload = {
            
            email: this.formularioLogin.get('email')?.value,
            password: this.formularioLogin.get('password')?.value
        }

        this._loginService.getLogin(login)
        .subscribe((res) => {

            if(res.success == true){

                this.loginSuccess = res.success
                this._router.navigate(['/auth-redirect'])

                localStorage.setItem('tokenId', res.token)

            } else {

                this.loginSuccess = res.success
                this.loginErrorMessage = res.message

            }
        },
        (error) => {
            this.loginSuccess = error.error.success
            this.loginErrorMessage = error.error.message
        }
        )

        
    }

}