import { Injectable } from "@angular/core";
import { ListagemMotoristaModel } from "../../models/private/funcionarios/motoristas/listaMotorista.model";
import { HttpClient } from "@angular/common/http";
import { CadastroMotoristaModel } from "../../models/private/funcionarios/motoristas/cadastroMotorista.model";
import { Observable } from "rxjs";
import { EditarMotoristaModel } from "../../models/private/funcionarios/motoristas/editarMotorista.model";

@Injectable({
    providedIn: 'root'
})
export class MotoristaService {

    private apiUrl = 'http://localhost:8080/api/motoristas';
    
    constructor(
        private http: HttpClient
    ) { }
    
    getMotoristas(){
        return this.http.get<ListagemMotoristaModel[]>(this.apiUrl, {})
    }

    criarNovoMotorista(dados: CadastroMotoristaModel): Observable<CadastroMotoristaModel>{
        const apiUrl = `${this.apiUrl}`;
        return this.http.post<CadastroMotoristaModel>(apiUrl, dados);
    }

    getMotorista(id: string): Observable<EditarMotoristaModel> {
        const apiUrl = `${this.apiUrl}/${id}`;
        return this.http.get<EditarMotoristaModel>(apiUrl, {})
    }

    editarMotorista(id: string, dados: EditarMotoristaModel): Observable<EditarMotoristaModel> {
        const apiUrl = `${this.apiUrl}/${id}`;
        return this.http.put<EditarMotoristaModel>(apiUrl, dados)
    }

    deletarMotorista(id: string):Observable<void>{
        const apiUrl = `${this.apiUrl}/${id}`;
        return this.http.delete<void>(apiUrl, {})
    }
}