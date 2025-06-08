import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { CadastroVeiculosModel } from "../models/private/veiculos/cadastroVeiculos.model";
import { ListaVeiculosModel } from "../models/private/veiculos/listaVeiculos.model";
import { EditarVeiculosModel } from "../models/private/veiculos/editarVeiculos.model";

@Injectable({
    providedIn: 'root'
})
export class VeiculosService {

    private apiUrl = 'http://localhost:8080/api/veiculos';

    constructor(private http: HttpClient) { }

    getVeiculo(id: string): Observable<EditarVeiculosModel>{
        const apiUrl = `${this.apiUrl}/${id}`;
        return this.http.get<EditarVeiculosModel>(apiUrl, {})
    }

    getVeiculos(somentedisponiveis: boolean): Observable<ListaVeiculosModel[]>{
        const parametros = {
            somenteDisponiveis: somentedisponiveis
        }
        return this.http.get<ListaVeiculosModel[]>(this.apiUrl, { params: parametros })
    }

    criarNovoVeiculo(dados: CadastroVeiculosModel): Observable<CadastroVeiculosModel> {
        const apiUrl = `${this.apiUrl}`;
        return this.http.post<CadastroVeiculosModel>(apiUrl, dados);
    }

    editarVeiculo(id: string, dados: EditarVeiculosModel): Observable<EditarVeiculosModel> {
        const apiUrl = `${this.apiUrl}/${id}`;
        return this.http.put<EditarVeiculosModel>(apiUrl, dados)
    }

    deletarVeiculo(id: string):Observable<void>{
        const apiUrl = `${this.apiUrl}/${id}`;
        return this.http.delete<void>(apiUrl, {})
    }
}