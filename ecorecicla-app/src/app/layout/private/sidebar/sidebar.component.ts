import { NgForOf, NgIf } from "@angular/common";
import { Component } from "@angular/core";
import { RouterLink, RouterLinkActive } from "@angular/router";
import { MatIconModule } from '@angular/material/icon';
import {MatExpansionModule} from '@angular/material/expansion';
import { SidebarComponentesModel } from "../../../core/models/private/sidebar-componentes.model";

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
            label: 'Estoque',
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