import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ListagemFuncionarioModel } from "../../models/private/funcionarios/funcionarios/listaFuncionario.molde";

@Injectable({
    providedIn: 'root'
})
export class FuncionarioService {

     private apiUrl = 'http://localhost:8080/api/funcionarios';
    
    constructor(private http: HttpClient) { }
    
    getFuncionarios(){
        return this.http.get<ListagemFuncionarioModel[]>(this.apiUrl, {})
    }
}