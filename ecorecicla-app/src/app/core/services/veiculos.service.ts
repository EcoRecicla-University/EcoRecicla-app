import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { CadastroVeiculosModel } from "../models/private/veiculos.model";

@Injectable({
    providedIn: 'root'
})
export class VeiculosService {

    private apiUrl = 'http://localhost:8080/api/veiculos';

    constructor(private http: HttpClient) { }

    // getCliente(id: string): Observable<DadosClientesModel>{
    //     const apiUrl = `${this.apiUrl}/${id}`;
    //     return this.http.get<DadosClientesModel>(apiUrl, {})
    // }

    // getClientes(): Observable<DadosClientesModel[]>{
    //     return this.http.get<DadosClientesModel[]>(this.apiUrl, {})
    // }

    criarNovoVeiculo(dados: CadastroVeiculosModel): Observable<CadastroVeiculosModel> {
        const apiUrl = `${this.apiUrl}`;
        return this.http.post<CadastroVeiculosModel>(apiUrl, dados);
    }

    // editarCliente(id: string, dados: EditarClienteModel): Observable<EditarClienteModel> {
    //     const apiUrl = `${this.apiUrl}/${id}`;
    //     return this.http.put<EditarClienteModel>(apiUrl, dados)
    // }

    // deletarCliente(id: string):Observable<void>{
    //     const apiUrl = `${this.apiUrl}/${id}`;
    //     return this.http.delete<void>(apiUrl, {})
    // }
}