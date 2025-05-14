import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
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

    // getMovimenById(id: string): Observable<DadosMovimenModel>{
    // const apiUrl = `${this.apiUrl}/${id}`;
    // return this.http.get<DadosMovimenModel>(apiUrl, {})
    // }

    getMovimentacoes(): Observable<DadosMovimenModel[]>{
        return this.http.get<DadosMovimenModel[]>(this.apiUrl, {})
    }

    // criarNovaMovimen(dados: CadastroMovimenModel): Observable<CadastroMovimenModel> {
    //     const apiUrl = `${this.apiUrl}`;
    //     return this.http.post<CadastroMovimenModel>(apiUrl, dados);
    // }

//     editarMovimen(id: string, dados: EditarMovimenModel): Observable<EditarMovimenModel> {
//         const apiUrl = `${this.apiUrl}/${id}`;
//         return this.http.put<EditarMovimenModel>(apiUrl, dados)
//     }

//     excluirMovimen(id: string):Observable<void>{
//         const apiUrl = `${this.apiUrl}/${id}`;
//         return this.http.delete<void>(apiUrl, {})
//     }

       getChaveColeta():Observable<ChaveColetaModel[]>{
            return this.http.get<ChaveColetaModel[]>(this.apiUrl, {})
       }
}