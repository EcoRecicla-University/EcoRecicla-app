import { Component, OnDestroy, OnInit } from "@angular/core";
import { ActivatedRoute, Router, RouterLink } from "@angular/router";
import { DatePipe, NgIf } from "@angular/common";
import { MatMenuModule } from "@angular/material/menu";
import { MatIconModule } from "@angular/material/icon";
import { MatSnackBar } from "@angular/material/snack-bar";
import { MatButtonModule } from "@angular/material/button";
import { FuncionarioService } from "../../../../core/services/funcionarios/funcionario.service";
import { EditarFuncionarioModel } from "../../../../core/models/private/funcionarios/funcionarios/editarFuncionarioModel";
import { EditarMotoristaModel } from "../../../../core/models/private/funcionarios/motoristas/editarMotorista.model";
import { MotoristaService } from "../../../../core/services/funcionarios/motorista.service";

@Component({
    selector: 'app-pages-funcionarios-motoristas-detalhe',
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
export class PagesFuncionariosMotoristasDetalheComponent implements OnInit, OnDestroy {

    motoristaSelecionado: EditarMotoristaModel;

    idSelecionado = null

    constructor(
        private router: Router,
        private activeRoute: ActivatedRoute,
        private service: MotoristaService,
        private snackbar: MatSnackBar
    ) { }

    ngOnInit(): void {
        this.activeRoute.params
            .subscribe((params) => {
                const id = params['id'];
                this.idSelecionado = id;
                this.service.getMotorista(id)
                    .subscribe((motorista) => {
                        this.motoristaSelecionado = motorista;
                    })
            })
    }

    ngOnDestroy(): void {

    }

    deletarFuncionario() {
        // const podeExcluir = confirm('Tem certeza que deseja excluir este funcionário?')

        // if (podeExcluir) {
        //     this.service.deletarFuncionario(this.idSelecionado)
        //         .subscribe(() => {
        //             this.snackbar.open('Funcionário excluido com sucesso', 'Ok')
        //             this.router.navigate(['..'], {
        //                 relativeTo: this.activeRoute
        //             })
        //         })
        // }
    }
}
