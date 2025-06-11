import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { DestalheEstoqueModel } from "../models/private/estoque/detalheEstoque.model";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class EstoqueService {

    private apiUrl = 'http://localhost:8080/api/estoque';

    constructor(private http: HttpClient) { }

    getEstoqueById(id: string): Observable<DestalheEstoqueModel[]>{
        const apiUrl = `${this.apiUrl}/${id}`;
        return this.http.get<DestalheEstoqueModel[]>(apiUrl, {})
    }

    // getMovimentacoes(): Observable<ListagemMovimenModel[]>{
    //     return this.http.get<ListagemMovimenModel[]>(this.apiUrl, {})
    // }

    // criarNovaMovimen(dados: CadastroMovimenModel): Observable<CadastroMovimenModel> {
    //     const apiUrl = `${this.apiUrl}`;
    //     return this.http.post<CadastroMovimenModel>(apiUrl, dados);
    // }

    // editarMovimen(id: string, dados: EditarMovimenModel): Observable<EditarMovimenModel> {
    //     const apiUrl = `${this.apiUrl}/${id}`;
    //     return this.http.put<EditarMovimenModel>(apiUrl, dados)
    // }

    // excluirMovimen(id: string):Observable<void>{
    //     const apiUrl = `${this.apiUrl}/${id}`;
    //     return this.http.delete<void>(apiUrl, {})
    // }

}