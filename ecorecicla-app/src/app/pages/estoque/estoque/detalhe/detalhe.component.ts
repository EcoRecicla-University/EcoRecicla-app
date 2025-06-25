import { Component, OnDestroy, OnInit } from "@angular/core";
import { ActivatedRoute, RouterLink } from "@angular/router";
import { NgForOf, NgIf } from "@angular/common";
import { MatMenuModule } from "@angular/material/menu";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
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

    getCorBolinhaTotal(): string {
        const capacidade = Number(this.dadosCentro?.Capaci_Armaze);
        const total = this.totalQuantidade;

        if (!capacidade || capacidade === 0) {
            return 'bg-gray-400'; // fallback neutro
        }

        const percentual = (total / capacidade) * 100;

        if (percentual >= 95) return 'bg-red-500';     // Crítico
        if (percentual >= 90) return 'bg-yellow-400';  // Alerta
        if (percentual >= 20) return 'bg-green-500';   // Normal
        return 'bg-blue-400';                          // Quase vazio
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
                                this.dadosCentro = centro;
                            });
                    });
            });
    }

    ngOnDestroy(): void { }
}
