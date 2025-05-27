import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { DadosClientesModel } from "../models/private/clientes/listaClientes.model";
import { CadastroClienteModel } from "../models/private/clientes/cadastroCliente.model";
import { EditarClienteModel } from "../models/private/clientes/editarCliente.model";

@Injectable({
    providedIn: 'root'
})
export class ClientesService {

    private apiUrl = 'http://localhost:8080/api/clientes';

    constructor(private http: HttpClient) { }

    getCliente(id: string): Observable<DadosClientesModel>{
        const apiUrl = `${this.apiUrl}/${id}`;
        return this.http.get<DadosClientesModel>(apiUrl, {})
    }

    getClientes(): Observable<DadosClientesModel[]>{
        return this.http.get<DadosClientesModel[]>(this.apiUrl, {})
    }

    criarNovoCliente(dados: CadastroClienteModel): Observable<CadastroClienteModel> {
        const apiUrl = `${this.apiUrl}`;
        return this.http.post<CadastroClienteModel>(apiUrl, dados);
    }

    editarCliente(id: string, dados: EditarClienteModel): Observable<EditarClienteModel> {
        const apiUrl = `${this.apiUrl}/${id}`;
        return this.http.put<EditarClienteModel>(apiUrl, dados)
    }

    deletarCliente(id: string):Observable<void>{
        const apiUrl = `${this.apiUrl}/${id}`;
        return this.http.delete<void>(apiUrl, {})
    }
}