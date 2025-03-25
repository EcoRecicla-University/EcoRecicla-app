import { HttpClient, HttpClientModule } from "@angular/common/http";
import { importProvidersFrom, Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { LoginPayload, LoginResponse } from "../models/auth/login.model";
import { bootstrapApplication } from "@angular/platform-browser";

@Injectable({
    providedIn: 'root'
})
export class LoginService {
    
    constructor(private http: HttpClient) { }
    
    private apiUrl = 'http://localhost:8080/api/login';
    
    // getLogin(login: LoginPayload): Observable<LoginResponse> {
    //     return of(<LoginResponse>
    //         {
    //             success: true,
    //             message: 'Usuário ou senha inválida'
    //         }
    //     )
    // }

    getDados(): Observable<string> {
        return this.http.get<string>(`${this.apiUrl}/`);  // Fazendo GET para a rota / do backend
    }


}