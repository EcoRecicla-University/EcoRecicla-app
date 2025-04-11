import { Routes } from "@angular/router";

import { LayoutAuthComponent } from "./layout/auth/auth.component";
import { RecuperacaoSenhaComponent } from "./auth/recuperacao-senha/recuperacao-senha.component";
import { RotaComponent } from "./pages/rota/cadastro/rota.component";
import { HomeComponent } from "./pages/home/home.component";
import { LayoutPrivateComponent } from "./layout/private/private.component";
import { PagesClienteCadastroComponent } from "./pages/cliente/cadastro/cliente.component";
import { PagesEstoqueComponent } from "./pages/estoque/cadastro/estoque.component";
import { PagesCadastroComponent } from "./pages/cadastro/cadastro/cadastro.component";
import { PagesVeiculosComponent } from "./pages/veiculos/cadastro/veiculos.component";
import { PagesClientesListagemComponent } from "./pages/cliente/listagem/listagem.component";
import { PagesClienteDetalheComponent } from "./pages/cliente/detalhe/detalhe.component";


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
                path: 'clientes',
                children: [
                    {
                        path: '',
                        component: PagesClientesListagemComponent,
                        children: [
                            {
                                path: ':id',
                                component: PagesClienteDetalheComponent
                            }
                        ]
                    },
                    {
                        path: 'novo',
                        component: PagesClienteCadastroComponent
                    },
                ]
            },
            {
                path: 'estoque', component: PagesEstoqueComponent
            },
            {
                path: 'cadastro', component: PagesCadastroComponent
            },
            {
                path: 'veiculos', component: PagesVeiculosComponent
            }
        ]
    }
]