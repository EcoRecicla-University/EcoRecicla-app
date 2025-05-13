import { NgForOf, NgIf } from "@angular/common";
import { Component } from "@angular/core";
import { RouterLink, RouterLinkActive } from "@angular/router";
import { MatIconModule } from '@angular/material/icon';
import {MatExpansionModule} from '@angular/material/expansion';
import { SidebarComponentesModel } from "../../../core/models/private/Veiculos/sidebar-componentes.model";

type SidebarNavigationItem = {
    icon: string;
    label: string;
    url?: string;
    type: 'GRUPO' | 'ITEM';
    children?: SidebarComponentesModel[]
}

@Component ({
    selector: 'app-layout-private-sidebar',
    templateUrl: 'sidebar.component.html',
    imports: [
        NgIf,
        NgForOf, 
        RouterLink, 
        MatIconModule, 
        RouterLinkActive, 
        MatExpansionModule]
})

export class LayoutPrivateSidebarComponent {

    constructor() {}

    itemsidebar:SidebarNavigationItem[] = [
        {
            icon: 'home',
            label: 'Home',
            type: 'ITEM',
            url: '/home'
        },
        {
            label: 'Clientes',
            icon: 'person',
            url: '/clientes',
            type: 'ITEM',
        },
        {
            icon: 'route',
            label: 'Rota',
            type: 'GRUPO',
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
            icon: 'inventory_2',
            label: 'Movto Est',
            type: 'GRUPO',
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
            type: 'GRUPO',
            children: [
                {
                    label: 'Funcionarios',
                    url: '/funcionarios'
                },
                {
                    label: 'Motoristas',
                    url: '/motoristas'
                }
            ]
        },
        {
            icon: 'local_shipping',
            label: 'Veiculos',
            type: 'ITEM',
            url: '/veiculos'
        },
        {
            icon: 'pallet',
            label: 'Coletas',
            type: 'GRUPO',
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
}