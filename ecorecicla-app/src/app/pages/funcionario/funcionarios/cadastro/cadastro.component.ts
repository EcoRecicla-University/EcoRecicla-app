import { Component, OnInit } from "@angular/core";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatSelectModule } from "@angular/material/select";
import {MatDatepickerModule} from '@angular/material/datepicker';
import { provideNativeDateAdapter } from "@angular/material/core";
import { FuncionarioService } from "../../../../core/services/funcionarios/funcionario.service";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { MatSnackBar } from "@angular/material/snack-bar";
import { CadastroFuncionarioModel } from "../../../../core/models/private/funcionarios/funcionarios/cadastroFuncionario.model";
import { DatePipe } from "@angular/common";

@Component ({
    selector: 'app-pages-cadastro',
    templateUrl: './cadastro.component.html',
    providers: [provideNativeDateAdapter(), DatePipe],
    imports: [
        MatFormFieldModule, 
        MatInputModule, 
        MatDatepickerModule, 
        MatSelectModule,
        ReactiveFormsModule
    ]
})
export class PagesFuncionariosFuncionariosCadastroComponent implements OnInit{

    readonly startDate = new Date(1990, 0, 1);

    public isEdicao = false;

    public idSelecionado = null

    public form = new FormGroup({
        nome: new FormControl('', Validators.required),
        dataNascimento: new FormControl('', Validators.required),
        telefone: new FormControl('', Validators.required),
        cpf: new FormControl('', Validators.required),
        rg: new FormControl('', Validators.required),
        dataContratacao: new FormControl(null, Validators.required),
        estadoCivil: new FormControl(null, Validators.required)
    })

    constructor(
        private service: FuncionarioService,
        private router: Router,
        private _activatedRoute: ActivatedRoute,
        private snackbar: MatSnackBar,
        private datePipe: DatePipe
    ) { }

    ngOnInit(): void {
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

        const dataNascimentoFormatada = this.datePipe.transform(this.form.value.dataNascimento, 'yyyy-MM-dd') ?? '';
        const dataContratacaoFormatada = this.datePipe.transform(this.form.value.dataContratacao, 'yyyy-MM-dd') ?? '';

        const dadosDoFormulario: CadastroFuncionarioModel = {
            Nome: this.form.value.nome ?? '',
            CPF: this.form.value.cpf ?? '',
            RG: this.form.value.rg ?? '',
            Telefone: this.form.value.telefone ?? '',
            Data_Nascimento: dataNascimentoFormatada,
            Data_Contratacao: dataContratacaoFormatada,
            Estado_Civil: this.form.value.estadoCivil ?? ''
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
            this.service.criarNovoFuncionario(dadosDoFormulario)
            .subscribe(() => {
                this.snackbar.open('Funcionário criado com sucesso', 'Ok')
                this.router.navigate(['..'], {
                    relativeTo: this._activatedRoute
                })
            })
        }
    }


    permitirApenasNumeros(event: KeyboardEvent) {
        const regex = /^[0-9]*$/;
        if (!regex.test(event.key)) {
            event.preventDefault();
        }
    }

    permitirApenasLetras(event: KeyboardEvent) {
    const regex = /^[a-zA-ZÀ-ÿ\s]*$/;
    if (!regex.test(event.key)) {
        event.preventDefault();
    }


    // Impede que pressione apenas espaço no início
    const input = event.target as HTMLInputElement;
    if (input.selectionStart === 0 && event.key === ' ') {
        event.preventDefault();
    }
}

verificarEspacoEmBranco(campo: string) {
    const valor = this.form.get(campo)?.value;
    if (valor && valor.trim() === '') {
        this.form.get(campo)?.setValue('');
    }
}
}