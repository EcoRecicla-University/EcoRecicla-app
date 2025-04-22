import { Component, OnInit } from "@angular/core";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatSelectModule } from "@angular/material/select";
import { MatRadioModule } from '@angular/material/radio';
import { ActivatedRoute, Router, RouterLink } from "@angular/router";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { NgIf } from "@angular/common";
import { ClientesService } from "../../../core/services/clientes.service";
import { CadastroClienteModel } from "../../../core/models/private/cadastroCliente.model";
import { EditarClienteModel } from "../../../core/models/private/editarCliente.model";

@Component ({
    selector: 'app-pages-cliente-cadastro',
    templateUrl: './cadastro.component.html',
    imports: [
        NgIf,
        MatFormFieldModule,
        MatInputModule,
        MatIconModule,
        MatSelectModule,
        MatCheckboxModule,
        MatRadioModule,
        RouterLink,
        ReactiveFormsModule
    ]
})
export class PagesClienteCadastroComponent implements OnInit {
    
    public isEdicao = false;

    public idSelecionado = null

    public form = new FormGroup({
        nome: new FormControl('', Validators.required),
        cpf: new FormControl(''),
        cnpj: new FormControl(''),
        telefone: new FormControl('', Validators.required),
        pontoDeColeta: new FormControl('', Validators.required),
        tipoCliente: new FormControl(null, Validators.required)
    })

    constructor(
        private router: Router,
        private _activatedRoute: ActivatedRoute,
        private service: ClientesService,
        private snackbar: MatSnackBar
    ) { }

    ngOnInit(): void {
        const id = this._activatedRoute.snapshot.params['id'];
        if (id) {
            this.isEdicao = true;
            this.idSelecionado = id
            this.service.getCliente(id)
            .subscribe(cliente => {
                this.form.patchValue({
                    nome: cliente.Nome,
                    cpf: cliente.CPF,
                    cnpj: cliente.CNPJ,
                    telefone: cliente.Telefone,
                    pontoDeColeta: cliente.Pontos_Coleta,
                    tipoCliente: cliente.Tipo_Cliente
                })
            })
        } else {
            this.isEdicao = false;
        }

    }

    salvar() {
        const dadosDoFormulario: CadastroClienteModel = {
            Nome: this.form.value.nome ?? '',
            CPF: this.form.value.cpf || undefined,
            CNPJ: this.form.value.cnpj || undefined,
            Telefone: this.form.value.telefone ?? '',
            Pontos_Coleta: this.form.value.pontoDeColeta ?? '',
            Tipo_Cliente: this.form.value.tipoCliente ?? ''
        }

        if (this.isEdicao && this.idSelecionado) {
            const dadosEditaveis: EditarClienteModel = {
                Id: this.idSelecionado,
                Nome: this.form.value.nome ?? '',
                CPF: this.form.value.cpf || undefined,
                CNPJ: this.form.value.cnpj || undefined,
                Telefone: this.form.value.telefone ?? '',
                Pontos_Coleta: this.form.value.pontoDeColeta ?? '',
                Tipo_Cliente: this.form.value.tipoCliente ?? ''
            };
        
            this.service.editarCliente(this.idSelecionado, dadosEditaveis)
            .subscribe(() => {
                this.snackbar.open('Cliente editado com sucesso', 'Ok')
                this.router.navigate(['..'], {
                    relativeTo: this._activatedRoute
                })
            });

        } else {
            this.service.criarNovoCliente(dadosDoFormulario)
            .subscribe(() => {
                this.snackbar.open('Cliente criado com sucesso', 'Ok')
                this.router.navigate(['..'], {
                    relativeTo: this._activatedRoute
                })
            })
        }
    }
}