import { HttpClient } from "@angular/common/http";
import {  Injectable } from "@angular/core";
import { Observable, of, tap } from "rxjs";
import { LoginPayload, LoginResponse } from "../models/auth/login.model";
import { RecuperacaoSenhaPayload, RecuperacaoSenhaResponse } from "../models/auth/recuperacao-senha.model";

@Injectable({
    providedIn: 'root'
})
export class LoginService {
    
    private readonly apiUrl = 'http://localhost:8080/api/login';
    private readonly apiUrlRec = 'http://localhost:8080/api/recuperacao-senha';

    private _token: string;
    public get token(): string {
        return this._token;
    }

    constructor(
        private http: HttpClient
    ) {
        const token = localStorage.getItem('accessToken') ?? null;
        this._token = token;
    }

    private _updateLocalToken(token: string): void {
        localStorage.setItem('accessToken', token);
        this._token = token;
    }

    logout(): void {
        localStorage.removeItem('accessToken');
        this._token = null;
    }
    
    getLogin(login: LoginPayload): Observable<LoginResponse> {
        return this.http.post<LoginResponse>(this.apiUrl, login)
            .pipe(
                tap(res => {
                    if (res.success) {
                        this._updateLocalToken(res.token);
                    }
                })
            );
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