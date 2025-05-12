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
import { ActivatedRoute, Router, RouterLink } from "@angular/router";
import { MatSnackBar } from "@angular/material/snack-bar";
import { CadastroFuncionarioModel } from "../../../../core/models/private/funcionarios/funcionarios/cadastroFuncionario.model";
import { DatePipe, NgForOf, NgIf } from "@angular/common";
import { MatButtonModule } from "@angular/material/button";
import { EditarFuncionarioModel } from "../../../../core/models/private/funcionarios/funcionarios/editarFuncionarioModel";

@Component ({
    selector: 'app-pages-cadastro',
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
        ReactiveFormsModule,
        NgIf
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
        estadoCivil: new FormControl(null, Validators.required),
        email: new FormControl('', Validators.required)
    })

    constructor(
        private service: FuncionarioService,
        private router: Router,
        private _activatedRoute: ActivatedRoute,
        private snackbar: MatSnackBar,
        private datePipe: DatePipe
    ) { }

    ngOnInit(): void {
        const id = this._activatedRoute.snapshot.params['id'];
        if (id) {
            this.isEdicao = true;
            this.idSelecionado = id
            this.service.getFuncionario(id)
            .subscribe(funcionario => {
                this.form.patchValue({
                    nome: funcionario.Nome,
                    cpf: funcionario.CPF,
                    rg: funcionario.RG,
                    telefone: funcionario.Telefone,
                    email: funcionario.Email,
                    dataContratacao: funcionario.Data_Contratacao,
                    dataNascimento: funcionario.Data_Nascimento,
                    estadoCivil: funcionario.Estado_Civil
                })
            })
        } else {
            this.isEdicao = false;
        }

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
            Estado_Civil: this.form.value.estadoCivil ?? '',
            Email: this.form.value.email ?? ''
        }



        if (this.isEdicao && this.idSelecionado) {
            const dadosEditaveis: EditarFuncionarioModel = {
                ID_Funci: this.idSelecionado,
                Nome: this.form.value.nome ?? '',
                CPF: this.form.value.cpf ?? '',
                RG: this.form.value.rg ?? '',
                Telefone: this.form.value.telefone ?? '',
                Email: this.form.value.email ?? '',
                Estado_Civil: this.form.value.estadoCivil ?? '',
                Data_Contratacao: this.form.value.dataContratacao ?? '',
                Data_Nascimento: this.form.value.dataNascimento ?? ''
            };
        
            this.service.editarFuncionario(this.idSelecionado, dadosEditaveis)
            .subscribe(() => {
                this.snackbar.open('Cliente editado com sucesso', 'Ok')
                this.router.navigate(['..'], {
                    relativeTo: this._activatedRoute
                })
            });

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
}