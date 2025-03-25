import { NgClass, NgForOf, NgStyle } from "@angular/common";
import { Component } from "@angular/core";
import { RouterLink, RouterLinkActive } from "@angular/router";
import {MatIconModule} from '@angular/material/icon';

type SidebarNavigationItem = {
    icon: string;
    label: string;
    url: string;
}

@Component ({
    selector: 'app-layout-private-sidebar',
    templateUrl: 'sidebar.component.html',
    imports: [NgClass,NgForOf, RouterLink, MatIconModule, RouterLinkActive]
})

export class LayoutPrivateSidebarComponent {

    constructor() {

    }

    itemsidebar:SidebarNavigationItem[] = [
        {
            icon: 'home',
            label: 'Home',
            url: '/home'
        },
        {
            icon: 'route',
            label: 'Rota',
            url: '/rota'
        },
        {
            icon: 'person',
            label: 'Cliente',
            url: '/cliente'
        },
        {
            icon: 'inventory_2',
            label: 'Estoque',
            url: '/estoque'
        },
        {
            icon: 'group_add',
            label: 'Cadastro',
            url: '/cadastro'
        }
    ]
}