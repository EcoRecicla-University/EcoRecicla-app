import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { LoginPayload, LoginResponse } from "../models/auth/login.model";

@Injectable({
    providedIn: 'root'
})
export class LoginService {
    
    constructor() { }
    
    getLogin(login: LoginPayload): Observable<LoginResponse> {
        return of(<LoginResponse>
            {
                success: false,
                message: 'Usuário ou senha inválida'
            }
        )
    }

}