import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { delay, Observable, of } from "rxjs";
import { ViaCepEnderecoModel } from "../models/private/endereco/endereco.model";

@Injectable({
    providedIn: 'root'
})
export class EnderecoService {

    private apiUrl = 'https://viacep.com.br/ws';

    constructor(private http: HttpClient) { }

    getEnderecoPorCep(cep: string): Observable<ViaCepEnderecoModel>{
        const url = `${this.apiUrl}/${cep}/json`
        return this.http.get<ViaCepEnderecoModel>(url)
        .pipe(
            delay(2500)
        )
    }
}