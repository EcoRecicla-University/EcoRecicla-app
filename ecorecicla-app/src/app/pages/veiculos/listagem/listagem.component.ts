import { NgForOf } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { MatIconModule } from "@angular/material/icon";
import { Router, RouterLink } from "@angular/router";
import { VeiculosService } from "../../../core/services/veiculos.service";
import { ListaVeiculosModel } from "../../../core/models/private/veiculos/listaVeiculos.model";

@Component({
  selector: 'app-pages-veiculos-listagem',
  templateUrl: './listagem.component.html',
  imports: [
    NgForOf,
    MatIconModule,
    RouterLink
  ]
})
export class PagesVeiculosListagemComponent implements OnInit {

  DadosListaVeiculos: ListaVeiculosModel[] = [];

  constructor(
    private _service: VeiculosService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this._service.getVeiculos(false).subscribe((listaVeiculos) => {
      this.DadosListaVeiculos = listaVeiculos;
    });
  }

  abrirDetalhe(id: number): void {
    this.router.navigate(['/veiculos', id]);
  }
}
