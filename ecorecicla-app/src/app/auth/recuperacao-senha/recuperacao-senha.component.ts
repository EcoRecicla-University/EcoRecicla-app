import { Component } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatInputModule } from "@angular/material/input";
import { RouterLink } from "@angular/router";

@Component ({
    selector: 'app-recuperacao-senha',
    templateUrl: 'recuperacao-senha.component.html',
    imports: [RouterLink, MatInputModule, FormsModule, ReactiveFormsModule, MatButtonModule]
})

export class RecuperacaoSenhaComponent {

}