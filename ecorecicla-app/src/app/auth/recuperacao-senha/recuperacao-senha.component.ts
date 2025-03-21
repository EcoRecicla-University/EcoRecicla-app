import { Component } from "@angular/core";
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatInputModule } from "@angular/material/input";
import { RouterLink } from "@angular/router";

@Component ({
    selector: 'app-recuperacao-senha',
    templateUrl: 'recuperacao-senha.component.html',
    imports: [RouterLink, MatInputModule, FormsModule, ReactiveFormsModule, MatButtonModule]
})

export class RecuperacaoSenhaComponent {

    constructor(){}

    formularioRecuperacaoSenha = new FormGroup({
            email: new FormControl('', [Validators.required, Validators.email]),
        });
}