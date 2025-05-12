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

@Component ({
    selector: 'app-pages-funcionario-motorista-cadastro',
    templateUrl: './cadastro.component.html',
    providers: [provideNativeDateAdapter(), DatePipe],
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
        this.funcionariosService.getFuncionarios()
        .subscribe((funcionarios) => {
            this.allFuncionarios = funcionarios
        })

        // const id = this._activatedRoute.snapshot.params['id'];
        // if (id) {
        //     this.isEdicao = true;
        //     this.idSelecionado = id
        //     this.service.getCliente(id)
        //     .subscribe(cliente => {
        //         this.form.patchValue({
        //             nome: cliente.Nome,
        //             cpf: cliente.CPF,
        //             cnpj: cliente.CNPJ,
        //             telefone: cliente.Telefone,
        //             pontoDeColeta: cliente.Pontos_Coleta,
        //             tipoCliente: cliente.Tipo_Cliente
        //         })
        //     })
        // } else {
        //     this.isEdicao = false;
        // }
    }

    salvar() {
    
        const dataValidadeFormatada = this.datePipe.transform(this.form.value.dataValidadeCarteira, 'yyyy-MM-dd') ?? '';

        const dadosDoFormulario: CadastroMotoristaModel = {
            ID_Funci: this.form.value.idFuncionario ?? '',
            Categoria: this.form.value.categoria ?? '',
            Numero_Registro: this.form.value.numeroRegistro ?? '',
            Validade: dataValidadeFormatada
        }



        if (this.isEdicao && this.idSelecionado) {
            // const dadosEditaveis: EditarClienteModel = {
            //     Id: this.idSelecionado,
            //     Nome: this.form.value.nome ?? '',
            //     CPF: this.form.value.cpf || undefined,
            //     CNPJ: this.form.value.cnpj || undefined,
            //     Telefone: this.form.value.telefone ?? '',
            //     Pontos_Coleta: this.form.value.pontoDeColeta ?? '',
            //     Tipo_Cliente: this.form.value.tipoCliente ?? ''
            // };
        
            // this.service.editarCliente(this.idSelecionado, dadosEditaveis)
            // .subscribe(() => {
            //     this.snackbar.open('Cliente editado com sucesso', 'Ok')
            //     this.router.navigate(['..'], {
            //         relativeTo: this._activatedRoute
            //     })
            // });

        } else {
            this.service.criarNovoMotorista(dadosDoFormulario)
            .subscribe(() => {
                this.snackbar.open('Funcionário criado com sucesso', 'Ok')
                this.router.navigate(['..'], {
                    relativeTo: this._activatedRoute
                })
            })
        }
    }
}