import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { CadastroTriagemModel } from "../models/private/triagem/cadastroTriagem.model";
import { Observable } from "rxjs";
import { ListagemTriagemModel } from "../models/private/triagem/listagemTriagem.model";
import { CadastroRotaModel } from "../models/private/rota/cadastroRota.model";

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

}