import { Component, OnInit } from "@angular/core";
import { provideNativeDateAdapter } from "@angular/material/core";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatSelectModule } from "@angular/material/select";
import { FuncionarioService } from "../../../../core/services/funcionarios/funcionario.service";
import { MotoristaService } from "../../../../core/services/funcionarios/motorista.service";
import { ListagemFuncionarioModel } from "../../../../core/models/private/funcionarios/funcionarios/listaFuncionario.molde";
import { DatePipe, NgForOf, NgIf } from "@angular/common";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { CadastroMotoristaModel } from "../../../../core/models/private/funcionarios/motoristas/cadastroMotorista.model";
import { MatSnackBar } from "@angular/material/snack-bar";
import { ActivatedRoute, Router, RouterLink } from "@angular/router";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { EditarMotoristaModel } from "../../../../core/models/private/funcionarios/motoristas/editarMotorista.model";
import { DATE_CONFIG_PROVIDERS } from '../../../../core/date-format.config';
import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';

registerLocaleData(localePt);

@Component ({
    selector: 'app-pages-funcionario-motorista-cadastro',
    templateUrl: './cadastro.component.html',
    providers: [provideNativeDateAdapter(), DatePipe, ...DATE_CONFIG_PROVIDERS],
    imports: [
        MatFormFieldModule, 
        MatInputModule, 
        MatDatepickerModule, 
        MatSelectModule,
        MatIconModule,
        MatButtonModule,
        RouterLink,
        NgForOf,
        ReactiveFormsModule,
        NgIf
    ]
})
export class PagesFuncionariosMotoristasCadastroComponent implements OnInit{

    readonly startDate = new Date(1990, 0, 1);

    allFuncionarios: ListagemFuncionarioModel[] = []
    
    public isEdicao = false;

    public idSelecionado = null;

    dataMinimaValidadeCarteira = new Date();

    public form = new FormGroup({
            idFuncionario: new FormControl('', Validators.required),
            dataValidadeCarteira: new FormControl('', Validators.required),
            numeroRegistro: new FormControl('', Validators.required),
            categoria: new FormControl('', Validators.required),
        })

    constructor(
        private funcionariosService: FuncionarioService,
        private service: MotoristaService,
        private datePipe: DatePipe,
        private snackbar: MatSnackBar,
        private router: Router,
        private _activatedRoute: ActivatedRoute
    ) { }

    ngOnInit(): void {

        const hoje = new Date();
        this.dataMinimaValidadeCarteira = new Date(hoje.getFullYear(), hoje.getMonth(), hoje.getDate() + 1);

        this.funcionariosService.getFuncionarios()
        .subscribe((funcionarios) => {
            this.allFuncionarios = funcionarios
        })

        const id = this._activatedRoute.snapshot.params['id'];
        if (id) {
            this.isEdicao = true;
            this.idSelecionado = id
            this.service.getMotorista(id)
            .subscribe(motorista => {
                this.form.patchValue({
                    idFuncionario: motorista.ID_Funci,
                    dataValidadeCarteira: motorista.Validade,
                    numeroRegistro: motorista.Numero_Registro,
                    categoria: motorista.Categoria
                })
            })
        } else {
            this.isEdicao = false;
        }
    }

    salvar() {
        const validadeCarteira = new Date(this.form.value.dataValidadeCarteira);

        if (validadeCarteira < this.dataMinimaValidadeCarteira) {
            this.snackbar.open('A validade da carteira deve ser uma data futura.', 'Ok', { duration: 5000 });
            return;
        }

        const validadeCarteiraFormatada = this.datePipe.transform(this.form.value.dataValidadeCarteira, 'yyyy-MM-dd');

        const dadosDoFormulario: CadastroMotoristaModel = {
            ID_Funci: this.form.value.idFuncionario ?? '',
            Categoria: this.form.value.categoria ?? '',
            Numero_Registro: this.form.value.numeroRegistro ?? '',
            Validade: validadeCarteiraFormatada ?? ''
        }

        if (this.isEdicao && this.idSelecionado) {
            const dadosEditaveis: EditarMotoristaModel = {
                ID_Motorista: this.idSelecionado,
                ID_Funci: this.form.value.idFuncionario ?? '',
                Categoria: this.form.value.categoria ?? '',
                Numero_Registro: this.form.value.numeroRegistro ?? '',
                Validade: this.form.value.dataValidadeCarteira ?? '',
                Nome: null
            };
        
            this.service.editarMotorista(this.idSelecionado, dadosEditaveis)
            .subscribe(() => {
                this.snackbar.open('Motorista editado com sucesso', 'Ok', { duration: 5000 })
                this.router.navigate(['..'], {
                    relativeTo: this._activatedRoute
                })
            });

        } else {
            this.service.criarNovoMotorista(dadosDoFormulario)
            .subscribe(() => {
                this.snackbar.open('Motorista criado com sucesso', 'Ok', { duration: 5000 })
                this.router.navigate(['..'], {
                    relativeTo: this._activatedRoute
                })
            },
            (error) => {
                this.snackbar.open(error.error.error, 'Ok', { duration: 5000 })
            })
        }
    }

    // Permitir apenas números
    permitirApenasNumeros(event: KeyboardEvent) {
        const regex = /^[0-9]*$/;
        if (!regex.test(event.key)) {
            event.preventDefault();
        }
    }
}