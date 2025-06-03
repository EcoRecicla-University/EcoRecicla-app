import { Component, OnInit } from "@angular/core";
import { provideNativeDateAdapter } from "@angular/material/core";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIcon } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatSelectModule } from "@angular/material/select";
import { RouterLink } from "@angular/router";
import { ListagemRotaModel } from "../../../core/models/private/rota/listagemRota.model";
import { RotaService } from "../../../core/services/rota.service";
import { NgForOf } from "@angular/common";

@Component ({
    selector: 'app-pages-rota-listagem',
    templateUrl: './listagem.component.html',
    providers: [provideNativeDateAdapter()],
    imports: [
        MatFormFieldModule, 
        MatInputModule, 
        MatDatepickerModule, 
        MatSelectModule,
        RouterLink,
        MatIcon,
        NgForOf
    ]
})

export class PagesRotaListagemComponent implements OnInit{

    DadosListaRota: ListagemRotaModel[] = [];

    constructor(
        private service: RotaService
    ){}

    ngOnInit(): void {
        this.service.getRotas()
        .subscribe((rotas) => {
            this.DadosListaRota = rotas
        })
    }

}