import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { CadastroTriagemModel } from "../models/private/triagem/triagemCadastro.model";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class TriagemService {

    private apiUrl = 'http://localhost:8080/api/triagem';
    
    constructor(private http: HttpClient) { }

    criarNovoCentroTriagem(dados: CadastroTriagemModel): Observable<CadastroTriagemModel> {
        const apiUrl = `${this.apiUrl}`;
        return this.http.post<CadastroTriagemModel>(apiUrl, dados);
    }
}