import { Routes } from "@angular/router";

import { LayoutAuthComponent } from "./layout/auth/auth.component";
import { RecuperacaoSenhaComponent } from "./auth/recuperacao-senha/recuperacao-senha.component";
import { RotaComponent } from "./pages/rota/rota.component";
import { HomeComponent } from "./pages/home/home.component";
import { LayoutPrivateComponent } from "./layout/private/private.component";
import { PagesClienteComponent } from "./pages/cliente/cliente.component";
import { PagesEstoqueComponent } from "./pages/estoque/estoque.component";
import { PagesCadastroComponent } from "./pages/cadastro/cadastro.component";


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
        component: LayoutAuthComponent,
        children: [
            { 
                path: 'login',
                loadComponent: () => import('./auth/login/login.component').then((c) => c.LoginComponent)
            },
            { 
                path: 'recuperacao-senha', component: RecuperacaoSenhaComponent
            }
        ]
    },
    {
        path: '', 
        component: LayoutPrivateComponent,
        children: [
            {
                path: 'home', component: HomeComponent
            },
            {
                path: 'rota', component: RotaComponent
            },
            {
                path: 'cliente', component: PagesClienteComponent
            },
            {
                path: 'estoque', component: PagesEstoqueComponent
            },
            {
                path: 'cadastro', component: PagesCadastroComponent
            }
        ]
    }
]