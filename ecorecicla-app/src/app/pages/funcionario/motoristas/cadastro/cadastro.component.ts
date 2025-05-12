import { Component, OnInit } from "@angular/core";
import { provideNativeDateAdapter } from "@angular/material/core";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatSelectModule } from "@angular/material/select";
import { FuncionarioService } from "../../../../core/services/funcionarios/funcionario.service";
import { MotoristaService } from "../../../../core/services/funcionarios/motorista.service";
import { ListagemFuncionarioModel } from "../../../../core/models/private/funcionarios/funcionarios/listaFuncionario.molde";
import { NgForOf } from "@angular/common";

@Component ({
    selector: 'app-pages-funcionario-motorista-cadastro',
    templateUrl: './cadastro.component.html',
    providers: [provideNativeDateAdapter()],
    imports: [
        MatFormFieldModule, 
        MatInputModule, 
        MatDatepickerModule, 
        MatSelectModule,
        NgForOf
    ]
})
export class PagesFuncionariosMotoristasCadastroComponent implements OnInit{

    readonly startDate = new Date(1990, 0, 1);
    
    allFuncionarios: ListagemFuncionarioModel[] = []

    constructor(
        private funcionariosService: FuncionarioService,
        private _service: MotoristaService
    ) { }

    ngOnInit(): void {
        this.funcionariosService.getFuncionarios()
        .subscribe((funcionarios) => {
            this.allFuncionarios = funcionarios
        })
    }

}