import { Routes } from "@angular/router";

import { LayoutAuthComponent } from "./layout/auth/auth.component";
import { RecuperacaoSenhaComponent } from "./auth/recuperacao-senha/recuperacao-senha.component";
import { RotaComponent } from "./pages/rota/cadastro/rota.component";
import { HomeComponent } from "./pages/home/home.component";
import { LayoutPrivateComponent } from "./layout/private/private.component";
import { PagesClienteCadastroComponent } from "./pages/cliente/cadastro/cadastro.component";
import { PagesEstoqueComponent } from "./pages/estoque/cadastro/estoque.component";
import { PagesVeiculosCadastroComponent } from "./pages/veiculos/cadastro/cadastro.component";
import { PagesClientesListagemComponent } from "./pages/cliente/listagem/listagem.component";
import { PagesClienteDetalheComponent } from "./pages/cliente/detalhe/detalhe.component";
import { PagesVeiculosListagemComponent } from "./pages/veiculos/listagem/listagem.component";
import { PagesFuncionariosFuncionariosCadastroComponent } from "./pages/funcionario/funcionarios/cadastro/cadastro.component";
import { PagesFuncionariosMotoristasCadastroComponent } from "./pages/funcionario/motoristas/cadastro/cadastro.component";
import { PagesFuncionariosFuncionariosListaComponent } from "./pages/funcionario/funcionarios/lista/lista.component";
import { PagesFuncionariosMotoristasListaComponent } from "./pages/funcionario/motoristas/lista/lista.component";


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
                        component: PagesClientesListagemComponent
                    },
                    {
                        path: 'novo',
                        component: PagesClienteCadastroComponent
                    },
                    {
                        path: ':id/editar',
                        component: PagesClienteCadastroComponent
                    },
                    {
                        path: ':id',
                        component: PagesClienteDetalheComponent
                    },
                ]
            },
            {
                path: 'estoque', component: PagesEstoqueComponent
            },
            {
                path: '',
                children: [
                    {
                        path: 'funcionarios',
                        children: [
                            {
                                path: '',
                                component: PagesFuncionariosFuncionariosListaComponent
                            },
                            {
                                path: 'novo',
                                component: PagesFuncionariosFuncionariosCadastroComponent
                            }
                        ]
                    },
                    {
                        path: 'motoristas',
                        children: [
                            {
                                path: '',
                                component: PagesFuncionariosMotoristasListaComponent
                            },
                            {
                                path: 'novo',
                                component: PagesFuncionariosMotoristasCadastroComponent
                            }
                        ]
                    }
                ]
            },
            {
                path: 'veiculos', 
                children: [
                    {
                        path: '', 
                        component: PagesVeiculosListagemComponent
                    },
                    {
                        path: 'novo',
                        component: PagesVeiculosCadastroComponent
                    },
                ]
            }
        ]
    }
]