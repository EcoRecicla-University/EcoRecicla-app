import { NgForOf } from "@angular/common";
import { Component } from "@angular/core";
import { RouterLink } from "@angular/router";
import {MatIconModule} from '@angular/material/icon';

type SidebarNavigationItem = {
    icon: string;
    label: string;
    url: string;
}

@Component ({
    selector: 'app-home-sidebar',
    templateUrl: 'sidebar.component.html',
    imports: [NgForOf, RouterLink, MatIconModule]
})

export class SidebarComponent {

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
            icon: 'person_add',
            label: 'Cadastro',
            url: '/cadastro'
        }
    ]
}