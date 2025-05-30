import { NgForOf, NgIf } from "@angular/common";
import { Component } from "@angular/core";
import { RouterLink, RouterLinkActive } from "@angular/router";
import { MatIconModule } from '@angular/material/icon';
import {MatExpansionModule} from '@angular/material/expansion';
import { SidebarComponentesModel } from "../../../core/models/private/veiculos/sidebar-componentes.model";


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
            url: '/rota',
            type: 'ITEM',
        },
        {
            icon: 'inventory_2',
            label: 'Estoque',
            type: 'GRUPO',
            children: [
                {
                    label: 'Movimentos',
                    url: '/movimentos'
                },
                {
                    label: 'Estoque',
                    url: '/estoque'
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
            type: 'ITEM',
            url: '/coleta'
        },
        {
            icon: 'control_camera',
            label: 'Triagem',
            type: 'ITEM',
            url: '/triagem'
        },
    ]
}