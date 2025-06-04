import { Component, OnDestroy, OnInit } from "@angular/core";
import { ActivatedRoute, Router, RouterLink } from "@angular/router";
import { DatePipe, NgIf } from "@angular/common";
import { MatMenuModule } from "@angular/material/menu";
import { MatIconModule } from "@angular/material/icon";
import { MatSnackBar } from "@angular/material/snack-bar";
import { MatButtonModule } from "@angular/material/button";
import { EditarRotaModel } from "../../../core/models/private/rota/editarRota.model";
import { RotaService } from "../../../core/services/rota.service";
import { VeiculosService } from "../../../core/services/veiculos.service";
import { ListaVeiculosModel } from "../../../core/models/private/veiculos/listaVeiculos.model";
import { forkJoin, map, tap } from "rxjs";
import { ColetaService } from "../../../core/services/coleta.service";
import { ListagemColetaModel } from "../../../core/models/private/coleta/listaColeta.model";
import { TriagemService } from "../../../core/services/triagem.service";
import { ListagemTriagemModel } from "../../../core/models/private/triagem/listagemTriagem.model";
import { ListagemMotoristaModel } from "../../../core/models/private/funcionarios/motoristas/listaMotorista.model";
import { MotoristaService } from "../../../core/services/funcionarios/motorista.service";
import { FuncionarioService } from "../../../core/services/funcionarios/funcionario.service";
import { ListagemFuncionarioModel } from "../../../core/models/private/funcionarios/funcionarios/listaFuncionario.molde";


@Component({
    selector: 'app-pages-rota-detalhe',
    templateUrl: './detalhe.component.html',
    imports: [
        RouterLink,
        NgIf,
        MatMenuModule,
        MatIconModule,
        MatButtonModule,
        DatePipe
    ]
})
export class PagesRotaDetalheComponent implements OnInit, OnDestroy {

    rotaSelecionada: EditarRotaModel;

    idSelecionado = null

    modeloVeiculo: string = null
    placaVeiculo: string = null
    clienteNome: string = null
    CentroInicio: string = null
    CentroFinal: string = null
    motorista: string = null
    funcionario: string = null
    dataColeta: string = null

    allVeiculos: ListaVeiculosModel[] = []
    allColetas: ListagemColetaModel[] = []
    allTriagens: ListagemTriagemModel[] = []
    allMotoristas: ListagemMotoristaModel[] = []
    allFuncionarios: ListagemFuncionarioModel[] = []

    constructor(
        private router: Router,
        private activeRoute: ActivatedRoute,
        private service: RotaService,
        private snackbar: MatSnackBar,
        private veiculoService: VeiculosService,
        private coletaService: ColetaService,
        private triagemService: TriagemService,
        private motoristaService: MotoristaService,
        private funcionariosService: FuncionarioService,
    ) { }

    ngOnInit(): void {
        this.activeRoute.params
            .subscribe((params) => {
                const id = params['id'];
                this.idSelecionado = id;
                this.listarDados()
                    .subscribe(() => {
                        this.service.getRota(id)
                            .subscribe((rota) => {
                                this.rotaSelecionada = rota;
                                const veiculo = this.allVeiculos
                                    .find(v => v.ID_Veiculo == rota.ID_Veiculo)
                                const coleta = this.allColetas
                                    .find(c => c.ID_Coleta == rota.ID_Coleta)
                                const centroInicio = this.allTriagens
                                    .find(i => i.ID_Centro == rota.ID_Centro_Inicio)
                                const centroFinal = this.allTriagens
                                    .find(f => f.ID_Centro == rota.ID_Centro_Fim)
                                const motorista = this.allMotoristas
                                    .find(m => m.ID_Motorista == rota.ID_Motorista)
                                const funcionario = this.allFuncionarios
                                    .find(u => u.ID_Funci == rota.ID_Funci)

                                this.modeloVeiculo = veiculo.Modelo
                                this.placaVeiculo = veiculo.Placa
                                this.clienteNome = coleta.Nome
                                this.CentroInicio = centroInicio.Nome_Centro
                                this.CentroFinal = centroFinal.Nome_Centro
                                this.motorista = motorista.Nome
                                this.funcionario = funcionario.Nome
                                this.dataColeta = coleta.Data_Coleta
                            })
                    })
            })
    }

    ngOnDestroy(): void {

    }

    deletarFuncionario() {
        // const podeExcluir = confirm('Tem certeza que deseja excluir este motorista?')

        // if (podeExcluir) {
        //     this.service.deletarMotorista(this.idSelecionado)
        //         .subscribe(() => {
        //             this.snackbar.open('Motorista excluido com sucesso', 'Ok')
        //             this.router.navigate(['..'], {
        //                 relativeTo: this.activeRoute
        //             })
        //         })
        // }
    }

    listarDados(){
        return forkJoin([
            this.veiculoService.getVeiculos(false),
            this.coletaService.getColetas(),
            this.triagemService.getCentrosTriagem(),
            this.motoristaService.getMotoristas(false),
            this.funcionariosService.getFuncionarios()
        ]).pipe(
            tap(([veiculos, coletas, centros, motoristas, funcionarios]) => {
                this.allVeiculos = veiculos
                this.allColetas = coletas
                this.allTriagens = centros
                this.allMotoristas = motoristas
                this.allFuncionarios = funcionarios
            })
        )
    }
}
