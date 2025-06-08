import { Component, OnDestroy, OnInit } from "@angular/core";
import { ActivatedRoute, Router, RouterLink } from "@angular/router";
import { DatePipe, NgIf } from "@angular/common";
import { MatMenuModule } from "@angular/material/menu";
import { MatIconModule } from "@angular/material/icon";
import { MatSnackBar } from "@angular/material/snack-bar";
import { MatButtonModule } from "@angular/material/button";
import { EditarVeiculosModel } from "../../../core/models/private/veiculos/editarVeiculos.model";
import { VeiculosService } from "../../../core/services/veiculos.service";
import { EditarTriagemModel } from "../../../core/models/private/triagem/editarTriagem.model";
import { TriagemService } from "../../../core/services/triagem.service";

@Component({
    selector: 'app-pages-funcionarios-motoristas-detalhe',
    templateUrl: './detalhe.component.html',
    imports: [
        RouterLink,
        NgIf,
        MatMenuModule,
        MatIconModule,
        MatButtonModule
    ]
})
export class PagesTriagemDetalheComponent implements OnInit, OnDestroy {

    triagemSelecionada: EditarTriagemModel;

    idSelecionado = null

    constructor(
        private router: Router,
        private activeRoute: ActivatedRoute,
        private service: TriagemService,
        private snackbar: MatSnackBar
    ) { }

    ngOnInit(): void {
        this.activeRoute.params
            .subscribe((params) => {
                const id = params['id'];
                this.idSelecionado = id;
                this.service.getCentroTriagem(id)
                    .subscribe((triagem) => {
                        this.triagemSelecionada = triagem;
                    })
            })
    }

    ngOnDestroy(): void {

    }

    deletarFuncionario() {
        // const podeExcluir = confirm('Tem certeza que deseja excluir este veiculo?')

        // if (podeExcluir) {
        //     this.service.deletarVeiculo(this.idSelecionado)
        //     .subscribe(() => {
        //         this.snackbar.open('Veiculo excluido com sucesso', 'Ok')
        //         this.router.navigate(['..'], {
        //             relativeTo: this.activeRoute
        //         })
        //     },
        //     (error) => {
        //     this.snackbar.open(error.error.error, 'Ok')
        //     })
        // }
    }
}
