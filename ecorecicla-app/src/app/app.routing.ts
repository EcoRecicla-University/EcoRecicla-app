import { ModuleWithProviders } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { HeaderLoginComponent } from "./pages/generic-pages/header/header-login/header-login.component";
import { HomeComponent } from "./pages/home/home.component";
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