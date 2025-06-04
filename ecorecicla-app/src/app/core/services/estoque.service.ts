import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ListagemEstoqueModel } from "../models/private/estoque/listaEstoque.model";

@Injectable({
  providedIn: 'root'
    })
    export class EstoqueService {

    private apiUrl = 'http://localhost:8080/api/estoque';

    constructor(private http: HttpClient) { }

    getEstoque(): Observable<ListagemEstoqueModel[]> {
        return this.http.get<ListagemEstoqueModel[]>(this.apiUrl);
    }
}