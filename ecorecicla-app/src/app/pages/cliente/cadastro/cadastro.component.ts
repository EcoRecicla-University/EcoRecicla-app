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
import { CadastroClienteModel } from "../../../core/models/private/clientes/cadastroCliente.model";
import { EditarClienteModel } from "../../../core/models/private/clientes/editarCliente.model";
import { MatButtonModule } from "@angular/material/button";
import { EnderecoService } from "../../../core/services/endereco.service";
import { MatProgressBarModule } from '@angular/material/progress-bar';

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
        ReactiveFormsModule,
        MatButtonModule,
        MatProgressBarModule
    ]
})
export class PagesClienteCadastroComponent implements OnInit {
    
    public isEdicao = false;
    public idSelecionado = null;

    public isLoadingCep = false

    public form = new FormGroup({
        nome: new FormControl('', [Validators.required, Validators.pattern(/^[a-zA-ZÀ-ÿ\s]*$/)]),
        cpf: new FormControl('', [Validators.required, Validators.maxLength(11), Validators.pattern(/^\d+$/)]),
        cnpj: new FormControl('', [Validators.required, Validators.maxLength(14), Validators.pattern(/^\d+$/)]),
        telefone: new FormControl('', [Validators.required, Validators.maxLength(11), Validators.pattern(/^\d+$/)]),
        pontoDeColeta: new FormControl('', Validators.required),
        tipoCliente: new FormControl(null, Validators.required),
        endereco: new FormGroup({
            cep: new FormControl('', [Validators.required, Validators.maxLength(8), Validators.minLength(8)]),
            logradouro: new FormControl('', [Validators.required, Validators.maxLength(200)]),
            localidade: new FormControl('', [Validators.required, Validators.maxLength(200)]),
            estado: new FormControl('', [Validators.required, Validators.maxLength(200)]),
            bairro: new FormControl('', [Validators.required, Validators.maxLength(200)]),
            numero: new FormControl('', [Validators.required, Validators.maxLength(200)])
        })
    });

    constructor(
        private router: Router,
        private _activatedRoute: ActivatedRoute,
        private service: ClientesService,
        private snackbar: MatSnackBar,
        private enderecoService: EnderecoService
    ) { }

    ngOnInit(): void {
        this._desabilitarFormularioEndereco()
        const id = this._activatedRoute.snapshot.params['id'];
        if (id) {
            this.isEdicao = true;
            this.idSelecionado = id;
            this.service.getCliente(id).subscribe(cliente => {

                this.form.patchValue({
                    nome: cliente.Nome,
                    cpf: cliente.CPF,
                    cnpj: cliente.CNPJ,
                    telefone: cliente.Telefone,
                    tipoCliente: cliente.Tipo_Cliente
                })
                if(cliente.Endereco){
                    this.form.get('endereco').patchValue({
                        cep: cliente.Endereco.CEP,
                        logradouro: cliente.Endereco.Logradouro,
                        localidade: cliente.Endereco.Cidade,
                        estado: cliente.Endereco.Estado,
                        bairro: cliente.Endereco.Bairro,
                        numero: cliente.Endereco.Numero
                    })
                }
            })
        } else {
            this.isEdicao = false;
        }
    }

    salvar() {
        const endereco = this.form.get('endereco').getRawValue()

        const dadosDoFormulario: CadastroClienteModel = {
            Nome: this.form.value.nome ?? '',
            CPF: this.form.value.cpf || undefined,
            CNPJ: this.form.value.cnpj || undefined,
            Telefone: this.form.value.telefone ?? '',
            Tipo_Cliente: this.form.value.tipoCliente ?? '',
            Endereco: {
                CEP: endereco.cep,
                Logradouro: endereco.logradouro,
                Localidade: endereco.localidade,
                Estado: endereco.estado,
                Bairro: endereco.bairro,
                Numero: endereco.numero
            }
        }

        if (this.isEdicao && this.idSelecionado) {
            const dadosEditaveis: EditarClienteModel = {
                Id: this.idSelecionado,
                Nome: this.form.value.nome ?? '',
                CPF: this.form.value.cpf || undefined,
                CNPJ: this.form.value.cnpj || undefined,
                Telefone: this.form.value.telefone ?? '',
                Tipo_Cliente: this.form.value.tipoCliente ?? '',
                Endereco: {
                    CEP: this.form.value.endereco.cep ?? '',
                    Logradouro: this.form.get('endereco').get('logradouro').value,
                    Localidade: this.form.get('endereco').get('localidade').value,
                    Estado: this.form.get('endereco').get('estado').value,
                    Bairro: this.form.get('endereco').get('bairro').value,
                    Numero: this.form.value.endereco.numero ?? ''
                }
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
            },
                (error) => {
                    this.snackbar.open(error.error.error, 'Ok')
                })
        }
    }
    
    buscarEnderecoPorCep(){
        const cep = this.form.get('endereco').get('cep').value
        
        this.form.get('endereco').get('cep').disable()
        this.isLoadingCep = true
        this.enderecoService.getEnderecoPorCep(cep)
        .subscribe((endereco) => {
            this.isLoadingCep = false
            this.form.get('endereco').get('cep').enable()
            
            this.form.get('endereco').patchValue({
                cep,
                logradouro: endereco.logradouro,
                localidade: endereco.localidade,
                estado: endereco.estado,
                bairro: endereco.bairro,
                numero: endereco.unidade
            })

        })

    }

    // Permitir apenas letras
    permitirApenasLetras(event: KeyboardEvent) {
        const regex = /^[a-zA-ZÀ-ÿ\s]*$/;
        if (!regex.test(event.key)) {
            event.preventDefault();
        }
    }

    // Permitir apenas números
    permitirApenasNumeros(event: KeyboardEvent) {
        const regex = /^[0-9]*$/;
        if (!regex.test(event.key)) {
            event.preventDefault();
        }
    }

    private _desabilitarFormularioEndereco(){
        this.form.get('endereco').get('logradouro').disable();
        this.form.get('endereco').get('localidade').disable();
        this.form.get('endereco').get('estado').disable();
        this.form.get('endereco').get('bairro').disable();
    }
}