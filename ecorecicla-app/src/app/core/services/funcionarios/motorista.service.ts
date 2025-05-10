import { Injectable } from "@angular/core";
import { ListagemMotoristaModel } from "../../models/private/funcionarios/motoristas/listaMotorista.model";
import { HttpClient } from "@angular/common/http";

@Injectable({
    providedIn: 'root'
})
export class MotoristaService {

     private apiUrl = 'http://localhost:8080/api/motoristas';
    
    constructor(private http: HttpClient) { }
    
    getMotoristas(){
        return this.http.get<ListagemMotoristaModel[]>(this.apiUrl, {})
    }
}