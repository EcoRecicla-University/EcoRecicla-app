import { HttpClient, HttpClientModule } from "@angular/common/http";
import { importProvidersFrom, Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { LoginPayload, LoginResponse } from "../models/auth/login.model";
import { bootstrapApplication } from "@angular/platform-browser";
import { RecuperacaoSenhaPayload, RecuperacaoSenhaResponse } from "../models/auth/recuperacao-senha.model";

@Injectable({
    providedIn: 'root'
})
export class LoginService {
    
    constructor(private http: HttpClient) { }
    
    private apiUrl = 'http://localhost:8080/api/login';

    private apiUrlRec = 'http://localhost:8080/api/recuperacao-senha';
    
    getLogin(login: LoginPayload): Observable<LoginResponse> {
        return this.http.post<any>(this.apiUrl, login)
        if (login.email === 'ericvinicius@gmail.com' && login.password === '123456789') {
            return of(<LoginResponse>{
                success: true,
                token: 'ZcPcChJCZd4vwVc6Yj2mhD45ryeoiMkelOUrkbpX6RVXt0X2uFR5EOEZqp4tjIlZ'
            });
        }

        return of(<LoginResponse>{
            success: false,
            message: 'Usuário ou senha inválida.'
        });
    }

    getRecuperacaoSenha(emailRecuperacaoSenha: RecuperacaoSenhaPayload): Observable<RecuperacaoSenhaResponse>{
        return this.http.post<any>(this.apiUrlRec, emailRecuperacaoSenha)
        if (emailRecuperacaoSenha.email == 'ericvinicius@gmail.com') {
            return of(<RecuperacaoSenhaResponse>{
                success: true,
                message: 'Senha temporaria atualizada com sucesso. Verifique seu email.'
            });
        }

        return of(<RecuperacaoSenhaResponse>{
            success: false,
            message: 'Usuario não encontrado na base de dados.'
        });
    }
}