import { Component } from "@angular/core";
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatInputModule } from "@angular/material/input";
import { Router, RouterLink } from "@angular/router";
import { RecuperacaoSenhaPayload } from "../../core/models/auth/recuperacao-senha.model";
import { LoginService } from "../../core/services/auth.service";

@Component ({
    selector: 'app-recuperacao-senha',
    templateUrl: 'recuperacao-senha.component.html',
    imports: [RouterLink, MatInputModule, FormsModule, ReactiveFormsModule, MatButtonModule]
})

export class RecuperacaoSenhaComponent {

    constructor(
        private _loginService: LoginService,
        private _router: Router
    ){}

    EmailRecSuccess:boolean = null

    EmailRecMessage:string = null;

    formularioRecuperacaoSenha = new FormGroup({
        email: new FormControl('', [Validators.required, Validators.email]),
    });


    onRecuperar(){

        const emailRecuperacaoSenha: RecuperacaoSenhaPayload = {
            email: this.formularioRecuperacaoSenha.get('email').value
        }

        this._loginService.getRecuperacaoSenha(emailRecuperacaoSenha)
        .subscribe((res) => {

            if(res.success == true){

                this.EmailRecSuccess = res.success
                this.EmailRecMessage = res.message

            } else {

                this.EmailRecSuccess = res.success
                this.EmailRecMessage = res.message

            }
        },
        (error) => {
            this.EmailRecSuccess = error.error.success
            this.EmailRecMessage = error.error.message
        }
        )
    }
}