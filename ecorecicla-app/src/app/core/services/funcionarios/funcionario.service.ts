import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ListagemFuncionarioModel } from "../../models/private/funcionarios/funcionarios/listaFuncionario.molde";
import { CadastroFuncionarioModel } from "../../models/private/funcionarios/funcionarios/cadastroFuncionario.model";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class FuncionarioService {

     private apiUrl = 'http://localhost:8080/api/funcionarios';
    
    constructor(private http: HttpClient) { }
    
    getFuncionarios(){
        return this.http.get<ListagemFuncionarioModel[]>(this.apiUrl, {})
    }

    criarNovoFuncionario(dados: CadastroFuncionarioModel): Observable<CadastroFuncionarioModel> {
            const apiUrl = `${this.apiUrl}`;
            return this.http.post<CadastroFuncionarioModel>(apiUrl, dados);
        }
}