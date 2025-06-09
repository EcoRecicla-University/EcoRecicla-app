import { NgForOf, DatePipe } from "@angular/common";
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
import { ListagemMotoristaModel } from "../../../../core/models/private/funcionarios/motoristas/listaMotorista.model";
import { MotoristaService } from "../../../../core/services/funcionarios/motorista.service";

@Component ({
    selector: 'app-pages-funcionarios-motorista-lista',
    templateUrl: './listagem.component.html',
    providers: [],
    imports: [
        MatFormFieldModule, 
        MatInputModule, 
        MatIconModule, 
        MatSelectModule,
        NgForOf,
        MatButtonModule,
        RouterLink,
        DatePipe
    ]
})
export class PagesFuncionariosMotoristasListagemComponent  implements OnInit{

    DadosListaMotoristas: ListagemMotoristaModel[] = [];

    constructor(private _service: MotoristaService){ }

    ngOnInit(): void {
        this._service.getMotoristas(false)
        .subscribe((listaMotoristas) => {
            this.DadosListaMotoristas = listaMotoristas
        })
    }
}