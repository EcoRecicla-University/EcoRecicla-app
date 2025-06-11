import { NgForOf, DatePipe } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatMenuModule } from "@angular/material/menu";
import { MatRadioModule } from "@angular/material/radio";
import { MatSelectModule } from "@angular/material/select";
import { RouterLink } from "@angular/router";
import { ListagemEstoqueModel } from "../../../../core/models/private/estoque/listagemEstoque.model";
import { EstoqueService } from "../../../../core/services/estoque.service";
import { TriagemService } from "../../../../core/services/triagem.service";
import { ListagemTriagemModel } from "../../../../core/models/private/triagem/listagemTriagem.model";

@Component ({
    selector: 'app-pages-estoque-estoque-listagem',
    templateUrl: './listagem.component.html',
    providers: [],
    imports: [
        MatFormFieldModule, 
        MatInputModule, 
        MatIconModule, 
        MatSelectModule, 
        MatCheckboxModule, 
        MatRadioModule, 
        NgForOf,
        MatButtonModule,
        MatMenuModule,
        RouterLink
    ]
})

export class PagesEstoqueEstoqueListagemComponent implements OnInit{

    DadosListaEstoque:  ListagemEstoqueModel[] = [];

    constructor(
        private service: EstoqueService,
        private triagemService: TriagemService
    ) { }

    ngOnInit(): void {
        this.triagemService.getCentrosTriagem()
        .subscribe((centros) => {
            this.DadosListaEstoque = centros
        })
    }
}