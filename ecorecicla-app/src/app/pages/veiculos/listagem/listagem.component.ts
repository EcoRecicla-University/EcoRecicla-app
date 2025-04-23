import { NgForOf } from "@angular/common";
import { Component } from "@angular/core";
import { MatIconModule } from "@angular/material/icon";
import { RouterLink } from "@angular/router";

@Component ({
    selector: 'app-pages-veiculos-listagem',
    templateUrl: './listagem.component.html',
    imports: [
        NgForOf,
        MatIconModule,
        RouterLink
    ]
})
export class PagesVeiculosListagemComponent{

}