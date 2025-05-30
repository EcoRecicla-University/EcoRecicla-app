import { Component, OnInit } from "@angular/core";
import { provideNativeDateAdapter } from "@angular/material/core";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatSelectModule } from "@angular/material/select";
import { RotaService } from "../../../core/services/rota.service";
import { ColetaService } from "../../../core/services/coleta.service";
import { MotoristaService } from "../../../core/services/funcionarios/motorista.service";
import { VeiculosService } from "../../../core/services/veiculos.service";
import { FuncionarioService } from "../../../core/services/funcionarios/funcionario.service";
import { TriagemService } from "../../../core/services/triagem.service";
import { ListagemColetaModel } from "../../../core/models/private/coleta/listaColeta.model";
import { ListagemMotoristaModel } from "../../../core/models/private/funcionarios/motoristas/listaMotorista.model";
import { ListaVeiculosModel } from "../../../core/models/private/veiculos/listaVeiculos.model";
import { ListagemFuncionarioModel } from "../../../core/models/private/funcionarios/funcionarios/listaFuncionario.molde";
import { ListagemTriagemModel } from "../../../core/models/private/triagem/listagemTriagem.model";
import { NgForOf, NgIf } from "@angular/common";
import { RouterLink } from "@angular/router";
import { ReactiveFormsModule } from "@angular/forms";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";

@Component ({
    selector: 'app-pages-rota-cadastro',
    templateUrl: './cadastro.component.html',
    providers: [provideNativeDateAdapter()],
    imports: [
        MatFormFieldModule, 
        MatInputModule, 
        MatDatepickerModule, 
        MatSelectModule,
        NgForOf,
        RouterLink,
        NgIf,
        ReactiveFormsModule,
        MatIconModule,
        MatButtonModule
    ]
})
export class PagesRotaCadastroComponent implements OnInit{

    public isEdicao = false;

    allColetas: ListagemColetaModel[] = []
    allMotoristas: ListagemMotoristaModel[] = []
    allVeiculos: ListaVeiculosModel[] = []
    allFuncionarios: ListagemFuncionarioModel[] = []
    allTriagens: ListagemTriagemModel[] = []

    constructor(
        private service: RotaService,
        private coletaService: ColetaService,
        private motoristaService: MotoristaService,
        private veiculoService: VeiculosService,
        private funcionariosService: FuncionarioService,
        private triagemService: TriagemService
    ) { }

    ngOnInit(): void {
        this.coletaService.getColetas()
        .subscribe((coletas) => {
            this.allColetas = coletas
        })

        this.motoristaService.getMotoristas()
        .subscribe((motoristas) => {
            this.allMotoristas = motoristas
        })

        this.veiculoService.getVeiculos()
        .subscribe((veiculos) => {
            this.allVeiculos = veiculos
        })

        this.funcionariosService.getFuncionarios()
        .subscribe((funcionarios) => {
            this.allFuncionarios = funcionarios
        })

        this.triagemService.getCentrosTriagem()
        .subscribe((centros) => {
            this.allTriagens = centros
        })
    }
}