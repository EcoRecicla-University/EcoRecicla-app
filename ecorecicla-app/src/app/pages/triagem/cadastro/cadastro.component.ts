import { Component, OnInit } from "@angular/core";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatSnackBar } from "@angular/material/snack-bar";
import { ActivatedRoute, Router, RouterLink } from "@angular/router";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { NgIf } from "@angular/common";
import { MatButtonModule } from "@angular/material/button";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatSelectModule } from "@angular/material/select";
import { EnderecoService } from "../../../core/services/endereco.service";
import { MatProgressBarModule } from "@angular/material/progress-bar";
import { TriagemService } from "../../../core/services/triagem.service";
import { CadastroTriagemModel } from "../../../core/models/private/triagem/cadastroTriagem.model";

@Component ({
    selector: 'app-pages-veiculos',
    templateUrl: './cadastro.component.html',
    imports: [
        MatFormFieldModule, 
        MatInputModule, 
        MatDatepickerModule, 
        MatSelectModule,
        MatIconModule,
        MatButtonModule,
        RouterLink,
        ReactiveFormsModule,
        NgIf,
        MatProgressBarModule
    ]
})
export class PagesTriagemCadastroComponent implements OnInit {

    public isEdicao = false;
    public idSelecionado = null;
    public isLoadingCep = false;

    public form = new FormGroup({
        nomeCentro: new FormControl('', Validators.required),
        capacidade: new FormControl('', Validators.required),
        endereco: new FormGroup({
            cep: new FormControl('', [Validators.required, Validators.maxLength(8), Validators.minLength(8)]),
            logradouro: new FormControl('', [Validators.required, Validators.maxLength(200)]),
            localidade: new FormControl('', [Validators.required, Validators.maxLength(200)]),
            estado: new FormControl('', [Validators.required, Validators.maxLength(200)]),
            bairro: new FormControl('', [Validators.required, Validators.maxLength(200)]),
            numero: new FormControl('', [Validators.required, Validators.maxLength(200)])
        })
    })

    constructor(
        private router: Router,
        private enderecoService: EnderecoService,
        private _activatedRoute: ActivatedRoute,
        private service: TriagemService,
        private snackbar: MatSnackBar
    ) {}

    ngOnInit(): void {
        const id = this._activatedRoute.snapshot.paramMap.get('id');

        if (id) {
            this.isEdicao = true;
            this.idSelecionado = Number(id);

            this.service.getCentroTriagemById(this.idSelecionado).subscribe({
                next: (dados) => {
                    this.form.patchValue({
                        nomeCentro: dados.Nome_Centro,
                        capacidade: dados.Capacidade_Armaze,
                        endereco: {
                            cep: dados.Endereco.CEP,
                            logradouro: dados.Endereco.Logradouro,
                            localidade: dados.Endereco.Localidade,
                            estado: dados.Endereco.Estado,
                            bairro: dados.Endereco.Bairro,
                            numero: dados.Endereco.Numero
                        }
                    });

                    this._desabilitarFormularioEndereco();
                },
                error: () => {
                    this.snackbar.open('Erro ao carregar dados para edição', 'Fechar', { duration: 3000 });
                    this.router.navigate(['/triagem']);
                }
            });
        } else {
            this._desabilitarFormularioEndereco();
        }
    }

    salvar() {
        const endereco = this.form.get('endereco').getRawValue();

        const dadosDoFormulario: CadastroTriagemModel = {
            Nome_Centro: this.form.value.nomeCentro ?? '',
            Capacidade_Armaze: this.form.value.capacidade ?? '',
            Endereco: {
                CEP: endereco.cep,
                Logradouro: endereco.logradouro,
                Localidade: endereco.localidade,
                Estado: endereco.estado,
                Bairro: endereco.bairro,
                Numero: endereco.numero
            }
        };

        if (this.isEdicao && this.idSelecionado) {
            this.service.editarCentroTriagem(this.idSelecionado, dadosDoFormulario)
                .subscribe(() => {
                    this.snackbar.open('Centro de triagem editado com sucesso', 'Fechar', { duration: 3000 });
                    this.router.navigate(['/triagem']);
                }, (error) => {
                    this.snackbar.open(error.error?.error || 'Erro ao editar centro de triagem', 'Fechar');
                });
        } else {
            this.service.criarNovoCentroTriagem(dadosDoFormulario)
                .subscribe(() => {
                    this.snackbar.open('Centro de triagem criado com sucesso', 'Ok');
                    this.router.navigate(['..'], {
                        relativeTo: this._activatedRoute
                    });
                }, (error) => {
                    this.snackbar.open(error.error.error, 'Ok');
                });
        }
    }

    buscarEnderecoPorCep() {
        const cep = this.form.get('endereco').get('cep').value;

        this.form.get('endereco').get('cep').disable();
        this.isLoadingCep = true;

        this.enderecoService.getEnderecoPorCep(cep)
            .subscribe((endereco) => {
                this.isLoadingCep = false;
                this.form.get('endereco').get('cep').enable();

                this.form.get('endereco').patchValue({
                    cep,
                    logradouro: endereco.logradouro,
                    localidade: endereco.localidade,
                    estado: endereco.estado,
                    bairro: endereco.bairro,
                    numero: endereco.unidade
                });
            });
    }

    private _desabilitarFormularioEndereco() {
        this.form.get('endereco').get('logradouro').disable();
        this.form.get('endereco').get('localidade').disable();
        this.form.get('endereco').get('estado').disable();
        this.form.get('endereco').get('bairro').disable();
    }
}