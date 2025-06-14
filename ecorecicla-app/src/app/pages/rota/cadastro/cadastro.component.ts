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
import { ActivatedRoute, Router, RouterLink } from "@angular/router";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { CadastroRotaModel } from "../../../core/models/private/rota/cadastroRota.model";
import { MatSnackBar } from "@angular/material/snack-bar";
import { EditarRotaModel } from "../../../core/models/private/rota/editarRota.model";

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

    public idSelecionado = null;

    allColetas: ListagemColetaModel[] = []
    allMotoristas: ListagemMotoristaModel[] = []
    allVeiculos: ListaVeiculosModel[] = []
    allFuncionarios: ListagemFuncionarioModel[] = []
    allTriagens: ListagemTriagemModel[] = []

    public form = new FormGroup({
        idColeta: new FormControl('', Validators.required),
        idMotorista: new FormControl('', Validators.required),
        idVeiculo: new FormControl('', Validators.required),
        idFuncionario: new FormControl('', Validators.required),
        idTriagemInicio: new FormControl('', Validators.required),
        idTriagemFim: new FormControl('', Validators.required)
    })

    constructor(
        private service: RotaService,
        private coletaService: ColetaService,
        private motoristaService: MotoristaService,
        private veiculoService: VeiculosService,
        private funcionariosService: FuncionarioService,
        private triagemService: TriagemService,
        private snackbar: MatSnackBar,
        private router: Router,
        private _activatedRoute: ActivatedRoute
    ) { }

    ngOnInit(): void {

        this.funcionariosService.getFuncionarios()
        .subscribe((funcionarios) => {
            this.allFuncionarios = funcionarios
        })

        this.triagemService.getCentrosTriagem()
        .subscribe((centros) => {
            this.allTriagens = centros
        })

        const id = this._activatedRoute.snapshot.params['id'];
        if (id) {
            this.isEdicao = true;
            this.idSelecionado = id
            this.service.getRota(id)
            .subscribe(rota => {
                console.log(rota)
                this.form.patchValue({
                    idColeta: rota.ID_Coleta,
                    idMotorista: rota.ID_Motorista,
                    idVeiculo: rota.ID_Veiculo,
                    idFuncionario: rota.ID_Funci,
                    idTriagemInicio: rota.ID_Centro_Inicio,
                    idTriagemFim: rota.ID_Centro_Fim,
                })
            })
        } else {
            this.isEdicao = false;
        }
        if(this.isEdicao == true){

            this.veiculoService.getVeiculos(false)
            .subscribe((veiculos) => {
                this.allVeiculos = veiculos
            })

            this.motoristaService.getMotoristas(false)
            .subscribe((motoristas) => {
                this.allMotoristas = motoristas
            })

            this.coletaService.getColetas()
            .subscribe((coletas) => {
                this.allColetas = coletas
            })

        } else {

            this.veiculoService.getVeiculos(true)
            .subscribe((veiculos) => {
                this.allVeiculos = veiculos
            })

            this.coletaService.getColetasHabilitadas()
            .subscribe((coletas) => {
                this.allColetas = coletas
            })

            this.motoristaService.getMotoristas(true)
            .subscribe((motoristas) => {
                this.allMotoristas = motoristas
            })
        }
    }

    salvar() {
        
            const dadosDoFormulario: CadastroRotaModel = {
                ID_Coleta: this.form.value.idColeta ?? '',
                ID_Motorista: this.form.value.idMotorista ?? '',
                ID_Veiculo: this.form.value.idVeiculo ?? '',
                ID_Funci: this.form.value.idFuncionario ?? '',
                ID_Centro_Inicio: this.form.value.idTriagemInicio ?? '',
                ID_Centro_Fim: this.form.value.idTriagemFim ?? ''
            }
    
            if (this.isEdicao && this.idSelecionado) {
                const dadosEditaveis: EditarRotaModel = {
                    ID_Rota: this.idSelecionado,
                    ID_Coleta: this.form.value.idColeta ?? '',
                    ID_Motorista: this.form.value.idMotorista ?? '',
                    ID_Veiculo: this.form.value.idVeiculo ?? '',
                    ID_Funci: this.form.value.idFuncionario ?? '',
                    ID_Centro_Inicio: this.form.value.idTriagemInicio ?? '',
                    ID_Centro_Fim: this.form.value.idTriagemFim ?? '',
                    Data_Coleta: null
                };
            
                this.service.editarRota(this.idSelecionado, dadosEditaveis)
                .subscribe(() => {
                    this.snackbar.open('Rota editada com sucesso', 'Ok')
                    this.router.navigate(['..'], {
                        relativeTo: this._activatedRoute
                    })
                });
    
            } else {
                this.service.criarNovaColeta(dadosDoFormulario)
                .subscribe(() => {
                    this.snackbar.open('Rota criada com sucesso', 'Ok')
                    this.router.navigate(['..'], {
                        relativeTo: this._activatedRoute
                    })
                },
                (error) => {
                    this.snackbar.open(error.error.error, 'Ok')
                })
            }
        }
}