import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { CadastroColetaModel } from "../models/private/coleta/cadastroColeta.model";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class ColetaService{

    private apiUrl = 'http://localhost:8080/api/coleta';

    constructor(
        private http: HttpClient
    ) { }

    criarNovaColeta(dados: CadastroColetaModel): Observable<CadastroColetaModel>{
        const apiUrl = `${this.apiUrl}`;
        return this.http.post<CadastroColetaModel>(apiUrl, dados);
    }
}