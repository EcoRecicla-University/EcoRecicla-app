import { NgForOf } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { MatIconModule } from "@angular/material/icon";
import { RouterLink } from "@angular/router";
import { VeiculosService } from "../../../core/services/veiculos.service";
import { ListaVeiculosModel } from "../../../core/models/private/veiculos/listaVeiculos.model";
import { MatButtonModule } from "@angular/material/button";

@Component ({
    selector: 'app-pages-veiculos-listagem',
    templateUrl: './listagem.component.html',
    imports: [
        NgForOf,
        MatIconModule,
        MatButtonModule,
        RouterLink,
    ]
})
export class PagesVeiculosListagemComponent implements OnInit{

    DadosListaVeiculos:ListaVeiculosModel[] = []

    constructor(private _service: VeiculosService) {}

    ngOnInit(): void {
        this._service.getVeiculos(false)
        .subscribe((listaVeiculos) => {

            this.DadosListaVeiculos = listaVeiculos
        })
    }
}