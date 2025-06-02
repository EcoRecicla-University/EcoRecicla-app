import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { CadastroColetaModel } from "../models/private/coleta/cadastroColeta.model";
import { Observable } from "rxjs";
import { ListagemColetaModel } from "../models/private/coleta/listaColeta.model";
import { EditarColetaModel } from "../models/private/coleta/editarColeta.model";

@Injectable({
    providedIn: 'root'
})
export class ColetaService{

    private apiUrl = 'http://localhost:8080/api/coleta';

    constructor(
        private http: HttpClient
    ) { }

    getColetasHabilitadas(){
        const apiUrl = `${this.apiUrl}/habilitadas`;
        return this.http.get<ListagemColetaModel[]>(apiUrl, {})
    }

    getColetas(){
        return this.http.get<ListagemColetaModel[]>(this.apiUrl, {})
    }

    criarNovaColeta(dados: CadastroColetaModel): Observable<CadastroColetaModel>{
        const apiUrl = `${this.apiUrl}`;
        return this.http.post<CadastroColetaModel>(apiUrl, dados);
    }

    getColeta(id: string): Observable<EditarColetaModel> {
        const apiUrl = `${this.apiUrl}/${id}`;
        return this.http.get<EditarColetaModel>(apiUrl, {})
    }

    editarColeta(id: string, dados: EditarColetaModel): Observable<EditarColetaModel> {
        const apiUrl = `${this.apiUrl}/${id}`;
        return this.http.put<EditarColetaModel>(apiUrl, dados)
    }
}