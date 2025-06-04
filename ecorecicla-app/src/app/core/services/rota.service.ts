import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { CadastroTriagemModel } from "../models/private/triagem/cadastroTriagem.model";
import { Observable, of } from "rxjs";
import { ListagemTriagemModel } from "../models/private/triagem/listagemTriagem.model";
import { CadastroRotaModel } from "../models/private/rota/cadastroRota.model";
import { ListagemRotaModel } from "../models/private/rota/listagemRota.model";
import { EditarRotaModel } from "../models/private/rota/editarRota.model";

@Injectable({
    providedIn: 'root'
})
export class RotaService {

    private apiUrl = 'http://localhost:8080/api/rota';
    
    constructor(private http: HttpClient) { }
    
    criarNovaColeta(dados: CadastroRotaModel): Observable<CadastroRotaModel>{
        const apiUrl = `${this.apiUrl}`;
        return this.http.post<CadastroRotaModel>(apiUrl, dados);
    }

    getRotas(): Observable<any>{
        return this.http.get<ListagemRotaModel[]>(this.apiUrl, {})
    }

    getRota(id: string): Observable<EditarRotaModel> {
        const apiUrl = `${this.apiUrl}/${id}`;
        return this.http.get<EditarRotaModel>(apiUrl, {})
    }

    editarRota(id: string, dados: EditarRotaModel): Observable<EditarRotaModel> {
        const apiUrl = `${this.apiUrl}/${id}`;
        return this.http.put<EditarRotaModel>(apiUrl, dados)
    }

    deletarRota(id: string):Observable<void>{
        const apiUrl = `${this.apiUrl}/${id}`;
        return this.http.delete<void>(apiUrl, {})
    }
}