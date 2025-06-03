import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { CadastroTriagemModel } from "../models/private/triagem/cadastroTriagem.model";
import { Observable, of } from "rxjs";
import { ListagemTriagemModel } from "../models/private/triagem/listagemTriagem.model";
import { CadastroRotaModel } from "../models/private/rota/cadastroRota.model";
import { ListagemRotaModel } from "../models/private/rota/listagemRota.model";

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

    getRotas(): Observable<any>{
        return of(
            [
                {
                    ID_Rota: '1',
                    Nome_Cliente: 'José',
                    Nome_Centro_Inicio: 'Centro de curitiba',
                    Nome_Centro_Final: 'Centro de araucaria'

                },
                {
                    ID_Rota: '2',
                    Nome_Cliente: 'Yasmin',
                    Nome_Centro_Inicio: 'Centro de Guarapuava',
                    Nome_Centro_Final: 'Centro de Ponta Grossa'
                }

            ]
        )

        return this.http.get<ListagemRotaModel[]>(this.apiUrl, {})
    }

}