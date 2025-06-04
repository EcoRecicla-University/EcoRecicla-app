import { Routes } from "@angular/router";

import { LayoutAuthComponent } from "./layout/auth/auth.component";
import { RecuperacaoSenhaComponent } from "./auth/recuperacao-senha/recuperacao-senha.component";
import { PagesRotaCadastroComponent } from "./pages/rota/cadastro/cadastro.component";
import { HomeComponent } from "./pages/home/home.component";
import { LayoutPrivateComponent } from "./layout/private/private.component";
import { PagesClienteCadastroComponent } from "./pages/cliente/cadastro/cadastro.component";
import { PagesEstoqueMovimentacaoCadastroComponent } from "./pages/estoque/movimentacao/cadastro/cadastro.component";
import { PagesVeiculosCadastroComponent } from "./pages/veiculos/cadastro/cadastro.component";
import { PagesClientesListagemComponent } from "./pages/cliente/listagem/listagem.component";
import { PagesClienteDetalheComponent } from "./pages/cliente/detalhe/detalhe.component";
import { PagesVeiculosListagemComponent } from "./pages/veiculos/listagem/listagem.component";
import { PagesFuncionariosFuncionariosCadastroComponent } from "./pages/funcionario/funcionarios/cadastro/cadastro.component";
import { PagesFuncionariosMotoristasCadastroComponent } from "./pages/funcionario/motoristas/cadastro/cadastro.component";
import { PagesFuncionariosFuncionariosListagemComponent } from "./pages/funcionario/funcionarios/listagem/listagem.component";
import { PagesFuncionariosMotoristasListagemComponent } from "./pages/funcionario/motoristas/listagem/listagem.component";
import { PagesFuncionariosFuncionariosDetalheComponent } from "./pages/funcionario/funcionarios/detalhe/detalhe.component";
import { PagesFuncionariosMotoristasDetalheComponent } from "./pages/funcionario/motoristas/detalhe/detalhe.component";
import { PagesMovimenListagemComponent } from "./pages/estoque/movimentacao/listagem/listagem.component";
import { PagesEstoqueEstoqueListagemComponent } from "./pages/estoque/estoque/listagem/listagem.component";
import { PagesColetaListagemComponent } from "./pages/coleta/listagem/listagem.component";
import { PagesColetaCadastroComponent } from "./pages/coleta/cadastro/cadastro.component";
import { PagesTriagemCadastroComponent } from "./pages/triagem/cadastro/cadastro.component";
import { PagesTriagemListagemComponent } from "./pages/triagem/listagem/listagem.component";
import { PagesColetaDetalheComponent } from "./pages/coleta/detalhe/detalhe.component";
import { PagesRotaListagemComponent } from "./pages/rota/listagem/listagem.component";
import { PagesRotaDetalheComponent } from "./pages/rota/detalhe/detalhe.component";
import { PagesColetaDashboardComponent } from "./pages/coleta/dashboard/dashboard.component";


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
                path: 'rota', 
                children: [
                    {
                        path: '',
                        component: PagesRotaListagemComponent
                    },
                    {
                        path: 'novo',
                        component: PagesRotaCadastroComponent
                    },
                    {
                        path: ':id',
                        component: PagesRotaDetalheComponent
                    },
                    {
                        path: ':id/editar',
                        component: PagesRotaCadastroComponent
                    }
                ]
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
                path: '', 
                children: [
                    {
                        path: 'movimentos',
                        children: [
                            {
                                path: '',
                                component: PagesMovimenListagemComponent
                            },
                            {
                                path:'novo',
                                component: PagesEstoqueMovimentacaoCadastroComponent
                            }
                        ]
                    },
                    {
                        path: 'estoque',
                        children: [
                            {
                                path: '',
                                component: PagesEstoqueEstoqueListagemComponent
                            }
                        ]
                    }
                ]
            },
            {
                path: '',
                children: [
                    {
                        path: 'funcionarios',
                        children: [
                            {
                                path: '',
                                component: PagesFuncionariosFuncionariosListagemComponent
                            },
                            {
                                path: 'novo',
                                component: PagesFuncionariosFuncionariosCadastroComponent
                            },
                            {
                                path: ':id',
                                component: PagesFuncionariosFuncionariosDetalheComponent
                            },
                            {
                                path: ':id/editar',
                                component: PagesFuncionariosFuncionariosCadastroComponent
                            },
                        ]
                    },
                    {
                        path: 'motoristas',
                        children: [
                            {
                                path: '',
                                component: PagesFuncionariosMotoristasListagemComponent
                            },
                            {
                                path: 'novo',
                                component: PagesFuncionariosMotoristasCadastroComponent
                            },
                            {
                                path: ':id',
                                component: PagesFuncionariosMotoristasDetalheComponent
                            },
                            {
                                path: ':id/editar',
                                component: PagesFuncionariosMotoristasCadastroComponent
                            },
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
            },
            {
                path: 'coleta',
                children: [
                    {
                        path: '',
                        component: PagesColetaListagemComponent
                    },
                    {
                        path: 'novo',
                        component: PagesColetaCadastroComponent
                    },
                    {
                        path: 'dashboard',
                        component: PagesColetaDashboardComponent
                    },
                    {
                        path: ':id',
                        component: PagesColetaDetalheComponent
                    },
                    {
                        path: ':id/editar',
                        component: PagesColetaCadastroComponent
                    }
                ]
            },
            {
                path: 'triagem',
                children: [
                    {
                        path: '',
                        component: PagesTriagemListagemComponent
                    },
                    {
                        path: 'novo',
                        component: PagesTriagemCadastroComponent
                    },
                ]
            }
        ]
    }
]