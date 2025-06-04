import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { CadastroTriagemModel } from "../models/private/triagem/cadastroTriagem.model";
import { Observable } from "rxjs";
import { ListagemTriagemModel } from "../models/private/triagem/listagemTriagem.model";

@Injectable({
    providedIn: 'root'
})
export class TriagemService {

    private apiUrl = 'http://localhost:8080/api/triagem';
    
    constructor(private http: HttpClient) { }
    
    getCentrosTriagem(){
        return this.http.get<ListagemTriagemModel[]>(this.apiUrl, {})
    }

    criarNovoCentroTriagem(dados: CadastroTriagemModel): Observable<CadastroTriagemModel> {
        const apiUrl = `${this.apiUrl}`;
        return this.http.post<CadastroTriagemModel>(apiUrl, dados);
    }

    getCentroTriagemById(id: number): Observable<CadastroTriagemModel> {
        return this.http.get<CadastroTriagemModel>(`${this.apiUrl}/${id}`);
    }

    editarCentroTriagem(id: number, dados: CadastroTriagemModel): Observable<any> {
        return this.http.put(`${this.apiUrl}/${id}`, dados);
    }

    inativarCentroTriagem(id: number): Observable<void> {
        return this.http.patch<void>(`${this.apiUrl}/${id}/inativar`, {});
    }
    
}