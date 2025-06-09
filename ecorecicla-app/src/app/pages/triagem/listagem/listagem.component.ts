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
import { TriagemService } from "../../../core/services/triagem.service";
import { ListagemTriagemModel } from "../../../core/models/private/triagem/listagemTriagem.model";

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
        RouterLink
    ],
    providers: []
})

export class PagesTriagemListagemComponent implements OnInit{

    DadosListaTriagem: ListagemTriagemModel[] = [];
    
    constructor(private _service: TriagemService){ }

    ngOnInit(): void {
        this._service.getCentrosTriagem()
        .subscribe((listaCentrosTriagem) => {
            this.DadosListaTriagem = listaCentrosTriagem
        })
    }
}