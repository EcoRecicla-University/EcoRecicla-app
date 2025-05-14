import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ListagemFuncionarioModel } from "../../models/private/funcionarios/funcionarios/listaFuncionario.molde";
import { CadastroFuncionarioModel } from "../../models/private/funcionarios/funcionarios/cadastroFuncionario.model";
import { Observable } from "rxjs";
import { EditarFuncionarioModel } from "../../models/private/funcionarios/funcionarios/editarFuncionarioModel";

@Injectable({
    providedIn: 'root'
})
export class FuncionarioService {

    private apiUrl = 'http://localhost:8080/api/funcionarios';

    constructor(private http: HttpClient) { }

    getFuncionarios() {
        return this.http.get<ListagemFuncionarioModel[]>(this.apiUrl, {})
    }

    criarNovoFuncionario(dados: CadastroFuncionarioModel): Observable<CadastroFuncionarioModel> {
        const apiUrl = `${this.apiUrl}`;
        return this.http.post<CadastroFuncionarioModel>(apiUrl, dados);
    }

    getFuncionario(id: string): Observable<EditarFuncionarioModel> {
        const apiUrl = `${this.apiUrl}/${id}`;
        return this.http.get<EditarFuncionarioModel>(apiUrl, {})
    }

    editarFuncionario(id: string, dados: EditarFuncionarioModel): Observable<EditarFuncionarioModel> {
        const apiUrl = `${this.apiUrl}/${id}`;
        return this.http.put<EditarFuncionarioModel>(apiUrl, dados)
    }

    deletarFuncionario(id: string):Observable<void>{
        const apiUrl = `${this.apiUrl}/${id}`;
        return this.http.delete<void>(apiUrl, {})
    }
}