import { Routes } from "@angular/router";

import { LoginComponent } from "./auth/login/login.component";
import { AuthComponent } from "./auth/auth.component";
import { PagesComponent } from "./pages/pages.component";
import { RecuperacaoSenhaComponent } from "./auth/recuperacao-senha/recuperacao-senha.component";
import { Component } from "@angular/core";
import { RotaComponent } from "./pages/rota/rota.component";
import { HomeComponent } from "./pages/home/home.component";


export const APP_ROUTES: Routes = [
    {
        path: 'auth-redirect',
        redirectTo: 'home'
    },
    {
        path: '', redirectTo: 'home', pathMatch: 'full'
    },
    { 
        path: '',
        component: AuthComponent,
        children: [
            { 
                path: 'login', component: LoginComponent
            },
            { 
                path: 'recuperacao-senha', component: RecuperacaoSenhaComponent
            }
        ]
    },
    {
        path: '', 
        component: PagesComponent,
        children: [
            {
                path: 'home', component: HomeComponent
            },
            {
                path: 'rota', component: RotaComponent
            }
        ]
    }
]