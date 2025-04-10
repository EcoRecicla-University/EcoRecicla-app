import { Component, OnInit } from "@angular/core";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatRadioModule } from "@angular/material/radio";
import { MatSelectModule } from "@angular/material/select";
import { PrivateService } from "../../../core/services/private.service";
import { DadosClientesModel } from "../../../core/models/private/listaClientes.model";
import { NgForOf } from "@angular/common";

type listaClientes = {
    id: number;
    nome: string;
    dataCadastro: string;
    tipoCliente: string;
}

@Component ({
    selector: 'app-pages-cliente-listagem',
    templateUrl: './listagem.component.html',
    imports: [MatFormFieldModule, MatInputModule, MatIconModule, MatSelectModule, MatCheckboxModule, MatRadioModule, NgForOf]
})
export class PagesClientesListagemComponent implements OnInit{
    
    DadosListaClientes:DadosClientesModel[] = []

    constructor(private _service: PrivateService){ }

    ngOnInit(): void {
        this._service.getClientes()
        .subscribe((listaClientes) => {

            this.DadosListaClientes = listaClientes
        })
    }


}