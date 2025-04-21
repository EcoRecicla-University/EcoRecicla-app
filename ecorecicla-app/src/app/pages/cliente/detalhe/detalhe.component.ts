import { Component, OnDestroy, OnInit } from "@angular/core";
import { ActivatedRoute, RouterLink } from "@angular/router";
import { ClientesService } from "../../../core/services/clientes.service";
import { PagesClientesListagemComponent } from "../listagem/listagem.component";
import { NgIf } from "@angular/common";
import { MatMenuModule } from "@angular/material/menu";
import { MatIconModule } from "@angular/material/icon";

@Component ({
    selector: 'app-pages-cliente-detalhe',
    templateUrl: './detalhe.component.html',
    imports: [
        RouterLink,
        NgIf,
        MatMenuModule,
        MatIconModule
    ]
})
export class PagesClienteDetalheComponent implements OnInit, OnDestroy{

    clienteSelecionado

    constructor(
        private activeRoute: ActivatedRoute,
        private service: ClientesService,
    ){}

    ngOnInit(): void {
        this.activeRoute.params
        .subscribe((params) => {
            console.log(params)
            const id = params['id'];
            this.service.getCliente(id)
            .subscribe((cliente) => {
                console.log(cliente)
                this.clienteSelecionado = cliente;
            })
        })

        console.log('ta aqui')
    }

    ngOnDestroy(): void {
        
    }
}