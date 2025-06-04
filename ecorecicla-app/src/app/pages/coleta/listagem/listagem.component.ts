import { DatePipe, NgForOf } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatMenuModule } from "@angular/material/menu";
import { MatRadioModule } from "@angular/material/radio";
import { MatSelectModule } from "@angular/material/select";
import { RouterLink } from "@angular/router";
import { ColetaService } from "../../../core/services/coleta.service";
import { ListagemColetaModel, StatusColetaEnum } from "../../../core/models/private/coleta/listaColeta.model";

@Component ({
    selector: 'app-pages-coleta-listagem',
    templateUrl: './listagem.component.html',
    imports: [
        MatFormFieldModule, 
        MatInputModule, 
        MatIconModule, 
        MatSelectModule, 
        MatCheckboxModule, 
        MatRadioModule, 
        NgForOf,
        MatButtonModule,
        MatMenuModule,
        RouterLink,
        DatePipe
    ],
    providers: []
})

export class PagesColetaListagemComponent implements OnInit{

    DadosListaColeta: ListagemColetaModel[] = [];

    StatusColetaEnum = StatusColetaEnum;

    constructor(
        private service: ColetaService
    ) {}

    ngOnInit(): void {
        this.service.getColetas()
        .subscribe((listaColetas) => {
            this.DadosListaColeta = listaColetas
        })
    }
}