import { Component, OnDestroy, OnInit } from "@angular/core";
import { ActivatedRoute, RouterLink } from "@angular/router";
import { ClientesService } from "../../../core/services/clientes.service";
import { PagesClientesListagemComponent } from "../listagem/listagem.component";

@Component ({
    selector: 'app-pages-cliente-detalhe',
    templateUrl: './detalhe.component.html',
    imports: [
        RouterLink
    ]
})
export class PagesClienteDetalheComponent implements OnInit, OnDestroy{

    constructor(
        private activeRoute: ActivatedRoute,
        private service: ClientesService,
        private listaComponent: PagesClientesListagemComponent
    ){}

    ngOnInit(): void {
        this.activeRoute.params
        .subscribe((params) => {
            this.service.getCliente(params['id'])
            .subscribe((cliente) => {
                console.log(cliente)
            })
        })
        this.listaComponent.drawer.open()
    }

    ngOnDestroy(): void {
        this.listaComponent.drawer.close()
    }

    fechar(){
        
    }
}