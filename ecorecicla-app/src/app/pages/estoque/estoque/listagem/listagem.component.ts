import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { EstoqueService } from '../../../../core/services/estoque.service';
import { ListagemEstoqueModel } from '../../../../core/models/private/estoque/listaEstoque.model';

@Component({
  selector: 'app-estoque-lista',
  templateUrl: './listagem.component.html',
  standalone: true,
  imports: [CommonModule, MatTableModule]
})
export class PagesEstoqueListagemComponent implements OnInit {

  //displayedColumns: string[] = ['Categoria', 'Qtd_Total', 'Ult_Data_Entrada'];

  DadosListaEstoque: ListagemEstoqueModel[] = [];

  constructor (
    private service: EstoqueService
  ){

  }
  ngOnInit(): void {
        this.service.getEstoque()
        .subscribe((listaEstoque) => {
            this.DadosListaEstoque = listaEstoque
        });
    }
  }

