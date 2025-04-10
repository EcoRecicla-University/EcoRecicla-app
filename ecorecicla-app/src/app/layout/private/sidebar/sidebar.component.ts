import { NgClass, NgForOf, NgIf, NgStyle } from "@angular/common";
import { Component } from "@angular/core";
import { ActivatedRoute, Router, RouterLink, RouterLinkActive } from "@angular/router";
import { MatIconModule } from '@angular/material/icon';
import {MatExpansionModule} from '@angular/material/expansion';
import { SidebarComponentesModel } from "../../../core/models/private/sidebar-componentes.model";

type SidebarNavigationItem = {
    icon: string;
    label: string;
    url?: string;
    children?: SidebarComponentesModel[]
}

@Component ({
    selector: 'app-layout-private-sidebar',
    templateUrl: 'sidebar.component.html',
    imports: [
        NgIf,
        NgClass,
        NgForOf, 
        RouterLink, 
        MatIconModule, 
        RouterLinkActive, 
        MatExpansionModule]
})

export class LayoutPrivateSidebarComponent {

    constructor(private router: Router, private activatedRoute: ActivatedRoute) {

    }

    itemsidebar:SidebarNavigationItem[] = [
        {
            icon: 'home',
            label: 'Home',
            children: [
                {
                    label: 'Pagina inicial',
                    url: '/home'
                },
                {
                    label: 'Relatório Geral',
                    url: '/relatorios'
                }
            ]
        },
        {
            icon: 'route',
            label: 'Rota',
            children: [
                {
                    label: 'Cadastro',
                    url: '/rota'
                },
                {
                    label: 'Listagem',
                    url: '/ListagemRota'
                }
            ]
        },
        {
            icon: 'person',
            label: 'Cliente',
            children: [
                {
                    label: 'Cadastro',
                    url: '/cliente/cadastroCliente'
                },
                {
                    label: 'Listagem',
                    url: '/cliente/listagemClientes'
                }
            ]
        },
        {
            icon: 'inventory_2',
            label: 'Estoque',
            children: [
                {
                    label: 'Cadastro',
                    url: '/estoque'
                },
                {
                    label: 'Listagem',
                    url: '/ListagemEstoque'
                }
            ]
        },
        {
            icon: 'group_add',
            label: 'Cadastro',
            children: [
                {
                    label: 'Cadastro',
                    url: '/cadastro'
                },
                {
                    label: 'Listagem',
                    url: '/ListagemCadastro'
                }
            ]
        },
        {
            icon: 'local_shipping',
            label: 'Veiculos',
            children: [
                {
                    label: 'Cadastro',
                    url: '/veiculos'
                },
                {
                    label: 'Listagem',
                    url: '/ListagemVeiculos'
                }
            ]
        },
        {
            icon: 'pallet',
            label: 'Coletas',
            children: [
                {
                    label: 'Cadastro',
                    url: '/veiculos'
                },
                {
                    label: 'Listagem',
                    url: '/ListagemVeiculos'
                }
            ]
        },
    ]

    isActive(url: string): boolean {
        return this.router.url === url;
      }
}