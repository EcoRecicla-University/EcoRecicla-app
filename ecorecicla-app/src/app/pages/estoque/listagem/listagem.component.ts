import { Component, OnInit, ViewChild } from "@angular/core";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatRadioModule } from "@angular/material/radio";
import { MatSelectModule } from "@angular/material/select";
import { MovimenService } from "../../../core/services/movimen.service";
import { DadosMovimenModel} from "../../../core/models/private/Movimen/listaMovimen.model";
import { DatePipe, NgForOf, NgIf } from "@angular/common";
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { RouterLink, RouterOutlet } from "@angular/router";


type listaMovimen = {
    ID_Coleta: number;
    ID_Movimen: number;
    Data_Entrada: Date;
    Quantidade_Entra: string;
}

@Component ({
    selector: 'app-pages-movimen-listagem',
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
    ]
})
export class PagesMovimenListagemComponent implements OnInit{
    
    DadosListaMovimen:DadosMovimenModel[] = []

    movimenSelecionado?: DadosMovimenModel;

    constructor(private _service: MovimenService){ }

    ngOnInit(): void {
        this._service.getMovimen()
        .subscribe((listaMovimen) => {

            this.DadosListaMovimen = listaMovimen
        })
    }

    abrirDrawer(movimen: DadosMovimenModel, drawer: any) {
        this.movimenSelecionado = movimen;
        drawer.open();
    }

}