import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { DadosClientesModel } from "../models/private/listaClientes.model";

@Injectable({
    providedIn: 'root'
})
export class ClientesService {

    private apiUrl = 'http://localhost:8080/api/';

    constructor(private http: HttpClient) { }

    getCliente(id: string): Observable<DadosClientesModel>{
        return of(<DadosClientesModel>{
            id: 1,
            name: 'Osvaldo Cruz',
            dataCadastro: '12/01/2025',
            tipoCliente: 'Coleta',
            numeroPedidos: '2',
            pontosColeta: 'Rua Jalavi Nunes, 505',
            telefone: '4199312-3142',
            cpf: '123141231231'
        })
    }

    getClientes(): Observable<DadosClientesModel[]>{
        return of(<DadosClientesModel[]>[
            {
                id: 1,
                name: 'Osvaldo Cruz',
                dataCadastro: '12/01/2025',
                tipoCliente: 'Coleta',
                numeroPedidos: '2',
                pontosColeta: 'Rua Jalavi Nunes, 505',
                telefone: '4199312-3142',
                cpf: '123141231231'
            },
            {
                id: 2,
                name: 'Juscreison Alessandro',
                dataCadastro: '01/01/2024',
                tipoCliente: 'Venda',
                numeroPedidos: '50',
                pontosColeta: 'Rua Mundo Novo, 4055',
                telefone: '4199312-3142',
                cpf: '000000000'
            },
            {
                id: 3,
                name: 'Wylder Shuasneger',
                dataCadastro: '25/10/2012',
                tipoCliente: 'Ambos',
                numeroPedidos: '90',
                pontosColeta: 'Rua Bomba Pet, 4005',
                telefone: '4195734-6546',
                cpf: '99999999999'
            }
        ])
    }
}