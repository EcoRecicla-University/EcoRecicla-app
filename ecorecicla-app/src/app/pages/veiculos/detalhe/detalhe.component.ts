import { Component, OnDestroy, OnInit } from "@angular/core";
import { ActivatedRoute, Router, RouterLink } from "@angular/router";
import { DatePipe, NgIf } from "@angular/common";
import { MatMenuModule } from "@angular/material/menu";
import { MatIconModule } from "@angular/material/icon";
import { MatSnackBar } from "@angular/material/snack-bar";
import { MatButtonModule } from "@angular/material/button";
import { EditarVeiculosModel } from "../../../core/models/private/veiculos/editarVeiculos.model";
import { VeiculosService } from "../../../core/services/veiculos.service";

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
export class PagesVeiculosDetalheComponent implements OnInit, OnDestroy {

    veiculoSelecionado: EditarVeiculosModel;

    idSelecionado = null

    constructor(
        private router: Router,
        private activeRoute: ActivatedRoute,
        private service: VeiculosService,
        private snackbar: MatSnackBar
    ) { }

    ngOnInit(): void {
        this.activeRoute.params
            .subscribe((params) => {
                const id = params['id'];
                this.idSelecionado = id;
                this.service.getVeiculo(id)
                    .subscribe((motorista) => {
                        this.veiculoSelecionado = motorista;
                    })
            })
    }

    ngOnDestroy(): void {

    }

    deletarFuncionario() {
        // const podeExcluir = confirm('Tem certeza que deseja excluir este motorista?')

        // if (podeExcluir) {
        //     this.service.deletarMotorista(this.idSelecionado)
        //         .subscribe(() => {
        //             this.snackbar.open('Motorista excluido com sucesso', 'Ok')
        //             this.router.navigate(['..'], {
        //                 relativeTo: this.activeRoute
        //             })
        //         })
        // }
    }
}
