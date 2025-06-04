import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { DadosMovimenModel } from "../models/private/Movimen/listaMovimen.model";
import { CadastroMovimenModel } from "../models/private/Movimen/cadastroMovimen.model";
import { EditarMovimenModel } from "../models/private/Movimen/editarMovimen.model";

@Injectable({
  providedIn: 'root'
})
export class MovimenService {

  private apiUrl = 'http://localhost:8080/api/movimen';

  constructor(private http: HttpClient) { }

  getMovimentacoes(): Observable<DadosMovimenModel[]> {
    return this.http.get<DadosMovimenModel[]>(this.apiUrl);
  }

  getMovimenById(id: number): Observable<DadosMovimenModel> {
    return this.http.get<DadosMovimenModel>(`${this.apiUrl}/${id}`);
  }

  criarNovaMovimen(dados: CadastroMovimenModel): Observable<CadastroMovimenModel> {
    return this.http.post<CadastroMovimenModel>(this.apiUrl, dados);
  }

  getColetas(): Observable<any[]> {
    return this.http.get<any[]>('http://localhost:8080/api/coletas');
  }

  editarMovimen(id: string, dados: EditarMovimenModel): Observable<EditarMovimenModel> {
    return this.http.put<EditarMovimenModel>(`${this.apiUrl}/${id}`, dados);
  }

  inativarMovimen(id: string) {
  return this.http.put(`${this.apiUrl}/inativar/${id}`, {});
  }
}
