import { Routes } from "@angular/router";

import { LoginComponent } from "./auth/login/login.component";
import { AuthComponent } from "./auth/auth.component";
import { PagesComponent } from "./pages/pages.component";
import { RecuperacaoSenhaComponent } from "./auth/recuperacao-senha/recuperacao-senha.component";


export const APP_ROUTES: Routes = [
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
        path: 'home', component: PagesComponent
    },
    {
        path: '', redirectTo: 'home', pathMatch: 'full'
    }
]