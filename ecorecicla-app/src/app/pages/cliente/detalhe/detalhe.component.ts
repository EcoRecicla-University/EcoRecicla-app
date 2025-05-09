import { Component, OnDestroy, OnInit } from "@angular/core";
import { ActivatedRoute, Router, RouterLink } from "@angular/router";
import { ClientesService } from "../../../core/services/clientes.service";
import { PagesClientesListagemComponent } from "../listagem/listagem.component";
import { DatePipe, NgIf } from "@angular/common";
import { MatMenuModule } from "@angular/material/menu";
import { MatIconModule } from "@angular/material/icon";
import { MatSnackBar } from "@angular/material/snack-bar";
import { DadosClientesModel, TipoClienteEnum } from "../../../core/models/private/Clientes/listaClientes.model";
import { MatButtonModule } from "@angular/material/button";

@Component ({
    selector: 'app-pages-cliente-detalhe',
    templateUrl: './detalhe.component.html',
    imports: [
        RouterLink,
        NgIf,
        MatMenuModule,
        MatIconModule,
        MatButtonModule,
        DatePipe
    ]
})
export class PagesClienteDetalheComponent implements OnInit, OnDestroy{

    clienteSelecionado: DadosClientesModel

    TipoClienteEnum = TipoClienteEnum

    idSelecionado = null

    constructor(
        private router: Router,
        private activeRoute: ActivatedRoute,
        private service: ClientesService,
        private snackbar: MatSnackBar
    ){}

    ngOnInit(): void {
        this.activeRoute.params
        .subscribe((params) => {
            const id = params['id'];
            this.idSelecionado = id;
            this.service.getCliente(id)
            .subscribe((cliente) => {
                this.clienteSelecionado = cliente;
            })
        })
    }

    ngOnDestroy(): void {

    }

    deletarCliente() {
      const podeExcluir = confirm('Tem certeza que deseja excluir este cliente?')

      if (podeExcluir) {
        this.service.deletarCliente(this.idSelecionado)
        .subscribe(() => {
            this.snackbar.open('Cliente excluido com sucesso', 'Ok')
            this.router.navigate(['..'], {
                relativeTo: this.activeRoute
            })
        })
      }
    }
}
