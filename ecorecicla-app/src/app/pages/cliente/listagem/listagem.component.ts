import { Component, OnInit, ViewChild } from "@angular/core";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatRadioModule } from "@angular/material/radio";
import { MatSelectModule } from "@angular/material/select";
import { ClientesService } from "../../../core/services/clientes.service";
import { DadosClientesModel } from "../../../core/models/private/listaClientes.model";
import { NgForOf, NgIf } from "@angular/common";
import { MatDrawer, MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { RouterLink, RouterOutlet } from "@angular/router";


type listaClientes = {
    id: number;
    nome: string;
    dataCadastro: string;
    tipoCliente: string;
}

@Component ({
    selector: 'app-pages-cliente-listagem',
    templateUrl: './listagem.component.html',
    imports: [
        MatFormFieldModule, 
        MatInputModule, 
        MatIconModule, 
        MatSelectModule, 
        MatCheckboxModule, 
        MatRadioModule, 
        NgForOf,
        NgIf,
        MatSidenavModule,
        MatButtonModule,
        MatMenuModule,
        RouterLink,
        RouterOutlet
    ]
})
export class PagesClientesListagemComponent implements OnInit{
    
    DadosListaClientes:DadosClientesModel[] = []

    clienteSelecionado?: DadosClientesModel;

    @ViewChild('drawer', {static: true}) drawer: MatDrawer

    constructor(private _service: ClientesService){ }

    ngOnInit(): void {
        this._service.getClientes()
        .subscribe((listaClientes) => {

            this.DadosListaClientes = listaClientes
        })
    }

    abrirDrawer(cliente: DadosClientesModel, drawer: any) {
        this.clienteSelecionado = cliente;
        drawer.open();
    }

}