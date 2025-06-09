import { NgForOf } from "@angular/common";
import { Component } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatMenuModule } from "@angular/material/menu";
import { MatRadioModule } from "@angular/material/radio";
import { MatSelectModule } from "@angular/material/select";
import { RouterLink } from "@angular/router";
import { ListagemFuncionarioModel } from "../../../../core/models/private/funcionarios/funcionarios/listaFuncionario.molde";
import { FuncionarioService } from "../../../../core/services/funcionarios/funcionario.service";

@Component ({
    selector: 'app-pages-funcionarios-funcionarios-listagem',
    templateUrl: './listagem.component.html',
    providers: [],
    imports: [
        MatFormFieldModule, 
        MatInputModule, 
        MatIconModule, 
        MatSelectModule, 
        MatCheckboxModule, 
        MatRadioModule, 
        NgForOf,
        MatButtonModule,
        MatMenuModule,
        RouterLink
    ]
})
export class PagesFuncionariosFuncionariosListagemComponent {
    
    DadosListaFuncionarios: ListagemFuncionarioModel[] = [];
    
    constructor(private _service: FuncionarioService){ }

    ngOnInit(): void {
        this._service.getFuncionarios()
        .subscribe((listaFuncionarios) => {
            this.DadosListaFuncionarios = listaFuncionarios
        })
    }

}