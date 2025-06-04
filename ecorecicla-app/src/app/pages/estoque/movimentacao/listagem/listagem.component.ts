import { Component, OnInit, ViewChild } from "@angular/core";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatRadioModule } from "@angular/material/radio";
import { MatSelectModule } from "@angular/material/select";
import { MovimenService } from "../../../../core/services/movimen.service";
import { DadosMovimenModel} from "../../../../core/models/private/Movimen/listaMovimen.model";
import { DatePipe, NgForOf, NgIf } from "@angular/common";
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { RouterLink, RouterOutlet } from "@angular/router";
import { CommonModule } from '@angular/common';

@Component ({
    selector: 'app-pages-movimen-listagem',
    templateUrl: './listagem.component.html',
    imports: [
        CommonModule,         
        MatFormFieldModule, 
        MatInputModule, 
        MatIconModule, 
        MatSelectModule, 
        MatCheckboxModule, 
        MatRadioModule, 
        NgForOf,
        NgIf,                 
        MatButtonModule,
        MatMenuModule,
        RouterLink,
        DatePipe
    ]
})
export class PagesMovimenListagemComponent implements OnInit{
    
    DadosListaMovimen:DadosMovimenModel[] = []

    movimenSelecionado?: DadosMovimenModel;

    constructor(private _service: MovimenService){ }

    ngOnInit(): void {
        this._service.getMovimentacoes()
        .subscribe((movimentacoes) => {

            this.DadosListaMovimen = movimentacoes
        })
    }
}