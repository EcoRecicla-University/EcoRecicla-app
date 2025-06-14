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
import { EditarTriagemModel } from "../../../core/models/private/triagem/editarTriagem.model";

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
        this._desabilitarFormularioEndereco()
        const id = this._activatedRoute.snapshot.params['id'];
        if (id) {
            this.isEdicao = true;
            this.idSelecionado = id
            this.service.getCentroTriagem(id).subscribe(triagem => {

                this.form.patchValue({
                    nomeCentro: triagem.Nome_Centro,
                    capacidade: triagem.Capaci_Armaze
                })
                if(triagem.Endereco){
                    this.form.get('endereco').patchValue({
                        cep: triagem.Endereco.CEP,
                        logradouro: triagem.Endereco.Logradouro,
                        localidade: triagem.Endereco.Cidade,
                        estado: triagem.Endereco.Estado,
                        bairro: triagem.Endereco.Bairro,
                        numero: triagem.Endereco.Numero
                    })
                }

            })
        } else {
            this.isEdicao = false;
        }
    }

    salvar() {

        const endereco = this.form.get('endereco').getRawValue()
        
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
        }

        if (this.isEdicao && this.idSelecionado) {
            const dadosEditaveis: EditarTriagemModel = {
                ID_Centro: this.idSelecionado,
                Nome_Centro: this.form.value.nomeCentro ?? '',
                Capaci_Armaze: this.form.value.capacidade ?? '',
                Endereco: {
                    CEP: this.form.value.endereco.cep ?? '',
                    Logradouro: this.form.get('endereco').get('logradouro').value,
                    Cidade: this.form.get('endereco').get('localidade').value,
                    Estado: this.form.get('endereco').get('estado').value,
                    Bairro: this.form.get('endereco').get('bairro').value,
                    Numero: this.form.value.endereco.numero ?? ''
                }
            };
        
            this.service.editarTriagem(this.idSelecionado, dadosEditaveis)
            .subscribe(() => {
                this.snackbar.open('Centro de triagem editado com sucesso', 'Ok')
                this.router.navigate(['..'], {
                    relativeTo: this._activatedRoute
                })
            });

        } else {
            this.service.criarNovoCentroTriagem(dadosDoFormulario)
            .subscribe(() => {
                this.snackbar.open('Centro de triagem criado com sucesso', 'Ok')
                this.router.navigate(['..'], {
                    relativeTo: this._activatedRoute
                })
            },
                (error) => {
                    this.snackbar.open(error.error.error, 'Ok')
                })
        }
    }

    buscarEnderecoPorCep() {
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

    private _desabilitarFormularioEndereco(){
        this.form.get('endereco').get('logradouro').disable();
        this.form.get('endereco').get('localidade').disable();
        this.form.get('endereco').get('estado').disable();
        this.form.get('endereco').get('bairro').disable();
    }
}