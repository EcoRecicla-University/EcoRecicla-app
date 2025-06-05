import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { CadastroVeiculosModel } from "../models/private/veiculos/cadastroVeiculos.model";
import { ListaVeiculosModel } from "../models/private/veiculos/listaVeiculos.model";
import { DetalheVeiculoModel } from "../models/private/veiculos/detalheVeiculo.model";
import { EditarVeiculoModel } from "../models/private/veiculos/editarVeiculo.model";

@Injectable({
  providedIn: 'root'
})
export class VeiculosService {

  private apiUrl = 'http://localhost:8080/api/veiculos';

  constructor(private http: HttpClient) { }

  getVeiculos(somentedisponiveis: boolean): Observable<ListaVeiculosModel[]> {
    const params = new HttpParams().set('somenteDisponiveis', somentedisponiveis);
    return this.http.get<ListaVeiculosModel[]>(this.apiUrl, { params });
  }

  criarNovoVeiculo(dados: CadastroVeiculosModel): Observable<CadastroVeiculosModel> {
    return this.http.post<CadastroVeiculosModel>(this.apiUrl, dados);
  }

  getVeiculo(id: number): Observable<DetalheVeiculoModel> {
    return this.http.get<DetalheVeiculoModel>(`${this.apiUrl}/${id}`);
  }

  editarVeiculo(id: number, dados: EditarVeiculoModel): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, dados);
  }

  inativarVeiculo(id: number): Observable<any> {
    return this.http.patch(`${this.apiUrl}/${id}/inativar`, null);
  }
}
