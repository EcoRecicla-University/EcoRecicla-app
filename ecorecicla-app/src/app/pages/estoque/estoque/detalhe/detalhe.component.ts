import { Component, OnDestroy, OnInit } from "@angular/core";
import { ActivatedRoute, Router, RouterLink } from "@angular/router";
import { DatePipe, NgForOf, NgIf } from "@angular/common";
import { MatMenuModule } from "@angular/material/menu";
import { MatIconModule } from "@angular/material/icon";
import { MatSnackBar } from "@angular/material/snack-bar";
import { MatButtonModule } from "@angular/material/button";
import { FuncionarioService } from "../../../../core/services/funcionarios/funcionario.service";
import { EditarFuncionarioModel } from "../../../../core/models/private/funcionarios/funcionarios/editarFuncionarioModel";
import { EditarMotoristaModel } from "../../../../core/models/private/funcionarios/motoristas/editarMotorista.model";
import { MotoristaService } from "../../../../core/services/funcionarios/motorista.service";
import { MovimenService } from "../../../../core/services/movimen.service";
import { AvisosEnum, AvisosEnumLabel, EditarMovimenModel } from "../../../../core/models/private/Movimen/editarMovimen.model";
import { CategoriaEnum } from "../../../../core/models/private/Movimen/cadastroMovimen.model";
import { DestalheEstoqueModel } from "../../../../core/models/private/estoque/detalheEstoque.model";
import { EstoqueService } from "../../../../core/services/estoque.service";
import { TriagemService } from "../../../../core/services/triagem.service";
import { ListagemTriagemModel } from "../../../../core/models/private/triagem/listagemTriagem.model";

@Component({
    selector: 'app-pages-estoque-estoque-detalhe',
    templateUrl: './detalhe.component.html',
    imports: [
        RouterLink,
        NgIf,
        MatMenuModule,
        MatIconModule,
        MatButtonModule,
        NgForOf,
    ]
})
export class PagesEstoqueEstoqueDetalheComponent implements OnInit, OnDestroy {

    DadosEstoqueSelecionado: DestalheEstoqueModel[] = [];

    idSelecionado = null;

    CategoriaEnum = CategoriaEnum;

    dadosCentro: ListagemTriagemModel;

    constructor(
        private activeRoute: ActivatedRoute,
        private service: EstoqueService,
        private centroService: TriagemService
    ) { }

    get totalQuantidade(): number {
        return this.DadosEstoqueSelecionado.reduce((total, item) => {
            const quantidade = Number(item.Quantidade) || 0;
            return total + quantidade;
        }, 0);
    }

    ngOnInit(): void {
        this.activeRoute.params
            .subscribe((params) => {
                const id = params['id'];
                this.idSelecionado = id;
                this.service.getEstoqueById(id)
                    .subscribe((dadosEstoque) => {
                        this.DadosEstoqueSelecionado = dadosEstoque;

                        this.centroService.getCentroTriagem(id)
                        .subscribe((centro) => {
                            this.dadosCentro = centro
                        })
                    })
            })
    }

    ngOnDestroy(): void {

    }

    

}
