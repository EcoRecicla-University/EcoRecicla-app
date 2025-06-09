import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { CadastroTriagemModel } from "../models/private/triagem/cadastroTriagem.model";
import { Observable } from "rxjs";
import { ListagemTriagemModel } from "../models/private/triagem/listagemTriagem.model";
import { EditarTriagemModel } from "../models/private/triagem/editarTriagem.model";

@Injectable({
    providedIn: 'root'
})
export class TriagemService {

    private apiUrl = 'http://localhost:8080/api/triagem';
    
    constructor(private http: HttpClient) { }
    
    getCentrosTriagem(){
        return this.http.get<ListagemTriagemModel[]>(this.apiUrl, {})
    }

    getCentroTriagem(id: string): Observable<EditarTriagemModel>{
            const apiUrl = `${this.apiUrl}/${id}`;
            return this.http.get<EditarTriagemModel>(apiUrl, {})
        }

    criarNovoCentroTriagem(dados: CadastroTriagemModel): Observable<CadastroTriagemModel> {
        const apiUrl = `${this.apiUrl}`;
        return this.http.post<CadastroTriagemModel>(apiUrl, dados);
    }

    editarTriagem(id: string, dados: EditarTriagemModel): Observable<EditarTriagemModel> {
        const apiUrl = `${this.apiUrl}/${id}`;
        return this.http.put<EditarTriagemModel>(apiUrl, dados)
    }

}