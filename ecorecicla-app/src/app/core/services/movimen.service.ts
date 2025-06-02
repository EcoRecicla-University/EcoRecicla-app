import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { DadosMovimenModel } from "../models/private/Movimen/listaMovimen.model";
import { CadastroMovimenModel } from "../models/private/Movimen/cadastroMovimen.model";
import { EditarMovimenModel } from "../models/private/Movimen/editarMovimen.model";
import { ChaveColetaModel } from "../models/private/Movimen/BuscaChaves/chaveColeta.model";

@Injectable({
  providedIn: 'root'
})
export class MovimenService {

  private apiUrl = 'http://localhost:8080/api/movimen';

  constructor(private http: HttpClient) { }

  getMovimentacoes(): Observable<DadosMovimenModel[]> {
    return this.http.get<DadosMovimenModel[]>(this.apiUrl);
  }

  criarNovaMovimen(dados: CadastroMovimenModel): Observable<CadastroMovimenModel> {
    return this.http.post<CadastroMovimenModel>(this.apiUrl, dados);
  }

  getChaveColeta(): Observable<ChaveColetaModel[]> {
    return this.http.get<ChaveColetaModel[]>(`${this.apiUrl}/chaves-coleta`);
  }

  editarMovimen(id: string, dados: EditarMovimenModel): Observable<EditarMovimenModel> {
    return this.http.put<EditarMovimenModel>(`${this.apiUrl}/${id}`, dados);
  }

  excluirMovimen(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
